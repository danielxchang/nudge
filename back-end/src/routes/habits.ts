import { Router } from "express";

import * as habitController from "../controllers/habits";

const router = Router();

router.get("/", habitController.getHabits);

router.get("/options", habitController.getHabitOptions);

router.post("/options/add/:category", habitController.addHabitOption);

router.post("/new", habitController.postNewHabit);

router.patch("/:habitId", habitController.addHabitEntry);

export default router;
