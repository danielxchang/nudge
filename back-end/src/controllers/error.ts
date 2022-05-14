import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../util/types";

export const errorHandler: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  res
    .status(500)
    .json({ message: err.message, status: err.statusCode, field: err.field });
};
