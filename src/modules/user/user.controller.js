import express from "express"
import { authenticate, authorize } from "../../common/middleware/auth.js"
import { getProfile, softDeletedProfile, updateProfile, uploadAvatar } from "./user.service.js"
import { filterDeletedUsers } from "../../common/middleware/filterUsers.js"
import { validation } from "../../utils/validation.js"
import { avatarSchema, updateProfileSchema } from "./user.validation.js"
import { upload } from "../../common/middleware/multer.js"


let router = express.Router()

router.post("/profile", authenticate, authorize("user"),filterDeletedUsers, getProfile)
router.put("/profile", authenticate, authorize("user"),filterDeletedUsers, validation(updateProfileSchema),upload.single("avatar"), updateProfile)
router.delete("/profile" ,authenticate , authorize("user"),filterDeletedUsers,softDeletedProfile)
router.post("/upload-avatar", authenticate , authorize("user"), filterDeletedUsers, validation(avatarSchema),upload.single("avatar"),uploadAvatar)

export default router