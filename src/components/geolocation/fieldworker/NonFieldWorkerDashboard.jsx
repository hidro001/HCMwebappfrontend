import React, { useState, useEffect } from "react";
import axiosInstance from "../../../service/axiosInstance";
import { FaUserAlt, FaUsers } from "react-icons/fa";

export default function NonFieldWorkerDashboard() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  });
  const [fieldWorkerCounts, setFieldWorkerCounts] = useState({
    trueCount: 0,
    falseCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [goToPageValue, setGoToPageValue] = useState(""); // State for "Go to page" input

  // Fetch users from the API and update pagination and field worker counts
  const fetchUsers = async (page = 1, search = "") => {
    try {
      const response = await axiosInstance.get(`/geolocation/all-user`, {
        params: { page, limit: pagination.limit, searchQuery: search }, // Pass search query to the API
      });
      const { success, data } = response.data;

      if (success) {
        setUsers(data.users);
        setPagination({
          ...pagination,
          page: data.page,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
        });

        // Calculate field worker counts based on the fetched users
        const trueCount = data.users.filter((user) => user.isFieldWorker).length;
        const falseCount = data.users.length - trueCount;
        setFieldWorkerCounts({ trueCount, falseCount });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when the component mounts or when page changes or search query changes
  useEffect(() => {
    fetchUsers(pagination.page, searchQuery);
  }, [pagination.page, searchQuery]);

  // Handle page change in pagination
  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  // Toggle the 'isFieldWorker' status and update counts
  const toggleFieldWorkerStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await axiosInstance.put(`/geolocation/fildworker-action/${userId}`, {
        isFieldWorker: newStatus,
      });

      const updatedUser = response.data.data;
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.employee_Id === userId ? { ...user, isFieldWorker: updatedUser.isFieldWorker } : user
        )
      );

      // Update field worker counts based on the new status
      setFieldWorkerCounts((prevCounts) => {
        return {
          trueCount: newStatus ? prevCounts.trueCount + 1 : prevCounts.trueCount - 1,
          falseCount: newStatus ? prevCounts.falseCount - 1 : prevCounts.falseCount + 1,
        };
      });
    } catch (error) {
      console.error("Error toggling field worker status:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle "Go to page" input change
  const handleGoToPageChange = (e) => {
    setGoToPageValue(e.target.value);
  };

  // Handle "Go" button click
  const handleGoToPage = () => {
    const targetPage = parseInt(goToPageValue, 10);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: targetPage }));
      setGoToPageValue(""); // Clear the input after submission
    } else {
      alert("Invalid page number");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="text-3xl text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-semibold">Non Fieldworker List</h2>
      </div>

      {/* Field Worker Count and Total Users Count Strip */}
      <div className="flex justify-between items-center space-x-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          <p>Enabled: {fieldWorkerCounts.trueCount}</p>
        </div>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          <p>Disabled: {fieldWorkerCounts.falseCount}</p>
        </div>
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          <p>Total Employees: {pagination.totalCount}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Employee ID, First Name or Last Name"
          className="px-4 py-2 border rounded-md w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* EMPLOYEE TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-sm">
              <th className="px-4 py-2">Sr No</th>
              <th className="px-4 py-2">Emp ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2 text-center">Is Field Worker</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{(pagination.page - 1) * pagination.limit + idx + 1}</td>
                <td className="px-4 py-2 text-center">
                  {u.user_Avatar ? (
                    <img
                      src={u.user_Avatar}
                      alt={u.first_Name}
                      className="w-12 h-12 object-cover rounded-full mx-auto"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center mx-auto bg-gray-200 dark:bg-gray-600 rounded-full">
                      <FaUserAlt className="text-gray-500 dark:text-gray-300 text-2xl" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{u.employee_Id}</td>
                <td className="px-4 py-2">{u.first_Name}</td>
                <td className="px-4 py-2">{u.last_Name}</td>
                <td className="px-4 py-2 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <span className="mr-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {u.isFieldWorker ? "Turn Off" : "Turn On"}
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={u.isFieldWorker}
                        onChange={() => toggleFieldWorkerStatus(u.employee_Id, u.isFieldWorker)}
                        className="hidden"
                      />
                      <div
                        className={`toggle-label w-12 h-6 rounded-full cursor-pointer transition-all duration-300 
                          ${u.isFieldWorker ? "bg-green-500" : "bg-red-500"}`}
                      >
                        <div
                          className={`toggle-circle w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 
                            ${u.isFieldWorker ? "translate-x-6" : "translate-x-0"}`}
                        ></div>
                      </div>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls in One Row with Full Width */}
      <div className="flex items-center justify-between mt-4 w-full">
        {/* Prev Button */}
        <button
          className="px-4 py-2 rounded-lg dark:bg-gray-700 bg-gray-300 dark:text-white text-black dark:hover:bg-gray-600 hover:bg-gray-400"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          Prev
        </button>

        {/* Page Info */}
        <span className="mx-2 text-sm">
          Page {pagination.page} of {pagination.totalPages}
        </span>

        {/* Go To Page Input */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={pagination.totalPages}
            value={goToPageValue}
            onChange={handleGoToPageChange}
            placeholder="Go to page"
            className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleGoToPage}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Go
          </button>
        </div>

        {/* Next Button */}
        <button
          className="px-4 py-2 rounded-lg dark:bg-gray-700 bg-gray-300 dark:text-white text-black dark:hover:bg-gray-600 hover:bg-gray-400"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
