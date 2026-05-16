"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.changePassword = exports.changeEmail = exports.updateProfile = exports.getProfile = exports.getAvatar = void 0;
const controllerError_1 = require("../utils/controllerError");
const profileService_1 = require("../services/profileService");
const getAvatar = async (req, res) => {
    try {
        const avatar = await (0, profileService_1.getAvatar)(req.user.id);
        res.json({ message: "Lay avatar thanh cong", avatar });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi lay avatar");
    }
};
exports.getAvatar = getAvatar;
const getProfile = async (req, res) => {
    try {
        const profile = await (0, profileService_1.getProfile)(req.user.id);
        res.json({ message: "Lay thong tin ca nhan thanh cong", profile });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi lay thong tin ca nhan");
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const profile = await (0, profileService_1.updateProfile)(req.user.id, req.body);
        res.json({ message: "Cap nhat thong tin ca nhan thanh cong", profile });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi cap nhat thong tin ca nhan");
    }
};
exports.updateProfile = updateProfile;
const changeEmail = async (req, res) => {
    try {
        await (0, profileService_1.changeEmail)(req.user.id, req.body.newEmail);
        res.json({ message: "Doi email thanh cong" });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi doi email");
    }
};
exports.changeEmail = changeEmail;
const changePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        await (0, profileService_1.changePassword)(req.user.id, newPassword, confirmPassword);
        res.json({ message: "Doi mat khau thanh cong" });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi doi mat khau");
    }
};
exports.changePassword = changePassword;
const uploadAvatar = async (req, res) => {
    try {
        const avatar = await (0, profileService_1.uploadAvatar)(req.user.id, req.file);
        res.json({ message: "Upload avatar thanh cong", avatar });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi upload avatar");
    }
};
exports.uploadAvatar = uploadAvatar;
