// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation, Link } from "react-router-dom";
// import { Tooltip } from "react-tooltip";
// import useAuthStore from "../../store/store"; // Zustand store
// // Adjust your icon imports here if needed
// import { menuItems } from "../../config/menuConfig";

// export default function Sidebar({ collapsed, onSectionSelect }) {

//   const permissions = useAuthStore((state) => state.permissions);
//   const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
//   const location = useLocation();
//   const currentPath = location.pathname;

//   const [hoverExpanded, setHoverExpanded] = useState(false);
//   const actualCollapsed = collapsed && !hoverExpanded;

//   console.log(actualCollapsed)

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
//       className={`bg-bg-sidebar h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden sidebar-shadow ${
//         actualCollapsed ? "w-[6%]" : "w-[15%]"
//       }`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >

//       <nav className=" overflow-y-auto overflow-x-hidden sidebar-scrollbar">
//         {filteredMenuItems.map((item, index) => {
//           const active = isItemActive(item);
//           // const tooltipHtml = `
//           //   <div style="font-weight: bold;">${item.name}</div>
//           //   <div>${item.tooltip || ""}</div>
//           // `;

//           return (
//            <button
//               key={index}
//               onClick={() => onSectionSelect(item)}
//               // data-tooltip-id="sidebar-tooltip"
//               // data-tooltip-html={tooltipHtml}
//               className={`flex items-center gap-3 p-2 m-1 rounded-lg transition w-full
//                 ${actualCollapsed ? "justify-center" : "mx-4 hover:bg-[#E7E7E7]"}
//                 ${
//                   actualCollapsed && active
//                     ? "text-black font-semibold"
//                     : !actualCollapsed && active
//                     ? "text-black font-semibold bg-[#E7E7E7]"
//                     : "text-gray-700 hover:bg-[#E7E7E7]"
//                 }
//               `}
//             >

//               <motion.div
//                 whileHover={item.iconAnimation}
//                 transition={{ duration: 0.3 }}
//                 style={{
//                   boxShadow: active ? 'none' : 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
//                 }}
//                 className={`text-xl p-2  rounded-md ${
//                    actualCollapsed && active
//                     ? "bg-[#E7E7E7]"
//                     : !actualCollapsed && active ? 'bg-white'
//                     : "bg-white inset-shadow-sm inset-shadow-indigo-500"
//                 }`}
//               >
//                 {item.icon}
//               </motion.div>
//               <span
//                 className={`text-sm whitespace-nowrap transition-opacity duration-300 truncate max-w-[150px] ${
//                   actualCollapsed ? "opacity-0 hidden" : "opacity-100"
//                 }`}
//               >
//                 {item.name}
//               </span>
//             </button>
//           );
//         })}
//       </nav>
// {/*
//       <Tooltip
//         id="sidebar-tooltip"
//         place="right"
//         effect="solid"
//         multiline={true}
//         style={{ maxWidth: "200px", marginTop: "0px" }}
//       /> */}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useLocation, Link } from "react-router-dom";
// import useAuthStore from "../../store/store";
// import { menuItems } from "../../config/menuConfig";
// // Import React Icons
// import { FiSun, FiMoon, FiChevronRight, FiChevronLeft } from "react-icons/fi";
// import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

// export default function Sidebar({ collapsed, setCollapsed, onSectionSelect }) {
//   const permissions = useAuthStore((state) => state.permissions);
//   const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const [darkMode, setDarkMode] = useState(false);
//   const [hoverExpanded, setHoverExpanded] = useState(false);

//   const actualCollapsed = collapsed && !hoverExpanded;

//   // Filter menu items based on user permissions
//   useEffect(() => {
//     filterMenuItems();
//   }, [permissions]);

//   // Toggle dark/light mode
//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//     // Update body class for global theme change
//     document.body.classList.toggle("dark-mode");
//   };

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
//         delay: i * 0.1,
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     }),
//   };

//   // Animation for the collapse button
//   const collapseButtonVariants = {
//     expanded: { rotate: 0 },
//     collapsed: { rotate: 180 },
//   };

//   return (
//     <motion.div
//       className={`h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden relative ${
//         darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-800"
//       } ${actualCollapsed ? "w-20" : "w-64"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       initial={false}
//       animate={{
//         width: actualCollapsed ? "5rem" : "16rem",
//         transition: { duration: 0.3, ease: "easeInOut" },
//       }}
//       style={{
//         boxShadow: darkMode
//           ? "0 0 20px rgba(0, 0, 0, 0.5)"
//           : "0 0 20px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Header */}
//       <div
//         className={`flex items-center justify-between p-4 border-b ${
//           darkMode ? "border-slate-700" : "border-slate-200"
//         }`}
//       >
//         <motion.div
//           className="flex items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {!actualCollapsed && (
//             <motion.h1
//               className="text-lg font-bold ml-2"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: 0.2 }}
//             >
//               Dashboard
//             </motion.h1>
//           )}
//         </motion.div>

//         {/*  toggle button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-600 dark:text-gray-300 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
//         >
//           {collapsed ? (
//             <RiMenuUnfoldLine size={24} />
//           ) : (
//             <RiMenuFoldLine size={24} />
//           )}
//         </motion.button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
//         <ul className="space-y-2 px-3">
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
//                     scale: 1.03,
//                     transition: { duration: 0.2 },
//                   }}
//                   whileTap={{ scale: 0.97 }}
//                   className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
//                     active
//                       ? darkMode
//                         ? "bg-indigo-600 text-white"
//                         : "bg-indigo-100 text-indigo-700"
//                       : darkMode
//                       ? "hover:bg-slate-800"
//                       : "hover:bg-slate-100"
//                   }`}
//                 >
//                   <motion.div
//                     whileHover={item.iconAnimation || { rotate: 5 }}
//                     className={`text-xl ${
//                       active
//                         ? darkMode
//                           ? "text-white"
//                           : "text-indigo-600"
//                         : darkMode
//                         ? "text-slate-400"
//                         : "text-slate-500"
//                     }`}
//                   >
//                     {item.icon}
//                   </motion.div>

