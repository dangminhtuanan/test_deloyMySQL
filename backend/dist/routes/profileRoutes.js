"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const multerMiddleware_1 = __importDefault(require("../middleware/multerMiddleware"));
const profileController_1 = require("../controllers/profileController");
const router = (0, express_1.Router)();
router.get("/profile/get-profile", authMiddleware_1.default, profileController_1.getProfile);
router.put("/profile/update", authMiddleware_1.default, profileController_1.updateProfile);
router.post("/profile/change-password", authMiddleware_1.default, profileController_1.changePassword);
router.post("/profile/change-email", authMiddleware_1.default, profileController_1.changeEmail);
router.post("/profile/upload-avatar", authMiddleware_1.default, multerMiddleware_1.default.single("avatar"), profileController_1.uploadAvatar);
router.get("/profile/avatar", authMiddleware_1.default, profileController_1.getAvatar);
exports.default = router;
