
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";
// import useAuthStore from "../../store/store";
// import { menuItems } from "../../config/menuConfig";
// // Import React Icons
// import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

// export default function Sidebar({ collapsed, setCollapsed, onSectionSelect }) {
//   const permissions = useAuthStore((state) => state.permissions);
//   const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [hoverExpanded, setHoverExpanded] = useState(false);

//   const actualCollapsed = collapsed && !hoverExpanded;

//   // Filter menu items based on user permissions
//   useEffect(() => {
//     filterMenuItems();
//   }, [permissions]);

//   const filterMenuItems = () => {
//     if (!permissions || permissions.length === 0) {
//       setFilteredMenuItems([]);
//       return;
//     }

//     const filtered = menuItems
//       .map((item) => {
//         const filteredOptions = item.options?.filter((opt) =>
//           permissions.includes(opt.permission)
//         );
//         return { ...item, options: filteredOptions };
//       })
//       .filter((item) => item.options?.length > 0);

//     setFilteredMenuItems(filtered);
//   };

//   const isItemActive = (item) =>
//     item.options?.some((opt) => currentPath === opt.link);

//   const handleMouseEnter = () => {
//     if (collapsed) setHoverExpanded(true);
//   };

//   const handleMouseLeave = () => {
//     if (hoverExpanded) setHoverExpanded(false);
//   };

//   // Animation variants for menu items
//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       x: -20,
//     },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     }),
//   };

//   // Icon animation variants
//   const iconVariants = {
//     rest: { scale: 1 },
//     hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
//   };

//   return (
//     <motion.div
//       className={`dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-[0_0_20px_rgba(0,0,0,0.1)] h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden relative 
//         dark:bg-black dark:text-white bg-white text-slate-800 
//         ${actualCollapsed ? "w-20" : "w-64"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       initial={false}
//       animate={{
//         width: actualCollapsed ? "5rem" : "16rem",
//         transition: { duration: 0.01, ease: "easeInOut" },
//       }}
//       style={{
//         boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between py-[9px] p-4 border-b dark:border-slate-700 border-slate-200 ">
//         <motion.div
//           className="flex items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {!actualCollapsed && (
//             <motion.img
//               src="/hcm-web-sidebar-logo.png"
//               alt="HCM Logo"
//               className="w-8 h-8 object-contain mt-2"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//             />
//           )}

//           {!actualCollapsed && (
//             <motion.h1
//               className="text-lg font-bold ml-2 dark:text-white text-slate-800 mt-2"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: 0.2 }}
//             >
//               HCM
//             </motion.h1>
//           )}
//         </motion.div>

//         {/* Toggle button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-slate-600 dark:text-slate-300 rounded-full mt-2 mr-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? (
//             <RiMenuUnfoldLine size={22} />
//           ) : (
//             <RiMenuFoldLine size={22} />
//           )}
//         </motion.button>
//       </div>

//       {/* Navigation */}
//       <nav
//         className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-200 scrollbar-track-transparent    [&::-webkit-scrollbar]:w-2
//                 [&::-webkit-scrollbar-track]:rounded-full
//                 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-950
//                 [&::-webkit-scrollbar-thumb]:rounded-full
//                 [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800
//                 transition-colors duration-300
                
//                 "
//       >
//         <ul className="space-y-2 px-2">
//           {filteredMenuItems.map((item, index) => {
//             const active = isItemActive(item);

//             return (
//               <motion.li
//                 key={index}
//                 custom={index}
//                 initial="hidden"
//                 animate="visible"
//                 variants={itemVariants}
//               >
//                 <motion.button
//                   onClick={() => onSectionSelect(item)}
//                   whileHover={{
//                     x: 3,
//                     transition: { duration: 0.2 },
//                   }}
//                   whileTap={{ scale: 0.97 }}
//                   className={`flex items-center w-full pl-4 py-2.5 rounded-xl transition-all duration-200 
//                     ${
//                       active
//                         ? "dark:bg-indigo-600/80 dark:text-white bg-indigo-50 text-indigo-700 shadow-md dark:shadow-indigo-900/30 shadow-indigo-200/50"
//                         : "dark:hover:bg-slate-800/70 hover:bg-slate-50 dark:text-slate-300 text-slate-600"
//                     }`}
//                 >
//                   <motion.div
//                     initial="rest"
//                     whileHover="hover"
//                     variants={iconVariants}
//                     className={`text-xl ${
//                       active
//                         ? "dark:text-indigo-200 text-indigo-600"
//                         : "dark:text-slate-400 text-slate-500"
//                     }`}
//                   >
//                     {item.icon}
//                   </motion.div>

//                   {!actualCollapsed && (
//                     <motion.span
//                       className={`ml-4 font-medium truncate text-sm ${
//                         active
//                           ? "dark:text-white text-indigo-700"
//                           : "dark:text-slate-300 text-slate-700"
//                       }`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {item.name}
//                     </motion.span>
//                   )}

