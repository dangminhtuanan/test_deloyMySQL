import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";
import { toAvatarResponse, toProfileResponse } from "../utils/responseMappers";
import {
  getNormalizedEmail,
  isValidEmail,
  isValidOptionalAddress,
  isValidVietnamesePhone,
} from "../utils/validation";
import {
  createAvatar,
  deleteAvatarsByUserId,
  findAvatarByUserId,
} from "../repositories/avatarRepository";
import {
  findUserByEmail,
  findUserById,
  findUserByIdWithAvatar,
  saveUser,
} from "../repositories/userRepository";

type UpdateProfileInput = {
  username?: string;
  phone?: string;
  address?: string;
};

export async function getAvatar(userId: number) {
  const avatar = await findAvatarByUserId(userId);
  if (!avatar) {
    throw new AppError(404, "Chua co avatar");
  }
  return toAvatarResponse(avatar);
}

export async function getProfile(userId: number) {
  const user = await findUserByIdWithAvatar(userId);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }
  return toProfileResponse(user);
}

export async function updateProfile(userId: number, input: UpdateProfileInput) {
  const { username, phone, address } = input;
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }

  if (username) user.username = username;
  if (phone !== undefined) {
    if (!isValidVietnamesePhone(phone)) {
      throw new AppError(400, "So dien thoai khong hop le");
    }
    user.phone = phone;
  }
  if (address !== undefined) {
    if (!isValidOptionalAddress(address)) {
      throw new AppError(400, "Dia chi khong hop le");
    }
    user.address = address;
  }

  await saveUser(user);
  return toProfileResponse(user);
}

export async function changeEmail(userId: number, newEmail?: string) {
  if (!newEmail) {
    throw new AppError(400, "Email moi khong hop le");
  }

  const normalizedEmail = getNormalizedEmail(newEmail);
  if (!isValidEmail(normalizedEmail)) {
    throw new AppError(400, "Email moi khong hop le");
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }
  if (!user.isActive) {
    throw new AppError(403, "Tai khoan da bi vo hieu hoa");
  }
  if (user.email === normalizedEmail) {
    throw new AppError(400, "Email moi khong duoc trung email hien tai");
  }

  const existed = await findUserByEmail(normalizedEmail);
  if (existed) {
    throw new AppError(400, "Email moi da duoc su dung");
  }

  user.email = normalizedEmail;
  await saveUser(user);
}

export async function changePassword(userId: number, newPassword?: string, confirmPassword?: string) {
  if (!newPassword || !confirmPassword) {
    throw new AppError(400, "Vui long nhap day du thong tin");
  }
  if (newPassword !== confirmPassword) {
    throw new AppError(400, "Mat khau xac nhan khong khop");
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(400, "Nguoi dung khong ton tai");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await saveUser(user);
}

export async function uploadAvatar(userId: number, file?: Express.Multer.File) {
  if (!file) {
    throw new AppError(400, "Vui long chon file anh de upload");
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }

  await deleteAvatarsByUserId(userId);
  const avatar = await createAvatar({
    userId,
    filename: file.filename,
    path: `/image/${file.filename}`,
    mimetype: file.mimetype,
    size: file.size,
  });

  return toAvatarResponse(avatar);
}
