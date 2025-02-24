import * as subitemService from '../services/SubItemService.js'

export const createSubItem = async (req, res) => {
    try {
        await subitemService.createSubItem(req)
        res.json("SubItem created")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateSubItem = async (req, res) => {
    try {
        await subitemService.updateSubItem(req)
        res.json("SubItem updated")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const deleteSubItem = async (req, res) => {
    try {
        await subitemService.deleteSubItem(req)
        res.json("SubItem deleted")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}


export const getAllSubItems = async (req, res) => {
    try {
        const subItems = await subitemService.getAllSubItems(req)
        res.json(subItems)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getSubItemById = async (req, res) => {
    try {
        const subItem = await subitemService.getSubItemById(req)
        res.json(subItem)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




