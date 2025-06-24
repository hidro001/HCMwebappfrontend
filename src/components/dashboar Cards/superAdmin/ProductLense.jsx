
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
  FaCoffee,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineDatabase,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Import your service
import { fetchBreakStats } from "../../../service/productLenseService";

const EmployeeBreakStatsTable = () => {
  // Data, pagination, and loading states
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalResults: 0,
    currentPage: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [showCount, setShowCount] = useState(10);
  const [pageInput, setPageInput] = useState(1);

  // New UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Optional filters (interval, date)
  const interval = "daily";
  const date = "";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchBreakStats(
          interval,
          date,
          currentPage,
          showCount
        );

        setData(result?.data || []);
        setPagination({
          totalPages: result?.pagination?.totalPages ?? 0,
          totalResults: result?.pagination?.totalResults ?? 0,
          currentPage: result?.pagination?.currentPage ?? 1,
          limit: result?.pagination?.limit ?? 10,
        });
      } catch (error) {
        console.error("Error fetching break stats:", error);
        setData([]);
        setPagination({
          totalPages: 0,
          totalResults: 0,
          currentPage: 1,
          limit: 10,
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, showCount, interval, date]);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  // Handler functions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  const handleShowCountChange = (e) => {
    setShowCount(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(pageInput, 10);
    if (pageNum >= 1 && pageNum <= pagination.totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Animation variants (simplified for compactness)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const tbodyVariants = {
    visible: { transition: { staggerChildren: 0.03 } },
    hidden: {},
  };

  const rowVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const totalPages = pagination.totalPages;
    const current = pagination.currentPage;

    // Always show first page
    if (totalPages > 0) {
      buttons.push(1);
    }

    // Add ellipsis and current page area
    if (current > 3) {
      buttons.push("...");
    }

    // Add pages around current
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(totalPages - 1, current + 1);
      i++
    ) {
      if (!buttons.includes(i)) {
        buttons.push(i);
      }
    }

    // Add ellipsis and last page
    if (current < totalPages - 2) {
      buttons.push("...");
    }

    if (totalPages > 1) {
      buttons.push(totalPages);
    }

    return [...new Set(buttons)];
  };

  return (
    <div className="min-h-screen border border-white/20 dark:border-gray-700/50 p-3 md:p-4 rounded-2xl">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Compact Glassmorphism Card Container */}
        <motion.div
          variants={cardVariants}
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
        >
          {/* Compact Header */}
          <motion.div
            variants={headerVariants}
            className="relative px-4 py-4 bg-bg-tertiary"
          >
      

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <HiOutlineSparkles className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    Productivity Lens
                  </h1>
                  <p className="text-white/90 text-sm font-medium flex items-center gap-2">
                    <HiOutlineLightningBolt className="text-yellow-300" />
                    Employee break analytics
                  </p>
                </div>
              </div>

              {/* Compact stats */}
              <div className="flex gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center min-w-[60px]">
                  <FaUsers className="text-lg text-white mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {pagination.totalResults}
                  </div>
                  <div className="text-xs text-white/80">Total</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-center min-w-[60px]">
                  <FaCoffee className="text-lg text-white mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {currentPage}
                  </div>
                  <div className="text-xs text-white/80">Page</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compact Controls Section */}
          <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
              {/* Left side controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Compact Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-300 text-sm"
                  />
                </div>

                {/* Compact Show count */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-md border border-gray-200 dark:border-gray-700">
                  <HiOutlineDatabase className="text-indigo-500 text-sm" />
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Show
                  </label>
                  <select
                    value={showCount}
                    onChange={handleShowCountChange}
                    className="bg-transparent border-none focus:outline-none font-semibold text-indigo-600 dark:text-indigo-400 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                >
                  <FaFilter className="text-xs" />
                  Filters
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                >
                  <FaDownload className="text-xs" />
                  Export
                </motion.button>
              </div>
            </div>
          </div>

          {/* Compact Table Container */}
          <div className="p-3">
            {loading ? (
              <div className="space-y-2">
                {/* Skeleton Header */}
                <div className="grid grid-cols-5 gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} height={16} />
                  ))}
                </div>

                {/* Skeleton Rows */}
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-5 gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} height={20} />
                    ))}
                  </motion.div>
                ))}
              </div>
            ) : data.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                  No Data Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Try adjusting your filters or check back later.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {/* Compact Table Header */}
                <div className="grid grid-cols-5 gap-3 p-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                    Serial
                  </div>
                  <div className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                    Employee ID
                  </div>
                  <div className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                    Name
                  </div>
                  <div className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                    Designation
                  </div>
                  <div className="font-bold text-gray-700 dark:text-gray-200 text-xs uppercase tracking-wider">
                    Break Taken
                  </div>
                </div>

                {/* Compact Table Rows */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tbodyVariants}
                  className="space-y-1"
                >
                  <AnimatePresence>
                    {data.map((item, index) => (
                      <motion.div
                        key={item.srn}
                        variants={rowVariant}
                        layout
                        className="group grid grid-cols-5 gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.005, y: -1 }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs mr-2">
                            {item.srn}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg text-xs">
                            {item.empid}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                            {item.name}
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-xs">
                            {item.designation}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaCoffee className="text-amber-500 text-sm" />
                            <span className="font-bold text-base text-gray-900 dark:text-gray-100">
                              {item.breaktaken}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800"
                          >
                            <FaEye className="text-xs" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </div>

          {/* Compact Pagination */}
          {!loading && data.length > 0 && pagination.totalPages > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Compact Results info */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </div>
                  <span className="font-medium text-sm">
                    {pagination.totalResults > 0
                      ? `Showing ${
                          pagination.currentPage === 1
                            ? 1
                            : (pagination.currentPage - 1) * pagination.limit +
                              1
                        } to ${
                          pagination.currentPage * pagination.limit >
                          pagination.totalResults
                            ? pagination.totalResults
                            : pagination.currentPage * pagination.limit
                        } of ${pagination.totalResults} entries`
                      : "Showing 0 to 0 of 0 entries"}
                  </span>
                </div>

                {/* Compact Pagination controls */}
                <div className="flex items-center gap-1">
                  {/* First and Previous */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(1)}
                    disabled={pagination.currentPage === 1}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all duration-200"
                  >
                    <FaAngleDoubleLeft className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all duration-200"
                  >
                    <FaChevronLeft className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </motion.button>

                  {/* Compact Page numbers */}
                  <div className="flex items-center gap-1">
                    {generatePaginationButtons().map((page, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: page !== "..." ? 1.1 : 1 }}
                        whileTap={{ scale: page !== "..." ? 0.9 : 1 }}
                        onClick={() => page !== "..." && handlePageChange(page)}
                        disabled={page === "..."}
                        className={`min-w-[32px] h-8 rounded-lg font-semibold transition-all duration-200 text-sm ${
                          page === pagination.currentPage
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                            : page === "..."
                            ? "text-gray-400 cursor-default"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900"
                        }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>

                  {/* Next and Last */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all duration-200"
                  >
                    <FaChevronRight className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(pagination.totalPages)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-all duration-200"
                  >
                    <FaAngleDoubleRight className="text-indigo-600 dark:text-indigo-400 text-sm" />
                  </motion.button>

                  {/* Compact Go to page */}
                  <div className="flex items-center gap-1 ml-2 bg-white dark:bg-gray-800 rounded-lg p-1.5 border border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      Go
                    </span>
                    <input
                      type="number"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      className="w-12 text-center bg-transparent border-none focus:outline-none font-semibold text-indigo-600 dark:text-indigo-400 text-sm"
                      min="1"
                      max={pagination.totalPages}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoToPage}
                      className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md text-xs font-semibold hover:shadow-md transition-all duration-200"
                    >
                      Go
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmployeeBreakStatsTable;
