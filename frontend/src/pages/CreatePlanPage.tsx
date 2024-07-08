import React, { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../api/planAPI";
import PlanData from "../types/PlanData";

export function CreatePlanPage() {
  const [form, setForm] = useState<PlanData>({
    weeks: 0,
    name: "",
    startDate: "",
  });
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const calculateEndDate = () => {
    if (!form.startDate || form.weeks <= 0) return "-";
    const endDate = new Date(form.startDate);
    endDate.setDate(endDate.getDate() + form.weeks * 7);
    return `${endDate.getDate()}/${
      endDate.getMonth() + 1
    }/${endDate.getFullYear()}`;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    if (!form.name || !form.weeks || !form.startDate) {
      setText("Please fill in all fields");
      return;
    }
    if (form.weeks < 1 || form.weeks > 32) {
      setText("Weeks must be between 1 and 32");
      return;
    }

    const startDay = new Date(form.startDate).getDay();
    if (startDay !== 1) {
      setText("Start date must be a Monday");
      return;
    }

    createPlan(form).then((data) => {
      console.log(data);
      setText("Plan created successfully");
      navigate("/plans");
    });
  };

  return (
    <div className="container flex flex-1 justify-center items-start m-4 ">
      <div className="form flex flex-col bg-gray-300 p-4 rounded-3xl mt-40">
        <h1 className="text-xl font-bold mb-4">Create Plan</h1>
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
          <input onChange={onChange} type="number" name="weeks" />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700">Starting Date:</label>
          <input className="form-input mt-1 block w-full  "onChange={onChange} type="date" name="startDate" />
        </div>
        <div className="form-group mb-4">
          <label className="text-gray-700">Ending Date: </label>
          <span>{calculateEndDate()}</span>
        </div>
        <button onClick={onSubmit} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
          Create Plan
        </button>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CreatePlanPage;
