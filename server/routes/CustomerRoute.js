import { Router } from 'express'
import { getAllCustomers }
 from '../controllers/CustomerController.js'

export const customerRouter = Router()

customerRouter.get("", getAllCustomers)