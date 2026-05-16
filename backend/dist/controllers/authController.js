"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.refreshTokenController = exports.login = exports.register = exports.getNormalizedEmail = void 0;
const controllerError_1 = require("../utils/controllerError");
const authService_1 = require("../services/authService");
var validation_1 = require("../utils/validation");
Object.defineProperty(exports, "getNormalizedEmail", { enumerable: true, get: function () { return validation_1.getNormalizedEmail; } });
const register = async (req, res) => {
    try {
        await (0, authService_1.registerUser)(req.body);
        res.status(201).json({ message: "Dang ky tai khoan thanh cong" });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi dang ky tai khoan");
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authService_1.loginUser)(email, password);
        res.json({ message: "Dang nhap thanh cong", ...result });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi dang nhap");
    }
};
exports.login = login;
const refreshTokenController = async (req, res) => {
    try {
        const accessToken = await (0, authService_1.refreshAccessToken)(req.body.refreshToken);
        res.json({ message: "Lam moi access token thanh cong", accessToken });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi lam moi access token");
    }
};
exports.refreshTokenController = refreshTokenController;
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        await (0, authService_1.resetUserPassword)(email, newPassword, confirmPassword);
        res.json({ message: "Dat lai mat khau thanh cong" });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi dat lai mat khau");
    }
};
exports.resetPassword = resetPassword;
