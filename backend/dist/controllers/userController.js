"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const controllerError_1 = require("../utils/controllerError");
const userService_1 = require("../services/userService");
const getAllUsers = async (_req, res) => {
    try {
        const users = await (0, userService_1.getAllUsers)();
        res.json({ message: "Lay danh sach nguoi dung thanh cong", users });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi lay danh sach nguoi dung");
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await (0, userService_1.getUserById)(Number(req.params.id));
        res.json({ message: "Lay thong tin nguoi dung thanh cong", user });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi lay thong tin nguoi dung");
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const user = await (0, userService_1.createUser)(req.body);
        res.status(201).json({ message: "Tao nguoi dung moi thanh cong", user });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi tao nguoi dung moi");
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const user = await (0, userService_1.updateUser)(Number(req.params.id), req.body);
        res.json({ message: "Cap nhat nguoi dung thanh cong", user });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi cap nhat nguoi dung");
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await (0, userService_1.deleteUser)(Number(req.params.id));
        res.json({ message: "Da chuyen trang thai nguoi dung sang khong hoat dong" });
    }
    catch (error) {
        (0, controllerError_1.handleControllerError)(res, error, "Da xay ra loi khi cap nhat trang thai nguoi dung");
    }
};
exports.deleteUser = deleteUser;
