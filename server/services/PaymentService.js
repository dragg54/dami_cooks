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
import { sendOrderNotification } from '../socket/createNotification.js'
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
import { sendMerchantEventBookedMail } from '../emails/sendMessages/sendMerchantEventBookedMail.js'
import { generateCd } from '../utils/generateCd.js'
import logger from '../configs/logger.js'
import EventBooking from '../models/EventBooking.js'
import { EventBookingItem } from '../models/EventBookingItem.js'

dotenv.config()

export const initializePayment = async (req, transaction) => {
    const { items, idempotencyKey, shipping, bookingId } = req.body;
    let client_secret;
    if (!idempotencyKey) {
        throw new BadRequestError("Idempotency key is required");
    }
    if (bookingId) {
        client_secret = await processBookingPayment(req, transaction)
    }

    else if (items) {
        client_secret = await processOrderPayment(req, transaction)
    }

    return client_secret
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
        const { orderCd, bookingCd } = paymentIntent.metadata
        logger.info("Webhook started")
        if (event.type === "payment_intent.succeeded") {
            if (orderCd) {
                await processWebhookForOrderPayment(paymentIntent, transaction)
            }
            else if (bookingCd) {
                await processWebhookForBookingPayment(paymentIntent, transaction)
            }

        }
        if (event.type == "charge.refunded") {
            const { orderedBy } = paymentIntent.metadata
            const order = await Order.findOne({
                where: { userId: orderedBy },
                include: [
                    {
                        model: User,
                        attributes: ["firstName", "lastName", "email"]
                    }
                ]
            })
            if(!order){
                throw new Error("Process charge refund failed: Order not found")
            }
            await sendCustomerPaymentRefundedMail(`${order.dataValues.user.firstName} ${order.dataValues.user.lastName}`, paymentIntent.payment_intent, paymentIntent.amount/100, `XXXXXXXXXXXXX${paymentIntent.payment_method_details?.card?.last4}`, order.dataValues.user.email)
            await Payment.update({
                status: "refunded"
            }, { where: { gatewayPaymentId: paymentIntent.payment_intent } }, { transaction });
        }
        await transaction.commit()
    }
    catch (err) {
        logger.error("Webhook processing failed ", err)
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

async function processBookingPayment(req, transaction) {
    const {bookingId, idempotencyKey} = req.body
    let existingBooking = await EventBooking.findOne({
        where: {
            id: bookingId
        },
        raw: true
    })
    if (!existingBooking) {
        throw new BadRequestError(`Booking does not exist ${bookingId}`)
    }
    if (existingBooking.idempotencyKey && existingBooking.idempotencyKey == idempotencyKey) {
        return { clientSecret: null }
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: existingBooking.bookingCharge * 100,
        currency: "gbp",
        metadata: {
            bookingCd: existingBooking.bknId,
            orderedBy: req.user.id,
            bookingCharge: existingBooking.bookingCharge,
            paymentReason: "booking"
        }
    });
    const existingPayment = await Payment.findOne({
        where: {bookingId, status: "initialized"}
    })
    if (!existingPayment) {
        await Payment.create({
            gatewayPaymentId: paymentIntent.id,
            bookingId: existingBooking.id,
            status: "initialized",
            amount: existingBooking.bookingCharge,
            paymentGateway: "STRIPE",
            paymentReason: "booking",
            paymentType: "Card"
        }, { transaction })

    }
    await EventBooking.update({idempotencyKey}, { where:{id: existingBooking.id}, transaction})
    return { clientSecret: paymentIntent.client_secret };
}

