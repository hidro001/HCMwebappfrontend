import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaClipboard,
  FaBullhorn,
  FaUsers,
  FaUserPlus,
  FaUserEdit,
  FaUserMinus,
  FaEye,
  FaChartBar,
  FaUserCheck,
  FaBug,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [currentSidebarTab, setCurrentSidebarTab] = useState(null);

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      color: "text-blue-400",
      iconAnimation: { scale: 1.2 },
      textAnimation: { x: 10 },
      options: [
        { name: "Home", link: "/", textAnimation: { x: 10 } },
        { name: "Stats", link: "/stats", textAnimation: { x: 10 } },
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
          icon: <FaUserPlus />,
          color: "text-blue-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Add Employee V2",
          link: "/dashboard/add-employeev2",
          icon: <FaUserPlus />,
          color: "text-teal-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employee",
          link: "/dashboard/update-employee",
          icon: <FaUserEdit />,
          color: "text-green-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employee V2",
          link: "/dashboard/update-employeev2",
          icon: <FaUserEdit />,
          color: "text-yellow-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Delete Employee",
          link: "/dashboard/delete-employee",
          icon: <FaUserMinus />,
          color: "text-red-400",
          textAnimation: { x: 10 },
        },
        {
          name: "View Employee",
          link: "/dashboard/all-employees",
          icon: <FaEye />,
          color: "text-purple-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Active/Inactive Employee",
          link: "/dashboard/active-inactive-employee",
          icon: <FaUserCheck />,
          color: "text-indigo-400",
          textAnimation: { x: 10 },
        },
        {
          name: "Organization Chart",
          link: "/dashboard/organization-chart",
          icon: <FaChartBar />,
          color: "text-orange-400",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Task Management Manager",
      icon: <FaTasks />,
      color: "text-red-400",
      iconAnimation: { rotate: 360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "My Tasks",
          link: "/task-management",
          textAnimation: { x: 10 },
        },
        { name: "Team Tasks", link: "/team-tasks", textAnimation: { x: 10 } },
      ],
    },
    {
      name: "Policies",
      icon: <FaClipboard />,
      color: "text-green-400",
      iconAnimation: { x: 10 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Manage Policy",
          link: "/manage-policy",
          textAnimation: { x: 10 },
        },
        { name: "HR Policy", link: "/hr-policy", textAnimation: { x: 10 } },
      ],
    },
    {
      name: "Announcements",
      icon: <FaBullhorn />,
      color: "text-yellow-400",
      iconAnimation: { y: -10 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Create Announcement",
          link: "/make-announcement",
          textAnimation: { x: 10 },
        },
        {
          name: "View Announcements",
          link: "/view-announcements",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Employee List",
      icon: <FaUsers />,
      color: "text-purple-400",
      iconAnimation: { scale: 1.5 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "All Employee List",
          link: "/employee-list",
          textAnimation: { x: 10 },
        },
        {
          name: "Update Employee",
          link: "/employee-list",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "Issue Management",
      path: "/issue-management",
      icon: <FaBug />,
      color: "text-teal-400",
      iconAnimation: { rotate: -360 },
      textAnimation: { x: 10 },
      options: [
        {
          name: "Issue Management",
          link: "/issue-management",
          textAnimation: { x: 10 },
        },
        {
          name: "issue 2 Management",
          link: "/issue-management",
          textAnimation: { x: 10 },
        },
      ],
    },
    {
      name: "User Profile",

      icon: <FaUserCircle />,
      color: "text-green-400",
      iconAnimation: { scale: 1.3 },
      textAnimation: { x: 10 },
      options: [
        { name: "My Profile", link: "/user-profile", textAnimation: { x: 10 } },
        {
          name: "Update Profile",
          link: "/user-profile",
          textAnimation: { x: 10 },
        },
      ],
    },
  ];

  const toggleSidebarTab = (tabName) => {
    setCurrentSidebarTab((prev) => (prev === tabName ? null : tabName));
  };

  return (
    <div className="flex h-full">
      {/* Main Sidebar */}
      <div className="bg-gray-800 text-white w-16 flex flex-col items-center py-4 space-y-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleSidebarTab(item.name)}
            className={`p-3 rounded-lg hover:bg-gray-700 ${
              currentSidebarTab === item.name ? "bg-gray-700" : ""
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
        className="w-64 bg-gray-700 text-white overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: currentSidebarTab ? "10rem" : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {currentSidebarTab && (
          <div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{currentSidebarTab}</h2>
            </div>
            <ul className="space-y-2">
              {menuItems
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
                      className="flex items-center space-x-4"
                    >
                      <motion.span
                        className="text-blue-300 text-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* ➜ */}
                      </motion.span>
                      <motion.span
                        className={`${option.color} text-sm`}
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
