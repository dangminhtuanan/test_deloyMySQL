import type { Request, Response } from "express";
import { handleControllerError } from "../utils/controllerError";
import {
  createUser as createUserService,
  deleteUser as deleteUserService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
} from "../services/userService";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.json({ message: "Lay danh sach nguoi dung thanh cong", users });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi lay danh sach nguoi dung");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(Number(req.params.id));
    res.json({ message: "Lay thong tin nguoi dung thanh cong", user });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi lay thong tin nguoi dung");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({ message: "Tao nguoi dung moi thanh cong", user });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi tao nguoi dung moi");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(Number(req.params.id), req.body);
    res.json({ message: "Cap nhat nguoi dung thanh cong", user });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi cap nhat nguoi dung");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteUserService(Number(req.params.id));
    res.json({ message: "Da chuyen trang thai nguoi dung sang khong hoat dong" });
  } catch (error) {
    handleControllerError(res, error, "Da xay ra loi khi cap nhat trang thai nguoi dung");
  }
};
