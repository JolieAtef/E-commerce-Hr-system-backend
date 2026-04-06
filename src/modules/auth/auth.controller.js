import express from "express"
import { forgetPassword, getAccessToken, login, resendVerification, resetPassword, signup, verify } from "./auth.service.js"
import { validation } from "../../utils/validation.js"
import { emailSchema, loginSchema, resetPasswordSchema, signupSchema } from "./auth.validation.js"


let router = express.Router()

router.post("/signup",validation(signupSchema), signup)
router.post("/login" ,validation(loginSchema), login)
router.get("/verify-email/:token",verify)
router.post("/resend-verification",validation(emailSchema),resendVerification)
router.post("/forgot-password",validation(emailSchema),forgetPassword)
router.post("/reset-password/:token",validation(resetPasswordSchema),resetPassword)
router.post("/new-access-token", getAccessToken )


export default router