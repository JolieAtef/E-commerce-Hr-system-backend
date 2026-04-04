import joi from "joi"
import detectInjection from "../../utils/detectInjection.js"



export const updateProfileSchema = joi.object({
    name:joi.string().optional().min(3).custom(detectInjection),
    email:joi.string().email().optional().custom(detectInjection),
    phone:joi.string().min(11).optional().custom(detectInjection),
    address:joi.string().optional().min(10).custom(detectInjection),
    avatar:joi.string().optional().custom(detectInjection)
  }
)

export const avatarSchema = joi.object({
    avatar:joi.string().optional().custom(detectInjection)
})