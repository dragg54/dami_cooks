import { BadRequestError } from "../exceptions/BadRequestError.js";
import { DuplicateError } from "../exceptions/DuplicateError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import {Item} from "../models/Item.js";
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from "../utils/uploadImage.js";

export const getAllItems = async (req) => {
    return await Item.findAll();
};

export const getItemById = async (req) => {
    const { id } = req.params
    const item = await Item.findByPk(id);
    if(!item){
        const errMsg = $`Item with id ${id} not found`
        throw new NotFoundError(errMsg)
    }
    return item
};

export const createItem = async (req) => {
    const { itemCategoryId, name } = req.body
    if(!req.file){
        throw new BadRequestError("Invalid file upload")
    }
    const { path } = req.file
    const { isAdmin } = req.user
    if(!isAdmin){
        const errMsg = `Failed to create item: Only admin is authorized to create an item`
        throw new UnauthorizedError(errMsg)
    } 
    const existingItem = await Item.findOne({ where: { itemCategoryId, name } })
    if (existingItem) {
        const errMsg = "Item already exists"
        throw new DuplicateError(errMsg)
    }
    const cloudinaryImageUrl = await uploadImage(path)
    return await Item.create({...req.body, imageUrl: cloudinaryImageUrl});
};

export const updateItem = async (req) => {
    const { id } = req.params
    const { path } = req.files
    const { isAdmin } = req.user
    if(!isAdmin){
        const errMsg = `Failed to create item: Only admin is authorized to create an item`
        throw new UnauthorizedError(errMsg)
    } 
    const item = await Item.findByPk(id);
    if (!item) {
        const errMsg = `Item with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    const cloudinaryImageUrl = await uploadImage(path)
    return await item.update({...req.body, imageUrl: cloudinaryImageUrl}, { where: { id } });
};

export const deleteItem = async (req) => {
    const { id } = req.params
    const item = await Item.findByPk(id);
    if (!item) {
        const errMsg = `Item with id ${id} does not exist`
        throw new BadRequestError(errMsg)
    };
    await item.destroy({where: {id}});
    return true;
};
