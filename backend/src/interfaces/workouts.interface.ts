export interface IWorkout {
  id: number;
  workoutType: "Rest" | "GeneralAerobic" | "Workout" | "LongRun" | "Race";
  distance: number;
  description: string;
  isCompleted: boolean;
  day: number;
  planId: number;
}
