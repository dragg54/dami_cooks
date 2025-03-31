import { BadRequestError } from "../exceptions/BadRequestError.js"
import { DuplicateError } from "../exceptions/DuplicateError.js"
import { Cart } from "../models/Cart.js"
import { CartItem } from "../models/CartItem.js"
import { Item } from "../models/Item.js"
import { getUserCart } from "./CartService.js"
import { getItemById } from "./ItemService.js"

export const addCartItem = async(req, res) =>{
    const { itemId } = req.body
    const existingCart = await getUserCart(req)
    if(!existingCart){
        throw new BadRequestError(`Cart does not exist for user`)
    }
    const existingItem = await Item.findOne({where:{id: itemId}})
    if(!existingItem){
        throw new BadRequestError(`Item with id ${itemId} does not exist`)
    }
    const existingCartItem = await CartItem.findOne({where:{itemId}})
    if(existingCartItem){
        throw new DuplicateError(`Cart item with id ${itemId} already exists`)
    }
    await CartItem.create({cartId: existingCart.id, itemId: req.body.itemId})
}

export const getCartItems = async(req, res) =>{
    const user = req.user
    if(!user || user.isAdmin){
        return 
    }
    const cart = await Cart.findOne({where:{userId: user.id}})
    if(!cart) throw new BadRequestError(`Cart does not exist for user`)
    const cartItems = await CartItem.findAll({
       attributes: ['id', 'cartId', 'quantity'],
        where: {cartId: cart.id},
        include: [{
            model: Item,
            attributes: ['id', 'name', 'price', 'imageUrl']
        }]
    })
    return cartItems
}

export const deleteCartItem = async(req) =>{
    const { id } = req.params
    const existingCart = await getUserCart(req)
    if(!existingCart){
        throw new BadRequestError(`Cart does not exist for user`)
    }
    const existingItem = await Item.findOne({where:{id}})
    if(!existingItem){
        throw new BadRequestError(`Item with id ${id} does not exist`)
    }
    await CartItem.destroy({where:{itemId: id}})
}