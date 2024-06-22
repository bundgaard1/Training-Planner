
import { Router } from "express";
import planRoutes from "./plans.route";
import workoutRoutes from "./workouts.routes";
import userRoutes from "./users.route";

const router = Router();

router.use("/plans", planRoutes);
router.use("/workouts", workoutRoutes);
router.use("/users", userRoutes);

export default router;