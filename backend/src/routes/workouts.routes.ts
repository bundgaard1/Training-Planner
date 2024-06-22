import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { getWorkoutsByPlan, updateWorkout } from "../controllers/workouts.controller"; // Adjust the import path as necessary

const router = express.Router();

router.get("/byPlan/:planId", authMiddleware, getWorkoutsByPlan);
router.put("/updateWorkout/:workoutId", authMiddleware, updateWorkout);

export default router;