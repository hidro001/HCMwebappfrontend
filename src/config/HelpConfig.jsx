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
  FaBell
} from "react-icons/fa";
import HelpSection from "../components/common/HelpSection";

export const helpConfigs = {
  subordinatesEmployees: {
    title: "Team Management Dashboard",
    description: "This page allows you to view and manage your subordinates and team members. You can monitor employee status, update information, and perform various management tasks efficiently.",
    icon: FaUsers,
    defaultExpanded: false,
    className: "",
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Monitor your team's performance and status",
      "Assign tasks and track progress",
      "Review team member profiles and updates"
    ]
  },
  
  allEmployees: {
    title: "All Employee Management Dashboard",
    description: "This page allows you to view and manage all employees in the organization. You can monitor employee status, update information, and perform various management tasks efficiently.",
    icon: FaUsers,
    defaultExpanded: false,
    className: "",
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Search employees by name, department, or role",
      "Use filters to find specific employee groups",
      "Export employee data for reporting purposes"
    ]
  },

  analyticsDashboard: {
    title: "Analytics & Reports Dashboard",
    description: "View comprehensive analytics, generate reports, and track key performance indicators. Use the filters and date ranges to customize your data visualization.",
    icon: FaChartBar,
    defaultExpanded: false,
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Use date filters to customize report periods",
      "Export charts and data for presentations",
      "Set up automated report scheduling"
    ]
  },

  systemSettings: {
    title: "System Settings & Configuration",
    description: "Configure application preferences, manage user permissions, and customize system behavior. Changes are automatically saved and will take effect immediately.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Changes are automatically saved",
      "Use the search function to find specific settings",
      "Configure user permissions and access levels"
    ]
  },
  
  AllTickets: {
    title: "All Tickets Dashboard",
    description: "View and manage all tickets raised within the organization. You can track ticket status, assign tickets to team members, and generate reports.",
    icon: FaClipboardList,
    defaultExpanded: false,
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Filter tickets by status, priority, or department",
      "Click on any ticket to view detailed information",
      "Use bulk actions for managing multiple tickets"
    ]
  },
  ManageTickets: {
    title: "Manage Tickets",
    description: "View and manage all tickets raised within the Own Department. You can track ticket status, assign tickets to team members, and generate reports.",
    icon: FaClipboardList,
    defaultExpanded: false,
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Filter tickets by status, priority, or department",
      "Click on any ticket to view detailed information",
      "Use bulk actions for managing multiple tickets"
    ]
  },
  RaiseTickets: {
    title: "Raise Tickets",
    description: "Submit new tickets for issues or requests within any Department. Provide detailed information to help resolve your issue quickly.",
    icon: FaClipboardList,
    defaultExpanded: false,
    quickTips: [
      "Use the tabs above to navigate between different sections",
      "Click on any tab to switch views quickly",
      "Use horizontal scroll or arrow buttons when tabs overflow",
      "Filter tickets by status, priority, or department",
      "Click on any ticket to view detailed information",
      "Use bulk actions for managing multiple tickets"
    ]
  },
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