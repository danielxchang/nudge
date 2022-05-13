"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const habits_1 = __importDefault(require("./routes/habits"));
const auth_1 = __importDefault(require("./routes/auth"));
const error_1 = require("./controllers/error");
const is_auth_1 = __importDefault(require("./middleware/is-auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api/auth", auth_1.default);
app.use("/api/habits", is_auth_1.default, habits_1.default);
app.use(error_1.errorHandler);
mongoose_1.default
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.yfvfw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`)
    .then((result) => {
    console.log("CONNECTED");
    app.listen(process.env.PORT || 3000);
})
    .catch((err) => console.log(err));
