import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { DuplicateError } from '../exceptions/DuplicateError.js'
import { BadRequestError } from '../exceptions/BadRequestError.js';
import * as cartService from './CartService.js'
import { UnauthorizedError } from '../exceptions/UnauthorizedError.js';
import { generateToken } from '../utils/generateToken.js';

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
    console.log(user.dataValues?.id)
    if(!isAdmin){
        const createCartRequest = {
          userId: user.dataValues.id
        }
        await cartService.createCart(createCartRequest, trans)
     }
    return user.id
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