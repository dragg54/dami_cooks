import { BadRequestError } from "../exceptions/BadRequestError.js"
import { DuplicateError } from "../exceptions/DuplicateError.js"
import { Cart } from "../models/Cart.js"

export const createCart = async (req, trans) => {
    const existingCart = await Cart.findOne({where: {userId: req.userId}})
    if(existingCart){
        const errmsg = `Failed to created cart: cart already exist`
        throw new DuplicateError(errmsg)
    }
    await Cart.create({userId: req.userId}, { transaction: trans})
}



export const getUserCart = async (req) => {
    const userId = req.user.id
    return await Cart.findOne({where: {userId}});
};

export const getCartById = async (req) => {
    const { id } = req.params
    const cart = await Cart.findByPk(id);
    if(!cart){
        const errMsg = $`Cart with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return cart
};
