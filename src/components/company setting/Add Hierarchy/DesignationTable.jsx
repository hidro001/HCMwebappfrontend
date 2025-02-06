import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DesignationModal from "./model/DesignationModal";
import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DesignationTable({ isLoading }) {
  const {
    designations,
    loading,
    error,
    fetchDesignations,
    addDesignation,
    updateDesignation,
    deleteDesignation,
  } = useHierarchyStore();

  const [showModal, setShowModal] = useState(false);
  const [designationIdToEdit, setDesignationIdToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({
    open: false,
    id: null,
    name: "",
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      designationName: "",
    },
  });

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  function handleOpenModal() {
    setShowModal(true);
    setDesignationIdToEdit(null);
    reset({ designationName: "" });
  }

  function handleCloseModal() {
    setShowModal(false);
    setDesignationIdToEdit(null);
    reset({ designationName: "" });
  }

  function handleEdit(des) {
    setDesignationIdToEdit(des._id);
    reset({ designationName: des.designation });
    setShowModal(true);
  }

  function handleConfirmDelete(des) {
    setDeleteData({ open: true, id: des._id, name: des.designation });
  }

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

  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  const onSubmit = async (data) => {
    const { designationName } = data;
    setActionLoading(true);
    try {
      if (designationIdToEdit) {
        await updateDesignation(designationIdToEdit, designationName);
        toast.success("Designation updated successfully!");
      } else {
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
      <DesignationModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        designationIdToEdit={designationIdToEdit}
      />
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
