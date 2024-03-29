import { Navigate, createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";
import Main from "./pages/main";
import Topics from "./pages/topics";
import Homework from "./pages/homework";
import Admin from "./pages/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { element: <Navigate to="main" />, index: true },
      { path: "main", element: <Main /> },
      { path: "topics", element: <Topics /> },
      { path: "homework", element: <Homework /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);

export default router;
