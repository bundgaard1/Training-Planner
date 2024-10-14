import express from "express";
import authMiddleware from "../auth/auth.middleware";
import * as PMPlanController from "./premadePlans.controller";

const router = express.Router();

router.get("/", authMiddleware, PMPlanController.getPremadePlans);
router.post(
	"/createBasedOnPremade",
	authMiddleware,
	PMPlanController.createBasedOnPremade
);

export default router;
