import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimes, FaClock, } from "react-icons/fa";
import { fetchSubordinateLeaveStats } from "../../service/leaveService.js";
import LeaveCalendarDashboard from './SubordinateLeave.jsx'

const LeaveManagementDashboard = () => {
  
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetchSubordinateLeaveStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching subordinate leave stats:", error);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="h-auto bg-gray-50 dark:bg-gray-900 p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Requests</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingRequests}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <FaClock className="text-orange-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved This Month</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.approvedThisMonth}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FaCheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected This Month</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejectedThisMonth}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <FaTimes className="text-red-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>
      <LeaveCalendarDashboard/>
    </div>
  );
};

export default LeaveManagementDashboard;




