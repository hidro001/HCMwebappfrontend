// src/config/menuConfig.js

import {
  FaHome,
  FaTasks,
  FaClipboard,
  FaBullhorn,
  FaUsers,
  FaBug,
  FaUserCircle,
  FaBook,
  FaFileAlt,
  FaFileSignature,
  FaGlobe,
  FaMoneyCheckAlt,
  FaListAlt,
  FaCog,
  FaBookReader,
  FaDiceD20,
} from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdTrackChanges, MdModelTraining } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { LuFileCheck2 } from "react-icons/lu";
import { ChatBubble } from "@mui/icons-material";
import { BiCurrentLocation } from "react-icons/bi";

export const menuItems = [
  // ------------------------------ Dashboard ------------------------------
  {
    name: "Dashboard",
    tooltip: "",
    icon: <FaHome />,
    color: "text-blue-400",
    iconAnimation: { scale: 1.2 },
    options: [
      {
        name: "Dashboard",
        link: "/dashboard/super-employee-dashboard",
        permission: "dashboard-super",
      },
      {
        // repeated "superAdminRaci" => made unique
        name: "All Dashlets",
        link: "/dashboard/all-dashlets",
        permission: "dashboard-all-dashlets",
        textAnimation: { x: 10 },
      },
      {
        name: "Dashboard",
        link: "/dashboard/employee",
        permission: "dashboard-employee",
      },
    ],
  },

  // ------------------------------ Announcements ------------------------------
  {
    name: "Announcements",
    tooltip:
      "Stay up to date! Click here to view important news and announcements",
    icon: <FaBullhorn />,
    color: "text-yellow-400",
    iconAnimation: { x: 7 },
    options: [
      {
        name: "Create Announcement",
        link: "/dashboard/add-announcement",
        permission: "announcement-create",
      },
      {
        name: "View Announcement",
        link: "/dashboard/view-announcement",
        permission: "announcement-view",
      },
    ],
  },

  // ------------------------------ Synergy (Engagement) ------------------------------
  {
    name: "Synergy",
    tooltip:
      "Foster collaboration and synergy across teams with our Engage System",
    icon: <FaDiceD20 />,
    color: "text-blue-400",
    iconAnimation: { rotate: 360 },
    options: [
      {
        name: "Engagement Feed",
        link: "/dashboard/engagement-feed",
        permission: "engagement-view",
      },
      {
        name: "permission dashboard",
        link: "/dashboard/engagement-permission-dashboard",
        permission: "engagement-manage",
      },
    ],
  },



  // ------------------------------ Manage Employees ------------------------------
  {
    name: "Manage Employees",
    tooltip: "Organize and oversee all employee details in one place",
    icon: <FaUsers />,
    color: "text-orange-400",
    iconAnimation: { rotate: -360 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/employees/management",
        permission: "employee-main",
        textAnimation: { x: 10 },
      },
      {
        name: "Add Employee",
        link: "/dashboard/add-employee",
        permission: "employee-create-super",
        textAnimation: { x: 10 },
      },
      {
        name: "Add Employee Manager",
        link: "/dashboard/add-employee-manager",
        permission: "employee-create-manager",
        textAnimation: { x: 10 },
      },
      {
        name: "Subordinates",
        link: "/dashboard/supordinates-employees",
        permission: "employee-view-subordinate",
        textAnimation: { x: 10 },
      },
      {
        name: "All Employees",
        link: "/dashboard/all-employess",
        permission: "employee-manage-super",
        textAnimation: { x: 10 },
      },
      {
        name: "Asset Management",
        link: "/dashboard/assign-assets",
        permission: "asset-manage",
      },
      {
        name: "Take Disciplinary actions",
        link: "/dashboard/disciplinary-actions/all-users",
        permission: "disciplinary-create",
      },
      {
        name: "All disciplinary actions",
        link: "/dashboard/disciplinary-actions",
        permission: "disciplinary-view",
      },
    ],
  },

  // ------------------------------ Attendance ------------------------------
  {
    name: "Attendence",
    tooltip: "Track and manage employee presence and punctuality with ease",
    icon: <FaBookReader />,
    color: "text-orange-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/attendance-dashboard",
        permission: "attendance-main",
        textAnimation: { x: 10 },
      },
      {
        name: "Subordinates Attendance",
        link: "/dashboard/subordinates-attendance",
        permission: "attendance-view-subordinate",
        textAnimation: { x: 10 },
      },
      {
        name: "View Attendance",
        link: "/dashboard/view-attendance",
        permission: "attendance-view-own",
        textAnimation: { x: 10 },
      },
      {
        name: "All Employee Attendance",
        link: "/dashboard/all-employee-attendance",
        permission: "attendance-view-all",
        textAnimation: { x: 10 },
      },
      {
        name: "Request Hike Advance Reimbursement",
        link: "/dashboard/request-hike-advance-reimbursement",
        permission: "employee-request-financial",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Ticket Management ------------------------------
  {
    name: "Ticket Management",
    tooltip:
      "Streamline your support process by creating, tracking, and resolving tickets efficiently",
    icon: <FaBug />,
    color: "text-green-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Manage Tickets",
        link: "/dashboard/manage-tickets",
        permission: "ticket-manage-department",
        textAnimation: { x: 10 },
      },
      {
        name: "Raise Ticket ",
        link: "/dashboard/raise-ticket",
        permission: "ticket-create",
        textAnimation: { x: 10 },
      },
      {
        name: "All Tickets",
        link: "/dashboard/all-tickets",
        permission: "ticket-manage-all",
        textAnimation: { x: 10 },
      },
      {
        name: "Posh Manage",
        link: "/dashboard/posh-manage",
        permission: "ticket-manage-posh",
        textAnimation: { x: 10 },
      },
      {
        name: "File Posh",
        link: "/dashboard/file-posh",
        permission: "ticket-create-posh",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Payroll ------------------------------
  {
    name: "Payroll",
    tooltip:
      "Ensure accurate and timely payouts with our secure payroll system",
    icon: <FaMoneyCheckAlt />,
    color: "text-orange-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/main",
        permission: "payroll-main", // NEW
        textAnimation: { x: 10 },
      },
      {
        name: "Manage Payroll",
        link: "/dashboard/manage-payroll",
        permission: "payroll-manage-calculations",
        textAnimation: { x: 10 },
      },
      {
        name: "Manage Claims",
        link: "/dashboard/manage-claims",
        permission: "payroll-manage-claims",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Task Management ------------------------------
  {
    name: "Task Management ",
    tooltip:
      "Easily create, assign, and track tasks to keep your projects on schedule",
    icon: <FaTasks />,
    color: "text-blue-400",
    iconAnimation: { rotate: 360 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/main-task",
        permission: "task-main",
        textAnimation: { x: 10 },
      },
      {
        name: "View Daily Task",
        link: "/dashboard/view-daily-task",
        permission: "update-own-task-daily",
        textAnimation: { x: 10 },
      },
      {
        name: "Assigned Task",
        link: "/dashboard/assigned-task",
        permission: "task-assign-subordinates",
        textAnimation: { x: 10 },
      },
      {
        name: "Assigned Task",
        link: "/dashboard/assigned-task/employee",
        permission: "view-own-assigned-task",
        textAnimation: { x: 10 },
      },
      {
        name: "Daily Task",
        link: "/dashboard/daily-task",
        permission: "view-daily-subordinates-task",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Recruit Management ------------------------------
  {
    name: "Recruit Management",
    tooltip:
      "Efficiently manage your recruitment process, from job postings to candidate selection",
    icon: <FaFileAlt />,
    color: "text-yellow-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/recruitment-main",
        permission: "recruit-main",
        textAnimation: { x: 10 },
      },
      {
        name: "All Vacancies",
        link: "/dashboard/all-vacancies",
        permission: "recruit-view-vacancies",
        textAnimation: { x: 10 },
      },
      {
        name: "Create Vacancy",
        link: "/dashboard/create-vacancies",
        permission: "recruit-create-job",
        textAnimation: { x: 10 },
      },
      {
        name: "Referral List",
        link: "/dashboard/referral-list",
        permission: "recruit-view-referrals",
        textAnimation: { x: 10 },
      },
      {
        name: "Vacancies List",
        link: "/dashboard/vancancies-list",
        permission: "recruit-manage-vacancies",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Performance Management ------------------------------
  {
    name: "Performance management",
    tooltip:
      "Track, evaluate, and improve employee performance to drive team success",
    icon: <GrDocumentPerformance />,
    color: "text-green-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/performance-dashboard",
        permission: "performance-main",
      },
      {
        name: "Post Top Performer",
        link: "/dashboard/post-top-performers",
        permission: "post-top-performer",
      },
      {
        name: "View Top Performers",
        link: "/dashboard/top-performers",
        permission: "view-top-performers",
      },
      {
        name: "Set KPIs",
        link: "/dashboard/set-kpis",
        permission: "performance-set-kpis",
      },
      {
        name: "Team Performance",
        link: "/dashboard/team-performance",
        permission: "performance-rate-subordinate",
        textAnimation: { x: 10 },
      },
      {
        name: "All Employes Rating",
        link: "/dashboard/all-emp-ratings",
        permission: "view-all-employee-rating",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Performance Management & KPI quantitative-qualitative ------------------------------

  {
    name: "Performance Management & KPI quantitative-qualitative",
    tooltip:
      "Track, evaluate, and improve employee performance to drive team success",
    icon: <GrDocumentPerformance />,
    color: "text-blue-400",
    iconAnimation: { rotate: 360 },
    options: [
      {
        name: "Set KPIs",
        link: "/dashboard/set-kpis-new",
        permission: "set-kpis-quantitative-qualitative",
      },
      {
        name: "Rate Team Members",
        link: "/dashboard/rate-team-members",
        permission: "rate-team-members-quantitative-qualitative",
      },
      {
        name: "Team Members Performance",
        link: "/dashboard/team-members-performance",
        permission: "team-members-performance-quantitative-qualitative",
      },
      {
        name: "My Performance",
        link: "/dashboard/my-performance",

        permission: "own-performance-quantitative-qualitative",
      },

      {
        name: "All Employes Rating",
        link: "/dashboard/all-employess-ratings",
        permission: "view-all-employee-rating-quantitative-qualitative",
      },
    ],
  },

  // ------------------------------ Analytics ------------------------------
  {
    name: "Analytics",
    tooltip:
      "Analyze RACI roles, operations, and business metrics all in one place for data-driven decisions",
    icon: <FaGlobe />,
    color: "text-red-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/raci-dashboard",
        permission: "raci-main",
        textAnimation: { x: 10 },
      },
      {
        name: "RACI Business",
        link: "/dashboard/raci-business",
        permission: "raci-business",
        textAnimation: { x: 10 },
      },
      {
        name: "RACI Operations",
        link: "/dashboard/raci-operations",
        permission: "raci-operations",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Company Settings ------------------------------
  {
    name: "Company Settings",
    tooltip:
      "Customize and manage your organization's settings in a centralized hub",
    icon: <FaCog />,
    color: "text-red-400",
    iconAnimation: { scale: 1.3 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Company Info",
        link: "/dashboard/company-info",
        permission: "company-info",
        textAnimation: { x: 10 },
      },
      {
        name: "Company Settings",
        link: "/dashboard/company-settings",
        permission: "company-settings",
        textAnimation: { x: 10 },
      },
      {
        name: "Add Hierarchy",
        link: "/dashboard/add-hierarchy",
        permission: "company-hierarchy",
        textAnimation: { x: 10 },
      },
      {
        name: "Update Policies",
        link: "/dashboard/update-policies",
        permission: "company-policies",
        textAnimation: { x: 10 },
      },
      {
        name: "Update Induction",
        link: "/dashboard/post-induction",
        permission: "company-induction",
        textAnimation: { x: 10 },
      },
      {
        name: "Productivity Lens Settings",
        link: "/dashboard/break-settings",
        permission: "company-break-settings",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Productivity Lenses ------------------------------
  {
    name: "Productivity Lenses",
    tooltip:
      "Track, evaluate, and improve employee performance to drive team success",
    icon: <MdTrackChanges />,
    color: "text-yellow-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/main-dashboard",
        permission: "productivity-main",
      },
      {
        name: "Productivity Dashboard",
        link: "/dashboard/productivity-dashboard",
        permission: "productivity-dashboard",
      },
      {
        name: "Team Productivity",
        link: "/dashboard/team-productivity",
        permission: "productivity-team",
      },
    ],
  },

  // ------------------------------ Chats ------------------------------
  {
    name: "Chats",
    tooltip: "Chats With Team Mates",
    icon: <ChatBubble />,
    color: "text-orange-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "chats",
        link: "/dashboard/chats",
        permission: "chat-user",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Leaves Management ------------------------------
  {
    name: "Leaves Management",
    icon: <FaListAlt />,
    color: "text-blue-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Leaves History",
        link: "/dashboard/leave-history",
        permission: "leave-apply",
        textAnimation: { x: 10 },
      },
      {
        name: " Manage Leaves ",
        link: "/dashboard/manage-leave-history",
        permission: "leave-manage-subordinate",
        textAnimation: { x: 10 },
      },
      {
        name: " All Leaves ",
        link: "/dashboard/all-leave-history",
        permission: "leave-view-all",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Resignation & FNF ------------------------------
  {
    name: "Resignation & FNF Dashboard",
    icon: <LuFileCheck2 />,
    color: "text-green-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Resignation Dashboard",
        link: "/dashboard/employee-resignation-history",
        permission: "resignation-main",
        textAnimation: { x: 10 },
      },
      {
        name: "Submit Resignation",
        link: "/dashboard/submit-resignation",
        permission: "resignation-submit",
        textAnimation: { x: 10 },
      },
      {
        name: "Resignation Approvals",
        link: "/dashboard/resignation-approvals",
        permission: "resignation-manage",
        textAnimation: { x: 10 },
      },
      {
        name: "HR FNF Approvals",
        link: "/dashboard/fnf-request-hr",
        permission: "resignation-fnf-approve",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Policies & Induction ------------------------------
  {
    name: "Policies & Induction",
    icon: <FaFileSignature />,
    color: "text-blue-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Admin Panel Training",
        link: "/dashboard/admin-panel-training",
        permission: "training-manage",
        textAnimation: { x: 10 },
      },
      {
        name: "Induction PPT's",
        link: "/dashboard/induction-ppt",
        permission: "induction-view",
        textAnimation: { x: 10 },
      },
      {
        name: "Company Policies",
        link: "/dashboard/company-policies",
        permission: "policies-view",
        textAnimation: { x: 10 },
      },
      {
        name: "Training Material",
        link: "/dashboard/training-material",
        permission: "training-view",
        textAnimation: { x: 10 },
      },
    ],
  },

  // ------------------------------ Organization Chart ------------------------------
  {
    name: "Organization Chart",
    tooltip: "",
    icon: <RiOrganizationChart />,
    color: "text-yellow-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Organization Chart",
        link: "/dashboard/organization-chart",
        permission: "organization-chart",
        textAnimation: { x: 10 },
      },
    ],
  }, 


  {
    name: "Geo Location",
    tooltip: "",
    icon: <BiCurrentLocation />,
    color: "text-red-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Field Workers",
        link: "/dashboard/field-worker",
        permission: "geolocation-all-permission",
        textAnimation: { x: 10 },
      },  {
        name: "View Map",
        link: "/dashboard/geo-location",
        permission: "geolocation-all-permission",
        textAnimation: { x: 10 },
      },
    ],
  }, 
  
  
  
  






];
