import { RequestHandler } from "express";
import axios from "axios";

import HabitOption from "../models/HabitOption";
import User from "../models/User";
import Habit from "../models/Habit";
import { API_NINJAS_URL, HOBBY_CATEGORIES } from "../util/constants";
import {
  CustomRequest,
  NinjaHobbyResponse,
  HabitOptionMatchObj,
  ErrorResponse,
} from "../util/types";
import { combineEntries } from "../util/helpers";

export const getHabitOptions: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  try {
    const options = await HabitOption.find();
    res.json({ options });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addHabitOption: RequestHandler = async (req, res, next) => {
  try {
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
      throw new ErrorResponse("Already added!", 422);
    } else {
      const option = new HabitOption({
        title: hobby,
        matches: [],
        remaining: [],
      });
      await option.save();
      res.json({ message: `Added ${hobby} to options database!`, category });
    }
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getHabits: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "habits",
      populate: [
        {
          path: "habitType",
          model: "Option",
          select: "title",
        },
        { path: "user", model: "User", select: "initials" },
        { path: "partner", model: "User", select: "initials" },
      ],
    });

    res.json({ count: user.habits.length, habits: user.habits });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getHabit: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const userId = req.userId;
  const { habitId } = req.params;

  try {
    const habit = await Habit.findById(habitId)
      .populate("user", "initials")
      .populate("partner", "initials")
      .populate("habitType", "title")
      .populate("partnerHabit", "entries");

    if (habit.user.id !== userId)
      throw new ErrorResponse("Unauthorized Habit!", 401);

    if (!habit.partner) {
      return res.json({ habit });
    }

    const entries = combineEntries(
      habit.startDate,
      habit.entries,
      habit.partnerHabit.entries
    );

    res.json({
      user: habit.user,
      partner: habit.partner,
      habitId: habit.id,
      title: habit.habitType.title,
      entries,
    });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addHabitEntry: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const userId = req.userId;
  const { habitId } = req.params;

  try {
    const habit = await Habit.findById(habitId);
    if (habit.user.toString() !== userId)
      throw new ErrorResponse("Unauthorized Habit!", 401);

    const today = new Date(new Date().toDateString());
    if (habit.entries.at(-1)?.toString() === today.toString()) {
      throw new ErrorResponse("Already added today's entry!", 409);
    }

    const newEntry = today;
    habit.entries.push(newEntry);
    await habit.save();
    res.json({ message: "Added today's habit entry!", habit });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postNewHabit: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const { optionId } = req.body;
  const userId = req.userId!;
  try {
    const user = await User.findById(userId);
    const option = await HabitOption.findById(optionId);
    const remaining = option.remaining as HabitOptionMatchObj[];

    const habit = new Habit({
      habitType: optionId,
      user: user._id,
      entries: [],
    });
    user.habits.push(habit._id);

    const partnerIdx = remaining.findIndex(
      ({ userId: uid }) => uid.toString() !== userId
    );

    if (partnerIdx === -1) {
      remaining.push({ userId: user._id, habitId: habit._id });
    } else {
      const today = new Date(new Date().toDateString());
      const { userId: partnerId, habitId: pHabitId } = remaining.splice(
        partnerIdx,
        1
      )[0];
      const partnerHabit = await Habit.findById(pHabitId);
      partnerHabit.partner = userId;
      partnerHabit.partnerHabit = habit._id;
      partnerHabit.startDate = today;
      await partnerHabit.save();
      option.matches.push(
        { userId: user._id, habitId: habit._id },
        { userId: partnerId, habitId: pHabitId }
      );
      habit.partner = partnerId;
      habit.partnerHabit = pHabitId;
      habit.startDate = today;
    }

    await option.save();
    await habit.save();
    await user.save();
    res.json({ message: "Posted new habit!", userId, habit });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
