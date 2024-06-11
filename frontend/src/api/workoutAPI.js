const BASE_URL = "http://localhost:3000/workouts";

export async function getWorkoutsByPlan(planId) {
  const response = await fetch(`${BASE_URL}/byPlan/${planId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

export async function updateWorkout(workoutId, updatedWorkout) {
  const response = await fetch(`${BASE_URL}/updateWorkout/${workoutId}`, {
    method: "PUT",
    body: JSON.stringify(updatedWorkout),
    headers: {
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
