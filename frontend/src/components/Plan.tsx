import React, { useState, createContext, useContext, useEffect } from "react";
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
    <div className="weekContainer bg-gray-700 flex flex-row justify-between">
      <div className="weekSummaryBox">Weekly Summary</div>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="flex justify-center items-center flex-1">
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
    <div key={week} className="weekContainer flex w-max">
      <div className="weekSummaryBox border-2 bg-gray-500 flex flex-col w-48">
        <h2 className="m-0">Week {week}</h2>
        <p className="m-0">
          Date: {thisWeekStartDate.getDate()}/{thisWeekStartDate.getMonth() + 1}{" "}
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
  const { plan } = usePlan();
  return (
    <div className="calendar ">
      <CalendarHeader />
      {Array.from({ length: plan.weeks }, (_, i) => (
        <WeekContainer key={i} week={i + 1} />
      ))}
    </div>
  );
};

const PlanHeader = () => {
  const { plan } = usePlan();
  return (
    <div className="PlanHeader w-full bg-blue-400">
      <h1>{plan.name}</h1>
    </div>
  );
};

const Plan: React.FC = () => {
  return (
    <div className="PlanOverview flex flex-1 flex-col">
      <PlanProvider>
        <PlanSelector />
        <PlanHeader />
        <PlanCalender />
      </PlanProvider>
    </div>
  );
};

export default Plan;
