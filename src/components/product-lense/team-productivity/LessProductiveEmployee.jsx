import React, { useState, useEffect } from "react";
import { fetchLessSubordinates } from "../../../service/productLenseService"; // adjust path as needed

const LessProductiveEmployee = () => {
  // State for API data and loading
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states: search, interval, and date
  const [selectedInterval, setSelectedInterval] = useState("daily"); // default daily
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  });
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 2; // For demonstration

  // Helper: determine date input type based on interval
  const getDateInputType = () => {
    if (selectedInterval === "daily") return "date";
    if (selectedInterval === "monthly") return "month";
    if (selectedInterval === "yearly") return "number";
    return "date";
  };

  // Helper: compute max allowed date (disable future dates)
  const getMaxValue = () => {
    const now = new Date();
    if (selectedInterval === "daily") {
      return now.toISOString().split("T")[0];
    } else if (selectedInterval === "monthly") {
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
    } else if (selectedInterval === "yearly") {
      return String(now.getFullYear());
    }
    return now.toISOString().split("T")[0];
  };

  // Fetch data when filters change
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const result = await fetchLessSubordinates(
        selectedInterval,
        selectedDate,
        searchValue
      );
      setData(result);
      setLoading(false);
    };
    getData();
  }, [selectedInterval, selectedDate, searchValue]);

  // Optionally further filter data locally
  const filteredData = data.filter((item) => {
    const lowerSearch = searchValue.toLowerCase();
    return (
      (item.empName && item.empName.toLowerCase().includes(lowerSearch)) ||
      (item.empID && item.empID.toLowerCase().includes(lowerSearch))
    );
  });

  // Pagination calculations
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleIntervalChange = (e) => {
    setSelectedInterval(e.target.value);
    // Reset date based on interval
    const now = new Date();
    if (e.target.value === "daily") {
      setSelectedDate(now.toISOString().split("T")[0]);
    } else if (e.target.value === "monthly") {
      setSelectedDate(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
      );
    } else if (e.target.value === "yearly") {
      setSelectedDate(String(now.getFullYear()));
    }
    setCurrentPage(1);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100 w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        Less Productive Employee
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Interval:
          </label>
          <select
            value={selectedInterval}
            onChange={handleIntervalChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            {selectedInterval === "daily" && "Date:"}
            {selectedInterval === "monthly" && "Month:"}
            {selectedInterval === "yearly" && "Year:"}
          </label>
          <input
            type={getDateInputType()}
            value={selectedDate}
            onChange={handleDateChange}
            max={getMaxValue()}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </div>

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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Table */}
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3">S.L</th>
                <th className="px-4 py-3">Emp ID</th>
                <th className="px-4 py-3">Emp Name</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Department</th>

                <th className="px-4 py-3">Unproductive Time</th>
                <th className="px-4 py-3">Productive Time</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((item, index) => (
                <tr
                  key={item.empID}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2">
                    {String(startIndex + index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2">{item.empID}</td>
                  <td className="px-4 py-2">{item.empName}</td>
                  <td className="px-4 py-2">{item.designation}</td>
                  <td className="px-4 py-2">{item.department}</td>

                  <td className="px-4 py-2">{item.unproductiveTime}</td>
                  <td className="px-4 py-2">{item.productiveTime}</td>
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
              {endIndex > totalEntries ? totalEntries : endIndex} of{" "}
              {totalEntries} entries
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
        </>
      )}
    </div>
  );
};

export default LessProductiveEmployee;
