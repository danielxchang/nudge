import { Router } from "express";

import * as habitController from "../controllers/habits";

const router = Router();

router.get("/options", habitController.getHabitOptions);

router.get("/:habitId", habitController.getHabits);

router.post("/new", habitController.postNewHabit);

router.patch("/:habitId", habitController.addHabitEntry);

export default router;
