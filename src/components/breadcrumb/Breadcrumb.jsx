import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useAuthStore from "../../store/store";
import { capitalizeWords } from "../../utils/capitalize";

// Material-UI Components
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Material-UI Icons
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder"; // Default icon
// MUI Hook
import { useTheme } from "@mui/material/styles";

const Breadcrumb = () => {
  const location = useLocation();
  const theme = useTheme();
  // Access userName and permissionRole from Zustand store
  const userName = useAuthStore((state) => state.userName);
  const permissionRole = useAuthStore((state) => state.designation);

  // Function to format breadcrumb names
  const formatBreadcrumb = (name) => capitalizeWords(name.replace(/-/g, " "));

  // Function to get icon based on path segment
  const getIcon = (segment) => {
    switch (segment.toLowerCase()) {
      case "dashboard":
        return <HomeIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "settings":
        return <SettingsIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "admin-dashboard":
      case "super-admin-dashboard":
        return (
          <AdminPanelSettingsIcon fontSize="small" style={{ marginRight: 4 }} />
        );
      case "manager-dashboard":
        return (
          <SupervisorAccountIcon fontSize="small" style={{ marginRight: 4 }} />
        );
      case "users":
        return <PeopleIcon fontSize="small" style={{ marginRight: 4 }} />;
      case "projects":
        return <FolderIcon fontSize="small" style={{ marginRight: 4 }} />;
      default:
        return <FolderIcon fontSize="small" style={{ marginRight: 4 }} />; // Default icon
    }
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ display: "flex", alignItems: "center" }}
      >
        {/* Root Dashboard Link */}
        <Link
          component={RouterLink}
          to="/dashboard"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon fontSize="small" style={{ marginRight: 4 }} />
          Dashboard
        </Link>

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

            return isLast ? (
              <Typography
                key={to}
                color="text.primary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {icon}
                {displayName}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={to}
                key={to}
                color="inherit"
                sx={{ display: "flex", alignItems: "center" }}
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
    <div className="flex justify-between dark:bg-gray-700 dark:text-white items-center py-1  px-4 bg-gray-100 border-b ">
      <div className="text-sm">
        Welcome Back,{" "}
        <span className="font-semibold">
          {userName
            ? `${capitalizeWords(userName)} (${capitalizeWords
                 ( permissionRole )     })`: "Guest"}
        </span>
      </div>
      <div>{generateBreadcrumbs()}</div>
    </div>
  );
};

export default Breadcrumb;
