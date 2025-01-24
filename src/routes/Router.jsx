import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import {
  Login,
  Dashboard,
  Page404,
  AddEmployeePage,
  UpdateEmployeePage,
  ViewEmployeePage,
  SubordinatesEmployessPage,
  AssignAssetsPage,
  AllEmployessPage,
  ManageTicketsPage,
  RaiseTicketsPage,
  AllTicketsPage,
  FilePoshPage,
  PoshManagePage,
  FeedPage,
  EngPermissionDashboardPage,
  EmployessMainPage,
  AttendanceDashboardPage
} from "../pages";
import MainLayout from "./MainLayout";
import useSocketStore from "../store/socketStore";

import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
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
        element: <FeedPage />,
      },
      {
        path: "engagement-permission-dashboard",
        element: <EngPermissionDashboardPage />,
      },
      {
        path: "manage-tickets",
        element: <ManageTicketsPage />,
      },
      {
        path: "all-tickets",
        element: <AllTicketsPage />,
      },
      {
        path: "raise-ticket",
        element: <RaiseTicketsPage />,
      },
      {
        path: "posh-manage",
        element: <PoshManagePage />,
      },
      {
        path: "File-Posh",
        element: <FilePoshPage />,
      },
      {
        path: "employees/management",
        element: <EmployessMainPage />,
      },
      {
        path: "add-employee",
        element: <AddEmployeePage />,
      },
      {
        path: "supordinates-employees",
        element: <SubordinatesEmployessPage />,
      },
      {
        path: "update-employee/:id",
        element: <UpdateEmployeePage />,
      },
      {
        path: "employees/details/:id",
        element: <ViewEmployeePage />,
      },
      {
        path: "assign-assets",
        element: <AssignAssetsPage />,
      },
      {
        path: "all-employess",
        element: <AllEmployessPage />,
      },
      {
        path: "attendance-dashboard",
        element: <AttendanceDashboardPage />,
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
