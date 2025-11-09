import db from '../configs/db.js'
import * as itemService from '../services/ItemService.js'

export const createItem = async (req, res) => {
    const transaction = await db.transaction()
    try {
        await itemService.createItem(req, transaction)
        await transaction.commit()
        res.json("Item created")
    }
    catch (error) {
        console.log(error)
        await transaction.rollback()
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateItem = async (req, res) => {
    const transaction = await db.transaction()
    try {
        await itemService.updateItem(req, transaction)
        await transaction.commit()
        res.json("Item updated")
    }
    catch (error) {
        console.log(error)
        await transaction.rollback()
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
        console.log(error)
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
        console.log(error)
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




