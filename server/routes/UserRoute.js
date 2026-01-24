import { Router } from 'express'
import { changePassword, createUser, forgotPassword, getAdmin, loginUser, resendEmailVerification, resetPassword, updateUser, verifyEmail } from '../controllers/UserController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/login', loginUser)
userRouter.get('/admin', authMiddleware, getAdmin)
userRouter.put('/:id/password', authMiddleware, changePassword)
userRouter.put('/:id', authMiddleware, updateUser)
userRouter.post('/tokenVerification', verifyEmail)
userRouter.post('/tokenVerification/resend', resendEmailVerification)
userRouter.post('/sendResetPasswordLink', forgotPassword)
userRouter.post('/resetPassword', resetPassword)

