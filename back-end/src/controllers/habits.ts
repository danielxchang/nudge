import { RequestHandler } from "express";
import axios from "axios";

import HabitOption from "../models/HabitOption";
import User from "../models/User";
import Habit from "../models/Habit";
import { API_NINJAS_URL, HOBBY_CATEGORIES } from "../util/constants";
import { CustomRequest, NinjaHobbyResponse } from "../util/types";

export const getHabitOptions: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const options = await HabitOption.find();
  res.json({ options });
};

export const addHabitOption: RequestHandler = async (req, res, next) => {
  const category =
    HOBBY_CATEGORIES.find((cat) => cat === req.params.category) || "general";
  const response = await axios.get(API_NINJAS_URL + category, {
    headers: {
      "X-Api-Key": process.env.API_NINJAS_KEY!,
    },
  });
  const data = response.data as NinjaHobbyResponse;
  const hobby = data.hobby;

  const foundHabit = await HabitOption.findOne({ title: hobby });
  if (foundHabit) {
    res.status(422).json({ message: "Already added!" });
  } else {
    const option = new HabitOption({
      title: hobby,
      matchedUsers: [],
      unmatchedUsers: [],
    });
    await option.save();
    res.json({ message: `Added ${hobby} to options database!`, category });
  }
};

// CHECK THIS
export const getHabits: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const user = await User.findById(req.userId).populate("habits");
  res.json({ count: user.habits.length, habits: user.habits });
};

// TODO
export const addHabitEntry: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
  console.log("Getting Habits");
};

// CHECK THIS
export const postNewHabit: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const { optionId } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);
  const option = await HabitOption.findById(optionId);

  const habit = new Habit({
    habitType: optionId,
    dateStarted: new Date(),
    user: user._id,
    entries: [],
  });

  let partner;
  if (option.unmatchedUsers.length === 0) {
    option.unmatchedUsers.push(user._id);
  } else {
    const { userId: partnerId, habitId: pHabitId } =
      option.unmatchedUsers.pop() as {
        userId: string;
        habitId: string;
      };
    const partnerHabit = await Habit.findById(pHabitId);
    partnerHabit.partner = userId;
    await partnerHabit.save();
    partner = await User.findById(partnerId);
    option.matchedUsers.push({ userId: user._id, habitId: habit._id });
    option.matchedUsers.push({ userId: partnerId, habitId: pHabitId });
  }

  habit.partner = partner._id;

  await option.save();
  await habit.save();
  user.habits.push(habit._id);
  await user.save();
  res.json({ message: "Posted new habit!", habit });
};
