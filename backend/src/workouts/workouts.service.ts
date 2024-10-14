import WorkoutModel from "./workouts.model";
import { IWorkout } from "./workouts.interface";
import { error } from "console";

export async function getWorkoutsByPlan(planId: any) {
	const workouts = await WorkoutModel.findAll({
		where: { planId },
	});
	return workouts as IWorkout[];
}

export async function getWorkoutById(workoutId: any) {
	const workout = await WorkoutModel.findByPk(workoutId);

	return workout as IWorkout;
}

export async function updateWorkout(workoutId: any, updatedWorkout: IWorkout) {
	const workoutInDB = await WorkoutModel.findByPk(workoutId);

	if (!workoutInDB) {
		throw error("WorkoutId does not exist in the database");
	}

	if (updatedWorkout.distance < 0) {
		throw error("Distance cannot be negative");
	}

	const updatedAsModel = updatedWorkout as WorkoutModel;

	const updated = await workoutInDB.update(updatedAsModel);

	return updated as IWorkout;
}
