// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Breadcrumb = () => {
//   const location = useLocation();

//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split("/").filter((x) => x);
//     return (
//       <nav className="text-sm text-gray-600">
//         <Link to="/" className="text-gray-800 hover:underline">
//           Dashboard
//         </Link>
//         {pathnames.map((value, index) => {
//           const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//           return (
//             <span key={to}>
//               {" / "}
//               <Link to={to} className="text-blue-500 hover:underline">
//                 {value}
//               </Link>
//             </span>
//           );
//         })}
//       </nav>
//     );
//   };

//   return (
//     <div className="flex justify-between dark:bg-gray-800 dark:text-white items-center p-4 bg-gray-100 border-b">
//       <div className="text-sm">
//         Welcome,{" "}
//         <span className="font-semibold">Sameer Hameed (super-admin)</span>
//       </div>
//       <div>{generateBreadcrumbs()}</div>
//     </div>
//   );
// };

// export default Breadcrumb;

// // src/components/Breadcrumb.js
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import useAuthStore from '../../store/store';
// import { capitalizeWords } from '../../utils/capitalize'; // Import the utility function
// const Breadcrumb = () => {
//   const location = useLocation();

//   // Access userName and permissionRole from Zustand store
//   const userName = useAuthStore((state) => state.userName);
//   const permissionRole = useAuthStore((state) => state.permissionRole);

//   // Function to format breadcrumb names
//   const formatBreadcrumb = (name) => {
//     return name
//       .split(/[-_]/)
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   // const generateBreadcrumbs = () => {
//   //   const pathnames = location.pathname.split("/").filter((x) => x);
//   //   return (
//   //     <nav className="text-sm text-gray-600">
//   //       <Link to="/" className="text-gray-800 hover:underline flex items-center">
//   //         Dashboard
//   //       </Link>

//   //       {pathnames.map((value, index) => {
//   //         const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//   //         const displayName = formatBreadcrumb(value);
//   //         return (
//   //           <span key={to}>
//   //             {" / "}
//   //             <Link to={to} className="text-blue-500 hover:underline flex items-center">
//   //               {displayName}
//   //             </Link>
//   //           </span>
//   //         );
//   //       })}
//   //     </nav>
//   //   );
//   // };
//   const generateBreadcrumbs = () => {
//     const pathnames = location.pathname.split("/").filter((x) => x);

//     // Skip the first path if it's already "Dashboard"
//     const pathSegments = pathnames.slice(1);

//     return (
//       <nav className="text-sm text-gray-600">
//         <Link to="/" className="text-gray-800 hover:underline flex items-center">
//           Dashboard
//         </Link>
//         {pathSegments.map((value, index) => {
//           const to = `/${pathnames.slice(0, index + 2).join("/")}`;
//           const displayName = formatBreadcrumb(value);
//           return (
//             <span key={to}>
//               {" / "}
//               <Link to={to} className="text-blue-500 hover:underline flex items-center">
//                 {displayName}
//               </Link>
//             </span>
//           );
//         })}
//       </nav>
//     );
//   };

//   return (
//     <div className="flex justify-between dark:bg-gray-800 dark:text-white items-center p-4 bg-gray-100 border-b">
//       <div className="text-sm">
//         Welcome,{" "}
//         <span className="font-semibold">
//           {userName ? `${capitalizeWords(userName)} (${capitalizeWords(permissionRole)})` : "Guest"}
//         </span>
//       </div>
//       <div>{generateBreadcrumbs()}</div>
//     </div>
//   );
// };

// export default Breadcrumb;

// src/components/Breadcrumb.js
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuthStore from "../../store/store";
import { capitalizeWords } from "../../utils/capitalize"; // Import the utility function

// Material-UI Components
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Tooltip from "@mui/material/Tooltip";

// Material-UI Icons
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder"; // Default icon

const Breadcrumb = () => {
  const location = useLocation();

  // Access userName and permissionRole from Zustand store
  const userName = useAuthStore((state) => state.userName);
  const permissionRole = useAuthStore((state) => state.permissionRole);

  // Function to format breadcrumb names
  const formatBreadcrumb = (name) => {
    return capitalizeWords(name);
  };

  // Function to get icon based on path segment
  const getIcon = (segment) => {
    switch (segment.toLowerCase()) {
      case "dashboard":
        return <HomeIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "settings":
        return <SettingsIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "admin-dashboard":
        return (
          <AdminPanelSettingsIcon fontSize="small" style={{ marginRight: 4 }} />
        );
      case "manager-dashboard":
        return (
          <SupervisorAccountIcon fontSize="small" style={{ marginRight: 4 }} />
        );
      case "super-admin-dashboard":
        return (
          <AdminPanelSettingsIcon fontSize="small" style={{ marginRight: 4 }} />
        );
      case "users":
        return <PeopleIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "projects":
        return <FolderIcon fontSize="small" style={{ marginRight: 4 }} />;
      // Add more cases as needed for other routes
      default:
        return <PeopleIcon fontSize="small" style={{ marginRight: 4 }} />; // Default icon
    }
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Skip the first path if it's already "Dashboard"
    const pathSegments = pathnames.slice(1);

    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        className="text-sm text-gray-600"
      >
        {/* Dashboard Link with Home Icon */}
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
          aria-label="Go to Dashboard"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Dashboard
        </Link>
        {pathSegments.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 2).join("/")}`;
          const displayName = formatBreadcrumb(value);
          const icon = getIcon(value);

          // Determine if it's the last breadcrumb
          const isLast = index === pathSegments.length - 1;

          return isLast ? (
            <Typography
              key={to}
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
              aria-current="page"
            >
              {icon}
              {displayName}
            </Typography>
          ) : (
            <Link
              component={RouterLink}
              to={to}
              key={to}
              underline="hover"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
              aria-label={`Go to ${displayName}`}
            >
              {icon}
              {displayName}
            </Link>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <div className="flex justify-between dark:bg-gray-800 dark:text-white items-center p-4 bg-gray-100 border-b">
      <div className="text-sm">
        Welcome Back,{" "}
        <span className="font-semibold">
          {userName
            ? `${capitalizeWords(userName)} (${capitalizeWords(
                permissionRole
              )})`
            : "Guest"}
        </span>
      </div>
      <div>{generateBreadcrumbs()}</div>
    </div>
  );
};

export default Breadcrumb;
