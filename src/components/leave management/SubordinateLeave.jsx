import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCheck,
  FaSpinner
} from 'react-icons/fa';
import useLeaveStore from '../../store/useLeaveStore.js';
import useAttendanceStore from '../../store/useAttendanceStore.js';
import  MyLeave from './MyLeave.jsx';
import BaseModal from '../common/BaseModal.jsx';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; 
};



const LeaveCalendarDashboard = () => {
  const { leaves, isLoading: leaveLoading, fetchAssignedLeaves, userProfile, handleLeaveRequest, employees, fetchAssigndata, isLoadingEmployees
  } = useLeaveStore();
  
  const {
    subordinateStats, fetchSubordinateStats, loading: attendanceLoading, error: attendanceError,
  } = useAttendanceStore();

  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); 
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [activeTab, setActiveTab] = useState("company");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showVacationTooltip, setShowVacationTooltip] = useState(true);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        await Promise.all([
          fetchAssigndata(), 
          fetchSubordinateStats()
        ]);
        
        await fetchAssignedLeaves(activeStatus);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [fetchAssigndata, fetchSubordinateStats, fetchAssignedLeaves]);

  useEffect(() => {
    if (fetchAssignedLeaves) {
      fetchAssignedLeaves(activeStatus);
    }
  }, [activeStatus, fetchAssignedLeaves]);

  useEffect(() => {
    if (activeTab === "company") {
      fetchAssignedLeaves(activeStatus);
    }
  }, [activeTab, fetchAssignedLeaves, activeStatus]);

  const getUniqueEmployees = () => {
    const employeesFromLeaves = [];
    const employeeIds = new Set();

    if (leaves && Array.isArray(leaves)) {
      leaves.forEach(leave => {
        if (leave.employee && leave.employee._id) {
          if (!employeeIds.has(leave.employee._id)) {
            employeeIds.add(leave.employee._id);
            employeesFromLeaves.push({
              _id: leave.employee._id,
              employee_Id: leave.employee.employee_Id,
              employeeId: leave.employee.employee_Id,
              first_Name: leave.employee.first_Name,
              firstName: leave.employee.first_Name,
              last_Name: leave.employee.last_Name,
              lastName: leave.employee.last_Name,
              no_of_Paid_Leave: leave.employee.no_of_Paid_Leave,
              assigned_to: leave.employee.assigned_to,
              paid_leave_balance: leave.employee.paid_leave_balance,
              unpaid_leave_taken: leave.employee.unpaid_leave_taken,
              department: leave.employee.department,
              working_Email_Id: leave.employee.working_Email_Id
            });
          }
        }
      });
    }

    const employeesToUse = (employees && employees.length > 0) ? employees : employeesFromLeaves;
    return employeesToUse;
  };

  const employeeData = getUniqueEmployees();
  
  const employeesData = employeeData.map((emp, i) => ({
    id: emp._id ?? emp.id ?? i,
    empID: emp.employee_Id || emp.employeeId || emp.empID,
    name: `${emp.first_Name || emp.firstName || ''} ${emp.last_Name || emp.lastName || ''}`.trim(),
    department: emp.department,
    email: emp.working_Email_Id || emp.workingEmailId || emp.email,
    attendanceDate: emp.attendanceDate || "",
    userAvatar: emp.user_Avatar || emp.userAvatar,
    employee_Id: emp.employee_Id || emp.employeeId,
    employeeId: emp.employee_Id || emp.employeeId,
    first_Name: emp.first_Name || emp.firstName,
    firstName: emp.first_Name || emp.firstName,
    last_Name: emp.last_Name || emp.lastName,
    lastName: emp.last_Name || emp.lastName,
    paid_leave_balance: emp.paid_leave_balance || emp.paidLeaveBalance || emp.no_of_Paid_Leave,
    paidLeaveBalance: emp.paid_leave_balance || emp.paidLeaveBalance || emp.no_of_Paid_Leave,
    unpaid_leave_taken: emp.unpaid_leave_taken || emp.unpaidLeaveTaken,
    unpaidLeaveTaken: emp.unpaid_leave_taken || emp.unpaidLeaveTaken
  }));

  const totalPages = Math.ceil(employeesData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = employeesData.slice(startIndex, endIndex);

  const generateDateRange = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day));
    }
    return dates;
  };

  const dateRange = generateDateRange();

  const getWeekdayNames = () => {
    const weekdays = [];
    for (let i = 0; i < dateRange.length; i++) {
      const date = dateRange[i];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2);
      weekdays.push(dayName);
    }
    return weekdays;
  };

  const weekdays = getWeekdayNames();

