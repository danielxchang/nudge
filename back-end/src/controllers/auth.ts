import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { getInitials } from "../util/helpers";
import { ErrorResponse } from "../util/types";
import mongoose from "mongoose";

const createToken = (user: { email: string; _id: mongoose.Types.ObjectId }) => {
  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  return token;
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new ErrorResponse("User not found!", 401);
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new ErrorResponse("Wrong password!", 401);
      throw error;
    }

    const token = createToken(user);

    res.status(200).json({ token, userId: user._id.toString() });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new ErrorResponse("Validation failed!", 422);
    return next(error);
  }
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      initials: getInitials(name),
      habits: [],
    });
    const createdUser = await user.save();
    const token = createToken(createdUser);

    res
      .status(201)
      .json({ message: "Sign Up Successful!", token, userId: createdUser._id });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
