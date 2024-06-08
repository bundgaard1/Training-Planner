import React, { useState, createContext, useContext, useEffect } from "react";
import {getWorkoutsByPlan } from "../api/workoutAPI";

// Create a context
const PlanContext = createContext();

// Create a provider component
export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState({ weeks: 0, name: "NO PLAN", id: 0, date: (new Date(2024, 0, 1)).toISOString()});
  const [workoutsByDay, setWorkoutsByDay] = useState({});
  console.log(plan.date);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (plan.id === 0) {
        return;
      }
      const workouts = await getWorkoutsByPlan(plan.id);
      const workoutsDayMap = {};
      workouts.forEach((element) => {
        workoutsDayMap[element.day] = element;
      });
      setWorkoutsByDay(workoutsDayMap);
    };

    fetchWorkouts();
  }, [plan]);

  return (
    <PlanContext.Provider
      value={{ plan, setPlan, workoutsByDay, setWorkoutsByDay }}
    >
      {children}
    </PlanContext.Provider>
  );
};

// Create a custom hook to use the context
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
