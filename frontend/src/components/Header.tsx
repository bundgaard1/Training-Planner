import React, { useEffect, useState } from "react";
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

  const HeaderButton = ({ title }: { title: string }) => {
    return (
      <div className="m-2 p-3 rounded-md items-center text-gray-300 font-black text- hover:bg-gray-600 hover:text-white">
        {title}
      </div>
    );
  };

  const MainNavLink = ({ to, title }: { to: string; title: string }) => {
    return (
      <Link to={to}>
        <HeaderButton title={title} />
      </Link>
    );
  };

  const LogoutButton = () => {
    return (
      <div onClick={handleLogout}>
        <HeaderButton title="Logout" />
      </div>
    );
  };

  const NavGroupHeader = ({ title }: { title: string }) => {
    return <div className="text-gray-300 ml-5 mt-5 ">{title}</div>;
  };

  const Profile = () => {
    if (isLoggedIn) {
      return (
        <div className="text-white">
          Logged in as {user.username}{" "}
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="text-white">
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      );
    }
  };

  const HorizontalLine = () => {
    return <div className="bg-gray-600 h-1 w-80"></div>;
  };

  const Logo = () => {
    return (
      <div className="Logo flex text-white justify-center items-center p-4 font-extrabold text-2xl ">
        <h1>Traning Planner</h1>
      </div>
    );
  };

  return (
    <div className="Header bg-gray-800 w-80 h-screen flex flex-col">
      <Logo />
      <HorizontalLine />
      <Profile />
      <MainNavLink to="/home" title="Home" />
      <NavGroupHeader title="Plans" />
      <MainNavLink to="/plans" title="Your Plans" />
      <MainNavLink to="/createPlan" title="Create Plan" />
      <HorizontalLine />
      <MainNavLink to="/" title="Preferences" />
      <LogoutButton />
    </div>
  );
};

export default Header;
