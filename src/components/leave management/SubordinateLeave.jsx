import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft, FaChevronRight, FaFilter, FaTimes, FaExclamationTriangle, 
  FaCheckCircle, FaTimesCircle, FaClock, FaCheck, FaSpinner, FaEye,
} from 'react-icons/fa';
import { HiViewGrid, HiViewList } from 'react-icons/hi';
import leaveTypeStore from "../../store/leaveTypeStore.js";
import useLeaveStore from '../../store/useLeaveStore.js';
import useAttendanceStore from '../../store/useAttendanceStore.js';
import BaseModal from '../common/BaseModal.jsx';

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; 
};

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(status)}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
};

const getMonthKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};


const LeaveCalendarDashboard = () => {

  const { leaves, isLoading: leaveLoading, fetchAssignedLeaves, userProfile, handleLeaveRequest, employees, fetchAssigndata, isLoadingEmployees,
   monthlyLeave, fetchMonthlySummary} = useLeaveStore();
  const { leaveTypes, isLoading, error, fetchLeaveTypes,} = leaveTypeStore();
  
  const {
     loading: attendanceLoading, error: attendanceError,
  } = useAttendanceStore();

  const [currentDate, setCurrentDate] = useState(new Date()); 
   const [selectedLeave, setSelectedLeave] = useState(null);
   const [showApprovalModal, setShowApprovalModal] = useState(false);
   const [approvalAction, setApprovalAction] = useState("");
   const [rejectionReason, setRejectionReason] = useState("");
   const [showVacationTooltip, setShowVacationTooltip] = useState(true);
   const [hoveredColumn, setHoveredColumn] = useState(null);
   const [activeStatus, setActiveStatus] = useState('all');
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [viewMode, setViewMode] = useState('calendar'); 

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        await Promise.all([
          fetchAssigndata(), 
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
  }, [fetchAssigndata, fetchAssignedLeaves]);

  useEffect(() => {
    if (fetchAssignedLeaves) {
      fetchAssignedLeaves(activeStatus);
    }
  }, [activeStatus, fetchAssignedLeaves]);

  useEffect(() => {
      fetchLeaveTypes();
    }, [fetchLeaveTypes]);

  useEffect(() => {
  if (fetchMonthlySummary ) {
    const monthKey = getMonthKey(currentDate);
    fetchMonthlySummary(monthKey);
  }
}, [currentDate, fetchMonthlySummary]);

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

   const filteredLeaves = leaves.filter(leave => {
    if (activeStatus === 'all') return true;
    return leave.leave_Status.toLowerCase() === activeStatus.toLowerCase();
  });

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

const getMonthlyLeaveSummary = (empId) => {

  const summary = monthlyLeave?.find(
    (entry) => entry.employee_Id?.toString() === empId?.toString()
  );
  return {
    paid: summary?.paid || 0,
    unpaid: summary?.unpaid || 0
  };
};

 const renderTableView = () => {
    const tableLeaves = filteredLeaves.map((leave, index) => ({
      ...leave,
      serialNo: index + 1,
      employeeName: `${leave.employee?.first_Name || ''} ${leave.employee?.last_Name || ''}`.trim(),
      employeeId: leave.employee?.employee_Id || 'N/A',
      leaveTypeName: leave.leaveType?.name || 'N/A',
      fromDate: new Date(leave.leave_From).toLocaleDateString(),
      toDate: new Date(leave.leave_To || leave.leave_From).toLocaleDateString(),
      duration: `${leave.no_Of_Days} day${leave.no_Of_Days !== 1 ? 's' : ''}`,
      status: leave.leave_Status,
      category: leave.is_Paid ? 'Paid' : 'Unpaid',
      halfDay: leave.is_Half_Day ? 'Yes' : 'No'
    }));

    const paginatedTableLeaves = tableLeaves.slice(startIndex, endIndex);

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Half Day
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedTableLeaves.map((leave, index) => (
              <tr
                key={leave._id || index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleLeaveClick(leave)}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {startIndex + index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  <div>
                    <div className="font-medium">{leave.employeeName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{leave.employeeId}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    leave.leaveType?.color?.replace('500', '100') || 'bg-gray-100'
                  } ${leave.leaveType?.color?.replace('bg-', 'text-').replace('500', '800') || 'text-gray-800'}`}>
                    {leave.leaveTypeName}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {leave.fromDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {leave.toDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                  {leave.duration}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`font-medium ${
                    leave.is_Paid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {leave.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {leave.halfDay}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={leave.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeaveClick(leave);
                    }}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                  {leave.status === 'pending' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprovalAction(leave, 'approve');
                        }}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 mr-2"
                      >
                        <FaCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprovalAction(leave, 'reject');
                        }}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCalendarView = () => {
    const dateColumnWidth = 48;
    const calendarGridTemplate = `180px 80px 80px repeat(${dateRange.length}, ${dateColumnWidth}px)`;
    
    return (
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

        
          <div className="col-span-full grid" style={{ gridTemplateColumns: calendarGridTemplate }}>
            <div className="p-3 border-r border-b"></div>
            <div className="p-3 border-r border-b"></div>
            <div className="p-3 border-r border-b"></div>
            {dateRange.map((date, index) => (
              <div
                key={index}
                className={`px-3 text-center text-sm font-medium border-r border-b last:border-r-0
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
          <div className="contents">
            {paginatedEmployees.map((employee, employeeIndex) => (
              <motion.div
                key={employee.employee_Id || employeeIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: employeeIndex * 0.01 }}
                className="contents"
              >
                {/* Employee Name */}
                <div className="p-3 border-r border-b text-sm font-medium text-gray-900 dark:text-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                        {employee.first_Name?.charAt(0) || 'U'}
                        {employee.last_Name?.charAt(0) || ''}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {employee.empID}
                      </div>
                    </div>
                  </div>
                </div>
 {(() => {
  const { paid, unpaid } = getMonthlyLeaveSummary(employee.employeeId);

  return (
    <>
      {/* Paid Leave */}
      <div className="p-3 border-r border-b text-sm text-center text-green-600 dark:text-green-400 font-medium">
        {paid}
      </div>

      {/* Unpaid Leave */}
      <div className="p-3 border-r border-b text-sm text-center text-red-600 dark:text-red-400 font-medium">
        {unpaid}
      </div>
    </>
  );
})()}
                {/* Calendar cells */}
                {dateRange.map((date, dateIndex) => {
                  const leavesForDate = getLeavesForEmployeeAndDate(employee, date);
                  return (
                    <div
                      key={dateIndex}
                      className={`p-2 border-r border-b min-h-[40px] flex items-center justify-center
                        ${hoveredColumn === dateIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                      onMouseEnter={() => setHoveredColumn(dateIndex)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      {leavesForDate.map((leave, leaveIndex) => (
                        <div key={leaveIndex}>{renderLeaveIndicator(leave, date)}</div>
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
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
          <div className="absolute inset-0 rounded-full border-1 border-white"></div>
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

return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="p-4">
        {/* Header */}
        <div className="border rounded-lg mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">
          <div className="p-4">
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
                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                      viewMode === 'calendar'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    <HiViewGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Calendar</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                      viewMode === 'table'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    <HiViewList className="w-4 h-4" />
                    <span className="hidden sm:inline">Table</span>
                  </button>
                </div>

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
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors">

          <div className="p-3 border-b text-xs flex flex-wrap gap-4 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-colors">
            {leaveTypes.length >0 && leaveTypes.map( leave => (
              <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full ${leave.color}`}></div>
              <span className="text-gray-600 dark:text-gray-300">{leave.name}</span>
            </div>)
            )}
           
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full flex items-center justify-center bg-white text-orange-500">
                <FaClock size={9}  />
              </div>
              <span className="text-gray-600 dark:text-gray-300">Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full flex items-center justify-center bg-green-500">
                <FaCheck size={9} />
              </div>
              <span className="text-gray-600 dark:text-gray-300">Approved</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full flex items-center justify-center bg-red-500">
                <FaTimes size={9} />
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

          {/* Content based on view mode */}
          {viewMode === 'calendar' ? renderCalendarView() : renderTableView()}
        </div>


        {(viewMode === 'table' ? filteredLeaves.length : employeesData.length) > 0 && (
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
                {viewMode === 'table' ? (
                  <>Showing {startIndex + 1} to {Math.min(endIndex, filteredLeaves.length)} of {filteredLeaves.length} leaves</>
                ) : (
                  <>Showing {startIndex + 1} to {Math.min(endIndex, employeesData.length)} of {employeesData.length} employees</>
                )}
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
              
              {Array.from({ length: Math.ceil((viewMode === 'table' ? filteredLeaves.length : employeesData.length) / itemsPerPage) }, (_, i) => i + 1).map((page) => (
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
                disabled={currentPage === Math.ceil((viewMode === 'table' ? filteredLeaves.length : employeesData.length) / itemsPerPage)}
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
          <BaseModal isOpen={!showApprovalModal} onClose={() => setSelectedLeave(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors"
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
                        {selectedLeave.employee?.first_Name || ''} {selectedLeave.employee?.last_Name || ''}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                        ID: {selectedLeave.employee?.employee_Id || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Leave Type</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                        selectedLeave.leaveType?.color?.replace('500', '100') || 'bg-gray-100'
                      } ${selectedLeave.leaveType?.color?.replace('bg-', 'text-').replace('500', '800') || 'text-gray-800'}`}>
                        {selectedLeave.leaveType?.name || 'N/A'} {selectedLeave.is_Half_Day ? '(Half Day)' : '(Full Day)'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">From Date</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.leave_From ? new Date(selectedLeave.leave_From).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">To Date</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.leave_To ? new Date(selectedLeave.leave_To).toLocaleDateString() : "Same day"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Duration</label>
                      <p className="text-gray-900 dark:text-gray-100 transition-colors">
                        {selectedLeave.no_Of_Days || 1} day{(selectedLeave.no_Of_Days || 1) !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Payment Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        selectedLeave.is_Paid
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {selectedLeave.is_Paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Reason for Leave</label>
                    <p className="mt-1 text-gray-900 dark:text-gray-100 transition-colors">
                      {selectedLeave.reason_For_Leave || 'No reason provided'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">Status</label>
                      <StatusBadge status={selectedLeave.leave_Status} />
                    </div>
                  </div>

                  {selectedLeave.leave_Status === "pending" && (
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
          </BaseModal>
        )}
      </AnimatePresence>

      {/* Approval/Rejection Modal */}
      <AnimatePresence>
        {showApprovalModal && (
          <BaseModal isOpen={showApprovalModal} onClose={() => setShowApprovalModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full transition-colors"
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
                      {selectedLeave?.employee?.first_Name || ''} {selectedLeave?.employee?.last_Name || ''}
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
          </BaseModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaveCalendarDashboard;