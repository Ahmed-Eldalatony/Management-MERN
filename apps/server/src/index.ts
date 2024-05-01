import express from "express";
import userRouter from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { Request, Response, NextFunction } from "express";
import { upload } from "./utils/upload";
import { mongoConnect } from "./utils/mongoConnect";
import { errorMiddleware } from "./middleware/errorMiddleware";
import taskRouter from "./routes/task.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { protectRoutes } from "./middleware/requireAuth";
import serverless from "serverless-http";
import { Router } from "express";

require("dotenv").config();

const port = 3000;
export const app = express();
const router = Router();

mongoConnect();

router.use(
  express.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 4,
  })
);

router.use(cookieParser());
router.use(cors());
router.use(express.json());
router.use(express.static("uploads"));
router.use("/api/auth", upload, authRouter);
router.use("/api/user", upload, userRouter);
router.use("/api/", protectRoutes, taskRouter);

router.use("/api", (req: Request, res: Response) => {
  res.json("hello  from the route");
});
app.use("/api", router);

app.listen(port, () => {
  console.log("app is listening on port" + port);
});

app.use(errorMiddleware);

export const handler = serverless(app);