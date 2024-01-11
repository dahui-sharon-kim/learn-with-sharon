import React from "react";

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  title: React.ReactElement;
  children: React.ReactElement;
}
export default function Drawer({ openDrawer, setOpenDrawer, title, children }: DrawerProps) {
  return (
    <>
      <div
        className={`${
          openDrawer ? "w-3/4 md:w-2/3 max-w-xl" : "w-0 max-w-0 flex-grow-0 overflow-hidden"
        } fixed h-[100vh] z-[49] bg-white transition-all right-0 top-0 duration-300`}
      >
        <div className={`${openDrawer ? "flex" : "hidden"} flex-col gap-4`}>
          <div className="w-full h-14 px-6 flex items-center justify-between border-b-[1px] border-solid border-slate-200">
            {title}
            <button className="cursor-pointer hover:text-blue-500" onClick={() => setOpenDrawer(false)}>
              <p>닫기</p>
            </button>
          </div>
          <div className="w-full h-6 py-2 px-5">{children}</div>
        </div>
      </div>
      <div
        onClick={() => setOpenDrawer(false)}
        className={`${
          openDrawer ? "w-full opacity-30" : "w-0 max-w-0 opacity-20"
        } fixed z-[48] bg-black top-0 left-0 bottom-0 transition-colors duration-300`}
      />
    </>
  );
}
