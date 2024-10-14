import React, { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../../api/planAPI";
import Plan from "types/Plan";
import { calculateEndDate } from "../../utils/planUtils";

export function CreateNewPlan() {
	const [form, setForm] = useState<Plan>({
		weeks: 0,
		name: "",
		startDate: "",
	});
	const [alertText, setAlertText] = useState("");
	const navigate = useNavigate();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const onSubmit = () => {
		if (!form.name || !form.weeks || !form.startDate) {
			setAlertText("Please fill in all fields");
			return;
		}
		if (form.weeks < 1 || form.weeks > 32) {
			setAlertText("Weeks must be between 1 and 32");
			return;
		}

		const startDay = new Date(form.startDate).getDay();
		if (startDay !== 1) {
			setAlertText("Start date must be a Monday");
			return;
		}

		createPlan(form).then(data => {
			console.log(data);
			setAlertText("Plan created successfully");
		});
	};

	return (
		<div className="form flex flex-col p-8 h-full justify-center items-center">
			<h1 className="text-xl font-bold mb-4 text-center">Create a new Plan</h1>
			<div className="form-group mb-4">
				<label className="block text-gray-700">Name:</label>
				<input
					className="form-input mt-1 block w-full  "
					onChange={onChange}
					type="text"
					name="name"
				/>
			</div>
			<div className="form-group mb-4">
				<label className="block text-gray-700">Weeks:</label>
				<input
					className="form-input mt-1 block w-full "
					onChange={onChange}
					type="number"
					name="weeks"
				/>
			</div>
			<div className="form-group mb-4">
				<label className="block text-gray-700">Starting Date:</label>
				<input
					className="form-input mt-1 block w-full  "
					onChange={onChange}
					type="date"
					name="startDate"
				/>
			</div>
			<div className="form-group mb-4">
				<label className="text-gray-700">Ending Date: </label>
				<span>{calculateEndDate(form.startDate, form.weeks)}</span>
			</div>
			<button
				onClick={onSubmit}
				type="submit"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Create Plan
			</button>
			<p>{alertText}</p>
		</div>
	);
}
