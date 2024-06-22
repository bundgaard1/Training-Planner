import { Request, Response } from "express";
import Workout from "../models/workouts.model";
import { RequestWithUser } from "../interfaces/auth.interface";

export const getWorkoutsByPlan = async (req: RequestWithUser, res: Response) => {
  const planId = req.params.planId;

  if (!planId) {
    return res.status(400).send({ error: "planId is required in query" });
  }

  const workouts = await Workout.findAll({ where: { planId: planId } });

  res.send(workouts);
};

export const updateWorkout = async (req: RequestWithUser, res: Response) => {
  const workoutId = req.params.workoutId;
  const updatedWorkout = req.body;

  if (!workoutId) {
    return res.status(400).send({ error: "workoutId is required in the URL" });
  }

  const workout = await Workout.findByPk(workoutId);

  if (!workout) {
    return res.status(404).send({ error: "Workout not found" });
  }

  await workout.update(updatedWorkout);

  res.send(workout);
};