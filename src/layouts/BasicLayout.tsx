import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function BasicLayout() {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex flex-col relative bg-slate-50 dark:bg-slate-800">
      <Sidebar />
      <div className="w-full h-[calc(100vh-56px)]">
        <Outlet />
      </div>
    </div>
  );
}
