import { Router } from 'express'
import { changePassword, createUser, getAdmin, loginUser, updateUser } from '../controllers/UserController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/admin', authMiddleware, getAdmin)
userRouter.put('/:id/password', authMiddleware, changePassword)
userRouter.put('/:id', authMiddleware, updateUser)