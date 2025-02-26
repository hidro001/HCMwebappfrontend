// // src/components/AllDisciplinaryActions.jsx
// import React from "react";
// import { Button } from "@mui/material";
// import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
// import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
// import ConfirmationDialog from "../../common/ConfirmationDialog"; 

// const AllDisciplinaryActions = () => {
//   const {
//     disciplinaryActions,
//     fetchAllDisciplinaryActions,
//     updateDisciplinaryAction,
//     deleteDisciplinaryAction,
//     loading,
//   } = useDisciplinaryStore();

//   // State for edit modal
//   const [openModal, setOpenModal] = React.useState(false);
//   const [editingAction, setEditingAction] = React.useState(null);

//   // State for delete confirmation
//   const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
//   const [actionToDelete, setActionToDelete] = React.useState(null);

//   React.useEffect(() => {
//     fetchAllDisciplinaryActions();
//   }, [fetchAllDisciplinaryActions]);

//   // Edit
//   const handleEditClick = (action) => {
//     setEditingAction(action);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setEditingAction(null);
//   };

//   const handleUpdate = (data) => {
//     // update the disciplinary action
//     updateDisciplinaryAction(editingAction._id, data, () => {
//       handleCloseModal();
//     });
//   };

//   // Delete
//   const handleDeleteClick = (action) => {
//     setActionToDelete(action);
//     setOpenDeleteDialog(true);
//   };

//   const handleDeleteConfirm = () => {
//     if (actionToDelete) {
//       deleteDisciplinaryAction(actionToDelete._id);
//     }
//     setOpenDeleteDialog(false);
//     setActionToDelete(null);
//   };

//   const handleDeleteCancel = () => {
//     setOpenDeleteDialog(false);
//     setActionToDelete(null);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">All Disciplinary Actions</h1>
//       {loading && <p className="text-gray-500">Loading...</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">User</th>
//               <th className="px-4 py-2 text-left">Action Type</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Notes</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {disciplinaryActions?.map((action) => {
//               const user = action.userId || {};
//               return (
//                 <tr key={action._id} className="border-b">
//                   <td className="px-4 py-2">
//                     {user.first_Name} {user.last_Name} ({user.employee_Id})
//                   </td>
//                   <td className="px-4 py-2">{action.actionType}</td>
//                   <td className="px-4 py-2">
//                     {new Date(action.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2">{action.notes}</td>
//                   <td className="px-4 py-2 flex gap-2">
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleEditClick(action)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={() => handleDeleteClick(action)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       <DisciplinaryActionFormModal
//         open={openModal}
//         onClose={handleCloseModal}
//         onSubmit={handleUpdate}
//         isEdit={true}
//         defaultValues={
//           editingAction
//             ? {
//                 actionType: editingAction.actionType,
//                 date: editingAction.date?.split("T")[0],
//                 notes: editingAction.notes,
//                 userId: editingAction.userId?._id,
//               }
//             : {}
//         }
//       />

//       {/* Delete Confirmation Dialog */}
//       <ConfirmationDialog
//         open={openDeleteDialog}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this disciplinary action?"
//         onConfirm={handleDeleteConfirm}
//         onCancel={handleDeleteCancel}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// };

// export default AllDisciplinaryActions;

import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import useDisciplinaryStore from "../../../store/useDisciplinaryStore";
import DisciplinaryActionFormModal from "./model/DisciplinaryActionFormModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";

const AllDisciplinaryActions = () => {
  const {
    disciplinaryActions,
    fetchAllDisciplinaryActions,
    updateDisciplinaryAction,
    deleteDisciplinaryAction,
    loading,
  } = useDisciplinaryStore();

  // State for edit modal
  const [openModal, setOpenModal] = React.useState(false);
  const [editingAction, setEditingAction] = React.useState(null);

  // State for delete confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [actionToDelete, setActionToDelete] = React.useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [manualPage, setManualPage] = React.useState(1);
  const itemsPerPage = 10;

  React.useEffect(() => {
    fetchAllDisciplinaryActions();
  }, [fetchAllDisciplinaryActions]);

  // Edit Handlers
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

  // Delete Handlers
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

  // Filter disciplinary actions based on search query
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

  // Pagination logic
  const totalActions = filteredActions.length;
  const totalPages = Math.ceil(totalActions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActions = filteredActions.slice(startIndex, startIndex + itemsPerPage);

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

  // Reset page when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <motion.h1
        className="text-xl font-bold mb-4 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Disciplinary Actions
      </motion.h1>

      {loading && (
        <motion.div
          className="p-4 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        </motion.div>
      )}

      {/* Search Input */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="Search by user, action type or notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left dark:text-gray-200">User</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Action Type</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Date</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Notes</th>
              <th className="px-4 py-2 text-left dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <motion.tbody>
            {currentActions.map((action) => {
              const user = action.userId || {};
              return (
                <motion.tr
                  key={action._id}
                  className="border-b dark:border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 dark:text-gray-100">
                    {user.first_Name} {user.last_Name} ({user.employee_Id})
                  </td>
                  <td className="px-4 py-2 dark:text-gray-100">{action.actionType}</td>
                  <td className="px-4 py-2 dark:text-gray-100">
                    {new Date(action.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 dark:text-gray-100">{action.notes}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(action)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteClick(action)}
                    >
                      Delete
                    </Button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </motion.table>
      </div>

      {/* Pagination Controls */}
      <motion.div
        className="flex items-center justify-between mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
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
