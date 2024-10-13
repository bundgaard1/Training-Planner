import { DB_URL } from "../config";
import Workout from "../types/Workout";

const BASE_URL = `${DB_URL}/workouts`;

export async function getWorkoutsByPlan(planId: number) {
	const response = await fetch(`${BASE_URL}/byPlan/${planId}`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Workouts received successfully");
		return data;
	} else {
		console.error("Error getting workouts");
		throw new Error("Error getting workouts");
	}
}

export async function updateWorkout(
	workoutId: number,
	updatedWorkout: Workout
): Promise<Workout> {
	const response = await fetch(`${BASE_URL}/${workoutId}`, {
		method: "PUT",
		body: JSON.stringify(updatedWorkout),
		headers: {
			authorization: `Bearer ${localStorage.getItem("authToken")}`,
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log("Workout updated successfully");
		return data;
	} else {
		console.error("Error updating workout");
		throw new Error("Error updating workout");
	}
}
