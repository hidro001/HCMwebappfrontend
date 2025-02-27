import React, { useState } from "react";

export default function RatingsTable({ data, loading, onViewClick }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [gotoPage, setGotoPage] = useState("");

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const visibleData = data ? data.slice(startIdx, startIdx + itemsPerPage) : [];

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleGotoPage = (e) => {
    e.preventDefault();
    const page = Number(gotoPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setGotoPage("");
  };

  const handleItemsPerPageChange = (e) => {
    const newItems = Number(e.target.value);
    setItemsPerPage(newItems);
    setCurrentPage(1); // Reset to first page on items per page change
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
        Ratings of Team Member
      </h2>

      {loading ? (
        <p className="text-center dark:text-gray-300">Loading ratings...</p>
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
                    Average Rating
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Comments
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Rated By
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Submitted On
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    For YY/MM
                  </th>
                  <th className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {visibleData.map((item, idx) => (
                  <tr key={item._id}>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {String(idx + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0")}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.ratedTo?.employee_Id}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.ratedTo?.first_Name} {item.ratedTo?.last_Name}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.ratedTo?.designation}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.averageRating}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.comments || "N/A"}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.ratedBy?.first_Name} {item.ratedBy?.last_Name}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700 dark:text-gray-100">
                      {item.year}/{item.month}
                    </td>
                    <td className="p-2 border border-gray-300 dark:border-gray-700">
                      <button
                        onClick={() => onViewClick(item)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center space-y-2 md:space-y-0">
            {/* Prev/Next Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded dark:bg-gray-700 dark:text-gray-100 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1 border rounded dark:bg-gray-700 dark:text-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* "Go to Page" Form */}
            <form onSubmit={handleGotoPage} className="flex items-center space-x-2">
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

            {/* Items per Page Selection */}
            <div className="flex items-center space-x-2">
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
        <p className="dark:text-gray-300">No ratings found.</p>
      )}
    </div>
  );
}
