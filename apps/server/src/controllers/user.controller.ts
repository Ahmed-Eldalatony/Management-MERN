//ts-nocheck
import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { upload } from "../utils/upload";
import cloudinary from "../utils/upload";
interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export const postUser = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const imageName = req.files[0].filename;
  // const imagePath = req.files[0].path;
  // const image = `${imageName}`;
  console.log(req.files[0].path);
  console.log("the middle works");

  const hashedPassword = bcryptjs.hashSync(password, 10);
  console.log(req.files[0]);
  try {
    const image = cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result.url) {
          console.log(result.url);
          const user = new User({
            name,
            email,
            password: hashedPassword,
            image: result.url,
          });
          user.save();

          res
            .status(201)
            .json({ message: "User Created successfully", data: user });
        }
      })
      .end(req.files[0].buffer);
    // you should have the user
  } catch (error) {
    res.status(400).json({ error: error });
    next(error);
  }
};
