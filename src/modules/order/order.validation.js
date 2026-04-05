import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const checkoutSchema = joi.object({
    paymentMethod:joi.string().required().valid("cod","card").custom(detectInjection),
    shippingAddress:joi.object({
        street:joi.string().required().min(3).custom(detectInjection),
        country:joi.string().required().min(3).custom(detectInjection)
       })
})

export const updateStatusSchema = joi.object({
    orderStatus:joi.string().required().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').custom(detectInjection)
})