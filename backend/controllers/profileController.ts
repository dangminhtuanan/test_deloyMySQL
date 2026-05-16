import type { Request, Response } from "express";
import { handleControllerError } from "../utils/controllerError";
import {
  changeEmail as changeEmailService,
  changePassword as changePasswordService,
  getAvatar as getAvatarService,
  getProfile as getProfileService,
  updateProfile as updateProfileService,
  uploadAvatar as uploadAvatarService,
} from "../services/profileService";

export const getAvatar = async (req: Request, res: Response) => {
  try {
    const avatar = await getAvatarService(req.user!.id);
    res.json({ message: "Lay avatar thanh cong", avatar });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi lay avatar");
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await getProfileService(req.user!.id);
    res.json({ message: "Lay thong tin ca nhan thanh cong", profile });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi lay thong tin ca nhan");
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile = await updateProfileService(req.user!.id, req.body);
    res.json({ message: "Cap nhat thong tin ca nhan thanh cong", profile });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi cap nhat thong tin ca nhan");
  }
};

export const changeEmail = async (req: Request, res: Response) => {
  try {
    await changeEmailService(req.user!.id, req.body.newEmail);
    res.json({ message: "Doi email thanh cong" });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi doi email");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    await changePasswordService(req.user!.id, newPassword, confirmPassword);
    res.json({ message: "Doi mat khau thanh cong" });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi doi mat khau");
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const avatar = await uploadAvatarService(req.user!.id, req.file);
    res.json({ message: "Upload avatar thanh cong", avatar });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi upload avatar");
  }
};