//                   {!actualCollapsed && (
//                     <motion.span
//                       className={`ml-4 font-medium truncate`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {item.name}
//                     </motion.span>
//                   )}
//                 </motion.button>
//               </motion.li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Collapse toggle button */}
//       {/* <motion.div
//         className={`absolute -right-3 top-1/2 transform -translate-y-1/2 ${
//           darkMode ? "text-white" : "text-slate-800"
//         }`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <motion.button
//           onClick={onToggleCollapse}
//           initial={false}
//           animate={collapsed ? "collapsed" : "expanded"}
//           variants={collapseButtonVariants}
//           whileHover={{ scale: 1.2 }}
//           whileTap={{ scale: 0.9 }}
//           className={`flex items-center justify-center p-1 rounded-full ${
//             darkMode
//               ? "bg-slate-800 text-indigo-400 shadow-lg shadow-slate-900/50"
//               : "bg-white text-indigo-600 shadow-lg shadow-slate-300/50"
//           }`}
//           style={{ width: "24px", height: "24px" }}
//         >
//           <FiChevronLeft size={16} />
//         </motion.button>
//       </motion.div> */}

//       {/* User section */}
//       {!actualCollapsed && (
//         <motion.div
//           className={`p-4 mt-auto border-t ${
//             darkMode ? "border-slate-700" : "border-slate-200"
//           }`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center space-x-3">
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                 darkMode ? "bg-indigo-600" : "bg-indigo-100"
//               }`}
//             >
//               <span className={darkMode ? "text-white" : "text-indigo-600"}>
//                 {useAuthStore?.getState()?.user?.name?.[0] || "U"}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-medium truncate">
//                 {useAuthStore?.getState()?.user?.name || "User"}
//               </p>
//               <p
//                 className={`text-sm truncate ${
//                   darkMode ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 {useAuthStore?.getState()?.user?.email || "user@example.com"}
//               </p>
//             </div>
//           </div>
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
// import { IoRocketOutline } from "react-icons/io5";

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
//       <div className="flex items-center justify-between py-[9px] px-4 border-b dark:border-slate-700 border-slate-200 ">
//         <motion.div
//           className="flex items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <IoRocketOutline className="text-indigo-600 dark:text-indigo-400 text-2xl" />

//           {!actualCollapsed && (
//             <motion.h1
//               className="text-lg font-bold ml-2 dark:text-white text-slate-800"
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
//           className="text-slate-600 dark:text-slate-300 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
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

  // Animation variants for menu items
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Icon animation variants
  const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={`dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-[0_0_20px_rgba(0,0,0,0.1)] h-screen transition-all duration-300 ease-in-out flex flex-col overflow-hidden relative 
        dark:bg-black dark:text-white bg-white text-slate-800 
        ${actualCollapsed ? "w-20" : "w-64"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        width: actualCollapsed ? "5rem" : "16rem",
        transition: { duration: 0.01, ease: "easeInOut" },
      }}
      style={{
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-[9px] p-4 border-b dark:border-slate-700 border-slate-200 ">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!actualCollapsed && (
            <motion.img
              src="/hcm-web-sidebar-logo.png"
              alt="HCM Logo"
              className="w-8 h-8 object-contain mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          )}

          {!actualCollapsed && (
            <motion.h1
              className="text-lg font-bold ml-2 dark:text-white text-slate-800 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              HCM
            </motion.h1>
          )}
        </motion.div>

        {/* Toggle button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-600 dark:text-slate-300 rounded-full mt-2 mr-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <RiMenuUnfoldLine size={22} />
          ) : (
            <RiMenuFoldLine size={22} />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-slate-200 scrollbar-track-transparent    [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-gray-950
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800
                transition-colors duration-300
                
                "
      >
        <ul className="space-y-2 px-2">
          {filteredMenuItems.map((item, index) => {
            const active = isItemActive(item);

            return (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => onSectionSelect(item)}
                  whileHover={{
                    x: 3,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center w-full pl-4 py-2.5 rounded-xl transition-all duration-200 
                    ${
                      active
                        ? "dark:bg-indigo-600/80 dark:text-white bg-indigo-50 text-indigo-700 shadow-md dark:shadow-indigo-900/30 shadow-indigo-200/50"
                        : "dark:hover:bg-slate-800/70 hover:bg-slate-50 dark:text-slate-300 text-slate-600"
                    }`}
                >
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={iconVariants}
                    className={`text-xl ${
                      active
                        ? "dark:text-indigo-200 text-indigo-600"
                        : "dark:text-slate-400 text-slate-500"
                    }`}
                  >
                    {item.icon}
                  </motion.div>

                  {!actualCollapsed && (
                    <motion.span
                      className={`ml-4 font-medium truncate text-sm ${
                        active
                          ? "dark:text-white text-indigo-700"
                          : "dark:text-slate-300 text-slate-700"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {/* Indicator for active item */}
                  {active && !actualCollapsed && (
                    <motion.div
                      className="ml-auto mr-2 h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-300"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      {!actualCollapsed && (
        <motion.div
          className="p-4 mt-auto border-t dark:border-slate-700 border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-5  shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"></div>
          </div>
        </motion.div>
      )}

      {/* Collapsed User Avatar */}
      {actualCollapsed && (
        <motion.div
          className="p-4 mt-auto flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10  shadow-lg dark:shadow-indigo-900/30 shadow-indigo-300/30"
          ></motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
