import React, { useEffect, useState } from "react";
import "./DayBox.css";
import { usePlan } from "./PlanContext";
import { updateWorkout } from "../api/workoutAPI";
import Modal from "./WorkoutModal";

const Daybox = (props) => {
  const [workout, setWorkout] = useState(null);
  const { plan, setPlan, workoutsByDay, setWorkoutsByDay } = usePlan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workoutsByDay[props.day]) {
      setWorkout(workoutsByDay[props.day]);
      setIsLoading(false);
    }
  }, [workoutsByDay]);

  useEffect(() => {
    const updatedWorkout = async () => {
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
      [props.day]: workout,
    });
  }, [workout]);

  const WorkoutContent = () => {
    return (
      <div>
        <h3>{workout.workoutType}</h3>
        {workout.workoutType !== "Rest" && (
          <div className="distance">
            <p>
              Distance: <b>{workout.distance} km</b>
            </p>
          </div>
        )}
        <div className="description">{workout.description}</div>
      </div>
    );
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
    console.log(workout);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="daybox" onClick={handleBoxClick}>
      <div className="dayboxHeaderContainer">
        <p className="dayboxHeader">{props.day}</p>
      </div>
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
