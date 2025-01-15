// // EditStatusModal.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function EditStatusModal({
//   isOpen,
//   onClose,
//   item,
//   onUpdateStatus,
// }) {
//   // Keep local state for the new status (default to item’s current status if available)
//   const [status, setStatus] = useState("Pending");

//   useEffect(() => {
//     if (item?.status) {
//       setStatus(item.status);
//     } else {
//       setStatus("Pending");
//     }
//   }, [item]);

//   if (!isOpen || !item) return null;

//   const handleSave = () => {
//     onUpdateStatus(item, status);
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center 
//                      bg-black/30 dark:bg-black/50 backdrop-blur-sm 
//                      overflow-y-auto px-4 py-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* Clickable backdrop to close */}
//           <div className="absolute inset-0" onClick={onClose} />

//           {/* Modal container */}
//           <motion.div
//             className="relative z-50 w-full max-w-md bg-white dark:bg-gray-800 
//                        rounded-md shadow-lg p-6 transition-colors"
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 50, opacity: 0 }}
//           >
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//               Update Issue Status
//             </h2>

//             <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
//               Are you sure you want to update the status of{" "}
//               <span className="font-semibold">
//                 {item.reporterName || "Unknown"}
//               </span>
//               ’s issue?
//             </p>

//             {/* Status selection (radio or dropdown) */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1 dark:text-gray-200">
//                 Select New Status
//               </label>
//               <select
//                 className="w-full border rounded px-3 py-2 text-sm
//                            bg-white dark:bg-gray-700
//                            text-gray-800 dark:text-gray-100 
//                            focus:outline-none"
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Under Review">Under Review</option>
//                 <option value="Resolved">Resolved</option>
//               </select>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center justify-end gap-3">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 rounded border 
//                            text-gray-600 dark:text-gray-200
//                            hover:bg-gray-100 dark:hover:bg-gray-700 
//                            transition-colors text-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 rounded 
//                            bg-blue-600 hover:bg-blue-700
//                            text-white text-sm transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePoshStore } from '../../../store/poshStore';

export default function EditStatusModal({ isOpen, onClose, item, onUpdateStatus }) {
  const [status, setStatus] = useState('Pending');
  const { updatePoshActStatus } = usePoshStore();

  useEffect(() => {
    if (item?.status) {
      setStatus(item.status);
    } else {
      setStatus('Pending');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSave = async () => {
    await updatePoshActStatus(item.id, status);
    // Optionally call the parent callback
    if (onUpdateStatus) {
      onUpdateStatus(item, status);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center 
                     bg-black/30 dark:bg-black/50 backdrop-blur-sm 
                     overflow-y-auto px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Clickable backdrop to close */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal container */}
          <motion.div
            className="relative z-50 w-full max-w-md bg-white dark:bg-gray-800 
                       rounded-md shadow-lg p-6 transition-colors"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Update Issue Status
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to update the status of{' '}
              <span className="font-semibold">
                {item.reporterName || 'Unknown'}
              </span>
              ’s issue?
            </p>

            {/* Status selection (radio or dropdown) */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                Select New Status
              </label>
              <select
                className="w-full border rounded px-3 py-2 text-sm
                           bg-white dark:bg-gray-700
                           text-gray-800 dark:text-gray-100 
                           focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded border 
                           text-gray-600 dark:text-gray-200
                           hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded 
                           bg-blue-600 hover:bg-blue-700
                           text-white text-sm transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
