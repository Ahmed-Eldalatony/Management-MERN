import express, { Response, Request } from "express";
import mongoose from "mongoose";

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
app.get("/", (req, res) => {
  res.send("Hello from ts express");
});
app.listen(port, () => {
  console.log("Express listen on port " + port);
});
