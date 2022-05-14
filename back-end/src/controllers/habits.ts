import { RequestHandler } from "express";
import mongoose from "mongoose";
import axios from "axios";

import HabitOption from "../models/HabitOption";
import User from "../models/User";
import Habit from "../models/Habit";
import {
  API_NINJAS_URL,
  EMILY_CREDENTIALS,
  HOBBY_CATEGORIES,
  HORTON_CREDENTIALS,
} from "../util/constants";
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
    res.json({
      options: options.map((option) => {
        return { id: option._id, title: option.title };
      }),
    });
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

    const userHabits = user.habits.map((h: any) => {
      return {
        id: h._id,
        title: h.habitType.title,
        startDate: h.startDate,
        user: h.user.initials,
        ...(h.partner && { partner: h.partner.initials }),
      };
    });

    res.json({ habits: userHabits });
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
      id: habit.id,
      title: habit.habitType.title,
      user: habit.user.initials,
      partner: habit.partner.initials,
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
    const habit = await Habit.findById(habitId).populate(
      "partnerHabit",
      "entries"
    );
    if (habit.user.toString() !== userId)
      throw new ErrorResponse("Unauthorized Habit!", 401);

    const today = new Date(new Date().toDateString());
    if (habit.entries.at(-1)?.toString() === today.toString()) {
      throw new ErrorResponse("Already added today's entry!", 409);
    }

    const newEntry = today;
    habit.entries.push(newEntry);
    await habit.save();

    const entries = combineEntries(
      habit.startDate,
      habit.entries,
      habit.partnerHabit.entries
    );

    res.json({ ok: true, entries });
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
  const { optionInput } = req.body;
  const userId = req.userId!;
  try {
    const user = await User.findById(userId);
    const option = await HabitOption.findOne({ title: optionInput });
    const remaining = option.remaining as HabitOptionMatchObj[];

    const habit = new Habit({
      habitType: option._id,
      user: user._id,
      entries: [],
    });
    user.habits.push(habit._id);

    let partnerIdx;
    if (req.isHorton) {
      const emily = await User.findOne({ email: EMILY_CREDENTIALS.email });
      partnerIdx = remaining.findIndex(
        ({ userId: uid }) => uid.toString() === emily._id.toString()
      );
    } else {
      partnerIdx = remaining.findIndex(
        ({ userId: uid }) => uid.toString() !== userId
      );
    }

    if (partnerIdx === -1) {
      remaining.push({ userId: user._id, habitId: habit._id });
    } else {
      const today = new Date(new Date().toDateString());
      const { userId: partnerId, habitId: pHabitId } = remaining.splice(
        partnerIdx,
        1
      )[0];
      const partnerHabit = await Habit.findById(pHabitId);

      option.matches.push(
        { userId: user._id, habitId: habit._id },
        { userId: partnerId, habitId: pHabitId }
      );
      partnerHabit.partner = userId;
      partnerHabit.partnerHabit = habit._id;
      partnerHabit.startDate = today;
      await partnerHabit.save();

      habit.partner = partnerId;
      habit.partnerHabit = pHabitId;
      habit.startDate = today;
    }

    await option.save();
    await habit.save();
    await user.save();
    res.json({ ok: true, habitId: habit._id });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postHortonHabit: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  if (!req.isHorton) return next();

  const { optionInput } = req.body;
  try {
    const emily = await User.findOne({ email: EMILY_CREDENTIALS.email });
    const option = await HabitOption.findOne({ title: optionInput });

    const emilyHabit = new Habit({
      habitType: option._id,
      user: emily._id,
      entries: [],
    });
    emily.habits.push(emilyHabit._id);

    option.remaining.push({ userId: emily._id, habitId: emilyHabit._id });

    await emilyHabit.save();
    await emily.save();
    await option.save();
    return next();
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteHabit: RequestHandler = async (
  req: CustomRequest,
  res,
  next
) => {
  const { habitId } = req.params;

  try {
    const user = await User.findOne({ email: HORTON_CREDENTIALS.email });
    user.habits = user.habits.filter(
      (habit: mongoose.Schema.Types.ObjectId) => habit.toString() !== habitId
    );
    await user.save();

    const habit = await Habit.findById(habitId);
    const hasPartner = habit.partner as
      | mongoose.Schema.Types.ObjectId
      | undefined;

    const habitOption = await HabitOption.findById(habit.habitType);

    if (hasPartner) {
      const partner = await User.findById(habit.partner);
      partner.habits = partner.habits.filter(
        (h: mongoose.Schema.Types.ObjectId) =>
          h.toString() !== habit.partnerHabit.toString()
      );
      await partner.save();
      await Habit.findByIdAndDelete(habit.partnerHabit);

      habitOption.matches = habitOption.matches.filter(
        (match: HabitOptionMatchObj) => {
          return (
            match.habitId.toString() !== habitId &&
            match.habitId.toString() !== habit.partnerHabit.toString()
          );
        }
      );
    } else {
      habitOption.remaining = habitOption.remaining.filter(
        (match: HabitOptionMatchObj) => match.habitId.toString() !== habitId
      );
    }

    await habitOption.save();
    await Habit.findByIdAndRemove(habitId);
    res.json({ message: "Deleted successfully!" });
  } catch (err: any | ErrorResponse) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
