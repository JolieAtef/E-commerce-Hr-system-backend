import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { checkIn, checkOut } from "./attendance.service.js"


let router = express.Router()


router.post("/checkin", authenticate , authorize("staff") , checkIn)

router.post("/checkout", authenticate , authorize("staff"), checkOut)




export default router