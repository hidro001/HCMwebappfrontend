// import React, { useState } from "react";
// import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { MdDarkMode, MdLightMode } from "react-icons/md";

// // Import the same menu config
// import { menuItems } from "../config/menuConfig";

// const MainLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);

//   const currentPath = location.pathname;

//   let activeSection = null;
//   let activeOption = null;

//   for (const item of menuItems) {
//     for (const opt of item.options) {
//       // If the route EXACTLY matches
//       if (opt.link === currentPath) {
//         activeSection = item;
//         activeOption = opt;
//         break;
//       }
//     }
//     if (activeSection) break;
//   }

//   const handleSectionSelect = (menuItem) => {
//     if (menuItem.options?.length) {
//       navigate(menuItem.options[0].link);
//     }
//   };

//   const handleTabClick = (option) => {
//     navigate(option.link);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`${darkMode ? "dark" : ""} transition-colors duration-100`}>
//       <div className="h-auto w-full overflow-y-auto  text-text-primary bg-bg-primary">
//         <Navbar />

//         <div className="h-full w-full flex">
//           {/* Sidebar with onSectionSelect */}
//           <Sidebar onSectionSelect={handleSectionSelect} />

//           <div className="flex-1 h-screen flex flex-col w-full overflow-x-scroll hide-horizontal-scrollbar">
//             <div
//               id="scrollableDiv"
//               className={`
//                 scroll-stabilize
//                 flex-1 h-screen overflow-y-auto w-full
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                 transition-colors duration-300
//               `}
//             >
//               <Breadcrumb />

//               {/* If we found an activeSection, show its horizontal sub-tabs */}
//               {activeSection && activeSection.options && (
//                 <div
//                   className={`
//                     flex items-center
//                     bg-gray-200 dark:bg-gray-900
//                     border-b border-gray-300 dark:border-gray-700
//                     backdrop-blur-sm
//                     gap-2
//                     overflow-x-auto
//                     hide-scrollbar 
                 
//                   `}
//                 >
//                   {activeSection.options.map((option, idx) => {
//                     const isActive = option.link === currentPath;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() => handleTabClick(option)}
//                         className={`
//                           relative px-4 py-2 mx-1 text-base font-bold
//                           transition-colors duration-300
//                           rounded-lg
                     
//                           ${
//                             isActive
//                               ? "text-green-600 dark:text-green-400 border-b-1 border-green-500"
//                               : "text-gray-600 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300"
//                           }
//                         `}
//                       >
//                         {option.name}
//                         {isActive && (
//                           <span
//                             className={`
//                               absolute left-0 bottom-0 w-full h-[2px] bg-green-500
//                               dark:bg-green-300
                           
//                             `}
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Page Content */}
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


import React, { useState } from "react";
import { Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// Removed unused icon imports
// import { MdDarkMode, MdLightMode } from "react-icons/md";

// Import the same menu config
import { menuItems } from "../config/menuConfig";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const currentPath = location.pathname;

  let activeSection = null;
  let activeOption = null;

  // Retain the same logic to find active section and option
  for (const item of menuItems) {
    for (const opt of item.options) {
      if (opt.link === currentPath) {
        activeSection = item;
        activeOption = opt;
        break;
      }
    }
    if (activeSection) break;
  }

  const handleSectionSelect = (menuItem) => {
    if (menuItem.options?.length) {
      navigate(menuItem.options[0].link);
    }
  };

  const handleTabClick = (option) => {
    navigate(option.link);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={``}>
      <div className="h-auto w-full overflow-y-auto text-text-primary bg-bg-primary">
        <Navbar />

        <div className="h-full w-full flex">
          {/* Sidebar with onSectionSelect */}
          <Sidebar onSectionSelect={handleSectionSelect} />

          <div className="flex-1 h-screen flex flex-col w-full overflow-x-scroll hide-horizontal-scrollbar">
         <Breadcrumb />
    {activeSection && activeSection.options && (
                <div
                  className={`
                    flex items-center
                    bg-gray-200 dark:bg-gray-900
                    border-b border-gray-300 dark:border-gray-700
                    backdrop-blur-sm
                    gap-2
                    overflow-x-auto
                    hide-scrollbar 
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
            <div
              id="scrollableDiv"
              className={`
                
                scroll-stabilize
                flex-1 h-screen overflow-y-auto overflow-x-hidden w-full
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
              `}
            >
     

              {/* If we found an activeSection, show its horizontal sub-tabs */}
          

              {/* Page Content */}
              <div className="container mx-auto px-4 py-3 mb-20">
                <Outlet />
              </div>
            </div>

            {/* Footer removed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

