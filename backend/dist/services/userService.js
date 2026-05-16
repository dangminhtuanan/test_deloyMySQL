"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseMappers_1 = require("../utils/responseMappers");
const validation_1 = require("../utils/validation");
const userRepository_1 = require("../repositories/userRepository");
async function getAllUsers() {
    const users = await (0, userRepository_1.findActiveUsers)();
    return users.map(responseMappers_1.toUserResponse);
}
async function getUserById(id) {
    const user = await (0, userRepository_1.findUserById)(id);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    return (0, responseMappers_1.toUserResponse)(user);
}
async function createUser(input) {
    const { username, email, password, role, phone, address } = input;
    if (!username || !email || !password || !role) {
        throw new AppError_1.default(400, "Vui long nhap day du thong tin");
    }
    const normalizedEmail = (0, validation_1.getNormalizedEmail)(email);
    if (!(0, validation_1.isValidEmail)(normalizedEmail)) {
        throw new AppError_1.default(400, "Email khong hop le");
    }
    if (!(0, validation_1.isValidVietnamesePhone)(phone)) {
        throw new AppError_1.default(400, "So dien thoai khong hop le");
    }
    if (!(0, validation_1.isValidOptionalAddress)(address)) {
        throw new AppError_1.default(400, "Dia chi khong hop le");
    }
    const existing = await (0, userRepository_1.findUserByEmail)(normalizedEmail);
    if (existing) {
        throw new AppError_1.default(400, "Email da ton tai trong he thong");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await (0, userRepository_1.createUser)({
        username,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        phone,
        address,
    });
    return (0, responseMappers_1.toUserResponse)(user);
}
async function updateUser(id, input) {
    const { username, email, role, phone, address } = input;
    const user = await (0, userRepository_1.findUserById)(id);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    if (email) {
        const normalizedEmail = (0, validation_1.getNormalizedEmail)(email);
        if (!(0, validation_1.isValidEmail)(normalizedEmail)) {
            throw new AppError_1.default(400, "Email khong hop le");
        }
        const emailExists = await (0, userRepository_1.findUserByEmailExceptId)(normalizedEmail, user.id);
        if (emailExists) {
            throw new AppError_1.default(400, "Email da ton tai trong he thong");
        }
        user.email = normalizedEmail;
    }
    if (username)
        user.username = username;
    if (role)
        user.role = role;
    if (phone !== undefined) {
        if (!(0, validation_1.isValidVietnamesePhone)(phone)) {
            throw new AppError_1.default(400, "So dien thoai khong hop le");
        }
        user.phone = phone;
    }
    if (address !== undefined) {
        if (!(0, validation_1.isValidOptionalAddress)(address)) {
            throw new AppError_1.default(400, "Dia chi khong hop le");
        }
        user.address = address;
    }
    await (0, userRepository_1.saveUser)(user);
    return (0, responseMappers_1.toUserResponse)(user);
}
async function deleteUser(id) {
    const user = await (0, userRepository_1.findUserById)(id);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    user.isActive = false;
    await (0, userRepository_1.saveUser)(user);
}
