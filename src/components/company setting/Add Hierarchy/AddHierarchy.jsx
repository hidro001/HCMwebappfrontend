// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import DepartmentTable from "./DepartmentTable";
// import DesignationTable from "./DesignationTable";
// import RoleTable from "./RoleTable";

// export default function AddHierarchy() {
//   const [activeTab, setActiveTab] = useState("department");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 200);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="p-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("department")}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "department"
//               ? "bg-purple-500 text-white"
//               : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//           }`}
//         >
//           Add Department
//         </button>
//         <button
//           onClick={() => setActiveTab("designation")}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "designation"
//               ? "bg-purple-500 text-white"
//               : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//           }`}
//         >
//           Add Designation
//         </button>
//         <button
//           onClick={() => setActiveTab("role")}
//           className={`px-4 py-2 rounded-lg font-semibold ${
//             activeTab === "role"
//               ? "bg-purple-500 text-white"
//               : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//           }`}
//         >
//           Add Role
//         </button>
//       </div>
//       <motion.div
//         key={activeTab}
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
//       >
//         {activeTab === "department" && <DepartmentTable isLoading={isLoading} />}
//         {activeTab === "designation" && <DesignationTable isLoading={isLoading} />}
//         {activeTab === "role" && <RoleTable isLoading={isLoading} />}
//       </motion.div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaUserTie,
  FaShieldAlt,
  FaCog,
  FaLayerGroup,
  FaUsers,
  FaCrown,
  FaChartLine
} from "react-icons/fa";
import {
  HiOfficeBuilding,
  HiBadgeCheck,
  HiUserGroup,
  HiCog
} from "react-icons/hi";
import DepartmentTable from "./DepartmentTable";
import DesignationTable from "./DesignationTable";
import RoleTable from "./RoleTable";

export default function AddHierarchy() {
  const [activeTab, setActiveTab] = useState("department");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    {
      id: "department",
      label: "Departments",
      icon: HiOfficeBuilding,
      color: "blue",
      description: "Manage organizational departments"
    },
    {
      id: "designation",
      label: "Designations",
      icon: HiBadgeCheck,
      color: "green",
      description: "Define job positions and titles"
    },
    {
      id: "role",
      label: "Roles",
      icon: HiUserGroup,
      color: "purple",
      description: "Configure user roles and permissions"
    }
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

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Hierarchy Management...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <FaLayerGroup className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Organizational Hierarchy
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your company's organizational structure, departments, designations, and user roles
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {tabs.map((tab, index) => (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all duration-200 ${
                activeTab === tab.id 
                  ? `ring-2 ring-${tab.color}-500 bg-${tab.color}-50 dark:bg-${tab.color}-900/10` 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-${tab.color}-100 dark:bg-${tab.color}-900/20 rounded-xl`}>
                  <tab.icon className={`text-${tab.color}-600 dark:text-${tab.color}-400 text-2xl`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${
                    activeTab === tab.id 
                      ? `text-${tab.color}-700 dark:text-${tab.color}-300` 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {tab.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tab.description}
                  </p>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-3 h-3 bg-${tab.color}-600 rounded-full`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-0">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={tabVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? `text-${tab.color}-600 dark:text-${tab.color}-400 bg-${tab.color}-50 dark:bg-${tab.color}-900/10`
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-${tab.color}-600`}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {activeTab === "department" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Department Management
                        </h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Create and manage organizational departments to structure your company hierarchy.
                      </p>
                    </div>
                    <DepartmentTable />
                  </motion.div>
                )}

                {activeTab === "designation" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <HiBadgeCheck className="text-green-600 dark:text-green-400 text-xl" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Designation Management
                        </h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Define job positions, titles, and career levels within your organization.
                      </p>
                    </div>
                    <DesignationTable />
                  </motion.div>
                )}

                {activeTab === "role" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-2">
                        <HiUserGroup className="text-purple-600 dark:text-purple-400 text-xl" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Role Management
                        </h2>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Configure user roles, permissions, and access levels for system security.
                      </p>
                    </div>
                    <RoleTable />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaBuilding className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Departments</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Organizational units</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaUserTie className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Designations</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Job positions</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaShieldAlt className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Roles</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access permissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <FaChartLine className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Hierarchy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Structure overview</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}