import { Router } from "express";
import { authMiddleware } from "../middlewares/validate.js";
import { initializePayment } from "../controllers/PaymentController.js";

export const paymentRoute = Router()


paymentRoute.post("/", authMiddleware, initializePayment)