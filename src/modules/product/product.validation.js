import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const addProductSchema =  joi.object({
    name:joi.string().required().min(3).custom(detectInjection),
    description:joi.string().required().min(10).custom(detectInjection),
    price:joi.number().min(0).required().custom(detectInjection),
    stock:joi.number().min(0).required().custom(detectInjection),
    category:joi.string().required().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
    subcategory:joi.string().required().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
    images:joi.array().items(joi.string()).optional().custom(detectInjection)
})

export const updateProductSchema =  joi.object({
    name:joi.string().optional().min(3).custom(detectInjection),
    description:joi.string().optional().min(10).custom(detectInjection),
    price:joi.number().min(0).optional().custom(detectInjection),
    category:joi.string().optional().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
    subcategory:joi.string().optional().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
    images:joi.array().items(joi.string()).optional().custom(detectInjection)
})

export const updateQuantitySchema = joi.object({
    stock:joi.number().min(0).required().custom(detectInjection)
})