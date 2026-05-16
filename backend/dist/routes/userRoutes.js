"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
function adminOnly(req, res, next) {
    if (req.user && req.user.role === "admin")
        return next();
    return res.status(403).json({ message: "Chi admin moi duoc phep!" });
}
router.use(authMiddleware_1.default, adminOnly);
router.get("/", userController_1.getAllUsers);
router.get("/:id", userController_1.getUserById);
router.post("/", userController_1.createUser);
router.put("/:id", userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
exports.default = router;
