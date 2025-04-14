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

dotenv.config()

export const initializePayment = async (req) => {
    const environment = process.env.NODE_ENV
    let clientUri = environment == "Production" ? process.env.PROD_CLIENT_URL : process.env.LOCAL_CLIENT_URL
    try {
        const { items } = req.body;
        
        if (items && items.length > 0) {
            const totalCartItemAmount = items.length > 1 ? items.reduce((prevItem, nextItem) => ((Number(prevItem.price || 0) * Number(prevItem.quantity || 0)) 
            + (Number(nextItem.price || 0) * Number(nextItem.quantity || 0)))): (items?.length > 0 && (Number(items[0]?.price) && Number(items[0].quantity)))
            const paymentItem = items.map((item)=>(
                {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }
            ))
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalCartItemAmount * 100,
                currency: "usd",
                metadata: {
                    orderedBy: req.user.id,
                    cartItems: JSON.stringify(paymentItem)
                }
            });
            return { clientSecret: paymentIntent.client_secret };
        }
        return { clientSecret: null }

    } catch (error) {
        throw new InternalServerError(error.message)
    }
}

export const paymentWebhook = async (req, res) => {
    const transaction = await db.transaction()
    res.status(200).json({ received: true }); 
    try {
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const {orderedBy, cartItems } = paymentIntent.metadata
            const order = await Order.create({orderedBy, amount: paymentIntent.amount, userId: orderedBy}, { transaction});
            const orderItems = JSON.parse(cartItems).map(cartItem => ({
                itemId: cartItem.id,
                orderId: order.dataValues.id,
                quantity: cartItem.quantity
            }))
            await OrderItem.bulkCreate(orderItems, {transaction})
            await Payment.create({
                gatewayPaymentId: paymentIntent.id,
                amount: paymentIntent.amount,
                status: paymentIntent.status,
                orderId: order.dataValues.id
            }, { transaction})
            await Shipping.create({
                userId: orderedBy,
                orderId: order.dataValues.id,
                address: paymentIntent.shipping.address.line1,
                city: paymentIntent.shipping.address.city,
                phone: paymentIntent.shipping.phone,
                email: paymentIntent.shipping.email,
                postalCode: paymentIntent.shipping.address.postal_code,
                state: paymentIntent.shipping.state
            }, {transaction})

            await Notification.create({
                read: false,
                message: `You have a new order`,
                notificationType: 'OrderNotification'
            }, {transaction: transaction})
            // const userCart = await Cart.findOne({where: {userId: orderedBy}, attributes:['id']})
            // await CartItem.destroy({where:{
            //     cartId: userCart.id
            // }})
            sendNotification()
            await transaction.commit()
        }
    }
    catch (err) {
        await transaction.rollback()
        console.log(err)
        throw new InternalServerError(err)
    }
}

export const getPayments = async(req) =>{
    const { page, size, status, gatewayPaymentId, paymentType,
         paymentGateway, amount, orderId, fromDate, toDate } = req.query;
    const user = req.user
    if (!req.user.isAdmin) {
        throw new UnauthorizedError('Only admin is allowed to complete operation')
    }
    const { limit, offset } = getPagination(page, size);
    const queryOpts = {}

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

        if (orderId) {
            queryOpts.where = {
                ...queryOpts.where,
                [Op.or]: [
                    {
                        orderId: { [Op.like]: `%${orderId}%` }
                    }
                ]
            }
        }

        if(fromDate && !toDate){
            queryOpts.where = {
                ...queryOpts.where,
                    createdAt:  {[Op.gte]: new Date(fromDate)}
            }
        }

        if(!fromDate && toDate){
            queryOpts.where = {
                ...queryOpts.where,
                    createdAt:  {[Op.lte]: new Date(toDate)}
            }
        }

        if(fromDate && toDate){
            queryOpts.where = {
                ...queryOpts.where,
                    createdAt:  { 
                        [Op.between]: [new Date(fromDate), new Date(toDate)]}
            }
        }

        if(amount){
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
                attributes: ['id']
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