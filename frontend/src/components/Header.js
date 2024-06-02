import React from 'react';
import "./header.css";
import {Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li><h1>Training Planner</h1></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/createPlan">Create Plan</Link></li>
      </ul>
    </nav>
  );
};

export default Header;