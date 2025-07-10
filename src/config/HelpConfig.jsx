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
  FaDiceD20,
  FaBookReader,
  FaBug,
  FaMoneyCheckAlt,
  FaGlobe,
  FaListAlt,
  FaFileSignature,
} from "react-icons/fa";
import HelpSection from "../components/common/HelpSection";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdTrackChanges } from "react-icons/md";
import { ChatBubble } from "@mui/icons-material";
import { LuFileCheck2 } from "react-icons/lu";
import { RiOrganizationChart } from "react-icons/ri";

export const helpConfigs = {
  // ------------------------------ Dashboard ------------------------------
  dashboardSuperEmployee: {
    title: "Super Employee Dashboard",
    description:
      "Provides a comprehensive overview of organizational metrics and employee activity tailored for super administrators or HR heads.",
    icon: FaHome,
    defaultExpanded: false,
    quickTips: [
      "Review overall organizational health",
      "Track real-time employee metrics",
      "Use widgets for detailed insights",
      "Navigate to detailed reports easily",
    ],
  },

  dashboardAllDashlets: {
    title: "All Dashlets",
    description:
      "View, manage, and customize all available dashlets within the dashboard environment for enhanced data visibility.",
    icon: FaChartBar,
    defaultExpanded: false,
    quickTips: [
      "Customize dashlets to fit your needs",
      "Click on dashlets for more details",
      "Drag and drop to reorganize dashlets",
      "Use filters to find specific data",
    ],
  },

  dashboardEmployee: {
    title: "Employee Dashboard",
    description:
      "Displays personalized performance insights, announcements, and pending actions specific to an individual employee.",
    icon: FaHome,
    defaultExpanded: false,
    quickTips: [
      "Track attendance and daily tasks",
      "Stay updated with team announcements",
      "Access performance and task insights",
      "Use quick links for easy navigation",
    ],
  },

  // ------------------------------ Synergy (Engagement) ------------------------------
  engagementFeed: {
    title: "Engagement Feed",
    description:
      "View and interact with all team updates, announcements, and feedback in one central feed.",
    icon: FaDiceD20,
    defaultExpanded: false,
    quickTips: [
      "Scroll to see recent engagement posts",
      "Like and reply to team updates",
      "Filter posts by category or team",
      "Share announcements and achievements",
    ],
  },

  engagementPermissionDashboard: {
    title: "Permission Dashboard",
    description:
      "Manage user access to the Engage system by assigning and reviewing permissions for each role.",
    icon: FaDiceD20,
    defaultExpanded: false,
    quickTips: [
      "Assign roles to manage content access",
      "Use search to find specific users",
      "Review permission logs regularly",
      "Update permissions as teams evolve",
    ],
  },

  // ------------------------------ Employee Management ------------------------------
  mainEmployeeManagement: {
    title: "Employee Management Dashboard",
    description: "View, search, and manage all employee records in one place.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Search employees by name or department",
      "Use filters to narrow your view",
      "Click on an employee to view details",
      "Perform bulk actions from the toolbar",
    ],
  },

  addEmployee: {
    title: "Add Employee",
    description: "Create a new employee record with roles and details.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Click Add Employee to open the form",
      "Fill in all required fields accurately",
      "Assign roles and permissions before saving",
      "Upload necessary documents using upload button",
    ],
  },

  addEmployeeManager: {
    title: "Add Employee Manager",
    description: "Assign a manager to one or more employees.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Select an employee to assign manager",
      "Choose a manager from the dropdown list",
      "Click Save to confirm the assignment",
      "Review manager changes in employee profile",
    ],
  },

  subordinatesEmployees: {
    title: "Subordinates",
    description: "View and supervise your direct reports and their status.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "View your direct reports list",
      "Click on subordinate for details",
      "Filter by role or department",
      "Export subordinate list if needed",
    ],
  },

  allEmployees: {
    title: "All Employees",
    description: "Browse and manage every employee across the organization.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Browse all employees organization-wide",
      "Use search to locate employees",
      "Apply filters for specific criteria",
      "Download employee list as CSV",
    ],
  },

  assetManagement: {
    title: "Asset Management",
    description: "Assign, track, and return assets for employees.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "View assigned assets per employee",
      "Assign new assets via form",
      "Use filters to find assets",
      "Return or reassign assets easily",
    ],
  },

  takeDisciplinaryActions: {
    title: "Take Disciplinary Actions",
    description:
      "Initiate and document disciplinary proceedings for employees.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Select employee for disciplinary action",
      "Describe the issue in the form",
      "Attach supporting documents if available",
      "Submit for manager approval",
    ],
  },

  allDisciplinaryActions: {
    title: "All Disciplinary Actions",
    description: "Review and track all recorded disciplinary cases.",
    icon: FaUsers,
    defaultExpanded: false,
    quickTips: [
      "Filter actions by status or date",
      "Click action for detailed view",
      "Export disciplinary records if needed",
      "Review past actions for compliance",
    ],
  },

  // ------------------------------ Attendance ------------------------------

  attendanceMain: {
    title: "Attendance Dashboard",
    description:
      "Track and manage overall employee attendance and punctuality.",
    icon: FaBookReader,
    defaultExpanded: false,
    quickTips: [
      "Scroll calendar to view attendance",
      "Filter by date and department",
      "Mark present or absent quickly",
      "Export attendance reports as CSV",
    ],
  },

  subordinatesAttendance: {
    title: "Subordinates Attendance",
    description: "Monitor attendance records for your direct reports.",
    icon: FaBookReader,
    defaultExpanded: false,
    quickTips: [
      "View attendance of your direct reports",
      "Filter by subordinate name or date",
      "Approve or reject absence requests",
      "Download subordinate attendance list",
    ],
  },

  viewAttendance: {
    title: "My Attendance",
    description: "View your personal attendance record and history.",
    icon: FaBookReader,
    defaultExpanded: false,
    quickTips: [
      "Review your daily attendance status",
      "Submit absence requests if necessary",
      "Correct attendance entries on error",
      "Download your attendance history report",
    ],
  },

  allEmployeeAttendance: {
    title: "All Employee Attendance",
    description: "Access attendance data for all employees organization-wide.",
    icon: FaBookReader,
    defaultExpanded: false,
    quickTips: [
      "Browse records for entire organization",
      "Use filters to refine employee data",
      "Export full attendance report CSV",
      "Monitor overall punctuality trends",
    ],
  },

  requestHikeAdvanceReimbursement: {
    title: "Hike Advance Reimbursement",
    description: "Request salary advances or reimbursements for hikes.",
    icon: FaBookReader,
    defaultExpanded: false,
    quickTips: [
      "Submit advance request for salary hike",
      "Attach supporting documents during request",
      "Track reimbursement status in dashboard",
      "Receive notifications for request updates",
    ],
  },

  // ------------------------------ Ticket Management ------------------------------

  manageTickets: {
    title: "Manage Tickets",
    description:
      "View and manage all tickets raised within your department. Assign, track, and resolve issues efficiently.",
    icon: FaBug,
    defaultExpanded: false,
    quickTips: [
      "Filter tickets by status or priority",
      "Assign tickets to team members",
      "Track ticket progress easily",
      "Resolve tickets and update status",
    ],
  },

  raiseTicket: {
    title: "Raise Ticket",
    description:
      "Submit new support requests by raising tickets. Provide detailed descriptions to expedite resolution.",
    icon: FaBug,
    defaultExpanded: false,
    quickTips: [
      "Click Raise Ticket to open form",
      "Describe issue in detail",
      "Attach supporting files",
      "Monitor ticket status updates",
    ],
  },

  allTickets: {
    title: "All Tickets",
    description:
      "Browse all tickets across the organization. View status, priority, and assignments at a glance.",
    icon: FaBug,
    defaultExpanded: false,
    quickTips: [
      "Search tickets by keyword or ID",
      "Use filters to narrow results",
      "Bulk update ticket statuses",
      "Export ticket lists as CSV",
    ],
  },

  poshManage: {
    title: "POSH Manage",
    description:
      "Manage POSH (Prevention of Sexual Harassment) cases. Track investigations and ensure confidentiality.",
    icon: FaBug,
    defaultExpanded: false,
    quickTips: [
      "View POSH cases by status",
      "Assign investigators to cases",
      "Track case progress",
      "Ensure confidentiality of records",
    ],
  },

  filePosh: {
    title: "File POSH",
    description:
      "File a POSH complaint by submitting harassment details securely and confidentially.",
    icon: FaBug,
    defaultExpanded: false,
    quickTips: [
      "Complete POSH complaint form accurately",
      "Provide incident details",
      "Attach evidence documents",
      "Track complaint status securely",
    ],
  },

  // ------------------------------ Payroll ------------------------------

  payrollMain: {
    title: "Payroll Dashboard",
    description: "Overview of payroll statuses, schedules, and summaries.",
    icon: FaMoneyCheckAlt,
    defaultExpanded: false,
    quickTips: [
      "View upcoming payroll schedules",
      "Track payment statuses easily",
      "Filter by pay period or employee",
      "Export payroll data for records",
    ],
  },

  managePayroll: {
    title: "Manage Payroll",
    description: "Configure and run payroll calculations for employees.",
    icon: FaMoneyCheckAlt,
    defaultExpanded: false,
    quickTips: [
      "Select pay period to calculate payroll",
      "Review calculation summary before processing",
      "Adjust settings for deductions and benefits",
      "Approve payroll to finalize payments",
    ],
  },

  manageClaims: {
    title: "Manage Claims",
    description:
      "Process and track employee payroll claims and reimbursements.",
    icon: FaMoneyCheckAlt,
    defaultExpanded: false,
    quickTips: [
      "View submitted claims and statuses",
      "Verify claim details before approval",
      "Approve or reject claims promptly",
      "Export claim reports for auditing",
    ],
  },

  // ------------------------------ Task Management ------------------------------

  taskMain: {
    title: "Task Management Dashboard",
    description: "Overview of all tasks across projects and teams.",
    icon: FaTasks,
    defaultExpanded: false,
    quickTips: [
      "See all tasks at a glance",
      "Filter tasks by status or assignee",
      "Create new tasks easily",
      "Switch views for different timelines",
    ],
  },

  viewDailyTask: {
    title: "View Daily Tasks",
    description: "Review and update the tasks assigned for today.",
    icon: FaTasks,
    defaultExpanded: false,
    quickTips: [
      "View today’s assigned tasks",
      "Update task progress status",
      "Use filters to find tasks",
      "Complete or postpone tasks quickly",
    ],
  },

  assignTask: {
    title: "Assign Tasks",
    description:
      "Delegate tasks to team members with priorities and deadlines.",
    icon: FaTasks,
    defaultExpanded: false,
    quickTips: [
      "Assign tasks to subordinates",
      "Set due dates and priorities",
      "Add detailed instructions to tasks",
      "Track assignment history easily",
    ],
  },

  assignedTask: {
    title: "Assigned Tasks",
    description: "Check the tasks that have been assigned to you.",
    icon: FaTasks,
    defaultExpanded: false,
    quickTips: [
      "View tasks assigned to you",
      "Check deadline and progress",
      "Reassign or delegate tasks",
      "Mark tasks as completed",
    ],
  },

  dailyTask: {
    title: "Daily Task Overview",
    description: "Monitor the day’s tasks for your team members.",
    icon: FaTasks,
    defaultExpanded: false,
    quickTips: [
      "See subordinate tasks for today",
      "Monitor daily task completion rates",
      "Provide feedback on task status",
      "Export daily task reports",
    ],
  },
  // ------------------------------ Recruit Management ------------------------------

  recruitmentMain: {
    title: "Recruitment Dashboard",
    description: "Overview of recruitment activities and job postings.",
    icon: FaFileAlt,
    defaultExpanded: false,
    quickTips: [
      "View all active vacancies",
      "Track candidate application status",
      "Filter candidates by skills or location",
      "Export recruitment reports as CSV",
    ],
  },

  allVacancies: {
    title: "All Vacancies",
    description: "Browse and filter all job vacancies organization-wide.",
    icon: FaFileAlt,
    defaultExpanded: false,
    quickTips: [
      "Use filters to narrow vacancy search",
      "Click vacancy to view details",
      "Close or reopen vacancies as needed",
      "Export vacancy list for reports",
    ],
  },

  createVacancy: {
    title: "Create Vacancy",
    description: "Post new job vacancies with role details and requirements.",
    icon: FaFileAlt,
    defaultExpanded: false,
    quickTips: [
      "Click Create Vacancy to open form",
      "Fill in job title and description",
      "Set required skills and experience",
      "Publish vacancy or save as draft",
    ],
  },

  referralList: {
    title: "Referral List",
    description: "Manage employee referrals and track referral statuses.",
    icon: FaFileAlt,
    defaultExpanded: false,
    quickTips: [
      "View all referred candidates list",
      "Add new referral with candidate details",
      "Track referral approval and rewards",
      "Filter referrals by status or date",
    ],
  },

  vacanciesList: {
    title: "Vacancies List",
    description: "Manage and update existing job vacancies.",
    icon: FaFileAlt,
    defaultExpanded: false,
    quickTips: [
      "Edit vacancy details or requirements",
      "Archive filled or outdated vacancies",
      "Reopen vacancies to accept applications",
      "Use search to locate vacancies",
    ],
  },

  // KPI Quant-Qualitative according to Razor company in this only set kpis daily and weekely,monthly yearly calculated automatically

  empPerformanceAnalytics: {
    title: "Employee Performance Analytics",
    description:
      "View aggregated performance data across all employees with quantitative and qualitative metrics.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "View performance trends organization-wide",
      "Compare team KPIs over time",
      "Filter metrics by date range",
      "Export analytics reports easily",
    ],
  },

  setKPIs: {
    title: "Set KPIs",
    description:
      "Define and configure quantitative and qualitative KPIs for teams and individuals.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "Select KPI type and targets",
      "Assign KPIs to team members",
      "Set measurement periods clearly",
      "Save and activate new KPIs",
    ],
  },

  rateTeamMembers: {
    title: "Rate Team Members",
    description:
      "Evaluate individual team member performance against defined KPIs.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "Select team member to rate",
      "Enter rating scores and comments",
      "Compare ratings against targets",
      "Submit ratings for review",
    ],
  },

  teamPerformanceAnalytics: {
    title: "Team Performance Analytics",
    description: "Analyze team-level performance metrics and KPI achievements.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "View team-level KPI summaries",
      "Drill down into individual metrics",
      "Use filters for specific teams",
      "Export team analytics data",
    ],
  },

  teamMembersPerformance: {
    title: "Team Members Performance",
    description:
      "Review performance outcomes for individual team members in aggregate.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "Browse individual performance records",
      "Compare member achievements",
      "Filter by performance category",
      "Download performance summaries",
    ],
  },

  myPerformance: {
    title: "My Performance",
    description: "Monitor your own performance metrics and KPI progress.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "View your KPI achievements",
      "Track personal performance trends",
      "Set goals for improvement",
      "Download your performance report",
    ],
  },

  allEmployeesRating: {
    title: "All Employees Ratings",
    description:
      "Overview of rating scores for all employees across the organization.",
    icon: GrDocumentPerformance,
    defaultExpanded: false,
    quickTips: [
      "View ratings by employee",
      "Filter ratings by department",
      "Compare performance scores easily",
      "Export rating reports",
    ],
  },
  // ------------------------------ Analytics RACI ------------------------------

  companyAnalyticsMain: {
    title: "Company Analytics Dashboard",
    description: "View RACI roles and business metrics in one place.",
    icon: FaGlobe,
    defaultExpanded: false,
    quickTips: [
      "View overall RACI assignments",
      "Filter by department or team",
      "Drill into specific data sets",
      "Export analytics for reports",
    ],
  },

  raciBusiness: {
    title: "RACI Business Analytics",
    description:
      "Analyze RACI roles and responsibilities at the business level.",
    icon: FaGlobe,
    defaultExpanded: false,
    quickTips: [
      "View business unit RACI roles",
      "Filter by stakeholder or department",
      "Identify role gaps quickly",
      "Download business RACI reports",
    ],
  },

  raciOperations: {
    title: "RACI Operations Analytics",
    description: "Monitor RACI roles and processes at the operational level.",
    icon: FaGlobe,
    defaultExpanded: false,
    quickTips: [
      "View operations RACI assignments",
      "Analyze process accountability metrics",
      "Identify operational bottlenecks",
      "Download operations RACI data",
    ],
  },

  // ------------------------------ Company Settings ------------------------------

  companyInfo: {
    title: "Company Info",
    description: "View and edit your company's core details and profile.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Edit company name and logo",
      "Update address and contact info",
      "View registration and license details",
      "Download company profile PDF",
    ],
  },

  companySettings: {
    title: "Company Settings",
    description: "Adjust global company preferences and operational settings.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Configure timezones and locales",
      "Set default user roles",
      "Manage notification preferences",
      "Enable or disable features",
    ],
  },

  addHierarchy: {
    title: "Add Hierarchy",
    description:
      "Create and manage your organizational structure and reporting lines.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Add new departments or teams",
      "Define manager reporting relationships",
      "Reorder hierarchy levels easily",
      "View hierarchy tree visually",
    ],
  },

  updatePolicies: {
    title: "Update Policies",
    description: "Edit, publish, and archive company policies and guidelines.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Upload new policy documents",
      "Set policy effective dates",
      "Notify employees of updates",
      "Archive outdated policies",
    ],
  },

  updateInduction: {
    title: "Update Induction",
    description: "Manage induction presentations and materials for new hires.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Upload induction PPTs",
      "Schedule induction sessions",
      "Assign induction to new hires",
      "Track completion status",
    ],
  },

  updateTrainingMaterials: {
    title: "Update Training Materials",
    description: "Organize and maintain all employee training resources.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Upload training manuals",
      "Categorize materials by topic",
      "Schedule training sessions",
      "Monitor training progress",
    ],
  },

  productivityLensSettings: {
    title: "Productivity Lens Settings",
    description: "Configure productivity lens parameters and break schedules.",
    icon: FaCog,
    defaultExpanded: false,
    quickTips: [
      "Set work and break intervals",
      "Adjust productivity thresholds",
      "Enable focus mode alerts",
      "View break usage reports",
    ],
  },

  // ------------------------------ Productivity Lenses ------------------------------

  productivityMain: {
    title: "Productivity Overview",
    description: "Get a high-level view of productivity metrics and trends.",
    icon: MdTrackChanges,
    defaultExpanded: false,
    quickTips: [
      "View overall productivity summary",
      "Filter metrics by date range",
      "Customize dashboard widgets quickly",
      "Export productivity data reports",
    ],
  },

  productivityDashboard: {
    title: "Productivity Dashboard",
    description:
      "Explore detailed reports on individual and team productivity metrics.",
    icon: MdTrackChanges,
    defaultExpanded: false,
    quickTips: [
      "Select metrics to display",
      "Use graphs for trend analysis",
      "Apply filters for specificity",
      "Download dashboard data easily",
    ],
  },

  teamProductivity: {
    title: "Team Productivity",
    description:
      "Monitor productivity levels and trends for your team as a whole.",
    icon: MdTrackChanges,
    defaultExpanded: false,
    quickTips: [
      "View team performance trends",
      "Compare team members easily",
      "Filter teams by project",
      "Generate team reports quickly",
    ],
  },

  allEmployeeProductivity: {
    title: "All Employee Productivity",
    description:
      "Browse productivity metrics for all employees in the organization.",
    icon: MdTrackChanges,
    defaultExpanded: false,
    quickTips: [
      "Search employees by name",
      "Filter by department quickly",
      "View individual productivity stats",
      "Export employee metrics CSV",
    ],
  },

  subordinateProductivity: {
    title: "Subordinate Productivity",
    description:
      "Check productivity details and reports for your direct reports.",
    icon: MdTrackChanges,
    defaultExpanded: false,
    quickTips: [
      "View subordinate productivity scores",
      "Filter by date or metric",
      "Compare subordinate performance easily",
      "Export subordinate reports quickly",
    ],
  },
  // ------------------------------ Chats ------------------------------
  chats: {
    title: "Team Chat",
    description: "Send and receive messages with your teammates in real time.",
    icon: ChatBubble,
    defaultExpanded: false,
    quickTips: [
      "Select a conversation to view messages",
      "Use @mentions to notify teammates",
      "Share files and images in chat",
      "Search chat history for keywords",
    ],
  },

  // ------------------------------ Leaves Management ------------------------------

  leavesHistory: {
    title: "Leaves History",
    description:
      "View your leave applications, statuses, and history in one place.",
    icon: FaListAlt,
    defaultExpanded: false,
    quickTips: [
      "View past leave records",
      "Filter by date range",
      "Request new leave quickly",
      "Export your leave history",
    ],
  },

  manageLeaves: {
    title: "Manage Leaves",
    description:
      "Approve, reject, and comment on leave requests from your team.",
    icon: FaListAlt,
    defaultExpanded: false,
    quickTips: [
      "View pending leave requests",
      "Approve or reject requests",
      "Filter requests by employee",
      "Add comments to requests",
    ],
  },

  allSubordinateLeaves: {
    title: "All Subordinate Leaves",
    description: "Browse and export leave records for all your subordinates.",
    icon: FaListAlt,
    defaultExpanded: false,
    quickTips: [
      "Browse subordinate leave records",
      "Filter by status or date",
      "Search leaves by employee name",
      "Export subordinate leave data",
    ],
  },
  // ------------------------------ Resignation & FNF ------------------------------

  resignationDashboard: {
    title: "Resignation Dashboard",
    description: "View and track employee resignation requests and histories.",
    icon: LuFileCheck2,
    defaultExpanded: false,
    quickTips: [
      "View pending resignation requests",
      "Track resignation processing status",
      "Filter by department or date",
      "Export resignation history reports",
    ],
  },

  submitResignation: {
    title: "Submit Resignation",
    description: "Initiate your resignation by submitting a formal request.",
    icon: LuFileCheck2,
    defaultExpanded: false,
    quickTips: [
      "Click submit to start process",
      "Provide your effective resignation date",
      "Attach resignation letter document",
      "Monitor request approval status",
    ],
  },

  resignationApprovals: {
    title: "Resignation Approvals",
    description: "Approve or reject employee resignation submissions.",
    icon: LuFileCheck2,
    defaultExpanded: false,
    quickTips: [
      "Review resignation details thoroughly",
      "Approve or reject requests promptly",
      "Provide feedback or comments",
      "Track approval history and logs",
    ],
  },

  hrFnfApprovals: {
    title: "HR FNF Approvals",
    description:
      "Manage Full and Final settlement approvals for departing employees.",
    icon: LuFileCheck2,
    defaultExpanded: false,
    quickTips: [
      "Review FNF settlement calculations",
      "Approve or adjust final payouts",
      "Verify pending financial clearances",
      "Ensure documentation completeness",
    ],
  },

  // ------------------------------ Policies & Induction ------------------------------

  inductionPPTs: {
    title: "Induction Presentations",
    description:
      "Access and review induction PowerPoint materials for new hires.",
    icon: FaFileSignature,
    defaultExpanded: false,
    quickTips: [
      "Browse available induction slide decks",
      "Click slide to view full presentation",
      "Download PPT for offline review",
      "Share induction materials with new hires",
    ],
  },

  companyPolicies: {
    title: "Company Policies",
    description: "View, update, and acknowledge corporate policy documents.",
    icon: FaFileSignature,
    defaultExpanded: false,
    quickTips: [
      "Search policies by category",
      "Download policy documents easily",
      "Acknowledge policies after reading",
      "Track policy update history",
    ],
  },

  trainingMaterial: {
    title: "Training Materials",
    description:
      "Access training resources and materials for employee development.",
    icon: FaFileSignature,
    defaultExpanded: false,
    quickTips: [
      "Browse training modules by topic",
      "Complete online training courses",
      "Download reference guides",
      "Track your training progress",
    ],
  },

  // ------------------------------ Organization Chart ------------------------------
    organizationChart: {
    title: "Organization Chart",
    description: "View and explore your company's hierarchy and reporting lines.",
    icon: RiOrganizationChart,
    defaultExpanded: false,
    quickTips: [
      "View hierarchical structure visually",
      "Expand nodes for more details",
      "Search by name or department",
      "Download chart as image"
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
