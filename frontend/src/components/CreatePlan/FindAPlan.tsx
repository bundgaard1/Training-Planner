import { useEffect, useState } from "react";
import { calculateEndDate } from "../../utils/planUtils";
import PremadePlan from "../../types/PremadePlan";
import { getPremadePlans } from "../../api/PremadePlanAPI";

import { createPlanBasedOnPremade } from "../../api/PremadePlanAPI";

const PlanBox = (plan: PremadePlan) => {
	const [selected, setSelected] = useState(false);

	function CreateDropdown() {
		const [form, setForm] = useState({
			startDate: "",
		});

		const [alertText, setAlertText] = useState("");

		const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setForm({
				...form,
				[e.target.name]: e.target.value,
			});
		};

		const onSubmit = () => {
			const startDay = new Date(form.startDate).getDay();
			if (startDay !== 1) {
				setAlertText("Start date must be a Monday");
				return;
			}

			createPlanBasedOnPremade(plan.id, form.startDate).then(data => {
				console.log(data);
				setAlertText("Plan created successfully");
			});
		};

		return (
			<div className="flex flex-row mt-4 bg-gray-400 p-4">
				<div className="form-group mr-3">
					<label className="block text-gray-700">Starting Date:</label>
					<input
						className="form-input mt-1 block w-full  "
						onChange={onChange}
						type="date"
						name="startDate"
					/>
				</div>

				<div className="form-group flex-col">
					<label className="text-gray-700">Ending Date: </label>
					<span>{calculateEndDate(form.startDate, plan.weeks)}</span>
				</div>

				<button
					className="ml-auto bg-green-500 rounded px-3"
					onClick={onSubmit}
				>
					Create
				</button>
				<div>{alertText}</div>
			</div>
		);
	}

	return (
		<div
			key={plan.id}
			className="flex flex-col p-4 border border-gray-300 mb-4 bg-gray-300"
		>
			<div className="flex flex-row ">
				<h2 className="text-lg font-bold w-40">{plan.name}</h2>
				<div className="flex flex-col">
					<p className="text-sm">{plan.level}</p>
					<p className="text-sm">{plan.weeks} weeks</p>
					<p className="text-sm">
						{plan.kmsLow} - {plan.kmsHigh} km per week
					</p>
				</div>

				<button
					className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() => setSelected(!selected)}
				>
					{selected ? "Deselect" : "Select"}
				</button>
			</div>
			{selected && <CreateDropdown />}
		</div>
	);
};

export function FindAPlan() {
	const [plans, setPlans] = useState<PremadePlan[]>([]);

	useEffect(() => {
		getPremadePlans().then(plans => setPlans(plans));
	}, []);

	const PlanList = () => {
		return (
			<>
				<div className="flex flex-col">{plans.map(plan => PlanBox(plan))}</div>
			</>
		);
	};

	return (
		<div className="flex flex-col p-8">
			<h1 className="text-xl font-bold mb-4 text-center">Find a plan</h1>
			<PlanList />
		</div>
	);
}
