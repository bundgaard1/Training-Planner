import React, { useState, useEffect } from "react";
import { getAllPlans, getPlan } from "../api/planAPI";
import { usePlan } from "./PlanContext";
import PlanData from "../types/PlanData" 

const PlanSelector = () => {
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  const [allPlans, setAllPlans] = useState<PlanData[]>([]);
  const [inputPlanId, setInputPlanId] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getAllPlans();
      setAllPlans(plans);
    };

    fetchPlans();
  }, []);

  const changePlanToTheSelected = async () => {
    if (inputPlanId !== 0) {
      const selectedPlan: PlanData = await getPlan(inputPlanId);
      setPlan(selectedPlan);
    }
  };
  
  return (
    <div>
      <h3>Select Plan</h3>
      <select
        value={inputPlanId}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setInputPlanId(parseInt(event.target.value, 10));
        }}
      >
        <option value={0} key={0}>
          Select Plan
        </option>
        {allPlans &&
          allPlans.length > 0 &&
          allPlans.map((plan) => (
            <option value={plan.id} key={plan.id!}>
              {plan.name} ({plan.weeks} weeks)
            </option>
          ))}
      </select>
      <br></br>
      <button onClick={changePlanToTheSelected}>Get Plan</button>
    </div>
  );
};

export default PlanSelector;
