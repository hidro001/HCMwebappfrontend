// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import useVacancyStore from "../../../store/useVacancyStore";
// import BaseModal from "../../common/BaseModal";

// export default function UpdateVacancyModal({ vacancy, onClose }) {
//   const { updateVacancy } = useVacancyStore();
//   const [status, setStatus] = useState(vacancy.vacancyStatus || "Draft");
//   const [salary, setSalary] = useState(vacancy.salary || 0);

//   const handleSave = async () => {
//     try {
//       const payload = {
//         vacancyStatus: status,
//         salary,
//       };
//       await updateVacancy(vacancy._id, payload);
//       alert("Vacancy updated successfully!");
//       onClose();
//     } catch (err) {
//       console.error("Error updating vacancy:", err);
//       alert("Failed to update vacancy. Check console.");
//     }
//   };

//   if (!vacancy) return null;

//   return (
//     <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
//       <motion.div
//         className="bg-white dark:bg-gray-800 dark:text-gray-100
//                    rounded-lg shadow-lg w-full max-w-md p-4 relative"
//         initial={{ scale: 0.95 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.95 }}
//       >
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 
//                      dark:text-gray-300 dark:hover:text-gray-200"
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
//         <div className="mb-4">
//           <label className="block text-sm mb-1">Status</label>
//           <select
//             className="w-full border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700 dark:text-gray-100"
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
//             className="w-full border rounded px-2 py-1 text-sm
//                        bg-white dark:bg-gray-700 dark:text-gray-100"
//             placeholder="e.g. 400000"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end gap-2">
//           <button
//             className="px-4 py-2 border border-gray-300 dark:border-gray-500
//                        rounded text-sm text-gray-600 dark:text-gray-200
//                        hover:bg-gray-100 dark:hover:bg-gray-700"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 text-white text-sm
//                        rounded hover:bg-blue-600"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>
//       </motion.div>
//     </BaseModal>
//   );
// }

import React, { useState } from "react";
import { motion } from "framer-motion";
import useVacancyStore from "../../../store/useVacancyStore";
import BaseModal from "../../common/BaseModal";

export default function UpdateVacancyModal({ vacancy, onClose }) {
  const { updateVacancy } = useVacancyStore();

  // Set up state variables for each editable field
  const [jobTitle, setJobTitle] = useState(vacancy.jobTitle || "");
  const [jobDepartment, setJobDepartment] = useState(vacancy.jobDepartment || "");
  const [jobDescription, setJobDescription] = useState(vacancy.jobDescription || "");
  const [vacancyStatus, setVacancyStatus] = useState(vacancy.vacancyStatus || "Draft");
  const [salary, setSalary] = useState(vacancy.salary || 0);
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input changes
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      // Build the payload based on whether a file is selected or not.
      let payload;
      if (selectedFile) {
        // If uploading a file, use FormData.
        payload = new FormData();
        payload.append("vacancyStatus", vacancyStatus);
        payload.append("salary", salary);
        payload.append("jobDescription", jobDescription);
        payload.append("jobDepartment", jobDepartment);
        payload.append("jobTitle", jobTitle);
        payload.append("file", selectedFile); // Backend should be set up to handle this field as req.file
      } else {
        // Otherwise, send a JSON payload.
        payload = {
          vacancyStatus,
          salary,
          jobDescription,
          jobDepartment,
          jobTitle,
        };
      }

      await updateVacancy(vacancy._id, payload);
      alert("Vacancy updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating vacancy:", err);
      alert("Failed to update vacancy. Check console.");
    }
  };

  if (!vacancy) return null;

  return (
    <BaseModal isOpen={Boolean(vacancy)} onClose={onClose}>
      <motion.div
        className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-4 relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Update Vacancy</h2>
        
        {/* Editable field for Job Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        {/* Editable field for Department */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Department</label>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={jobDepartment}
            onChange={(e) => setJobDepartment(e.target.value)}
          />
        </div>

        {/* Editable field for Job Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Description</label>
          <textarea
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Editable field for Vacancy Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            value={vacancyStatus}
            onChange={(e) => setVacancyStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Editable field for Salary */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Salary</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
            placeholder="e.g. 400000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        {/* Optional File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Upload New File (optional)</label>
          <input
            type="file"
            className="w-full text-sm text-gray-700 dark:text-gray-100"
            onChange={handleFileChange}
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}

