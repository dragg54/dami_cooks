import { BadRequestError } from "../exceptions/BadRequestError.js";
import { DuplicateError } from "../exceptions/DuplicateError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { SubItem } from "../models/SubItem.js";
import {Item} from "../models/Item.js"

export const getAllSubItems = async () => {
    return await SubItem.findAll();
};

export const getSubItemById = async (req) => {
    const { id } = req.params
    const subItem = await SubItem.findByPk(id);
    if(!subItem){
        const errMsg = $`SubItem with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return subItem
};

export const createSubItem = async (req) => {
    const { itemId, name } = req.body
    const item = await Item.findOne({id: itemId})
    if(!item){
        const errMsg = `Item with id ${itemId} does not exist`;
        throw new BadRequestError(errMsg)
    }
    const existingSubItem = await SubItem.findOne({ where: { itemId, name } })
    if (existingSubItem) {
        const errMsg = "SubItem already exists"
        throw new DuplicateError(existingSubItem)
    }
    return await SubItem.create(req.body);
};

export const updateSubItem = async (req) => {
    const { id } = req.params
    const subItem = await SubItem.findByPk(id);
    if (!subItem) {
        const errMsg = `SubItem with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    return await SubItem.update(req.body, { where: { id } });
};

export const deleteSubItem = async (req) => {
    const { id } = req.params
    const subItem = await SubItem.findByPk(id);
    if (!subItem) {
        const errMsg = `SubItem with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    await SubItem.destroy({where: {id}});
};
