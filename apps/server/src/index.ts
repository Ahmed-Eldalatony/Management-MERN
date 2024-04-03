import mongoose from "mongoose";
import express from "express";
import userRouter from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

const port = 3000;
const app = express();

mongoose
  .connect(process.env.DATABASE_URI!)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api", (req: Request, res: Response) => {
  res.json("Hello from the route");
});

app.listen(port, () => {
  console.log("app listening on port " + port);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error ";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    stack: err.stack,
  });
});
