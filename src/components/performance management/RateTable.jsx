import React, { useState } from "react";

export default function RateTable({ data, loading, onRateClick }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate total pages based on itemsPerPage
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleData = data ? data.slice(startIdx, startIdx + itemsPerPage) : [];

  // Handlers for Prev and Next buttons
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Handler for "Go to page" input
  const [gotoPage, setGotoPage] = useState("");
  const handleGotoPage = (e) => {
    e.preventDefault();
    const page = Number(gotoPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setGotoPage("");
  };

  // Handler for items per page selection
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // reset page to 1 when items per page changes
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        View Top Performer
      </h2>

      {loading ? (
        <p className="text-center dark:text-gray-300">Loading subordinates...</p>
      ) : data && data.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    S.L
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Emp ID
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Employee Name
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Designation
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Department
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {visibleData.map((member, idx) => (
                  <tr key={member._id}>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {String(startIdx + idx + 1).padStart(2, "0")}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {member.employee_Id}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {member.first_Name} {member.last_Name}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {member.designation}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {member.department}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700">
                      <button
                        onClick={() => onRateClick(member)}
                        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded"
                      >
                        Rate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <form onSubmit={handleGotoPage} className="flex items-center space-x-2 mt-2 md:mt-0">
              <label htmlFor="gotoPage" className="text-sm dark:text-gray-300">
                Go to page:
              </label>
              <input
                id="gotoPage"
                type="number"
                value={gotoPage}
                onChange={(e) => setGotoPage(e.target.value)}
                className="w-16 p-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                min="1"
                max={totalPages}
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Go
              </button>
            </form>

            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <label htmlFor="itemsPerPage" className="text-sm dark:text-gray-300">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="p-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </>
      ) : (
        <p className="dark:text-gray-300">No subordinates found.</p>
      )}
    </div>
  );
}
