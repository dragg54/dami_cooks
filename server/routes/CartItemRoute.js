import { Router } from 'express'
import { createCartItem, deleteCartItem, getAllCartItems }
 from '../controllers/CartItemController.js'
import { authMiddleware } from '../middlewares/validate.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { cartItemSchema } from '../schemas/CartItemSchema.js'

export const cartItemRoute = Router()

cartItemRoute.post("/", authMiddleware, validateRequest(cartItemSchema), createCartItem)
cartItemRoute.get("/", authMiddleware, getAllCartItems)
cartItemRoute.delete("/:id", authMiddleware, deleteCartItem)
