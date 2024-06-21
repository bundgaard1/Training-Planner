
import { Router } from "express";
import planRoutes from "./plan.route";
import workoutRoutes from "./workout.routes";
import userRoutes from "./user.route";

const router = Router();

router.use("/plans", planRoutes);
router.use("/workouts", workoutRoutes);
router.use("/users", userRoutes);

export default router;