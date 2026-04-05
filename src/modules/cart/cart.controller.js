import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { addToCartSchema, itemQuantitySchema } from "./cart.validation.js"
import { addToCart, clearCart, getMyCart, removeItem, updateItemQuantity } from "./cart.service.js"


let router = express.Router()

router.post("/", authenticate, authorize("user"), validation(addToCartSchema), addToCart)
router.get("/", authenticate, authorize("user"), getMyCart)
router.put("/:productId", authenticate ,authorize("user"),validation(itemQuantitySchema), updateItemQuantity )
router.delete("/:productId", authenticate, authorize("user"),removeItem )
router.delete("/", authenticate , authorize("user"), clearCart)

export default router