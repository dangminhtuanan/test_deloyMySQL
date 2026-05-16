import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Chi admin moi duoc phep!" });
}

router.use(authMiddleware, adminOnly);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
