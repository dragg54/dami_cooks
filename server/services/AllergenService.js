import { BadRequestError } from "../exceptions/BadRequestError.js";
import { DuplicateError } from "../exceptions/DuplicateError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { Allergens } from "../models/Allergens.js";
import {Item} from "../models/Item.js"
import { uploadImage } from "../utils/uploadImage.js";

export const getAllAllergens = async () => {
    return await Allergens.findAll();
};

export const getAllergenById = async (req) => {
    const { id } = req.params
    const Allergen = await Allergens.findByPk(id);
    if(!Allergen){
        const errMsg = $`Allergen with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return Allergen
};

export const createAllergen = async (req) => {
    const { name } = req.body

    return await Allergens.create({name})
};

export const updateAllergen = async (req) => {
    const { id } = req.params   
    const existingAllergens = await Allergens.findByPk(id)
    if(!existingAllergens){
        throw new BadRequestError("Allergen must exist before it can be updated")
    }
    return await Allergens.update({name: req.body.name}, { where: { id } });
};

export const deleteAllergen = async (req) => {
    const { id } = req.params
    const allergen = await Allergens.findByPk(id);
    if (!allergen) {
        const errMsg = `Allergen with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    await Allergens.destroy({where: {id}});
};

