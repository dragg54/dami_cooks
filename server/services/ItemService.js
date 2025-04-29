import { BadRequestError } from "../exceptions/BadRequestError.js";
import { DuplicateError } from "../exceptions/DuplicateError.js";
import { NotFoundError } from "../exceptions/NotFoundError.js"
import { UnauthorizedError } from "../exceptions/UnauthorizedError.js"
import {Item} from "../models/Item.js";
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from "../utils/uploadImage.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { literal, Op } from "sequelize";
import { ItemCategory } from "../models/ItemCategory.js";
import { generateCd } from "../utils/generateCd.js";

export const getAllItems = async (req) => {
    const { page, size, status, searchText, name, itemCd, itemCategory, price, itemType } = req.query; 
    const { limit, offset } = getPagination(page, size);

    const queryOpts = {where:{}}
    const itemCategoryOpts = {where:{}}
    if(status != null){
        queryOpts['where'] = {...queryOpts.where, status: status.toUpperCase()}
    }

    if(itemCategory){
        itemCategoryOpts['where'] = {"name": itemCategory}
    }

    if(itemCd){
        itemCategoryOpts['where'] = {"itemCd": itemCd}
    }

    if (searchText) {
        queryOpts['where'] = {
            ...queryOpts['where'],
            [Op.or]: [
                literal(`LOWER(item.name) LIKE LOWER('%${searchText}%')`),
                literal(`LOWER(description) LIKE LOWER('%${searchText}%')`),
            ]
        }
    }

    if(name){
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    name: { [Op.like]: `%${name}%` }
                }
            ]
        }
    }

    if(price){
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    price: Number(price)
                }
            ]
        }
    }

    if(itemType){
        queryOpts.where = {
            ...queryOpts.where,
            [Op.or]: [
                {
                    itemType: { [Op.like]: `%${itemType}%` }
                }
            ]
        }
    }

    const data = await Item.findAndCountAll({
        limit,
      offset,
      distinct: true,
      include:[{
        model: ItemCategory,
        attributes: ["id", "name"],
        ...itemCategoryOpts
      }],
      order: [["createdAt", "DESC"]],
      ...queryOpts
    });

    return getPagingData(data, page, limit)
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
    return await Item.create({...req.body, imageUrl: cloudinaryImageUrl, itemCd: generateCd("ITM")});
};

export const updateItem = async (req) => {
    const { id } = req.params
 
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
    let cloudinaryImageUrl
    if(req?.file?.path){
        const path = req.file.path
        cloudinaryImageUrl = await uploadImage(path)
    }
    if(req.body.status == 'null'){
        req.body.status = null
    }
    return await item.update({...req.body, imageUrl: cloudinaryImageUrl || req.body.imageUrl}, { where: { id } });
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

function generateItemCd() {
    const now = Date.now().toString(); 
    const shortTimestamp = now.slice(-5); 
    const randomPart = Math.floor(Math.random() * 10); 
    return `ORD${shortTimestamp}${randomPart}`;
} 
