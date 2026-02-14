import Joi from 'joi'

export const cartItemSchema = Joi.object({
     itemId: Joi.number()
         .required(),
    cartItems: Joi.array().optional()
})