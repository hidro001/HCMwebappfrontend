// import React from "react";
// import { motion } from "framer-motion"; // optional for hover animations
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// const BreakSettings = () => {
//   // Example data; in real usage, you might fetch from an API or have it in state
//   const breakSettingsData = [
//     {
//       id: 1,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 2,
//       breakType: "Remote",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 3,
//       breakType: "Remote",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 4,
//       breakType: "Remote",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 5,
//       breakType: "Remote",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 6,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Face Detection",
//     },
//     {
//       id: 7,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Monitor Track",
//     },
//     {
//       id: 8,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Monitor Track",
//     },
//     {
//       id: 9,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Monitor Track",
//     },
//     {
//       id: 10,
//       breakType: "In-Office",
//       breakHours: "1.5 Hours",
//       autoBreak: "1 Min",
//       detectionType: "Monitor Track",
//     },
//   ];

//   // Handlers for edit/delete. You could open a modal or remove from the array in real usage.
//   const handleEdit = (id) => alert(`Edit item ${id}`);
//   const handleDelete = (id) => alert(`Delete item ${id}`);
//   const handleAddBreakSettings = () => alert("Open 'Add Break Settings' form");

//   return (
//     <div className="bg-bg-secondary p-8">
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Break Settings
//         </h1>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded 
//                      hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//           onClick={handleAddBreakSettings}
//         >
//           <FiPlus className="mr-2" />
//           Add Break Settings
//         </motion.button>
//       </div>

