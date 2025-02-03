
// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";

// import SkeletonRows from "./SkeletonRows";
// import ConfirmationDialog from "../../common/ConfirmationDialog";
// import FullScreenLoader from "../../common/FullScreenLoader";

// import { useHierarchyStore } from "../../../store/useHierarchyStore";

// export default function DesignationTable({ isLoading }) {
//   // Extract the relevant designations actions/state from the store
//   const {
//     designations,
//     loading,
//     error,
//     fetchDesignations,
//     addDesignation,
//     updateDesignation,
//     deleteDesignation,
//   } = useHierarchyStore();

//   // Local states for modal and deletion dialog
//   const [showModal, setShowModal] = useState(false);
//   const [designationIdToEdit, setDesignationIdToEdit] = useState(null);

//   const [deleteData, setDeleteData] = useState({
//     open: false,
//     id: null,
//     name: "",
//   });

//   // react-hook-form
//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       designationName: "",
//     },
//   });

//   // Fetch designations on mount
//   useEffect(() => {
//     fetchDesignations();
//   }, [fetchDesignations]);

//   // Modal: Open for "Add" (clear form)
//   function handleOpenModal() {
//     setShowModal(true);
//     setDesignationIdToEdit(null);
//     reset({ designationName: "" });
//   }

//   // Modal: Close
//   function handleCloseModal() {
//     setShowModal(false);
//     setDesignationIdToEdit(null);
//     reset({ designationName: "" });
//   }

//   // Click "Edit" → pre-fill form and open
//   function handleEdit(des) {
//     setDesignationIdToEdit(des._id);
//     reset({ designationName: des.designation });
//     setShowModal(true);
//   }

//   // Click "Delete" → show confirmation
//   function handleConfirmDelete(des) {
//     setDeleteData({ open: true, id: des._id, name: des.designation });
//   }

//   // Confirmation dialog: user clicked Confirm
//   async function onDeleteConfirm() {
//     try {
//       await deleteDesignation(deleteData.id);
//       toast.success("Designation deleted!");
//     } catch (err) {
//       toast.error(err?.message || "Failed to delete designation");
//     }
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   // Confirmation dialog: user clicked Cancel
//   function onDeleteCancel() {
//     setDeleteData({ open: false, id: null, name: "" });
//   }

//   // Add/Update Submit
//   const onSubmit = async (data) => {
//     const { designationName } = data;
//     try {
//       if (designationIdToEdit) {
//         // Edit existing
//         await updateDesignation(designationIdToEdit, designationName);
//         toast.success("Designation updated successfully!");
//       } else {
//         // Add new
//         await addDesignation(designationName);
//         toast.success("Designation added successfully!");
//       }
//       handleCloseModal();
//     } catch (err) {
//       // Now we catch the error thrown by the store if server returned success: false
//       toast.error(err?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div>
//       {/* Show loader if needed */}
//       {loading && <FullScreenLoader />}

//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Add Designations</h2>
//         <button
//           onClick={handleOpenModal}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//         >
//           + Add Designation
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="py-3 px-4">S.L</th>
//               <th className="py-3 px-4">Designation Name</th>
//               <th className="py-3 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <SkeletonRows count={5} columns={3} />
//             ) : (
//               designations.map((des, idx) => (
//                 <tr
//                   key={des._id} // Use _id
//                   className="border-b border-gray-200 dark:border-gray-700"
//                 >
//                   <td className="py-3 px-4">
//                     {String(idx + 1).padStart(2, "0")}
//                   </td>
//                   <td className="py-3 px-4">{des.designation}</td>
//                   <td className="py-3 px-4 flex space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-600"
//                       title="Edit"
//                       onClick={() => handleEdit(des)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-600"
//                       title="Delete"
//                       onClick={() => handleConfirmDelete(des)}
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

//       {/* Add/Edit MODAL */}
//       {showModal && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/40 backdrop-blur-sm"
//         >
//           <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//             {/* Close button */}
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700
//                          dark:text-gray-300 dark:hover:text-gray-100"
//               onClick={handleCloseModal}
//             >
//               <FaTimes />
//             </button>

//             {/* Title */}
//             <h2 className="text-lg font-semibold mb-4">
//               {designationIdToEdit ? "Edit Designation" : "Add Designation"}
//             </h2>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <label
//                 htmlFor="designationName"
//                 className="block mb-2 font-medium"
//               >
//                 Designation Name
//               </label>
//               <input
//                 id="designationName"
//                 type="text"
//                 placeholder="Enter Designation Name"
//                 {...register("designationName", { required: true })}
//                 className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
//                            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//               />

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   className="border border-orange-500 text-orange-500 px-4 py-2 rounded
//                              hover:bg-orange-50 dark:hover:bg-gray-700"
//                   onClick={handleCloseModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   {designationIdToEdit ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* CONFIRMATION DIALOG */}
//       <ConfirmationDialog
//         open={deleteData.open}
//         title="Delete Designation"
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
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import SkeletonRows from "./SkeletonRows";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import FullScreenLoader from "../../common/FullScreenLoader";
import DesignationModal from "./DesignationModal"; // Separated modal component

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

