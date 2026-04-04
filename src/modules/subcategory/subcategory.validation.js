import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const addSubcategorySchema = joi.object({
    name:joi.string().required().min(3).custom(detectInjection),
    category:joi.string().required().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection)
})

export const updateSubcategorySchema = joi.object({
    name:joi.string().optional().min(3).custom(detectInjection),
    category:joi.string().optional().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection)
})

