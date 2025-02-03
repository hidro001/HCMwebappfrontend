// import React from "react";

// const LeaveSystemModal = ({
//   isOpen,
//   editId,
//   sysName,
//   workingDays,
//   monthlyLeaves,
//   onSysNameChange,
//   onWorkingDaysChange,
//   onMonthlyLeavesChange,
//   onClose,
//   onSave,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
//         <h3 className="text-xl font-bold mb-4">
//           {editId ? "Edit Leave System" : "Add Leave System"}
//         </h3>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Name</label>
//           <input
//             type="text"
//             value={sysName}
//             onChange={onSysNameChange}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Working Days</label>
//           <input
//             type="text"
//             value={workingDays}
//             onChange={onWorkingDaysChange}
//             placeholder="e.g. Mon-Fri"
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
//           <input
//             type="number"
//             step="0.5"
//             value={monthlyLeaves}
//             onChange={onMonthlyLeavesChange}
//             className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             {editId ? "Save" : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveSystemModal;


import React from "react";
import BaseModal from "../../../common/BaseModal"; // Adjust path as needed

const LeaveSystemModal = ({
  isOpen,
  editId,
  sysName,
  workingDays,
  monthlyLeaves,
  onSysNameChange,
  onWorkingDaysChange,
  onMonthlyLeavesChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    // 1) Use <BaseModal> for the overlay & portal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 2) Keep your "white box" UI */}
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
        <h3 className="text-xl font-bold mb-4">
          {editId ? "Edit Leave System" : "Add Leave System"}
        </h3>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={sysName}
            onChange={onSysNameChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        {/* Working Days */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Working Days</label>
          <input
            type="text"
            value={workingDays}
            onChange={onWorkingDaysChange}
            placeholder="e.g. Mon-Fri"
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        {/* Monthly Paid Leaves */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
          <input
            type="number"
            step="0.5"
            value={monthlyLeaves}
            onChange={onMonthlyLeavesChange}
            className="w-full p-2 border dark:border-gray-700 rounded dark:bg-gray-800"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LeaveSystemModal;
