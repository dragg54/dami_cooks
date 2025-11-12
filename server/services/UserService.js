import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import { DuplicateError } from '../exceptions/DuplicateError.js'
import { BadRequestError } from '../exceptions/BadRequestError.js';
import * as cartService from './CartService.js'
import { UnauthorizedError } from '../exceptions/UnauthorizedError.js';
import { generateToken } from '../utils/generateToken.js';
import { NotFoundError } from '../exceptions/NotFoundError.js';
import { sendNotification } from '../socket/createNotification.js';
import { sendEmail } from './EmailService.js';
import crypto from 'crypto'
import { sendCustomerEmailVerificationMail } from '../emails/sendMessages/SendCustomerEmailVerificationMail.js';

export const createUser = async (req, trans) => {
    const { email, isAdmin, phone, password, firstName, lastName } = req.body;
    const rawToken = generateEmailToken();
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        const errMsg = "User already exist"
        throw new DuplicateError(errMsg)
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        firstName, lastName, phone, email, isAdmin,
        password: hashedPassword, emailVerificationToken: tokenHash, emailTokenExpiresAt: expires
    }, { transaction: trans });
    if (!isAdmin) {
        const createCartRequest = {
            userId: user.dataValues.id
        }
        await cartService.createCart(createCartRequest, trans)
    }

    const customerName = `${firstName} ${lastName}`
    await sendCustomerEmailVerificationMail(customerName, rawToken, email)
    return user.id
}

export const getAdmin = async (req) => {
    const admin = User.findOne({ where: { isAdmin: true }, attributes: { exclude: ["password", "createdAt", "updatedAt"] } })
    if (!admin) {
        throw new NotFoundError("No admin can be found")
    }
    return admin
}

export const loginUser = async (req) => {
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
            isVerifiedEmail: existingUser.emailVerified,
            phone: existingUser.phone
        }
    }
}

export const updateUser = async (req) => {
    console.log(req.body)
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    if (!user) {
        throw BadRequestError("User not found")
    }
    await User.update({ ...req.body }, { where: { id } })
}

export const changePassword = async (req) => {
    const { id } = req.params
    const { oldPassword, newPassword } = req.body
    const existingUser = await User.findOne({
        where: { id }
    })
    if (!existingUser) {
        throw new BadRequestError("User does not exist ")
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.dataValues.password);
    if (!isPasswordValid) {
        throw new BadRequestError("Old password is incorrect ")
    }
    const encryptedPassword = await hashPassword(newPassword)
    await User.update({
        password: encryptedPassword
    }, { where: { id } })
}

export async function verifyEmail(req) {
    const { email, token } = req.body;
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) throw new BadRequestError("User not found");

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    if (
        !user.emailVerificationToken ||
        user.emailVerificationToken !== tokenHash ||
        user.emailTokenExpiresAt < new Date()
    ) {
        throw new BadRequestError("invalid token")
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailTokenExpiresAt = null;
    await User.update(user, {where: {email}});
}

export async function resentVerificationEmail(req) {
    const { email } = req.body;

    if (!email) throw new BadRequestError("Email does not exist")

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) throw new BadRequestError("User does not exist")
    if (user.emailVerified) {
        throw new BadRequestError("Email already verified")
    }

    const verificationToken = crypto.randomBytes(3).toString('hex').toUpperCase();
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
   const tokenHash = crypto.createHash('sha256').update(verificationToken).digest('hex');

    user.emailVerificationToken = tokenHash;
    user.emailVerificationExpiresAt = tokenExpiry;
    await user.save();
     const customerName = `${user.firstName} ${user.lastName}`
    await sendCustomerEmailVerificationMail(customerName, verificationToken, email)
}


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword
}

