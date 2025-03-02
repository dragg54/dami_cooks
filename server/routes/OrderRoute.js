import { Router } from 'express'
import { createOrder, getAllOrders, updateOrderStatus , getOrderById }
 from '../controllers/OrderController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const orderRoute = Router()

orderRoute.post("/", authMiddleware, createOrder)
orderRoute.put("/:id", authMiddleware, updateOrderStatus)
orderRoute.get("/:id", authMiddleware, getOrderById)
orderRoute.get("/", authMiddleware, getAllOrders)
