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
  const [weekDistance, setWeekDistance] = useState<number>(0);

  const thisWeekStartDate = new Date(plan.startDate);
  thisWeekStartDate.setDate(thisWeekStartDate.getDate() + 7 * (week - 1));

  
  useEffect(() => {
    const newWeekDistance = Array.from({ length: 7 }, (_, i) => {
      if (!(workoutsByDay instanceof Map)) {
        console.log("workoutsByDay is not a Map");
        return 0;
      }
      const day = 1 + 7 * (week - 1) + i;
      return workoutsByDay.has(day) ? workoutsByDay.get(day)!.distance : 0;
    }).reduce((a, b) => a + b, 0);
    setWeekDistance(newWeekDistance);
  }, [workoutsByDay]);

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
          Date: {thisWeekStartDate.getDate()}/
          {thisWeekStartDate.getMonth() + 1}{" "}
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
        backgroundColor: "lightblue",
      }}
    >
      <h1>{plan.name}</h1>
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
