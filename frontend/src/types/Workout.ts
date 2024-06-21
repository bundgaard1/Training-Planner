

export default interface Workout {
    id: number;
    day: number;
    workoutType: string;
    distance: number;
    description: string;
    isCompleted: boolean;
}

// default workout

export const defaultWorkout: Workout = {
    id: 0,
    day: 0,
    workoutType: "Rest",
    distance: 0,
    description: "",
    isCompleted: false,
};
