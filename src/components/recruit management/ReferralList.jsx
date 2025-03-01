

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Skeleton } from "@mui/material";
import ViewReferralModal from "./model/ViewReferralModal";
import UpdateStatusModal from "./model/UpdateStatusModal";
import useReferralStore from "../../store/useReferralStore";
import ExportButtons from "../common/PdfExcel"; // adjust path if needed

const tableContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ReferralList() {
  const { referrals, loading, error, fetchAllReferrals, updateReferralStatus } =
    useReferralStore();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);

  useEffect(() => {
    fetchAllReferrals();
  }, [fetchAllReferrals]);

  // -----------------------------------------
  // Filter logic to match month-year + search + department
  // -----------------------------------------
  const filteredReferrals = useMemo(() => {
    if (!referrals) return [];
    return referrals.filter((item) => {
      // 1) Match search text
      if (searchText) {
        const matchDesignation = item.designation
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchCandidate = item.candidateName
          .toLowerCase()
          .includes(searchText.toLowerCase());
        // If neither matches, exclude
        if (!matchDesignation && !matchCandidate) return false;
      }

      // 2) Match department
      if (department !== "All" && item.department !== department) return false;

      // 3) Match selected month-year from DatePicker
      //    We'll compare only the month & year of `item.createdAt` to selectedDate
      if (selectedDate) {
        const createdAt = new Date(item.createdAt);
        const selectedMonth = selectedDate.getMonth();
        const selectedYear = selectedDate.getFullYear();

        if (
          createdAt.getMonth() !== selectedMonth ||
          createdAt.getFullYear() !== selectedYear
        ) {
          return false;
        }
      }

      return true;
    });
  }, [referrals, searchText, department, selectedDate]);

  // -----------------------------------------
  // Pagination
  // -----------------------------------------
  const totalPages = Math.ceil(filteredReferrals.length / pageSize);
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredReferrals.slice(startIndex, startIndex + pageSize);
  }, [filteredReferrals, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // -----------------------------------------
  // Modals
  // -----------------------------------------
  const handleOpenViewModal = (referral) => {
    setSelectedReferral(referral);
    setIsViewModalOpen(true);
  };

  const handleOpenUpdateModal = (referral) => {
    setSelectedReferral(referral);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async (newStatus, feedback) => {
    if (!selectedReferral) return;
    try {
      await updateReferralStatus(selectedReferral.id, newStatus, feedback);
      alert(`Status updated to '${newStatus}'.`);
      setIsUpdateModalOpen(false);
    } catch (err) {
      alert("Error updating referral status.");
      console.error(err);
    }
  };

  // -----------------------------------------
  // Data for PDF/Excel/CSV exports
  // -----------------------------------------
  const exportData = currentTableData.map((item, index) => {
    const rowIndex = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: String(rowIndex).padStart(2, "0"),
      designation: item.designation,
      department: item.department,
      referredBy: item.referredBy,
      candidateName: item.candidateName,
      candidateEmail: item.candidateEmail,
      candidateLocation: item.candidateLocation,
      status: item.status,
      // If you want to include the date in your export as well:
      createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  });

  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Designation", dataKey: "designation" },
    { header: "Department", dataKey: "department" },
    { header: "Referred By", dataKey: "referredBy" },
    { header: "Candidate Name", dataKey: "candidateName" },
    { header: "Candidate Email", dataKey: "candidateEmail" },
    { header: "Candidate Location", dataKey: "candidateLocation" },
    { header: "Status", dataKey: "status" },
    { header: "Created On", dataKey: "createdAt" }, // optional in your export
  ];

  return (
    <div className="px-4 py-6 bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Referral List</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
        <div className="flex items-center gap-4">
          {/* Page Size */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold whitespace-nowrap">Show</label>
            <select
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
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
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Date + Dept + Export */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Month-Year Picker */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            placeholderText="Select Month, Year"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />

          {/* Department */}
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
          </select>

          {/* Export Buttons (PDF, CSV, Excel) */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <ExportButtons
              data={exportData}
              columns={columns}
              filename="ReferralList"
            />
          </div>
        </div>
      </div>

      {/* Error handling */}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
          {Array.from({ length: pageSize }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={40}
              className="mb-2"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredReferrals.length > 0 ? (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-md shadow overflow-auto transition-colors"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Designation</th>
                    <th className="p-3 text-sm font-semibold">Department</th>

                    {/* NEW COLUMN: "Referral Date" */}
                    <th className="p-3 text-sm font-semibold">Created On</th>

                    <th className="p-3 text-sm font-semibold">Referred By</th>
                    <th className="p-3 text-sm font-semibold">
                      Candidate Name
                    </th>
                    <th className="p-3 text-sm font-semibold">
                      Candidate Email
                    </th>
                    <th className="p-3 text-sm font-semibold">
                      Candidate Location
                    </th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item, index) => {
                    const rowIndex = (currentPage - 1) * pageSize + (index + 1);

                    // Status classes for styling
                    let statusClasses =
                      "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold";
                    if (item.status === "Onboard") {
                      statusClasses =
                        "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "In Review") {
                      statusClasses =
                        "bg-yellow-50 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-600 px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Rejected") {
                      statusClasses =
                        "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Pending") {
                      statusClasses =
                        "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600 px-2 py-1 rounded text-xs font-semibold";
                    }

                    return (
                      <motion.tr
                        key={item.id}
                        variants={tableRowVariants}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="p-3 text-sm">
                          {String(rowIndex).padStart(2, "0")}
                        </td>
                        <td className="p-3 text-sm">{item.designation}</td>
                        <td className="p-3 text-sm">{item.department}</td>

                        {/* SHOW CREATED DATE */}
                        <td className="p-3 text-sm">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td className="p-3 text-sm">{item.referredBy}</td>
                        <td className="p-3 text-sm">{item.candidateName}</td>
                        <td className="p-3 text-sm">{item.candidateEmail}</td>
                        <td className="p-3 text-sm">{item.candidateLocation}</td>
                        <td className="p-3 text-sm">
                          <span className={statusClasses}>{item.status}</span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                              onClick={() => handleOpenViewModal(item)}
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                              onClick={() => handleOpenUpdateModal(item)}
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                              onClick={() =>
                                alert(`Delete referral ${item.id}`)
                              }
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>

              {/* Pagination Footer */}
              <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm text-gray-600 dark:text-gray-200 transition-colors">
                <div>
                  Showing {currentTableData.length} of{" "}
                  {filteredReferrals.length} entries
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded border transition-colors ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400 transition-colors">
              No matching records found
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isViewModalOpen && selectedReferral && (
          <ViewReferralModal
            referral={selectedReferral}
            onClose={() => setIsViewModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isUpdateModalOpen && selectedReferral && (
          <UpdateStatusModal
            referral={selectedReferral}
            onClose={() => setIsUpdateModalOpen(false)}
            onSubmit={handleUpdateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
