import React, { useState } from "react";

const TopProductiveEmployee = () => {
  // Sample static data for demonstration
  const topData = [
    {
      sl: "01",
      empID: "R001",
      empName: "John Doe",
      designation: "UI/UX Designer",
      department: "IT",
      breakTime: "15 min",
      unproductiveTime: "30 min",
      productiveTime: "8h 30m",
      detectionType: "Keyboard",
    },
    {
      sl: "02",
      empID: "R002",
      empName: "Alice Smith",
      designation: "Software Engineer",
      department: "Engineering",
      breakTime: "20 min",
      unproductiveTime: "45 min",
      productiveTime: "8h 15m",
      detectionType: "Mouse",
    },
    {
      sl: "03",
      empID: "R003",
      empName: "Chris Johnson",
      designation: "Data Analyst",
      department: "Analytics",
      breakTime: "10 min",
      unproductiveTime: "20 min",
      productiveTime: "8h 50m",
      detectionType: "Keyboard",
    },
  ];

  // Search and pagination states
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 2; // Display 2 entries per page for demonstration

  // 1) Filter the data based on searchValue
  const filteredData = topData.filter((item) => {
    const lowerSearch = searchValue.toLowerCase();
    return (
      item.empName.toLowerCase().includes(lowerSearch) ||
      item.empID.toLowerCase().includes(lowerSearch)
    );
  });

  // 2) Calculate pagination on filtered data
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, endIndex);

  // Navigate to specific page (with boundary checks)
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to first page whenever searchValue changes
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100 w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        Top Productive Employee
      </h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID"
          value={searchValue}
          onChange={handleSearchChange}
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 focus:outline-none"
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase dark:bg-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-3">S.L</th>
            <th className="px-4 py-3">Emp ID</th>
            <th className="px-4 py-3">Emp Name</th>
            <th className="px-4 py-3">Designation</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Break Time</th>
            <th className="px-4 py-3">Unproductive Time</th>
            <th className="px-4 py-3">Productive Time</th>
            <th className="px-4 py-3">Detection Type</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((item) => (
            <tr
              key={item.sl}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-4 py-2">{item.sl}</td>
              <td className="px-4 py-2">{item.empID}</td>
              <td className="px-4 py-2">{item.empName}</td>
              <td className="px-4 py-2">{item.designation}</td>
              <td className="px-4 py-2">{item.department}</td>
              <td className="px-4 py-2">{item.breakTime}</td>
              <td className="px-4 py-2">{item.unproductiveTime}</td>
              <td className="px-4 py-2">{item.productiveTime}</td>
              <td className="px-4 py-2">{item.detectionType}</td>
            </tr>
          ))}
          {currentEntries.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Showing {totalEntries === 0 ? 0 : startIndex + 1} to{" "}
          {endIndex > totalEntries ? totalEntries : endIndex} of {totalEntries} entries
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
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
                className={`px-3 py-1 border rounded ${
                  pageNum === currentPage
                    ? "bg-purple-200 border-purple-600 text-purple-800"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {pageNum}
              </button>
            )
          )}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
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

export default TopProductiveEmployee;
