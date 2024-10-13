import { Request, Response } from "express";
import { IWorkout } from "./workouts.interface";
import { RequestWithUser } from "auth/auth.interface";
import * as WorkoutService from "./workouts.service";

export const getWorkoutsByPlan = async (
	req: RequestWithUser,
	res: Response
) => {
	const planId = req.params.planId;

	if (!planId) {
		return res.status(400).send({ error: "planId is required in query" });
	}

	const workouts = await WorkoutService.getAllWorkoutsByPlan(planId);

	res.send(workouts);
};

export const updateWorkout = async (req: RequestWithUser, res: Response) => {
	const workoutId = req.params.workoutId;

	if (!workoutId) {
		return res.status(400).send({ error: "workoutId is required in the URL" });
	}

	const updatedWorkout = req.body;

	try {
		const updated = await WorkoutService.updateWorkout(
			workoutId,
			updatedWorkout
		);
		res.send(updated);
	} catch (error: any) {
		return res.status(400).send({ error: error.message });
	}
};
