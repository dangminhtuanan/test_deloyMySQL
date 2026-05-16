"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadDir = path_1.default.join(__dirname, "../image");
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = `${req.user.id}_${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});
function fileFilter(_req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Chi cho phep upload file anh!"));
    }
    cb(null, true);
}
const multerMiddleware = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
exports.default = multerMiddleware;
