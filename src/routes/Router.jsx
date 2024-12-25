import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";
import useSocketStore from "../store/socketStore";
import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
  Feednew,
  EngPermissionDashboard,
} from "../components";

const router = createBrowserRouter([
  <ToastContainer />,
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <Login />,
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
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "add-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "view-announcement",
        element: <ViewAnnouncements />,
      },

      {
        path: "engagement-feed",
        element: <Feednew />,
      },
      {
        path: "engagement-permission-dashboard",
        element: <EngPermissionDashboard />,
      },
      
    ],
  },
  {
    path: "*",
    element: <Page404 />, // Fallback for undefined routes
  },
  <Footer />,
]);

export default router;
