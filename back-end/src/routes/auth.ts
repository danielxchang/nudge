import { Router } from "express";
import { body } from "express-validator";

import { login, signup } from "../controllers/auth";
import isHorton from "../middleware/is-horton";
import User from "../models/User";

const router = Router();

router.post("/login", login);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

router.post("/horton", isHorton, login);

export default router;
