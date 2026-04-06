import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"

export const bonusSchema = joi.object({
    bonus:joi.number().required().min(0).custom(detectInjection)
})