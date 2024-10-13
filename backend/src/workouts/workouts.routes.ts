import express from "express";
import authMiddleware from "../auth/auth.middleware";
import { getWorkoutsByPlan, updateWorkout } from "./workouts.controller"; // Adjust the import path as necessary

const router = express.Router();

router.put("/:workoutId", authMiddleware, updateWorkout);
router.get("/byPlan/:planId", authMiddleware, getWorkoutsByPlan);

export default router;
