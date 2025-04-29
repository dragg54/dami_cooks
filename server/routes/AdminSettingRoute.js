import { Router } from 'express'
import { authMiddleware } from '../middlewares/validate.js'
import { getAdminSettings, updateAdminSettings } from '../controllers/AdminSettingController.js'

export const adminSettingRoute = Router()

adminSettingRoute.put("/", authMiddleware, updateAdminSettings)
adminSettingRoute.get("/", authMiddleware, getAdminSettings)