import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DepartmentModal from "./model/DepartmentModal"; 

import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DepartmentTable({ isLoading }) {
  // Zustand actions:
  const {
    departments,
    loading,
    error,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useHierarchyStore();

  // Local UI states:
  const [showModal, setShowModal] = useState(false);
  const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);

  // State to track user action loading for add/edit/delete operations
  const [actionLoading, setActionLoading] = useState(false);

  // Confirmation dialog for deletes
  const [deleteData, setDeleteData] = useState({
    open: false,
    id: null,
    name: "",
  });

  // Use react-hook-form (the form logic remains in the parent)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      departmentName: "",
    },
  });

  // Fetch on mount (initial API fetch uses the store's `loading` flag)
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Open modal (Add)
  function handleOpenModal() {
    setShowModal(true);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  // Close modal
  function handleCloseModal() {
    setShowModal(false);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  // Edit: pre-fill the modal
  function handleEdit(dept) {
    setDepartmentIdToEdit(dept._id);
    reset({ departmentName: dept.department });
    setShowModal(true);
  }

  // Confirm delete
  function handleConfirmDelete(dept) {
    setDeleteData({ open: true, id: dept._id, name: dept.department });
  }

  // On confirm delete – wrap in actionLoading so FullScreenLoader shows during deletion
  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteDepartment(deleteData.id);
      toast.success("Department deleted!");
    } catch (err) {
      toast.error("Failed to delete department");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  // On cancel delete
  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  // Submit add/update – show FullScreenLoader during the API call
  const onSubmit = async (data) => {
    const { departmentName } = data;
    setActionLoading(true);
    try {
      if (departmentIdToEdit) {
        // Update
        await updateDepartment(departmentIdToEdit, departmentName);
        toast.success("Department updated successfully!");
      } else {
        // Add
        await addDepartment(departmentName);
        toast.success("Department added successfully!");
      }
      handleCloseModal();
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {/* Show FullScreenLoader during add/edit/delete operations */}
      {actionLoading && <FullScreenLoader />}

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Department</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Department
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Department Name</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // While the initial API fetch is loading, show SkeletonRows
              <SkeletonRows count={5} columns={3} />
            ) : (
              departments.map((dept, idx) => (
                <tr
                  key={dept._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4">{dept.department}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      title="Edit"
                      onClick={() => handleEdit(dept)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                      onClick={() => handleConfirmDelete(dept)}
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
      <DepartmentModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        departmentIdToEdit={departmentIdToEdit}
      />

      {/* Separated Confirmation Dialog for DELETE */}
      <ConfirmationDialog
        open={deleteData.open}
        title="Delete Department"
        message={`Are you sure you want to delete "${deleteData.name}"?`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
