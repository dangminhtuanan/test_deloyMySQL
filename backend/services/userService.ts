import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";
import { toUserResponse } from "../utils/responseMappers";
import {
  getNormalizedEmail,
  isValidEmail,
  isValidOptionalAddress,
  isValidVietnamesePhone,
} from "../utils/validation";
import {
  createUser as createUserRecord,
  findActiveUsers,
  findUserByEmail,
  findUserByEmailExceptId,
  findUserById,
  saveUser,
} from "../repositories/userRepository";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
};

type UpdateUserInput = {
  username?: string;
  email?: string;
  role?: "user" | "admin";
  phone?: string;
  address?: string;
};

export async function getAllUsers() {
  const users = await findActiveUsers();
  return users.map(toUserResponse);
}

export async function getUserById(id: number) {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }
  return toUserResponse(user);
}

export async function createUser(input: CreateUserInput) {
  const { username, email, password, role, phone, address } = input;
  if (!username || !email || !password || !role) {
    throw new AppError(400, "Vui long nhap day du thong tin");
  }

  const normalizedEmail = getNormalizedEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    throw new AppError(400, "Email khong hop le");
  }
  if (!isValidVietnamesePhone(phone)) {
    throw new AppError(400, "So dien thoai khong hop le");
  }
  if (!isValidOptionalAddress(address)) {
    throw new AppError(400, "Dia chi khong hop le");
  }

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    throw new AppError(400, "Email da ton tai trong he thong");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUserRecord({
    username,
    email: normalizedEmail,
    password: hashedPassword,
    role,
    phone,
    address,
  });

  return toUserResponse(user);
}

export async function updateUser(id: number, input: UpdateUserInput) {
  const { username, email, role, phone, address } = input;
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }

  if (email) {
    const normalizedEmail = getNormalizedEmail(email);
    if (!isValidEmail(normalizedEmail)) {
      throw new AppError(400, "Email khong hop le");
    }
    const emailExists = await findUserByEmailExceptId(normalizedEmail, user.id);
    if (emailExists) {
      throw new AppError(400, "Email da ton tai trong he thong");
    }
    user.email = normalizedEmail;
  }

  if (username) user.username = username;
  if (role) user.role = role;
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
  return toUserResponse(user);
}

export async function deleteUser(id: number) {
  const user = await findUserById(id);
  if (!user) {
    throw new AppError(404, "Khong tim thay nguoi dung");
  }
  user.isActive = false;
  await saveUser(user);
}
