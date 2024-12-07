import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedMenu } from "../../actions";
import axios from "axios";
import PunchInOut from "./PunchInOut"; // Import the PunchInOut component
import img2 from "../../assets/HM-Horizontal.png";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaBriefcase,
  FaClipboardList,
  FaBuilding,
  FaChartBar,
  FaCog,
  FaFileAlt,
  FaBullhorn,
  FaCalendarAlt,
  FaLaptopCode,
  FaBook,
  FaUserPlus,
  FaUserEdit,
  FaUserTimes,
  FaUserFriends,
  FaUserCheck,
  FaSitemap,
  FaEnvelopeOpenText,
  FaFileSignature,
  FaHandshake,
  FaMoneyCheckAlt, // For 'Payroll Management'
  FaUserCircle, // For 'My Profile'
  FaBell, // For 'Add Announcement'
  FaClock, // For 'Attendance & Payroll'
  FaChalkboardTeacher, // For 'Training Material'
  FaPlusSquare, // For 'Add Department'
  FaCogs, // For 'Company Settings'
  FaPlaneDeparture, // For 'Apply Leave'
  FaListAlt, // For 'Employee Leave History'
  FaClipboardCheck, // For 'Attendance View'
  FaStar, // For 'Rate Subordinate'
  FaAward, // For 'View Top Performers'
  FaLightbulb, // For 'Set KPIs'
  FaInfoCircle, // For 'Company Info'
  FaUserTie, // For 'Add Designation'
  FaTicketAlt, // For 'Raise A Ticket'
  FaLifeRing, // For 'Ticket Management'
} from "react-icons/fa";
const Sidebar = () => {
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]); // Array to store multiple saved records
  const empId = useSelector((state) => state.auth.employeeId);
  const userRole = useSelector((state) => state.auth.userRole);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  const fetchCompanyLogo = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo"
      );
      if (response.data.success && response.data.data[0]?.logo) {
        setCompanyInfo(response.data.data);
        console.log(companyInfo);
      } else {
        setCompanyInfo(null);
      }
    } catch (error) {
      console.error("Error fetching company logo:", error.message);
      toast.error("Failed to load company logo.");
    }
  };
  useEffect(() => {
    fetchCompanyLogo();
  }, []);

  // Fetch Permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const url = `https://apiv2.humanmaximizer.com/api/v1/superadmin/permission/${empId}`;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data.success) {
          let perms = response.data.permissions.map((perm) => perm.trim());

          perms = [...new Set(perms)]; // Remove duplicates
          setPermissions(perms);
          console.log("========>>>", permissions);
        } else {
          throw new Error(
            response.data.message || "Failed to fetch permissions"
          );
        }
      } catch (error) {
        setError(`Permissions Error: ${error.message}`);
        console.error("Error fetching permissions:", error.message);
      }
    };

    if (empId) {
      fetchPermissions();
    }
  }, [empId, userRole]);

  // Check if a permission is allowed
  const isAllowed = (permission) => {
    if (!permission) return true; // If no permission is required, allow access
    return permissions.includes(permission);
  };

  // Handle Menu Click
  const handleMenuClick = (menu) => {
    dispatch(setSelectedMenu(menu));
    setIsSidebarOpen(false);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle Click Outside Sidebar
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      !event.target.closest(".sidebar-toggle-btn")
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Toggle Dropdown
  const toggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  // // Define Menu Items
  // const menuItems = [
  //   // Admin and Super Admin
  //   {
  //     name: "Dashboard",
  //     link: "/dashboard/admin-dashboard",
  //     permission: "dashboardAdmin",
  //     hasDropdown: false,
  //   },
  //   // {
  //   //   name: "Add Department Head",
  //   //   link: "/dashboard/add-user",
  //   //   permission: "addUsersAdmin",
  //   //   hasDropdown: false,
  //   // },
  //   {
  //     name: "Manage Employees",
  //     // permission: "manageEmployeesAdmin",
  //     hasDropdown: true,
  //     dropdownItems: [
  //       {
  //         name: "Add Employee",
  //         link: "/dashboard/add-employee",
  //         permission: "addEmployeeAdmin",
  //       },
  //       {
  //         name: "Update Employee",
  //         link: "/dashboard/update-employee",
  //         permission: "updateEmployeeAdmin",
  //       },
  //       {
  //         name: "Delete Employee",
  //         link: "/dashboard/delete-employee",
  //         permission: "deleteEmployeeAdmin",
  //       },
  //       {
  //         name: "View Employee",
  //         link: "/dashboard/all-employees",
  //         permission: "viewEmployeeAdmin",
  //       },
  //       {
  //         name: "Active/Inactive Employee",
  //         link: "/dashboard/active-inactive-employee",
  //         permission: "active/InactiveEmployeeAdmin",
  //       },
  //       {
  //         name: "Organization Chart",
  //         link: "/dashboard/organization-chart",
  //         permission: "organizationChart",
  //       },
  //     ],
  //   },
  //   // {
  //   //   name: "Manage Leaves",
  //   //   link: "/dashboard/view-leave",
  //   //   permission: "viewLeavesAdmin",
  //   //   hasDropdown: false,
  //   // },
  //   {
  //     name: "View Daily Tasks",
  //     link: "/dashboard/view-task",
  //     permission: "viewTasksAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Job Posting",
  //     link: "/dashboard/job-posting",
  //     permission: "jobPostingAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Ticket Management",
  //     link: "/dashboard/manage-issues-admin",
  //     permission: "manageIssuesAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "All Ticket Issue Management New",
  //     link: "/dashboard/all-issues",
  //     permission: "IssueManagementSuperAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Task Management",
  //     link: "/dashboard/admin-action-tracker",
  //     permission: "actionTrackerAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Performance Management",
  //     link: "/dashboard/admin-action-tracker2",
  //     permission: "ReviewAdmin2",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Job Management",
  //     link: "/dashboard/job-fetching",
  //     permission: "jobVacancyAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "RACI OPS",
  //     link: "/dashboard/admin-raci",
  //     permission: "AdminRaci",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "RACI Business",
  //     link: "/dashboard/admin-raci2",
  //     permission: "AdminRaci2",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Payroll Management",
  //     link: "/dashboard/payroll",
  //     permission: "payroll",
  //     hasDropdown: false,
  //   },
  //   // Manager
  //   {
  //     name: "Dashboard",
  //     link: "/dashboard/manager-dashboard",
  //     permission: "managerDashboard",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Manage Employees",
  //     link: "/dashboard/all-employees-hr",
  //     permission: "manageEmployeesHR",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "View Leave",
  //     link: "/dashboard/view-leave-hr",
  //     permission: "ViewLeaveManager",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "View Daily Tasks",
  //     link: "/dashboard/view-task-hr",
  //     permission: "ViewTaskManager",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Ticket Management",
  //     link: "/dashboard/manage-issues-manager",
  //     permission: "ManageIssuesManager",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Task Management",
  //     link: "/dashboard/manager-action-tracker",
  //     permission: "ActionTrackerManager",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Add Announcement",
  //     link: "/dashboard/add-announcement",
  //     permission: "AddAnnouncement",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Performance Management",
  //     link: "/dashboard/manager-action-tracker2",
  //     permission: "ReviewManager",
  //     hasDropdown: false,
  //   },
  //   // Employee
  //   {
  //     name: "Dashboard",
  //     link: "/dashboard/employee-dashboard",
  //     permission: "employeeDashboard",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "My Profile",
  //     link: "/dashboard/my-profile",
  //     permission: "viewProfile",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Apply For Leave",
  //     link: "/dashboard/fetch-leaves",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Update Daily Tasks",
  //     link: "/dashboard/update-task",
  //     permission: "updateTask",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Raise A Ticket",
  //     link: "/dashboard/get-support",
  //     permission: "getSupport",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Task Management",
  //     link: "/dashboard/action-tracker",
  //     permission: "actionTracker",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Attendance & Payroll",
  //     link: "/dashboard/my-attendance",
  //     permission: "myAttendance",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Training Material",
  //     link: "/dashboard/training-material",
  //     permission: "trainingMaterial",
  //     hasDropdown: false,
  //   },
  //   // Shared
  //   {
  //     name: "Policies",
  //     link: "/dashboard/policies",
  //     permission: "viewPolicies",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Orientation",
  //     link: "/dashboard/induction",
  //     permission: "viewInduction",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "JOB VACANCIES",
  //     link: "/dashboard/employee-pending-jobs",
  //     permission: "viewVacancies",
  //     hasDropdown: false,
  //   },
  //   // Super Admin
  //   {
  //     name: "Dashboard",
  //     link: "/dashboard/super-admin-dashboard",
  //     permission: "SuperDashboard",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Department & Designation",
  //     link: "/dashboard/departdesig",
  //     permission: "superAdminDepartmentDesignation",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Company Overview",
  //     link: "/dashboard/company-settings",
  //     permission: "CompanySettings",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Job Vacancies",
  //     link: "/dashboard/super-job-vacancies",
  //     permission: "superAdminJobVacancies",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Ticket Management",
  //     link: "/dashboard/issue-management-super",
  //     permission: "IssueManagementSuperAdmin",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "RACI OPS",
  //     link: "/dashboard/raci",
  //     permission: "superAdminRaci",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "UPDATE INDUCTION",
  //     link: "/dashboard/post-induction",
  //     permission: "postInduction",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "RACI Business",
  //     link: "/dashboard/raci2",
  //     permission: "Raci2",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Update Policies",
  //     link: "/dashboard/update-policies",
  //     permission: "PolicySystem",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Apply Leave Employee",
  //     link: "/dashboard/leavemanage",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Apply Leave Manager",
  //     link: "/dashboard/leavemanager",
  //     permission: "acceptandrejectleave",
  //   },
  //   {
  //     name: "Employee Leave History",
  //     link: "/dashboard/employeeleavehistory",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Attendance View",
  //     link: "/dashboard/subordinateslist",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Rate Subordinate",
  //     link: "/dashboard/kpi-rating",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "View Subordinate Ratings",
  //     link: "/dashboard/subordinate-rating",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "All Employes Rating",
  //     link: "/dashboard/all/employee/ratings",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "Top Employes Rating",
  //     link: "topratedemployees",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "View Top Performers Employes",
  //     link: "topperformanceemployees",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   {
  //     name: "All Employes",
  //     link: "/dashboard/allemployes",
  //     permission: "applyLeaves",
  //     hasDropdown: false,
  //   },
  //   // company info
  //   {
  //     name: "Company Info",
  //     link: "/dashboard/CompanyInfo",
  //     permission: "companyInfo",
  //     hasDropdown: false,
  //   },
  // ];

  const menuItems = [
    // Super Admin
    {
      name: "Dashboard",
      link: "/dashboard/super-admin-dashboard",
      permission: "SuperDashboard",
      hasDropdown: false,
      icon: <FaHome />,
    },
    // Manager
    {
      name: "Dashboard",
      link: "/dashboard/manager-dashboard",
      permission: "managerDashboard",
      hasDropdown: false,
      icon: <FaHome />,
    },

    // Employee
    {
      name: "Dashboard",
      link: "/dashboard/employee-dashboard",
      permission: "employeeDashboard",
      hasDropdown: false,
      icon: <FaHome />,
    },
    {
      name: "Add Announcement",
      link: "/dashboard/add-announcement",
      permission: "AddAnnouncement",
      icon: <FaBell />,
      hasDropdown: false,
    },
    // Employee for view policy

    {
      name: "Company Policies",
      hasDropdown: true,
      icon: <FaBuilding />,
      dropdownItems: [
        {
          name: "View Policies",
          link: "/dashboard/policies",
          permission: "viewPolicies",
        },

        // Update policy for admin
        {
          name: "Update Policies",
          link: "/dashboard/update-policies",
          permission: "PolicySystem",
        },
      ],
    },

    // {
    //   name: "Policies",
    //   link: "/dashboard/policies",
    //   permission: "viewPolicies",
    //   hasDropdown: false,
    // },

    // // Update policy for admin
    // {
    //   name: "Update Policies",
    //   link: "/dashboard/update-policies",
    //   permission: "PolicySystem",
    //   hasDropdown: false,
    // },

    // For admin
    {
      name: "Comapny Orientation",
      hasDropdown: true,
      icon: <FaBook />,
      dropdownItems: [
        {
          name: "Update Induction",
          link: "/dashboard/post-induction",
          permission: "postInduction",
        },

        // For employee
        {
          name: "View Induction",
          link: "/dashboard/induction",
          permission: "viewInduction",
          hasDropdown: false,
        },
      ],
    },

    // {
    //   name: "UPDATE INDUCTION",
    //   link: "/dashboard/post-induction",
    //   permission: "postInduction",
    //   hasDropdown: false,
    // },

    // For employee
    // {
    //   name: "Orientation",
    //   link: "/dashboard/induction",
    //   permission: "viewInduction",
    //   hasDropdown: false,
    // },

    // Employee Management
    {
      name: "Manage Employees",
      hasDropdown: true,
      icon: <FaUsers />,
      dropdownItems: [
        {
          name: "Add Employee",
          link: "/dashboard/add-employee",
          permission: "addEmployeeAdmin",
        },
        {
          name: "Add Employee",
          link: "/dashboard/add-employeev2",
          permission: "addEmployeeManager",
        },
        {
          name: "Update Employee",
          link: "/dashboard/update-employee",
          permission: "updateEmployeeAdmin",
        },
        {
          name: "Update Employee",
          link: "/dashboard/update-employeev2",
          permission: "updateEmployeeManager",
        },
        {
          name: "Delete Employee",
          link: "/dashboard/delete-employee",
          permission: "deleteEmployeeAdmin",
        },
        {
          name: "View Employee",
          link: "/dashboard/all-employees",
          permission: "viewEmployeeAdmin",
        },
        {
          name: "Employee Status",
          link: "/dashboard/active-inactive-employee",
          permission: "active/InactiveEmployeeAdmin",
        },

        {
          name: "Update Employees",
          link: "/dashboard/allemployes",
          permission: "updateEmployeeSuperAdmin",
        },
      ],
    },
    {
      name: "Tasks Management",
      hasDropdown: true,
      icon: <FaTasks />,
      dropdownItems: [
        {
          name: "View Daily Tasks",
          link: "/dashboard/view-task-hr",
          permission: "ViewTaskManager",
        },
        {
          name: "Update Daily Tasks",
          link: "/dashboard/update-task",
          permission: "updateTask",
        },
        {
          name: "Assign Task",
          link: "/dashboard/manager-action-tracker",
          permission: "ActionTrackerManager",
        },
        {
          name: "Assigned Tasks",
          link: "/dashboard/action-tracker",
          permission: "actionTracker",
        },
      ],
    },

    // {
    //   name: "View Daily Tasks",
    //   link: "/dashboard/view-task-hr",
    //   permission: "ViewTaskManager",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Update Daily Tasks",
    //   link: "/dashboard/update-task",
    //   permission: "updateTask",
    //   hasDropdown: false,
    // },

    {
      name: "Outsourcing & Recruit Management",
      hasDropdown: true,
      icon: <FaFileAlt />,
      dropdownItems: [
        {
          name: "Job Posting",
          link: "/dashboard/job-posting",
          permission: "jobPostingAdmin",
        },
        {
          name: "Vacancies Management",
          link: "/dashboard/job-fetching",
          permission: "jobVacancyAdmin",
        },
        {
          name: "Vacancies",
          link: "/dashboard/employee-pending-jobs",
          permission: "viewVacancies",
        },
      ],
    },

    // {
    //   name: "Job Posting",
    //   link: "/dashboard/job-posting",
    //   permission: "jobPostingAdmin",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Job Management",
    //   link: "/dashboard/job-fetching",
    //   permission: "jobVacancyAdmin",
    //   hasDropdown: false,
    // },
    // {
    //   name: "JOB VACANCIES",
    //   link: "/dashboard/employee-pending-jobs",
    //   permission: "viewVacancies",
    //   hasDropdown: false,
    // },

    {
      name: "Issues Management",
      hasDropdown: true,
      icon: <FaEnvelopeOpenText />,
      dropdownItems: [
        {
          name: "All Issues",
          link: "/dashboard/all-issues",
          permission: "IssueManagementSuperAdmin",
        },
        {
          name: "Raise Ticket ",
          link: "/dashboard/get-support",
          permission: "getSupport",
        },
        {
          name: "Manage Tickets",
          link: "/dashboard/manage-issues-admin",
          permission: "manageIssuesAdmin",
        },
      ],
    },

    // {
    //   name: "View All Issues",
    //   link: "/dashboard/all-issues",
    //   permission: "IssueManagementSuperAdmin",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Raise A Ticket for Employee",
    //   link: "/dashboard/get-support",
    //   permission: "getSupport",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Ticket Management for maintance team",
    //   link: "/dashboard/manage-issues-admin",
    //   permission: "manageIssuesAdmin",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Task Management manager",
    //   link: "/dashboard/manager-action-tracker",
    //   permission: "ActionTrackerManager",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Task Management employee",
    //   link: "/dashboard/action-tracker",
    //   permission: "actionTracker",
    //   hasDropdown: false,
    // },

    {
      name: "RACI",
      hasDropdown: true,
      icon: <FaFileSignature />,
      dropdownItems: [
        {
          name: "RACI Business",
          link: "/dashboard/raci2",
          permission: "Raci2",
        },
        {
          name: "RACI OPS",
          link: "/dashboard/raci",
          permission: "superAdminRaci",
        },
      ],
    },
    // {
    //   name: "RACI Business",
    //   link: "/dashboard/raci2",
    //   permission: "Raci2",
    //   hasDropdown: false,
    // },
    // {
    //   name: "RACI OPS",
    //   link: "/dashboard/raci",
    //   permission: "superAdminRaci",
    //   hasDropdown: false,
    // },
    {
      name: "Payroll & Attendance",
      hasDropdown: true,
      icon: <FaMoneyCheckAlt />,
      dropdownItems: [
        {
          name: "Manage Payroll",
          link: "/dashboard/payroll",
          permission: "payroll",
        },
        {
          name: "Attendance & Payroll",
          link: "/dashboard/my-attendance",
          permission: "myAttendance",
        },
        {
          name: "View Attendance",
          link: "/dashboard/subordinateslist",
          permission: "viewAttendance",
        },
      ],
    },

    // {
    //   name: "Payroll Management",
    //   link: "/dashboard/payroll",
    //   permission: "payroll",
    //   hasDropdown: false,
    // },

    // {
    //   name: "Attendance & Payroll",
    //   link: "/dashboard/my-attendance",
    //   permission: "myAttendance",
    //   hasDropdown: false,
    // },

    //   for add department
    // {
    //   name: "Add Department",
    //   link: "/dashboard/departdesig",
    //   permission: "superAdminDepartmentDesignation",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Company Settings",
    //   link: "/dashboard/company-settings",
    //   permission: "CompanySettings",
    //   hasDropdown: false,
    // },

    {
      name: "Leaves Management",
      hasDropdown: true,
      icon: <FaListAlt />,

      dropdownItems: [
        {
          name: "Apply Leaves ",
          link: "/dashboard/leavemanage",
          permission: "applyLeaves",
        },
        {
          name: " Manage Leaves ",
          link: "/dashboard/leavemanager",
          permission: "acceptandrejectleave",
        },
        {
          name: "Leaves History",
          link: "/dashboard/employeeleavehistory",
          permission: "viewLeaves",
        },
      ],
    },

    // {
    //   name: "Apply Leave Employee",
    //   link: "/dashboard/leavemanage",
    //   permission: "applyLeaves",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Apply Leave Manager",
    //   link: "/dashboard/leavemanager",
    //   permission: "acceptandrejectleave",
    // },
    // {
    //   name: "Employee Leave History",
    //   link: "/dashboard/employeeleavehistory",
    //   permission: "viewLeaves",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Attendance View",
    //   link: "/dashboard/subordinateslist",
    //   permission: "viewAttendance",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Update Employees",
    //   link: "/dashboard/allemployes",
    //   permission: "updateEmployeeSuperAdmin",
    //   hasDropdown: false,
    // },

    {
      name: "Review Performance",
      hasDropdown: true,
      icon: <FaFileSignature />,

      dropdownItems: [
        {
          name: "Rate Subordinate",
          link: "/dashboard/kpi-rating",
          permission: "rateSubordinate",
        },
        {
          name: "View Subordinate Ratings",
          link: "/dashboard/subordinate-rating",
          permission: "viewSubordinateRatings",
        },
        {
          name: "All Employes Rating",
          link: "/dashboard/all/employee/ratings",
          permission: "viewAllEmployeeRatings",
        },
      ],
    },
    // {
    //   name: "Rate Subordinate",
    //   link: "/dashboard/kpi-rating",
    //   permission: "rateSubordinate",
    //   hasDropdown: false,
    // },
    // {
    //   name: "View Subordinate Ratings",
    //   link: "/dashboard/subordinate-rating",
    //   permission: "viewSubordinateRatings",
    //   hasDropdown: false,
    // },
    // {
    //   name: "All Employes Rating",
    //   link: "/dashboard/all/employee/ratings",
    //   permission: "viewAllEmployeeRatings",
    //   hasDropdown: false,
    // },
    {
      name: "Performance Management",
      hasDropdown: true,
      icon: <FaChartBar />,
      dropdownItems: [
        {
          name: "Post Top Performer",
          link: "topratedemployees",
          permission: "postTopPerformer",
        },
        {
          name: "View Top Performers",
          link: "topperformanceemployees",
          permission: "viewTopPerformers",
        },
        {
          name: "Set KPIs",
          link: "admin-action-tracker2",
          permission: "setKPIs",
        },
      ],
    },
    // {
    //   name: "Post Top Performer",
    //   link: "topratedemployees",
    //   permission: "postTopPerformer",
    //   hasDropdown: false,
    // },
    // {
    //   name: "View Top Performers",
    //   link: "topperformanceemployees",
    //   permission: "viewTopPerformers",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Set KPIs",
    //   link: "admin-action-tracker2",
    //   permission: "setKPIs",
    //   hasDropdown: false,
    // },

    {
      name: "Company Settings",
      hasDropdown: true,
      icon: <FaCog />,
      dropdownItems: [
        {
          name: "Add Department",
          link: "/dashboard/departdesig",
          permission: "superAdminDepartmentDesignation",
        },
        {
          name: "Company Settings",
          link: "/dashboard/company-settings",
          permission: "CompanySettings",
        },
        {
          name: "Company Info",
          link: "/dashboard/CompanyInfo",
          permission: "companyInfo",
        },
        {
          name: "Add Designation",
          link: "/dashboard/addDesignation",
          permission: "addDesignation",
        },
      ],
    },

    {
      name: "My Profile",
      link: "/dashboard/my-profile",
      permission: "viewProfile",
      hasDropdown: false,
      icon: <FaUserCircle />,
    },

    {
      name: "Training Material",
      link: "/dashboard/training-material",
      permission: "trainingMaterial",
      hasDropdown: false,
      icon: <FaChalkboardTeacher />,
    },

    {
      name: "Organization Chart",
      link: "/dashboard/organization-chart",
      permission: "organizationChart",
      hasDropdown: false,
      icon: <FaUserCheck />,
    },
    {
      name: "Notification",
      link: "/dashboard/notificationv2",
      permission: "organizationChart",
      hasDropdown: false,
      icon: <FaUserCheck />,
    },
    // company info
    // {
    //   name: "Company Info",
    //   link: "/dashboard/CompanyInfo",
    //   permission: "companyInfo",
    //   hasDropdown: false,
    // },
    // {
    //   name: "Add Designation",
    //   link: "/dashboard/addDesignation",
    //   permission: "addDesignation",
    //   hasDropdown: false,
    // },
  ];

  // Render Menu Items
  const renderMenuItems = () => {
    if (!permissions.length) {
      return <p>Loading...</p>;
    }

    return menuItems.map((item) => {
      // Check if the user is allowed to access this menu item
      if (item.hasDropdown) {
        const allowedDropdownItems = item.dropdownItems.filter((subItem) =>
          isAllowed(subItem.permission)
        );

        if (allowedDropdownItems.length > 0) {
          // Render the dropdown only if at least one dropdown item is allowed
          return (
            <li key={item.name} className="px-4 py-2 hm-sidebar-new ">
              <div
                className="d-flex  align-items-center active"
                onClick={() => toggleDropdown(item.name)}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={openDropdown === item.name}
              >
                {item.icon && (
                  <span className="menu-item-icon">{item.icon}</span>
                )}
                {item.name}
              </div>
              {openDropdown === item.name && (
                <ul className="list-group-item position-static top-0 start-0 ">
                  {allowedDropdownItems.map((subItem) => (
                    <Link className=" p-1 text-wrap" to={subItem.link}>
                      <li className="active " key={subItem.name}>
                        {subItem.icon && (
                          <span className="menu-item-icon">{subItem.icon}</span>
                        )}

                        {subItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          );
        }
      } else if (isAllowed(item.permission)) {
        // Render the item if it does not have a dropdown and is allowed
        return (
          <Link to={item.link}>
            <li key={item.name} className="px-4 py-2 ">
              {item.icon && <span className="menu-item-icon">{item.icon}</span>}
              {item.name}
            </li>
          </Link>
        );
      }

      return null; // Don't render if not allowed
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          transition: "width 0.3s ease",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          height: "100vh",
          position: "fixed",
          overflowY: "auto",
        }}
      >
        <div
          className="d-flex align-items-center"
          style={{
            flexDirection: "column",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          {Array.isArray(companyInfo) && companyInfo.length > 0 ? (
            companyInfo.map((data, index) => (
              <div
                key={index}
                className="d-flex align-items-center"
                style={{ flexDirection: "column", marginBottom: "15px" }}
              >
                <img
                  src={data.logo ? data.logo : img2}
                  alt="Logo"
                  className="hm-logo-img"
                  style={{
                    width: "80%",
                    // height: "!00%",
                    // objectFit: "cover",
                    // borderRadius: "50%",
                    marginBottom: "10px",
                    // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0d306d",
                  }}
                >
                  {data.name}
                </div>
              </div>
            ))
          ) : (
            <div
              className="d-flex align-items-center"
              style={{ flexDirection: "column" }}
            >
              <img
                src={img2}
                alt="Fallback Logo"
                className="hm-logo-img"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              />
              {/* <p style={{ fontSize: "16px", fontWeight: "bold", color: "#0d306d" }}>Default Company Name</p> */}
            </div>
          )}
        </div>

        {/* Integrate the PunchInOut component */}
        <PunchInOut permissions={permissions} />

        <div className="nav-items active" style={{ marginTop: "20px" }}>
          <ul className="list-unstyled" style={{ padding: "0" }}>
            {renderMenuItems()}
          </ul>
        </div>

        {/* Display error if any */}
        {error && (
          <p
            className="error-message"
            style={{
              color: "red",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Error: {error}
          </p>
        )}
      </aside>

      <div
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "20px",
          left: isSidebarOpen ? "250px" : "60px",
          transition: "left 0.3s ease",
          cursor: "pointer",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Sidebar toggle button code */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#0d306d"
        >
          <path
            d={
              isSidebarOpen
                ? "M6 18L18 6M6 6l12 12" // 'X' icon when open
                : "M4 5h16v2H4zm0 6h16v2H4zm0 6h16v2H4z" // Hamburger icon when closed
            }
          />
        </svg>
      </div>
    </>
  );
};

export default Sidebar;
