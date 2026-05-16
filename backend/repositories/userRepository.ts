import { Op } from "sequelize";
import User from "../models/User";
import Avatar from "../models/Avatar";

export type CreateUserData = {
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  phone?: string;
  address?: string;
};

export async function findActiveUsers() {
  return User.findAll({ where: { isActive: true } });
}

export async function findUserById(id: number) {
  return User.findByPk(id);
}

export async function findUserByIdWithAvatar(id: number) {
  return User.findByPk(id, {
    include: [{ model: Avatar, as: "avatar" }],
  });
}

export async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function findUserByEmailExceptId(email: string, id: number) {
  return User.findOne({
    where: {
      email,
      id: { [Op.ne]: id },
    },
  });
}

export async function findUserByRefreshToken(id: number, refreshToken: string) {
  return User.findOne({ where: { id, refreshToken } });
}

export async function createUser(data: CreateUserData) {
  return User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role,
    phone: data.phone || "",
    address: data.address || "",
  });
}

export async function saveUser(user: User) {
  return user.save();
}
