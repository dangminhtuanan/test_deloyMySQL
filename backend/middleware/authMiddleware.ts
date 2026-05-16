import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../config/jwt";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Khong co token, truy cap bi tu choi" });
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(403).json({ message: "Token khong hop le hoac da het han" });
  }
};

export default authMiddleware;
