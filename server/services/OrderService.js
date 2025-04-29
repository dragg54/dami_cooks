import { HostNotFoundError, literal, Op, Sequelize } from "sequelize"
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
import { refundPayment } from "./PaymentService.js"
import { sendMerchantOrderCancelledMail } from "../emails/sendMessages/SendMerchantOrderCancelledMail.js"
import dotenv from 'dotenv'
import { sendCustomerOrderCancelledMail } from "../emails/sendMessages/SendCustomerOrderRejectedMail.js"
import { generateCd } from "../utils/generateCd.js"

dotenv.config()

export const createOrder = async (req) => {
    const { cartId } = req.body
    const userId = req.user.id
    const existingCart = await Cart.findByPk(cartId)
    if (!existingCart) {
        const errMsg = `Failed to create order: Cart must exist before order creation`
        throw BadRequestError(errMsg)
    }
    await Order.create({ ...req.body, amount: req.body.amount/100, userId, orderCd: generateCd("ORD") })
}


export const getAllOrders = async (req) => {
    const { page, size, status,
        searchText, customerName, orderCd, city, address, toDate, fromDate, customerId } = req.query;
    const user = req.user;

    // if (!user.isAdmin) {
    //     throw new UnauthorizedError("Only admin is allowed to complete operation");
    // }

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

    if (customerId) {
        userQueryOpts.where = {
            ...userQueryOpts.where,
            [Op.or]: [
                {
                    id: customerId
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

    if (orderCd) {
        queryOpts.where.orderCd = orderCd;
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
    // if (!req.user.isAdmin) {
    //     throw new UnauthorizedError('Only admin is allowed to complete operation')
    // }
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
                    attributes: ['id', 'name', 'imageUrl', 'price']
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

export const updateOrderStatus = async (req, transaction) => {
    const user = req.user
    // if (!req.user.isAdmin) {
    //     throw new UnauthorizedError('Only admin is allowed to complete operation')
    // }
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
    await Order.update({ status }, { where: { id } }, { transaction })
    if (status == orderStatus.REJECTED) {
        const customer = await User.findOne({ where: { id: existingOrder.createdBy } })
        if (!customer) {
            throw new NotFoundError("Registered Customer does not exist")
        }
        const refundPaymentRequest = {
            orderId: id,
            orderCd: existingOrder.orderCd,
             customer: {
                name: customer.dataValues.firstName,
                email: customer.dataValues.email
             }
        }
        await refundPayment(refundPaymentRequest,customer.dataValues.firstName, transaction)
        sendCustomerOrderCancelledMail(existingOrder.orderCd, customer.dataValues.firstName, customer.dataValues.email)
    }
}

export const cancelOrder = async (req, transaction) => {
    const user = req.user
    const { status } = req.body
    const { id } = req.params
    const existingOrder = await Order.findByPk(id)
    if (status != orderStatus.CANCELLED && status != orderStatus.REJECTED) {
        return
    }
    if (!existingOrder) {
        const errMsg = `Order ${id} not found`
        throw new BadRequestError(errMsg)
    }
    const isInvalidOrderStatus =
        existingOrder.status == orderStatus.DELIVERED
        || existingOrder.status == orderStatus.CANCELLED
        || existingOrder.status == orderStatus.ACCEPTED
        || existingOrder.status == orderStatus.REJECTED
    if (isInvalidOrderStatus) {
        const errMsg = `Order status is invalid for this operation`
        throw new BadRequestError(errMsg)
    }
    try {
        const customer = await User.findOne({ where: { id: existingOrder?.dataValues?.userId } })
        if (!customer) {
            throw new NotFoundError("Registered Customer does not exist")
        }
        const refundPaymentRequest = {
            orderId: id,
            customer: {
                name: customer.dataValues.firstName,
                email: customer.dataValues.email
             }
        }
        await refundPayment(refundPaymentRequest, transaction)
        await Order.update({ status }, { where: { id } }, { transaction })
        sendMerchantOrderCancelledMail(existingOrder.dataValues.orderCd, customer.dataValues?.firstName, process.env.MERCHANT_GMAIL)
    }
    catch (ex) {
        console.log(ex)
        throw new Error(ex.message)
    }

}

export const getOrderAggregates = async(req) =>{
    const result = await Order.findAll({
        attributes: [
          'status', 
          [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']
        ],
        group: ['status'],
        raw: true 
      });
      const successfulOrders = result.filter(order => order.status !== "CANCELLED");

      const totalSuccessfulOrders = successfulOrders.reduce((sum, order) => sum + parseInt(order.count), 0);
    
      const totalCancelled = result.find(order => order.status === "CANCELLED")?.count || 0;
    
      return {
        totalOrders: totalSuccessfulOrders,
        totalCancelled: parseInt(totalCancelled)
      };
}

  