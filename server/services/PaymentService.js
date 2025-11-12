import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js'
import { stripe } from "../configs/stripe.js"
import { Order } from '../models/Order.js'
import { Shipping } from '../models/Shipping.js'
import { OrderItem } from '../models/OrderItem.js'
import { Payment } from '../models/Payment.js'
import { CartItem } from '../models/CartItem.js'
import db from '../configs/db.js'
import { Cart } from '../models/Cart.js'
import { getPagination, getPagingData } from '../utils/pagination.js'
import { UnauthorizedError } from '../exceptions/UnauthorizedError.js'
import { Op } from 'sequelize'
import { sendNotification } from '../socket/createNotification.js'
import { Notification } from '../models/Notification.js'
import { BadRequestError } from '../exceptions/BadRequestError.js'
import { sendEmail } from './EmailService.js'
import fs from 'fs'
import path from 'path'
import { sendCustomerOrderPlacedMail } from '../emails/sendMessages/SendCustomerOrderPlacedEmail.js'
import { sendMerchantOrderPlacedMail } from '../emails/sendMessages/SendMerchantOrderPlacedEmail.js'
import { sendCustomerPaymentRefundedMail } from '../emails/sendMessages/SendCustomerPaymentRefundedMail.js'
import User from '../models/User.js'
import { sendCustomerPaymentRefundProcessingMail } from '../emails/sendMessages/SendCustomerPaymentRefundedProcessingMail.js'
import { generateCd } from '../utils/generateCd.js'
import logger from '../configs/logger.js'

dotenv.config()

export const initializePayment = async (req, transaction) => {
    const { items, idempotencyKey } = req.body;
    if (!idempotencyKey) {
        throw new BadRequestError("Idempotency key is required");
    }
    const userCart = await Cart.findOne({ where: { userId: req.user.id } })
    if (!userCart) {
        throw new BadRequestError("Cart does not exist for this user")
    }
    if (items && items.length > 0) {
        const totalCartItemAmount = items.length > 1 ? items.reduce((prevItem, nextItem) => ((Number(prevItem.price || 0) * Number(prevItem.quantity || 0))
            + (Number(nextItem.price || 0) * Number(nextItem.quantity || 0)))) : Number(items[0]?.price) * Number(items[0].quantity)
        const paymentItem = items.map((item) => (
            {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }
        ))

        let existingOrder = await Order.findOne({
            where: { idempotencyKey }
        });

        if (existingOrder) {
            console.log('Order already exists with this idempotency key');
            const existingPayment = await Payment.findOne({ where: { orderId: existingOrder.id } })
            if (existingPayment.gatewayPaymentId) {
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    existingPayment.gatewayPaymentId);
                return {
                    clientSecret: paymentIntent.client_secret,
                };
            }
            throw new Error("Order exists but payment intent is missing");
        }

        const orderCd = generateCd("ORD")
        let newOrder = await Order.create({
            orderCd: orderCd,
            idempotencyKey,
            orderedBy: req.user.id, amount: totalCartItemAmount, userId: req.user.id,
            cartId: userCart.id
        }, { transaction });


        newOrder = newOrder?.toJSON()
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCartItemAmount * 100,
            currency: "eur",
            metadata: {
                orderCd: newOrder.orderCd,
                orderedBy: req.user.id,
                cartId: userCart.dataValues.id,
                cartItems: JSON.stringify(paymentItem)
            }
        });

        return { clientSecret: paymentIntent.client_secret };
        // }
    }
    return { clientSecret: null }

}

export const refundPayment = async (req, transaction) => {
    const { orderId, customer, orderCd } = req
    const payment = await Payment.findOne({
        where: {
            orderId,
            paymentGateway: "STRIPE"
        }
    })
    if (!payment) {
        throw new BadRequestError("Payment not found for the order")
    }
    if (payment.status === 'cancelled') {
        return res.status(400).json({ message: 'Order already cancelled' });
    }
    await stripe.refunds.create({
        payment_intent: payment.gatewayPaymentId,
    });
    await sendCustomerPaymentRefundProcessingMail(orderCd, customer.name, customer.email)
}

