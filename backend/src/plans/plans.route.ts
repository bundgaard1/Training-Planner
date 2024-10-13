import express from "express";
import authMiddleware from "../auth/auth.middleware";
import * as PlanController from "./plans.controller";

const router = express.Router();

router.get("/:planId", authMiddleware, PlanController.getPlan);
router.get("/", authMiddleware, PlanController.getPlans);
router.post("/", authMiddleware, PlanController.createPlan);
router.put("/:planId", authMiddleware, PlanController.updatePlan);
router.delete("/:planId", authMiddleware, PlanController.deletePlan);

export default router;
