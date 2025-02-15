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
  FaBookReader,
} from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdModelTraining } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { LuFileCheck2 } from "react-icons/lu";
import { ChatBubble } from "@mui/icons-material";


export const menuItems = [


  // dashboard
  {
    name: "Dashboard",
    tooltip: "",
    icon: <FaHome />,
    color: "text-blue-400",
    iconAnimation: { scale: 1.2 },
    options: [
      {
        name: "Dashboard",
        link: "/dashboard",
        permission: "SuperDashboard",
      },
   
      {
        name: "Dashboard",
        link: "/dashboard/employee",
        permission: "employeeDashboard",
      },
    ],
  },

  //Announcements
  {
    name: "Announcements",
    tooltip: "Stay up to date! Click here to view important news and announcements ",
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
        permission: "ViewAnnouncement",
      },
    ],
  },


//Engagement
  {
    name: "Synergy",
    tooltip: "Foster collaboration and synergy across teams with our Engage System",
    icon: <TiSocialTwitter />,
    color: "text-blue-400",
    iconAnimation: { rotate: 360 },
    options: [
      {
        name: "Engagement Feed",
        link: "/dashboard/engagement-feed",
        permission: "engagement",
      },
      {
        name: "permission dashboard",
        link: "/dashboard/engagement-permission-dashboard",
        permission: "engagementManager",
      },
    ],
  },


//Manage Employees
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
        permission: "mainmanageemployees",
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
        name: "Subordinates",
        link: "/dashboard/supordinates-employees",
        permission: "updateEmployeeAdmin",
        textAnimation: { x: 10 },
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
      {
        name: "Asset Management",
        link: "/dashboard/assign-assets",
        permission: "assignAssets",
      },
      // {
      //   name: "Asset",
      //   link: "/dashboard/asset",
      //   permission: "assignAssets",
      //   textAnimation: { x: 10 },
      // },
    ],
  },

  
//Attendence

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
        permission: "MainAttendance",
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
        permission: "myAttendance",
        textAnimation: { x: 10 },
      },
      {
        name: "All Employee Attendance",
        link: "/dashboard/all-employee-attendance",
        permission: "viewallAttendance",
        textAnimation: { x: 10 },
      },
    ],
  },


  
  // Ticket Management
  {
    name: "Ticket Management",
    tooltip: "Streamline your support process by creating, tracking, and resolving tickets efficiently",
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
        permission: "poshManager",
        textAnimation: { x: 10 },
      },
      {
        name: "File Posh",
        link: "/dashboard/file-posh",
        permission: "poshEmployee",
        textAnimation: { x: 10 },
      },
    ],
  },


  // Payroll
  {
    name: "Payroll",
    tooltip: "Ensure accurate and timely payouts with our secure payroll system",
    icon: <FaMoneyCheckAlt />,
    color: "text-orange-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/main",
        permission: "payroll",
        textAnimation: { x: 10 },
      },
      {
        name: "Manage Payroll",
        link: "/dashboard/manage-payroll",
        permission: "payroll",
        textAnimation: { x: 10 },
      },
      {
        name: "Manage Claims",
        link: "/dashboard/manage-claims",
        permission: "myAttendance",
        textAnimation: { x: 10 },
      },
    ],
  },



//Task Management

  {
    name: "Task Management ",
    tooltip: "Easily create, assign, and track tasks to keep your projects on schedule",
    icon: <FaTasks />,
    color: "text-blue-400",
    iconAnimation: { rotate: 360 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/main-task",
        permission: "ViewTaskManager",
        textAnimation: { x: 10 },
      },
      {
        name: "View Daily Task",
        link: "/dashboard/view-daily-task",
        permission: "updateTask",
        textAnimation: { x: 10 },
      },
      {
        name: "Assigned Task",
        link: "/dashboard/assigned-task",
        permission: "ActionTrackerManager",
        textAnimation: { x: 10 },
      },
      {
        name: "Assigned Task",
        link: "/dashboard/assigned-task/employee",
        permission: "ViewTaskManager",
        textAnimation: { x: 10 },
      },
      {
        name: "Daily Task",
        link: "/dashboard/daily-task",
        permission: "ActionTrackerManager",
        textAnimation: { x: 10 },
      },
    ],
  },

  //Recruit Management
  {
    name: "Recruit Management",
    tooltip: "Efficiently manage your recruitment process, from job postings to candidate selection",
    icon: <FaFileAlt />,
    color: "text-yellow-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/recruitment-main",
        permission: "MainRecruitManagement",
        textAnimation: { x: 10 },
      },
      {
        name: "All Vacancies",
        link: "/dashboard/all-vacancies",
        permission: "viewVacancies",
        textAnimation: { x: 10 },
      },
      {
        name: "Create Vacancy",
        link: "/dashboard/create-vacancies",
        permission: "jobPostingAdmin",
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
        permission: "HRreferralDashboard",
        textAnimation: { x: 10 },
      },
 
      // {
      //   name: "Employee Referral Tracker",
      //   link: "/dashboard/my-referral-dashboard",
      //   permission: "employeeReferralDashboard",
      //   textAnimation: { x: 10 },
      // },
    ],
  },


    
