
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaBuilding,
  FaDownload,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaBriefcase,
  FaFileAlt
} from "react-icons/fa";
import {
  HiEye,
  HiPencil,
  HiTrash,
  HiSearch,
  HiFilter,
  HiCalendar,
  HiOfficeBuilding,
  HiDownload,
  HiCurrencyDollar,
  HiLocationMarker,
  HiBriefcase,
  HiUser
} from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import useVacancyStore from "../../store/useVacancyStore";
import ViewVacancyModal from "./model/ViewVacancyModal";
import UpdateVacancyModal from "./model/UpdateVacancyModal";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ExportButtons from "../common/PdfExcel";

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.02,
    y: -2,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.2 }
  }
};

export default function VacanciesList() {
  const { vacancies, loading, error, fetchAllVacancies, deleteVacancy } =
    useVacancyStore();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // table or cards
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetchAllVacancies();
      } catch (err) {
        console.error("Failed to fetch vacancies:", err);
      }
    })();
  }, [fetchAllVacancies]);

  const filteredVacancies = useMemo(() => {
    if (!vacancies || vacancies.length === 0) return [];
    return vacancies.filter((job) => {
      if (searchText) {
        const matchTitle = job.jobTitle
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchDept = job.jobDepartment
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchTitle && !matchDept) return false;
      }
      if (department !== "All" && job.jobDepartment !== department)
        return false;
      if (status !== "All" && job.vacancyStatus !== status) return false;
      if (selectedDate) {
        const itemDate = new Date(job.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        const filterDate = new Date(selectedDate);
        filterDate.setHours(0, 0, 0, 0);
        if (itemDate.getTime() !== filterDate.getTime()) return false;
      }
      return true;
    });
  }, [vacancies, searchText, department, status, selectedDate]);

  const totalPages = Math.ceil(filteredVacancies.length / pageSize);

  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredVacancies.slice(startIndex, startIndex + pageSize);
  }, [filteredVacancies, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleViewModal = (vac) => {
    setSelectedVacancy(vac);
    setIsViewModalOpen(true);
  };

  const handleUpdateModal = (vac) => {
    setSelectedVacancy(vac);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (vac) => {
    setVacancyToDelete(vac);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!vacancyToDelete) return;
    try {
      await deleteVacancy(vacancyToDelete._id);
      alert(`Vacancy "${vacancyToDelete.jobTitle}" deleted successfully.`);
    } catch (err) {
      alert("Error deleting vacancy. Check console.");
      console.error(err);
    }
    setVacancyToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setVacancyToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Open":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "Closed":
        return {
          color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: FaTimes,
          iconColor: "text-red-600 dark:text-red-400"
        };
      case "Draft":
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaFileAlt,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
      case "Approved" :
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
        case "Rejected":
        return {
          color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
          icon: FaTimes,
          iconColor: "text-red-600 dark:text-red-400"
        };
      case "Pending":
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaFileAlt,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
      default:
        return {
          color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          icon: FaClock,
          iconColor: "text-blue-600 dark:text-blue-400"
        };
    }
  };

  const getApprovalStatusConfig = (status) => {
  switch (status) {
    case "Approved":
      return {
        color:
          "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
        icon: FaCheckCircle,
        iconColor: "text-green-600 dark:text-green-400",
      };
    case "Rejected":
      return {
        color:
          "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800",
        icon: FaTimes,
        iconColor: "text-red-600 dark:text-red-400",
      };
    case "Pending":
      return {
        color:
          "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
        icon: FaClock,
        iconColor: "text-gray-600 dark:text-gray-400",
      };
    default:
      return {
        color:
          "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        icon: FaFileAlt,
        iconColor: "text-blue-600 dark:text-blue-400",
      };
  }
};


  const exportData = currentTableData.map((vac, idx) => {
    const rowIndex = (currentPage - 1) * pageSize + (idx + 1);
    const postedBy = vac?.createdBy
      ? `${vac.createdBy.first_Name} ${vac.createdBy.last_Name} (${vac.createdBy.employee_Id})`
      : "N/A";
    const formattedSalary =
      vac.salary && vac.salary > 0 ? `${vac.salary} (${vac.currency})` : "---";

    return {
      sl: String(rowIndex).padStart(2, "0"),
      jobTitle: vac.jobTitle,
      department: vac.jobDepartment,
      salary: formattedSalary,
      postedBy,
      postedDate: new Date(vac.createdAt).toLocaleDateString("en-GB"),
      vacancyStatus: vac.vacancyStatus,
    };
  });

  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Designation", dataKey: "jobTitle" },
    { header: "Department", dataKey: "department" },
    { header: "Salary", dataKey: "salary" },
    { header: "Posted By", dataKey: "postedBy" },
    { header: "Posted Date", dataKey: "postedDate" },
    { header: "Status", dataKey: "vacancyStatus" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiBriefcase className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Vacancies Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage job postings and track hiring progress
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Page Size */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Show
                </label>
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span className="text-sm text-gray-600 dark:text-gray-400">entries</span>
              </div>

              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by job title or department..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-3">
                {/* Date Picker */}
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setCurrentPage(1);
                  }}
                  dateFormat="dd MMM yyyy"
                  placeholderText="Filter by date"
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />

                {/* Department Filter */}
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>

                {/* Status Filter */}
                <select
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "cards"
                      ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Export */}
              <ExportButtons
                data={exportData}
                columns={columns}
                filename="VacanciesList"
              />
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Content */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                {Array.from({ length: pageSize }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    height={60}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          ) : filteredVacancies.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <HiBriefcase className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No Vacancies Found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchText || selectedDate || department !== "All" || status !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No job vacancies have been posted yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Table View */}
              {viewMode === "table" && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Job Title
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Salary
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Posted By
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Posted Date
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Approval Status
                          </th>
                          <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <AnimatePresence>
                          {currentTableData.map((vac, idx) => {
                            const rowIndex = (currentPage - 1) * pageSize + (idx + 1);
                            const postedBy = vac?.createdBy?.first_Name
                              ? `${vac.createdBy.first_Name} ${vac.createdBy.last_Name}`
                              : "N/A";
                            const formattedSalary =
                              vac.salary && vac.salary > 0
                                ? `${vac.salary} ${vac.currency}`
                                : "Not specified";
                            const postedDate = new Date(vac.createdAt).toLocaleDateString("en-GB");
                            const statusConfig = getStatusConfig(vac.vacancyStatus);
                            const approvalStatusConfig = getApprovalStatusConfig(vac.approvalStatus);

                            return (
                              <motion.tr
                                key={vac._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                  {String(rowIndex).padStart(2, "0")}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                      <HiBriefcase className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {vac.jobTitle}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <HiOfficeBuilding className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {vac.jobDepartment}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <HiCurrencyDollar className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {formattedSalary}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center space-x-2">
                                    <HiUser className="text-gray-400 text-sm" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                      {postedBy}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                  {postedDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                    <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                    <span>{vac.vacancyStatus}</span>
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                 <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${approvalStatusConfig.color}`}>
                                    <approvalStatusConfig.icon className={`text-xs ${approvalStatusConfig.iconColor}`} />
                                    <span>{vac.approvalStatus}</span>
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end space-x-2">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleViewModal(vac)}
                                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                      title="View Details"
                                    >
                                      <HiEye className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleUpdateModal(vac)}
                                      className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                                      title="Edit Vacancy"
                                    >
                                      <HiPencil className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDelete(vac)}
                                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                                      title="Delete"
                                    >
                                      <HiTrash className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-medium">{currentTableData.length}</span> of{" "}
                        <span className="font-medium">{filteredVacancies.length}</span> vacancies
                      </div>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                              currentPage === i + 1
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cards View */}
              {viewMode === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {currentTableData.map((vac, idx) => {
                      const postedBy = vac?.createdBy?.first_Name
                        ? `${vac.createdBy.first_Name} ${vac.createdBy.last_Name}`
                        : "N/A";
                      const formattedSalary =
                        vac.salary && vac.salary > 0
                          ? `${vac.salary} ${vac.currency}`
                          : "Not specified";
                      const postedDate = new Date(vac.createdAt).toLocaleDateString("en-GB");
                      const statusConfig = getStatusConfig(vac.vacancyStatus);

                      return (
                        <motion.div
                          key={vac._id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 border-b border-gray-100 dark:border-gray-700">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <HiBriefcase className="text-blue-600 dark:text-blue-400 text-lg" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {vac.jobTitle}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {vac.jobDepartment}
                                  </p>
                                </div>
                              </div>
                              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                <span>{vac.vacancyStatus}</span>
                              </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-4">
                            {/* Job Details */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <HiCurrencyDollar className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {formattedSalary}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiUser className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Posted By</p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {postedBy}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <HiCalendar className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Posted Date</p>
                                  <p className="text-sm text-gray-900 dark:text-white">
                                    {postedDate}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleViewModal(vac)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiEye />
                                <span>View</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleUpdateModal(vac)}
                                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiPencil />
                                <span>Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(vac)}
                                className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                <HiTrash />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isViewModalOpen && selectedVacancy && (
          <ViewVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUpdateModalOpen && selectedVacancy && (
          <UpdateVacancyModal
            vacancy={selectedVacancy}
            onClose={() => setIsUpdateModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isConfirmDialogOpen && vacancyToDelete && (
          <ConfirmationDialog
            open={isConfirmDialogOpen}
            title="Confirm Deletion"
            message={`Are you sure you want to delete the job "${vacancyToDelete.jobTitle}"? This action cannot be undone.`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            confirmText="Delete Vacancy"
            cancelText="Cancel"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}