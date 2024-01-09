import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WIDTH = 10;
const HEIGHT = 5;
const PADDING = 1;
const CIRCLE_HEIGHT = HEIGHT - 2 * PADDING;
const LEFT_DARK_TEXT = `left-[calc(100%-${(CIRCLE_HEIGHT + PADDING) / 4}rem)]`;
const LEFT_LIGHT_TEXT = `left-${PADDING}`;

export default function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  });

  return (
    <nav className="w-full flex items-center justify-between h-14 sticky px-7 py-0 top-0 bg-slate-50 dark:bg-slate-800 dark:shadow-slate-500 bg-opacity-50 shadow">
      <button onClick={() => navigate("/main")}>
        <h1 className="font-semibold">Study with Sharon</h1>
      </button>
      <div
        style={{ width: `${WIDTH / 4}rem`, height: `${HEIGHT / 4}rem` }}
        className="rounded-full bg-yellow-400 dark:bg-blue-500 dark:bg-opacity-50 relative hover:cursor-pointer"
        onClick={() => setDarkMode(!darkMode)}
      >
        <div
          style={{
            width: `${(HEIGHT - 2 * PADDING) / 4}rem`,
            height: `${(HEIGHT - 2 * PADDING) / 4}rem`,
            left: darkMode ? `calc(100% - ${(CIRCLE_HEIGHT + PADDING) / 4}rem)` : `${PADDING / 4}rem`,
          }}
          className={`absolute rounded-full top-1 bg-white dark:bg-yellow-50 transition-all ${
            darkMode ? LEFT_DARK_TEXT : LEFT_LIGHT_TEXT
          }`}
        />
      </div>
    </nav>
  );
}
