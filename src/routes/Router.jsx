import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, } from "../pages";
import { Navbar, MainLayout } from "../components";

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
        // {/* <Dashboard /> */}
      // {/* </AppLayout> */}
    ),
  },
]);

export default router;
