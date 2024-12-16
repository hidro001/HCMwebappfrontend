import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  <ToastContainer />,
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        ),
        // add
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />, // Fallback for undefined routes
  },
]);

export default router;
