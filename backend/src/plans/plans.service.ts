import WorkoutModel from "../workouts/workouts.model";
import PlanModel from "./plans.model";
import { IPlan } from "./plans.interface";

export async function createWorkoutsForPlan(plan: IPlan, weeks: number) {
	for (let i = 0; i < weeks; i++) {
		for (let j = 1; j <= 7; j++) {
			const workout = new WorkoutModel();
			workout.workoutType = "Rest";
			workout.distance = 0;
			workout.duration = 0;
			workout.avgPace = 0;
			workout.description = "";
			workout.day = i * 7 + j;
			workout.isCompleted = false;
			workout.planId = plan.id;
			await workout.save();
		}
	}
}

export async function getPlansByUserId(userId: number) {
	const plans = await PlanModel.findAll({ where: { userId } });
	return plans as IPlan[];
}

export async function getPlanById(planId: number) {
	const plan = await PlanModel.findByPk(planId);
	return plan;
}

export async function createNewPlan(
	userId: number,
	weeks: number,
	name: string,
	startDate: Date
) {
	const newPlan = new PlanModel({ weeks, name, startDate, userId });

	await newPlan.save();
	if (newPlan.id) {
		await createWorkoutsForPlan(newPlan as IPlan, weeks);
	}

	return newPlan as IPlan;
}
