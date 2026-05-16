"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleControllerError = handleControllerError;
const AppError_1 = __importDefault(require("./AppError"));
function handleControllerError(res, error, fallbackMessage) {
    if (error instanceof AppError_1.default) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    if (error?.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Email hoac ten dang nhap da duoc su dung" });
    }
    return res.status(500).json({ message: fallbackMessage, error });
}
