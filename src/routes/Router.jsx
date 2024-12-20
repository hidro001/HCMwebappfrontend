import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Dashboard, Page404 } from "../pages";
import MainLayout from "./MainLayout";
import { ToastContainer } from "react-toastify";
import {
  Footer,
  ResetPassword,
  MakeAnnouncement,
  ViewAnnouncements,
  NotificationsPage,
  RoleManagement,
  PermissionManagement,
  UserModeration,
  EngageFeed,
  CreatePost
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
        path: "roles",
        element: <RoleManagement />,
      },
      {
        path: "permissions",
        element: <PermissionManagement />,
      },
      {
        path: "user-moderation",
        element: <UserModeration />,
      },
      {
        path: "engage-feed",
        element: <EngageFeed />,
      },
      {
        path: "create-post",
        element: <CreatePost/>,
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
