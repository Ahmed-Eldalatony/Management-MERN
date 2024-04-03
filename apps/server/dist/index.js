"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = require("./routes/auth.route");
require("dotenv").config();
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
app.use(express_1.default.json());
app.use("/api/auth", auth_route_1.authRouter);
app.use("/api/user", user_route_1.default);
app.use("/api", (req, res) => {
    res.json("Hello from the route");
});
app.listen(port, () => {
    console.log("app listening on port " + port);
});
