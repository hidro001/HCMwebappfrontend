import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaPrint,
  FaFilePdf,
} from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { Skeleton } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResignationDetailsModal from "./model/ResignationDetailsModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const DUMMY_STATS = {
  totalResignations: 20,
  pending: 12,
  rejected: 3,
  approved: 5,
  totalResignationsIncrease: 200,
  pendingIncrease: -200,
  rejectedIncrease: 200,
  approvedIncrease: 200,
};

const yearlyLabels = [
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];
const yearlyBarValues = [
  20, 30, 40, 35, 50, 45, 60, 20, 30, 40, 35, 50, 45, 60, 20, 30, 40, 35, 50,
  45, 60, 20, 30, 40, 35, 50, 45,
];
const yearlyLineValues = [
  15, 25, 30, 28, 45, 40, 55, 15, 25, 30, 28, 45, 40, 55, 15, 25, 30, 28, 45,
  40, 55, 15, 25, 30, 28, 45, 40,
];

const monthlyLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthlyBarValues = [10, 20, 15, 25, 30, 40, 35, 40, 25, 20, 10, 30];
const monthlyLineValues = [5, 15, 10, 20, 25, 35, 30, 35, 20, 15, 5, 25];

const DUMMY_VACANCIES = [
  {
    id: 1,
    empNameAndId: "Riya Mishra (RI0023)",
    designation: "UI/UX Designer",
    department: "IT",
    manager: "Riya Mishra (RI0023)",
    submittedAt: "25 Jan 2025",
    status: "Approved",
  },
  {
    id: 2,
    empNameAndId: "Riya Mishra (RI0023)",
    designation: "UI/UX Designer",
    department: "Marketing",
    manager: "Riya Mishra (RI0023)",
    submittedAt: "25 Jan 2025",
    status: "Pending",
  },
  {
    id: 3,
    empNameAndId: "Riya Mishra (RI0023)",
    designation: "UI/UX Designer",
    department: "Marketing",
    manager: "Riya Mishra (RI0023)",
    submittedAt: "25 Jan 2025",
    status: "Rejected",
  },
];

