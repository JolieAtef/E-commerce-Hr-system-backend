import express from "express"
import { databaseConnection } from "./database/connection.js"
import { env } from "../config/env.service.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import categoryRouter from "./modules/category/category.controller.js"
import subCategoryRouter from "./modules/subcategory/subcategory.controller.js"
import { adminProductRouter , publicProductRouter } from "./modules/product/product.controller.js"
import cartRouter from "./modules/cart/cart.controller.js"
import { orderRouter , adminOrderRouter } from "./modules/order/order.controller.js"
import staffRouter from "./modules/staff/staff.controller.js"
import attendanceRouter from "./modules/attendance/attendance.controller.js"
import deductionRouter from "./modules/deduction/deduction.controller.js"

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
    app.use("/api/v1/cart", cartRouter)
    app.use("/api/v1/orders", orderRouter)
    app.use("/api/v1/admin/orders", adminOrderRouter)
    app.use("/api/v1/admin/staff", staffRouter)
    app.use("/api/v1/staff", attendanceRouter)
    app.use("/api/v1/admin/staff/:id/deductions",deductionRouter )

    
    app.listen(env.port, ()=>{
        console.log("server running on port 3000")
    })
}