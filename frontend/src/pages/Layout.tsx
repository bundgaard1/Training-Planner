import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div
      className="layout"
      style={{ display: "flex", flexDirection: "row", height: "100vh" }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
