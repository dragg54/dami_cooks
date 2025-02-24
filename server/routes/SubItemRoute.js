import { Router } from 'express'
import { createSubItem, getAllSubItems, updateSubItem, deleteSubItem, getSubItemById }
 from '../controllers/SubItemController.js'

export const subItemRoute = Router()

subItemRoute.post("/", createSubItem)
subItemRoute.put("/:id", updateSubItem)
subItemRoute.get("/:id", getSubItemById)
subItemRoute.get("/", getAllSubItems)
subItemRoute.delete("/:id", deleteSubItem)