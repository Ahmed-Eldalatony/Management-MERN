import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // res.status(400).json({ message: error });
    next(error);
  }
};
