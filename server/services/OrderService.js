import { orderStatus } from "../constants/OrderStatus"
import { BadRequestError } from "../exceptions/BadRequestError"
import { Cart } from "../models/Cart"
import { Order } from "../models/Order"

export const createOrder = async (req) => {
    const { cartId } = req.body
    const userId = req.user.id
    const existingCart = await Cart.findByPk(cartId)
    if (!existingCart) {
        const errMsg = `Failed to create order: Cart must exist before order creation`
        throw BadRequestError(errMsg)
    }
    await Order.create({ ...req.body, userId })
}

export const getAllOrders = async (req) => {
    return await Order.findAll();
};

export const getOrderById = async (req) => {
    const { id } = req.param
    const order = await Order.findByPk(id);
    if (!order) {
        const errMsg = $`Order with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return Order
};

export const updateOrderStatus = async (req) => {
    const { status } = req.body
    const { id } = req.param
    const existingOrder = await Order.findByPk(id)
    if (!existingOrder) {
        const errMsg = `Order ${id} not found`
        throw new BadRequestError(errMsg)
    }
    const isInvalidOrderStatus = (
        (existingOrder.status == orderStatus.DELIVERED || existingOrder.status == orderStatus.CANCELLED) && (
            status == orderStatus.ACCEPTED
            || status == orderStatus.REJECTED
            || status == orderStatus.PENDING))
    if (isInvalidOrderStatus) {
        const errMsg = `Order status is invalid for this operation`
        throw new BadRequestError(errMsg)
    }
}