//       {/* Responsive Table Container */}
//       <div className="overflow-x-auto rounded-lg shadow-2xl">
//         <table className="w-full text-left whitespace-nowrap">
//           <thead className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
//             <tr>
//               <th className="px-4 py-3">S.L</th>
//               <th className="px-4 py-3">Break Type</th>
//               <th className="px-4 py-3">Break Hours</th>
//               <th className="px-4 py-3">Auto Break (Min)</th>
//               <th className="px-4 py-3">Detection Type</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800 shadow-2xl">
//             {breakSettingsData.map((item, index) => (
//               <tr
//                 key={item.id}
//                 className="hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 <td className="px-4 py-3">
//                   {String(index + 1).padStart(2, "0")}
//                 </td>
//                 <td className="px-4 py-3">{item.breakType}</td>
//                 <td className="px-4 py-3">{item.breakHours}</td>
//                 <td className="px-4 py-3">{item.autoBreak}</td>
//                 <td className="px-4 py-3">{item.detectionType}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       onClick={() => handleEdit(item.id)}
//                       className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 
//                                  dark:hover:text-green-200 transition-all"
//                     >
//                       <FiEdit />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       onClick={() => handleDelete(item.id)}
//                       className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 
//                                  dark:hover:text-red-200 transition-all"
//                     >
//                       <FiTrash2 />
//                     </motion.button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BreakSettings;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const BreakSettings = () => {
  // Example data; in a real app you might fetch this from an API or store it in Redux, etc.
  const [breakSettingsData, setBreakSettingsData] = useState([
    {
      id: 1,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 2,
      breakType: "Remote",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 3,
      breakType: "Remote",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 4,
      breakType: "Remote",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 5,
      breakType: "Remote",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 6,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Face Detection",
    },
    {
      id: 7,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Monitor Track",
    },
    {
      id: 8,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Monitor Track",
    },
    {
      id: 9,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Monitor Track",
    },
    {
      id: 10,
      breakType: "In-Office",
      breakHours: "1.5 Hours",
      autoBreak: "1 Min",
      detectionType: "Monitor Track",
    },
  ]);

  // Track whether the "Add Break Settings" modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields for the modal
  const [breakType, setBreakType] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [autoBreakStart, setAutoBreakStart] = useState("");
  const [detectionType, setDetectionType] = useState("Face Detection");

  // Handlers for Edit & Delete (could open a modal or confirm dialog in real usage)
  const handleEdit = (id) => alert(`Edit item ${id}`);
  const handleDelete = (id) => alert(`Delete item ${id}`);

  // Open the "Add Break Settings" modal
  const handleAddBreakSettings = () => {
    setIsModalOpen(true);
  };

  // Form submission for the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: create a new break setting object
    const newSetting = {
      id: breakSettingsData.length + 1,
      breakType: breakType || "—",
      breakHours: breakDuration ? `${breakDuration} min` : "—",
      autoBreak: autoBreakStart ? `${autoBreakStart} min` : "—",
      detectionType,
    };
    // In a real app, you might POST to an API or update global state
    setBreakSettingsData([...breakSettingsData, newSetting]);

    // Close modal & reset fields
    setIsModalOpen(false);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
  };

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Break Settings
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded 
                     hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
          onClick={handleAddBreakSettings}
        >
          <FiPlus className="mr-2" />
          Add Break Settings
        </motion.button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-lg shadow-2xl">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">S.L</th>
              <th className="px-4 py-3">Break Type</th>
              <th className="px-4 py-3">Break Hours</th>
              <th className="px-4 py-3">Auto Break (Min)</th>
              <th className="px-4 py-3">Detection Type</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800">
            {breakSettingsData.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3">{item.breakType}</td>
                <td className="px-4 py-3">{item.breakHours}</td>
                <td className="px-4 py-3">{item.autoBreak}</td>
                <td className="px-4 py-3">{item.detectionType}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 
                                 dark:hover:text-green-200 transition-all"
                    >
                      <FiEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 
                                 dark:hover:text-red-200 transition-all"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal (uses AnimatePresence for exit animations) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal container */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Icon */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FiX size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Add Break Settings
                </h2>
                <form onSubmit={handleSubmit}>
                  {/* Break Type */}
                  <div className="mb-4">
                    <label
                      htmlFor="breakType"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Break Type
                    </label>
                    <input
                      id="breakType"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 
                                 rounded focus:outline-none focus:border-blue-500
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Break Type"
                      value={breakType}
                      onChange={(e) => setBreakType(e.target.value)}
                      required
                    />
                  </div>

                  {/* Break Duration */}
                  <div className="mb-4">
                    <label
                      htmlFor="breakDuration"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Break Duration (min)
                    </label>
                    <input
                      id="breakDuration"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 
                                 rounded focus:outline-none focus:border-blue-500
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Break Duration (min)"
                      value={breakDuration}
                      onChange={(e) => setBreakDuration(e.target.value)}
                      required
                    />
                  </div>

                  {/* Auto Break Start */}
                  <div className="mb-4">
                    <label
                      htmlFor="autoBreakStart"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Auto Break Start (min)
                    </label>
                    <input
                      id="autoBreakStart"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 
                                 rounded focus:outline-none focus:border-blue-500
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Auto Break (min)"
                      value={autoBreakStart}
                      onChange={(e) => setAutoBreakStart(e.target.value)}
                      required
                    />
                  </div>

                  {/* Detection Type (radio buttons) */}
                  <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-200 mb-1">
                      Detection Type
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
                        <input
                          type="radio"
                          name="detectionType"
                          value="Face Detection"
                          checked={detectionType === "Face Detection"}
                          onChange={(e) => setDetectionType(e.target.value)}
                          className="form-radio h-4 w-4 text-blue-500 mr-2 
                                     dark:bg-gray-700 dark:border-gray-600"
                        />
                        Face Detection
                      </label>
                      <label className="inline-flex items-center text-gray-700 dark:text-gray-200">
                        <input
                          type="radio"
                          name="detectionType"
                          value="Monitor Track"
                          checked={detectionType === "Monitor Track"}
                          onChange={(e) => setDetectionType(e.target.value)}
                          className="form-radio h-4 w-4 text-blue-500 mr-2 
                                     dark:bg-gray-700 dark:border-gray-600"
                        />
                        Monitor Track
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      className="mr-3 px-4 py-2 border border-red-500 text-red-500 
                                 rounded hover:bg-red-50 dark:hover:bg-gray-700"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600
                                 dark:hover:bg-blue-400 dark:text-gray-900"
                    >
                      ADD
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BreakSettings;
