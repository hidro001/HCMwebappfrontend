// import React from "react";
// import { Link as RouterLink, useLocation } from "react-router-dom";
// import useAuthStore from "../../store/store";
// import { capitalizeWords } from "../../utils/capitalize";

// // Material-UI Components
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
// import Typography from "@mui/material/Typography";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// // Material-UI Icons
// import HomeIcon from "@mui/icons-material/Home";
// import SettingsIcon from "@mui/icons-material/Settings";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import PeopleIcon from "@mui/icons-material/People";
// import FolderIcon from "@mui/icons-material/Folder"; // Default icon
// // MUI Hook
// import { useTheme } from "@mui/material/styles";

// const Breadcrumb = () => {
//   const location = useLocation();
//   const theme = useTheme();
//   // Access userName and permissionRole from Zustand store
//   const userName = useAuthStore((state) => state.userName);
//   const employeeId = useAuthStore((state) => state.employeeId);

//   const permissionRole = useAuthStore((state) => state.designation);

//   // Function to format breadcrumb names
//   const formatBreadcrumb = (name) => capitalizeWords(name.replace(/-/g, " "));

//   // Function to get icon based on path segment
//   const getIcon = (segment) => {
//     switch (segment.toLowerCase()) {
//       case "dashboard":
//         return <HomeIcon fontSize="small" style={{ marginRight: 4 }} />;
//       case "settings":
//         return <SettingsIcon fontSize="small" style={{ marginRight: 4 }} />;
//       case "admin-dashboard":
//       case "super-admin-dashboard":
//         return (
//           <AdminPanelSettingsIcon fontSize="small" style={{ marginRight: 4 }} />
//         );
//       case "manager-dashboard":
//         return (
//           <SupervisorAccountIcon fontSize="small" style={{ marginRight: 4 }} />
//         );
//       case "users":
//         return <PeopleIcon fontSize="small" style={{ marginRight: 4 }} />;
//       case "projects":
//         return <FolderIcon fontSize="small" style={{ marginRight: 4 }} />;
//       default:
//         return <FolderIcon fontSize="small" style={{ marginRight: 4 }} />; // Default icon
//     }
//   };

//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split("/").filter((x) => x);

//     return (
//       <Breadcrumbs
//         aria-label="breadcrumb"
//         separator={<NavigateNextIcon fontSize="small" />}
//         sx={{ display: "flex", alignItems: "center" }}
//       >
//         {/* Root Dashboard Link */}
//         <Link
//           component={RouterLink}
//           to="/dashboard"
//           color="inherit"
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <HomeIcon fontSize="small" style={{ marginRight: 4 }} />
//           Dashboard
//         </Link>

//         {/* Dynamically Generated Breadcrumbs */}
//         {pathnames
//           .filter(
//             (value, index) =>
//               !(index === 0 && value.toLowerCase() === "dashboard")
//           )
//           .map((value, index) => {
//             const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//             const displayName = formatBreadcrumb(value);
//             const icon = getIcon(value);

//             const isLast = index === pathnames.length - 1;

//             return isLast ? (
//               <Typography
//                 key={to}
//                 color="text.primary"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 {icon}
//                 {displayName}
//               </Typography>
//             ) : (
//               <Link
//                 component={RouterLink}
//                 to={to}
//                 key={to}
//                 color="inherit"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 {icon}
//                 {displayName}
//               </Link>
//             );
//           })}
//       </Breadcrumbs>
//     );
//   };

//   return (
//     <div className="flex justify-between dark:bg-gray-700 dark:text-white items-center py-1  px-4 bg-gray-100 border-b mt-4">
//       <div className="text-sm">
//         Welcome Back,{" "}
//         <span className="font-semibold">
//   {userName ? capitalizeWords(userName) : "Guest"} ({employeeId})
// </span>

//       </div>
//       <div>{generateBreadcrumbs()}</div>
//     </div>
//   );
// };

// export default Breadcrumb;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/store";
import { motion } from "framer-motion";
import { capitalizeWords } from "../../utils/capitalize";

// React Icons
import { FiHome, FiSettings, FiUsers, FiFolder } from "react-icons/fi";
import { HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import { RiAdminLine, RiUserSettingsLine } from "react-icons/ri";
import { IoChevronForwardOutline } from "react-icons/io5";

const Breadcrumb = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  // Access user data from Zustand store
  const userName = useAuthStore((state) => state.userName);
  const employeeId = useAuthStore((state) => state.employeeId);
  const permissionRole = useAuthStore((state) => state.designation);

  // Animation effect when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to format breadcrumb names
  const formatBreadcrumb = (name) => capitalizeWords(name.replace(/-/g, " "));

  // Function to get icon based on path segment
  const getIcon = (segment) => {
    switch (segment.toLowerCase()) {
      case "dashboard":
        return <FiHome className="text-blue-500" />;
      case "settings":
        return <FiSettings className="text-purple-500" />;
      case "admin-dashboard":
      case "super-admin-dashboard":
        return <RiAdminLine className="text-red-500" />;
      case "manager-dashboard":
        return <RiUserSettingsLine className="text-orange-500" />;
      case "users":
        return <FiUsers className="text-green-500" />;
      case "projects":
        return <FiFolder className="text-yellow-500" />;
      default:
        return <FiFolder className="text-gray-500" />;
    }
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
      <div className="flex items-center space-x-1 text-sm font-medium mt-3">
        {/* Root Dashboard Link with hover effect */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center"
        >
          <Link
            to="/dashboard"
            className="flex items-center px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900 group"
          >
            <FiHome className="mr-1 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              Dashboard
            </span>
          </Link>
        </motion.div>

        {/* Dynamically Generated Breadcrumbs */}
        {pathnames
          .filter(
            (value, index) =>
              !(index === 0 && value.toLowerCase() === "dashboard")
          )
          .map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const displayName = formatBreadcrumb(value);
            const icon = getIcon(value);
            const isLast = index === pathnames.length - 1;

            // Add staggered animation delay based on index
            const delay = 0.1 + index * 0.1;

            return (
              <React.Fragment key={to}>
                {/* Chevron separator with subtle animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay }}
                >
                  <IoChevronForwardOutline className="text-gray-400 dark:text-gray-500" />
                </motion.div>

                {/* Breadcrumb item */}
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay }}
                  className="flex items-center"
                >
                  {isLast ? (
                    <span className="flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      <span className="mr-1">{icon}</span>
                      <span>{displayName}</span>
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="flex items-center px-2 py-1 rounded-md transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
                    >
                      <span className="mr-1 group-hover:scale-110 transition-transform">
                        {icon}
                      </span>
                      <span className="group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {displayName}
                      </span>
                    </Link>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 bg-white/95 dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Welcome message with pulse animation on mount */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm mb-2 md:mb-0 text-gray-600 dark:text-gray-300  mt-3"
      >
        Welcome back,{" "}
        <motion.span
          className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={mounted ? { scale: 1 } : { scale: 1 }}
          animate={mounted ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {userName ? capitalizeWords(userName) : "Guest"}{" "}
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            ({employeeId})
          </span>
        </motion.span>
      </motion.div>

      {/* Breadcrumbs */}
      <div className="hidden md:block overflow-x-auto w-full md:w-auto">
        {generateBreadcrumbs()}
      </div>
    </div>
  );
};

export default Breadcrumb;