export default function EmployeeFnf() {
  const [loading, setLoading] = useState(true);
  const [vacancies, setVacancies] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [department, setDepartment] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedResignation, setSelectedResignation] = useState(null);
  const [chartPeriod, setChartPeriod] = useState("Yearly");
  const chartRef = useRef(null);

  const handleViewDetails = (item) => {
    setSelectedResignation(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResignation(null);
  };

  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (!scrollableDiv) return;
    if (showModal) {
      scrollableDiv.style.overflowY = "hidden";
    } else {
      scrollableDiv.style.overflowY = "auto";
    }
    return () => {
      scrollableDiv.style.overflowY = "auto";
    };
  }, [showModal]);

  const chartData = useMemo(() => {
    const labels = chartPeriod === "Yearly" ? yearlyLabels : monthlyLabels;
    const barData = chartPeriod === "Yearly" ? yearlyBarValues : monthlyBarValues;
    const lineData = chartPeriod === "Yearly" ? yearlyLineValues : monthlyLineValues;

    const barColor =
      chartPeriod === "Yearly"
        ? "rgba(96, 165, 250, 0.3)"
        : "rgba(255, 159, 64, 0.3)";
    const lineColor = chartPeriod === "Yearly" ? "#3b82f6" : "#FF9F40";

    return {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Bar Data",
          data: barData,
          backgroundColor: barColor,
          barThickness: 24,
          borderWidth: 0,
          borderRadius: 6,
          order: 1,
        },
        {
          type: "line",
          label: "Line Data",
          data: lineData,
          tension: 0.3,
          fill: true,
          borderColor: lineColor,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: lineColor,
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) return lineColor;
            const gradient = canvasCtx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, `${lineColor}55`);
            gradient.addColorStop(1, `${lineColor}00`);
            return gradient;
          },
          order: 2,
        },
      ],
    };
  }, [chartPeriod]);

  useEffect(() => {
    setVacancies(DUMMY_VACANCIES);
    setLoading(false);
  }, []);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((item) => {
      if (searchText) {
        const matchName = item.empNameAndId
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const matchDesignation = item.designation
          .toLowerCase()
          .includes(searchText.toLowerCase());
        if (!matchName && !matchDesignation) return false;
      }
      if (department !== "All" && item.department !== department) return false;
      if (statusFilter !== "All" && item.status !== statusFilter) return false;
      if (selectedDate) {
        const itemDate = new Date(2025, 0, 25).setHours(0, 0, 0, 0);
        const filterDate = selectedDate.setHours(0, 0, 0, 0);
        if (itemDate !== filterDate) return false;
      }
      return true;
    });
  }, [vacancies, searchText, department, statusFilter, selectedDate]);

  const totalPages = Math.ceil(filteredVacancies.length / pageSize);
  const currentTableData = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredVacancies.slice(startIdx, startIdx + pageSize);
  }, [filteredVacancies, currentPage, pageSize]);

  const handlePageChange = (page) => setCurrentPage(page);

  function getColor(val) {
    return val >= 0 ? "text-green-500" : "text-orange-500";
  }

  function getArrow(val) {
    return val >= 0 ? <FaArrowUp /> : <FaArrowDown />;
  }

  return (
    <div className="mx-auto p-4 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div
          className="
            p-4 rounded-lg shadow flex items-center 
            bg-gradient-to-r from-[#EFF4FE] to-white 
            dark:from-gray-700 dark:to-gray-800 
            transition-colors
          "
        >
          <div className="h-10 w-10 bg-blue-500 text-white rounded-md flex items-center justify-center mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M17 20h5v-1a2 2 0 00-2-2h-1v3z"></path>
              <path d="M2 20h5v-1a2 2 0 00-2-2H2v3z"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <circle cx="15" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Total Resignations
            </p>
            <h3 className="text-lg font-semibold">
              {DUMMY_STATS.totalResignations}
            </h3>
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${getColor(
                DUMMY_STATS.totalResignationsIncrease
              )}`}
            >
              {getArrow(DUMMY_STATS.totalResignationsIncrease)}
              Increase by {Math.abs(DUMMY_STATS.totalResignationsIncrease)} this
              Month
            </p>
          </div>
        </div>
        <div
          className="
            p-4 rounded-lg shadow flex items-center 
            bg-gradient-to-r from-[#F6F1FC] to-white 
            dark:from-gray-700 dark:to-gray-800 
            transition-colors
          "
        >
          <div className="h-10 w-10 bg-purple-500 text-white rounded-md flex items-center justify-center mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 2v4"></path>
              <path d="M8 2v4"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Pending
            </p>
            <h3 className="text-lg font-semibold">{DUMMY_STATS.pending}</h3>
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${getColor(
                DUMMY_STATS.pendingIncrease
              )}`}
            >
              {getArrow(DUMMY_STATS.pendingIncrease)}
              Increase by {Math.abs(DUMMY_STATS.pendingIncrease)} this Month
            </p>
          </div>
        </div>
        <div
          className="
            p-4 rounded-lg shadow flex items-center 
            bg-gradient-to-r from-[#FEF4F2] to-white 
            dark:from-gray-700 dark:to-gray-800 
            transition-colors
          "
        >
          <div className="h-10 w-10 bg-red-500 text-white rounded-md flex items-center justify-center mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Rejected
            </p>
            <h3 className="text-lg font-semibold">{DUMMY_STATS.rejected}</h3>
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${getColor(
                DUMMY_STATS.rejectedIncrease
              )}`}
            >
              {getArrow(DUMMY_STATS.rejectedIncrease)}
              Increase by {Math.abs(DUMMY_STATS.rejectedIncrease)} this Month
            </p>
          </div>
        </div>
        <div
          className="
            p-4 rounded-lg shadow flex items-center 
            bg-gradient-to-r from-[#F1FAF5] to-white 
            dark:from-gray-700 dark:to-gray-800 
            transition-colors
          "
        >
          <div className="h-10 w-10 bg-green-500 text-white rounded-md flex items-center justify-center mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              Approved
            </p>
            <h3 className="text-lg font-semibold">{DUMMY_STATS.approved}</h3>
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${getColor(
                DUMMY_STATS.approvedIncrease
              )}`}
            >
              {getArrow(DUMMY_STATS.approvedIncrease)}
              Increase by {Math.abs(DUMMY_STATS.approvedIncrease)} this Month
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mb-6 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Resignations Statistics</h2>
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={chartPeriod}
            onChange={(e) => setChartPeriod(e.target.value)}
          >
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-300 mb-4">
          {chartPeriod} Resignations overview
        </p>
        {loading ? (
          <Skeleton variant="rectangular" height={220} />
        ) : (
          <div className="h-64">
            <Line
              ref={chartRef}
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: "#6b7280" },
                  },
                  x: {
                    ticks: { color: "#6b7280" },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Vacancies Management</h2>
        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Import
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-md shadow mb-4 transition-colors">
        <div className="flex items-center gap-4">
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
        <div className="flex flex-wrap items-center gap-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            dateFormat="dd MMM yyyy"
            placeholderText="25 Jan 2025"
            className="border rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />
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
          <select
            className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Print"
            >
              <FaPrint size={16} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Export PDF"
            >
              <FaFilePdf size={16} />
            </button>
            <button
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Export CSV/Excel"
            >
              <MdOutlineFileDownload size={18} />
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow transition-colors">
          {Array.from({ length: pageSize }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={40} className="mb-2" />
          ))}
        </div>
      ) : (
        <>
          {currentTableData.length > 0 ? (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-md shadow overflow-x-auto transition-colors"
              variants={tableContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-700 transition-colors">
                  <tr>
                    <th className="p-3 text-sm font-semibold">S.L</th>
                    <th className="p-3 text-sm font-semibold">Emp Name & ID</th>
                    <th className="p-3 text-sm font-semibold">Designation</th>
                    <th className="p-3 text-sm font-semibold">Department</th>
                    <th className="p-3 text-sm font-semibold">Assigned Manager</th>
                    <th className="p-3 text-sm font-semibold">Submitted At</th>
                    <th className="p-3 text-sm font-semibold">Status</th>
                    <th className="p-3 text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTableData.map((item, index) => {
                    const rowIndex = (currentPage - 1) * pageSize + (index + 1);
                    let statusClasses =
                      "bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-500 px-2 py-1 rounded text-xs font-semibold";
                    if (item.status === "Pending") {
                      statusClasses =
                        "bg-orange-50 dark:bg-orange-700 text-orange-600 dark:text-orange-100 border border-orange-200 dark:border-orange-600 px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Approved") {
                      statusClasses =
                        "bg-green-50 dark:bg-green-700 text-green-600 dark:text-green-100 border border-green-200 dark:border-green-600 px-2 py-1 rounded text-xs font-semibold";
                    } else if (item.status === "Rejected") {
                      statusClasses =
                        "bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-100 border border-red-200 dark:border-red-600 px-2 py-1 rounded text-xs font-semibold";
                    }
                    return (
                      <motion.tr
                        key={item.id}
                        variants={tableRowVariants}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        <td className="p-3 text-sm">{String(rowIndex).padStart(2, "0")}</td>
                        <td className="p-3 text-sm">{item.empNameAndId}</td>
                        <td className="p-3 text-sm">{item.designation}</td>
                        <td className="p-3 text-sm">{item.department}</td>
                        <td className="p-3 text-sm">{item.manager}</td>
                        <td className="p-3 text-sm">{item.submittedAt}</td>
                        <td className="p-3 text-sm">
                          <span className={statusClasses}>{item.status}</span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex items-center space-x-3">
                            <button
                              className="text-blue-500 hover:text-blue-600 transition-colors"
                              onClick={() => handleViewDetails(item)}
                            >
                              <FaEye />
                            </button>
                            <button
                              className="text-green-500 hover:text-green-600 transition-colors"
                              onClick={() => alert(`Edit item ID: ${item.id}`)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600 transition-colors"
                              onClick={() => alert(`Delete item ID: ${item.id}`)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </motion.table>
              <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-2 text-sm">
                <div>
                  Showing {currentTableData.length} of {filteredVacancies.length} entries
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
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-center text-gray-500 dark:text-gray-400">
              No matching records found
            </div>
          )}
        </>
      )}
      <ResignationDetailsModal isOpen={showModal} data={selectedResignation} onClose={handleCloseModal} />
    </div>
  );
}
