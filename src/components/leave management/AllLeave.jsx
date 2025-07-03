import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPrint,
  FaFilePdf,
  FaUserAlt,
  FaCalendarAlt,
  FaFileCsv,
  FaFileExcel,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import LeaveDetailsModal from "./model/LeaveDetailsAllModal";
import useLeaveStore from "../../store/allLeaveStore";
import ExportButtons from "../common/PdfExcel"; 
import { fetchGlobalLeaveStats } from "../../service/leaveService.js";

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

export default function AllLeave() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const [globalStats, setGlobalStats] = useState({
    pendingRequests: 0,
    approvedThisMonth: 0,
    rejectedThisMonth: 0,
  });

  const { leaves, isLoading, fetchLeaves } = useLeaveStore();

  useEffect(() => {
    async function loadGlobalStats() {
      try {
        const response = await fetchGlobalLeaveStats();
        if (response.success && response.data) {
          setGlobalStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching global leave stats:", error);
      }
    }
    loadGlobalStats();
  }, []);

  useEffect(() => {
    fetchLeaves(activeStatus);
  }, [activeStatus, fetchLeaves]);

  const filteredData = useMemo(() => {
    let searchRegex;
    try {
      searchRegex = new RegExp(searchText, "i");
    } catch (err) {
      searchRegex = /a^/; 
    }

    return leaves.filter((item) => {
      const employeeName = item.employee
        ? `${item.employee.first_Name} ${item.employee.last_Name}`
        : "";
      const employeeId = item.employee?.employee_Id || "";

      // Match either employee name or ID against the regex
      const matchSearch =
        searchRegex.test(employeeName) || searchRegex.test(employeeId);

      // Match status exactly if not "all"
      const matchStatus =
        activeStatus === "all" ? true : item.leave_Status === activeStatus;

      // Match month if selected
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
  }, [leaves, searchText, activeStatus, selectedMonth]);

  // 4. Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // 5. Modal close handler
  const handleCloseModal = () => {
    setSelectedLeave(null);
  };

  // 6. Prepare data for export
  const exportData = paginatedData.map((entry, index) => {
    const serialNo = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl: serialNo,
      empID: entry.employee?.employee_Id || "N/A",
      empName: entry.employee
        ? `${entry.employee.first_Name} ${entry.employee.last_Name}`
        : "Unknown",
      paidLeaveBalance: entry.employee?.no_of_Paid_Leave || "N/A",
      leaveType: entry.leave_Type,
      leaveFrom: new Date(entry.leave_From).toLocaleDateString(),
      leaveTo: entry.leave_To
        ? new Date(entry.leave_To).toLocaleDateString()
        : "N/A",
      days: entry.no_Of_Days,
      reasonForLeave: entry.reason_For_Leave,
      leaveCategory:
        entry.is_Paid === null ? "Pending" : entry.is_Paid ? "Paid" : "Unpaid",
      processedBy:
        entry.leave_Status === "approved" && entry.approved_By
          ? `${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
          : entry.leave_Status === "rejected" && entry.rejected_By
          ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
          : "Pending",
      status:
        entry.leave_Status.charAt(0).toUpperCase() +
        entry.leave_Status.slice(1),
    };
  });

  // 7. Define columns for PDF/Excel/CSV
  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Emp ID", dataKey: "empID" },
    { header: "Emp Name", dataKey: "empName" },
    { header: "Paid Leave Balance", dataKey: "paidLeaveBalance" },
    { header: "Leave Type", dataKey: "leaveType" },
    { header: "From", dataKey: "leaveFrom" },
    { header: "To", dataKey: "leaveTo" },
    { header: "Days", dataKey: "days" },
    { header: "Reason for Leave", dataKey: "reasonForLeave" },
    { header: "Leave Category", dataKey: "leaveCategory" },
    { header: "Processed By", dataKey: "processedBy" },
    { header: "Status", dataKey: "status" },
  ];

  return (
    <div className="mx-auto p-4 bg-bg-primary text-text-primary transition-colors">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Pending Requests */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Pending Request</span>
            <span className="text-3xl font-extrabold mt-2">
              {globalStats.pendingRequests}
            </span>
          </div>
          <FaUserAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>

        {/* Approved this month */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Approved this month</span>
            <span className="text-3xl font-extrabold mt-2">
              {globalStats.approvedThisMonth}
            </span>
          </div>
          <FaCalendarAlt className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>

        {/* Rejected this month */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow relative overflow-hidden">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Reject this month</span>
            <span className="text-3xl font-extrabold mt-2">
              {globalStats.rejectedThisMonth}
            </span>
          </div>
          <FaCheckCircle className="text-4xl text-gray-300 absolute top-4 right-4" />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leave History</h2>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Show</span>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium">entries</span>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Name or Emp ID"
            className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Month Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400" />
            <input
              type="month"
              className="pl-8 pr-4 py-1 border rounded text-sm bg-white dark:bg-gray-700"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Status Filter */}
        <select
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700"
          value={activeStatus}
          onChange={(e) => {
            setActiveStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <ExportButtons
            data={exportData}
            columns={columns}
            filename="AllLeaveRecords"
          />
        </div>
      </div>

      {/* Loading Indicator or Table */}
      {isLoading ? (
        <div className="text-center py-10">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <motion.div
              className="bg-bg-secondary rounded-md shadow overflow-x-auto"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.table className="w-full text-left border-collapse min-w-max">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Emp ID</th>
                    <th className="p-3 text-sm font-semibold">Emp Name</th>
                    <th className="p-3 text-sm font-semibold">Leave Bank</th>
                    <th className="p-3 text-sm font-semibold">Leave Type</th>
                    <th className="p-3 text-sm font-semibold">From</th>
                    <th className="p-3 text-sm font-semibold">To</th>
                    <th className="p-3 text-sm font-semibold">Days</th>
                    <th className="p-3 text-sm font-semibold">
                      Reason for Leave
                    </th>
                    <th className="p-3 text-sm font-semibold">
                      Leave Category
                    </th>
                    <th className="p-3 text-sm font-semibold">Processed By</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry, index) => (
                    <motion.tr
                      key={entry._id}
                      variants={tableRowVariants}
                      onClick={() => setSelectedLeave(entry)}
                      className="cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-3 text-sm">
                        {(currentPage - 1) * pageSize + (index + 1)}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.employee?.employee_Id || "N/A"}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.employee
                          ? `${entry.employee.first_Name} ${entry.employee.last_Name}`
                          : "Unknown"}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.employee?.no_of_Paid_Leave || "N/A"}
                      </td>
                      <td className="p-3 text-sm">{entry.leave_Type}</td>
                      <td className="p-3 text-sm">
                        {new Date(entry.leave_From).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.leave_To
                          ? new Date(entry.leave_To).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3 text-sm">{entry.no_Of_Days}</td>
                      <td className="p-3 text-sm">
                        {entry.reason_For_Leave &&
                        entry.reason_For_Leave.split(" ").length > 3
                          ? entry.reason_For_Leave
                              .split(" ")
                              .slice(0, 3)
                              .join(" ") + "..."
                          : entry.reason_For_Leave}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.is_Paid === null
                          ? "Pending"
                          : entry.is_Paid
                          ? "Paid"
                          : "Unpaid"}
                      </td>
                      <td className="p-3 text-sm">
                        {entry.leave_Status === "approved" && entry.approved_By
                          ? `${entry.approved_By.first_Name} ${entry.approved_By.last_Name}`
                          : entry.leave_Status === "rejected" &&
                            entry.rejected_By
                          ? `Rejected by ${entry.rejected_By.first_Name} ${entry.rejected_By.last_Name}`
                          : "Pending"}
                      </td>
                      <td className="p-3 text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            entry.leave_Status === "approved"
                              ? "bg-green-50 text-green-700"
                              : entry.leave_Status === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {entry.leave_Status.charAt(0).toUpperCase() +
                            entry.leave_Status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <FaEye
                            className="text-blue-400 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLeave(entry);
                            }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>

              {/* Pagination */}
              <div className="flex justify-between items-center p-3 gap-2 text-sm">
                <div>
                  Showing {paginatedData.length} of {filteredData.length}{" "}
                  entries
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded border transition-colors ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
              No matching records found
            </div>
          )}
        </>
      )}

      {/* Render the LeaveDetailsModal when a leave is selected */}
      {selectedLeave && (
        <LeaveDetailsModal leave={selectedLeave} onClose={handleCloseModal} />
      )}
    </div>
  );
}
