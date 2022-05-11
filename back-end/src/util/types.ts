import { Request } from "express";

export class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export interface CustomRequest extends Request {
  userId?: string;
}

export interface NinjaHobbyResponse {
  hobby: string;
  link: string;
  category: string;
}
