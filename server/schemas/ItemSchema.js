import Joi from 'joi'

export const itemSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().label("Name"),
  itemCategoryId:  Joi.string().required().label("Item Category Id"),
  description: Joi.string().allow(null, "").label("Description"),
  image: Joi.string().allow('undefined'),
  price: Joi.number().precision(2).positive().required().label("Price"),
  itemType: Joi.string().valid("MAIN_ITEM", "SUB_ITEM").default("MAIN_ITEM").label("Item Type"),
  uom: Joi.string().required().label("Unit of Measure (UOM)"),
  status: Joi.string().valid("OFFLINE", "ONLINE", "OUTOFSTOCK").default("OFFLINE").label("Status"),
});


export const updateItemSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().label("Name"),
  itemCategoryId:  Joi.string().required().label("Item Category Id"),
  description: Joi.string().allow(null, "").label("Description"),
  image: Joi.string().allow('undefined'),
  price: Joi.number().precision(2).positive().required().label("Price"),
  itemType: Joi.string().valid("MAIN_ITEM", "SUB_ITEM").default("MAIN_ITEM").label("Item Type"),
  uom: Joi.string().required().label("Unit of Measure (UOM)"),
  status: Joi.string().valid("OFFLINE", "ONLINE", "OUTOFSTOCK").allow(null).default("OFFLINE").label("Status"),
  imageUrl: Joi.string().allow(null, "")
})