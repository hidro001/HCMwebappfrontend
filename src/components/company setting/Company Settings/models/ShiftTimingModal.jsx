// import React from "react";

// const ShiftTimingModal = ({
//   isOpen,
//   editId,
//   name,
//   start,
//   end,
//   onNameChange,
//   onStartChange,
//   onEndChange,
//   onClose,
//   onSave,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
//         <h2 className="text-xl font-semibold mb-4">
//           {editId ? "Edit Shift Timing" : "Add Shift Timing"}
//         </h2>
//         <div className="mb-3">
//           <label className="block mb-1">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={onNameChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block mb-1">Start</label>
//           <input
//             type="time"
//             value={start}
//             onChange={onStartChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">End</label>
//           <input
//             type="time"
//             value={end}
//             onChange={onEndChange}
//             className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//           >
//             {editId ? "Save" : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShiftTimingModal;


import React from "react";
import BaseModal from "../../../common/BaseModal"; // Adjust path as needed

const ShiftTimingModal = ({
  isOpen,
  editId,
  name,
  start,
  end,
  onNameChange,
  onStartChange,
  onEndChange,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    // 1) Wrap the content in BaseModal
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* 2) Keep your "white box" UI */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Shift Timing" : "Add Shift Timing"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Start</label>
          <input
            type="time"
            value={start}
            onChange={onStartChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End</label>
          <input
            type="time"
            value={end}
            onChange={onEndChange}
            className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {editId ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ShiftTimingModal;

