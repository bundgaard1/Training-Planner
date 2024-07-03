import React, { useState } from "react";
import { PlanProvider } from "../contexts/PlanContext";
import { PlanCalender} from "../components/PlanCalendar";
import {PlanSelector} from "../components/PlanSelector";
import { PlanAnalytics } from "../components/PlanAnalytics";

import { usePlan } from "../contexts/PlanContext";

type viewMode = "Calendar" | "Analytics";

export function PlansPage() {
  const [mode, setMode] = useState<viewMode>("Calendar");

  const PlanHeader = () => {
    const { plan } = usePlan();
    return (
      <div className="plan-header w-full bg-gray-300 rounded-3xl p-4 my-3 flex justify-center  ">
        <h1 className="text-3xl">{plan.name}</h1>
      </div>
    );
  };

  const ModeSelector = () => {
    return (
      <div className="flex flex-row justify-center">
        <ModeSelectorButton mode="Calendar" />
        <ModeSelectorButton mode="Analytics" />
      </div>
    );
  };
  const ModeSelectorButton = (props: { mode: viewMode }) => (
    <button
      className={`m-2 p-2 border border-black ${
        mode === props.mode ? "bg-gray-500" : ""
      }`}
      onClick={() => setMode(props.mode)}
    >
      {props.mode}
    </button>
  );

  const ModeContent = () => {
    if (mode === "Calendar") {
      return <PlanCalender />;
    } else {
      return <PlanAnalytics />;
    }
  };

  return (
    <div className="PlansPage flex flex-1 flex-col m-4 ">
      <PlanProvider>
        <PlanSelector />
        <PlanHeader />
        <ModeSelector />
        <ModeContent />
      </PlanProvider>
    </div>
  );
}

export default PlansPage;
