const Workout = require("../models/Workout");

async function createWorkoutsForPlan(plan, weeks) {
  for (let i = 0; i < weeks; i++) {
    for (let j = 1; j <= 7; j++) {
      const workout = new Workout({
        workoutType: "Rest",
        distance: 0,
        description: "",
        day: i * 7 + j,
        planId: plan.id,
      });
      await workout.save();
    }
  }
}

module.exports = {
  createWorkoutsForPlan,
};