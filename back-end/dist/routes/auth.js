"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const is_horton_1 = __importDefault(require("../middleware/is-horton"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// POST /api/auth/login
router.post("/login", auth_1.login);
// POST /api/auth/post
router.post("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value, { req }) => {
        return User_1.default.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
                return Promise.reject("Email already exists!");
            }
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }),
    (0, express_validator_1.body)("name").trim().not().isEmpty(),
], auth_1.signup);
// POST /api/auth/horton -> Meant for guests who explore site as Horton (simulated guest user)
router.post("/horton", is_horton_1.default, auth_1.login);
exports.default = router;
