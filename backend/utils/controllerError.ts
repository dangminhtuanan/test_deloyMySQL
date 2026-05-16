import type { Response } from "express";
import AppError from "./AppError";

export function handleControllerError(res: Response, error: unknown, fallbackMessage: string) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if ((error as any)?.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ message: "Email hoac ten dang nhap da duoc su dung" });
  }

  return res.status(500).json({ message: fallbackMessage, error });
}
