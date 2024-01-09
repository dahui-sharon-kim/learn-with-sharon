import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function BasicLayout() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col relative bg-slate-50 dark:bg-slate-800">
      <Navbar />
      <div className="w-full h-[calc(100vh-56px)]">
        <Outlet />
      </div>
    </div>
  );
}
