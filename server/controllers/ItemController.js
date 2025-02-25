import * as itemService from '../services/ItemService.js'

export const createItem = async (req, res) => {
    try {
        await itemService.createItem(req)
        res.json("Item created")
    }
    catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateItem = async (req, res) => {
    try {
        await itemService.updateItem(req)
        res.json("Item updated")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const deleteItem = async (req, res) => {
    try {
        await itemService.deleteItem(req)
        res.json("Item deleted")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}


export const getAllItems = async (req, res) => {
    try {
        const items = await itemService.getAllItems(req)
        res.json(items)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getItemById = async (req, res) => {
    try {
        const item = await itemService.getItemById(req)
        res.json(item)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




