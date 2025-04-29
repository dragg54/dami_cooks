import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { DuplicateError } from '../exceptions/DuplicateError.js'
import { BadRequestError } from '../exceptions/BadRequestError.js';
import * as cartService from './CartService.js'
import { UnauthorizedError } from '../exceptions/UnauthorizedError.js';
import { generateToken } from '../utils/generateToken.js';
import { NotFoundError } from '../exceptions/NotFoundError.js';

export const createUser = async (req, trans) => {
    const { email, isAdmin, phone, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({where:{email}})
    if(existingUser){
        const errMsg = "User already exist"
        throw new DuplicateError(errMsg)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const user = await User.create({ firstName, lastName, phone, email, isAdmin, password: hashedPassword }, {transaction: trans});
    if(!isAdmin){
        const createCartRequest = {
          userId: user.dataValues.id
        }
        await cartService.createCart(createCartRequest, trans)
     }
    return user.id
}

export const getAdmin = async(req) =>{
    const admin = User.findOne({where:{isAdmin: true}, attributes:{exclude:["password", "createdAt", "updatedAt"]}})
    if(!admin){
        throw new NotFoundError("No admin can be found")
    }
    return admin
}

export const loginUser = async(req) =>{
    const { email, password } = req.body
    const existingUser = await User.findOne({
        where: {
            email
        }
    },
        {
            attributes: ["id", "email", "password", "firstName", "lastName", "phone", "address"]
        }

    )
    if (!existingUser) {
        const errMsg = `User does not exist`
        throw new BadRequestError(errMsg)
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        throw new BadRequestError('Invalid email or password');
    }
    // if (!existingUser.isVerifiedEmail) {
    //     const errMsg = 'User email is not yet verified'
    //     throw new UnauthorizedError(errMsg)
    // }
    const token = generateToken(existingUser)
    return {
        token, userDetails: {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            isAdmin: existingUser.isAdmin,
            address: existingUser.address,
            phone: existingUser.phone
        }
    }
}

export const updateUser = async(req)=>{
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    if(!user){
        throw BadRequestError("User not found")
    }
    await User.update({...req.body}, {where:{id}})
}