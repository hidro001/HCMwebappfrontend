import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";
import { Footer, ResetPassword } from "../components";

const router = createBrowserRouter([
  <ToastContainer />,
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword/>
  },
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
  <Footer/>
]);

export default router;
