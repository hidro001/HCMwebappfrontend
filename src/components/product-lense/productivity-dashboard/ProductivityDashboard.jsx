import { useState, useEffect, useMemo } from "react";
import { fetchProductivityData } from "../../../service/productLenseService";

// For CSV/Excel export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// For PDF export
import jsPDF from "jspdf";
import "jspdf-autotable";

// Icons
import { FaFilePdf, FaFileCsv, FaFileExcel, FaPrint } from "react-icons/fa";

// Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Framer Motion
import { motion } from "framer-motion";

const ProductivityDashboard = () => {
  // --------------------------
  // State
  // --------------------------
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  // Default interval is daily
  const [selectedInterval, setSelectedInterval] = useState("daily");
  // Default daily date using today's date in "YYYY-MM-DD" format
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  });

  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // --------------------------
  // Update selectedDate when interval changes
  // --------------------------
  useEffect(() => {
    const now = new Date();
    if (selectedInterval === "daily" || selectedInterval === "weekly") {
      setSelectedDate(now.toISOString().split("T")[0]); // "YYYY-MM-DD"
    } else if (selectedInterval === "monthly") {
      setSelectedDate(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
      ); // "YYYY-MM"
    } else if (selectedInterval === "yearly") {
      setSelectedDate(String(now.getFullYear())); // "YYYY"
    }
  }, [selectedInterval]);

  // --------------------------
  // Compute max value for input to disable future dates
  // --------------------------
  const today = new Date();
  let maxValue;
  if (selectedInterval === "daily" || selectedInterval === "weekly") {
    maxValue = today.toISOString().split("T")[0]; // e.g., "2025-02-21"
  } else if (selectedInterval === "monthly") {
    maxValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`; // e.g., "2025-02"
  } else if (selectedInterval === "yearly") {
    maxValue = String(today.getFullYear()); // e.g., "2025"
  }

  // --------------------------
  // Fetch data from API whenever selectedInterval or selectedDate changes
  // --------------------------
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchProductivityData(selectedInterval, selectedDate);
      setTableData(data);
      setLoading(false);
    };
    getData();
  }, [selectedInterval, selectedDate]);

  // --------------------------
  // Filtering Data based on Search
  // --------------------------
  const filteredData = useMemo(() => {
    return tableData.filter(
      (row) =>
        row.empName.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.empID.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [tableData, searchValue]);

  // --------------------------
  // Sorting
  // --------------------------
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    const sorted = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sorted);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // --------------------------
  // Pagination (on filtered data)
  // --------------------------
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const currentEntries = filteredData.slice(firstIndex, lastIndex);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // --------------------------
  // Export Functions
  // --------------------------
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(13);
    doc.text("Employee Productivity", 14, 15);
    const columns = [
      { header: "S.L", dataKey: "sl" },
      { header: "Emp ID", dataKey: "empID" },
      { header: "Emp Name", dataKey: "empName" },
      { header: "Designation", dataKey: "designation" },
      { header: "Department", dataKey: "department" },
      { header: "Break Time", dataKey: "breakTime" },
      { header: "Unproductive", dataKey: "unproductiveTime" },
      { header: "Productive", dataKey: "productiveTime" },
      { header: "Detection", dataKey: "detectionType" },
    ];
    doc.autoTable({
      startY: 20,
      head: [columns.map((col) => col.header)],
      body: tableData.map((row) =>
        columns.map((col) => row[col.dataKey] ?? "")
      ),
    });
    doc.save("EmployeeProductivity.pdf");
  };

  const handleExportCSV = () => {
    let csv =
      "S.L,Emp ID,Emp Name,Designation,Department,Break Time,Unproductive Time,Productive Time,Detection Type\n";
    tableData.forEach((row) => {
      csv += `${row.sl},${row.empID},${row.empName},${row.designation},${row.department},${row.breakTime},${row.unproductiveTime},${row.productiveTime},${row.detectionType}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "EmployeeProductivity.csv");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Productivity");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "EmployeeProductivity.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  // --------------------------
  // Handlers for Interval and Date Input
  // --------------------------
  const handleIntervalChange = (e) => {
    setSelectedInterval(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // --------------------------
  // Table Header Definition
  // --------------------------
  const headers = [
    { key: "sl", label: "S.L" },
    { key: "empID", label: "Emp ID" },
    { key: "empName", label: "Emp Name" },
    { key: "designation", label: "Designation" },
    { key: "department", label: "Department" },
    { key: "unproductiveTime", label: "Unproductive Time" },
    { key: "productiveTime", label: "Productive Time" },
  ];

  // --------------------------
  // Framer Motion Variants
  // --------------------------
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // --------------------------
  // JSX
  // --------------------------
  return (
    <div className="p-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-[#1B6EB3] mb-2 dark:text-blue-400">
        Employee Productivity
      </h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Show Entries */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Show
          </label>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100">
            <option value="5">5</option>
            <option value="10" defaultValue>
              10
            </option>
            <option value="25">25</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-48 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Interval Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Interval:
          </label>
          <select
            value={selectedInterval}
            onChange={handleIntervalChange}
            className="border border-gray-300 text-sm rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Date/Period Selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            {selectedInterval === "daily" && "Date:"}
            {selectedInterval === "weekly" && "Week (any day):"}
            {selectedInterval === "monthly" && "Month:"}
            {selectedInterval === "yearly" && "Year:"}
          </label>
          <input
            type={
              selectedInterval === "daily" || selectedInterval === "weekly"
                ? "date"
                : selectedInterval === "monthly"
                ? "month"
                : "number"
            }
            value={selectedDate}
            onChange={handleDateChange}
            max={maxValue}
            className="border border-gray-300 text-sm rounded px-2 py-1 bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="text-green-600 hover:text-green-800"
            title="Export CSV"
          >
            <FaFileCsv size={18} />
          </button>
          <button
            onClick={handleExportPDF}
            className="text-pink-600 hover:text-pink-800"
            title="Export PDF"
          >
            <FaFilePdf size={18} />
          </button>
          <button
            onClick={handlePrint}
            className="text-orange-500 hover:text-orange-600"
            title="Print"
          >
            <FaPrint size={18} />
          </button>
          <button
            onClick={handleExportExcel}
            className="text-blue-600 hover:text-blue-800"
            title="Export Excel"
          >
            <FaFileExcel size={18} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-gray-200 shadow-sm rounded mb-4 overflow-x-auto bg-white dark:bg-gray-800">
        {loading ? (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-sm dark:bg-gray-700 dark:text-gray-200">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    className="px-4 py-2 border-b border-gray-200"
                  >
                    <Skeleton width={60} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(entriesPerPage)
                .fill(0)
                .map((_, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {headers.map((_, j) => (
                      <td
                        key={j}
                        className="px-4 py-2 border-b border-gray-200"
                      >
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : currentEntries.length > 0 ? (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-sm dark:bg-gray-700 dark:text-gray-200">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    onClick={() => handleSort(header.key)}
                    className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
                  >
                    {header.label} {getSortIcon(header.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.05 }}
              className="text-gray-700 dark:text-gray-200"
            >
              {currentEntries.map((row) => (
                <motion.tr
                  key={row.sl}
                  variants={rowVariants}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {row[header.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        ) : (
          <div className="p-4 text-center">No data found.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Showing {totalEntries === 0 ? 0 : firstIndex + 1} to{" "}
          {lastIndex > totalEntries ? totalEntries : lastIndex} of{" "}
          {totalEntries} entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === pageNum
                    ? "bg-[#1B6EB3] border-[#1B6EB3] text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded text-sm ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductivityDashboard;
