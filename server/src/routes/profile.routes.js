import { Router } from "express";
import { updateProfile, getProfile, updateProfileImage, deleteProfileImage, updateResume, deleteResume } from "../controllers/profile.controller.js";
import { uploadImage, uploadResume } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateProfileSchema } from "../validations/profile.validation.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply to all profile routes

router.route("/")
    .get(getProfile)
    .put(validate(updateProfileSchema), updateProfile);

router.route("/image")
    .put(uploadImage.single("profileImage"), updateProfileImage)
    .delete(deleteProfileImage);

router.route("/resume")
    .put(uploadResume.single("resume"), updateResume)
    .delete(deleteResume);

export default router;