//                   {/* Indicator for active item */}
//                   {active && !actualCollapsed && (
//                     <motion.div
//                       className="ml-auto mr-2 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   )}
//                 </motion.button>
//               </motion.li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User section */}
//       {!actualCollapsed && (
//         <motion.div
//           className="p-4 mt-auto border-t dark:border-slate-700 border-slate-200"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-5  shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"></div>
//           </div>
//         </motion.div>
//       )}

//       {/* Collapsed User Avatar */}
//       {actualCollapsed && (
//         <motion.div
//           className="p-4 mt-auto flex justify-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="w-10 h-10  shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"
//           ></motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }


// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation } from "react-router-dom";
// import useAuthStore from "../../store/store";
// import { menuItems } from "../../config/menuConfig";
// // Import React Icons
// import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

// export default function Sidebar({ collapsed, setCollapsed, onSectionSelect }) {
//   const permissions = useAuthStore((state) => state.permissions);
//   const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [hoverExpanded, setHoverExpanded] = useState(false);

//   const actualCollapsed = collapsed && !hoverExpanded;

//   // Filter menu items based on user permissions
//   useEffect(() => {
//     filterMenuItems();
//   }, [permissions]);

//   const filterMenuItems = () => {
//     if (!permissions || permissions.length === 0) {
//       setFilteredMenuItems([]);
//       return;
//     }

//     const filtered = menuItems
//       .map((item) => {
//         const filteredOptions = item.options?.filter((opt) =>
//           permissions.includes(opt.permission)
//         );
//         return { ...item, options: filteredOptions };
//       })
//       .filter((item) => item.options?.length > 0);

//     setFilteredMenuItems(filtered);
//   };

//   const isItemActive = (item) =>
//     item.options?.some((opt) => currentPath === opt.link);

//   const handleMouseEnter = () => {
//     if (collapsed) setHoverExpanded(true);
//   };

//   const handleMouseLeave = () => {
//     if (hoverExpanded) setHoverExpanded(false);
//   };

//   return (
//     <div
//       className={`dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-[0_0_20px_rgba(0,0,0,0.1)] h-screen transition-all duration-200 ease-in-out flex flex-col overflow-hidden relative 
//         dark:bg-black dark:text-white bg-white text-slate-800 
//         ${actualCollapsed ? "w-20" : "w-64"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between py-[9px] p-4 border-b dark:border-slate-700 border-slate-200 ">
//         <div className="flex items-center">
//           {!actualCollapsed && (
//             <img
//               src="/hcm-web-sidebar-logo.png"
//               alt="HCM Logo"
//               className="w-8 h-8 object-contain mt-2 transition-opacity duration-200"
//             />
//           )}

//           {!actualCollapsed && (
//             <h1 className="text-lg font-bold ml-2 dark:text-white text-slate-800 mt-2 transition-opacity duration-200">
//               HCM
//             </h1>
//           )}
//         </div>

