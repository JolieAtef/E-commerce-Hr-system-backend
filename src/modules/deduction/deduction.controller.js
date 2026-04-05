import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { addDeductionSchema, updateDeductionSchema } from "./deduction.validation.js"
import { addDeduction, deleteDeduction, getStaffDeductions, updateDeduction } from "./deduction.service.js"


let router = express.Router()

router.post("/", authenticate, authorize("admin") ,validation(addDeductionSchema), addDeduction)
router.get("/",authenticate, authorize("admin"), getStaffDeductions)
router.put("/:deductionId",authenticate, authorize("admin") ,validation(updateDeductionSchema), updateDeduction)
router.delete("/:deductionId", authenticate, authorize("admin") , deleteDeduction)

export default router