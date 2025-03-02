import { Router } from 'express'
import { createCart, getAllCarts, getCartById }
 from '../controllers/CartController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const cartRoute = Router()

cartRoute.post("/", authMiddleware, createCart)
cartRoute.get("/:id", authMiddleware, getCartById)
cartRoute.get("/", authMiddleware, getAllCarts)
