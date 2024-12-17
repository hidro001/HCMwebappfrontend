import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";
import { Footer, ResetPassword , NotificationsPage} from "../components";

const router = createBrowserRouter([
  <ToastContainer />,
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword/>
  },
  {
    path: "/",
    element: (<Login />),
  },
  {
    path: "/dashboard",
    element: (
      <MainLayout>
        <PrivateRoute />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
        // add
      },
      {
        path:"notifications",
        // element: <NotificationsPage />,
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
