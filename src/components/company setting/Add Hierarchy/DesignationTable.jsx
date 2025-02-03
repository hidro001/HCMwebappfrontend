import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DesignationModal from "./model/DesignationModal"; // Separated modal component

import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DesignationTable({ isLoading }) {
  // Extract the relevant designations actions/state from the store
  const {
    designations,
    loading,
    error,
    fetchDesignations,
    addDesignation,
    updateDesignation,
    deleteDesignation,
  } = useHierarchyStore();

  // Local states for modal and deletion dialog
  const [showModal, setShowModal] = useState(false);
  const [designationIdToEdit, setDesignationIdToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [deleteData, setDeleteData] = useState({
    open: false,
    id: null,
    name: "",
  });

  // react-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      designationName: "",
    },
  });

  // Fetch designations on mount
  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  // Modal: Open for "Add" (clear form)
  function handleOpenModal() {
    setShowModal(true);
    setDesignationIdToEdit(null);
    reset({ designationName: "" });
  }

  // Modal: Close
  function handleCloseModal() {
    setShowModal(false);
    setDesignationIdToEdit(null);
    reset({ designationName: "" });
  }

  // Click "Edit" → pre-fill form and open modal
  function handleEdit(des) {
    setDesignationIdToEdit(des._id);
    reset({ designationName: des.designation });
    setShowModal(true);
  }

  // Click "Delete" → show confirmation
  function handleConfirmDelete(des) {
    setDeleteData({ open: true, id: des._id, name: des.designation });
  }

  // Confirmation dialog: user clicked Confirm
  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteDesignation(deleteData.id);
      toast.success("Designation deleted!");
    } catch (err) {
      toast.error(err?.message || "Failed to delete designation");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  // Confirmation dialog: user clicked Cancel
  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  // Add/Update Submit
  const onSubmit = async (data) => {
    const { designationName } = data;
    setActionLoading(true);
    try {
      if (designationIdToEdit) {
        // Edit existing designation
        await updateDesignation(designationIdToEdit, designationName);
        toast.success("Designation updated successfully!");
      } else {
        // Add new designation
        await addDesignation(designationName);
        toast.success("Designation added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Show FullScreenLoader during add/edit/delete operations */}
      {actionLoading && <FullScreenLoader />}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Designations</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Designation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Designation Name</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // While the initial API fetch is loading, show SkeletonRows
              <SkeletonRows count={5} columns={3} />
            ) : (
              designations.map((des, idx) => (
                <tr
                  key={des._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4">{des.designation}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      title="Edit"
                      onClick={() => handleEdit(des)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                      onClick={() => handleConfirmDelete(des)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Separated ADD/EDIT Modal */}
      <DesignationModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        designationIdToEdit={designationIdToEdit}
      />

      {/* Separated Confirmation Dialog for DELETE */}
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Designation"
        message={`Are you sure you want to delete "${deleteData.name}"?`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
