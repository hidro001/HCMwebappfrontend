// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import SkeletonRows from "./SkeletonRows";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import FullScreenLoader from "../../common/FullScreenLoader";
// import DepartmentModal from "./model/DepartmentModal";
// import { useHierarchyStore } from "../../../store/useHierarchyStore";

// export default function DepartmentTable() {
//   const {
//     departments,
//     loading,
//     error,
//     fetchDepartments,
//     addDepartment,
//     updateDepartment,
//     deleteDepartment,
//   } = useHierarchyStore();

//   const [showModal, setShowModal] = useState(false);
//   const [departmentIdToEdit, setDepartmentIdToEdit] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [deleteData, setDeleteData] = useState({ open: false, id: null, name: "" });

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: { departmentName: "" },
//   });

//   useEffect(() => {
//     fetchDepartments();
//   }, [fetchDepartments]);

//   function handleOpenModal() {
//     setShowModal(true);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleCloseModal() {
//     setShowModal(false);
//     setDepartmentIdToEdit(null);
//     reset({ departmentName: "" });
//   }

//   function handleEdit(dept) {
//     setDepartmentIdToEdit(dept._id);
//     reset({ departmentName: dept.department });
//     setShowModal(true);
//   }

//   function handleConfirmDelete(dept) {
//     setDeleteData({ open: true, id: dept._id, name: dept.department });
//   }

//   async function onDeleteConfirm() {
//     setActionLoading(true);
//     try {
//       await deleteDepartment(deleteData.id);
//       toast.success("Department deleted!");
//     } catch {
//       toast.error("Failed to delete department");
//     } finally {
//       setActionLoading(false);
//       setDeleteData({ open: false, id: null, name: "" });
//     }
//   }

//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   const onSubmit = async (data) => {
//     const { departmentName } = data;
//     setActionLoading(true);
//     try {
//       if (departmentIdToEdit) {
//         await updateDepartment(departmentIdToEdit, departmentName);
//         toast.success("Department updated successfully!");
//       } else {
//         await addDepartment(departmentName);
//         toast.success("Department added successfully!");
//       }
//       handleCloseModal();
//     } catch {
//       toast.error("Something went wrong!");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   return (
//     <div>
//       {actionLoading && <FullScreenLoader />}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Add Department</h2>
//         <button
//           onClick={handleOpenModal}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           + Add Department
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Department Name</th>
//               <th className="py-3 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <SkeletonRows count={5} columns={3} />
//             ) : (
//               departments.map((dept, idx) => (
//                 <tr key={dept._id} className="border-b border-gray-200 dark:border-gray-700">
//                   <td className="py-3 px-4">{String(idx + 1).padStart(2, "0")}</td>
//                   <td className="py-3 px-4">{dept.department}</td>
//                   <td className="py-3 px-4 flex space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       title="Edit"
//                       onClick={() => handleEdit(dept)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       title="Delete"
//                       onClick={() => handleConfirmDelete(dept)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <DepartmentModal
//         show={showModal}
//         onClose={handleCloseModal}
//         onSubmit={handleSubmit(onSubmit)}
//         register={register}
//         departmentIdToEdit={departmentIdToEdit}
//       />
//       <ConfirmationDialog
//         open={deleteData.open}
//         title="Delete Department"
//         message={`Are you sure you want to delete "${deleteData.name}"?`}
//         onConfirm={onDeleteConfirm}
//         onCancel={onDeleteCancel}
//         confirmText="Delete"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBuilding } from "react-icons/fa";
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
    <div className="p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {actionLoading && <FullScreenLoader />}
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FaBuilding className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Departments
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your organization departments
            </p>
          </div>
        </div>
        
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 animate-fade-in"
        >
          <FaPlus className="text-sm" />
          Add Department
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  S.L
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Department Name
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <SkeletonRows count={5} columns={3} />
              ) : (
                departments.map((dept, idx) => (
                  <tr 
                    key={dept._id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <FaBuilding className="text-blue-600 dark:text-blue-400 text-sm" />
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {dept.department}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Edit Department"
                          onClick={() => handleEdit(dept)}
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete Department"
                          onClick={() => handleConfirmDelete(dept)}
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4 animate-fade-in">
        {loading ? (
          // Mobile skeleton loading
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          departments.map((dept, idx) => (
            <div 
              key={dept._id} 
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <FaBuilding className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">
                      {dept.department}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Department #{String(idx + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-3">
                  <button
                    className="p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Edit Department"
                    onClick={() => handleEdit(dept)}
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                    title="Delete Department"
                    onClick={() => handleConfirmDelete(dept)}
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {!loading && departments.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FaBuilding className="text-3xl text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No departments found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started by creating your first department
          </p>
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <FaPlus className="text-sm" />
            Add First Department
          </button>
        </div>
      )}

      {/* Modals */}
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
        message={`Are you sure you want to delete "${deleteData.name}"? This action cannot be undone.`}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}