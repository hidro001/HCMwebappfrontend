// src/components/AllDisciplinaryActions.jsx
import React from "react";
import { Button } from "@mui/material";
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

  React.useEffect(() => {
    fetchAllDisciplinaryActions();
  }, [fetchAllDisciplinaryActions]);

  // Edit
  const handleEditClick = (action) => {
    setEditingAction(action);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingAction(null);
  };

  const handleUpdate = (data) => {
    // update the disciplinary action
    updateDisciplinaryAction(editingAction._id, data, () => {
      handleCloseModal();
    });
  };

  // Delete
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Disciplinary Actions</h1>
      {loading && <p className="text-gray-500">Loading...</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Action Type</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Notes</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {disciplinaryActions?.map((action) => {
              const user = action.userId || {};
              return (
                <tr key={action._id} className="border-b">
                  <td className="px-4 py-2">
                    {user.first_Name} {user.last_Name} ({user.employee_Id})
                  </td>
                  <td className="px-4 py-2">{action.actionType}</td>
                  <td className="px-4 py-2">
                    {new Date(action.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{action.notes}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
