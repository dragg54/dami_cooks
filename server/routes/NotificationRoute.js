import { Router } from 'express'
import { createNotification, getAllNotifications, updateNotification }
 from '../controllers/NotificationController.js'
import { authMiddleware } from '../middlewares/validate.js'

export const notificationRoute = Router()

notificationRoute.post("/", createNotification)
notificationRoute.put("/", authMiddleware, updateNotification)
notificationRoute.get("/",  getAllNotifications)
