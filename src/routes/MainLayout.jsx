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


// // src/layouts/MainLayout.js
// import React from "react";
// import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
// import { Outlet } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import SubMenu from "../components/sidebar/SubMenu";

// const MainLayout = () => {
//   const theme = useTheme();
//   return (
//     <div className="h-auto overflow-y-auto hide-scrollbar w-full">
//       <Navbar />
//       <div className="h-full w-full flex ">
//         <Sidebar />
//         <div className="flex-1 h-screen flex flex-col bg-gray-50 dark:bg-[#121212]  ">
//           {/* Assign an ID to the scrollable div */}
//           <div
//             id="scrollableDiv"
//             className="flex-1 h-screen 2xl:mx-auto overflow-y-auto w-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
//           >
//             <Breadcrumb />
//             {/* <div className="container mx-auto w-full"> */}
//             <div className="container mx-auto ">
//               <Outlet />
//             </div>
//           </div>
//           <Footer />  
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// import React, { useState } from "react";
// import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
// import { MdDarkMode, MdLightMode } from "react-icons/md";

// const MainLayout = () => {
//   const navigate = useNavigate();

//   // Track the item the user clicked in the Sidebar
//   const [activeSection, setActiveSection] = useState(null);
//   // Also track which tab within that section is active
//   const [activeTabLink, setActiveTabLink] = useState("");
//   // Dark mode toggle
//   const [darkMode, setDarkMode] = useState(false);

//   const handleSectionSelect = (menuItem) => {
//     setActiveSection(menuItem);
//     if (menuItem.options?.length) {
//       setActiveTabLink(menuItem.options[0].link);
//       navigate(`/dashboard/${menuItem.options[0].link}`);
//     }
//   };

//   const handleTabClick = (option) => {
//     setActiveTabLink(option.link);
//     navigate(`/dashboard/${option.link}`);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`${darkMode ? "dark" : ""} transition-colors duration-300`}>
//       {/* The entire layout is wrapped in a container that toggles .dark */}
//       <div className="h-auto w-full overflow-y-auto bg-gray-100 text-gray-800 dark:bg-[#101010] dark:text-gray-100">
//         {/* Top Navbar (optional) */}
//         <Navbar />
    

//         <div className="h-full w-full flex">
//           {/* Sidebar */}
//           <Sidebar
//             onSectionSelect={handleSectionSelect}
//             activeSectionName={activeSection?.name}
//           />

//           {/* Main Content */}
//           <div className="flex-1 h-screen flex flex-col">
//             {/* Top area: Breadcrumb + Horizontal Tabs */}
//             <div
//               id="scrollableDiv"
//               className={`
//                 flex-1 h-screen overflow-y-auto w-full
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                 transition-colors duration-300
//               `}
//             >
//               {/* Breadcrumb */}
//               <Breadcrumb />

//               {/* Horizontal Tabs for active section */}
//               {activeSection && activeSection.options && (
//                 <div
//                   className={`
//                     relative flex items-center px-2 py-2
//                     bg-gray-200 dark:bg-[#1a1a1a]/60
//                     border-b border-gray-300 dark:border-gray-700
//                     backdrop-blur-sm
//                   `}
//                 >
//                   {activeSection.options.map((option, idx) => {
//                     const isActive =
//                       `/dashboard/${option.link}` === `/dashboard/${activeTabLink}`;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() => handleTabClick(option)}
//                         className={`
//                           relative px-4 py-2 mx-1 text-sm font-semibold
//                           transition-colors duration-300
//                           rounded-lg
//                           ${
//                             isActive
//                               ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500"
//                               : "text-gray-600 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300"
//                           }
//                         `}
//                       >
//                         {option.name}
//                         {isActive && (
//                           <span
//                             className={`
//                               absolute left-0 bottom-0 w-full h-[2px]
//                               bg-gradient-to-r from-cyan-400 to-blue-500
//                               animate-pulse
//                             `}
//                           ></span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Render the actual page content */}
//               <div className="container mx-auto px-4 py-6">
//                 <Outlet />
//               </div>
//             </div>
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// src/layouts/MainLayout.js

import React, { useState } from "react";
import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

// Import the same menu config
import { menuItems } from "../config/menuConfig";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  // This is the current path
  const currentPath = location.pathname;

  // 1) Derive which item is "active"
  //    We look for an item whose sub-options includes currentPath
  let activeSection = null;
  let activeOption = null;

  // We'll filter from the *whole* menu, because we need to know
  // which sub-tabs (options) to display
  for (const item of menuItems) {
    for (const opt of item.options) {
      // If the route EXACTLY matches
      if (opt.link === currentPath) {
        activeSection = item;
        activeOption = opt;
        break;
      }
      // Optionally, if you want "startsWith" logic:
      // if (currentPath.startsWith(opt.link)) {
      //   activeSection = item;
      //   activeOption = opt;
      //   break;
      // }
    }
    if (activeSection) break;
  }

  // 2) If the user clicks a sidebar icon,
  //    we can do an "auto-navigate" to the first sub-route
  //    or rely on the user to click the horizontal tab
  const handleSectionSelect = (menuItem) => {
    // For convenience, navigate to the 1st sub-route
    if (menuItem.options?.length) {
      navigate(menuItem.options[0].link);
    }
  };

  // 3) Clicking a sub-tab navigates to the relevant link
  const handleTabClick = (option) => {
    navigate(option.link);
  };

  // For toggling dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-300`}>
      <div className="h-auto w-full overflow-y-auto bg-gray-100 text-gray-800 dark:bg-[#121212] dark:text-gray-100">
        <Navbar />
      

        <div className="h-full w-full flex">
          {/* Sidebar with onSectionSelect */}
          <Sidebar onSectionSelect={handleSectionSelect} />

          <div className="flex-1 h-screen flex flex-col ">
            <div
              id="scrollableDiv"
              className={`
                flex-1 h-screen overflow-y-auto w-full
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
              `}
            >
              <Breadcrumb />

              {/* If we found an activeSection, show its horizontal sub-tabs */}
              {activeSection && activeSection.options && (
                <div
                  className={`
                    flex items-center
                    bg-gray-200 dark:bg-[#1a1a1a]/60
                    border-b border-gray-300 dark:border-gray-700
                    backdrop-blur-sm
                    gap-2
                    
                 
                  `}
                >
                  {activeSection.options.map((option, idx) => {
                    const isActive = option.link === currentPath;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTabClick(option)}
                        className={`
                          relative px-4 py-2 mx-1 text-base font-bold
                          transition-colors duration-300
                          rounded-lg
                     
                          ${
                            isActive
                              ? "text-green-600 dark:text-green-400 border-b-1 border-green-500"
                              : "text-gray-600 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300"
                          }
                        `}
                      >
                        {option.name}
                        {isActive && (
                          <span
                            className={`
                              absolute left-0 bottom-0 w-full h-[2px] bg-green-500
                              dark:bg-green-300
                           
                            `}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Page Content */}
              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;


