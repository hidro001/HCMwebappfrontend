import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404, } from "../pages";
import MainLayout from "./MainLayout";
import useSocketStore from "../store/socketStore";

import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
  Feednew,
  EngPermissionDashboard,
  TicketsPage,
  AllTickets,
  EmployessIssue
} from "../components";

const router = createBrowserRouter([

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
      {
        path: "manage-tickets",
        element: <TicketsPage />,
      },
      {
        path: "all-tickets",
        element: <AllTickets />,
      },
      {
        path: "raise-ticket",
        element: <EmployessIssue />,
      },
  
    ],
  },
  {
    path: "*",
    element: <Page404 />, // Fallback for undefined routes
  },
  // <Footer />,
]);

export default router;
