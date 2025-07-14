import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiCheck,
  FiX,
  FiSearch,
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiEye,
  FiMessageSquare,
  FiHome,
  FiBriefcase,
} from "react-icons/fi";
import useResignationStore from "../../store/managerResignationStore";
import ConfirmationDialog from "../common/ConfirmationDialog";
import BaseModal from "../common/BaseModal";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

export default function ResignationApproval() {
  const {
    managerPending,
    managerHistory,
    fetchManagerPendingResignations,
    fetchManagerHistory,
    approveResignation,
    rejectResignation,
    loading,
  } = useResignationStore();

  // ------------------- Local UI States -------------------
  const [activeTab, setActiveTab] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [acceptEarlyExit, setAcceptEarlyExit] = useState(true);
  const [approvalComment, setApprovalComment] = useState("");

  // -- Pending Pagination
  const [pendingPage, setPendingPage] = useState(1);
  const [pendingPageSize, setPendingPageSize] = useState(10);

  // -- History Pagination
  const [historyPage, setHistoryPage] = useState(1);
  const [historyPageSize, setHistoryPageSize] = useState(10);

  // Approve/Reject modals
  const [selectedResignation, setSelectedResignation] = useState(null);
  const [selectedResignationId, setSelectedResignationId] = useState(null);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  // ------------------- Data Fetching -------------------
  useEffect(() => {
    fetchManagerPendingResignations();
    fetchManagerHistory();
  }, [fetchManagerPendingResignations, fetchManagerHistory]);

  // ------------------- Approval Handlers -------------------
const handleApproveClick = (resignation) => {
  setSelectedResignation(resignation);
  setSelectedResignationId(resignation._id);
  setAcceptEarlyExit(true); 
  setApprovalComment("");
  setApproveModalOpen(true);
};


 const handleConfirmApprove = async () => {
  if (!selectedResignation) return;

  try {
    const approvedLastWorkingDay = acceptEarlyExit
      ? selectedResignation.lastWorkingDayUser
      : selectedResignation.lastWorkingDayCompany;

    await approveResignation(selectedResignationId, {
      acceptEarlyExit,
      approvedLastWorkingDay,
      comments: approvalComment,
    });

    toast.success("Resignation approved successfully!");
  } catch (error) {
    toast.error("Failed to approve the resignation.");
  } finally {
    setApproveModalOpen(false);
    setSelectedResignationId(null);
    setSelectedResignation(null);
    setAcceptEarlyExit(true);
    setApprovalComment("");
  }
};


  const handleRejectClick = (resignation) => {
    setSelectedResignation(resignation);
    setSelectedResignationId(resignation._id);
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectComment.trim()) {
      toast.error("Please provide rejection comments.");
      return;
    }
    try {
      await rejectResignation(selectedResignationId, rejectComment);
      toast.success("Resignation rejected successfully!");
    } catch (error) {
      toast.error("Failed to reject the resignation.");
    } finally {
      setRejectModalOpen(false);
      setSelectedResignationId(null);
      setSelectedResignation(null);
      setRejectComment("");
    }
  };

  const filteredPending = useMemo(() => {
    const regex = new RegExp(searchText, "i");
    return managerPending.filter((item) => {
      const firstName = item.employee?.first_Name || "";
      const lastName = item.employee?.last_Name || "";
      const empId = item.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [managerPending, searchText]);

  const filteredHistory = useMemo(() => {
    const regex = new RegExp(searchText, "i");
    return managerHistory.filter((item) => {
      const firstName = item.employee?.first_Name || "";
      const lastName = item.employee?.last_Name || "";
      const empId = item.employee?.employee_Id || "";
      const fullName = `${firstName} ${lastName}`;
      return regex.test(fullName) || regex.test(empId);
    });
  }, [managerHistory, searchText]);

  // ------------------- Pagination Logic -------------------
  const pendingTotalPages = Math.ceil(filteredPending.length / pendingPageSize);
  const pendingStartIndex = (pendingPage - 1) * pendingPageSize;
  const pendingPaginated = filteredPending.slice(
    pendingStartIndex,
    pendingStartIndex + pendingPageSize
  );

  const historyTotalPages = Math.ceil(filteredHistory.length / historyPageSize);
  const historyStartIndex = (historyPage - 1) * historyPageSize;
  const historyPaginated = filteredHistory.slice(
    historyStartIndex,
    historyStartIndex + historyPageSize
  );

  // ------------------- Export Functionality -------------------
  const exportToExcel = () => {
    let dataToExport = [];
    if (activeTab === "pending") {
      dataToExport = filteredPending.map((resignation, index) => ({
        "S.L": index + 1,
        "Employee Name": resignation.employee
          ? `${resignation.employee.first_Name || "N/A"} ${resignation.employee.last_Name || "N/A"}`
          : "N/A",
        "Employee ID": resignation.employee?.employee_Id || "N/A",
        "Resignation Date": resignation.resignationDate
          ? new Date(resignation.resignationDate).toLocaleDateString()
          : "N/A",
        "Last Working Day By Comapny": resignation.lastWorkingDayCompany
          ? new Date(resignation.lastWorkingDayCompany).toLocaleDateString()
          : "N/A",
        "Last Working Day By User": resignation.lastWorkingDayUser
          ? new Date(resignation.lastWorkingDayUser).toLocaleDateString()
          : "N/A",
        "Created At": resignation.createdAt
          ? new Date(resignation.createdAt).toLocaleString()
          : "N/A",
        Status: resignation.status,
      }));
    } else {
      dataToExport = filteredHistory.map((resignation, index) => {
        const approver = resignation.approvers?.find(
          (a) => a.manager?._id === localStorage.getItem("userId")
        ) || {};
        return {
          "S.L": index + 1,
          "Employee Name": resignation.employee
            ? `${resignation.employee.first_Name || "N/A"} ${resignation.employee.last_Name || "N/A"}`
            : "N/A",
          "Employee ID": resignation.employee?.employee_Id || "N/A",
          "Resignation Date": resignation.resignationDate
            ? new Date(resignation.resignationDate).toLocaleDateString()
            : "N/A",
         "Last Working Day By Comapny": resignation.lastWorkingDayCompany
          ? new Date(resignation.lastWorkingDayCompany).toLocaleDateString()
          : "N/A",
        "Last Working Day By User": resignation.lastWorkingDayUser
          ? new Date(resignation.lastWorkingDayUser).toLocaleDateString()
          : "N/A",
          Status: resignation.status,
          "Responded At": approver?.respondedAt
            ? new Date(approver.respondedAt).toLocaleString()
            : "N/A",
          Comments: approver?.comments || "N/A",
        };
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      activeTab === "pending" ? "Pending Resignations" : "Resignation History"
    );
    XLSX.writeFile(workbook, "Resignation_Approvals.xlsx");
    toast.success("Data exported successfully!");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FiClock className="w-4 h-4" />;
      case "Approved":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  // ------------------- Card Component for Mobile -------------------
  const ResignationCard = ({ resignation, index, isPending = false }) => (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {resignation.employee
                ? `${resignation.employee.first_Name || "N/A"} ${resignation.employee.last_Name || "N/A"}`
                : "N/A"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ID: {resignation.employee?.employee_Id || "N/A"}
            </p>
          </div>
        </div>
        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(resignation.status)}`}>
          {getStatusIcon(resignation.status)}
          <span>{resignation.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4" />
          <div>
            <span className="font-medium">Resignation:</span>
            <p className="text-gray-900 dark:text-white">
              {resignation.resignationDate
                ? new Date(resignation.resignationDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4" />
          <div>
            <span className="font-medium">Last Working By Company:</span>
            <p className="text-gray-900 dark:text-white">
              {resignation.lastWorkingDayCompany
                ? new Date(resignation.lastWorkingDayCompany).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
         <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4" />
          <div>
            <span className="font-medium">Last Working By User:</span>
            <p className="text-gray-900 dark:text-white">
              {resignation.lastWorkingDayUser
                ? new Date(resignation.lastWorkingDayUser).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {isPending && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FiClock className="w-4 h-4" />
            <div>
              <span className="font-medium">Submitted:</span>
              <p className="text-gray-900 dark:text-white">
                {resignation.createdAt
                  ? new Date(resignation.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        )}

        {!isPending && (
          <>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FiClock className="w-4 h-4" />
              <div>
                <span className="font-medium">Responded:</span>
                <p className="text-gray-900 dark:text-white">
                  {(() => {
                    const approver = resignation.approvers?.find(
                      (a) => a.manager?._id === localStorage.getItem("userId")
                    );
                    return approver?.respondedAt
                      ? new Date(approver.respondedAt).toLocaleDateString()
                      : "N/A";
                  })()}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FiMessageSquare className="w-4 h-4 mt-0.5" />
              <div>
                <span className="font-medium">Comments:</span>
                <p className="text-gray-900 dark:text-white">
                  {(() => {
                    const approver = resignation.approvers?.find(
                      (a) => a.manager?._id === localStorage.getItem("userId")
                    );
                    return approver?.comments || "No comments";
                  })()}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {isPending && resignation.status === "Pending" && (
        <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleApproveClick(resignation)}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FiCheck className="w-4 h-4" />
            <span>Approve</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRejectClick(resignation)}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FiX className="w-4 h-4" />
            <span>Reject</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );

  // ------------------- UI -------------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Resignation Approvals
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and manage employee resignation requests
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={exportToExcel}
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200"
          >
            <FiDownload className="w-5 h-5 mr-2" />
            Export Data
          </motion.button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Employee Name or ID"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPendingPage(1);
                  setHistoryPage(1);
                }}
              />
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {activeTab === "pending" 
                ? `${filteredPending.length} pending requests`
                : `${filteredHistory.length} total records`
              }
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <nav className="flex space-x-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "pending"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Pending Approvals
              {filteredPending.length > 0 && (
                <span className="ml-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-0.5 px-2 rounded-full text-xs">
                  {filteredPending.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "history"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Resignation History
              {filteredHistory.length > 0 && (
                <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 py-0.5 px-2 rounded-full text-xs">
                  {filteredHistory.length}
                </span>
              )}
            </button>
          </nav>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading resignation data...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {activeTab === "pending" ? (
              <>
                {pendingPaginated.length > 0 ? (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              S.L
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Employee
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Resignation Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Last Working Day By Company
                            </th><th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Last Working Day By User
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Submitted
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {pendingPaginated.map((resignation, index) => (
                            <motion.tr
                              key={resignation._id}
                              variants={itemVariants}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {String(pendingStartIndex + index + 1).padStart(2, "0")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                                    <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {resignation.employee
                                        ? `${resignation.employee.first_Name || "N/A"} ${resignation.employee.last_Name || "N/A"}`
                                        : "N/A"}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      ID: {resignation.employee?.employee_Id || "N/A"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {resignation.resignationDate
                                  ? new Date(resignation.resignationDate).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {resignation.lastWorkingDayCompany
                                  ? new Date(resignation.lastWorkingDayCompany).toLocaleDateString()
                                  : "N/A"}
                              </td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {resignation.lastWorkingDayUser
                                  ? new Date(resignation.lastWorkingDayUser).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {resignation.createdAt
                                  ? new Date(resignation.createdAt).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(resignation.status)}`}>
                                  {getStatusIcon(resignation.status)}
                                  <span>{resignation.status}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {resignation.status === "Pending" && (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleApproveClick(resignation)}
                                      className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg transition-colors"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectClick(resignation)}
                                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                    >
                                      <FiX className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile/Tablet Cards */}
                    <div className="lg:hidden space-y-4 mb-6">
                      {pendingPaginated.map((resignation, index) => (
                        <ResignationCard
                          key={resignation._id}
                          resignation={resignation}
                          index={pendingStartIndex + index}
                          isPending={true}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {pendingTotalPages > 1 && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium">{pendingPaginated.length}</span> of{" "}
                            <span className="font-medium">{filteredPending.length}</span> entries
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setPendingPage(Math.max(1, pendingPage - 1))}
                              disabled={pendingPage === 1}
                              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiChevronLeft className="w-4 h-4" />
                            </button>
                            
                            {Array.from({ length: Math.min(pendingTotalPages, 5) }, (_, i) => {
                              let pageNumber;
                              if (pendingTotalPages <= 5) {
                                pageNumber = i + 1;
                              } else if (pendingPage <= 3) {
                                pageNumber = i + 1;
                              } else if (pendingPage >= pendingTotalPages - 2) {
                                pageNumber = pendingTotalPages - 4 + i;
                              } else {
                                pageNumber = pendingPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => setPendingPage(pageNumber)}
                                  className={`px-3 py-2 rounded-lg border transition-colors ${
                                    pendingPage === pageNumber
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            })}
                            
                            <button
                              onClick={() => setPendingPage(Math.min(pendingTotalPages, pendingPage + 1))}
                              disabled={pendingPage === pendingTotalPages}
                              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiFileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Pending Resignations
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      All resignation requests have been processed.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {historyPaginated.length > 0 ? (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              S.L
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Employee
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Resignation Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Last Working Day By Company
                            </th><th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Last Working Day By User
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Responded At
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Comments
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {historyPaginated.map((resignation, index) => {
                            const approver = resignation.approvers?.find(
                              (a) => a.manager?._id === localStorage.getItem("userId")
                            ) || {};
                            return (
                              <motion.tr
                                key={resignation._id}
                                variants={itemVariants}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {String(historyStartIndex + index + 1).padStart(2, "0")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                                      <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {resignation.employee
                                          ? `${resignation.employee.first_Name || "N/A"} ${resignation.employee.last_Name || "N/A"}`
                                          : "N/A"}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        ID: {resignation.employee?.employee_Id || "N/A"}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {resignation.resignationDate
                                    ? new Date(resignation.resignationDate).toLocaleDateString()
                                    : "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {resignation.lastWorkingDayCompany
                                    ? new Date(resignation.lastWorkingDayCompany).toLocaleDateString()
                                    : "N/A"}
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {resignation.lastWorkingDayUser
                                    ? new Date(resignation.lastWorkingDayUser).toLocaleDateString()
                                    : "N/A"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(resignation.status)}`}>
                                    {getStatusIcon(resignation.status)}
                                    <span>{resignation.status}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                  {approver?.respondedAt
                                    ? new Date(approver.respondedAt).toLocaleDateString()
                                    : "N/A"}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                  {approver?.comments || "No comments"}
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile/Tablet Cards */}
                    <div className="lg:hidden space-y-4 mb-6">
                      {historyPaginated.map((resignation, index) => (
                        <ResignationCard
                          key={resignation._id}
                          resignation={resignation}
                          index={historyStartIndex + index}
                          isPending={false}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {historyTotalPages > 1 && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span className="font-medium">{historyPaginated.length}</span> of{" "}
                            <span className="font-medium">{filteredHistory.length}</span> entries
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setHistoryPage(Math.max(1, historyPage - 1))}
                              disabled={historyPage === 1}
                              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiChevronLeft className="w-4 h-4" />
                            </button>
                            
                            {Array.from({ length: Math.min(historyTotalPages, 5) }, (_, i) => {
                              let pageNumber;
                              if (historyTotalPages <= 5) {
                                pageNumber = i + 1;
                              } else if (historyPage <= 3) {
                                pageNumber = i + 1;
                              } else if (historyPage >= historyTotalPages - 2) {
                                pageNumber = historyTotalPages - 4 + i;
                              } else {
                                pageNumber = historyPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNumber}
                                  onClick={() => setHistoryPage(pageNumber)}
                                  className={`px-3 py-2 rounded-lg border transition-colors ${
                                    historyPage === pageNumber
                                      ? "bg-blue-600 text-white border-blue-600"
                                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  }`}
                                >
                                  {pageNumber}
                                </button>
                              );
                            })}
                            
                            <button
                              onClick={() => setHistoryPage(Math.min(historyTotalPages, historyPage + 1))}
                              disabled={historyPage === historyTotalPages}
                              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <FiChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiFileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Resignation History
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No resignation requests have been processed yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {/* Confirmation Dialog for Approve */}
          <ConfirmationDialog
            open={approveModalOpen}
            title="Approve Resignation"
            // message={
            //   selectedResignation ? (
            //     <div className="space-y-3">
            //       <p>Are you sure you want to approve this resignation request?</p>
            //       <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm space-y-2">
            //         <p><strong>Employee:</strong> {selectedResignation.employee
            //           ? `${selectedResignation.employee.first_Name || "N/A"} ${selectedResignation.employee.last_Name || "N/A"}`
            //           : "N/A"}</p>
            //         <p><strong>Employee ID:</strong> {selectedResignation.employee?.employee_Id || "N/A"}</p>
            //         <p><strong>Resignation Date:</strong> {selectedResignation.resignationDate
            //           ? new Date(selectedResignation.resignationDate).toLocaleDateString()
            //           : "N/A"}</p>
            //         <p><strong>Last Working Day By Company:</strong> {selectedResignation.lastWorkingDayCompany
            //           ? new Date(selectedResignation.lastWorkingDayCompany).toLocaleDateString()
            //           : "N/A"}</p>
            //           <p><strong>Last Working Day By User:</strong> {selectedResignation.lastWorkingDayUser
            //           ? new Date(selectedResignation.lastWorkingDayUser).toLocaleDateString()
            //           : "N/A"}</p>
            //       </div>
            //     </div>
            //   ) : (
            //     "Are you sure you want to approve this resignation?"
            //   )
            // }

            message={
  selectedResignation ? (
    <div className="space-y-4">
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <p><strong>Employee:</strong> {`${selectedResignation.employee?.first_Name} ${selectedResignation.employee?.last_Name}`}</p>
        <p><strong>Resignation Date:</strong> {new Date(selectedResignation.resignationDate).toLocaleDateString()}</p>
        <p><strong>Company LWD:</strong> {new Date(selectedResignation.lastWorkingDayCompany).toLocaleDateString()}</p>
        <p><strong>User LWD:</strong> {new Date(selectedResignation.lastWorkingDayUser).toLocaleDateString()}</p>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-gray-800 dark:text-gray-200 block">
          Do you accept the employee's requested last working day?
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={acceptEarlyExit === true}
              onChange={() => setAcceptEarlyExit(true)}
            />
            <span>Yes (Accept Early Exit)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={acceptEarlyExit === false}
              onChange={() => setAcceptEarlyExit(false)}
            />
            <span>No (Enforce Company Date)</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-800 dark:text-gray-200 mb-1">
          Optional Comments
        </label>
        <textarea
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm px-3 py-2 text-gray-800 dark:text-white"
          rows={3}
          value={approvalComment}
          onChange={(e) => setApprovalComment(e.target.value)}
        />
      </div>
    </div>
  ) : "Are you sure you want to approve this resignation?"
}

            onConfirm={handleConfirmApprove}
            onCancel={() => setApproveModalOpen(false)}
            confirmText="Yes, Approve"
            cancelText="Cancel"
            type="success"
          />

          {/* Rejection Modal */}
          {rejectModalOpen && (
            <BaseModal
              isOpen={rejectModalOpen}
              onClose={() => setRejectModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                        <FiXCircle className="w-6 h-6 mr-2 text-red-600 dark:text-red-400" />
                        Reject Resignation
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Please provide a reason for rejecting this resignation
                      </p>
                    </div>
                    <button
                      onClick={() => setRejectModalOpen(false)}
                      className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {selectedResignation && (
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                        Resignation Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Employee:</span> {selectedResignation.employee
                            ? `${selectedResignation.employee.first_Name || "N/A"} ${selectedResignation.employee.last_Name || "N/A"}`
                            : "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Employee ID:</span> {selectedResignation.employee?.employee_Id || "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Resignation Date:</span> {selectedResignation.resignationDate
                            ? new Date(selectedResignation.resignationDate).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Last Working Day:</span> {selectedResignation.lastWorkingDayCompany
                            ? new Date(selectedResignation.lastWorkingDayCompany).toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Last Working Day:</span> {selectedResignation.lastWorkingDayUser
                            ? new Date(selectedResignation.lastWorkingDayUser).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="rejectComment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      <FiMessageSquare className="w-4 h-4 inline mr-2" />
                      Rejection Comments
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="rejectComment"
                      rows={4}
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Please provide a detailed reason for rejecting this resignation request..."
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      This comment will be shared with the employee.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setRejectModalOpen(false)}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmReject}
                      disabled={!rejectComment.trim()}
                      className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiX className="w-4 h-4" />
                      <span>Reject Resignation</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </BaseModal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}