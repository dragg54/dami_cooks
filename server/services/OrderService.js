import { HostNotFoundError, literal, Op } from "sequelize"
import { orderStatus } from "../constants/OrderStatus.js"
import { BadRequestError } from "../exceptions/BadRequestError.js"
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import { Cart } from "../models/Cart.js"
import { Item } from "../models/Item.js"
import { Order } from "../models/Order.js"
import { OrderItem } from "../models/OrderItem.js"
import { Shipping } from "../models/Shipping.js"
import User from "../models/User.js"
import { getPagination, getPagingData } from "../utils/pagination.js"
import { NotFoundError } from "../exceptions/NotFoundError.js"

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
    const { page, size, status,
        searchText, customerName, city, address, toDate, fromDate } = req.query;
    const user = req.user;

    if (!user.isAdmin) {
        throw new UnauthorizedError("Only admin is allowed to complete operation");
    }

    const { limit, offset } = getPagination(page, size);

    const queryOpts = { where: {} };
    const shippingQueryOpts = { where: {} }
    const userQueryOpts = { where: {} }
    
    if (searchText) {
        queryOpts.where = {
            [Op.or]: [
                { status: { [Op.like]: `%${searchText}%` } }
            ]
        };
    }
    if (customerName) {
        userQueryOpts.where = {
            ...userQueryOpts.where,
            [Op.or]: [
                {
                    firstName: { [Op.like]: `%${customerName}%` }
                }
            ]
        }
    }
    if (city) {
        shippingQueryOpts.where = {
            ...shippingQueryOpts.where,
            city: { [Op.like]: `%${city}%` }
        }
    }
    if (address) {
        shippingQueryOpts.where = {
            ...shippingQueryOpts.where,
            address: { [Op.like]: `%${address}%` }
        }
    }

    // Apply status filter without overwriting `where`
    if (status) {
        queryOpts.where.status = status.toUpperCase();
    }

    if (fromDate && !toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: { [Op.gte]: new Date(fromDate) }
        }
    }

    if (!fromDate && toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: { [Op.lte]: new Date(toDate) }
        }
    }

    if (fromDate && toDate) {
        queryOpts.where = {
            ...queryOpts.where,
            createdAt: {
                [Op.gte]: new Date(fromDate),
                [Op.lte]: new Date(toDate)
            }
        }
    }

    const data = await Order.findAndCountAll({
        include: [
            {
                model: User,
                ...userQueryOpts,
                attributes: ["firstName", "lastName"],
            },
            {
                model: OrderItem,
                attributes: ["quantity"],
                include: {
                    model: Item,
                    attributes: ["id", "name"]
                }
            },
            {
                model: Shipping,
                ...shippingQueryOpts,
                attributes: ["address", "city", "phone", "postalCode", "email"],
            }
        ],
        limit,
        offset,
        distinct: true,
        order: [["createdAt", "DESC"]],
        ...queryOpts
    });

    return getPagingData(data, page, limit);
};


export const getOrderById = async (req) => {
    const { id } = req.params
    const user = req.user
    if (!req.user.isAdmin) {
        throw new UnauthorizedError('Only admin is allowed to complete operation')
    }
    const order = await Order.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: OrderItem,
                attributes: ['quantity'],
                include: {
                    model: Item,
                    attributes: ['id', 'name']
                }
            },
            {
                model: Shipping,
                attributes: ['address', 'city', 'phone', 'postalCode', 'email']
            }
        ],
    });
    if (!order) {
        const errMsg = `Order with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return order
};

export const updateOrderStatus = async (req) => {
    const user = req.user
    if (!req.user.isAdmin) {
        throw new UnauthorizedError('Only admin is allowed to complete operation')
    }
    const { status } = req.body
    const { id } = req.params
    const existingOrder = await Order.findByPk(id)
    if (!existingOrder) {
        const errMsg = `Order ${id} not found`
        throw new BadRequestError(errMsg)
    }
    const isInvalidOrderStatus = (
        (existingOrder.status == orderStatus.DELIVERED
            || existingOrder.status == orderStatus.CANCELLED
            || existingOrder.status == orderStatus.ACCEPTED
            || existingOrder.status == orderStatus.REJECTED
        ) && (
            status == orderStatus.ACCEPTED
            || status == orderStatus.REJECTED
            || status == orderStatus.PENDING))
    if (isInvalidOrderStatus) {
        const errMsg = `Order status is invalid for this operation`
        throw new BadRequestError(errMsg)
    }
    await Order.update({ status }, { where: { id } })
}
