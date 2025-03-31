import * as itemCategoryService from "../services/ItemCategoryService.js"

export const getItemCategories = async (req, res) => {
    try {
        const itemCategories = await itemCategoryService.getCategories(req)
        res.json(itemCategories)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}