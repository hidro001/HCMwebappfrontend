import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdModelTraining } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { LuFileCheck2 } from "react-icons/lu";
import { fetchPermissions } from "../../service/service";
import useAuthStore from "../../store/store";
import { Announcement } from "@mui/icons-material";

const Sidebar = () => {
  const [currentSidebarTab, setCurrentSidebarTab] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const navigate = useNavigate()
  const empId = useAuthStore((state) => state.employeeId);
  useEffect(() => {
    fetchPermission();
  }, []);

  const fetchPermission = async () => {
    try {
      const data = await fetchPermissions(empId);
      setPermissions(data.permissions);
    } catch (err) {
      console.log(err, "error to fetch employee permissions");
    }
  };

  useEffect(() => {
    if (permissions.length > 0) {
      filterMenuItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions]);

  const filterMenuItems = () => {
    const filtered = menuItems
      .map((item) => {
        // Filter the options based on permissions
        const filteredOptions = item.options.filter((option) =>
          permissions.includes(option.permission)
        );
        return { ...item, options: filteredOptions };
      })
      .filter((item) => item.options.length > 0); // Only include items that have at least one option
    setFilteredMenuItems(filtered);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      color: "text-blue-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Home",
          link: "super-admin-dashboard",
          permission: "SuperDashboard",
          textAnimation: { x: 10 },
        },
        {
          name: "Home",
          link: "manager-dashboard",
          permission: "managerDashboard",
          textAnimation: { x: 10 },
        },
        {
          name: "Home",
          link: "employee-dashboard",
          permission: "employeeDashboard",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Announcements",
      icon: <FaBullhorn />,
      color: "text-yellow-400",
      iconAnimation: { x: 7 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Create Announcement",
          link: "add-announcement",
          permission: "AddAnnouncement",
          textAnimation: { x: 10 },
        },
        {
          name: "View Announcement",
          link: "view-announcement",
          // permission: "ViewAnnouncement",
          permission: "AddAnnouncement",

          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Engagement",
      icon:<TiSocialTwitter />,
      color: "text-yellow-400",
      iconAnimation: { rotate: 360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "permission dashboard",
          link: "engagement-permission-dashboard",
          permission: "AddAnnouncement",
          textAnimation: { x: 10 },
        },
        {
          name: "Engagement Feed",
          link: "engagement-feed",
          // permission: "ViewAnnouncement",
          permission: "AddAnnouncement",

          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: " Company Policies",
      icon: <FaClipboard />,
      color: "text-green-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "View Policies",
          link: "/dashboard/policies",
          permission: "viewPolicies",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Policies",
          link: "/dashboard/update-policies",
          permission: "PolicySystem",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Company Orientations",
      icon: <FaBook />,
      color: "text-red-400",
      iconAnimation: { rotate: 360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Update Induction",
          link: "/dashboard/post-induction",
          permission: "postInduction",
          textAnimation: { x: 10 },
        },
        {
          name: "View Induction",
          link: "/dashboard/induction",
          permission: "viewInduction",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Manage Employees",
      icon: <FaUsers />,
      color: "text-orange-400",
      iconAnimation: { rotate: -360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Add Employee",
          link: "/dashboard/add-employee",
          permission: "addEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Add Employee",
          link: "/dashboard/add-employeev2",
          permission: "addEmployeeManager",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employee",
          link: "/dashboard/update-employee",
          permission: "updateEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employee",
          link: "/dashboard/update-employeev2",
          permission: "updateEmployeeManager",
          textAnimation: { x: 10 },
        },
        {
          name: "Delete Employee",
          link: "/dashboard/delete-employee",
          permission: "deleteEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "View Employee",
          link: "/dashboard/all-employees",
          permission: "viewEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Employee Status",
          link: "/dashboard/active-inactive-employee",
          permission: "active/InactiveEmployeeAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employees",
          link: "/dashboard/allemployes",
          permission: "updateEmployeeSuperAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Asset",
          link: "/dashboard/asset",
          permission: "assignAssets",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Task Management Manager",
      icon: <FaTasks />,
      color: "text-blue-400",
      iconAnimation: { rotate: 360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "View Daily Tasks",
          link: "/dashboard/view-task-hr",
          permission: "ViewTaskManager",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Daily Tasks",
          link: "/dashboard/update-task",
          permission: "updateTask",
          textAnimation: { x: 10 },
        },
        {
          name: "Assign Task",
          link: "/dashboard/manager-action-tracker",
          permission: "ActionTrackerManager",
          textAnimation: { x: 10 },
        },
        {
          name: "Assigned Tasks",
          link: "/dashboard/action-tracker",
          permission: "actionTracker",
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
          name: "Job Posting",
          link: "/dashboard/job-posting",
          permission: "jobPostingAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Vacancies Management",
          link: "/dashboard/job-fetching",
          permission: "jobVacancyAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "HR Referral Dashboard",
          link: "/dashboard/hr-referral-dashboard",
          permission: "HRreferralDashboard",
          textAnimation: { x: 10 },
        },
        {
          name: "Vacancies",
          link: "/dashboard/employee-pending-jobs",
          permission: "viewVacancies",
          textAnimation: { x: 10 },
        },
        {
          name: "Employee Referral Tracker",
          link: "/dashboard/my-referral-dashboard",
          permission: "employeeReferralDashboard",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Issue Management",
      icon: <FaBug />,
      color: "text-green-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "All Issues",
          link: "/dashboard/all-issues",
          permission: "IssueManagementSuperAdmin",
          textAnimation: { x: 10 },
        },
        {
          name: "Raise Ticket ",
          link: "/dashboard/get-support",
          permission: "getSupport",
          textAnimation: { x: 10 },
        },
        {
          name: "Manage Tickets",
          link: "/dashboard/manage-issues-admin",
          permission: "manageIssuesAdmin",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "RACI",
      icon: <FaGlobe />,
      color: "text-red-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "RACI Business",
          link: "/dashboard/raci2",
          permission: "Raci2",
          textAnimation: { x: 10 },
        },
        {
          name: "RACI OPS",
          link: "/dashboard/raci",
          permission: "superAdminRaci",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Payroll & Attendence",
      icon: <FaMoneyCheckAlt />,
      color: "text-orange-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Manage Payroll",
          link: "/dashboard/payroll",
          permission: "payroll",
          textAnimation: { x: 10 },
        },
        {
          name: "Attendance & Payroll",
          link: "/dashboard/my-attendance",
          permission: "myAttendance",
          textAnimation: { x: 10 },
        },
        {
          name: "View Attendance",
          link: "/dashboard/subordinateslist",
          permission: "viewAttendance",
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
        {
          name: "Apply Leaves ",
          link: "/dashboard/leavemanage",
          permission: "applyLeaves",
          textAnimation: { x: 10 },
        },
        {
          name: " Manage Leaves ",
          link: "/dashboard/leavemanager",
          permission: "acceptandrejectleave",
          textAnimation: { x: 10 },
        },
        {
          name: "Leaves History",
          link: "/dashboard/employeeleavehistory",
          permission: "viewLeaves",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Review Performance",
      icon: <FaFileSignature />,
      color: "text-yellow-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Rate Subordinate",
          link: "/dashboard/kpi-rating",
          permission: "rateSubordinate",
          textAnimation: { x: 10 },
        },
        {
          name: "View Subordinate Ratings",
          link: "/dashboard/subordinate-rating",
          permission: "viewSubordinateRatings",
          textAnimation: { x: 10 },
        },
        {
          name: "All Employes Rating",
          link: "/dashboard/all/employee/ratings",
          permission: "viewAllEmployeeRatings",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Performance management",
      icon: <GrDocumentPerformance />,
      color: "text-green-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
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
    {
      name: "Company Settings",
      icon: <FaCog />,
      color: "text-red-400",
      iconAnimation: { scale: 1.3 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Add Department",
          link: "/dashboard/departdesig",
          permission: "superAdminDepartmentDesignation",
          textAnimation: { x: 10 },
        },
        {
          name: "Company Settings",
          link: "/dashboard/company-settings",
          permission: "CompanySettings",
          textAnimation: { x: 10 },
        },
        {
          name: "Company Info",
          link: "/dashboard/CompanyInfo",
          permission: "companyInfo",
          textAnimation: { x: 10 },
        },
        {
          name: "Add Role",
          link: "/dashboard/addRole",
          permission: "addRole",
          textAnimation: { x: 10 },
        },
        {
          name: "Add Designation",
          link: "/dashboard/addDesignation",
          permission: "addDesignation",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "User Profile",
      icon: <FaUserCircle />,
      color: "text-orange-400",
      iconAnimation: { scale: 1.3 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "My Profile",
          link: "/dashboard/my-profile",
          permission: "viewProfile",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Training Material",
      icon: <MdModelTraining />,
      color: "text-blue-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Training Material",
          link: "/dashboard/training-material",
          permission: "trainingMaterial",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Organization Chart",
      icon: <RiOrganizationChart />,
      color: "text-yellow-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Organization Chart",
          link: "/dashboard/training-material",
          permission: "trainingMaterial",
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
          name: "Submit Resignation",
          link: "/dashboard/ResignationForm",
          permission: "submitResignation",
          textAnimation: { x: 10 },
        },
        {
          name: "Resignation Dashboard",
          link: "/dashboard/resignation-dashboard",
          permission: "employeeResignationDashboard",
          textAnimation: { x: 10 },
        },
        {
          name: "Resignation Approvals",
          link: "/dashboard/manage-resignation",
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
  ];

  const toggleSidebarTab = (tabName) => {
    setCurrentSidebarTab((prev) => (prev === tabName ? null : tabName));
  };

  return (
    <div className="flex h-screen sticky left-0 ">
      {/* Main Sidebar */}
      <div className="bg-gray-200 overflow-y- text-black dark:text-white dark:bg-gray-800 z-50 border-r border-gray-500 w-16 flex flex-col items-center py-4 space-y-6">
        {filteredMenuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleSidebarTab(item.name)}
            className={`p-2 rounded-lg hover:bg-gray-500 ${
              currentSidebarTab === item.name ? "bg-gray-500" : ""
            }`}
          >
            <motion.div
              className={`text-xl ${item.color}`}
              whileHover={item.iconAnimation}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
          </button>
        ))}
      </div>

      {/* Sub-Sidebar with Animation */}
      <motion.div
        className="w-50 h-full stickey bg-gray-500 text-white overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        initial={{ width: 0 }}
        animate={{ width: currentSidebarTab ? "11rem" : 0 }} // Changed to "16rem" for consistency with "w-64"
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {currentSidebarTab && (
          <div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{currentSidebarTab}</h2>
            </div>
            <ul className="space-y-2">
              {filteredMenuItems
                .find((item) => item.name === currentSidebarTab)
                ?.options.map((option, index) => (
                  <motion.li
                    key={index}
                    className="p-4 hover:bg-gray-600 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                    to={option.link}
                    // onClick={()=>{navigate(option.link)}}
                      className="flex items-center space-x-4"
                    >
                      {/* If you have icons for options, include them here */}
                      <motion.span
                        className="text-blue-300 text-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      ></motion.span>
                      <motion.span
                        className="text-sm" // Removed `${option.color}` since options don't have a color property
                        whileHover={option.textAnimation}
                        transition={{ duration: 0.3 }}
                      >
                        {option.name}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
