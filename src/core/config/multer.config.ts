import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "..", "uploads"));
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, "");
      const extension = path.extname(file.originalname);
      const fileName = `${hash.toString("hex")}${extension}`;
      cb(null, fileName);
    });
  },
});

export const multerConfig = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true); // Aceita o arquivo
    } else {
      callback(new Error("Invalid file type.")); // Rejeita com erro
    }
  },
});
