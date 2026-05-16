"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatar = getAvatar;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changeEmail = changeEmail;
exports.changePassword = changePassword;
exports.uploadAvatar = uploadAvatar;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const responseMappers_1 = require("../utils/responseMappers");
const validation_1 = require("../utils/validation");
const avatarRepository_1 = require("../repositories/avatarRepository");
const userRepository_1 = require("../repositories/userRepository");
async function getAvatar(userId) {
    const avatar = await (0, avatarRepository_1.findAvatarByUserId)(userId);
    if (!avatar) {
        throw new AppError_1.default(404, "Chua co avatar");
    }
    return (0, responseMappers_1.toAvatarResponse)(avatar);
}
async function getProfile(userId) {
    const user = await (0, userRepository_1.findUserByIdWithAvatar)(userId);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    return (0, responseMappers_1.toProfileResponse)(user);
}
async function updateProfile(userId, input) {
    const { username, phone, address } = input;
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    if (username)
        user.username = username;
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
    return (0, responseMappers_1.toProfileResponse)(user);
}
async function changeEmail(userId, newEmail) {
    if (!newEmail) {
        throw new AppError_1.default(400, "Email moi khong hop le");
    }
    const normalizedEmail = (0, validation_1.getNormalizedEmail)(newEmail);
    if (!(0, validation_1.isValidEmail)(normalizedEmail)) {
        throw new AppError_1.default(400, "Email moi khong hop le");
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    if (!user.isActive) {
        throw new AppError_1.default(403, "Tai khoan da bi vo hieu hoa");
    }
    if (user.email === normalizedEmail) {
        throw new AppError_1.default(400, "Email moi khong duoc trung email hien tai");
    }
    const existed = await (0, userRepository_1.findUserByEmail)(normalizedEmail);
    if (existed) {
        throw new AppError_1.default(400, "Email moi da duoc su dung");
    }
    user.email = normalizedEmail;
    await (0, userRepository_1.saveUser)(user);
}
async function changePassword(userId, newPassword, confirmPassword) {
    if (!newPassword || !confirmPassword) {
        throw new AppError_1.default(400, "Vui long nhap day du thong tin");
    }
    if (newPassword !== confirmPassword) {
        throw new AppError_1.default(400, "Mat khau xac nhan khong khop");
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.default(400, "Nguoi dung khong ton tai");
    }
    user.password = await bcryptjs_1.default.hash(newPassword, 10);
    await (0, userRepository_1.saveUser)(user);
}
async function uploadAvatar(userId, file) {
    if (!file) {
        throw new AppError_1.default(400, "Vui long chon file anh de upload");
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.default(404, "Khong tim thay nguoi dung");
    }
    await (0, avatarRepository_1.deleteAvatarsByUserId)(userId);
    const avatar = await (0, avatarRepository_1.createAvatar)({
        userId,
        filename: file.filename,
        path: `/image/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
    });
    return (0, responseMappers_1.toAvatarResponse)(avatar);
}
