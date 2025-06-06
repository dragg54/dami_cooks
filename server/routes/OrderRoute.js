import { Router } from 'express'
import { createOrder, getAllOrders, updateOrderStatus, getOrderAggregates , getOrderById, cancelOrder }
 from '../controllers/OrderController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const orderRoute = Router()

orderRoute.post("/", authMiddleware, createOrder)
orderRoute.patch("/:id/status", authMiddleware, updateOrderStatus)
orderRoute.get("/aggregates", authMiddleware, getOrderAggregates)
orderRoute.get("/:id", authMiddleware, getOrderById)
orderRoute.get("/", authMiddleware, getAllOrders)
orderRoute.patch("/:id/cancellation", authMiddleware, cancelOrder)