import React, { useState } from "react";
import Workout from "../../types/Workout";
import { WorkoutTypes, defaultWorkout } from "../../types/Workout";
import Modal from "../Modal";

// Extend the WorkoutOptionRowProps interface
interface WorkoutOptionRowProps {
	title: string;
	value: string | number | boolean;
	type: "text" | "number" | "select" | "checkbox";
	name: string;
	unit?: string; // Default value
	selectOptions?: { [key: string]: string }; // For select type
	onChange: (event: React.ChangeEvent<any>) => void;
}

// Modify the WorkoutOptionRow component
const WorkoutOptionRow = (props: WorkoutOptionRowProps) => {
	const { title, value, type, name, unit, selectOptions, onChange } = props;

	return (
		<div className="workoutOptionRow m-1 flex flex-row">
			<div className="OptionColumn w-28">
				<label className="optionTitle float-right mr-1">{title}</label>
			</div>
			<div className="OptionColumn w-52">
				{type === "select" && selectOptions ? (
					<select
						className="selectInput w-full rounded-md"
						name={name}
						value={value as string}
						onChange={onChange}
					>
						{Object.entries(selectOptions).map(([key, val], index) => (
							<option key={index} value={val}>
								{key}
							</option>
						))}
					</select>
				) : (
					<input
						className="textInput w-full text-center rounded-md "
						name={name}
						type={type}
						value={value as string | number}
						onChange={onChange}
					/>
				)}
			</div>
			<div className="OptionColumn flex-1">
				<label className="ml-1 text-sm">{unit}</label>
			</div>
		</div>
	);
};

const Description = (props: {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
	const { value, onChange } = props;

	return (
		<div className="DescriptionRow flex flex-col m-2 mt-5">
			<div className="descriptionTitle font-bold">Description</div>
			<div className=" ">
				<textarea
					className="descriptionInput rounded-md w-full min-h-20 text-slate-600 appearance-none rounded px-3.5 py-2.5"
					name="description"
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	);
};
interface WorkoutModalProps {
	tempWorkout: Workout;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	saveUpdatedWorkout: (newWorkout: Workout) => void;
}

// Update the parent component to use WorkoutOptionRow
const WorkoutModal: React.FC<WorkoutModalProps> = props => {
	const [tempWorkout, setTempWorkout] = useState(props.tempWorkout);

	const handleFormChange = (
		event: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		const { name, value, type } = event.target;
		let parsedValue;

		switch (type) {
			case "number":
				parsedValue = parseFloat(value);
				if (isNaN(parsedValue)) {
					parsedValue = ""; // or a default numeric value, e.g., 0
				}
				break;
			case "checkbox":
				parsedValue = (event.target as HTMLInputElement).checked;
				break;
			default:
				parsedValue = value;
		}

		setTempWorkout({
			...tempWorkout,
			[name]: parsedValue,
		});
	};

	const handleSave = () => {
		props.saveUpdatedWorkout(tempWorkout);
	};

	const closeModal = (event: React.MouseEvent) => {
		event.stopPropagation();
		props.setIsModalOpen(false);
	};

	const resetWorkout = () => {
		setTempWorkout({
			...tempWorkout,
			workoutType: defaultWorkout.workoutType,
			distance: defaultWorkout.distance,
			duration: defaultWorkout.duration,
			avgPace: defaultWorkout.avgPace,
			description: defaultWorkout.description,
			isCompleted: defaultWorkout.isCompleted,
		});
	};

	const ModalHeader = () => {
		return (
			<div className="ModalHeader p-4 border-b-2 border-gray-600">
				<h1 className="font-bold text-lg">Day {tempWorkout.day}</h1>
			</div>
		);
	};

	const ModalFooter = () => {
		return (
			<div className="modalFooter flex flex-row p-3 border-t-2 border-gray-600">
				<div className="flex flex-grow"></div>
				<button
					className="ResetButton text-red-500 p-1 rounded-lg mr-2"
					onClick={e => {
						resetWorkout();
					}}
				>
					Reset
				</button>
				<button
					className="CloseButton text-blue-500 p-1 rounded-lg mr-2"
					onClick={closeModal}
				>
					Close
				</button>
				<button
					className="SaveCloseButton bg-blue-500 text-white p-1 rounded-lg mr-2"
					onClick={e => {
						handleSave();
						closeModal(e);
					}}
				>
					Save & Close
				</button>
			</div>
		);
	};

	return (
		<Modal setIsModalOpen={props.setIsModalOpen}>
			<ModalHeader />
			<div className="ModelContent flex-grow mt-2">
				<WorkoutOptionRow
					title="Workout Type"
					name="workoutType"
					type="select"
					value={tempWorkout.workoutType}
					selectOptions={WorkoutTypes}
					onChange={handleFormChange}
				/>
				<WorkoutOptionRow
					title="Distance"
					name="distance"
					type="number"
					value={tempWorkout.distance}
					unit="km"
					onChange={handleFormChange}
				/>
				<WorkoutOptionRow
					title="Duration"
					name="duration"
					type="number"
					value={tempWorkout.duration}
					unit="min"
					onChange={handleFormChange}
				/>
				<WorkoutOptionRow
					title="Average Pace"
					name="avgPace"
					type="number"
					value={tempWorkout.avgPace}
					unit="min/km"
					onChange={handleFormChange}
				/>
			</div>
			<Description
				value={tempWorkout.description}
				onChange={handleFormChange}
			/>
			<ModalFooter />
		</Modal>
	);
};

export default WorkoutModal;
