import * as allergenService from '../services/AllergenService.js'

export const createAllergen = async (req, res) => {
    try {
        await allergenService.createAllergen(req)
        res.json("Allergen created")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const updateAllergen = async (req, res) => {
    try {
        await allergenService.updateAllergen(req)
        res.json("Allergen updated")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const deleteAllergen = async (req, res) => {
    try {
        await allergenService.deleteAllergen(req)
        res.json("Allergen deleted")
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}


export const getAllAllergens = async (req, res) => {
    try {
        const Allergens = await allergenService.getAllAllergens(req)
        res.json(Allergens)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}

export const getAllergenById = async (req, res) => {
    try {
        const Allergen = await allergenService.getAllergenById(req)
        res.json(Allergen)
    }
    catch (error) {
        res.status(error.statusCode || 500).json(error.message
            || "Internal server error"
        );
    }
}




