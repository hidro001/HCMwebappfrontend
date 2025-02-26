import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
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
  // For "go to page" input
  const [pageInput, setPageInput] = useState(1);

  // Optional filters (interval, date)
  const interval = "daily";
  const date = ""; // Adjust if you want a default date

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

        // Safely set data (fallback to empty array if undefined)
        setData(result?.data || []);

        // Safely set pagination (provide defaults with nullish coalescing)
        setPagination({
          totalPages: result?.pagination?.totalPages ?? 0,
          totalResults: result?.pagination?.totalResults ?? 0,
          currentPage: result?.pagination?.currentPage ?? 1,
          limit: result?.pagination?.limit ?? 10,
        });
      } catch (error) {
        console.error("Error fetching break stats:", error);
        // Optionally handle error state here
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

  // Keep page input in sync with currentPage
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

  // Variants for the container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Variants for the table rows with staggered children via the tbody
  const tbodyVariants = {
    visible: {
      transition: { staggerChildren: 0.1 },
    },
    hidden: {},
  };

  const rowVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Card Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header with Link */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-gray-700 dark:to-gray-900 rounded-t-lg flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">
              Productivity Lense
            </h3>
            <p className="mt-2 text-sm text-white">
              Overview of employee break details.
            </p>
          </div>
          {/* <Link
            to="/dashboard/main-dashboard"
            className="mt-4 sm:mt-0 inline-flex items-center text-white hover:underline"
          >
            See More <FaArrowRight className="ml-2" />
          </Link> */}
        </div>

        {/* Filters & Show Count */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Show</label>
            <select
              value={showCount}
              onChange={handleShowCountChange}
              className="border border-gray-300 dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-gray-900"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="p-4 overflow-x-auto">
          {loading ? (
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
                  <th className="px-4 py-3 uppercase">SRN</th>
                  <th className="px-4 py-3 uppercase">EmpID</th>
                  <th className="px-4 py-3 uppercase">Name</th>
                  <th className="px-4 py-3 uppercase">Designation</th>
                  <th className="px-4 py-3 uppercase">BreakTaken</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0
                        ? "bg-blue-50 dark:bg-gray-800"
                        : "bg-green-50 dark:bg-gray-900"
                    }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Skeleton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : data.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No data found.</div>
          ) : (
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <tr className="text-sm font-medium text-gray-600 dark:text-gray-200">
                  <th className="px-4 py-3 uppercase">SRN</th>
                  <th className="px-4 py-3 uppercase">EmpID</th>
                  <th className="px-4 py-3 uppercase">Name</th>
                  <th className="px-4 py-3 uppercase">Designation</th>
                  <th className="px-4 py-3 uppercase">BreakTaken</th>
                </tr>
              </thead>
              <motion.tbody initial="hidden" animate="visible" variants={tbodyVariants}>
                {data.map((item, index) => (
                  <motion.tr
                    key={item.srn}
                    variants={rowVariant}
                    className={`${
                      index % 2 === 0
                        ? "bg-blue-50 dark:bg-gray-800"
                        : "bg-green-50 dark:bg-gray-900"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">{item.srn}</td>
                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      {item.empid}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.designation}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.breaktaken}</td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && data.length > 0 && pagination.totalPages > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              {pagination.totalResults > 0
                ? `Showing ${
                    pagination.currentPage === 1
                      ? 1
                      : (pagination.currentPage - 1) * pagination.limit + 1
                  } to ${
                    pagination.currentPage * pagination.limit >
                    pagination.totalResults
                      ? pagination.totalResults
                      : pagination.currentPage * pagination.limit
                  } of ${pagination.totalResults} entries`
                : "Showing 0 to 0 of 0 entries"}
            </div>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Prev
              </button>
              <div className="flex items-center space-x-2">
                <span>Page</span>
                <input
                  type="number"
                  value={pageInput}
                  onChange={handlePageInputChange}
                  className="w-16 text-center border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  min="1"
                  max={pagination.totalPages}
                />
                <span>of {pagination.totalPages}</span>
                <button
                  onClick={handleGoToPage}
                  className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Go
                </button>
              </div>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 rounded border transition-colors bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeBreakStatsTable;
