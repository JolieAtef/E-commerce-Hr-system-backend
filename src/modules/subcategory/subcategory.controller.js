import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { addSubcategorySchema, updateSubcategorySchema } from "./subcategory.validation.js"
import { createSubCategory, getSubcategoryDetails, softDeleteSubCategory, updateSubCategory } from "./subcategory.service.js"
import { filterDeletedSubCategories } from "../../common/middleware/filterSubcategory.js"


let router = express.Router()

router.post("/", authenticate, authorize("admin"), validation(addSubcategorySchema), createSubCategory)
router.put("/:id", authenticate ,authorize("admin"),filterDeletedSubCategories,validation(updateSubcategorySchema), updateSubCategory )
router.delete("/:id", authenticate ,authorize("admin"), filterDeletedSubCategories,softDeleteSubCategory )
router.get("/:id", filterDeletedSubCategories , getSubcategoryDetails)

export default router