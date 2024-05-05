//@ts-nocheck
// import express from 'express';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import cors from 'cors';

// import * as middlewares from './middlewares';
// import api from './api';
// import MessageResponse from './interfaces/MessageResponse';

// require('dotenv').config();

// const app = express();

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// app.get<{}, MessageResponse>('/', (req, res) => {
//   res.json({
//     message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
//   });
// });

// app.use('/api/v1', api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

// export default app;
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

require("dotenv").config();

const port = 3000;
export const app = express();

mongoConnect();

app.use(
  express.urlencoded({
    extended: true,
    limit: 10000,
    parameterLimit: 4,
  })
);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use("/api/auth", upload, authRouter);
app.use("/api/user", upload, userRouter);
app.use("/api/", protectRoutes, taskRouter);

app.use("/api", (req: Request, res: Response) => {
  res.json("hello  from the route");
});
// app.use("/.netlify/functions/api", router);

app.listen(port, () => {
  console.log("app is listening on port" + port);
});

app.use(errorMiddleware);
export default app;

// export const handler = serverless(app);
