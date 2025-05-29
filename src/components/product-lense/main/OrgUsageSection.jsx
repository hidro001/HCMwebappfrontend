import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor,
  FiGlobe,
  FiFilter,
  FiTrendingUp,
  FiPieChart,
  FiClock,
} from "react-icons/fi";
import useUsageStatsStore from "../../../store/useUsageStore";
import {
  fetchDepartments,
  fetchDesignations,
} from "../../../service/employeeService";

const OrgUsageSection = () => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [activeTab, setActiveTab] = useState("apps");

  const { orgMostUsedStats, fetchOrgMostUsedStats, loading } =
    useUsageStatsStore();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedDepartments = await fetchDepartments();
        const fetchedDesignations = await fetchDesignations();

        setDepartments(fetchedDepartments);
        setDesignations(fetchedDesignations);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    fetchOrgMostUsedStats(department, designation, 5);
  }, [department, designation, fetchOrgMostUsedStats]);

  // Calculate maximum time for progress bars
  const getMaxTime = () => {
    if (activeTab === "apps" && orgMostUsedStats?.topApps?.length > 0) {
      return Math.max(...orgMostUsedStats.topApps.map((app) => app.minutes));
    } else if (
      activeTab === "websites" &&
      orgMostUsedStats?.topWebsites?.length > 0
    ) {
      return Math.max(
        ...orgMostUsedStats.topWebsites.map((website) => website.minutes)
      );
    }
    return 100;
  };

  const maxTime = getMaxTime();

  // Format minutes to hours and minutes
  const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-indigo-500" />
              Organization-wide Usage
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Insights into most used apps and websites across your organization
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center ${
                activeTab === "apps"
                  ? "bg-indigo-500 text-white shadow-indigo-200 dark:shadow-indigo-900 shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("apps")}
            >
              <FiMonitor className="mr-2" />
              Apps
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center ${
                activeTab === "websites"
                  ? "bg-indigo-500 text-white shadow-indigo-200 dark:shadow-indigo-900 shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("websites")}
            >
              <FiGlobe className="mr-2" />
              Websites
            </motion.button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 cursor-pointer"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.department}>
                      {dept.department}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiFilter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Designation
              </label>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 cursor-pointer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                >
                  <option value="">All Designations</option>
                  {designations.map((desig) => (
                    <option key={desig._id} value={desig.designation}>
                      {desig.designation}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <FiFilter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="animate-pulse bg-gray-100 dark:bg-gray-700 h-20 rounded-xl"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Column Headers */}
              <div className="grid grid-cols-3 gap-4 mb-4 px-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Name
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Usage
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Time
                </div>
              </div>

              {/* Apps Content */}
              {activeTab === "apps" && (
                <>
                  {orgMostUsedStats?.topApps?.length > 0 ? (
                    orgMostUsedStats.topApps.map((app, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                      >
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="flex items-center">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                              <FiMonitor className="text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-gray-100">
                                {app.appName}
                              </h3>
                            </div>
                          </div>

                          <div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(app.minutes / maxTime) * 90}%`,
                                }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <FiClock className="text-gray-400 dark:text-gray-500 mr-1" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {formatMinutes(app.minutes)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FiPieChart className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
                        No app usage data available
                      </h3>
                    </div>
                  )}
                </>
              )}

              {/* Websites Content */}
              {activeTab === "websites" && (
                <>
                  {orgMostUsedStats?.topWebsites?.length > 0 ? (
                    orgMostUsedStats.topWebsites.map((website, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                      >
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="flex items-center">
                            <div className="bg-teal-100 dark:bg-teal-900/30 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                              <FiGlobe className="text-teal-500 dark:text-teal-400" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800 dark:text-gray-100">
                                {website.url}
                              </h3>
                            </div>
                          </div>

                          <div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-teal-400 to-teal-600 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(website.minutes / maxTime) * 90}%`,
                                }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center">
                            <FiClock className="text-gray-400 dark:text-gray-500 mr-1" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {formatMinutes(website.minutes)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FiGlobe className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
                      <h3 className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
                        No website usage data available
                      </h3>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <FiClock className="text-indigo-500 dark:text-indigo-400 mr-2" />
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Data updated just now
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrgUsageSection;
