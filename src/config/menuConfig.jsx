// src/config/menuConfig.js (new file)

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
} from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdModelTraining } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { LuFileCheck2 } from "react-icons/lu";
import { ChatBubble } from "@mui/icons-material";




export const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome  title="Dashboard"/>,
      title:"Dashboard",
      color: "text-blue-400",
      iconAnimation: { scale: 1.2 },
      options: [
        
        {
          name: "Super Admin",
          link: "/dashboard", 
          permission: "employeeDashboard",
        },
        {
          name: "Manager",
          link: "/dashboard/manager-dashboard",
          permission: "managerDashboard",
        },
        {
          name: "Employee",
          link: "/dashboard/employee-dashboardr",
          permission: "employeeDashboard",
        },
      ],
    },


    
    {
      name: "Announcements",
      icon: <FaBullhorn />,
      color: "text-yellow-400",
      iconAnimation: { x: 7 },
      options: [
        {
          name: "Create Announcement",
          link: "/dashboard/add-announcement",
          permission: "AddAnnouncement",
        },
        {
          name: "View Announcement",
          link: "/dashboard/view-announcement",
          permission: "AddAnnouncement",
        },
      ],
    },
    {
      name: "Engagement",
      icon: <TiSocialTwitter />,
      color: "text-blue-400",
      iconAnimation: { rotate: 360 },
      options: [
        {
          name: "Engagement Feed",
          link: "/dashboard/engagement-feed",
          permission: "AddAnnouncement",
        },
        {
          name: "permission dashboard",
          link: "/dashboard/engagement-permission-dashboard",
          permission: "AddAnnouncement",
        },
      ],
    },
    // {
    //   name: " Company Policies",
    //   icon: <FaClipboard />,
    //   color: "text-green-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "View Policies",
    //       link: "/dashboard/policies",
    //       permission: "viewPolicies",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Update Policies",
    //       link: "/dashboard/update-policies",
    //       permission: "PolicySystem",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Company Orientations",
    //   icon: <FaBook />,
    //   color: "text-red-400",
    //   iconAnimation: { rotate: 360 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Update Induction",
    //       link: "/dashboard/post-induction",
    //       permission: "postInduction",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "View Induction",
    //       link: "/dashboard/induction",
    //       permission: "viewInduction",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    {
      name: "Manage Employees",
      icon: <FaUsers />,
      color: "text-orange-400",
      iconAnimation: { rotate: -360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Main",
          link: "/dashboard/employees/management",
          permission: "addEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Add Employee",
          link: "/dashboard/add-employee",
          permission: "addEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        // {
        //   name: "Add Employee",
        //   link: "/dashboard/add-employee2",
        //   permission: "addEmployeeManager",
        //   textAnimation: { x: 10 },
        // },
        {
          name: "Supordinates",
          link: "/dashboard/supordinates-employees",
          permission: "updateEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Asset Management",
          link: "/dashboard/assign-assets",
          permission: "assignAssets",
        },
        // {
        //   name: "Update Employee",
        //   link: "/dashboard/update-employeev2",
        //   permission: "updateEmployeeManager",
        //   textAnimation: { x: 10 },
        // },
        // {
        //   name: "Delete Employee",
        //   link: "/dashboard/delete-employee",
        //   permission: "deleteEmployeeAdmin",
        //   textAnimation: { x: 10 },
        // },
        // {
        //   name: "View Employee",
        //   link: "/dashboard/all-employees",
        //   permission: "viewEmployeeAdmin",
        //   textAnimation: { x: 10 },
        // },
        // {
        //   name: "Employee Status",
        //   link: "/dashboard/active-inactive-employee",
        //   permission: "active/InactiveEmployeeAdmin",
        //   textAnimation: { x: 10 },
        // },
        {
          name: "All Employees",
          link: "/dashboard/all-employess",
          permission: "updateEmployeeSuperAdmin",
          textAnimation: { x: 10 },
        },
        // {
        //   name: "Asset",
        //   link: "/dashboard/asset",
        //   permission: "assignAssets",
        //   textAnimation: { x: 10 },
        // },
      ],
    },
    // {
    //   name: "Task Management Manager",
    //   icon: <FaTasks />,
    //   color: "text-blue-400",
    //   iconAnimation: { rotate: 360 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "View Daily Tasks",
    //       link: "/dashboard/view-task-hr",
    //       permission: "ViewTaskManager",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Update Daily Tasks",
    //       link: "/dashboard/update-task",
    //       permission: "updateTask",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Assign Task",
    //       link: "/dashboard/manager-action-tracker",
    //       permission: "ActionTrackerManager",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Assigned Tasks",
    //       link: "/dashboard/action-tracker",
    //       permission: "actionTracker",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },

    {
      name: "Ticket Management",
      icon: <FaBug />,
      color: "text-green-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Manage Tickets",
          link: "/dashboard/manage-tickets",
          permission: "manageIssuesAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Raise Ticket ",
          link: "/dashboard/raise-ticket",
          permission: "getSupport",
          textAnimation: { x: 10 },
        },
        {
          name: "All Tickets",
          link: "/dashboard/all-tickets",
          permission: "IssueManagementSuperAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Posh Manage",
          link: "/dashboard/posh-manage",
          permission: "IssueManagementSuperAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "File Posh",
          link: "/dashboard/file-posh",
          permission: "IssueManagementSuperAdmin",
          textAnimation: { x: 10 },
        },
      ],
    },
    // {
    //   name: "RACI",
    //   icon: <FaGlobe />,
    //   color: "text-red-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "RACI Business",
    //       link: "/dashboard/raci2",
    //       permission: "Raci2",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "RACI OPS",
    //       link: "/dashboard/raci",
    //       permission: "superAdminRaci",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Payroll & Attendence",
    //   icon: <FaMoneyCheckAlt />,
    //   color: "text-orange-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Manage Payroll",
    //       link: "/dashboard/payroll",
    //       permission: "payroll",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Attendance & Payroll",
    //       link: "/dashboard/my-attendance",
    //       permission: "myAttendance",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "View Attendance",
    //       link: "/dashboard/subordinateslist",
    //       permission: "viewAttendance",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    {
      name: "Attendence",
      icon: <FaMoneyCheckAlt />,
      color: "text-orange-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
     
        {
          name: "Main",
          link: "/dashboard/attendance-dashboard",
          permission: "myAttendance",
          textAnimation: { x: 10 },
        },
        {
          name: "Subordinates Attendance",
          link: "/dashboard/subordinates-attendance",
          permission: "viewAttendance",
          textAnimation: { x: 10 },
        },
        {
          name: "View Attendance",
          link: "/dashboard/view-attendance",
          permission: "viewAttendance",
          textAnimation: { x: 10 },
        },
        {
          name: "All Employee Attendance",
          link: "/dashboard/all-employee-attendance",
          permission: "viewAttendance",
          textAnimation: { x: 10 },
        },
      ],
    },


    {
      name: "Outsourcing & Recruit Management",
      icon: <FaFileAlt />,
      color: "text-yellow-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Main",
          link: "/dashboard/recruitment-main",
          permission: "jobPostingAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "All Vacancies",
          link: "/dashboard/all-vacancies",
          permission: "jobPostingAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Create Vacancy",
          link: "/dashboard/create-vacancies",
          permission: "jobVacancyAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Referral List",
          link: "/dashboard/referral-list",
          permission: "HRreferralDashboard",
          textAnimation: { x: 10 },
        },
        {
          name: "Vacancies List",
          link: "/dashboard/vancancies-list",
          permission: "viewVacancies",
          textAnimation: { x: 10 },
        },
        // {
        //   name: "Employee Referral Tracker",
        //   link: "/dashboard/my-referral-dashboard",
        //   permission: "employeeReferralDashboard",
        //   textAnimation: { x: 10 },
        // },
        {
          name: "Employee FNF",
          link: "/dashboard/employee-fnf",
          permission: "employeeReferralDashboard",
          textAnimation: { x: 10 },
        },
      ],
    },
    // {
    //   name: "Leaves Management",
    //   icon: <FaListAlt />,
    //   color: "text-blue-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Apply Leaves ",
    //       link: "/dashboard/leavemanage",
    //       permission: "applyLeaves",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: " Manage Leaves ",
    //       link: "/dashboard/leavemanager",
    //       permission: "acceptandrejectleave",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Leaves History",
    //       link: "/dashboard/employeeleavehistory",
    //       permission: "viewLeaves",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Review Performance",
    //   icon: <FaFileSignature />,
    //   color: "text-yellow-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Rate Subordinate",
    //       link: "/dashboard/kpi-rating",
    //       permission: "rateSubordinate",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "View Subordinate Ratings",
    //       link: "/dashboard/subordinate-rating",
    //       permission: "viewSubordinateRatings",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "All Employes Rating",
    //       link: "/dashboard/all/employee/ratings",
    //       permission: "viewAllEmployeeRatings",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Performance management",
    //   icon: <GrDocumentPerformance />,
    //   color: "text-green-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Post Top Performer",
    //       link: "topratedemployees",
    //       permission: "postTopPerformer",
    //     },
    //     {
    //       name: "View Top Performers",
    //       link: "topperformanceemployees",
    //       permission: "viewTopPerformers",
    //     },
    //     {
    //       name: "Set KPIs",
    //       link: "admin-action-tracker2",
    //       permission: "setKPIs",
    //     },
    //   ],
    // },
    {
      name: "Company Settings",
      icon: <FaCog />,
      color: "text-red-400",
      iconAnimation: { scale: 1.3 },
      textAnimation: { x: 10 },
      options: [
        // {
        //   name: "Add Department",
        //   link: "/dashboard/departdesig",
        //   permission: "superAdminDepartmentDesignation",
        //   textAnimation: { x: 10 },
        // },
        // {
        //   name: "Company Settings",
        //   link: "/dashboard/company-settings",
        //   permission: "CompanySettings",
        //   textAnimation: { x: 10 },
        // },
        {
          name: "Company Info",
          link: "/dashboard/CompanyInfo",
          permission: "companyInfo",
          textAnimation: { x: 10 },
        },
        // {
        //   name: "Add Role",
        //   link: "/dashboard/addRole",
        //   permission: "addRole",
        //   textAnimation: { x: 10 },
        // },
        // {
        //   name: "Add Designation",
        //   link: "/dashboard/addDesignation",
        //   permission: "addDesignation",
        //   textAnimation: { x: 10 },
        // },
      ],
    },
    // {
    //   name: "User Profile",
    //   icon: <FaUserCircle />,
    //   color: "text-orange-400",
    //   iconAnimation: { scale: 1.3 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "My Profile",
    //       link: "/dashboard/my-profile",
    //       permission: "viewProfile",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Training Material",
    //   icon: <MdModelTraining />,
    //   color: "text-blue-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Training Material",
    //       link: "/dashboard/training-material",
    //       permission: "trainingMaterial",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Organization Chart",
    //   icon: <RiOrganizationChart />,
    //   color: "text-yellow-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Organization Chart",
    //       link: "/dashboard/training-material",
    //       permission: "trainingMaterial",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Resignation & FNF Dashboard",
    //   icon: <LuFileCheck2 />,
    //   color: "text-green-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "Submit Resignation",
    //       link: "/dashboard/ResignationForm",
    //       permission: "submitResignation",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Resignation Dashboard",
    //       link: "/dashboard/resignation-dashboard",
    //       permission: "employeeResignationDashboard",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "Resignation Approvals",
    //       link: "/dashboard/manage-resignation",
    //       permission: "hrResignationDashboard",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "HR FNF Approvals",
    //       link: "/dashboard/fnf-request-hr",
    //       permission: "FNFAprroval",
    //       textAnimation: { x: 10 },
    //     },
    //     {
    //       name: "All Resignation History",
    //       link: "/dashboard/resignationhistory",
    //       permission: "viewAllResignation",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },
    // {
    //   name: "Chats",
    //   icon: <ChatBubble />,
    //   color: "text-orange-400",
    //   iconAnimation: { scale: 1.2 },
    //   textAnimation: { x: 10 },
    //   options: [
    //     {
    //       name: "chats",
    //       link: "/dashboard/chats",
    //       permission: "useChats",
    //       textAnimation: { x: 10 },
    //     },
    //   ],
    // },

  ];