import React, { useState, createContext, useContext, useEffect } from "react";
import "./Plan.css";
import Daybox from "./Daybox";
import { PlanProvider, usePlan } from "./PlanContext";
import PlanSelector from "./PlanSelector";



const CalendarHeader = () => {
  // header with the days of the week
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <div
      className="weekContainer"
      style={{
        backgroundColor: "darkgray",
        display: "flex",
        flexFlow: "row",
        justifyContent: "space-between",
      }}
    >
      <div className="weekSummaryBox">Weekly Summary</div>
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
          }}
        >
          {daysOfWeek[i]}
        </div>
      ))}
    </div>
  );
};

interface WeekContainerProps {
  week: number;
}

const WeekContainer = (props: WeekContainerProps) => {
  const week = props.week;
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  // for now we will just use the monday og the current week as the start date
  const weekStartDate = new Date(plan.date);
  weekStartDate.setDate(weekStartDate.getDate() + 7 * (week - 1));

  const weekDistance = Array.from({ length: 7 }, (_, i) => {
    if (!(workoutsByDay instanceof Map)) {
      return 0; // Return 0 or handle this case as appropriate for your application
    }
    const day = 1 + 7 * (week - 1) + i;
    return workoutsByDay.get(day) ? workoutsByDay.get(day)!.distance : 0;
  }).reduce((a, b) => a + b, 0);

  if (week === 0) {
    return (
      <div>
        <h1>Plan not selected</h1>
      </div>
    );
  }

  return (
    <div key={week} className="weekContainer">
      <div
        className="weekSummaryBox"
        style={{ border: "1px solid black", backgroundColor: "darkgray" }}
      >
        <h2 style={{ margin: "0" }}>Week {week}</h2>
        <p style={{ margin: "0" }}>
          Date: {weekStartDate.getDate()}/{weekStartDate.getMonth()+1}{" "}
        </p>
        <div>Total distance: {weekDistance}</div>
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <Daybox key={i} day={1 + 7 * (week - 1) + i} />
      ))}
    </div>
  );
};

const PlanCalender = () => {
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  return (
    <div className="calendar">
      <CalendarHeader />
      {Array.from({ length: plan.weeks }, (_, i) => (
        <WeekContainer key={i} week={i + 1} />
      ))}
    </div>
  );
};

const PlanHeader = () => {
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "lightblue",
      }}
    >
      {/* <div>{JSON.stringify(plan)}</div> */}
      <h1>{plan.name}</h1>
      {/*   <div>{JSON.stringify(workoutsByDay)}</div> */}
    </div>
  );
};

const Plan = () => {
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
