import type { Request } from "express";
import multer from "multer";
import path from "path";

const uploadDir = path.join(__dirname, "../image");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${req.user!.id}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

function fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Chi cho phep upload file anh!"));
  }
  cb(null, true);
}

const multerMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default multerMiddleware;
