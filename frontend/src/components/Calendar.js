import React, { useState, useEffect } from "react";
import "./Calendar.css";
import Daybox from "./Daybox";

const WeekContainer = (props) => {
  const [week, setWeek] = useState(props.week);
  const [distances, setDistances] = useState(Array(7).fill(0));

  const handleDistanceChange = (day, newDistance) => {
    setDistances((prevDistances) => {
      const newDistances = [...prevDistances];
      newDistances[day - 1 - 7 * (week-1)] = Number(newDistance);
      return newDistances;
    });
  };  

  const WeekSummary = () => {
    return distances.reduce((total, distance) => total + distance, 0);
  };

  return (
    <div key={week} className="weekContainer">
      <div className="weekSummaryBox">
        <h2>Week {week}</h2>
        <div>Total distance: {WeekSummary()}</div>
      </div>
      {Array.from({ length: 7 }, (_, i) => (
        <Daybox
          day={1 + 7 * (week-1) + i}
          onDistanceChange={handleDistanceChange}
        />
      ))}
    </div>
  );
};

const Calendar = (props) => {
  const weeks = props.weeks;

  return (
    <div>
      <div className="calendar">
        {Array.from({ length: weeks }, (_, i) => (
          <WeekContainer week={i+1} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
