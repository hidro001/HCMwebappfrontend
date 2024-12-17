import React from "react";
import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <div className="h-auto">
      <Navbar />
      <div className="h-full flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col dark:bg-gray-600  bg-gray-100">
          <div className="flex-1 overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <Breadcrumb />
            <div className="2xl:container h-full 2xl:mx-auto p-4">
              {/* // enter the New Route here */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
