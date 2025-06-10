import { Router } from 'express'
import { createSubItem, getAllSubItems, updateSubItem, deleteSubItem, getSubItemById }
 from '../controllers/SubItemController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const subItemRoute = Router()

subItemRoute.post("/", authMiddleware, createSubItem)
subItemRoute.put("/:id", authMiddleware, updateSubItem)
subItemRoute.get("/:id", getSubItemById)
subItemRoute.get("/", getAllSubItems)
subItemRoute.delete("/:id", deleteSubItem)