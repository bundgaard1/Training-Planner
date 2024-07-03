import React, { useEffect, useState } from "react";
import { usePlan } from "../contexts/PlanContext";
import { updateWorkout } from "../api/workoutAPI";
import Modal from "./WorkoutModal";
import Workout, { defaultWorkout } from "../types/Workout";

interface DayboxProps {
  day: number;
}

const Daybox: React.FC<DayboxProps> = (props) => {
  const [workout, setWorkout] = useState<Workout>(defaultWorkout);
  const { workoutsByDay, setWorkoutsByDay } = usePlan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const day = props.day;
  const date = new Date

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
    
    
  };

  const WorkoutContent = () => {
    const characterLimit = 20;
    return (
      <div className="dayboxContent ">
        <h3 className="WorkoutType text-l font-bold">{workout.workoutType}</h3>
        {workout.workoutType !== "Rest" && (
          <div className="distance">
            <p>
              Distance: <b>{workout.distance} km</b>
            </p>
          </div>
        )}
        <div className="description">
          {workout.description.length > characterLimit
            ? workout.description.substring(0, characterLimit) + "..."
            : workout.description}
        </div>
      </div>
    );
  };

  const DayboxHeader = () => {
    return (
      <div className="dayboxHeader flex justify-between">
        <p className="dayNum m-1 p-0">{day}</p>
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
    return <div>Loading...</div>;
  }

  return (
    <td className="Daybox flex-1 flex flex-col border-collapse border border-black" onClick={handleBoxClick}>
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
