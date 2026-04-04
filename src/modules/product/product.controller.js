import express from "express"
import {authenticate, authorize} from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { addProductSchema, updateProductSchema, updateQuantitySchema } from "./product.validation.js"
import { addProduct, getActiveProducts, getCategoryProducts, getProductDetails, getSubcategoryProducts, softDeleteProduct, updateProduct, updateStokeQuantity } from "./product.service.js"


export const adminProductRouter = express.Router()


adminProductRouter.post("/", authenticate , authorize("admin"), validation( addProductSchema) , addProduct)
adminProductRouter.put("/:id", authenticate , authorize("admin"), validation(updateProductSchema),updateProduct )
adminProductRouter.delete("/:id" , authenticate , authorize("admin"), softDeleteProduct)
adminProductRouter.patch("/:id/stock",authenticate , authorize("admin"), validation(updateQuantitySchema), updateStokeQuantity)


export const publicProductRouter = express.Router()

publicProductRouter.get("/", getActiveProducts)
publicProductRouter.get("/:id", getProductDetails)
publicProductRouter.get("/category/:categoryId", getCategoryProducts)
publicProductRouter.get("/subcategory/:subcategoryId", getSubcategoryProducts)