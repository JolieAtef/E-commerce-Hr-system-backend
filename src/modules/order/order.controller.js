import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { checkoutSchema, updateStatusSchema } from "./order.validation.js"
import { checkout, getAllOrders, getMyOrders, getOrderDetails, updateOrderStatus } from "./order.service.js"


export const orderRouter = express.Router()

orderRouter.post("/checkout", authenticate ,authorize("user"), validation(checkoutSchema),checkout)
orderRouter.get("/",authenticate ,authorize("user") , getMyOrders)
orderRouter.get("/:id", authenticate , authorize("user"), getOrderDetails)







export const adminOrderRouter = express.Router()


adminOrderRouter.get("/", authenticate, authorize("admin"), getAllOrders)
adminOrderRouter.patch("/:id/status", authenticate ,authorize("admin"),validation(updateStatusSchema),updateOrderStatus )



