import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DepartmentModal from "./model/DepartmentModal";
import { useHierarchyStore } from "../../../store/useHierarchyStore";

export default function DepartmentTable() {
  const {
    departments,
    loading,
    error,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useHierarchyStore();

  const [showModal, setShowModal] = useState(false);
  const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { departmentName: "" },
  });

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  function handleOpenModal() {
    setShowModal(true);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  function handleCloseModal() {
    setShowModal(false);
    setDepartmentIdToEdit(null);
    reset({ departmentName: "" });
  }

  function handleEdit(dept) {
    setDepartmentIdToEdit(dept._id);
    reset({ departmentName: dept.department });
    setShowModal(true);
  }

  function handleConfirmDelete(dept) {
    setDeleteData({ open: true, id: dept._id, name: dept.department });
  }

  async function onDeleteConfirm() {
    setActionLoading(true);
    try {
      await deleteDepartment(deleteData.id);
      toast.success("Department deleted!");
    } catch {
      toast.error("Failed to delete department");
    } finally {
      setActionLoading(false);
      setDeleteData({ open: false, id: null, name: "" });
    }
  }

  function onDeleteCancel() {
    setDeleteData({ open: false, id: null, name: "" });
  }

  const onSubmit = async (data) => {
    const { departmentName } = data;
    setActionLoading(true);
    try {
      if (departmentIdToEdit) {
        await updateDepartment(departmentIdToEdit, departmentName);
        toast.success("Department updated successfully!");
      } else {
        await addDepartment(departmentName);
        toast.success("Department added successfully!");
      }
      handleCloseModal();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      {actionLoading && <FullScreenLoader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Department</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Department
        </button>
      </div>
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
              <SkeletonRows count={5} columns={3} />
            ) : (
              departments.map((dept, idx) => (
                <tr key={dept._id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4">{String(idx + 1).padStart(2, "0")}</td>
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
      <DepartmentModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        departmentIdToEdit={departmentIdToEdit}
      />
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