export const paymentWebhook = async (req, res) => {
    const transaction = await db.transaction()
    res.status(200).json({ received: true });
    try {
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        const paymentIntent = event.data.object;
        if (event.type === "payment_intent.succeeded") {
            const { orderedBy, cartItems, cartId, orderCd } = paymentIntent.metadata
            const customer = await User.findOne({ where: { id: orderedBy }, attributes: ['firstName', "email"] })
            const existingOrder = await Order.findOne({ where: { orderCd } })
            if (!existingOrder) {
                logger.error("Update order failed: Existing order not found for " + orderCd)
            }
            const order = await Order.update({ status: "PLACED" }, { where: { orderCd }, transaction });
            logger.info("Order status updated")

            const orderItems = JSON.parse(cartItems).map(cartItem => ({
                itemId: cartItem.id,
                orderId: existingOrder.dataValues.id,
                quantity: cartItem.quantity,
            }))
            await OrderItem.bulkCreate(orderItems, { transaction })

            //Create payment
            await Payment.create({
                gatewayPaymentId: paymentIntent.id,
                amount: paymentIntent.amount / 100,
                status: paymentIntent.status,
                orderId: existingOrder.dataValues.id
            }, { transaction })

            //Create shipping
            await Shipping.create({
                userId: orderedBy,
                orderId: existingOrder.dataValues.id,
                address: paymentIntent.shipping.address.line1,
                city: paymentIntent.shipping.address.city,
                phone: paymentIntent.shipping.phone,
                email: customer.dataValues.email,
                postalCode: paymentIntent.shipping.address.postal_code,
                state: paymentIntent.shipping.state
            }, { transaction })
            await CartItem.destroy({
                where: {
                    cartId
                }
            }, { transaction })

            await Notification.create({
                read: false,
                message: `You have a new order`,
                notificationType: 'OrderNotification'
            }, { transaction: transaction })
            // const userCart = await Cart.findOne({where: {userId: orderedBy}, attributes:['id']})
            // await CartItem.destroy({where:{
            //     cartId: userCart.id
            // }})
            sendNotification()
            await sendCustomerOrderPlacedMail(customer?.dataValues?.firstName, orderCd, customer?.dataValues?.email)
            await sendMerchantOrderPlacedMail(orderCd, customer?.dataValues?.firstName, process.env.MERCHANT_GMAIL)
            await transaction.commit()

        }
        if (event.type == "charge.refunded") {
            await sendCustomerPaymentRefundedMail(paymentIntent.billing_details.name, paymentIntent.payment_intent, paymentIntent.amount, `XXXXXXXXXXXXX${paymentIntent.payment_method_details?.card?.last4, paymentIntent}`)
            await Payment.update({
                status: "refunded"
            }, { where: { gatewayPaymentId: paymentIntent.payment_intent } }, { transaction });
        }
    }
    catch (err) {
        await transaction.rollback()
        console.log(err)
        throw new InternalServerError(err)
    }
}

export const getPayments = async (req) => {
    const { page, size, status, gatewayPaymentId, paymentType,
        paymentGateway, amount, customerId, orderCd, fromDate, toDate } = req.query;
    const user = req.user
    if (!req.user.isAdmin) {
        throw new UnauthorizedError('Only admin is allowed to complete operation')
    }
    const { limit, offset } = getPagination(page, size);
    const queryOpts = {}
    const orderQryOpts = {}
    if (status != null) {
        queryOpts['where'] = { status: status.toUpperCase() }
    }

    if (gatewayPaymentId) {
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    gatewayPaymentId: { [Op.like]: `%${gatewayPaymentId}%` }
                }
            ]
        }
    }

    if (paymentType) {
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    paymentType: { [Op.like]: `%${paymentType}%` }
                }
            ]
        }
    }

    if (paymentGateway) {
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    paymentGateway: { [Op.like]: `%${paymentGateway}%` }
                }
            ]
        }
    }


    // if (orderCd) {
    //     queryOpts.where = {
    //         ...queryOpts.where,
    //         [Op.or]: [
    //             {
    //                 orderCd: { [Op.like]: `%${orderCd}%` }
    //             }
    //         ]
    //     }
    // }

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
                [Op.between]: [new Date(fromDate), new Date(toDate)]
            }
        }
    }

    if (orderCd) {
        orderQryOpts.where = {
            ...orderQryOpts,
            orderCd: { [Op.like]: `%${orderCd}%` }
        }
    }

    if (customerId) {
        orderQryOpts.where = {
            ...orderQryOpts,
            userId: customerId
        }
    }

    if (amount) {
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    amount: Number(amount)
                }
            ]
        }
    }

    const data = await Payment.findAndCountAll({
        include: [
            {
                model: Order,
                attributes: ['id', 'orderCd'],
                ...orderQryOpts
            }
        ],
        limit,
        offset,
        distinct: true,
        order: [["createdAt", "DESC"]],
        ...queryOpts
    });
    return getPagingData(data, page, limit)
}

export const getTotalRevenue = async (req) => {
    const isAdmin = req.user.isAdmin
    if (!isAdmin) {
        throw new UnauthorizedError("User cannot perform operation")
    }
    const revenue = await Payment.sum(
        "amount", {
        where: {
            status: "succeeded"
        }
    })
    return revenue
}
