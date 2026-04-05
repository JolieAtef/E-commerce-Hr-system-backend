import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const addToCartSchema = joi.object({
        product:joi.string().required().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
        quantity:joi.number().required().min(1).custom(detectInjection)
})

export const itemQuantitySchema = joi.object({
    quantity:joi.number().required().min(1).custom(detectInjection)
})