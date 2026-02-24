import { Router } from 'express'
import { getAllCustomers }
 from '../controllers/CustomerController.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'
import { authMiddleware } from '../middlewares/validate.js'

export const customerRouter = Router()

customerRouter.get("", authMiddleware, validateAdmin, getAllCustomers)