//         {/* Toggle button */}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-slate-600 dark:text-slate-300 rounded-full mt-2 mr-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 hover:scale-105 transform"
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? (
//             <RiMenuUnfoldLine size={22} />
//           ) : (
//             <RiMenuFoldLine size={22} />
//           )}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-200 scrollbar-track-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-950 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 transition-colors duration-300">
//         <ul className="space-y-2 px-2">
//           {filteredMenuItems.map((item, index) => {
//             const active = isItemActive(item);

//             return (
//               <li key={index}>
//                 <button
//                   onClick={() => onSectionSelect(item)}
//                   className={`flex items-center w-full pl-4 py-2.5 rounded-xl transition-all duration-150 hover:translate-x-1 transform
//                     ${
//                       active
//                         ? "dark:bg-indigo-600/80 dark:text-white bg-indigo-50 text-indigo-700 shadow-md dark:shadow-indigo-900/30 shadow-indigo-200/50"
//                         : "dark:hover:bg-slate-800/70 hover:bg-slate-50 dark:text-slate-300 text-slate-600"
//                     }`}
//                 >
//                   <div
//                     className={`text-xl transition-transform duration-150 hover:scale-105 ${
//                       active
//                         ? "dark:text-indigo-200 text-indigo-600"
//                         : "dark:text-slate-400 text-slate-500"
//                     }`}
//                   >
//                     {item.icon}
//                   </div>

//                   {!actualCollapsed && (
//                     <span
//                       className={`ml-4 font-medium truncate text-sm transition-opacity duration-200 ${
//                         active
//                           ? "dark:text-white text-indigo-700"
//                           : "dark:text-slate-300 text-slate-700"
//                       }`}
//                     >
//                       {item.name}
//                     </span>
//                   )}

//                   {/* Indicator for active item */}
//                   {active && !actualCollapsed && (
//                     <div className="ml-auto mr-2 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300 transition-all duration-200" />
//                   )}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User section */}
//       {!actualCollapsed && (
//         <div className="p-4 mt-auto border-t dark:border-slate-700 border-slate-200 transition-opacity duration-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-5 shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"></div>
//           </div>
//         </div>
//       )}

//       {/* Collapsed User Avatar */}
//       {actualCollapsed && (
//         <div className="p-4 mt-auto flex justify-center transition-opacity duration-200">
//           <div className="w-10 h-10 shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30 hover:scale-105 transition-transform duration-150"></div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/store";
import { menuItems } from "../../config/menuConfig";
// Import React Icons
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

export default function Sidebar({ collapsed, setCollapsed, onSectionSelect }) {
  const permissions = useAuthStore((state) => state.permissions);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const location = useLocation();
  const currentPath = location.pathname;
  const [hoverExpanded, setHoverExpanded] = useState(false);

  const actualCollapsed = collapsed && !hoverExpanded;

  // Filter menu items based on user permissions
  useEffect(() => {
    filterMenuItems();
  }, [permissions]);

  const filterMenuItems = () => {
    if (!permissions || permissions.length === 0) {
      setFilteredMenuItems([]);
      return;
    }

    const filtered = menuItems
      .map((item) => {
        const filteredOptions = item.options?.filter((opt) =>
          permissions.includes(opt.permission)
        );
        return { ...item, options: filteredOptions };
      })
      .filter((item) => item.options?.length > 0);

    setFilteredMenuItems(filtered);
  };

  const isItemActive = (item) =>
    item.options?.some((opt) => currentPath === opt.link);

  const handleMouseEnter = () => {
    if (collapsed) setHoverExpanded(true);
  };

  const handleMouseLeave = () => {
    if (hoverExpanded) setHoverExpanded(false);
  };

  return (
    <div
      className={`h-screen transition-all duration-200 ease-in-out flex flex-col overflow-hidden relative 
        dark:bg-black dark:text-white bg-white text-slate-800 
        shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] 
        dark:border-r dark:border-slate-800
        ${actualCollapsed ? "w-20" : "w-64"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-[9px] p-4 border-b dark:border-slate-700 border-slate-200 mt-2">
        <div className="flex items-center">
          {!actualCollapsed && (
            <img
              src="/hcm-web-sidebar-logo.png"
              alt="HCM Logo"
              className="w-8 h-8 object-contain mt-2 transition-opacity duration-200"
            />
          )}

          {!actualCollapsed && (
            <h1 className="text-lg font-bold ml-2 dark:text-white text-slate-800 mt-2 transition-opacity duration-200">
              HCM
            </h1>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-600 dark:text-slate-300 rounded-full mt-2 mr-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 hover:scale-105 transform"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <RiMenuUnfoldLine size={22} />
          ) : (
            <RiMenuFoldLine size={22} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-200 scrollbar-track-transparent [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-950 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800 transition-colors duration-300">
        <ul className="space-y-2 px-2">
          {filteredMenuItems.map((item, index) => {
            const active = isItemActive(item);

            return (
              <li key={index}>
                <button
                  onClick={() => onSectionSelect(item)}
                  className={`flex items-center w-full pl-4 py-2.5 rounded-xl transition-all duration-150 hover:translate-x-1 transform
                    ${
                      active
                        ? "dark:bg-indigo-600/80 dark:text-white bg-indigo-50 text-indigo-700 shadow-md dark:shadow-indigo-900/30 shadow-indigo-200/50"
                        : "dark:hover:bg-slate-800/70 hover:bg-slate-50 dark:text-slate-300 text-slate-600"
                    }`}
                >
                  <div
                    className={`text-xl transition-transform duration-150 hover:scale-105 ${
                      active
                        ? "dark:text-indigo-200 text-indigo-600"
                        : "dark:text-slate-400 text-slate-500"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {!actualCollapsed && (
                    <span
                      className={`ml-4 font-medium truncate text-sm transition-opacity duration-200 ${
                        active
                          ? "dark:text-white text-indigo-700"
                          : "dark:text-slate-300 text-slate-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}

                  {/* Indicator for active item */}
                  {active && !actualCollapsed && (
                    <div className="ml-auto mr-2 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300 transition-all duration-200" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      {!actualCollapsed && (
        <div className="p-4 mt-auto border-t dark:border-slate-700 border-slate-200 transition-opacity duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-5 shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"></div>
          </div>
        </div>
      )}

      {/* Collapsed User Avatar */}
      {actualCollapsed && (
        <div className="p-4 mt-auto flex justify-center transition-opacity duration-200">
          <div className="w-10 h-10 shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30 hover:scale-105 transition-transform duration-150"></div>
        </div>
      )}
    </div>
  );
}