const getLeavesForEmployeeAndDate = (employee, date) => {
 const dateStr = formatDate(date);
 const employeeLeaves = leaves || [];

  return employeeLeaves.filter(leave => {
    const matchesEmployee =
      leave.employee?._id === employee._id ||
      leave.employee?.employee_Id === employee.employee_Id ||
      leave.employee?.employeeId === employee.employeeId ||
      leave.employeeId === employee.employee_Id ||
      leave.employee_Id === employee.employee_Id;

    if (!matchesEmployee) return false;

    const leaveFrom = formatDate(leave.leave_From || leave.leaveFrom);
    const leaveTo = formatDate(leave.leave_To || leave.leaveTo || leave.leave_From);
    if (!leaveFrom) return false;

    const fromDate = leaveFrom.split('T')[0];
    const toDate = leaveTo.split('T')[0];
    const isHalfDay = leave.is_Half_Day || leave.isHalfDay;
    const halfDayPos = leave.half_Day_Position || leave.halfDayPosition || "start";
    const isMultiDay = fromDate !== toDate;

    // Case 1: Single-Day Half-Day Leave
    if (isHalfDay && !isMultiDay) {
      return dateStr === fromDate;
    }

    // Case 2: Multi-Day Half-Day at START
    if (isHalfDay && isMultiDay && halfDayPos === "start") {
      if (dateStr === fromDate) return true; // show half day
      if (dateStr > fromDate && dateStr <= toDate) return true; // show full days after
      return false;
    }

    // Case 3: Multi-Day Half-Day at END
    if (isHalfDay && isMultiDay && halfDayPos === "end") {
      if (dateStr >= fromDate && dateStr < toDate) return true; // full days before
      if (dateStr === toDate) return true; // half day at end
      return false;
    }

    // Full Day Range
    return dateStr >= fromDate && dateStr <= toDate;
  });
};

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    setCurrentPage(1);
  };

  const formatDateRange = () => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
      });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const handleLeaveClick = (leave) => {
    setSelectedLeave(leave);
  };

  const handleApprovalAction = (leave, action) => {
    setSelectedLeave(leave);
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const handleApprovalSubmit = async () => {
    try {
      if (approvalAction === "reject") {
        await handleLeaveRequest(selectedLeave._id, "rejected", rejectionReason);
      } else {
        await handleLeaveRequest(selectedLeave._id, "approved", "");
      }
      
      await fetchAssignedLeaves(activeStatus);
      
    } catch (error) {
      console.error("Error handling leave request:", error);
    }
    
    setShowApprovalModal(false);
    setRejectionReason("");
    setSelectedLeave(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

const renderLeaveIndicator = (leave, cellDate) => {
  const leaveStatus = leave.leave_Status || leave.leaveStatus || leave.status;
  const leaveTypeName = leave.leaveType?.name || leave.leaveTypeName || leave.type;
  const leaveColor = leave.leaveType?.color || "bg-gray-400";

  const isHalfDayFlag = leave.is_Half_Day || leave.isHalfDay;
  const halfDayPosition = leave.half_Day_Position || leave.halfDayPosition || "start";
  const cellDateStr = formatDate(cellDate);
  const fromDate = formatDate(leave.leave_From || leave.leaveFrom);
  const toDate = formatDate(leave.leave_To || leave.leaveTo || leave.leave_From);

  const halfDaySession = leave.half_Day_Session || leave.halfDaySession || 'afternoon';

  const isHalfDay =
    isHalfDayFlag &&
    (
      (fromDate === toDate && cellDateStr === fromDate) ||
      (halfDayPosition === "start" && cellDateStr === fromDate) ||
      (halfDayPosition === "end" && cellDateStr === toDate)
    );

  const tooltip = `${leaveTypeName || 'Leave'} - ${leaveStatus || 'Unknown'} - ${isHalfDay ? 'Half Day' : 'Full Day'}`;

  const statusIcon =
    leaveStatus === 'approved' ? <FaCheckCircle className="text-green-600" size={8} /> :
    leaveStatus === 'rejected' ? <FaTimesCircle className="text-red-600" size={8} /> :
    leaveStatus === 'pending' ? <FaClock className="text-orange-600" size={8} /> : null;

  if (isHalfDay) {
    return (
      <div className={`w-3 h-3 cursor-pointer relative`} title={tooltip} onClick={() => handleLeaveClick(leave)}>
        <div className={`w-full h-full rounded-full ${leaveColor} relative`}>
          <div className="absolute inset-0 rounded-full border-2 border-white"></div>
          {/* <div className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-l-full"></div> */}
          {halfDaySession === 'morning' ? (
              <div className="absolute top-0 right-0 w-1/2 h-full bg-white rounded-r-full"></div>
            ) : (
              <div className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-l-full"></div>
            )}

        </div>
        {statusIcon && <div className="absolute -top-1 -right-1 bg-white rounded-full">{statusIcon}</div>}
      </div>
    );
  }

  return (
    <div className={`w-3 h-3 rounded-full ${leaveColor} relative cursor-pointer`} title={tooltip} onClick={() => handleLeaveClick(leave)}>
      {statusIcon && <div className="absolute -top-1 -right-1 bg-white rounded-full">{statusIcon}</div>}
    </div>
  );
};



  if (attendanceLoading || leaveLoading || isLoadingEmployees) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-blue-600" size={24} />
            <span className="text-lg text-gray-700 dark:text-gray-300">
              Loading calendar data...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (attendanceError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">
              Error Loading Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {attendanceError.message || 'Failed to load calendar data. Please try again.'}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "my") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="p-4">
          <div className="border rounded-lg mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("company")}
                    className={`px-3 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2 ${
                      activeTab === "company"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaCalendarAlt size={14} />
                    Company calendar
                  </button>
                  <button
                    onClick={() => setActiveTab("my")}
                    className={`px-3 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2 ${
                      activeTab === "my"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <FaUser size={14} />
                    My calendar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <MyLeave />
        </div>
      </div>
    );
  }

  const dateColumnWidth = 48;
  const calendarGridTemplate = `180px 80px 80px repeat(${dateRange.length}, ${dateColumnWidth}px)`;
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-4">
        {/* Header */}
        <div className="border rounded-lg mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-4">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("company")}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2 ${
                    activeTab === "company"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FaCalendarAlt size={14} />
                  Company calendar
                </button>
                <button
                  onClick={() => setActiveTab("my")}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors flex items-center gap-2 ${
                    activeTab === "my"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}>
                  <FaUser size={14} />
                  My calendar
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-1 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <FaChevronLeft size={16} />
                  </button>              
                  <div className="px-4 py-1 border rounded text-sm mx-2 min-w-[220px] text-center border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
                    Range: {formatDateRange()}
                  </div>
                  
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-1 rounded transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </div>
                
                {showVacationTooltip && (
                  <div className="relative">
                    <div className="flex items-center gap-2 border rounded px-3 py-1 text-sm bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 transition-colors">
                      <span className="text-green-600">✓</span>
                      <FaExclamationTriangle className="text-orange-500" size={12} />
                      <span className="text-green-800 dark:text-green-400">Vacation</span>
                      <span className="text-orange-600 font-medium">requires approval</span>
                      <button 
                        onClick={() => setShowVacationTooltip(false)}
                        className="ml-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                  className="px-3 py-1 border rounded text-sm border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Name ↑
                </button>
                <button className="px-3 py-1 border rounded text-sm border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1">
                  <FaFilter size={12} />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
          {/* Legend */}
          <div className="p-3 border-b text-xs flex flex-wrap gap-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-colors">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-300">Annual Leave (Paid)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-300">Sick Leave</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-600 dark:text-gray-300">Vacation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-gray-600 dark:text-gray-300">Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full flex items-center justify-center bg-red-500">
                <FaTimes  size={9} />
              </div>
              
              <span className="text-gray-600 dark:text-gray-300">Rejected</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-500 border-2 border-gray-300"></div>
              <span className="text-gray-600 dark:text-gray-300">Unpaid</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500 relative">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-white rounded-l-full"></div>
              </div>
              <span className="text-gray-600 dark:text-gray-300">Half Day</span>
            </div>
          </div>

          {/* Header Grid */}
          
          <div className="overflow-x-auto">
            <div className="grid min-w-[1200px]" style={{ gridTemplateColumns: calendarGridTemplate }}>
              
              {/* Header Row */}
              <div className="p-3 border-r border-b font-medium text-sm text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-600">
                {currentDate.toLocaleDateString('en-US', { month: 'long' })}
              </div>
              <div className="p-3 border-r border-b text-xs text-center font-medium text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-600">
                Paid Leave
              </div>
              <div className="p-3 border-r border-b text-xs text-center font-medium text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-600">
                Unpaid Leave
              </div>
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className={`p-2 text-center text-xs font-medium border-r border-b transition-colors cursor-pointer
                    ${hoveredColumn === index ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                    text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                >
                  {day}
                </div>
              ))}

              {/* Date Numbers */}
              <div className="col-span-full grid" style={{ gridTemplateColumns: calendarGridTemplate }}>
                <div className="p-3 border-r border-b"></div>
                <div className="p-3 border-r border-b"></div>
                <div className="p-3 border-r border-b"></div>
                {dateRange.map((date, index) => (
                  <div
                    key={index}
                    className={`px-3  text-center text-sm font-medium border-r border-b last:border-r-0
                      ${hoveredColumn === index ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                      text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20`}
                    onMouseEnter={() => setHoveredColumn(index)}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>

              {/* Employee Rows */}
              {paginatedEmployees.length === 0 ? (
                <div className="col-span-full p-8 text-center">
                  <p className="text-lg text-gray-600 dark:text-gray-400">No employee data available</p>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-500">
                    {leaves && leaves.length > 0
                      ? "Employees found in leaves but not displaying properly. Check data structure."
                      : "No leaves data found. Make sure fetchAssignedLeaves is working correctly."}
                  </p>
                  <button
                    onClick={() => fetchAssignedLeaves(activeStatus)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Refresh Data
                  </button>
                </div>
              ) : (
                paginatedEmployees.map((employee, employeeIndex) => (
                  <motion.div
                    key={employee.employee_Id || employee.employeeId || employeeIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: employeeIndex * 0.01 }}
                    className="grid hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    style={{ gridTemplateColumns: calendarGridTemplate }}
                  >
                    {/* Employee Name */}
                    <div className="p-3 border-r border-b text-sm font-medium text-gray-900 dark:text-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                            {employee.first_Name?.charAt(0) || employee.name?.charAt(0) || 'U'}
                            {employee.last_Name?.charAt(0) || employee.name?.split(' ')[1]?.charAt(0) || ''}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{employee.name || 'Unknown'}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {employee.empID || employee.employee_Id || 'No ID'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Paid Leave */}
                    <div className="p-3 border-r border-b text-sm text-center text-green-600 dark:text-green-400 font-medium">
                      {employee.paid_leave_balance || subordinateStats?.paidLeave || 0}
                    </div>

                    {/* Unpaid Leave */}
                    <div className="p-3 border-r border-b text-sm text-center text-red-600 dark:text-red-400 font-medium">
                      {employee.unpaid_leave_taken || subordinateStats?.unpaidLeave || 0}
                    </div>

                    {/* Leave Indicators */}
                    {dateRange.map((date, dateIndex) => {
                      const leavesForDate = getLeavesForEmployeeAndDate(employee, date);
                      return (
                        <div
                          key={dateIndex}
                          className={`p-2 border-r border-b min-h-[40px] flex items-center justify-center
                            ${hoveredColumn === dateIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                          onMouseEnter={() => setHoveredColumn(dateIndex)}
                          onMouseLeave={() => setHoveredColumn(null)}
                          title={leavesForDate.length > 0 ? `${leavesForDate.length} leave(s)` : ''}
                        >
                          {leavesForDate.map((leave, leaveIndex) => (
                            <div key={leaveIndex}>{renderLeaveIndicator(leave, date)}</div>
                          ))}
                        </div>
                      );
                    })}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        {employeesData.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">entries</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                Showing {startIndex + 1} to {Math.min(endIndex, employeesData.length)} of {employeesData.length} employees
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded border transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leave Details Modal */}
      <AnimatePresence>
        {selectedLeave && !showApprovalModal && (
          <BaseModal isOpen={!showApprovalModal} onClose={!!showApprovalModal} >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center p-4"
            onClick={() => setSelectedLeave(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                    Leave Request Details
                  </h3>
                  <button
                    onClick={() => setSelectedLeave(null)}
                    className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Employee</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.employee?.first_Name || selectedLeave.employee?.firstName || ''} {selectedLeave.employee?.last_Name || selectedLeave.employee?.lastName || ''}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                        ID: {selectedLeave.employee?.employee_Id || selectedLeave.employee?.employeeId || selectedLeave.employeeId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Leave Type</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        selectedLeave.leaveType?.color?.replace('500', '100') || 'bg-gray-100'
                      } ${selectedLeave.leaveType?.color?.replace('bg-', 'text-').replace('500', '800') || 'text-gray-800'}`}>
                        {selectedLeave.leaveType?.name || selectedLeave.leaveTypeName || selectedLeave.type} {selectedLeave.is_half_day || selectedLeave.isHalfDay ? '(Half Day)' : '(Full Day)'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">From Date</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.leave_From ? new Date(selectedLeave.leave_From).toLocaleDateString() : 
                         selectedLeave.leaveFrom ? new Date(selectedLeave.leaveFrom).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">To Date</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.leave_To ? new Date(selectedLeave.leave_To).toLocaleDateString() :
                         selectedLeave.leaveTo ? new Date(selectedLeave.leaveTo).toLocaleDateString() : "Same day"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Duration</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.no_Of_Days || selectedLeave.numberOfDays || selectedLeave.days || 1} day{(selectedLeave.no_Of_Days || selectedLeave.numberOfDays || selectedLeave.days || 1) !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Payment Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        (selectedLeave.is_paid || selectedLeave.isPaid || selectedLeave.paid)
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {(selectedLeave.is_paid || selectedLeave.isPaid || selectedLeave.paid) ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Reason for Leave</label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.reason_For_Leave || selectedLeave.reasonForLeave || selectedLeave.reason || 'No reason provided'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Status</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        (selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) === "approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : (selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {((selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) || 'pending').charAt(0).toUpperCase() + ((selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) || 'pending').slice(1)}
                      </span>
                    </div>
                    {(selectedLeave.approved_by || selectedLeave.approvedBy || selectedLeave.rejected_by || selectedLeave.rejectedBy) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                          {(selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) === 'approved' ? 'Approved By' : 'Rejected By'}
                        </label>
                        <p className="text-gray-900 dark:text-gray-100 transition-colors">
                          {selectedLeave.approved_by || selectedLeave.approvedBy || selectedLeave.rejected_by || selectedLeave.rejectedBy}
                        </p>
                      </div>
                    )}
                  </div>

                  {(selectedLeave.rejection_reason || selectedLeave.rejectionReason || selectedLeave.reason_For_Reject) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Rejection Reason</label>
                      <p className="text-red-600 dark:text-red-400 mt-1">
                        {selectedLeave.rejection_reason || selectedLeave.rejectionReason || selectedLeave.reason_For_Reject}
                      </p>
                    </div>
                  )}

                  {(selectedLeave.leave_Status || selectedLeave.leaveStatus || selectedLeave.status) === "pending" && (
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors">
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
          </BaseModal>
        )}
      </AnimatePresence>

      {/* Approval/Rejection Modal */}
      <AnimatePresence>
        {showApprovalModal && (
          <BaseModal isOpen={showApprovalModal} onClose={!showApprovalModal} >
          
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
                    {approvalAction === "approve" ? "Approve" : "Reject"} Leave Request
                  </h3>
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 dark:text-gray-300 transition-colors">
                    Are you sure you want to {approvalAction} the leave request for{" "}
                    <span className="font-medium">
                      {selectedLeave?.employee?.first_Name || selectedLeave?.employee?.firstName || ''} {selectedLeave?.employee?.last_Name || selectedLeave?.employee?.lastName || ''}
                    </span>
                    ?
                  </p>
                </div>

                {approvalAction === "reject" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors">
                      Reason for Rejection <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
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
                    className="flex-1 border px-4 py-2 rounded-lg font-medium transition-colors border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
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
    </div>
  );
};

export default LeaveCalendarDashboard;