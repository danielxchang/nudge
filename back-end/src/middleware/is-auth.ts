import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HORTON_CREDENTIALS } from "../util/constants";
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
  const { email, userId } = decodedToken as { email: string; userId: string };

  req.userId = userId;
  if (email === HORTON_CREDENTIALS.email) req.isHorton = true;

  next();
};

export default isAuth;
