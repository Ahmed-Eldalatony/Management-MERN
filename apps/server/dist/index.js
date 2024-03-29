"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.DATABASE_URI)
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
