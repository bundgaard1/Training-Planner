import React, { useEffect, useState } from "react";
import "./DayBox.css";
import { usePlan } from "./PlanContext";
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

  useEffect(() => {
    if (workoutsByDay instanceof Map && workoutsByDay.has(day)) {
      setWorkout(workoutsByDay.get(day)!);
      setIsLoading(false);
    }
  }, [workoutsByDay, day]);

  useEffect(() => {
    const updatedWorkout = async () => {
      if (workout.id === defaultWorkout.id) {
        return;
      }
      try {
        const updatedWorkout = await updateWorkout(workout.id, workout);
        console.log(updatedWorkout);
      } catch (error) {
        console.error(error);
      }
    };

    updatedWorkout();

    setWorkoutsByDay({
      ...workoutsByDay,
      [day]: workout,
    });
  }, [workout]);

  const WorkoutContent = () => {
    const characterLimit = 20;
    return (
      <div className="dayboxContent">
        <h3>{workout.workoutType}</h3>
        {workout.workoutType !== "Rest" && (
          <div className="distance">
            <p>
              Distance: <b>{workout.distance} km</b>
            </p>
          </div>
        )}
        <div className="description">
          {workout.description.length > characterLimit
            ? workout.description.substring(0, characterLimit)+"..."
            : workout.description}
        </div>  
      </div>
    );
  };

  const DayboxHeader = () => {
    return (
      <div className="dayboxHeaderContainer">
        <p className="dayboxHeader">{day}</p>
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
    <div className="daybox" onClick={handleBoxClick}>
      <DayboxHeader />
      <WorkoutContent />
      {isModalOpen && (
        <Modal
          tempWorkout={workout}
          setWorkout={setWorkout}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};



export default Daybox;
