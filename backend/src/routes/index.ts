import { Router } from "express";
import planRoutes from "../plans/plans.route";
import workoutRoutes from "../workouts/workouts.routes";
import userRoutes from "../users/users.route";
import premadeRoutes from "../premadePlans/premadePlans.routes";

const router = Router();

router.use("/plans", planRoutes);
router.use("/workouts", workoutRoutes);
router.use("/users", userRoutes);
router.use("/premadePlans", premadeRoutes);

export default router;
