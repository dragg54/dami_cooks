import { Router } from 'express'
import { createItem, getAllItems, updateItem, deleteItem, getItemById }
 from '../controllers/ItemController.js'
import upload from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/validate.js'
import { itemSchema, updateItemSchema } from '../schemas/ItemSchema.js'
import { validateRequest } from '../middlewares/validateRequest.js'

export const itemRoute = Router()

itemRoute.post("/", authMiddleware,  upload.single('image'), validateRequest(itemSchema), createItem)
itemRoute.put("/:id", authMiddleware,  upload.single('image'), validateRequest(updateItemSchema), updateItem)
itemRoute.get("/:id", getItemById)
itemRoute.get("/",  getAllItems)
itemRoute.delete("/:id", authMiddleware, deleteItem)