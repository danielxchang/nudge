import { Request } from "express";
import mongoose from "mongoose";

export class ErrorResponse extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public field?: string
  ) {
    super(message);
  }
}

export interface CustomRequest extends Request {
  userId?: string;
  isHorton?: boolean;
}

export interface NinjaHobbyResponse {
  hobby: string;
  link: string;
  category: string;
}

export interface HabitOptionMatchObj {
  userId: mongoose.Types.ObjectId;
  habitId: mongoose.Types.ObjectId;
}

export interface HabitEntry {
  date: string;
  userSuccess: boolean;
  partnerSuccess: boolean;
}
