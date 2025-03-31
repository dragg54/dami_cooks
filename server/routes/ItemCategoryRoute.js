import { Router } from 'express'
import { getItemCategories }
 from '../controllers/ItemCategoryController.js'

export const itemRouteCategoryRoute = Router()

itemRouteCategoryRoute.get("/", getItemCategories)