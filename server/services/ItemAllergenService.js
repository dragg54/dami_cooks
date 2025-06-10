import { BadRequestError } from "../exceptions/BadRequestError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { ItemAllergen } from "../models/ItemAllergen.js";

export const getAllItemAllergen = async () => {
    return await ItemAllergen.findAll();
};

export const getItemAllergenById = async (req) => {
    const { id } = req.params
    const ItemAllergen = await ItemAllergen.findByPk(id);
    if(!ItemAllergen){
        const errMsg = $`ItemAllergen with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return ItemAllergen
};

export const createItemAllergen = async (req, transaction) => {
    if (!Array.isArray(req.allergens) || req.allergens.length < 1) {
        throw new BadRequestError("Failed to add item allergens. Item allergens are empty ")
    }
    await ItemAllergen.bulkCreate(req.allergens, { transaction })
}


export const updateItemAllergen = async (req, transaction) => {
    if (!Array.isArray(req.allergens) || req.allergens.length < 1) {
        throw new BadRequestError("Failed to add item allergens. Item allergens are empty ")
    }
    await ItemAllergen.destroy({where: {itemId: req.allergens[0].itemId}, transaction})
    return await ItemAllergen.bulkCreate(req.allergens, { transaction });
};

export const deleteItemAllergen = async (req) => {
    const { id } = req.params
    const Itemallergen = await ItemAllergen.findByPk(id);
    if (!Itemallergen) {
        const errMsg = `ItemAllergen with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    await ItemAllergen.destroy({where: {id}});
};



