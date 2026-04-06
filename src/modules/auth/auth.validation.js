import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"



export const signupSchema = joi.object({
    name:joi.string().required().min(3).custom(detectInjection),
    email:joi.string().email().required().custom(detectInjection),
    password:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).custom(detectInjection),
    confirmPassword:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).valid(joi.ref("password")).custom(detectInjection),
    phone:joi.number().min(11).required().custom(detectInjection),
    address:joi.string().required().min(10).custom(detectInjection),
    role:joi.string().optional().valid("admin", "user", "staff")
})


export const loginSchema = joi.object({
    email:joi.string().email().required().custom(detectInjection),
    password:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).custom(detectInjection),
})

export const emailSchema=joi.object({
    email:joi.string().email().required().custom(detectInjection),
})


export const resetPasswordSchema = joi.object({
    password:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).custom(detectInjection),
    confirmPassword:joi.string().required().min(8).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$")).valid(joi.ref("password")).custom(detectInjection)
})