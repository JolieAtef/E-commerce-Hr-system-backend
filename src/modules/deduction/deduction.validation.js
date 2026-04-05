import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const addDeductionSchema = joi.object({
    amount:joi.number().min(0).required().custom(detectInjection),
    reason:joi.string().min(3).required().custom(detectInjection)
})

export const updateDeductionSchema = joi.object({
    amount:joi.number().min(0).optional().custom(detectInjection),
    reason:joi.string().min(3).optional().custom(detectInjection)
})