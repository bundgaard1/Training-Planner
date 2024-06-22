import PlanModel from "../models/plans.model";
import { createWorkoutsForPlan } from "../services/plans.service";
import { Request, Response } from "express";
import { RequestWithUser } from "../interfaces/auth.interface";

export const getPlan = async (req: RequestWithUser, res: Response) => {
  const planId = req.params.planId;

  if (!planId) {
    return res.status(400).send({ error: "planID is required in query" });
  }

  const plan = await PlanModel.findByPk(planId);

  if (!plan) {
    return res.status(400).send({ error: "Plan not found" });
  }

  res.send(plan);
};

export const getPlans = async (_req: RequestWithUser, res: Response) => {
  const plans = await PlanModel.findAll();

  res.send(plans);
};

export const createPlan = async (req: RequestWithUser, res: Response) => {
  const { weeks, name, date } = req.body;

  if (!weeks || !name || !date) {
    return res.status(400).send({ error: "weeks, name, and date are required" });
  }

  const newPlan = new PlanModel({ weeks, name, date, userId: req.user!.id});

  await newPlan.save();
  if (newPlan.id) {
    await createWorkoutsForPlan(newPlan, weeks);
  }

  res.send(newPlan);
};