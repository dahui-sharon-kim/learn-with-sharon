import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function BasicLayout() {
  return (
    <div className="w-[100vw] min-h-screen overflow-auto flex flex-col relative bg-gradient-to-tr from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="w-full flex flex-1 flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
}
