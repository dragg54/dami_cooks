import { Router } from 'express'
import { getAllCustomers }
 from '../controllers/CustomerController.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const customerRouter = Router()

customerRouter.get("", validateAdmin, getAllCustomers)