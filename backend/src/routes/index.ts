import { Router } from "express";
import planRoutes from "../plans/plans.route";
import workoutRoutes from "../workouts/workouts.routes";
import userRoutes from "../users/users.route";

const router = Router();

router.use("/plans", planRoutes);
router.use("/workouts", workoutRoutes);
router.use("/users", userRoutes);

export default router;
