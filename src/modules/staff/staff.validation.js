import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"


export const addStaffSchema = joi.object({
    user:joi.string().required().pattern(new RegExp("/^[0-9a-fA-F]{24}$/")).custom(detectInjection),
    dailySalary:joi.number().required().min(0).custom(detectInjection),
    joinDate : joi.string().required().min(6).custom(detectInjection),
    department: joi.string().required().min(5).custom(detectInjection),
})

export const updateStaffSchema = joi.object({
    dailySalary:joi.number().required().min(0).custom(detectInjection),
    joinDate : joi.string().required().min(6).custom(detectInjection),
    department: joi.string().required().min(5).custom(detectInjection),
})