//Performance management
{
    name: "Performance management",
    tooltip: "Track, evaluate, and improve employee performance to drive team success",
    icon: <GrDocumentPerformance />,
    color: "text-green-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/performance-dashboard",
        permission: "MainPerformanceManagement",
      },
      {
        name: "Top Performers",
        link: "/dashboard/top-performers",
        permission: "postTopPerformer",
      },
      {
        name: "Set KPIs",
        link: "/dashboard/set-kpis",
        permission: "setKPIs",
      },
      {
        name: "Team Performance",
        link: "/dashboard/team-performance",
        permission: "rateSubordinate",
        textAnimation: { x: 10 },
      },
      {
        name: "All Employes Rating",
        link: "/dashboard/all-emp-ratings",
        permission: "viewAllEmployeeRatings",
        textAnimation: { x: 10 },
      },
    ],
  },


  //Analytics

  {
    name: "Analytics",
    tooltip: "Analyze RACI roles, operations, and business metrics all in one place for data-driven decisions",
    icon: <FaGlobe />,
    color: "text-red-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      {
        name: "Main",
        link: "/dashboard/raci-dashboard",
        permission: "RaciMain",
        textAnimation: { x: 10 },
      },
      {
        name: "RACI Business",
        link: "/dashboard/raci-business",
        permission: "Raci2",
        textAnimation: { x: 10 },
      },
      {
        name: "RACI Operations",
        link: "/dashboard/raci-operations",
        permission: "superAdminRaci",
        textAnimation: { x: 10 },
      },
    ],
  },

    //Company Settings

    {
        name: "Company Settings",
        tooltip: "Customize and manage your organization's settings in a centralized hub",
        icon: <FaCog />,
        color: "text-red-400",
        iconAnimation: { scale: 1.3 },
        textAnimation: { x: 10 },
        options: [
     
          {
            name: "Company Info",
            link: "/dashboard/company-info",
            permission: "companyInfo",
            textAnimation: { x: 10 },
          },
          {
            name: "Company Settings",
            link: "/dashboard/company-settings",
            permission: "CompanySettings",
            textAnimation: { x: 10 },
          },
          {
            name: "Add Hierarchy",
            link: "/dashboard/add-hierarchy",
            permission: "addRole",
            textAnimation: { x: 10 },
          },
          {
            name: "Update Policies",
            link: "/dashboard/update-policies",
            permission: "PolicySystem",
            textAnimation: { x: 10 },
          },
          {
            name: "Update Induction",
            link: "/dashboard/post-induction",
            permission: "postInduction",
            textAnimation: { x: 10 },
          },
          {
            name: "Break Settings",
            link: "/dashboard/break-settings",
            permission: "addBreak",
            textAnimation: { x: 10 },
          },
        ],
      },


      
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
        permission: "useChats",
        textAnimation: { x: 10 },
      },
    ],
  },



  {
    name: "Leaves Management",
    icon: <FaListAlt />,
    color: "text-blue-400",
    iconAnimation: { scale: 1.2 },
    textAnimation: { x: 10 },
    options: [
      // {
      //   name: "Apply Leaves ",
      //   link: "/dashboard/leavemanage",
      //   permission: "applyLeaves",
      //   textAnimation: { x: 10 },
      // },
      {
        name: "Leaves History",
        link: "/dashboard/leave-history",
        permission: "viewLeaves",
        textAnimation: { x: 10 },
      },
      {
        name: " Manage Leaves ",
        link: "/dashboard/manage-leave-history",
        permission: "acceptandrejectleave",
        textAnimation: { x: 10 },
      },
      {
        name: " All Leaves ",
        link: "/dashboard/all-leave-history",
        permission: "viewLeaves",
        textAnimation: { x: 10 },
      },
    ],
  },

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
        permission: "viewAllResignation",
        textAnimation: { x: 10 },
      },
      {
        name: "Submit Resignation",
        link: "/dashboard/submit-resignation",
        permission: "employeeResignationDashboard",
        textAnimation: { x: 10 },
      },
      {
        name: "Resignation Approvals",
        link: "/dashboard/resignation-approvals",
        permission: "hrResignationDashboard",
        textAnimation: { x: 10 },
      },
      {
        name: "HR FNF Approvals",
        link: "/dashboard/fnf-request-hr",
        permission: "FNFAprroval",
        textAnimation: { x: 10 },
      },
      {
        name: "All Resignation History",
        link: "/dashboard/resignationhistory",
        permission: "viewAllResignation",
        textAnimation: { x: 10 },
      },
    ],
  },


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
  // {
  //   name: "Company Settings",
  //   icon: <FaCog />,
  //   color: "text-red-400",
  //   iconAnimation: { scale: 1.3 },
  //   textAnimation: { x: 10 },
  //   options: [
  //     {
  //       name: "Add Department",
  //       link: "/dashboard/departdesig",
  //       permission: "superAdminDepartmentDesignation",
  //       textAnimation: { x: 10 },
  //     },
  //     {
  //       name: "Company Settings",
  //       link: "/dashboard/company-settings",
  //       permission: "CompanySettings",
  //       textAnimation: { x: 10 },
  //     },
  //     {
  //       name: "Company Info",
  //       link: "/dashboard/CompanyInfo",
  //       permission: "companyInfo",
  //       textAnimation: { x: 10 },
  //     },
  //     {
  //       name: "Add Role",
  //       link: "/dashboard/addRole",
  //       permission: "addRole",
  //       textAnimation: { x: 10 },
  //     },
  //     {
  //       name: "Add Designation",
  //       link: "/dashboard/addDesignation",
  //       permission: "addDesignation",
  //       textAnimation: { x: 10 },
  //     },
  //   ],
  // },
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
  //   tooltip: "",
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
  //   tooltip: "",
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

  



];