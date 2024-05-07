import express from "express";
import userRouter from "./routes/user.route";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route";
import { Request, Response, NextFunction } from "express";
import { upload } from "./utils/upload";
import { mongoConnect } from "./utils/mongoConnect";
import { errorMiddleware } from "./middleware/errorMiddleware";
import taskRouter from "./routes/task.route";
import cors from "cors";
import { protectRoutes } from "./middleware/requireAuth";
// import serverless from "serverless-http";
import User from "./models/user.model";
import path from "path";
require("dotenv").config();

export const app = express();

mongoConnect();

app.use(
  express.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 4,
  })
);


//renaming the dirname
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
// try different way to access the client or watch the video in the tablet
app.use("/api/auth", upload, authRouter);
app.use("/api/user", upload, userRouter);
app.use("/api/", protectRoutes, taskRouter);

app.use("/api", (req: Request, res: Response) => {
  res.json("hello  from the route");
});

// app.use("/.netlify/functions/api", router);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "client", "dist", "index.html"));
});

app.use(errorMiddleware);
export default app;

// export const handler = serverless(app);
