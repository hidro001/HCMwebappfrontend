
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserAlt, FaCalendarAlt, FaCheckCircle, FaEye, FaCheck, FaTimes, FaCalendarCheck, FaList, FaFilter, FaSearch, FaClock, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import useLeaveStore from "../../store/useLeaveStore.js";
import { fetchSubordinateLeaveStats } from "../../service/leaveService.js";
import BaseModal from "../common/BaseModal.jsx";

const LeaveManagementDashboard = () => {

  const { leaves, isLoading, fetchAssignedLeaves, userProfile, handleLeaveRequest } = useLeaveStore();

  const [viewMode, setViewMode] = useState("calendar"); // calendar or list
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState(""); // approve or reject
  const [rejectionReason, setRejectionReason] = useState("");
  
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

  // Fetch assigned leaves whenever activeStatus changes
  useEffect(() => {
    fetchAssignedLeaves(activeStatus);
  }, [activeStatus, fetchAssignedLeaves]);

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get leaves for a specific date
  const getLeavesForDate = (date) => {
    const dateStr = formatDate(date);
    return leaves.filter(leave => {
      const leaveFrom = leave.leave_From;
      const leaveTo = leave.leave_To || leave.leave_From;
      return dateStr >= leaveFrom && dateStr <= leaveTo;
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonth.getDate() - i;
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day)
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      days.push({
        day,
        isCurrentMonth: true,
        date,
        leaves: getLeavesForDate(date)
      });
    }

    // Next month's leading days
    const totalCells = Math.ceil(days.length / 7) * 7;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    for (let day = 1; days.length < totalCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day)
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Filter leaves based on search and status
  const filteredLeaves = useMemo(() => {
    return leaves.filter(leave => {
      const matchesSearch = searchText === "" || 
        leave.employee.first_Name.toLowerCase().includes(searchText.toLowerCase()) ||
        leave.employee.last_Name.toLowerCase().includes(searchText.toLowerCase()) ||
        leave.employee.employee_Id.toLowerCase().includes(searchText.toLowerCase()) ||
        leave.leaveType.name.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = activeStatus === "all" || leave.leave_Status === activeStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [leaves, searchText, activeStatus]);

  const handleApprovalAction = (leave, action) => {
    setSelectedLeave(leave);
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const handleApprovalSubmit = () => {
    console.log(`${approvalAction} leave for`, selectedLeave.employee.first_Name);

    if (approvalAction === "reject") {
      handleLeaveRequest(selectedLeave._id, "rejected", rejectionReason )
      console.log("Rejection reason:", rejectionReason);
    }
    if(approvalAction === "approve"){
      handleLeaveRequest(selectedLeave._id, "approved", '' )

    }
    setShowApprovalModal(false);
    setRejectionReason("");

  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Header Stats */}
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

      {/* Controls */}
      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6"> */}
        {/* <div className="flex flex-wrap items-center justify-between gap-4"> */}
          {/* View Toggle */}
          {/* <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-white dark:bg-gray-600 text-blue-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaCalendarCheck className="inline mr-2" />
              Calendar View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-600 text-blue-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <FaList className="inline mr-2" />
              List View
            </button>
          </div> */}

          {/* Search */}
          {/* <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div> */}

          {/* Status Filter */}
          {/* <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div> */}

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white w-[60vw] dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaChevronRight className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((dayInfo, index) => (
                <div
                  key={index}
                  className={`min-h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg ${
                    dayInfo.isCurrentMonth
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700/50"
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    dayInfo.isCurrentMonth
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {dayInfo.day}
                  </div>
                  {dayInfo.leaves && dayInfo.leaves.map((leave, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1 rounded mb-1 cursor-pointer hover:opacity-80 transition-opacity ${
                        leave.leaveType.color.replace('500', '100')
                      } ${leave.leaveType.color.replace('bg-', 'text-').replace('500', '800')}`}
                      onClick={() => setSelectedLeave(leave)}
                    >
                      {leave.employee.first_Name} {leave.employee.last_Name.charAt(0)}.
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLeaves.map((leave, index) => (
                  <motion.tr 
                    key={leave._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {leave.employee.first_Name.charAt(0)}{leave.employee.last_Name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {leave.employee.first_Name} {leave.employee.last_Name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {leave.employee.employee_Id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        leave.leaveType.color.replace('500', '100')
                      } ${leave.leaveType.color.replace('bg-', 'text-').replace('500', '800')}`}>
                        {leave.leaveType.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div>{new Date(leave.leave_From).toLocaleDateString()}</div>
                      {leave.leave_To && (
                        <div className="text-gray-500 dark:text-gray-400">
                          to {new Date(leave.leave_To).toLocaleDateString()}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {leave.no_Of_Days} day{leave.no_Of_Days !== 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs">
                      <div className="truncate" title={leave.reason_For_Leave}>
                        {leave.reason_For_Leave}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        leave.leave_Status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : leave.leave_Status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {leave.leave_Status.charAt(0).toUpperCase() + leave.leave_Status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedLeave(leave)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {leave.leave_Status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprovalAction(leave, "approve")}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleApprovalAction(leave, "reject")}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Leave Details Modal */}
      <AnimatePresence>
        {selectedLeave && !showApprovalModal && (
              <BaseModal isOpen={!showApprovalModal} onClose={!!showApprovalModal}>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // className="w-[90vw] justify-center"
            onClick={() => setSelectedLeave(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-[50vw] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Leave Request Details
                  </h3>
                  <button
                    onClick={() => setSelectedLeave(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Employee</label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedLeave.employee.first_Name} {selectedLeave.employee.last_Name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {selectedLeave.employee.employee_Id}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Leave Type</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        selectedLeave.leaveType.color.replace('500', '200')
                      } ${selectedLeave.leaveType.color.replace('bg-', 'text-').replace('500', '800')}`}>
                        {selectedLeave.leaveType.name}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedLeave.leave_From).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedLeave.leave_To 
                          ? new Date(selectedLeave.leave_To).toLocaleDateString()
                          : "Same day"
                        }
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedLeave.no_Of_Days} day{selectedLeave.no_Of_Days !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason for Leave</label>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {selectedLeave.reason_For_Leave}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Handover</label>
                    <p className="text-gray-900 dark:text-white mt-1">
                      {selectedLeave.workHandover || '---'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact</label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedLeave.emergencyContact}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        selectedLeave.leave_Status === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : selectedLeave.leave_Status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {selectedLeave.leave_Status.charAt(0).toUpperCase() + selectedLeave.leave_Status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {selectedLeave.workHandover && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work Handover</label>
                      <p className="text-gray-900 dark:text-white mt-1">
                        {selectedLeave.workHandover}
                      </p>
                    </div>
                  )}

                  {selectedLeave.leave_Status === "rejected" && selectedLeave.reason_For_Reject && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rejection Reason</label>
                      <p className="text-red-600 dark:text-red-400 mt-1">
                        {selectedLeave.reason_For_Reject}
                      </p>
                    </div>
                  )}

                  {selectedLeave.leave_Status === "pending" && (
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => handleApprovalAction(selectedLeave, "approve")}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        Approve Leave
                      </button>
                      <button
                        onClick={() => handleApprovalAction(selectedLeave, "reject")}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        Reject Leave
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
          </BaseModal >
        )}
      </AnimatePresence>

      {/* Approval/Rejection Modal */}
      <AnimatePresence>
        {showApprovalModal && (
          <BaseModal isOpen={showApprovalModal} onClose={!showApprovalModal}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowApprovalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {approvalAction === "approve" ? "Approve" : "Reject"} Leave Request
                  </h3>
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to {approvalAction} the leave request for{" "}
                    <span className="font-medium">
                      {selectedLeave?.employee.first_Name} {selectedLeave?.employee.last_Name}
                    </span>
                    ?
                  </p>
                </div>

                {approvalAction === "reject" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Rejection <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      rows="3"
                      placeholder="Please provide a reason for rejection..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApprovalSubmit}
                    disabled={approvalAction === "reject" && !rejectionReason.trim()}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      approvalAction === "approve"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {approvalAction === "approve" ? "Approve" : "Reject"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          </BaseModal>
        )}
      </AnimatePresence>

      {/* Quick Actions Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button
            onClick={() => setActiveStatus("pending")}
            className="w-full text-left px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <FaClock size={12} />
            View Pending ({stats.pendingRequests})
          </button>
          <button
            onClick={() => setViewMode(viewMode === "calendar" ? "list" : "calendar")}
            className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            {viewMode === "calendar" ? <FaList size={12} /> : <FaCalendarCheck size={12} />}
            Switch to {viewMode === "calendar" ? "List" : "Calendar"}
          </button>
          <button
            className="w-full text-left px-3 py-2 text-sm text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-2"
          >
            <FaFilter size={12} />
            Export Report
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LeaveManagementDashboard;




