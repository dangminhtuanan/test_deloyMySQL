import type { Request, Response } from "express";
import { handleControllerError } from "../utils/controllerError";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
  resetUserPassword,
} from "../services/authService";
export { getNormalizedEmail } from "../utils/validation";

export const register = async (req: Request, res: Response) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "Dang ky tai khoan thanh cong" });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi dang ky tai khoan");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json({ message: "Dang nhap thanh cong", ...result });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi dang nhap");
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const accessToken = await refreshAccessToken(req.body.refreshToken);
    res.json({ message: "Lam moi access token thanh cong", accessToken });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi lam moi access token");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    await resetUserPassword(email, newPassword, confirmPassword);
    res.json({ message: "Dat lai mat khau thanh cong" });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi dat lai mat khau");
  }
};
