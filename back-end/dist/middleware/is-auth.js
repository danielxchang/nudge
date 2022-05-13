"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../util/constants");
const types_1 = require("../util/types");
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new types_1.ErrorResponse("Not authenticated.", 401);
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new types_1.ErrorResponse("Not authenticated.", 401);
        throw error;
    }
    const { email, userId } = decodedToken;
    req.userId = userId;
    if (email === constants_1.HORTON_CREDENTIALS.email)
        req.isHorton = true;
    next();
};
exports.default = isAuth;
