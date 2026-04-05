import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { validation } from "../../utils/validation.js"
import { addStaff, getAllStaff, getStaffDetails, softDeleteStaff, updateStaff } from "./staff.service.js"
import { addStaffSchema, updateStaffSchema } from "./staff.validation.js"


let router = express.Router()


router.post("/", authenticate, authorize("admin") , validation(addStaffSchema), addStaff)
router.get("/", authenticate ,authorize("admin"), getAllStaff)
router.get("/:id", authenticate , authorize("admin"), getStaffDetails)
router.put("/:id", authenticate ,authorize("admin"), validation(updateStaffSchema), updateStaff)
router.delete("/:id", authenticate ,authorize("admin"), softDeleteStaff)


export default router