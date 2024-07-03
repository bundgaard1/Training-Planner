import React, { useState, createContext, useContext, useEffect } from "react";
import Daybox from "./Daybox";
import { usePlan } from "../contexts/PlanContext";

const CalendarHeader = () => {
  // header with the days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <thead className="weekHeaderContainer bg-gray-300 flex flex-row justify-between sticky">
      <th className="weekSummaryHeader bg-gray-500 flex justify-center items-center flex-1 border border-black border-collapse sticky">
        Weekly Summary
      </th>
      {Array.from({ length: 7 }, (_, i) => (
        <th
          key={i}
          className="weekDay flex justify-center items-center flex-1 border border-black border-collapse sticky"
        >
          {daysOfWeek[i]}
        </th>
      ))}
    </thead>
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

  const WeekSummary = () => {
    return (
      <td className="weekSummaryBox flex flex-1 bg-gray-500 flex-col border border-black border-collapse  ">
        <h2 className="m-0">Week {week}</h2>
        <p className="m-0">
          Date: {thisWeekStartDate.getDate()}/{thisWeekStartDate.getMonth() + 1}{" "}
        </p>
        <div>Total distance: {weekDistance}</div>
      </td>
    );
  };

  return (
    <thead key={week} className="weekContainer flex flex-row w-full h-28 ">
      <WeekSummary />
      {Array.from({ length: 7 }, (_, i) => (
        <Daybox key={i} day={1 + 7 * (week - 1) + i} />
      ))}
    </thead>
  );
};

export const PlanCalender = () => {
  const { plan } = usePlan();
  return (
    <div className="overflow-y-auto">
      <table className="calendar w-full border border-black border-collapse  ">
        <CalendarHeader />
        {Array.from({ length: plan.weeks }, (_, i) => (
          <WeekContainer key={i} week={i + 1} />
        ))}
      </table>
    </div>
  );
};

export const PlanHeader = () => {
  const { plan } = usePlan();
  return (
    <div className="plan-header w-full bg-gray-300 rounded-3xl p-4 my-3 flex justify-center  ">
      <h1 className="text-3xl">{plan.name}</h1>
    </div>
  );
};
