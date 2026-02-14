import { Router } from 'express'
import { createAllergen, getAllAllergens, updateAllergen, deleteAllergen, getAllergenById }
 from '../controllers/AllergenController.js'
import { authMiddleware } from '../middlewares/validate.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const allergenRoute = Router()

allergenRoute.post("/", authMiddleware, validateAdmin, createAllergen)
allergenRoute.put("/:id", authMiddleware, validateAdmin, updateAllergen)
allergenRoute.get("/:id", getAllergenById)
allergenRoute.get("/", getAllAllergens)
allergenRoute.delete("/:id", authMiddleware, deleteAllergen)