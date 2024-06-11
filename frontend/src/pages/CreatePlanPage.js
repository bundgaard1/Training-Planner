import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../api/planAPI";

export function CreatePlanPage() {
  const [form, setForm] = useState({ weeks: 0, name: "", date: "" });
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    if (!form.name || !form.weeks || !form.date) {
      setText("Please fill in all fields");
      return;
    }
    if (form.weeks < 1 || form.weeks > 32) {
      setText("Weeks must be between 1 and 32");
      return;
    }

    createPlan(form).then((data) => {
      console.log(data);
      setText("Plan created successfully");
      navigate("/");
    });

    
  };

  return (
    <div>
      <h1>Create Plan</h1>
      <label>
        Name:
        <input onChange={onChange} type="text" name="name" />
      </label>{" "}
      <br />
      <label>
        Weeks:
        <input onChange={onChange} type="number" name="weeks" />
      </label>{" "}
      <br />
      <label>
        Starting Date:
        <input onChange={onChange} type="date" name="date" />
      </label>{" "}
      <br />
      <button onClick={onSubmit} type="submit">
        Create Plan
      </button>{" "}
      <br />
      <p>{text}</p>
    </div>
  );
}

export default CreatePlanPage;
