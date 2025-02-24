import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { DuplicateError } from '../exceptions/DuplicateError.js'
import { BadRequestError } from '../exceptions/BadRequestError.js';

export const createUser = async (req) => {
    const { name, email, isAdmin, password } = req.body;
    const existingUser = await User.findOne({where:{email}})
    if(existingUser){
        const errMsg = "User already exist"
        throw new DuplicateError(errMsg)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, isAdmin, password: hashedPassword });
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
            attributes: ["id", "email", "password"]
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
    if (!existingUser.isVerifiedEmail) {
        const errMsg = 'User email is not yet verified'
        logger.error(errMsg)
        throw new UnauthorizedError(errMsg)
    }
    const token = generateToken(existingUser)
    return {
        token, userDetails: {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            isAdmin: existingUser.isAdmin,
        }
    }
}