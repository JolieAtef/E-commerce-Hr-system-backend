import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { createCategory, getActiveCategories, getAllCategories, softDeleteCategory, updateCategory } from "./category.service.js"
import { addCategorySchema, updateCategorySchema } from "./category.validation.js"
import { filterDeletedCategories } from "../../common/middleware/filterCategories.js"
import { getSubcategoriesByCategory } from "../subcategory/subcategory.service.js"


let router = express.Router()


router.post("/", authenticate , authorize("admin") ,validation(addCategorySchema), createCategory )
router.put("/:id", authenticate, authorize("admin"),filterDeletedCategories,validation(updateCategorySchema) , updateCategory )
router.delete("/:id", authenticate , authorize("admin"), filterDeletedCategories, softDeleteCategory)
router.get("/", authenticate , authorize("admin"), getAllCategories )
router.get("/active", getActiveCategories)
router.get("/:id/subcategories", getSubcategoriesByCategory)


export default router