import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="layout flex flex-row h-screen w-screen bg-gray-100">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
