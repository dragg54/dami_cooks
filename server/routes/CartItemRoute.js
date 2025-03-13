import { Router } from 'express'
import { createCartItem, getAllCartItems }
 from '../controllers/CartItemController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const cartItemRoute = Router()

cartItemRoute.post("/", authMiddleware, createCartItem)
cartItemRoute.get("/", authMiddleware, getAllCartItems)
