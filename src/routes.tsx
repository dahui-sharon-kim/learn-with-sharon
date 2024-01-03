import { Navigate, createBrowserRouter } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";
import Main from "./pages/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { element: <Navigate to="/main" />, index: true },
      { path: "main", element: <Main /> },
    ],
  },
]);

export default router;
