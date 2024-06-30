import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { logoutUser, loginUser, getUser } from "../api/userAPI";

const Header = () => {
  const [user, setUser] = useState({} as any);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") !== null
  );

  useEffect(() => {
    const getProfile = async () => {
      const user = await getUser();
      if (user) {
        setUser(user);
      }
    };
    if (isLoggedIn) {
      getProfile();
    }
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const MainNavLink = ({ to, title }: { to: string; title: string }) => {
    return (
      <Link to={to} className="nav-link">
        <div className="main-nav-link" style={{ height: "38px" }}>
          {title}
        </div>
      </Link>
    );
  };

  const NavGroupHeader = ({ title }: { title: string }) => {
    return <div className="nav-group-header">{title}</div>;
  };

  const HorizonalLine = () => {
    return (
      <div>
        <div className="horizontal-line"></div>
        <div style={{ height: "2px" }}></div>
      </div>
    );
  };

  const Profile = () => {
    if (isLoggedIn) {
      return (
        <div className="profile">
          Logged in as {user.username}{" "}
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="profile">
          <Link className="link" to="/login">Login</Link>
        </div>
      );
    }
  };

  return (
    <div className="header">
      <div className="header-logo">
        <h1>Traning Planner</h1>
      </div>
      <Profile />
      <MainNavLink to="/home" title="Home" />
      <NavGroupHeader title="Plans" />
      <MainNavLink to="/plans" title="Your Plans" />
      <MainNavLink to="/createPlan" title="Create Plan" />
    </div>
  );
};

export default Header;
