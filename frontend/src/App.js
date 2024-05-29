// src/App.js
import React, {useState} from "react";
import Navbar from "./components/navbar";
import Calendar from "./components/Calendar";

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({});

  const submitWorkout = async () => {
    const workoutData = {
      name: "My Workout",
      duration: 60,
      // Add other fields as necessary
    };

    const response = await fetch("http://localhost:3000/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    });

    

    if (response.ok) {
      console.log(response.body);
      console.log("Workout sent and recieved successfully");
    } else {
      console.error("Error saving workout");
    }
  };

  return (
    <div>
      <button onClick={submitWorkout}>Submit Workout</button>
      <div>{JSON.stringify(workout)}</div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <WorkoutForm />
      <Navbar />
      <Calendar weeks={3} />
    </div>
  );
};

export default App;
