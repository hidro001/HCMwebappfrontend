import { useState, useEffect } from "react";
import axios from "axios";

// For CSV/Excel export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// For PDF export
import jsPDF from "jspdf";
import "jspdf-autotable";

// Icons
import { FaFilePdf, FaFileCsv, FaFileExcel, FaPrint } from "react-icons/fa";

const EmployeeProductivity = () => {
  // --------------------------
  // State
  // --------------------------
  const [tableData, setTableData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Jan 2025");
  const [selectedStatus, setSelectedStatus] = useState("");
  // For sorting
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // --------------------------
  // Fetch data from API
  // --------------------------
  useEffect(() => {
    fetchProductivityData();
  }, []);

  const fetchProductivityData = async () => {
    try {
      // Call the endpoint EXACTLY:
      // http://localhost:6060/api/v1/employee/attendence
      // (Make sure this is where your server is actually running)
      // 1) Retrieve token from localStorage (or your state management)
      const token = localStorage.getItem("accessToken");

      // 2) Construct headers with Bearer token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // If your server expects JSON or other special headers, add them here
          // e.g. 'Content-Type': 'application/json'
        },
      };

      // 3) Make the GET request with the config object
      const res = await axios.get(
        "http://localhost:6060/api/v1/break/productivity",
        config
      );

      // Assuming your server responds with:
      // {
      //   success: true,
      //   message: "Some message",
      //   data: [ { empID, empName, unproductiveTime, ... }, ... ]
      // }
      if (res.data && res.data.data) {
        const fetchedData = res.data.data.map((item, index) => ({
          sl: String(index + 1).padStart(2, "0"),
          empID: item.empID,
          empName: item.empName,
          designation: item.designation,
          department: item.department,
          breakTime: "", // or item.breakTime if your API provides it
          unproductiveTime: item.unproductiveTime || "0",
          productiveTime: item.productiveTime || "0",
          detectionType: "", // remove if not needed
        }));
        setTableData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching productivity data:", error);
    }
  };

  // --------------------------
  // Searching (front-end)
  // --------------------------
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    // If you want real-time searching on the front-end:
    // const filtered = tableData.filter((item) =>
    //   item.empName.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //   item.empID.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    // setTableData(filtered);
    // setCurrentPage(1);
  };

  // --------------------------
  // Dropdown changes
  // --------------------------
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    // Re-fetch with that month if needed
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    // Re-fetch with that status if needed
  };

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
    if (sortConfig.key !== key) return "↕"; // not sorted
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // --------------------------
  // Pagination
  // --------------------------
  const lastIndex = currentPage * entriesPerPage;
  const firstIndex = lastIndex - entriesPerPage;
  const currentEntries = tableData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(tableData.length / entriesPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // --------------------------
  // Exports (PDF, Excel, CSV, Print)
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
  // JSX
  // --------------------------
  return (
    <div className="p-6 bg-white text-gray-800 font-sans">
      {/* Help/Alert Box */}
      <div className="mb-6 p-4 rounded-md border border-[#A6E4DB] bg-[#EBFAF8] text-sm text-gray-700">
        Stay on top of your department’s progress with Department Statistics!
        Gain insights into department-wide tasks, track delayed and assigned
        tasks, and highlight important dates on the calendar. Keep your team
        organized, efficient, and always a step ahead!
      </div>

      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-[#1B6EB3] mb-2">
        Employee Productivity
      </h1>

      {/* Show entries / Search / Month / Status / Export Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Show entries placeholder */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show</label>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option value="5">5</option>
            <option value="10" defaultValue>
              10
            </option>
            <option value="25">25</option>
          </select>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-48"
          />
        </div>

        {/* Month dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Month:</label>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 text-sm rounded px-2 py-1"
          >
            <option value="Feb 2020">Feb 2020</option>
            <option value="Mar 2020">Mar 2020</option>
            <option value="Jan 2025">Jan 2025</option>
          </select>
        </div>

        {/* Status dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Status:</label>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 text-sm rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Sick Leave">Sick Leave</option>
          </select>
        </div>

        {/* Export icon buttons */}
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
      <div className="border border-gray-200 shadow-sm rounded mb-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th
                onClick={() => handleSort("sl")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                S.L {getSortIcon("sl")}
              </th>
              <th
                onClick={() => handleSort("empID")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Emp ID {getSortIcon("empID")}
              </th>
              <th
                onClick={() => handleSort("empName")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Emp Name {getSortIcon("empName")}
              </th>
              <th
                onClick={() => handleSort("designation")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Designation {getSortIcon("designation")}
              </th>
              <th
                onClick={() => handleSort("department")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Department {getSortIcon("department")}
              </th>
              <th
                onClick={() => handleSort("unproductiveTime")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Unproductive Time {getSortIcon("unproductiveTime")}
              </th>
              <th
                onClick={() => handleSort("productiveTime")}
                className="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
              >
                Productive Time {getSortIcon("productiveTime")}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentEntries.map((row) => (
              <tr key={row.sl} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-200">{row.sl}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.empID}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.empName}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.designation}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.department}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.unproductiveTime}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {row.productiveTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <span className="text-sm text-gray-600">
          Showing {firstIndex + 1} to{" "}
          {lastIndex > tableData.length ? tableData.length : lastIndex} of{" "}
          {tableData.length} entries
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
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
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProductivity;
