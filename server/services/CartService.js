import { DuplicateError } from "../exceptions/DuplicateError"
import { Cart } from "../models/Cart"

export const createCart = async (req) => {
    const userId = req.user.id
    const existingCart = await Cart.findOne({where: {userId}})
    if(existingCart){
        const errmsg = `Failed to created cart: cart already exist`
        throw new DuplicateError(errmsg)
    }
    await Cart.create({...req.body, userId})
}

export const getAllCarts = async (req) => {
    return await Cart.findAll();
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
