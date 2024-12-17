import React from "react";
import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <div className="">
      <Navbar />
      <div className="h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-[#F7FAFC] dark:bg-[#121212]">
          <div className="flex-1 overflow-y-auto">
            <Breadcrumb />
            {/* <div className="2xl:container 2xl:mx-auto p-4 border border-green-800"> */}
            <div className=" 2xl:mx-auto p-4 ">
              {/* // enter the New Route here */}
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
