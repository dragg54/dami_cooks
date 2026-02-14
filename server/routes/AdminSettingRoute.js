import { Router } from 'express'
import { authMiddleware } from '../middlewares/validate.js'
import { getAdminSettings, updateAdminSettings } from '../controllers/AdminSettingController.js'
import { validateAdmin } from '../middlewares/validateAdmin.js'

export const adminSettingRoute = Router()

adminSettingRoute.put("/", authMiddleware, validateAdmin, updateAdminSettings)
adminSettingRoute.get("/", getAdminSettings)