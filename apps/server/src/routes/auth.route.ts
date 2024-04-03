import express from "express";
import { signup } from "../controllers/auth.controller";
export const authRouter = express.Router();
authRouter.post("/signup", signup);