async function processOrderPayment(req, transaction) {
    const { items, idempotencyKey, shipping, deliveryMethod } = req.body;
    const userCart = await Cart.findOne({ where: { userId: req.user.id } })
    if (!userCart) {
        throw new BadRequestError("Cart does not exist for this user")
    }
    if (items && items.length > 0) {
        const totalCartItemAmount = items.reduce((total, item) => {
            return total + (Number(item.price || 0) * Number(item.quantity || 0));
        }, 0);
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
            const existingPayment = await Payment.findOne({ where: { orderId: existingOrder.id, paymentReason: "order" }, raw: true })
            if (existingPayment && existingPayment.gatewayPaymentId) {
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    existingPayment.gatewayPaymentId);
                await stripe.paymentIntents.update(existingPayment.gatewayPaymentId, {
                    amount: Math.round(totalCartItemAmount * 100) +
                        Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0)) * 100),
                    metadata: {
                        orderCd: existingOrder.orderCd,
                        orderedBy: req.user.id,
                        shippingAmount: (deliveryMethod=="pickup" ? 0 : (shipping?.shippingCharge || 0)),
                        cartId: userCart.dataValues.id,
                        shipping: JSON.stringify(shipping),
                        cartItems: JSON.stringify(paymentItem),
                        paymentReason: "order"
                    }
                });

                await Payment.update(
                    {
                        amount: Math.round(totalCartItemAmount) +
                            Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0)))
                    },
                    { where: { id: existingPayment.id }, transaction }
                )

                await Order.update({
                    deliveryMethod
                }, {where: {id: existingOrder.id}})
                return {
                    clientSecret: paymentIntent.client_secret,
                };
            }
            throw new Error("Order exists but payment intent is missing");
        }

        const orderCd = generateCd("ORD")
        try{
            let newOrder = await Order.create({
            orderCd: orderCd,
            idempotencyKey,
            deliveryMethod,
            orderedBy: req.user.id, amount: totalCartItemAmount, userId: req.user.id,
            cartId: userCart.id
        }, { transaction });


            newOrder = newOrder?.toJSON()
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalCartItemAmount * 100) +
                    Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0)) * 100),
                currency: "gbp",
                metadata: {
                orderCd: newOrder.orderCd,
                orderedBy: req.user.id,
                shipping: JSON.stringify(shipping),
                shippingAmount: deliveryMethod=="pickup" ? 0 : shipping?.shippingCharge ,
                cartId: userCart.dataValues.id,
                cartItems: JSON.stringify(paymentItem),
                paymentReason: "order"
            }
        });

        await Payment.create({
            gatewayPaymentId: paymentIntent.id,
            orderId: newOrder.id,
            status: "initialized",
            paymentReason: "order",
            amount: Math.round(totalCartItemAmount) +
                Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0))),
            paymentGateway: "STRIPE",
            paymentType: "Card"
        }, { transaction })

        return { clientSecret: paymentIntent.client_secret };
        }
        catch (err) {
            if (err.name == "SequelizeUniqueConstraintError") {
                let existingOrder = await Order.findOne({
                    where: { idempotencyKey }
                });
                if (existingOrder) {
                    const existingPayment = await Payment.findOne({ where: { orderId: existingOrder.id, paymentReason: "order" }, raw: true })
                    if (existingPayment && existingPayment.gatewayPaymentId) {
                        const paymentIntent = await stripe.paymentIntents.retrieve(
                            existingPayment.gatewayPaymentId);
                        await stripe.paymentIntents.update(existingPayment.gatewayPaymentId, {
                            amount: Math.round(totalCartItemAmount * 100) +
                                Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0)) * 100),
                            metadata: {
                                orderCd: existingOrder.orderCd,
                                orderedBy: req.user.id,
                                shipping: JSON.stringify(shipping),
                                shippingAmount: (deliveryMethod == "pickup" ? 0 : (shipping?.shippingCharge || 0)),
                                cartId: userCart.dataValues.id,
                                cartItems: JSON.stringify(paymentItem),
                                shippingId: shipping?.id,
                                paymentReason: "order"
                            }
                        });

                        await Payment.update(
                            {
                                amount: Math.round(totalCartItemAmount * 100) +
                                    Math.round((deliveryMethod === "pickup" ? 0 : (shipping?.shippingCharge || 0)) * 100)
                            },
                            { where: { id: existingPayment.id }, transaction }
                        )
                        return {
                            clientSecret: paymentIntent.client_secret,
                        };
                    }

                }
            }
            else{
                throw err
            }
        }
        // }
    }
    return { clientSecret: null }
}

async function processWebhookForOrderPayment(paymentIntent, transaction) {
    logger.info("Order webhook started")
    const { orderedBy, cartItems, cartId, orderCd, shipping } = paymentIntent.metadata
    const customer = await User.findOne({ where: { id: orderedBy }, attributes: ['firstName', "email"] })
    const existingOrder = await Order.findOne({ where: { orderCd } })
    if (!existingOrder) {
        logger.error("Update order failed: Existing order not found for " + orderCd)
    }
    if(existingOrder.dataValues.status == "PLACED"){
        logger.warn("Invalid process order webhook event: Order not in a valid state")
        return
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
    await Payment.update({
        status: paymentIntent.status,
        orderId: existingOrder.dataValues.id
    }, { where: { orderId: existingOrder.dataValues.id }, transaction })

    //Create shipping
    const shippingDetails = JSON.parse(shipping)
    if(shippingDetails && shippingDetails.deliveryMethod == "delivery"){
     await Shipping.create({
        userId: orderedBy,
        orderId: existingOrder.dataValues.id,
        address: shippingDetails.address,
        city: shippingDetails.city,
        phone: shippingDetails.phone,
        email: customer.dataValues.email,
        postalCode: shippingDetails.postalCode,
        state: shippingDetails.state,
        deliveryFee: shippingDetails.shippingCharge,
    }, { transaction })
    }
   
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
    sendOrderNotification()
    try {
        await sendCustomerOrderPlacedMail(customer?.dataValues?.firstName, orderCd, customer?.dataValues?.email)
        await sendMerchantOrderPlacedMail(orderCd, customer?.dataValues?.firstName, process.env.MERCHANT_GMAIL)
    }
    catch (exception) {
        logger.error("Order notification failed", exception)
        console.log(exception)
    }
    await transaction.commit()
}

async function processWebhookForBookingPayment(paymentIntent, transaction) {
    const { bookingCd } = paymentIntent.metadata
    const existingBooking = await EventBooking.findOne({ where: {bknId: bookingCd }, raw: true })
    if (!existingBooking) {
        logger.error("Booking does not exist for " + bookingCd)
    }
    if(existingBooking.bookingStatus == "booked"){
        logger.warn("Invalid process booking webhook event: Booking not in a valid state")
        return
    }
    await EventBooking.update({ bookingStatus: "booked" }, { where: { bknId: bookingCd }, transaction })
    await Payment.update({
        status: paymentIntent.status,
    }, { where: { bookingId: existingBooking.id }, transaction })
    const customer = await User.findOne({ where: { id: existingBooking.userId }, attributes: ['firstName', "email"] })
    try {
        const {bknId, eventLocation, eventDate, eventStartTime } = existingBooking
        await sendMerchantEventBookedMail(bknId, customer?.dataValues?.firstName, process.env.MERCHANT_GMAIL, `${eventDate} ${eventStartTime}`, eventLocation)
    }
    catch (exception) {
        console.log(exception)
    }
}