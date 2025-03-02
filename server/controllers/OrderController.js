import * as orderService from '../services/OrderService.js'

export const createOrder = async (req, res) => {
    try {
        await orderService.createOrder(req)
        res.json("order created")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        await orderService.updateOrderStatus(req)
        res.json("order status updated")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}



export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders(req)
        res.json(orders)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getOrderById = async (req, res) => {
    try {
        const order = await orderService.getOrderById(req)
        res.json(order)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




