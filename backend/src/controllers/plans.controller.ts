
import * as PlanService from "../services/plans.service";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";

export const getPlan = async (req: RequestWithUser, res: Response) => {
  const planId = req.params.planId;


  if (!planId) {
    return res.status(400).send({ error: "planID is required in query" });
  }

  const plan = await PlanService.getPlanById(Number(planId));

  if (!plan) {
    return res.status(400).send({ error: "Plan not found" });
  }
  
  console.log(plan)
  res.send(plan);
};

export const getPlans = async (req: RequestWithUser, res: Response) => {
  const plans = await PlanService.getPlansByUserId(req.user!.id)

  res.send(plans);
};

export const createPlan = async (req: RequestWithUser, res: Response) => {
  const { weeks, name, startDate } = req.body;

  if (!weeks || !name || !startDate) {
    return res.status(400).send({ error: "weeks, name, and date are required" });
  }

  const newPlan = await PlanService.createNewPlan(req.user!.id, weeks, name, startDate)

  res.send(newPlan);
};