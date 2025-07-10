import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUserPlus,
  FaClipboardList,
  FaCheckCircle,
  FaDraftingCompass
} from "react-icons/fa";
import {
  HiOfficeBuilding,
  HiLocationMarker,
  HiCurrencyDollar,
  HiCalendar,
  HiEye,
  HiFilter,
  HiSearch,
  HiX
} from "react-icons/hi";
import useVacancyStore from "../../store/useVacancyStore";
import FilterPanel from "./FilterPanel";
import ReferralModal from "./model/ReferralModal";
import JobDetailsModal from "./model/JobDetailsModal";

export default function AllVacancies() {
  const {
    vacancies: storeVacancies,
    loading,
    error,
    fetchAllVacancies,
  } = useVacancyStore();

  const [vacanciesData, setVacanciesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  
  useEffect(() => {
    fetchAllVacancies('Approved');
  }, [fetchAllVacancies]);

  useEffect(() => {
    if (!loading && storeVacancies?.length) {
      const transformed = storeVacancies.map((job) => ({
        id: job._id,
        title: job.jobTitle || "Untitled",
        location:
          job.jobLocations && job.jobLocations.length
            ? job.jobLocations[0]
            : "Remote",
        department: job.jobDepartment || "Development",
        salary: job.salary || 0,
        currency: job.currency || "INR",
        status: mapStatus(job.vacancyStatus),
        publication: new Date(job.createdAt).toDateString(),
        positionType:
          job.employmentType && job.employmentType.length
            ? job.employmentType[0]
            : "Full Time",
        workExperience: job.workExperience || "Any Experience",
        description: job.jobDescription || "No description provided",
      }));
      setVacanciesData(transformed);
    } else if (!loading && storeVacancies?.length === 0) {
      setVacanciesData([]);
    }
  }, [storeVacancies, loading]);

  function mapStatus(backendStatus = "") {
    const s = backendStatus.toLowerCase();
    if (s === "open") return "OPEN";
    if (s === "closed") return "COMPLETED";
    if (s === "draft") return "DRAFT";
    return "OPEN";
  }

  const [selectedTab, setSelectedTab] = useState("ALL");
  const [filters, setFilters] = useState({
    department: "All Department",
    positionType: "All Positions",
    workExperience: "Any Experience",
    location: "Any Location",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleFilterClick = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    toast.success(`Filter updated: ${type} -> ${value}`);
  };

  const handleClearAll = () => {
    setFilters({
      department: "All Department",
      positionType: "All Positions",
      workExperience: "Any Experience",
      location: "Any Location",
    });
    setSearchTerm("");
    toast.success("All filters cleared!");
  };

  const handleOpenReferModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsReferModalOpen(true);
  };

  const handleCloseReferModal = () => {
    setSelectedVacancy(null);
    setIsReferModalOpen(false);
  };

  const handleOpenDetailsModal = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedVacancy(null);
    setIsDetailsModalOpen(false);
  };

  const filteredVacancies = vacanciesData.filter((vac) => {

    if (selectedTab === "OPEN" && vac.status !== "OPEN") return false;
    if (selectedTab === "COMPLETED" && vac.status !== "COMPLETED") return false;
    if (selectedTab === "DRAFT" && vac.status !== "DRAFT") return false;

    if (filters.department !== "All Department" && vac.department !== filters.department)
      return false;
    if (filters.positionType !== "All Positions" && vac.positionType !== filters.positionType)
      return false;
    if (
      filters.workExperience !== "Any Experience" &&
      vac.workExperience !== filters.workExperience
    )
      return false;
    if (
      filters.location !== "Any Location" &&
      !vac.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false;
    
    if (searchTerm && !vac.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !vac.department.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !vac.location.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    
    return true;
  });

  const formatSalary = (salary, currency) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "OPEN":
        return {
          color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800",
          icon: FaCheckCircle,
          iconColor: "text-green-600 dark:text-green-400"
        };
      case "COMPLETED":
        return {
          color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
          icon: FaClipboardList,
          iconColor: "text-blue-600 dark:text-blue-400"
        };
      case "DRAFT":
        return {
          color: "bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600",
          icon: FaDraftingCompass,
          iconColor: "text-gray-600 dark:text-gray-400"
        };
      default:
        return {
          color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
          icon: FaBriefcase,
          iconColor: "text-purple-600 dark:text-purple-400"
        };
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "OPEN": return FaCheckCircle;
      case "COMPLETED": return FaClipboardList;
      case "DRAFT": return FaDraftingCompass;
      default: return FaBriefcase;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      transition: { duration: 0.5 }
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
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8  rounded-2xl"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <HiOfficeBuilding className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Job Vacancies
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and browse available positions
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search vacancies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </motion.div>

        {/* Tabs and Controls */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Tab Navigation */}
            <div className="flex space-x-2  pb-2 lg:pb-0">
              {["ALL", "OPEN", "COMPLETED", "DRAFT"].map((tab) => {
                const TabIcon = getTabIcon(tab);
                const count = tab === "ALL" ? vacanciesData.length : 
                             vacanciesData.filter(v => v.status === tab).length;
                
                return (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTab(tab)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-all duration-200 ${
                      selectedTab === tab
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-md"
                        : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    <TabIcon className="text-sm" />
                    <span className="font-medium">
                      {tab === "ALL" ? "All Vacancies" : tab.charAt(0) + tab.slice(1).toLowerCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedTab === tab 
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle (Desktop) */}
              <div className="hidden lg:flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
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
              </div>

              {/* Filter Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl 2xl:hidden"
              >
                <HiFilter />
                <span>Filters</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center"
          >
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-blue-600 dark:text-blue-400 font-medium">Loading vacancies...</span>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        {!loading && (
          <div className="flex flex-col 2xl:flex-row gap-6">
            {/* Vacancies Content */}
            <motion.div
              variants={itemVariants}
              className="flex-1"
            >
              {filteredVacancies.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <FaBriefcase className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    {searchTerm || Object.values(filters).some(f => f !== "All Department" && f !== "All Positions" && f !== "Any Experience" && f !== "Any Location") 
                      ? "No matching vacancies found" 
                      : "No vacancies available"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    {searchTerm || Object.values(filters).some(f => f !== "All Department" && f !== "All Positions" && f !== "Any Experience" && f !== "Any Location")
                      ? "Try adjusting your search or filter criteria"
                      : "New job postings will appear here"}
                  </p>
                  {(searchTerm || Object.values(filters).some(f => f !== "All Department" && f !== "All Positions" && f !== "Any Experience" && f !== "Any Location")) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClearAll}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200"
                    >
                      <FaTimes />
                      <span>Clear Filters</span>
                    </motion.button>
                  )}
                </div>
              ) : (
                <>
                  {/* Cards View - Default for mobile, optional for desktop */}
                  {viewMode === "cards" && (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {filteredVacancies.map((vacancy, idx) => {
                          const statusConfig = getStatusConfig(vacancy.status);
                          return (
                            <motion.div
                              key={vacancy.id}
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
                                      <FaBriefcase className="text-blue-600 dark:text-blue-400 text-lg" />
                                    </div>
                                    <div>
                                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {vacancy.title}
                                      </h3>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {vacancy.positionType} • {vacancy.workExperience}
                                      </p>
                                    </div>
                                  </div>
                                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                    <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                    <span>{vacancy.status}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Card Content */}
                              <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center space-x-2">
                                    <HiLocationMarker className="text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {vacancy.location}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HiOfficeBuilding className="text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {vacancy.department}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HiCurrencyDollar className="text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Salary</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {formatSalary(vacancy.salary, vacancy.currency)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <HiCalendar className="text-gray-400" />
                                    <div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {vacancy.publication}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleOpenDetailsModal(vacancy)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200"
                                  >
                                    <HiEye />
                                    <span>View Details</span>
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleOpenReferModal(vacancy)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                  >
                                    <FaUserPlus />
                                    <span>Refer</span>
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Table View - Desktop only */}
                  {viewMode === "table" && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Position
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Location
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Department
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Salary
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Published
                              </th>
                              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <AnimatePresence>
                              {filteredVacancies.map((vacancy, idx) => {
                                const statusConfig = getStatusConfig(vacancy.status);
                                return (
                                  <motion.tr
                                    key={vacancy.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                          <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {vacancy.title}
                                          </div>
                                          <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {vacancy.positionType}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        <HiLocationMarker className="text-gray-400 text-sm" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                          {vacancy.location}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        <HiOfficeBuilding className="text-gray-400 text-sm" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                          {vacancy.department}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        <HiCurrencyDollar className="text-gray-400 text-sm" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                          {formatSalary(vacancy.salary, vacancy.currency)}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                        <statusConfig.icon className={`text-xs ${statusConfig.iconColor}`} />
                                        <span>{vacancy.status}</span>
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="flex items-center space-x-2">
                                        <HiCalendar className="text-gray-400 text-sm" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                          {vacancy.publication}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                      <div className="flex items-center justify-end space-x-2">
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => handleOpenDetailsModal(vacancy)}
                                          className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                                          title="View Details"
                                        >
                                          <HiEye className="h-4 w-4" />
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleOpenReferModal(vacancy)}
                                          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-all duration-200"
                                        >
                                          <FaUserPlus className="text-xs" />
                                          <span>Refer</span>
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
                            Showing <span className="font-medium">1</span> to{" "}
                            <span className="font-medium">{filteredVacancies.length}</span> of{" "}
                            <span className="font-medium">{vacanciesData.length}</span> entries
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                              <FaChevronLeft className="text-xs" />
                              <span className="text-sm">Previous</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                            >
                              <span className="text-sm">Next</span>
                              <FaChevronRight className="text-xs" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Desktop Filter Panel */}
            <div className="hidden 2xl:block 2xl:w-80">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearAll}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    Clear All
                  </motion.button>
                </div>
                <FilterPanel
                  filters={filters}
                  handleFilterClick={handleFilterClick}
                  handleClearAll={handleClearAll}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Panel Overlay */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 2xl:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-50 2xl:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Filter Vacancies
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <HiX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
              <div className="p-6 overflow-y-auto h-[calc(100vh-300px)]">
                <FilterPanel
                  filters={filters}
                  handleFilterClick={handleFilterClick}
                  handleClearAll={handleClearAll}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ReferralModal
        isOpen={isReferModalOpen}
        onClose={handleCloseReferModal}
        vacancy={selectedVacancy}
      />
      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        vacancy={selectedVacancy}
      />
    </motion.div>
  );
}