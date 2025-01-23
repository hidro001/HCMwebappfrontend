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

//           <div className="flex-1 h-screen flex flex-col ">
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
//       {/* 
//         Remove overflow-y-auto here to avoid multiple scroll containers.
//         You can just let it wrap your layout with no scroll. 
//       */}
//       <div className="h-auto w-full text-text-primary bg-bg-primary">
//         <Navbar />

//         <div className="h-full w-full flex">
//           {/* Sidebar with onSectionSelect */}
//           <Sidebar onSectionSelect={handleSectionSelect} />

//           {/* 
//             Container for the main content: 
//             remove the outer overflow-y-auto, keep it here in the inner. 
//           */}
//           <div className="flex-1 h-screen flex flex-col">
//             <div
//               id="scrollableDiv"
//               // Add the "scroll-stabilize" class to promote to GPU layer
//               className={`
//                 scroll-stabilize
//                 flex-1 h-screen
//                 overflow-y-auto
//                 w-full
//                 [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 
//                 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 
//                 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
//                 transition-colors duration-300
//               `}
//             >
//               <Breadcrumb />

//               {/* 
//                 Show horizontal tabs if a section is active 
//               */}
//               {activeSection && activeSection.options && (
//                 <div
//                   className={`
//                     flex items-center
//                     bg-gray-200 dark:bg-gray-900
//                     border-b border-gray-300 dark:border-gray-700
//                     backdrop-blur-sm
//                     gap-2
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

import React, { useState, useEffect, useRef } from "react";
import { Footer, Sidebar, Breadcrumb, Navbar } from "../components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { menuItems } from "../config/menuConfig";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  // Track whether the footer should be visible
  const [showFooter, setShowFooter] = useState(true);

  // We'll store the last scroll position to detect direction
  const [lastScrollTop, setLastScrollTop] = useState(0);

  // Reference to the scrollable content div
  const scrollableDivRef = useRef(null);

  const currentPath = location.pathname;

  let activeSection = null;
  let activeOption = null;

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

  // -----------
  // 2. Scroll listener to hide footer on scroll up
  //    and show footer on scroll down
  // -----------
  useEffect(() => {
    const scrollContainer = scrollableDivRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;

      if (currentScrollTop < lastScrollTop) {
        // Scrolling UP
        setShowFooter(false);
      } else {
        // Scrolling DOWN
        setShowFooter(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-100`}>
      <div className="h-auto w-full text-text-primary bg-bg-primary">
        <Navbar />

        <div className="h-full w-full flex">
          <Sidebar onSectionSelect={handleSectionSelect} />

          <div className="flex-1 h-screen flex flex-col">
        
            <div
              ref={scrollableDivRef}
              id="scrollableDiv"
              className={`
                scroll-stabilize
                flex-1 h-screen
                overflow-y-auto
                w-full
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 
                dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300
              `}
            >
              <Breadcrumb />

              {activeSection && activeSection.options && (
                <div
                  className={`
                    flex items-center
                    bg-gray-200 dark:bg-gray-900
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

              <div className="container mx-auto px-4 py-6">
                <Outlet />
              </div>
            </div>

            {showFooter && <Footer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

