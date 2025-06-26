// helpConfig.js
import React from "react";
import { 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaFileAlt, 
  FaCalendarAlt,
  FaDollarSign,
  FaUserTie,
  FaBuilding,
  FaTasks,
  FaClipboardList,
  FaUserClock,
  FaBell
} from "react-icons/fa";
import HelpSection from "../components/common/HelpSection";


export const helpConfigs = {
  subordinatesEmployees: {
    title: "Team Management Dashboard",
    description: "This page allows you to view and manage your subordinates and team members. You can monitor employee status, update information, and perform various management tasks efficiently.",
    icon: FaUsers,
    defaultExpanded: false,
    className: ""
  },
  
  allEmployees: {
    title: "All Employee Management Dashboard",
    description: "This page allows you to view and manage all employees in the organization. You can monitor employee status, update information, and perform various management tasks efficiently.",
    icon: FaUsers,
    defaultExpanded: false,
    className: ""
  },

  analyticsDashboard: {
    title: "Analytics & Reports Dashboard",
    description: "View comprehensive analytics, generate reports, and track key performance indicators. Use the filters and date ranges to customize your data visualization.",
    icon: FaChartBar,
    defaultExpanded: false
  },

  systemSettings: {
    title: "System Settings & Configuration",
    description: "Configure application preferences, manage user permissions, and customize system behavior. Changes are automatically saved and will take effect immediately.",
    icon: FaCog,
    defaultExpanded: false
  }
};

// Helper function to render help section from config
export const renderHelpSection = (configKey) => {
  const config = helpConfigs[configKey];
  if (!config) return null;
  
  return (
    <HelpSection
      title={config.title}
      description={config.description}
      icon={config.icon}
      defaultExpanded={config.defaultExpanded}
      className={config.className}
    />
  );
};