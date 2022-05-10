import { RequestHandler } from "express";

export const getHabitOptions: RequestHandler = (req, res, next) => {
  console.log("Getting Habits!");
};

export const getHabits: RequestHandler = (req, res, next) => {
  console.log("Getting user's habits!");
};

export const addHabitEntry: RequestHandler = (req, res, next) => {
  console.log("Getting Habits");
};

export const postNewHabit: RequestHandler = (req, res, next) => {
  console.log("Getting Habits");
};
