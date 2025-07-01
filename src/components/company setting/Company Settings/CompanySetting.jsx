// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaUserCog,
//   FaClock,
//   FaRegCalendar,
//   FaMoneyBill,
//   FaSun,
// } from "react-icons/fa";
// import AttendancePolicies from "./AttendancePolicies";
// import ShiftTimings from "./ShiftTimings";
// import Holidays from "./Holidays";
// import Deductions from "./Deductions";
// import PayrollCycles from "./PayrollCycles";
// import WorkingDays from "./WorkingDays";
// import EmploymentTypes from "./EmploymentTypes";
// import LeavesTypes from "./LeavesTypes";

// export default function CompanySetting() {
//   const [activeTab, setActiveTab] = useState(0);

//   const tabItems = [
//     { name: "Attendance Policies", icon: <FaUserCog />, component: <AttendancePolicies /> },
//     { name: "Shift Timings", icon: <FaClock />, component: <ShiftTimings /> },
//     { name: "Holidays", icon: <FaRegCalendar />, component: <Holidays /> },
//     { name: "Deductions", icon: <FaMoneyBill />, component: <Deductions /> },
//     { name: "Payroll Cycles", icon: <FaMoneyBill />, component: <PayrollCycles /> },
//     { name: "Working Days", icon: <FaSun />, component: <WorkingDays /> },
//     { name: "Employment Types", icon: <FaUserCog />, component: <EmploymentTypes /> },
//     { name: "Leaves Types", icon: <FaUserCog />, component: <LeavesTypes /> },
//   ];

//   return (
//     <div className="bg-bg-secondary p-6 mt-5">
//       <div className="flex flex-wrap gap-4 mb-6">
//         {tabItems.map((tab, index) => {
//           const isActive = activeTab === index;
//           return (
//             <button
//               key={index}
//               onClick={() => setActiveTab(index)}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 text-sm font-medium 
//                 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 
//                 ${
//                   isActive
//                     ? "bg-purple-600 border-purple-600 text-white"
//                     : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
//                 }
//               `}
//             >
//               <span>{tab.icon}</span>
//               <span>{tab.name}</span>
//             </button>
//           );
//         })}
//       </div>
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -30 }}
//           transition={{ duration: 0.3 }}
//           className="rounded-md shadow-lg bg-gray-700"
//         >
//           {tabItems[activeTab].component}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCog,
  FaClock,
  FaRegCalendar,
  FaMoneyBill,
  FaSun,
  FaCog,
  FaUsers,
  FaUmbrellaBeach,
  FaBuilding,
  FaCalendarCheck,
  FaDollarSign,
  FaBusinessTime,
  FaUserTie,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import {
  HiCog,
  HiClock,
  HiCalendar,
  HiCash,
  HiSun,
  HiUsers,
  HiOfficeBuilding
} from "react-icons/hi";
import AttendancePolicies from "./AttendancePolicies";
import ShiftTimings from "./ShiftTimings";
import Holidays from "./Holidays";
import Deductions from "./Deductions";
import PayrollCycles from "./PayrollCycles";
import WorkingDays from "./WorkingDays";
import EmploymentTypes from "./EmploymentTypes";
import LeavesTypes from "./LeavesTypes";

