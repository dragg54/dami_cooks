import Joi from 'joi'

export const orderPaymentSchema = Joi.object({
     idempotencyKey: Joi.string()
         .required(),
    items: Joi.array().required(),
    deliveryMethod: Joi.string().valid('pickup', 'delivery').required(),
    shipping: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
    }).optional().allow(null),
    bookingId: Joi.string().optional(),
})

export const orderStatusUpdateSchema = Joi.object({
     status: Joi.string()
         .valid('PENDING','PLACED','CONFIRMED','MERCHANT_CANCELLED', 'REJECTED', 'FAILED', 'CANCELLED', 'SHIPPED', 'DELIVERED')
         .required(),
})
