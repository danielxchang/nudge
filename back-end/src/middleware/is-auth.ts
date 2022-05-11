import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse, CustomRequest } from "../util/types";

const isAuth: RequestHandler = (req: CustomRequest, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new ErrorResponse("Not authenticated.", 401);
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new ErrorResponse("Not authenticated.", 401);
    throw error;
  }
  req.userId = (decodedToken as { userId: string }).userId;
  next();
};

export default isAuth;
