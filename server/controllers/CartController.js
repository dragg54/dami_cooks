import * as cartService from '../services/CartService.js'

export const createCart = async (req, res) => {
    try {
        await cartService.createCart(req)
        res.json("Cart created")
    }
    catch (error) {
        console.log(error.message)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getAllCarts = async (req, res) => {
    try {
        const Carts = await cartService.getUserCart(req)
        res.json(Carts)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getCartById = async (req, res) => {
    try {
        const Cart = await cartService.getCartById(req)
        res.json(Cart)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




