"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const helpers_1 = require("../util/helpers");
const types_1 = require("../util/types");
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ email: user.email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
};
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            const error = new types_1.ErrorResponse("User not found!", 401);
            throw error;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            const error = new types_1.ErrorResponse("Wrong password!", 401);
            throw error;
        }
        const token = createToken(user);
        res.status(200).json({ token, userId: user._id.toString() });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.login = login;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new types_1.ErrorResponse("Validation failed!", 422);
        return next(error);
    }
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new User_1.default({
            name,
            email,
            password: hashedPassword,
            initials: (0, helpers_1.getInitials)(name),
            habits: [],
        });
        const createdUser = yield user.save();
        const token = createToken(createdUser);
        res
            .status(201)
            .json({ message: "Sign Up Successful!", token, userId: createdUser._id });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.signup = signup;
