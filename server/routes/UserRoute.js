import { Router } from 'express'
import { createUser, loginUser } from '../controllers/UserController.js'

export const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/login', loginUser)