import React, { useState } from "react";
import Workout from "../types/Workout";

const DayWorkoutTypes = {
  Rest: "Rest",
  GenAerobic: "General Aerobic",
  Workout: "Workout",
  LongRun: "LongRun",
  Race: "Race",
};

interface WorkoutModalProps {
  tempWorkout: Workout;
  saveUpdatedWorkout: (workout: Workout) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const WorkoutModal: React.FC<WorkoutModalProps> = (props) => {
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

  return (
    <div
      className="FullScreenModalLayer fixed w-full h-full z-10 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-45"
      onClick={(event) => {
        event.stopPropagation();
        props.setIsModalOpen(false);
      }}
    >
      <div
        className="Modal fixed w-96 h-96 z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-300"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ModalHeader bg-zinc-500">
          <h2>Day {tempWorkout.day}</h2>
        </div>
        <div className="workoutType">
          Workout Type:
          <select
            name="workoutType"
            value={tempWorkout.workoutType}
            onChange={handleFormChange}
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
            onChange={handleFormChange}
          />
          km
        </div>

        <div className="descriptionInput">
          Description :
          <textarea
            name="description"
            value={tempWorkout.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="isCompletedInput">
          Completed :
          <input
            name="isCompleted"
            type="checkbox"
            onChange={handleFormChange}
            checked={tempWorkout.isCompleted}
          />
        </div>
        <div className="modalFooter">
          <button
            onClick={(e) => {
              handleSave();
              closeModal(e);
            }}
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
