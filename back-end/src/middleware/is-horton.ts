import { RequestHandler } from "express";

import { CustomRequest } from "../util/types";
import { HORTON_CREDENTIALS } from "../util/constants";

const isHorton: RequestHandler = (req: CustomRequest, res, next) => {
  req.body = HORTON_CREDENTIALS;
  next();
};

export default isHorton;
