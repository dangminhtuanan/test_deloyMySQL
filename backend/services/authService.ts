import bcrypt from "bcryptjs";
import AppError from "../utils/AppError";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../config/jwt";
import { toAuthProfileResponse } from "../utils/responseMappers";
import {
  getNormalizedEmail,
  isValidEmail,
  isValidOptionalAddress,
  isValidVietnamesePhone,
} from "../utils/validation";
import {
  createUser,
  findUserByEmail,
  findUserByRefreshToken,
  saveUser,
} from "../repositories/userRepository";

type RegisterInput = {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
};

export async function registerUser(input: RegisterInput) {
  const { username, email, password, phone, address } = input;
  if (!username || !email || !password) {
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

  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    throw new AppError(400, "Email da duoc su dung");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({
    username,
    email: normalizedEmail,
    password: hashedPassword,
    phone,
    address,
  });
}

export async function loginUser(email: string, password: string) {
  const normalizedEmail = getNormalizedEmail(email);
  const user = await findUserByEmail(normalizedEmail);
  if (!user || user.isActive === false) {
    throw new AppError(400, "Tai khoan khong ton tai hoac da bi vo hieu hoa");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Email hoac mat khau khong dung");
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    phone: user.phone || "",
    address: user.address || "",
  };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  user.refreshToken = refreshToken;
  await saveUser(user);

  return { profile: toAuthProfileResponse(user), accessToken, refreshToken };
}

export async function refreshAccessToken(refreshToken?: string) {
  if (!refreshToken) {
    throw new AppError(401, "Vui long cung cap refresh token");
  }

  let payload: any;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (_err) {
    throw new AppError(403, "Refresh token khong hop le hoac da het han");
  }

  const user = await findUserByRefreshToken(payload.id, refreshToken);
  if (!user) {
    throw new AppError(403, "Refresh token khong hop le");
  }

  return signAccessToken({ id: user.id, email: user.email, username: user.username, role: user.role });
}

export async function resetUserPassword(email: string, newPassword: string, confirmPassword: string) {
  if (!email || !newPassword || !confirmPassword) {
    throw new AppError(400, "Vui long nhap day du thong tin");
  }
  if (newPassword !== confirmPassword) {
    throw new AppError(400, "Mat khau xac nhan khong khop");
  }

  const normalizedEmail = getNormalizedEmail(email);
  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    throw new AppError(400, "Nguoi dung khong ton tai");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await saveUser(user);
}
