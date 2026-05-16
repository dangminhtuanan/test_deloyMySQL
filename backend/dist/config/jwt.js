"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function signAccessToken(payload, options = {}) {
    return jsonwebtoken_1.default.sign(payload, getRequiredEnv("JWT_SECRET"), {
        expiresIn: "1h",
        ...options,
    });
}
function signRefreshToken(payload, options = {}) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET || getRequiredEnv("JWT_SECRET"), {
        expiresIn: "7d",
        ...options,
    });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, getRequiredEnv("JWT_SECRET"));
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || getRequiredEnv("JWT_SECRET"));
}
