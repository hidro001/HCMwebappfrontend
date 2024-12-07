import { createBrowserRouter } from "react-router-dom";
import Login from "./Component/Auth/Login";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import Sidebar from "./Component/Admin/Sidebar";
import Navbar from "./Component/Admin/Navbar";
import Dashboard from "./Component/Admin/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BreadCrumb from "./Component/Admin/BreadCrumb";
import Hello from "./Component/Admin/Hello";
import RACI2 from "./Component/Admin/RACI2";
import CompanySettings from "./Component/superAdmin/CompanySettings";
import PolicySystemSuper from "./Component/superAdmin/PolicySystemSuper";
import ForgotPassword from "./Component/Auth/ForgotPassword";
import ResetPassword from "./Component/Auth/ResetPassword";
import SetPassword from "./Component/Admin/components/SetPassword";
import Footer from "./Component/Footer";
import Footer2 from "./Component/Footer2";

const AppLayout = ({ children }) => (
  <>
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>

      <div className="col-10" style={{ marginLeft: "260px" }}>
        <main>
          <div className="main">
            <div className="ems-content">
              <div className="container">
                <Navbar />
                <BreadCrumb />
                <div>{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:resetToken",
    element: <ResetPassword />,
  },
  {
    path: "/set-password/:token",
    element: <SetPassword />,
  },

  {
    path: "/admin-dashboard",
    element: (
      <AppLayout>
        <AdminDashboard />
      </AppLayout>
    ),
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [
      {
        path: "*",
        element: (
          <AppLayout>
            <Dashboard />
          </AppLayout>
        ),
      },
    ],
  },
]);

export default router;
