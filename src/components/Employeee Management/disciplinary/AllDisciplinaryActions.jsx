import React from "react";
import { motion } from "framer-motion";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { FaSearch, FaExclamationCircle, FaEdit, FaTrash } from "react-icons/fa";

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

const AllDisciplinaryActions = () => {
  const {
    disciplinaryActions,
    fetchAllDisciplinaryActions,
    updateDisciplinaryAction,
    deleteDisciplinaryAction,
    loading,
  } = useDisciplinaryStore();

  const [openModal, setOpenModal] = React.useState(false);
  const [editingAction, setEditingAction] = React.useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [actionToDelete, setActionToDelete] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [manualPage, setManualPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetchAllDisciplinaryActions();
  }, [fetchAllDisciplinaryActions]);

  const handleEditClick = (action) => {
    setEditingAction(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAction(null);
  };

  const handleUpdate = (data) => {
    updateDisciplinaryAction(editingAction._id, data, () => {
      handleCloseModal();
    });
  };

  const handleDeleteClick = (action) => {
    setActionToDelete(action);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (actionToDelete) {
      deleteDisciplinaryAction(actionToDelete._id);
    }
    setOpenDeleteDialog(false);
    setActionToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setActionToDelete(null);
  };

  const filteredActions =
    disciplinaryActions?.filter((action) => {
      const user = action.userId || {};
      const fullName = `${user.first_Name} ${user.last_Name}`.toLowerCase();
      const empId = user.employee_Id?.toLowerCase() || "";
      const actionType = action.actionType.toLowerCase();
      const notes = action.notes.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        fullName.includes(query) ||
        empId.includes(query) ||
        actionType.includes(query) ||
        notes.includes(query)
      );
    }) || [];

  const totalActions = filteredActions.length;
  const totalPages = Math.ceil(totalActions / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActions = filteredActions.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const fromIndex = startIndex + 1;
  const toIndex = Math.min(startIndex + itemsPerPage, totalActions);

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

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
          <FaExclamationCircle className="mr-3 text-indigo-500" />
          All Disciplinary Actions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage and review disciplinary actions across the organization
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
            placeholder="Search by user, action type, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-3 py-2.5 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Disciplinary Actions Table */}
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
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Action Type</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Notes</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonTableRows rows={itemsPerPage} />
              ) : currentActions.length > 0 ? (
                currentActions.map((action) => {
                  const user = action.userId || {};
                  return (
                    <motion.tr
                      key={action._id}
                      variants={tableRowVariants}
                      className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">
                        {`${user.first_Name} ${user.last_Name} (${user.employee_Id})`}
                      </td>
                      <td className="py-4 px-6 text-gray-800 dark:text-gray-200">
                        {action.actionType}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                        {new Date(action.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                        {action.notes}
                      </td>
                      <td className="py-4 px-6 flex space-x-2">
                        <button
                          onClick={() => handleEditClick(action)}
                          className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(action)}
                          className="flex items-center bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <FaExclamationCircle className="text-4xl text-gray-400 dark:text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        No disciplinary actions found
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
        {!loading && totalActions > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-4 sm:mb-0">
              Showing {fromIndex} to {toIndex} of {totalActions} actions
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

      {/* Edit Modal */}
      <DisciplinaryActionFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleUpdate}
        isEdit={true}
        defaultValues={
          editingAction
            ? {
                actionType: editingAction.actionType,
                date: editingAction.date?.split("T")[0],
                notes: editingAction.notes,
                userId: editingAction.userId?._id,
              }
            : {}
        }
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={openDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this disciplinary action?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default AllDisciplinaryActions;
