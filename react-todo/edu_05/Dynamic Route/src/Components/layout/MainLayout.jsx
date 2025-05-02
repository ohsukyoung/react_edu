import { Outlet } from "react-router-dom";
import HeaderNav from "./HeaderNav";

const MainLayout = () => {
  return (
    <div className="main-container">
      <HeaderNav />
      <Outlet />
    </div>
  );
};
export default MainLayout;
