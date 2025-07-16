import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaUserAlt,
  FaEye,
  FaRedo,
  FaCalendarCheck,
  FaCalendarTimes,
  FaTimesCircle,
  FaChevronDown,
} from "react-icons/fa";
import {
  HiViewGrid,
  HiViewList,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiSortAscending,
  HiSortDescending
} from "react-icons/hi";
import  MyLeave from './MyLeave.jsx';
import ApplyLeaveModal from "./model/ApplyLeaveModal";
import LeaveDetailsModal from "./model/LeaveDetailsModal";
import useLeaveStore from "../../store/leaveStore.js";
import ExportButtons from "../common/PdfExcel"; 
import { getEmployeeLeaveCount } from "../../service/leaveService.js";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ModernMonthPicker = ({ value, onChange, placeholder = "Select Month" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dropdownRef = useRef(null);

  const months = [
    { value: '01', label: 'January', short: 'Jan' },
    { value: '02', label: 'February', short: 'Feb' },
    { value: '03', label: 'March', short: 'Mar' },
    { value: '04', label: 'April', short: 'Apr' },
    { value: '05', label: 'May', short: 'May' },
    { value: '06', label: 'June', short: 'Jun' },
    { value: '07', label: 'July', short: 'Jul' },
    { value: '08', label: 'August', short: 'Aug' },
    { value: '09', label: 'September', short: 'Sep' },
    { value: '10', label: 'October', short: 'Oct' },
    { value: '11', label: 'November', short: 'Nov' },
    { value: '12', label: 'December', short: 'Dec' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentMonth = () => {
    if (!value) return null;
    const [year, month] = value.split('-');
    return { year: parseInt(year), month };
  };

  const currentMonth = getCurrentMonth();
  const displayValue = currentMonth 
    ? `${months.find(m => m.value === currentMonth.month)?.short} ${currentMonth.year}`
    : placeholder;

  const handleMonthSelect = (monthValue) => {
    const newValue = `${selectedYear}-${monthValue}`;
    onChange(newValue);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors flex items-center justify-between hover:border-gray-400 dark:hover:border-gray-500"
      >
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
          <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
            {displayValue}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {value && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
              type="button"
            >
              <FaTimesCircle className="w-3 h-3 text-gray-400 hover:text-red-500" />
            </button>
          )}
          <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl overflow-hidden">
 
          <div className="p-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                type="button"
              >
                <FaChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="font-semibold text-gray-900 dark:text-white text-lg">
                {selectedYear}
              </span>
              <button
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                type="button"
              >
                <FaChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="p-4 max-h-64 overflow-y-auto">
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => {
                const isSelected = currentMonth?.year === selectedYear && currentMonth?.month === month.value;
                const isCurrent = new Date().getFullYear() === selectedYear && 
                                new Date().getMonth() + 1 === parseInt(month.value);
                
                return (
                  <button
                    key={month.value}
                    onClick={() => handleMonthSelect(month.value)}
                    type="button"
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isCurrent
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {month.short}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between">
              <button
                onClick={() => {
                  const now = new Date();
                  const currentValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                  onChange(currentValue);
                  setIsOpen(false);
                }}
                type="button"
                className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              >
                This Month
              </button>
              <button
                onClick={handleClear}
                type="button"
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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


const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  startIndex,
  endIndex 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 sm:mb-0">
        Showing <span className="font-medium">{startIndex}</span> to{' '}
        <span className="font-medium">{endIndex}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiChevronDoubleLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>

          {visiblePages.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={typeof page !== 'number'}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : typeof page === 'number'
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                  : 'text-gray-400 cursor-default'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FaChevronRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <HiChevronDoubleRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function EmployeeLeaveHistory() {
  const {
    leaves,
    isLoading,
    fetchLeaves,
    activeStatus,
    setActiveStatus,
    initializeData,
    userProfile,
  } = useLeaveStore();

  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [viewMode, setViewMode] = useState('auto');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [leaveCount, setLeaveCount] = useState({
    remainingPaidLeaves: 0,
    totalLeavesTaken: 0,
    totalApprovedLeaveDays: 0,
  });

  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth >= 1024 ? 'desktop' : 'mobile');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentDisplayMode = viewMode === 'auto' 
  ? (screenSize === 'desktop' ? 'table' : 'calendar')
  : viewMode;

  useEffect(() => {
    initializeData();
    fetchLeaves(activeStatus);
  }, [activeStatus]);

  useEffect(() => {
    async function fetchLeaveCount() {
      try {
        const response = await getEmployeeLeaveCount();
        if (response.success && response.data) {
          setLeaveCount(response.data);
        }
      } catch (error) {
        console.error("Error fetching leave count:", error);
      }
    }
    fetchLeaveCount();
  }, []);

  const filteredData = useMemo(() => {
    let filtered = leaves.filter((item) => {
      const matchSearch =
        item.leaveType?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        new Date(item.leave_From).toLocaleDateString().toLowerCase().includes(searchText.toLowerCase()) ||
        new Date(item.leave_To).toLocaleDateString().toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        activeStatus.toLowerCase() === "all"
          ? true
          : item.leave_Status.toLowerCase() === activeStatus.toLowerCase();

      let matchMonth = true;
      if (selectedMonth) {
        const entryDate = new Date(item.leave_From);
        const [year, month] = selectedMonth.split("-");
        matchMonth =
          entryDate.getFullYear() === parseInt(year, 10) &&
          entryDate.getMonth() + 1 === parseInt(month, 10);
      }

      return matchSearch && matchStatus && matchMonth;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'leaveType') {
          aValue = a.leaveType?.name || '';
          bValue = b.leaveType?.name || '';
        } else if (sortField === 'leave_From' || sortField === 'leave_To') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [leaves, searchText, activeStatus, selectedMonth, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredData.length);

  const exportData = paginatedData.map((entry, index) => {
    const serialNo = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: serialNo,
      leaveType: entry.leaveType?.name || "N/A",
      from: new Date(entry.leave_From).toLocaleDateString(),
      to: new Date(entry.leave_To).toLocaleDateString(),
      days: entry.no_Of_Days,
      reasonForLeave: entry.reason_For_Leave || "N/A",
      leaveCategory:
        entry.is_Paid === null ? "Pending" : entry.is_Paid ? "Paid" : "Unpaid",
      processedBy:
        entry.leave_Status === "approved" && entry.approved_By
          ? `Approved by ${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
          : entry.leave_Status === "rejected" && entry.rejected_By
          ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
          : "Pending",
      reasonForReject: entry.reason_For_Reject || "N/A",
      emergencyContact: entry.emergencyContact || "N/A",
      workHandover: entry.workHandover || "N/A",
      halfDay: entry.is_Half_Day || entry.no_Of_Days === 0.5 ? "Yes" : "No",
      status: entry.leave_Status.charAt(0).toUpperCase() + entry.leave_Status.slice(1),
    };
  });

  const columns = [
    { header: "S.L", dataKey: "sl", sortable: false },
    { header: "Leave Type", dataKey: "leaveType", sortable: true },
    { header: "From", dataKey: "leave_From", sortable: true },
    { header: "To", dataKey: "leave_To", sortable: true },
    { header: "Days", dataKey: "no_Of_Days", sortable: true },
    { header: "Category", dataKey: "is_Paid", sortable: true },
    { header: "Processed By", dataKey: "processedBy", sortable: false },
    { header: "Half Day", dataKey: "is_Half_Day", sortable: true },
    { header: "Status", dataKey: "leave_Status", sortable: true },
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      variants={itemVariants}
      className={`p-6 ${color} rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className="p-3 bg-white/10 rounded-lg">
          <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </div>
      </div>
    </motion.div>
  );

  const LeaveCard = ({ entry, index }) => (
    <motion.div
      variants={itemVariants}
      onClick={() => setSelectedLeave(entry)}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {entry.leaveType?.name || "N/A"}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            #{(currentPage - 1) * pageSize + index + 1}
          </p>
        </div>
        <StatusBadge status={entry.leave_Status} />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">From</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(entry.leave_From).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaCalendarCheck className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">To</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(entry.leave_To).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FaClock className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {entry.no_Of_Days} day{entry.no_Of_Days !== 1 ? 's' : ''}
                {(entry.is_Half_Day || entry.no_Of_Days === 0.5) && (
                  <span className="text-orange-600 dark:text-orange-400 ml-1">(Half Day)</span>
                )}
              </span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            entry.is_Paid === null 
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              : entry.is_Paid 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}>
            {entry.is_Paid === null ? "Pending" : entry.is_Paid ? "Paid" : "Unpaid"}
          </div>
        </div>

        {(entry.approved_By || entry.rejected_By) && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Processed By</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {entry.leave_Status === "approved" && entry.approved_By
                ? `${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
                : entry.leave_Status === "rejected" && entry.rejected_By
                ? `${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
                : "Pending"}
            </p>
          </div>
        )}


        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLeave(entry);
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg transition-colors duration-200"
          >
            <FaEye className="w-4 h-4" />
            <span className="text-sm font-medium">View Details</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Leave History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your leave applications</p>
          </div>
          <button
            onClick={() => setShowApplyModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Apply Leaves
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard
            title="Remaining Paid Leaves"
            value={leaveCount.remainingPaidLeaves}
            icon={FaUserAlt}
            color="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          />
          <StatCard
            title="Total Leaves Asked"
            value={leaveCount.totalLeavesTaken}
            icon={FaCalendarAlt}
            color="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
          />
          <StatCard
            title="Approved Leaves"
            value={leaveCount.totalApprovedLeaveDays}
            icon={FaCheckCircle}
            color="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by leave type, dates..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Month Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Month
              </label>
              <ModernMonthPicker
                value={selectedMonth}
                onChange={(value) => {
                  setSelectedMonth(value);
                  setCurrentPage(1);
                }}
                placeholder="Select Month"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-full px-4 py-[5px] border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">
                      {activeStatus === 'all' ? '🔍' : 
                       activeStatus === 'approved' ? '✅' : 
                       activeStatus === 'pending' ? '⏳' : '❌'}
                    </span>
                    <span className="font-medium">
                      {activeStatus === 'all' ? 'All Status' : 
                       activeStatus === 'approved' ? 'Approved' : 
                       activeStatus === 'pending' ? 'Pending' : 'Rejected'}
                    </span>
                  </div>
                  <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showStatusDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showStatusDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowStatusDropdown(false)}
                    />
                    <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl overflow-hidden">
                      {[
                        { value: 'all', label: 'All Status', icon: '🔍' },
                        { value: 'approved', label: 'Approved', icon: '✅' },
                        { value: 'pending', label: 'Pending', icon: '⏳' },
                        { value: 'rejected', label: 'Rejected', icon: '❌' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setActiveStatus(option.value);
                            setCurrentPage(1);
                            setShowStatusDropdown(false);
                          }}
                          type="button"
                          className={`w-full px-4 py-3 flex items-center space-x-3 text-left transition-all duration-150 ${
                            activeStatus === option.value
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <span className="text-lg">{option.icon}</span>
                          <span className="flex-1">{option.label}</span>
                          {activeStatus === option.value && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
                <select
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[5, 10, 25, 50].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
              </div>

              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                {[
                  { mode: 'auto', icon: FaRedo, label: 'Auto' },
                  { mode: 'table', icon: HiViewList, label: 'Table' },
                  { mode: 'card', icon: HiViewGrid, label: 'Cards' },
                  { mode: 'calendar', icon: FaUser, label: 'Calendar' }
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                      viewMode === mode
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>
             
            <div className="flex items-center space-x-2">
              <ExportButtons data={exportData} columns={columns} filename="EmployeeLeaveHistory" />
              <button
                onClick={() => fetchLeaves(activeStatus)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaRedo className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">Loading...</span>
            </div>
          </div>
        ) : filteredData.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {currentDisplayMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col.dataKey}
                          className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                            col.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : ''
                          }`}
                          onClick={() => col.sortable && handleSort(col.dataKey)}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{col.header}</span>
                            {col.sortable && sortField === col.dataKey && (
                              sortDirection === 'asc' ? (
                                <HiSortAscending className="w-4 h-4" />
                              ) : (
                                <HiSortDescending className="w-4 h-4" />
                              )
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((entry, index) => (
                      <tr
                        key={entry._id || entry.id || index}
                        onClick={() => setSelectedLeave(entry)}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {(currentPage - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {entry.leaveType?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(entry.leave_From).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(entry.leave_To).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                          {entry.no_Of_Days}
                          {(entry.is_Half_Day || entry.no_Of_Days === 0.5) && (
                            <span className="text-xs text-orange-600 dark:text-orange-400 ml-1">(Half Day)</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-medium ${
                            entry.is_Paid === null ? 'text-yellow-600' : entry.is_Paid ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {entry.is_Paid === null ? "Pending" : entry.is_Paid ? "Paid" : "Unpaid"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {entry.leave_Status === "approved" && entry.approved_By
                            ? `Approved by ${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
                            : entry.leave_Status === "rejected" && entry.rejected_By
                            ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
                            : "Pending"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {entry.is_Half_Day || entry.no_Of_Days === 0.5 ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={entry.leave_Status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLeave(entry);
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : currentDisplayMode === 'calendar'? (
           <MyLeave 
    leaves={filteredData} 
    isLoading={isLoading}
  />
          ): (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedData.map((entry, index) => (
                    <LeaveCard key={entry._id || entry.id || index} entry={entry} index={index} />
                  ))}
                </div>
              </div>
            )}


            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredData.length}
              itemsPerPage={pageSize}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </motion.div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarTimes className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching records found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchText || selectedMonth || activeStatus !== 'all' 
                ? "Try adjusting your filters to see more results."
                : "You haven't applied for any leaves yet."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {(searchText || selectedMonth || activeStatus !== 'all') && (
                <button
                  onClick={() => {
                    setSearchText('');
                    setSelectedMonth('');
                    setActiveStatus('all');
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Apply Leaves
              </button>
            </div>
          </div>
        )}

        <LeaveDetailsModal 
         isOpen={selectedLeave} 
         onClose={() => setSelectedLeave(null)} 
         selectedLeave={selectedLeave} 
         
         />

        <ApplyLeaveModal 
          show={showApplyModal} 
          onClose={() => setShowApplyModal(false)} 
          totalPaidLeaves={leaveCount.remainingPaidLeaves} 
        />
        
      </div>
    </div>
  );
}