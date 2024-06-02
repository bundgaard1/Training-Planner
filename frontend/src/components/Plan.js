import React, { useState, useEffect } from "react";
import "./Plan.css";
import Daybox from "./Daybox";
import { getPlan, getAllPlans, getWorkoutsByPlan } from "../api/planAPI";

const WeekContainer = (props) => {
  const [week, setWeek] = useState(props.week);
  const [distances, setDistances] = useState(Array(7).fill(0));

  const handleDistanceChange = (day, newDistance) => {
    setDistances((prevDistances) => {
      const newDistances = [...prevDistances];
      newDistances[day - 1 - 7 * (week - 1)] = Number(newDistance);
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
          day={1 + 7 * (week - 1) + i}
          onDistanceChange={handleDistanceChange}
        />
      ))}
    </div>
  );
};

const PlanSelector = (props) => {
  const [inputPlan, setInputPlan] = useState(null);
  const [allPlans, setAllPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getAllPlans(); // Replace with your function to fetch all plansda
      setAllPlans(plans);
    };

    fetchPlans();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          if (!inputPlan) {
            return;
          }
          props.updatePlan(JSON.parse(inputPlan));
          console.log(inputPlan);
        }}
      >
        Get Plan
      </button>
      <select
        value={inputPlan}
        onChange={(e) => {
          setInputPlan(e.target.value);
        }}
      >
        <option value={0} key={0}>
          Select Plan
        </option>
        {allPlans.map((plan) => (
          <option value={JSON.stringify(plan)} key={plan.id}>
            {plan.name} ({plan.weeks} weeks)
          </option>
        ))}
      </select>
    </div>
  );
};

const Plan = (props) => {
  const [plan, setPlan] = useState({ weeks: 0, name: "NO PLAN", id: 0 });
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workouts = await getWorkoutsByPlan(plan.id); 
      setWorkouts(workouts);
    };

    fetchWorkouts();
  }, [plan]);

  return (
    <div>
      <PlanSelector updatePlan={setPlan} />
      <div>{JSON.stringify(plan)}</div>
      <h1>{plan.name}</h1>
      <div>{JSON.stringify(workouts)}</div>
      <div className="calendar">
        {Array.from({ length: plan.weeks }, (_, i) => (
          <WeekContainer week={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default Plan;
