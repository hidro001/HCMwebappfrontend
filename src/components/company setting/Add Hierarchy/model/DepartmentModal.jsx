// import React from "react";
// import { FaTimes } from "react-icons/fa";
// import BaseModal from "../../../common/BaseModal";

// export default function DepartmentModal({
//   show,
//   onClose,
//   onSubmit,
//   register,
//   departmentIdToEdit,
// }) {
//   if (!show) return null;

//   return (
//     <BaseModal isOpen={show} onClose={onClose}>
//       <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
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
//             className="w-full mb-4 px-3 py-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
//           />
//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 dark:hover:bg-gray-700"
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
//     </BaseModal>
//   );
// }



import React from "react";
import { FaTimes, FaBuilding, FaPlus, FaEdit } from "react-icons/fa";
import BaseModal from "../../../common/BaseModal";

export default function DepartmentModal({
  show,
  onClose,
  onSubmit,
  register,
  departmentIdToEdit,
}) {
  if (!show) return null;

  const isEdit = departmentIdToEdit;

  return (
    <BaseModal isOpen={show} onClose={onClose}>
      <div className="relative w-full max-w-md mx-4 sm:mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="relative bg-gray-50 dark:bg-gray-900 px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${isEdit ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
              {isEdit ? (
                <FaEdit className="text-2xl text-orange-600 dark:text-orange-400" />
              ) : (
                <FaPlus className="text-2xl text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {isEdit ? "Edit Department" : "Add Department"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isEdit ? "Update department information" : "Create a new department"}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div onSubmit={onSubmit} className="space-y-6">
            {/* Department Name Input */}
            <div className="space-y-2">
              <label 
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300" 
                htmlFor="departmentName"
              >
                <FaBuilding className="text-blue-500 dark:text-blue-400" />
                Department Name
              </label>
              <div className="relative">
                <input
                  id="departmentName"
                  type="text"
                  placeholder="Enter department name..."
                  {...register("departmentName", { required: true })}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full opacity-50"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                This field is required
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmit}
                className={`flex-1 px-6 py-3 font-medium rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                  isEdit
                    ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
                }`}
              >
                {isEdit ? "Update Department" : "Add Department"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </BaseModal>
  );
}