import React, { useEffect, useState } from "react";
import "./DayBox.css";
import { usePlan } from "./PlanContext";
import { updateWorkout } from "../api/workoutAPI";

const DayWorkoutTypes = {
  Rest: "Rest",
  GenAerobic: "GenAerobic",
  Workout: "Workout",
};

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

  const Modal = () => {
    const [tempWorkout, setTempWorkout] = useState(workout);

    const handleChange = (event) => {
      const { name, value } = event.target;
      const parsedValue =
        event.target.name === "distance"
          ? parseFloat(event.target.value)
          : event.target.value;
      setTempWorkout({
        ...tempWorkout,
        [name]: parsedValue,
      });
    };

    const handleSave = (event) => {
      setWorkout(tempWorkout);
    };

    const closeModal = (event) => {
      event.stopPropagation();
      setIsModalOpen(false);
    };

    return (
      <div className="modal">
        <div className="modalHeader">
          <h2>Day {props.day}</h2>
        </div>
        <div className="workoutType">
          Workout Type:
          <select
            name="workoutType"
            value={tempWorkout.workoutType}
            onChange={handleChange}
          >
            {Object.entries(DayWorkoutTypes).map(([type, value], index) => {
              return (
                <option key={index} value={value}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>

        <div className="distanceInput">
          Distance :
          <input
            name="distance"
            type="number"
            value={tempWorkout.distance}
            onChange={handleChange}
          />
          km
        </div>

        <div className="descriptionInput">
          Description :
          <textarea
            name="description"
            value={tempWorkout.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="modalFooter">
          <button
            onClick={(e) => {
              handleSave(e);
              closeModal(e);
            }}
          >
            Save & Close
          </button>
        </div>
      </div>
    );
  };

  const DayboxContent = () => {
    const RestContent = () => {
      return (
        <div>
          <h3>Rest</h3>
          <div className="description">{workout.description}</div>
        </div>
      );
    };

    const GenAerobicContent = () => {
      return (
        <div>
          <h3>General Aerobic</h3>
          <div className="distance">
            <p>
              Distance: <b>{workout.distance} km</b>
            </p>
          </div>
          <div className="description">{workout.description}</div>
        </div>
      );
    };

    const WorkoutContent = () => {
      return (
        <div>
          <h3>Workout</h3>
          <div className="distance">Distance: {workout.distance} km</div>
          <div className="description">{workout.description}</div>
        </div>
      );
    };

    const ContentMap = {
      Rest: <RestContent />,
      GenAerobic: <GenAerobicContent />,
      Workout: <WorkoutContent />,
    };

    // return the correct content based on the workout type
    return ContentMap[workout.workoutType];
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
      <div className="dayboxContent">
        <DayboxContent />
      </div>
      {isModalOpen && (
        <div
          className="fullScreenModalLayer"
          onClick={(event) => {
            event.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <Modal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Daybox;
