import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function BasicLayout() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col relative bg-gradient-to-tr from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="w-full h-[calc(100vh-56px)] flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
}
