import React, { useState, useEffect } from "react";
import { getAllPlans, getPlan } from "../api/planAPI";
import { usePlan } from "../contexts/PlanContext";
import Plan from "../types/Plan";
import Modal from "./Modal";
import { planPeriod } from "../utils/planUtils";

interface PlanSelectorProps {
	setSelectPlan: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlanSelector = (props: PlanSelectorProps) => {
	const { setPlan } = usePlan();
	const [allPlans, setAllPlans] = useState<Plan[]>([]);

	useEffect(() => {
		const fetchPlans = async () => {
			const plans = await getAllPlans();
			setAllPlans(plans);
		};

		fetchPlans();
	}, []);

	const changePlanToTheSelected = async (inputPlanId: number) => {
		if (inputPlanId !== 0) {
			const selectedPlan: Plan = await getPlan(inputPlanId);
			setPlan(selectedPlan);
			props.setSelectPlan(false);
		}
	};

	const ModalHeader = () => {
		return (
			<div className=" text-xl font-bold p-2 self-center">Select a Plan</div>
		);
	};

	const ModalContent = () => {
		return (
			<div className="flex-col flex-grow">
				{allPlans.map(plan => (
					<div
						key={plan.id}
						className="planSelectorItem bg-gray-300 rounded-xl p-4 mb-2 mx-2"
						onClick={() => changePlanToTheSelected(plan.id as number)}
					>
						<div className="text-xl font-bold">{plan.name}</div>
						<div>{plan.weeks} weeks</div>
						<div>{planPeriod(plan)}</div>
					</div>
				))}
			</div>
		);
	};

	const ModalFooter = () => {
		return (
			<div className="p-2 flex">
				<div
					className="bg-red-400 p-1 rounded-lg"
					onClick={() => {
						props.setSelectPlan(false);
					}}
				>
					Close
				</div>
			</div>
		);
	};

	return (
		<Modal setIsModalOpen={props.setSelectPlan}>
			<ModalHeader />
			<ModalContent />
			<ModalFooter />
		</Modal>
	);
};
