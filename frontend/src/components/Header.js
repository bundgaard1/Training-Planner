import React, {useState} from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/userAPI";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn ]= useState(localStorage.getItem("authToken") !== null);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    window.location.reload();
  }

  return (
    <nav>
      <ul>
        <li>
          <h1>Training Planner</h1>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/createPlan">Create Plan</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isLoggedIn ? (
          <li>You are logged in</li>
        ) : (
          <li>You are not logged in</li>
        )}
        {isLoggedIn ? (
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li> ) : null}
      </ul>
    </nav>
  );
};

export default Header;
