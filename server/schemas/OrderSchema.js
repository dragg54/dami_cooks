import Joi from 'joi'

export const orderPaymentSchema = Joi.object({
     idempotencyKey: Joi.string()
         .required(),
    items: Joi.array().required(),
    deliveryMethod: Joi.string().valid('pickup', 'delivery').required(),
    shipping: Joi.object({
        address: Joi.string().optional(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        phone: Joi.string().optional(),
        deliveryMethod: Joi.string().optional(),
        email: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        postalCode: Joi.string().optional(),
    }).optional().allow(null),
    bookingId: Joi.string().optional(),
})

export const orderStatusUpdateSchema = Joi.object({
    id: Joi.number(),
     status: Joi.string()
         .valid('PENDING','PLACED','CONFIRMED','MERCHANT_CANCELLED', 'REJECTED', 'FAILED', 'CANCELLED', 'SHIPPED', 'DELIVERED')
         .required(),
})
