import React, { useState } from "react";

const DayWorkoutTypes = {
  Rest: "Rest",
  GenAerobic: "GenAerobic",
  Workout: "Workout",
};

const WorkoutModal = (props) => {
  const [tempWorkout, setTempWorkout] = useState(props.tempWorkout);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const parsedValue =
      event.target.name === "distance" ? parseFloat(value) : value;
    setTempWorkout({
      ...tempWorkout,
      [name]: parsedValue,
    });
  };

  const handleSave = (event) => {
    props.setWorkout(tempWorkout);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    props.setIsModalOpen(false);
  };

  return (
    <div
      className="fullScreenModalLayer"
      onClick={(event) => {
        event.stopPropagation();
        props.setIsModalOpen(false);
      }}
    >
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modalHeader">
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
    </div>
  );
};

export default WorkoutModal;
