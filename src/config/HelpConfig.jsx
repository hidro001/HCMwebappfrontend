// // helpConfig.js
// import React from "react";
// import { 
//   FaUsers, 
//   FaChartBar, 
//   FaCog, 
//   FaFileAlt, 
//   FaCalendarAlt,
//   FaDollarSign,
//   FaUserTie,
//   FaBuilding,
//   FaTasks,
//   FaClipboardList,
//   FaUserClock,
//   FaBell
// } from "react-icons/fa";
// import HelpSection from "../components/common/HelpSection";
// import { all } from "axios";


// export const helpConfigs = {
//   subordinatesEmployees: {
//     title: "Team Management Dashboard",
//     description: "This page allows you to view and manage your subordinates and team members. You can monitor employee status, update information, and perform various management tasks efficiently.",
//     icon: FaUsers,
//     defaultExpanded: false,
//     className: ""
//   },
  
//   allEmployees: {
//     title: "All Employee Management Dashboard",
//     description: "This page allows you to view and manage all employees in the organization. You can monitor employee status, update information, and perform various management tasks efficiently.",
//     icon: FaUsers,
//     defaultExpanded: false,
//     className: ""
//   },

//   analyticsDashboard: {
//     title: "Analytics & Reports Dashboard",
//     description: "View comprehensive analytics, generate reports, and track key performance indicators. Use the filters and date ranges to customize your data visualization.",
//     icon: FaChartBar,
//     defaultExpanded: false
//   },

//   systemSettings: {
//     title: "System Settings & Configuration",
//     description: "Configure application preferences, manage user permissions, and customize system behavior. Changes are automatically saved and will take effect immediately.",
//     icon: FaCog,
//     defaultExpanded: false
//   },
//   allTickets: {
//     title: "All Tickets Dashboard",
//     description: "View and manage all tickets raised within the organization. You can track ticket status, assign tickets to team members, and generate reports.",
//     icon: FaClipboardList,
//     defaultExpanded: false
//   },
// };

// // Helper function to render help section from config
// export const renderHelpSection = (configKey) => {
//   const config = helpConfigs[configKey];
//   if (!config) return null;
  
//   return (
//     <HelpSection
//       title={config.title}
//       description={config.description}
//       icon={config.icon}
//       defaultExpanded={config.defaultExpanded}
//       className={config.className}
//     />
//   );
// };



// import React from "react";
// import { 
//   FaUsers, 
//   FaChartBar, 
//   FaCog, 
//   FaFileAlt, 
//   FaCalendarAlt,
//   FaDollarSign,
//   FaUserTie,
//   FaBuilding,
//   FaTasks,
//   FaClipboardList,
//   FaUserClock,
//   FaBell
// } from "react-icons/fa";
// import HelpSection from "../components/common/HelpSection";

// export const helpConfigs = {
//   subordinatesEmployees: {
//     title: "Team Management Dashboard",
//     description: "This page allows you to view and manage your subordinates and team members. You can monitor employee status, update information, and perform various management tasks efficiently.",
//     icon: FaUsers,
//     defaultExpanded: false,
//     className: ""
//   },
  
//   allEmployees: {
//     title: "All Employee Management Dashboard",
//     description: "This page allows you to view and manage all employees in the organization. You can monitor employee status, update information, and perform various management tasks efficiently.",
//     icon: FaUsers,
//     defaultExpanded: false,
//     className: ""
//   },

//   analyticsDashboard: {
//     title: "Analytics & Reports Dashboard",
//     description: "View comprehensive analytics, generate reports, and track key performance indicators. Use the filters and date ranges to customize your data visualization.",
//     icon: FaChartBar,
//     defaultExpanded: false
//   },

//   systemSettings: {
//     title: "System Settings & Configuration",
//     description: "Configure application preferences, manage user permissions, and customize system behavior. Changes are automatically saved and will take effect immediately.",
//     icon: FaCog,
//     defaultExpanded: false
//   },
  
//   allTickets: {
//     title: "All Tickets Dashboard",
//     description: "View and manage all tickets raised within the organization. You can track ticket status, assign tickets to team members, and generate reports.",
//     icon: FaClipboardList,
//     defaultExpanded: false
//   },
// };

// // Helper function to render help section from config
// export const renderHelpSection = (configKey, dropdownMode = false) => {
//   const config = helpConfigs[configKey];
//   if (!config) return null;
  
//   return (
//     <HelpSection
//       title={config.title}
//       description={config.description}
//       icon={config.icon}
//       defaultExpanded={config.defaultExpanded}
//       className={config.className}
//       dropdownMode={dropdownMode}
//     />
//   );
// };


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
  FaBell,
  FaHome,
  FaDiceD20
} from "react-icons/fa";
import HelpSection from "../components/common/HelpSection";

export const helpConfigs = {
dashboardSuperEmployee: {
    title: "Super Employee Dashboard",
    description: "Provides a comprehensive overview of organizational metrics and employee activity tailored for super administrators or HR heads.",
    icon: FaHome,
    defaultExpanded: false,
    quickTips: [
      "Review overall organizational health",
      "Track real-time employee metrics",
      "Use widgets for detailed insights",
      "Navigate to detailed reports easily"
    ]
  },

  dashboardAllDashlets: {
    title: "All Dashlets",
    description: "View, manage, and customize all available dashlets within the dashboard environment for enhanced data visibility.",
    icon: FaChartBar,
    defaultExpanded: false,
    quickTips: [
      "Customize dashlets to fit your needs",
      "Click on dashlets for more details",
      "Drag and drop to reorganize dashlets",
      "Use filters to find specific data"
    ]
  },

  dashboardEmployee: {
    title: "Employee Dashboard",
    description: "Displays personalized performance insights, announcements, and pending actions specific to an individual employee.",
    icon: FaHome,
    defaultExpanded: false,
    quickTips: [
      "Track attendance and daily tasks",
      "Stay updated with team announcements",
      "Access performance and task insights",
      "Use quick links for easy navigation"
    ]
  },
   engagementFeed: {
    title: "Engagement Feed",
    description: "View and interact with all team updates, announcements, and feedback in one central feed.",
    icon: FaDiceD20,
    defaultExpanded: false,
    quickTips: [
      "Scroll to see recent engagement posts",
      "Like and reply to team updates",
      "Filter posts by category or team",
      "Share announcements and achievements"
    ]
  },

  engagementPermissionDashboard: {
    title: "Permission Dashboard",
    description: "Manage user access to the Engage system by assigning and reviewing permissions for each role.",
    icon: FaDiceD20,
    defaultExpanded: false,
    quickTips: [
      "Assign roles to manage content access",
      "Use search to find specific users",
      "Review permission logs regularly",
      "Update permissions as teams evolve"
    ]
  }
};

// Helper function to render help section from config
export const renderHelpSection = (configKey, dropdownMode = false) => {
  const config = helpConfigs[configKey];
  if (!config) return null;
  
  return (
    <HelpSection
      title={config.title}
      description={config.description}
      icon={config.icon}
      defaultExpanded={config.defaultExpanded}
      className={config.className}
      quickTips={config.quickTips}
      dropdownMode={dropdownMode}
    />
  );
};