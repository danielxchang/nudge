"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const habits_1 = __importDefault(require("./routes/habits"));
const auth_1 = __importDefault(require("./routes/auth"));
const utility_1 = __importDefault(require("./routes/utility"));
const error_1 = require("./controllers/error");
const constants_1 = require("./util/constants");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("api/habits", habits_1.default);
app.use("api/auth", auth_1.default);
app.use("api/util", utility_1.default);
app.use(error_1.errorHandler);
mongoose_1.default
    .connect(constants_1.MONGODB_URI)
    .then((result) => {
    console.log("CONNECTED!!!");
    app.listen(process.env.PORT || 3000);
})
    .catch((err) => console.log(err));
