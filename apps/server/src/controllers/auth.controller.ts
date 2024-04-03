import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
  } catch (error) {
    res.status(400).json({ message: error });
  }
  res.status(201).json({ message: "User created successfully" });
};
