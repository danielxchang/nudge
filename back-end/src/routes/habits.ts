import { Router } from "express";

import * as habitController from "../controllers/habits";
import isAdmin from "../middleware/is-admin";

const router = Router();

// GET /api/habits/
router.get("/", habitController.getHabits);

// GET /api/habits/options
router.get("/options", habitController.getHabitOptions);

// GET /api/habits/:habitId
router.get("/:habitId", habitController.getHabit);

// POST /api/habits/options/add/:category
router.post("/options/add/:category", isAdmin, habitController.addHabitOption);

// DELETE /api/habits/:habitId -> Meant for cleaning up any habits created by Horton/Emily
router.delete("/:habitId", isAdmin, habitController.deleteHabit);

// POST /api/habits/new
router.post(
  "/new",
  habitController.postHortonHabit,
  habitController.postNewHabit
);

// PATCH /api/habits/:habitId
router.patch("/:habitId", habitController.addHabitEntry);

export default router;
