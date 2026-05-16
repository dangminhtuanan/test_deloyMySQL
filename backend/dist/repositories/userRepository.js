"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findActiveUsers = findActiveUsers;
exports.findUserById = findUserById;
exports.findUserByIdWithAvatar = findUserByIdWithAvatar;
exports.findUserByEmail = findUserByEmail;
exports.findUserByEmailExceptId = findUserByEmailExceptId;
exports.findUserByRefreshToken = findUserByRefreshToken;
exports.createUser = createUser;
exports.saveUser = saveUser;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../models/User"));
const Avatar_1 = __importDefault(require("../models/Avatar"));
async function findActiveUsers() {
    return User_1.default.findAll({ where: { isActive: true } });
}
async function findUserById(id) {
    return User_1.default.findByPk(id);
}
async function findUserByIdWithAvatar(id) {
    return User_1.default.findByPk(id, {
        include: [{ model: Avatar_1.default, as: "avatar" }],
    });
}
async function findUserByEmail(email) {
    return User_1.default.findOne({ where: { email } });
}
async function findUserByEmailExceptId(email, id) {
    return User_1.default.findOne({
        where: {
            email,
            id: { [sequelize_1.Op.ne]: id },
        },
    });
}
async function findUserByRefreshToken(id, refreshToken) {
    return User_1.default.findOne({ where: { id, refreshToken } });
}
async function createUser(data) {
    return User_1.default.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone || "",
        address: data.address || "",
    });
}
async function saveUser(user) {
    return user.save();
}
