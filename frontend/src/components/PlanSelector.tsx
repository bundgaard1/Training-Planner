import React, { useState, useEffect } from "react";
import { getAllPlans, getPlan } from "../api/planAPI";
import { usePlan } from "../contexts/PlanContext";
import PlanData from "../types/PlanData";

export const PlanSelector = () => {
  const { setPlan } = usePlan();
  const [allPlans, setAllPlans] = useState<PlanData[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const plans = await getAllPlans();
      setAllPlans(plans);
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (allPlans.length > 0) {
      changePlanToTheSelected(allPlans[0].id!);
    }
  }, [allPlans]);

  const changePlanToTheSelected = async (inputPlanId: number) => {
    if (inputPlanId !== 0) {
      const selectedPlan: PlanData = await getPlan(inputPlanId);
      setPlan(selectedPlan);
    }
  };

  const getPlanOptions = () => {
    if (allPlans.length === 0) {
      return (
        <option value={0} key={0}>
          No Plans Available
        </option>
      );
    } else if (allPlans.length > 0) {
      return allPlans.map((plan) => (
        <option value={plan.id} key={plan.id!}>
          {plan.name} ({plan.weeks} weeks)
        </option>
      ));
    } else {
      return (
        <option value={0} key={0}>
          Something went wrong
        </option>
      );
    }
  };

  return (
    <div className="flex flex-row">
      <select
        className=" bg-slate-300 rounded-lg w-96 h-10 "
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          changePlanToTheSelected(parseInt(event.target.value));
        }}
      >
        {getPlanOptions()}
      </select>
    </div>
  );
};