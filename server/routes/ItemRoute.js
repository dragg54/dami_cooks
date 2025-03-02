import { Router } from 'express'
import { createItem, getAllItems, updateItem, deleteItem, getItemById }
 from '../controllers/ItemController.js'
import upload from '../middlewares/upload.js'
import { authMiddleware } from '../middlewares/validate.js'

export const itemRoute = Router()

itemRoute.post("/", authMiddleware, upload.single('image'), createItem)
itemRoute.put("/:id", authMiddleware,  upload.single('image'), updateItem)
itemRoute.get("/:id", getItemById)
itemRoute.get("/",  getAllItems)
itemRoute.delete("/:id", authMiddleware, deleteItem)