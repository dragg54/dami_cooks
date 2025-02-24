import { Router } from 'express'
import { createItem, getAllItems, updateItem, deleteItem, getItemById }
 from '../controllers/ItemController.js'
import upload from '../middlewares/upload.js'

export const itemRoute = Router()

itemRoute.post("/", createItem)
itemRoute.put("/:id", upload.single('image'), updateItem)
itemRoute.get("/:id", getItemById)
itemRoute.get("/", upload.single('image'), getAllItems)
itemRoute.delete("/:id", deleteItem)