import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { adjustSalary, calculateSalary, paySalary } from "./salary.service.js"
import { bonusSchema } from "./salary.validation.js"
import { validation } from "../../utils/validation.js"


let router = express.Router()

router.get("/", authenticate ,authorize("admin"), calculateSalary)
router.post("/pay", authenticate , authorize("admin"), paySalary)
router.put("/adjust",authenticate , authorize("admin"),validation(bonusSchema), adjustSalary)


export default router