import React, { useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

function AttendanceModal({
  isOpen,
  onRequestClose,
  attendanceDetailsLoading,
  loggedInUsers,
  notLoggedInUsers,
}) {
  // Local search states for each table
  const [searchLoggedIn, setSearchLoggedIn] = useState("");
  const [searchNotLoggedIn, setSearchNotLoggedIn] = useState("");

  // Filter logic for "Logged In"
  const filteredLoggedIn = loggedInUsers.filter((user) => {
    const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
    return fullName.includes(searchLoggedIn.toLowerCase());
  });

  // Filter logic for "Not Logged In"
  const filteredNotLoggedIn = notLoggedInUsers.filter((user) => {
    const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
    return fullName.includes(searchNotLoggedIn.toLowerCase());
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Attendance Details"
      ariaHideApp={false}
      /*
        We use a flex container with a bounded height so the modal won't
        shrink or grow when search results change. The header won't scroll,
        but the content area below will.
      */
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                 w-11/12 max-w-[900px]
                 min-h-[60vh] max-h-[80vh]
                 rounded-lg shadow-lg focus:outline-none
                 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
                 transition-all duration-300 ease-in-out
                 flex flex-col"
      overlayClassName="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out"
    >
      {/* Header: fixed area (doesn't scroll) */}
      <div className="flex-shrink-0 p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">User Attendance Details</h2>
          <button
            onClick={onRequestClose}
            className="ml-4 text-sm px-3 py-1 rounded-lg 
                       bg-gray-200 hover:bg-gray-300 text-gray-800
                       dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100
                       transition-colors duration-200 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main Scrollable Content (fills remaining space) */}
      <div className="flex-1 overflow-auto p-5">
        {attendanceDetailsLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading attendance details...
          </p>
        )}

        {!attendanceDetailsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LOGGED IN SECTION */}
            <div className="flex flex-col bg-white dark:bg-gray-800
                            shadow-sm rounded-lg border border-green-200
                            dark:border-green-700 transition-colors">
              {/* Header row for the card */}
              <div className="flex items-center p-4 border-b border-green-200 dark:border-green-700">
                <FaCheckCircle className="text-green-600 dark:text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Logged In ({filteredLoggedIn.length})
                </h3>
              </div>

              {/* Search Input */}
              <div className="px-4 pt-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700
                                rounded-md px-2 py-1">
                  <FaSearch className="text-gray-400 dark:text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchLoggedIn}
                    onChange={(e) => setSearchLoggedIn(e.target.value)}
                    className="w-full bg-transparent focus:outline-none
                               text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>

              {/* Scrollable table area (vertical) */}
              <div className="overflow-y-auto max-h-[300px] p-4">
                {filteredLoggedIn.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    {searchLoggedIn
                      ? "No matching results."
                      : "No one has logged in yet."}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                      <thead>
                        <tr className="bg-green-50 dark:bg-green-700/40">
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Role
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Department
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLoggedIn.map((user, index) => (
                          <tr
                            key={user._id}
                            className={`${
                              index % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-700/20"
                                : "bg-white dark:bg-gray-800"
                            } hover:bg-green-50 dark:hover:bg-green-700/30 transition-colors`}
                          >
                            <td className="px-4 py-2">
                              {user.first_Name} {user.last_Name}
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
                                               bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50">
                                Employee
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
                                               bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                Sales
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* NOT LOGGED IN SECTION */}
            <div className="flex flex-col bg-white dark:bg-gray-800
                            shadow-sm rounded-lg border border-red-200
                            dark:border-red-700 transition-colors">
              {/* Header row for the card */}
              <div className="flex items-center p-4 border-b border-red-200 dark:border-red-700">
                <FaTimesCircle className="text-red-600 dark:text-red-400 mr-2" />
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Not Logged In ({filteredNotLoggedIn.length})
                </h3>
              </div>

              {/* Search Input */}
              <div className="px-4 pt-4">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700
                                rounded-md px-2 py-1">
                  <FaSearch className="text-gray-400 dark:text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchNotLoggedIn}
                    onChange={(e) => setSearchNotLoggedIn(e.target.value)}
                    className="w-full bg-transparent focus:outline-none
                               text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>

              {/* Scrollable table area (vertical) */}
              <div className="overflow-y-auto max-h-[300px] p-4">
                {filteredNotLoggedIn.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    {searchNotLoggedIn
                      ? "No matching results."
                      : "Everyone has logged in!"}
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-sm">
                      <thead>
                        <tr className="bg-red-50 dark:bg-red-700/40">
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Role
                          </th>
                          <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">
                            Department
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNotLoggedIn.map((user, index) => (
                          <tr
                            key={user._id}
                            className={`${
                              index % 2 === 0
                                ? "bg-gray-50 dark:bg-gray-700/20"
                                : "bg-white dark:bg-gray-800"
                            } hover:bg-red-50 dark:hover:bg-red-700/30 transition-colors`}
                          >
                            <td className="px-4 py-2">
                              {user.first_Name} {user.last_Name}
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
                                               bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50">
                                Employee
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-block rounded-full px-2 py-1 text-xs font-medium
                                               bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                Sales
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AttendanceModal;
