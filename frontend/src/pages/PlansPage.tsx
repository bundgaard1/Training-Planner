import React, { useState } from "react";
import { PlanProvider } from "../contexts/PlanContext";
import { PlanCalender } from "../components/Calendar/PlanCalendar";
import { PlanSelector } from "../components/PlanSelector";
import { PlanAnalytics } from "../components/Analytics/PlanAnalytics";
import { usePlan } from "../contexts/PlanContext";
import { planPeriod } from "../utils/planUtils";

type viewMode = "Calendar" | "Analytics";

export function PlansPage() {
	const [mode, setMode] = useState<viewMode>("Calendar");
	const [selectPlan, setSelectPlan] = useState<boolean>(false);

	const PlanHeader = () => {
		const { plan } = usePlan();

		return (
			<div className="plan-header w-full bg-gray-300 rounded-xl p-3 mb-3 flex flex-row">
				<div className="text-xl font-bold mr-10">{plan.name}</div>
				<div className="flex flex-row flex-grow">
					<div className="mr-10 self-center">{plan.weeks} weeks</div>
					<div className="mr-10 self-center">{planPeriod(plan)}</div>
				</div>
				<div
					className="bg-gray-400 p-1 rounded-lg place-self-end"
					onClick={() => {
						setSelectPlan(true);
					}}
				>
					Change Plan
				</div>
			</div>
		);
	};

	const ModeSelector = () => {
		return (
			<>
				<div className="modeButtons flex flex-row bg-gray-300 rounded-xl mb-2">
					<ModeSelectorButton mode="Calendar" />
					<ModeSelectorButton mode="Analytics" />
				</div>
			</>
		);
	};

	const ModeSelectorButton = (props: { mode: viewMode }) => {
		const bgColor = mode === props.mode ? "bg-gray-700" : "bg-gray-400";
		const textColor = mode === props.mode ? "text-white" : "text-black";
		return (
			<button
				className={`m-2 p-1 rounded-md flex-1 ${bgColor} ${textColor}`}
				onClick={() => setMode(props.mode)}
			>
				{props.mode}
			</button>
		);
	};

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
				{selectPlan && <PlanSelector setSelectPlan={setSelectPlan} />}
				<PlanHeader />
				<ModeSelector />
				<ModeContent />
			</PlanProvider>
		</div>
	);
}

export default PlansPage;
