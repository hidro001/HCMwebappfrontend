
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import useVacancyStore from '../../store/useVacancyStore';

// export default function UpdateVacancyModal({ vacancy, onClose }) {
//   const { updateVacancy } = useVacancyStore();
//   const [status, setStatus] = useState(vacancy.vacancyStatus || 'Draft');
//   const [salary, setSalary] = useState(vacancy.salary || 0);

//   const handleSave = async () => {
//     try {
//       // We'll pass just the fields we want to update
//       // e.g., vacancyStatus, salary
//       const payload = {
//         vacancyStatus: status,
//         salary,
//       };

//       await updateVacancy(vacancy._id, payload);

//       alert('Vacancy updated successfully!');
//       onClose();
//     } catch (err) {
//       console.error('Error updating vacancy:', err);
//       alert('Failed to update vacancy. Check console.');
//     }
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Modal Card */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//       >
//         {/* Close button */}
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
//           onClick={onClose}
//         >
//           &times;
//         </button>

//         <h2 className="text-lg font-semibold mb-4">
//           Update Vacancy: {vacancy.jobTitle}
//         </h2>

//         <div className="space-y-2 text-sm mb-4">
//           <div>
//             <strong>Job Title:</strong> {vacancy.jobTitle}
//           </div>
//           <div>
//             <strong>Department:</strong> {vacancy.jobDepartment}
//           </div>
//           <div>
//             <strong>Current Status:</strong> {vacancy.vacancyStatus}
//           </div>
//           <div>
//             <strong>Current Salary:</strong> {vacancy.salary} ({vacancy.currency})
//           </div>
//         </div>

//         {/* Status & Salary fields */}
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Status</label>
//           <select
//             className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Draft">Draft</option>
//             <option value="Open">Open</option>
//             <option value="Closed">Closed</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm mb-1">Salary</label>
//           <input
//             type="number"
//             className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
//             placeholder="e.g. 400000"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//           />
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }


import React, { useState } from "react";
import { motion } from "framer-motion";
import useVacancyStore from "../../store/useVacancyStore";

// 1) Import your BaseModal
import BaseModal from "../common/BaseModal"; // adjust the path as needed

export default function UpdateVacancyModal({ vacancy, onClose }) {
  const { updateVacancy } = useVacancyStore();

  const [status, setStatus] = useState(vacancy.vacancyStatus || "Draft");
  const [salary, setSalary] = useState(vacancy.salary || 0);

  const handleSave = async () => {
    try {
      const payload = {
        vacancyStatus: status,
        salary,
      };
      await updateVacancy(vacancy._id, payload);
      alert("Vacancy updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating vacancy:", err);
      alert("Failed to update vacancy. Check console.");
    }
  };

  // If there's no vacancy data, don't render anything
  if (!vacancy) return null;

  return (
    // 2) Wrap your inner content in BaseModal
    <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
      {/* 3) Keep the motion.div for your dialog animation */}
      <motion.div
        className="bg-white dark:bg-gray-800 dark:text-gray-100
                   rounded-lg shadow-lg w-full max-w-md p-4 relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 
                     dark:text-gray-300 dark:hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Update Vacancy: {vacancy.jobTitle}
        </h2>

        <div className="space-y-2 text-sm mb-4">
          <div>
            <strong>Job Title:</strong> {vacancy.jobTitle}
          </div>
          <div>
            <strong>Department:</strong> {vacancy.jobDepartment}
          </div>
          <div>
            <strong>Current Status:</strong> {vacancy.vacancyStatus}
          </div>
          <div>
            <strong>Current Salary:</strong> {vacancy.salary} ({vacancy.currency})
          </div>
        </div>

        {/* Status & Salary fields */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm
                       bg-white dark:bg-gray-700 dark:text-gray-100"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Salary</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm
                       bg-white dark:bg-gray-700 dark:text-gray-100"
            placeholder="e.g. 400000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-500
                       rounded text-sm text-gray-600 dark:text-gray-200
                       hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm
                       rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}
