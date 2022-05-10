import { RequestHandler } from "express";

export const login: RequestHandler = (req, res, next) => {
  console.log("Loggin In!");
};

export const signup: RequestHandler = (req, res, next) => {
  console.log("Signing up!");
};
