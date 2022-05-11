import { Router } from "express";

import * as habitController from "../controllers/habits";
import isAdmin from "../middleware/is-admin";

const router = Router();

router.get("/", habitController.getHabits);

router.get("/options", habitController.getHabitOptions);

router.get("/:habitId", habitController.getHabit);

router.post("/options/add/:category", isAdmin, habitController.addHabitOption);

router.post("/new", habitController.postNewHabit);

router.patch("/:habitId", habitController.addHabitEntry);

export default router;
