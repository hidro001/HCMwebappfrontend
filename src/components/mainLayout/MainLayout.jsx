import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Footer from "../footer/Footer"; // Import the Footer component
import { Outlet } from "react-router-dom";

const MainLayout = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Content Wrapper */}
        <div className="flex-1 overflow-y-auto">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* Outlet for Routing */}
          <div className="2xl:container 2xl:mx-auto p-4">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;