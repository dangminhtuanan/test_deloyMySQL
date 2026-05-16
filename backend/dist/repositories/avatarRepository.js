"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAvatarByUserId = findAvatarByUserId;
exports.deleteAvatarsByUserId = deleteAvatarsByUserId;
exports.createAvatar = createAvatar;
const Avatar_1 = __importDefault(require("../models/Avatar"));
async function findAvatarByUserId(userId) {
    return Avatar_1.default.findOne({ where: { userId } });
}
async function deleteAvatarsByUserId(userId) {
    return Avatar_1.default.destroy({ where: { userId } });
}
async function createAvatar(data) {
    return Avatar_1.default.create(data);
}
