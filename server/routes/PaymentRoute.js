import { Router } from "express";
import express from "express";
import { authMiddleware } from "../middlewares/validate.js";
import { getPayments, initializePayment, paymentWebhook, getTotalRevenue } from "../controllers/PaymentController.js";

export const paymentRoute = Router()

paymentRoute.post("/", authMiddleware, initializePayment)
paymentRoute.post('/webhook', express.raw({ type: "application/json" }), paymentWebhook)
paymentRoute.get("/", authMiddleware, getPayments)
paymentRoute.get("/totalRevenue", authMiddleware, getTotalRevenue)