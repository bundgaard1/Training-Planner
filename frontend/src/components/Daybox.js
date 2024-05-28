import React, { useState } from "react";
import "./DayBox.css";

const DayWorkoutTypes = {
  Rest: 0,
  GenAerobic: 1,
  Workout: 2,
};

const Daybox = (props) => {
  const [workoutType, setWorkoutType] = useState(DayWorkoutTypes.Rest);
  const [distance, setDistance] = useState(0);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = () => {
    const [tempWorkoutType, setTempWorkoutType] = useState(workoutType);
    const [tempDistance, setTempDistance] = useState(distance);
    const [tempDescription, setTempDescription] = useState(description);

    const handleSave = (event) => {
      setDistance(tempDistance);
      setWorkoutType(tempWorkoutType);
      setDescription(tempDescription);
      if (tempWorkoutType !== DayWorkoutTypes.Rest) {
        props.onDistanceChange(props.day, tempDistance);
      } else {
        props.onDistanceChange(props.day, 0);
      }
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
            value={tempWorkoutType}
            onChange={(e) => setTempWorkoutType(e.target.value)}
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
            type="number"
            value={tempDistance}
            onChange={(e) => setTempDistance(e.target.value)}
          />
          km
        </div>

        <div className="descriptionInput">
          Description :
          <textarea
            type="text"
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="modalFooter">
          <button onClick={closeModal}>Close</button>
          <button onClick={handleSave}>Save</button>
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
          <div className="description">{description}</div>
        </div>
      );
    };

    const GenAerobicContent = () => {
      return (
        <div>
          <h3>General Aerobic</h3>
          <div className="distance">Distance: {distance} km</div>
          <div className="description">{description}</div>
        </div>
      );
    };

    const WorkoutContent = () => {
      return (
        <div>
          <h3>Workout</h3>
          <div className="distance">Distance: {distance} km</div>
          <div className="description">{description}</div>
        </div>
      );
    };

    // return the correct content based on the workout type

    switch (Number(workoutType)) {
      case DayWorkoutTypes.Rest:
        return <RestContent />;
      case DayWorkoutTypes.GenAerobic:
        return <GenAerobicContent />;
      case DayWorkoutTypes.Workout:
        return <WorkoutContent />;
      default:
        return <div></div>;
    }
  };

  const handleBoxClick = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

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
