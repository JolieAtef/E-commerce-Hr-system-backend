import express from "express"
import { databaseConnection } from "./database/connection.js"
import { env } from "../config/env.service.js"
import { sendEmail } from "./common/email/sendEmail.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import categoryRouter from "./modules/category/category.controller.js"
import subCategoryRouter from "./modules/subcategory/subcategory.controller.js"
import { adminProductRouter , publicProductRouter } from "./modules/product/product.controller.js"

export const bootstrap = ()=>{
    const app = express()
    app.use(express.json())
    databaseConnection()
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/users", userRouter)
    app.use("/api/v1/categories",categoryRouter)
    app.use("/api/v1/subcategories", subCategoryRouter)
    app.use("/api/v1/admin/products", adminProductRouter)
    app.use("/api/v1/products", publicProductRouter)

    // sendEmail("gogoatef666@gmail.com", "hello", "helllllo", `<button><a href="/">nfjiv</a></button>`)
    app.listen(env.port, ()=>{
        console.log("server running on port 3000")
    })
}