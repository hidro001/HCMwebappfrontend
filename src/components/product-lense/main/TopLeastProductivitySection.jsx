import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiCoffee,
  FiPhone,
  FiBriefcase,
  FiFilter,
} from "react-icons/fi";
import useUsageStatsStore from "../../../store/useUsageStore";
import {
  fetchDesignations,
  fetchDepartments,
} from "../../../service/employeeService";

const TopLeastProductivitySection = () => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [activeTab, setActiveTab] = useState("top");

  const {
    averageBreakWorkStats,
    fetchAverageBreakAndWorkHours,
    topLeastProductivity,
    fetchTopLeastProductiveEmployees,
    loading,
  } = useUsageStatsStore();

  useEffect(() => {
    fetchAverageBreakAndWorkHours(department, designation);
    fetchTopLeastProductiveEmployees(department, designation);
  }, [
    department,
    designation,
    fetchAverageBreakAndWorkHours,
    fetchTopLeastProductiveEmployees,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const depts = await fetchDepartments();
        const desigs = await fetchDesignations();
        setDepartments(depts);
        setDesignations(desigs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Format hours from minutes
  const formatHours = (minutes) => {
    const hours = (minutes / 60).toFixed(1);
    return `${hours} hrs`;
  };

  // Calculate productivity score
  const calculateProductivityScore = (working, breakTime) => {
    const totalTime = working + breakTime;
    if (totalTime === 0) return 0;
    return Math.round((working / totalTime) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FiUser className="text-indigo-500" />
              Employee Productivity Analysis
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Identify top performers and opportunities for improvement
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center ${
                activeTab === "top"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("top")}
            >
              <FiTrendingUp className="mr-2" />
              Top Performers
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center ${
                activeTab === "least"
                  ? "bg-indigo-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("least")}
            >
              <FiTrendingDown className="mr-2" />
              Improvement Opportunities
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <FiBriefcase className="text-indigo-500" /> Department
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1">
                <FiPhone className="text-indigo-500" /> Designation
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

        {/* Average Stats */}
        {averageBreakWorkStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex items-center">
                <div className="bg-indigo-500 p-3 rounded-xl mr-4">
                  <FiClock className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Average Working Time
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {(averageBreakWorkStats.averageWorkingMinutes / 60).toFixed(
                      1
                    )}{" "}
                    hrs
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-800/30">
              <div className="flex items-center">
                <div className="bg-rose-500 p-3 rounded-xl mr-4">
                  <FiCoffee className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Average Break Time
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {(averageBreakWorkStats.averageBreakMinutes / 60).toFixed(
                      1
                    )}{" "}
                    hrs
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
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
        )}

        {/* Content */}
        {!loading && (
          <div className="space-y-6">
            {/* Top Productive Employees */}
            {(activeTab === "top" || !activeTab) &&
              topLeastProductivity?.topProductive?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                      <FiTrendingUp className="text-green-500" />
                      Top Productive Employees
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Employee
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Productivity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Working Hours
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Break Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {topLeastProductivity.topProductive.map(
                          (emp, index) => {
                            const score = calculateProductivityScore(
                              emp.avgWorkingMinutes,
                              emp.avgBreakMinutes
                            );
                            return (
                              <motion.tr
                                key={emp.employeeId}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                              >
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="bg-green-100 dark:bg-green-900/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-green-600 dark:text-green-400 font-medium">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">
                                        {emp.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {emp.department || "No department"}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full"
                                        style={{ width: `${score}%` }}
                                      />
                                    </div>
                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                      {score}%
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                  {formatHours(emp.avgWorkingMinutes)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                  {formatHours(emp.avgBreakMinutes)}
                                </td>
                              </motion.tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            {/* Least Productive Employees */}
            {(activeTab === "least" || !activeTab) &&
              topLeastProductivity?.leastProductive?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-amber-700 dark:text-amber-300 flex items-center gap-2">
                      <FiTrendingDown className="text-amber-500" />
                      Improvement Opportunities
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Employee
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Productivity
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Working Hours
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Break Time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {topLeastProductivity.leastProductive.map(
                          (emp, index) => {
                            const score = calculateProductivityScore(
                              emp.avgWorkingMinutes,
                              emp.avgBreakMinutes
                            );
                            return (
                              <motion.tr
                                key={emp.employeeId}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                              >
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="bg-amber-100 dark:bg-amber-900/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                                        {index + 1}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">
                                        {emp.name}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {emp.department || "No department"}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                                      <div
                                        className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full"
                                        style={{ width: `${score}%` }}
                                      />
                                    </div>
                                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                                      {score}%
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                  {formatHours(emp.avgWorkingMinutes)}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300">
                                  {formatHours(emp.avgBreakMinutes)}
                                </td>
                              </motion.tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

            {/* Empty State */}
            {(!topLeastProductivity?.topProductive?.length ||
              !topLeastProductivity?.leastProductive?.length) && (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                <FiUser className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
                  No productivity data available
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your filters or check back later as data becomes
                  available.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

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

export default TopLeastProductivitySection;
