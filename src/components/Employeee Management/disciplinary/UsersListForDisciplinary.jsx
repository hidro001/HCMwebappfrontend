import React from "react";
import { motion } from "framer-motion";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
import {
  FaSearch,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaExclamationCircle,
} from "react-icons/fa";

const tableContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

// Loading skeleton
function SkeletonTableRows({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr
          key={i}
          className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          {Array.from({ length: 5 }).map((__, cellIdx) => (
            <td key={cellIdx} className="py-4 px-6">
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

const UsersListForDisciplinary = () => {
  const { users, fetchAllUsers, createDisciplinaryAction, loading } =
    useDisciplinaryStore();

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [manualPage, setManualPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleOpenModal = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
  };

  const handleCreate = (data) => {
    data.userId = selectedUserId;
    createDisciplinaryAction(data, () => {
      handleCloseModal();
    });
  };

  const filteredUsers =
    users?.filter((user) => {
      const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
      const empId = user.employee_Id.toLowerCase();
      return (
        empId.includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase())
      );
    }) || [];

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const fromIndex = startIndex + 1;
  const toIndex = Math.min(startIndex + itemsPerPage, totalUsers);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setManualPage(newPage);
    }
  };

  const handleGoToPage = () => {
    const page = Number(manualPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <FaUser className="mr-3 text-indigo-500" />
          Disciplinary Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage disciplinary actions for all users
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-lg">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search by Employee ID or Name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        variants={tableContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white">
              <tr className="text-sm font-medium">
                <th className="py-4 px-6">Employee ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Designation</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonTableRows rows={itemsPerPage} />
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    variants={tableRowVariants}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
                  >
                    <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">
                      {user.employee_Id}
                    </td>
                    <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
                      {`${user.first_Name} ${user.last_Name}`}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                        {user.department}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      {user.designation}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleOpenModal(user._id)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-opacity shadow-sm"
                      >
                        Disciplinary Action
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <FaExclamationCircle className="text-4xl text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        No users found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your search criteria.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalUsers > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4 sm:mb-0">
              Showing {fromIndex} to {toIndex} of {totalUsers} users
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <input
                type="number"
                value={manualPage}
                onChange={(e) => setManualPage(e.target.value)}
                className="w-16 p-1.5 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="1"
                max={totalPages}
              />
              <button
                onClick={handleGoToPage}
                className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Go
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <DisciplinaryActionFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        isEdit={false}
        defaultValues={{
          actionType: "",
          date: "",
          notes: "",
        }}
      />
    </div>
  );
};

export default UsersListForDisciplinary;
