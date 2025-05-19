import { useState, useEffect, useMemo } from "react";
import {
  FaRegEye,
  FaPen,
  FaTrash,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaSearch,
  FaCalendarAlt,
  FaFileAlt,
  FaSpinner,
} from "react-icons/fa";

// Import your custom components
import ManagePayrollView from "./ManagePayrollView";
import ManagePayrollEdit from "./ManagePayrollEdit";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import ExportButtons from "../../common/PdfExcel"; 

// Service calls
import {
  fetchAllPayroll,
  fetchAllocatedDepartments,
  addPayroll,
  getPayrollSummary,
} from "../../../service/payrollService";

// Utility: Converts numeric month (1-12) to text
function getMonthName(month) {
  const monthNames = [
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
  return monthNames[month - 1] || "Unknown";
}

export default function ManagePayroll() {
  // Defaults to current month/year

  const [loading, setLoading] = useState(true);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // States for month/year
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  // Payroll Data & Department Options
  const [payrollList, setPayrollList] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals for View/Edit
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Processing (spinner) & Confirmation Dialog (for Process Payroll)
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);

  // Confirmation dialog (for Delete)
  const [confirmOpen, setConfirmOpen] = useState(false);

  // for count

  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalPayout: 0,
  });

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      const response = await getPayrollSummary(currentMonth, currentYear);

      if (response.success) {
        setSummary(response.data);
      } else {
        console.error(response.message);
      }
      setLoading(false);
    }

    fetchSummary();
  }, [currentMonth, currentYear]);

  // 1) Fetch Departments (once on mount)
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) return;

    fetchAllocatedDepartments(employeeId)
      .then((depts) => setDepartmentOptions(depts))
      .catch((err) => console.error("Failed to fetch departments:", err));
  }, []);

  // 2) Fetch Payroll Data on month/year change
  useEffect(() => {
    const loadPayrollData = async () => {
      try {
        const data = await fetchAllPayroll(month, year);
        setPayrollList(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };
    loadPayrollData();
  }, [month, year]);

  // Convert numeric month => string
  const monthName = getMonthName(month);

  // Filter payroll by searchTerm & department
  const filteredPayroll = useMemo(() => {
    return payrollList.filter((entry) => {
      const matchesSearch = entry.employeeId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDept =
        !selectedDepartment || entry.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [payrollList, searchTerm, selectedDepartment]);

  // Pagination logic
  const totalItems = filteredPayroll.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedPayroll = filteredPayroll.slice(startIndex, endIndex);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Open the confirmation dialog (Processing Payroll)
  const openProcessPayrollDialog = () => {
    setIsProcessDialogOpen(true);
  };

  // Confirm => process payroll
  const handleConfirmProcessPayroll = async () => {
    setIsProcessDialogOpen(false);

    try {
      setIsProcessing(true);
      const result = await addPayroll(month, year);
      setIsProcessing(false);

      if (result.success) {
        // e.g. toast.success(result.message || 'Payroll processed successfully!');
        // Re-fetch payroll data
        const data = await fetchAllPayroll(month, year);
        setPayrollList(data);
      } else {
        // e.g. toast.error(result.message || 'Failed to process payroll.');
      }
    } catch (error) {
      setIsProcessing(false);
      // e.g. toast.error(error.message || 'Error processing payroll.');
    }
  };

  // Cancel => just close the dialog
  const handleCancelProcessPayroll = () => {
    setIsProcessDialogOpen(false);
  };

  // Handler for <input type="month">
  const handleMonthChange = (e) => {
    const [yr, mo] = e.target.value.split("-");
    setYear(parseInt(yr, 10));
    setMonth(parseInt(mo, 10));
    setCurrentPage(1);
  };

  // Modals: View, Edit
  const handleViewClick = (payroll) => {
    setSelectedPayroll(payroll);
    setIsViewModalOpen(true);
  };
  const handleCloseViewModal = () => {
    setSelectedPayroll(null);
    setIsViewModalOpen(false);
  };
  const handleEditClick = (payroll) => {
    setSelectedPayroll(payroll);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedPayroll(null);
    setIsEditModalOpen(false);
  };

  // Delete payroll - open confirmation dialog
  const handleDeleteClick = (payroll) => {
    setSelectedPayroll(payroll);
    setConfirmOpen(true);
  };

  // If user confirms delete
  const handleConfirmDelete = () => {
    setPayrollList((prev) =>
      prev.filter((item) => item._id !== selectedPayroll._id)
    );
    setConfirmOpen(false);
    setSelectedPayroll(null);
  };

  // If user cancels delete
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedPayroll(null);
  };

  // Flatten displayedPayroll for exporting
  const exportData = displayedPayroll.map((entry, index) => {
    const sl = (currentPage - 1) * pageSize + (index + 1);
    return {
      sl,
      empID: entry.employeeId,
      department: entry.department,
      month: entry.month,
      year: entry.year,
      amount: entry.amount,
      deduction: entry.deduction,
      finalSalary: entry.finalSalary,
    };
  });

  // Define columns for PDF/Excel/CSV
  const columns = [
    { header: "S.L", dataKey: "sl" },
    { header: "Employee ID", dataKey: "empID" },
    { header: "Department", dataKey: "department" },
    { header: "Month", dataKey: "month" },
    { header: "Year", dataKey: "year" },
    { header: "Amount", dataKey: "amount" },
    { header: "Deduction", dataKey: "deduction" },
    { header: "Final Salary", dataKey: "finalSalary" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col">
      {/* Top Banner */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        {/* Total Employees */}
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900 p-4 border border-blue-100 dark:border-blue-800">
          <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
            Total Employee
          </div>
          <div className="text-2xl font-bold mt-1 text-black dark:text-white">
            {loading ? "Loading..." : summary.totalEmployees.toLocaleString()}
          </div>
        </div>

        {/* Total Payout */}
        <div className="rounded-lg bg-pink-50 dark:bg-pink-900 p-4 border border-pink-100 dark:border-pink-800">
          <div className="text-sm text-pink-700 dark:text-pink-300 font-semibold">
            Total Payout for{" "}
            {new Date(0, currentMonth - 1).toLocaleString("default", {
              month: "long",
            })}
          </div>
          <div className="text-2xl font-bold mt-1 text-black dark:text-white">
            {loading ? "Loading..." : `₹ ${summary.totalPayout}`}
          </div>
        </div>

        {/* Total Unpaid Salary */}
        {/* <div className="rounded-lg bg-purple-50 dark:bg-purple-900 p-4 border border-purple-100 dark:border-purple-800">
        <div className="text-sm text-purple-700 dark:text-purple-300 font-semibold">
          Total Unpaid Salary
        </div>
        <div className="text-2xl font-bold mt-1 text-black dark:text-white">
          {loading ? "Loading..." : `₹ ${summary.totalUnpaidSalary.toFixed(2)}`}
        </div>
      </div> */}
      </div>

      {/* Main Heading */}
      <div className="px-4 mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Payroll for {monthName} {year}
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 px-4 mb-4">
        {/* Page Size */}
        <div className="flex items-center">
          <label
            htmlFor="pageSize"
            className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Show
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="
              border
              border-gray-300
              dark:border-gray-700
              rounded-md
              px-2
              py-1
              text-sm
              focus:outline-none
              bg-white
              dark:bg-gray-800
              text-gray-900
              dark:text-gray-100
            "
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center w-full md:w-auto border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Emp ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full focus:outline-none dark:bg-gray-900"
          />
        </div>

        {/* Month + Department */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Month */}
          <div className="relative flex items-center">
            <FaCalendarAlt className="absolute left-2 text-gray-400" />
            <input
              type="month"
              value={`${year}-${String(month).padStart(2, "0")}`}
              onChange={handleMonthChange}
              className="border border-gray-300 dark:border-gray-700 rounded-md pl-8 pr-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
            />
          </div>
          {/* Department */}
          <select
            value={selectedDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm focus:outline-none dark:bg-gray-900"
          >
            <option value="">All Departments</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Export/Print */}
        <div className="flex items-center gap-3">
          <ExportButtons
            data={exportData}
            columns={columns}
            filename="ManagePayroll"
          />
        </div>

        {/* Processing Payroll (Confirmation Dialog) */}
        <button
          onClick={openProcessPayrollDialog}
          disabled={isProcessing}
          className={`
            bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md
            flex items-center justify-center gap-2
            ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {isProcessing ? (
            <>
              <FaSpinner className="animate-spin" />
              Processing...
            </>
          ) : (
            "Processing Payroll"
          )}
        </button>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto px-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm rounded-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">S.L</th>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
              <th className="px-4 py-2 text-left font-semibold">Department</th>
              <th className="px-4 py-2 text-left font-semibold">Month</th>
              <th className="px-4 py-2 text-left font-semibold">Year</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
              <th className="px-4 py-2 text-left font-semibold">Deduction</th>
              <th className="px-4 py-2 text-left font-semibold">
                Final Salary
              </th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayroll.map((entry, index) => (
              <tr
                key={entry._id}
                className="border-b last:border-0 dark:border-gray-700"
              >
                <td className="px-4 py-2">
                  {(currentPage - 1) * pageSize + (index + 1)}
                </td>
             
                <td className="px-4 py-2">{entry.firstName} {entry.lastName}</td>
                <td className="px-4 py-2 text-blue-600 dark:text-blue-400 font-medium">
                  {entry.employeeId}
                </td>
                <td className="px-4 py-2">{entry.department}</td>

                <td className="px-4 py-2">{entry.month}</td>
                <td className="px-4 py-2">{entry.year}</td>
                <td className="px-4 py-2">{entry.amount}</td>
                <td className="px-4 py-2">{entry.deduction}</td>
                <td className="px-4 py-2">{entry.finalSalary}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2 text-lg">
                    <button
                      title="View"
                      onClick={() => handleViewClick(entry)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaRegEye />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => handleEditClick(entry)}
                      className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      <FaPen />
                    </button>
                    {/* <button
                      title="Delete"
                      onClick={() => handleDeleteClick(entry)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
            {displayedPayroll.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                  No payroll records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
        <span className="text-sm mb-2 sm:mb-0">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
          {totalItems} entries
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`
                  px-3 py-1 border rounded
                  ${currentPage === pageNum ? "bg-blue-500 text-white" : ""}
                `}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Detail & Edit Modals */}
      <ManagePayrollView
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        payrollData={selectedPayroll}
      />
      <ManagePayrollEdit
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        payrollData={selectedPayroll}
        onRefresh={() => fetchAllPayroll(month, year).then(setPayrollList)}
      />

      {/* ConfirmationDialog for Processing Payroll */}
      <ConfirmationDialog
        open={isProcessDialogOpen}
        title="Process Payroll?"
        message={`Are you sure you want to process payroll for ${monthName} ${year}?`}
        confirmText="Yes"
        cancelText="No"
        onConfirm={handleConfirmProcessPayroll}
        onCancel={handleCancelProcessPayroll}
      />

      {/* ConfirmationDialog for Delete */}
      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Confirmation"
        message={`Delete payroll record for Employee ID: ${selectedPayroll?.employeeId}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
