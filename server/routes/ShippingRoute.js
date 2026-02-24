import { Router } from 'express'
import { authMiddleware } from '../middlewares/validate.js'
import { getAllShippings, getDeliveryQuote, processShippingWebhookEvents } from '../controllers/ShippingController.js'

export const shippingRoute = Router()

shippingRoute.post("/quotes", authMiddleware, getDeliveryQuote)
shippingRoute.post("/webhook", processShippingWebhookEvents)
// shippingRoute.put("/", authMiddleware, updateNotification)
shippingRoute.get("/",  authMiddleware, getAllShippings)
