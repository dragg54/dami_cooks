import * as cartItemService from '../services/CartItemService.js'

export const createCartItem = async (req, res) => {
    try {
        await cartItemService.addCartItem(req)
        res.json("CartItem created")
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getAllCartItems = async (req, res) => {
    try {
        const CartItems = await cartItemService.getCartItems(req)
        res.json(CartItems)
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const deleteCartItem = async(req, res) =>{
    try {
        await cartItemService.deleteCartItem(req)
        res.json("Cart item deleted")
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}





