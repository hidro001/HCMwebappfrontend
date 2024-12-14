import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
        <MainLayout />
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // add more
    ],
  },
  {
    path: "*",
    element: <Page404/>, // Fallback for undefined routes
  },
]);

export default router;
