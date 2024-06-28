import WorkoutModel from "../models/workouts.model";
import { IWorkout } from "../interfaces/workouts.interface";

export async function getAllWorkoutsByPlan(planId: any) {
    const workouts = await WorkoutModel.findAll({ where: { planId } })
    return workouts as IWorkout[];
}

export async function getWorkoutById(workoutId: any) {
    const workout = await WorkoutModel.findByPk(workoutId)
    
    return workout as IWorkout;
}

export async function updateWorkout(workoutId: any, updatedWorkout: IWorkout) {
    const workout = await WorkoutModel.findByPk(workoutId);

    if (!workout) {
        return null;
    }

    const updatedAsModel = updatedWorkout as WorkoutModel;

    const updated = await workout.update(updatedAsModel)
 
    return updated as IWorkout;
}