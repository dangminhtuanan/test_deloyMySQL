import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import multerMiddleware from "../middleware/multerMiddleware";
import {
  updateProfile,
  getProfile,
  changeEmail,
  changePassword,
  uploadAvatar,
  getAvatar,
} from "../controllers/profileController";

const router = Router();

router.get("/profile/get-profile", authMiddleware, getProfile);
router.put("/profile/update", authMiddleware, updateProfile);
router.post("/profile/change-password", authMiddleware, changePassword);
router.post("/profile/change-email", authMiddleware, changeEmail);
router.post("/profile/upload-avatar", authMiddleware, multerMiddleware.single("avatar"), uploadAvatar);
router.get("/profile/avatar", authMiddleware, getAvatar);

export default router;
