import React, { useState, createContext, useContext, useEffect } from "react";
import "./Plan.css";
import Daybox from "./Daybox";
import { PlanProvider, usePlan } from "./PlanContext";
import PlanSelector from "./PlanSelector";

const WeekContainer = (props) => {
  const week = props.week;
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();

  const weekDistance = Array.from({ length: 7 }, (_, i) => {
    const day = 1 + 7 * (week - 1) + i;
    return workoutsByDay[day] ? workoutsByDay[day].distance : 0;
  }).reduce((a, b) => a + b, 0);

  return (
    <div key={week} className="weekContainer">
      <div className="weekSummaryBox">
        <h2>Week {week}</h2>
        <div>Total distance: {weekDistance}</div>
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <Daybox day={1 + 7 * (week - 1) + i} />
      ))}
    </div>
  );
};

const PlanCalender = (props) => {
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  return (
    <div className="calendar">
      {Array.from({ length: plan.weeks }, (_, i) => (
        <WeekContainer week={i + 1} />
      ))}
    </div>
  );
};

const PlanHeader = (props) => {
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  return (
    <div>
      <div>{JSON.stringify(plan)}</div>
      <h1>{plan.name}</h1>
      <div>{JSON.stringify(workoutsByDay)}</div>
    </div>
  );
};

const Plan = (props) => {
  return (
    <div>
      <PlanProvider>
        <PlanSelector />
        <PlanHeader />
        <PlanCalender />
      </PlanProvider>
    </div>
  );
};

export default Plan;
