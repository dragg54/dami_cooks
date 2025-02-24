import { ItemCategory } from "../models/ItemCategory.js"

export const getCategories = async(req) =>{
    const categories = await ItemCategory.findAll()
    return categories
}