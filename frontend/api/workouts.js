// Step 3: Send the workout data to the backend
const workoutData = {
  name: "My Workout",
  duration: 60,
};

fetch("http://localhost:3000/workouts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(workoutData),
});
