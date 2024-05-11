//@ts-nocheck
import { v2 as cloudinary } from "cloudinary";
import multer, { FileFilterCallback } from "multer";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     cb(null, "uploads");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.endsWith("jpeg") || file.mimetype.endsWith("png")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};
const limits = {
  fields: 4,
  fieldNameSize: 30,
  fieldSize: 10000,
  fileSize: 10240 * 1024,
};
export const upload = multer({
  storage,
  limits,
  fileFilter,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
export default cloudinary;
