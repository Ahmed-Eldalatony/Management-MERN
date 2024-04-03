import express, { Response, Request } from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
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
