import React, { useEffect, useState } from "react";
import { usePlan } from "../../contexts/PlanContext";
import { updateWorkout } from "../../api/workoutAPI";
import Modal from "./WorkoutModal";
import Workout, { defaultWorkout } from "../../types/Workout";

interface DayboxProps {
	planDay: number;
}

const Daybox: React.FC<DayboxProps> = props => {
	const [workout, setWorkout] = useState<Workout>(defaultWorkout);
	const { plan, workoutsByDay, setWorkoutsByDay } = usePlan();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Date stuff
	const day = props.planDay;
	const dayDate = new Date(plan.startDate);
	dayDate.setDate(dayDate.getDate() + day - 1);
	const today = new Date();
	const isToday =
		dayDate.getDate() === today.getDate() &&
		dayDate.getMonth() === today.getMonth() &&
		dayDate.getFullYear() === today.getFullYear();

	// CharacterLimit base on width of the box
	const characterLimit = 50;

	useEffect(() => {
		if (workoutsByDay instanceof Map && workoutsByDay.has(day)) {
			setWorkout(workoutsByDay.get(day)!);
			setIsLoading(false);
		}
	}, [workoutsByDay]);

	async function saveUpdatedWorkout(newWorkout: Workout) {
		if (newWorkout.id === defaultWorkout.id) {
			return;
		}
		try {
			const updatedWorkout = await updateWorkout(newWorkout.id, newWorkout);
			const newWorkoutsByDay = new Map(workoutsByDay);
			newWorkoutsByDay.set(day, updatedWorkout);
			setWorkoutsByDay(newWorkoutsByDay);
		} catch (error) {
			console.error(error);
		}
	}

	const WorkoutContent = () => {
		return (
			<div className="dayboxContent">
				<h3 className="WorkoutType text-l font-bold text-center">
					{workout.workoutType}
				</h3>
				{workout.workoutType !== "Rest" && (
					<div className="distance text-center">{workout.distance} km</div>
				)}
				<div className="description text-center italic text-sm">
					{workout.description.length > characterLimit
						? workout.description.substring(0, characterLimit) + "..."
						: workout.description}
				</div>
			</div>
		);
	};

	const headerColor = isToday ? "bg-blue-400" : "bg-gray-300";

	const DayboxHeader = () => {
		return (
			<div
				className={`dayboxHeader flex justify-between border-black ${headerColor} pl-2`}
			>
				{dayDate.getDate()}{" "}
				{dayDate.getDate() === 1 && dayDate.toDateString().substring(4, 7)}
				{isToday && " (Today)"}
				{/* <p className="dayNum m-0 p-0">{day}</p> */}
				{workout && workout.isCompleted && (
					<div className="completedIcon">&#10003;</div>
				)}
			</div>
		);
	};

	const handleBoxClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		console.log(workout);
		setIsModalOpen(true);
	};

	if (isLoading) {
		return <td>Loading...</td>;
	}

	return (
		<td
			className="Daybox flex-1 flex flex-col p-0 border-collapse border-r border-black"
			onClick={handleBoxClick}
		>
			<DayboxHeader />
			<WorkoutContent />
			{isModalOpen && (
				<Modal
					tempWorkout={workout}
					saveUpdatedWorkout={saveUpdatedWorkout}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</td>
	);
};

export default Daybox;
