import React from "react";
import { Footer, Sidebar, Breadcrumb } from "../components";
import { Routes, Route, Router } from "react-router-dom";
import { Dashboard } from "../pages";

const MainLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 overflow-y-auto">
          <Breadcrumb />
          <div className="2xl:container 2xl:mx-auto p-4">
            {/* // enter the New Route here */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
