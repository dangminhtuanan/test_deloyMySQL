"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.refreshAccessToken = refreshAccessToken;
exports.resetUserPassword = resetUserPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const jwt_1 = require("../config/jwt");
const responseMappers_1 = require("../utils/responseMappers");
const validation_1 = require("../utils/validation");
const userRepository_1 = require("../repositories/userRepository");
async function registerUser(input) {
    const { username, email, password, phone, address } = input;
    if (!username || !email || !password) {
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
    const existingUser = await (0, userRepository_1.findUserByEmail)(normalizedEmail);
    if (existingUser) {
        throw new AppError_1.default(400, "Email da duoc su dung");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    await (0, userRepository_1.createUser)({
        username,
        email: normalizedEmail,
        password: hashedPassword,
        phone,
        address,
    });
}
async function loginUser(email, password) {
    const normalizedEmail = (0, validation_1.getNormalizedEmail)(email);
    const user = await (0, userRepository_1.findUserByEmail)(normalizedEmail);
    if (!user || user.isActive === false) {
        throw new AppError_1.default(400, "Tai khoan khong ton tai hoac da bi vo hieu hoa");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AppError_1.default(400, "Email hoac mat khau khong dung");
    }
    const tokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        phone: user.phone || "",
        address: user.address || "",
    };
    const accessToken = (0, jwt_1.signAccessToken)(tokenPayload);
    const refreshToken = (0, jwt_1.signRefreshToken)(tokenPayload);
    user.refreshToken = refreshToken;
    await (0, userRepository_1.saveUser)(user);
    return { profile: (0, responseMappers_1.toAuthProfileResponse)(user), accessToken, refreshToken };
}
async function refreshAccessToken(refreshToken) {
    if (!refreshToken) {
        throw new AppError_1.default(401, "Vui long cung cap refresh token");
    }
    let payload;
    try {
        payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
    }
    catch (_err) {
        throw new AppError_1.default(403, "Refresh token khong hop le hoac da het han");
    }
    const user = await (0, userRepository_1.findUserByRefreshToken)(payload.id, refreshToken);
    if (!user) {
        throw new AppError_1.default(403, "Refresh token khong hop le");
    }
    return (0, jwt_1.signAccessToken)({ id: user.id, email: user.email, username: user.username, role: user.role });
}
async function resetUserPassword(email, newPassword, confirmPassword) {
    if (!email || !newPassword || !confirmPassword) {
        throw new AppError_1.default(400, "Vui long nhap day du thong tin");
    }
    if (newPassword !== confirmPassword) {
        throw new AppError_1.default(400, "Mat khau xac nhan khong khop");
    }
    const normalizedEmail = (0, validation_1.getNormalizedEmail)(email);
    const user = await (0, userRepository_1.findUserByEmail)(normalizedEmail);
    if (!user) {
        throw new AppError_1.default(400, "Nguoi dung khong ton tai");
    }
    user.password = await bcryptjs_1.default.hash(newPassword, 10);
    await (0, userRepository_1.saveUser)(user);
}
