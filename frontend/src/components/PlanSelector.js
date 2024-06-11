import {getAllPlans} from "../api/planAPI";
import {usePlan} from "./PlanContext";
import React, {useState, useEffect} from "react";

const PlanSelector = (props) => {
    const {plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
    const [inputPlan, setInputPlan] = useState(0);
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
            if (inputPlan == 0) {
              return;
            }
            setPlan(JSON.parse(inputPlan));
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
          {allPlans && allPlans.length > 0 &&  allPlans.map((plan) => (
            <option value={JSON.stringify(plan)} key={plan.id}>
              {plan.name} ({plan.weeks} weeks)
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default PlanSelector;