export interface IWorkout {
	id: number;
	workoutType: "Rest" | "GeneralAerobic" | "Workout" | "LongRun" | "Race";
	distance: number; // Kilometers
	duration: number; // Seconds
	avgPace: number; // Seconds per kilometer
	description: string;
	isCompleted: boolean;
	day: number;
	planId: number;
}
