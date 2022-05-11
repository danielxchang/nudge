import { RequestHandler } from "express";
import { ErrorResponse, CustomRequest } from "../util/types";

const isAdmin: RequestHandler = (req: CustomRequest, res, next) => {
  if (req.userId !== process.env.ADMIN_ID) {
    const error = new ErrorResponse("Not authenticated.", 401);
    throw error;
  }
  next();
};

export default isAdmin;
