// import React from "react";
// import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
// import { Outlet } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";

// const MainLayout = () => {
//   const theme = useTheme();
//   return (
//     <div className="h-auto overflow-y-auto hide-scrollbar w-full">
//       <Navbar />
//       <div className="h-full w-full flex ">
//         <Sidebar />
//         <div className="flex-1 h-screen flex flex-col bg-[#F7FAFC] dark:bg-[#121212]">
//           <div className="flex-1 h-screen 2xl:mx-auto overflow-y-auto w-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  [&::-webkit-scrollbar-track]:bg-gray-100  [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
//             <Breadcrumb />
//             <div className="container mx-auto w-full ">
//               <Outlet />
//             </div>
//           </div>
//             <Footer />  
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


// src/layouts/MainLayout.js
import React from "react";
import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <div className="h-auto overflow-y-auto hide-scrollbar w-full">
      <Navbar />
      <div className="h-full w-full flex ">
        <Sidebar />
        <div className="flex-1 h-screen flex flex-col bg-[#F7FAFC] dark:bg-[#121212]">
          {/* Assign an ID to the scrollable div */}
          <div
            id="scrollableDiv"
            className="flex-1 h-screen 2xl:mx-auto overflow-y-auto w-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <Breadcrumb />
            <div className="container mx-auto w-full">
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
