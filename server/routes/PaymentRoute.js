import { Router } from "express";
import express from "express";
import { authMiddleware } from "../middlewares/validate.js";
import { getPayments, initializePayment, paymentWebhook, getTotalRevenue } from "../controllers/PaymentController.js";
import { orderPaymentSchema } from "../schemas/OrderSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";

export const paymentRoute = Router()

paymentRoute.post("/", authMiddleware, validateRequest(orderPaymentSchema), initializePayment)
paymentRoute.post('/webhook', express.raw({ type: "application/json" }), paymentWebhook)
paymentRoute.get("/", authMiddleware, getPayments)
paymentRoute.get("/totalRevenue", authMiddleware, getTotalRevenue)