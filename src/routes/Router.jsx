import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, } from "../pages";
import { Navbar } from "../components";
import MainLayout from "./MainLayout";

const AppLayout = () => (
  <div className="flex flex-col min-h-screen">
    <div className="flex flex-1 flex-col">
      <Navbar />
      <MainLayout />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (

      <AppLayout/>
    ),
  },
]);

export default router;
