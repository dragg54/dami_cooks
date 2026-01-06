import { Router } from 'express'
import { authMiddleware } from '../middlewares/validate.js'
import { getAllShippings, getDeliveryQuote, processShippingWebhook } from '../controllers/ShippingController.js'

export const shippingRoute = Router()

shippingRoute.post("/quotes", authMiddleware, getDeliveryQuote)
shippingRoute.post("/webhook", processShippingWebhook)
// shippingRoute.put("/", authMiddleware, updateNotification)
shippingRoute.get("/",  authMiddleware, getAllShippings)
