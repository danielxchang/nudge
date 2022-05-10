import { RequestHandler } from "express";

export const pairup: RequestHandler = (req, res, next) => {
  console.log("Pairing up");
};
