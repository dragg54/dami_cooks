import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js'
import { stripe } from "../configs/stripe.js"
import { Order } from '../models/Order.js'
import { Shipping } from '../models/Shipping.js'
import { OrderItem } from '../models/OrderItem.js'

dotenv.config()

export const initializePayment = async (req) => {
    const environment = process.env.NODE_ENV
    let clientUri = environment == "Production" ? process.env.PROD_CLIENT_URL : process.env.LOCAL_CLIENT_URL
    try {
        const { items } = req.body;
        if (items && items.length > 0) {
            const totalCartItemAmount = items.reduce((prevItem, nextItem) => ((Number(prevItem.price) * prevItem.quantity) + (Number(nextItem.price) * nextItem.quantity)))
            const paymentIntent = await stripe.paymentIntents.create({
                amount: totalCartItemAmount * 100,
                currency: "usd",
                metadata: {
                    orderedBy: req.user.id,
                    cartItems: JSON.stringify(items)
                }
            });
            return { clientSecret: paymentIntent.client_secret };
        }
        return { clientSecret: null }

    } catch (error) {
        throw new InternalServerError(error.message)
    }
}

export const paymentWebhook = async (req) => {
    try {
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const {orderedBy, cartItems } = paymentIntent.metadata
            const order = await Order.create({orderedBy, amountPaid: paymentIntent.amount, userId: orderedBy});
            const orderItems = JSON.parse(cartItems).map(cartItem => ({
                itemId: cartItem.id,
                orderId: order.dataValues.id,
                quantity: cartItem.quantity
            }))
            await OrderItem.bulkCreate(orderItems)
            await Shipping.create({
                userId: orderedBy,
                orderId: order.dataValues.id,
                address: paymentIntent.shipping.address.line1,
                city: paymentIntent.shipping.address.city,
                phone: paymentIntent.shipping.phone,
                email: paymentIntent.shipping.email,
                postalCode: paymentIntent.shipping.address.postal_code,
                state: paymentIntent.shipping.state
            })
        }
    }
    catch (err) {
        console.log(err.message)
        throw new InternalServerError(err.message)
    }
}