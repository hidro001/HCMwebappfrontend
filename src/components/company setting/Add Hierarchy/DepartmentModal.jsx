// import React from "react";
// import { FaTimes } from "react-icons/fa";

// export default function DepartmentModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   departmentIdToEdit,
// }) {
//   if (!show) return null;

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50 
//                  bg-black/40 backdrop-blur-sm"
//     >
//       <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
//                      dark:text-gray-300 dark:hover:text-gray-100"
//         >
//           <FaTimes />
//         </button>

//         <h2 className="text-lg font-semibold mb-4">
//           {departmentIdToEdit ? "Edit Department" : "Add Department"}
//         </h2>

//         <form onSubmit={onSubmit}>
//           <label className="block mb-2 font-medium" htmlFor="departmentName">
//             Department Name
//           </label>
//           <input
//             id="departmentName"
//             type="text"
//             placeholder="Enter Department Name"
//             {...register("departmentName", { required: true })}
//             className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
//                        dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//           />

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="border border-orange-500 text-orange-500 px-4 py-2 rounded
//                          hover:bg-orange-50 dark:hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               {departmentIdToEdit ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { FaTimes } from "react-icons/fa";
import BaseModal from "../../common/BaseModal"; // Adjust path as needed

export default function DepartmentModal({
  show,
  onClose,
  onSubmit,
  register,
  departmentIdToEdit,
}) {
  // If not showing, return nothing
  if (!show) return null;

  return (
    // 1) Wrap content in <BaseModal>
    <BaseModal isOpen={show} onClose={onClose}>
      {/* 2) Keep your existing "white box" layout */}
      <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700
                     dark:text-gray-300 dark:hover:text-gray-100"
        >
          <FaTimes />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {departmentIdToEdit ? "Edit Department" : "Add Department"}
        </h2>

        <form onSubmit={onSubmit}>
          <label className="block mb-2 font-medium" htmlFor="departmentName">
            Department Name
          </label>
          <input
            id="departmentName"
            type="text"
            placeholder="Enter Department Name"
            {...register("departmentName", { required: true })}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-orange-500 text-orange-500 px-4 py-2
                         rounded hover:bg-orange-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {departmentIdToEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