export default function CompanySetting() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const tabItems = [
    { 
      name: "Attendance Policies", 
      icon: <HiCog />, 
      component: <AttendancePolicies />,
      color: "blue",
      description: "Configure your company's attendance rules, overtime policies, and leave management settings"
    },
    { 
      name: "Shift Timings", 
      icon: <HiClock />, 
      component: <ShiftTimings />,
      color: "green",
      description: "Manage your organization's work shift schedules and timings"
    },
    { 
      name: "Holidays", 
      icon: <HiCalendar />, 
      component: <Holidays />,
      color: "purple",
      description: "Manage your organization's holiday calendar and celebrations"
    },
    { 
      name: "Deductions", 
      icon: <FaMoneyBill />, 
      component: <Deductions />,
      color: "red",
      description: "Manage payroll deductions and tax components"
    },
    { 
      name: "Payroll Cycles", 
      icon: <HiCash />, 
      component: <PayrollCycles />,
      color: "yellow",
      description: "Manage payroll processing schedules and payment cycles"
    },
    { 
      name: "Working Days", 
      icon: <HiSun />, 
      component: <WorkingDays />,
      color: "orange",
      description: "Configure working schedules and leave policies for your organization"
    },
    { 
      name: "Leave Types", 
      icon: <FaUmbrellaBeach />, 
      component: <LeavesTypes />,
      color: "pink",
      description: "Configure and manage all available leave types, policies, and requirements for your organization"
    },
    { 
      name: "Employment Types", 
      icon: <HiUsers />, 
      component: <EmploymentTypes />,
      color: "indigo",
      description: "Configure employment categories with specific policies and benefits"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const sidebarVariants = {
    expanded: { width: "320px" },
    collapsed: { width: "80px" }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 rounded-2xl "
    >
      <div className="flex h-[calc(100vh-140px)] overflow-hidden rounded-2xl">
        {/* Sidebar */}
        <motion.div
          variants={sidebarVariants}
          animate={isSidebarCollapsed ? "collapsed" : "expanded"}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      Company Settings
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Configure your organization
                    </p>
                  </div>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                {isSidebarCollapsed ? (
                  <FaChevronDown className="text-gray-500 dark:text-gray-400" />
                ) : (
                  <FaChevronUp className="text-gray-500 dark:text-gray-400" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2    [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
            {tabItems.map((tab, index) => {
              const isActive = activeTab === index;
              const colorClasses = {
                blue: isActive ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800" : "",
                green: isActive ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800" : "",
                purple: isActive ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800" : "",
                red: isActive ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800" : "",
                yellow: isActive ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800" : "",
                orange: isActive ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800" : "",
                indigo: isActive ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800" : "",
                pink: isActive ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800" : ""
              };

              const iconColorClasses = {
                blue: isActive ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                green: isActive ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                purple: isActive ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                red: isActive ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                yellow: isActive ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                orange: isActive ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                indigo: isActive ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400",
                pink: isActive ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" : "bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 text-gray-500 dark:text-gray-400"
              };

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive
                      ? colorClasses[tab.color]
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${iconColorClasses[tab.color]}`}>
                    <span className="text-lg">
                      {tab.icon}
                    </span>
                  </div>
                  
                  {!isSidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="font-medium text-sm truncate">
                        {tab.name}
                      </div>
                      <div className="text-xs opacity-75 truncate">
                        {tab.description}
                      </div>
                    </motion.div>
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`w-1 h-8 rounded-full ${
                        tab.color === 'blue' ? 'bg-blue-500' :
                        tab.color === 'green' ? 'bg-green-500' :
                        tab.color === 'purple' ? 'bg-purple-500' :
                        tab.color === 'red' ? 'bg-red-500' :
                        tab.color === 'yellow' ? 'bg-yellow-500' :
                        tab.color === 'orange' ? 'bg-orange-500' :
                        tab.color === 'indigo' ? 'bg-indigo-500' :
                        'bg-pink-500'
                      }`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          {!isSidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                    <FaBuilding className="text-blue-600 dark:text-blue-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                      Settings saved automatically
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Changes apply immediately
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${
                tabItems[activeTab].color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                tabItems[activeTab].color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                tabItems[activeTab].color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                tabItems[activeTab].color === 'red' ? 'bg-red-100 dark:bg-red-900/20' :
                tabItems[activeTab].color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                tabItems[activeTab].color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20' :
                tabItems[activeTab].color === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900/20' :
                'bg-pink-100 dark:bg-pink-900/20'
              }`}>
                <span className={`text-2xl ${
                  tabItems[activeTab].color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  tabItems[activeTab].color === 'green' ? 'text-green-600 dark:text-green-400' :
                  tabItems[activeTab].color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                  tabItems[activeTab].color === 'red' ? 'text-red-600 dark:text-red-400' :
                  tabItems[activeTab].color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                  tabItems[activeTab].color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                  tabItems[activeTab].color === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' :
                  'text-pink-600 dark:text-pink-400'
                }`}>
                  {tabItems[activeTab].icon}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tabItems[activeTab].name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {tabItems[activeTab].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto    [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
                transition-colors duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                {tabItems[activeTab].component}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`${
              tabItems[activeTab].color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              tabItems[activeTab].color === 'green' ? 'text-green-600 dark:text-green-400' :
              tabItems[activeTab].color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
              tabItems[activeTab].color === 'red' ? 'text-red-600 dark:text-red-400' :
              tabItems[activeTab].color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
              tabItems[activeTab].color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              tabItems[activeTab].color === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' :
              'text-pink-600 dark:text-pink-400'
            }`}>
              {tabItems[activeTab].icon}
            </span>
            <span className="font-medium text-gray-900 dark:text-white text-sm">
              {tabItems[activeTab].name}
            </span>
          </div>
          <div className="flex space-x-1">
            {tabItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  activeTab === index
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


