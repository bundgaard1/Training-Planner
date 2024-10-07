import express from "express";
import authMiddleware from "../auth/auth.middleware";
import * as PlanController from "./plans.controller";

const router = express.Router();

router.get("/getPlan/:planId", authMiddleware, PlanController.getPlan);
router.get("/getPlans", authMiddleware, PlanController.getPlans);
router.post("/createPlan", authMiddleware, PlanController.createPlan);

export default router;
