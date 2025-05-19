import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";

const UsersListForDisciplinary = () => {
  const {
    users,
    fetchAllUsers,
    createDisciplinaryAction,
    loading,
  } = useDisciplinaryStore();

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

  // Create disciplinary action
  const handleCreate = (data) => {
    data.userId = selectedUserId;
    createDisciplinaryAction(data, () => {
      handleCloseModal();
    });
  };

  // Filter users by employee id or name (first + last)
  const filteredUsers =
    users?.filter((user) => {
      const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
      const empId = user.employee_Id.toLowerCase();
      return (
        empId.includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase())
      );
    }) || [];

  // Pagination logic
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-bold mb-4 dark:text-white">All Users</h1>

      {loading && (
        <motion.div
          className="flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        </motion.div>
      )}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID or Name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset page when searching
          }}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left dark:text-gray-200">Employee ID</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Name</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Department</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Designation</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <motion.tbody>
            {currentUsers.map((user) => (
              <motion.tr
                key={user._id}
                className="border-b dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-2 dark:text-gray-100">{user.employee_Id}</td>
                <td className="px-4 py-2 dark:text-gray-100">
                  {user.first_Name} {user.last_Name}
                </td>
                <td className="px-4 py-2 dark:text-gray-100">{user.department}</td>
                <td className="px-4 py-2 dark:text-gray-100">{user.designation}</td>
                <td className="px-4 py-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(user._id)}
                  >
                    Disciplinary Action
                  </Button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </motion.table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Prev
        </button>
        <div className="flex items-center space-x-2">
          <span>Page</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={manualPage}
            onChange={(e) => setManualPage(e.target.value)}
            className="w-16 p-1 border rounded text-center dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <span>of {totalPages}</span>
          <button
            onClick={handleGoToPage}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded dark:bg-green-700 dark:hover:bg-green-800"
          >
            Go
          </button>
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Next
        </button>
      </div>

      {/* Modal for Creating Disciplinary Action */}
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
