export default interface Workout {
	workoutType: string;
	distance: number;
	duration: number; // Seconds
	avgPace: number; // Seconds per kilometer
	description: string;
	isCompleted: boolean;
	day: number;
	id: number;
}

// default workout

export const defaultWorkout: Workout = {
	workoutType: "Rest",
	distance: 0,
	duration: 0,
	avgPace: 0,
	description: "",
	isCompleted: false,
	day: 0,
	id: 0,
};

// workout types
export const WorkoutTypes: Record<string, string> = {
	Rest: "Rest",
	GeneralAerobic: "General Aerobic",
	Workout: "Workout",
	LongRun: "Long Run",
	Race: "Run",
};
