import { Router } from 'express'
import { createItem, getAllItems, updateItem, deleteItem, getItemById }
 from '../controllers/ItemController.js'
import upload from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/validate.js'
import { itemSchema, updateItemSchema } from '../schemas/ItemSchema.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const itemRoute = Router()

itemRoute.post("/", authMiddleware, validateAdmin,  upload.single('image'), validateRequest(itemSchema), createItem)
itemRoute.put("/:id", authMiddleware, validateAdmin,  upload.single('image'), validateRequest(updateItemSchema), updateItem)
itemRoute.get("/:id", getItemById)
itemRoute.get("/",  getAllItems)
itemRoute.delete("/:id", authMiddleware, validateAdmin, deleteItem)