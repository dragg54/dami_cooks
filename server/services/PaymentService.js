import dotenv from 'dotenv'
import { InternalServerError } from '../exceptions/InternalServerError.js'
import { stripe } from "../configs/stripe.js"
import { BadRequestError } from '../exceptions/BadRequestError.js'

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
            });
            return { clientSecret: paymentIntent.client_secret };
        }
        return { clientSecret: null }

    } catch (error) {
        throw new InternalServerError(error.message)
    }
}