import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"


export const addCategorySchema= joi.object({
    name:joi.string().required().min(3).custom(detectInjection),
    image:joi.string().optional().custom(detectInjection)
})

export const updateCategorySchema =joi.object({
    name:joi.string().optional().min(3).custom(detectInjection),
    image:joi.string().optional().custom(detectInjection)
})