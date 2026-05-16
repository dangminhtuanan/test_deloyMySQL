"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNormalizedEmail = getNormalizedEmail;
exports.isValidVietnamesePhone = isValidVietnamesePhone;
exports.isValidOptionalAddress = isValidOptionalAddress;
exports.isValidEmail = isValidEmail;
const validator_1 = __importDefault(require("validator"));
function getNormalizedEmail(email) {
    return email && typeof email === "string" ? email.trim().toLowerCase() : "";
}
function isValidVietnamesePhone(phone) {
    if (!phone)
        return true;
    return validator_1.default.isMobilePhone(phone, "vi-VN") && phone.length >= 9 && phone.length <= 12;
}
function isValidOptionalAddress(address) {
    return address === undefined || address === null || address === "" || address.trim().length > 0;
}
function isValidEmail(email) {
    return validator_1.default.isEmail(email);
}
