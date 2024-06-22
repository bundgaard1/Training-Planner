import Workout from "../models/workouts.model";

async function createWorkoutsForPlan(plan: { id: any; }, weeks: number) {
  for (let i = 0; i < weeks; i++) {
    for (let j = 1; j <= 7; j++) {
      const workout = new Workout();
      workout.workoutType = "Rest";
      workout.distance = 0;
      workout.description = "";
      workout.day = i * 7 + j;
      workout.isCompleted = false;
      workout.planId = plan.id;
      await workout.save();
    }
  }
}

export {createWorkoutsForPlan};