// import React from "react";
// import { motion } from "framer-motion";
// import toast, { Toaster } from "react-hot-toast";
// import { FiPlus, FiDownload } from "react-icons/fi";

// export default function CompanyInduction() {
//   // Dummy data to map over
//   const cardData = [
//     {
//       id: 1,
//       title: "Induction PPT for IT",
//       category: "IT",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//     {
//       id: 2,
//       title: "Induction PPT for Sales",
//       category: "Sales",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//     {
//       id: 3,
//       title: "Induction PPT for HR",
//       category: "HR",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//     {
//       id: 4,
//       title: "Attendance & Discipline Policy",
//       category: "Policy",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//     {
//       id: 5,
//       title: "Livekeeping Sales Process Framework",
//       category: "Sales",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//     {
//       id: 6,
//       title: "Disciplinary Procedures Policy",
//       category: "Policy",
//       image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
//     },
//   ];

//   // Handle View/Download button click
//   const handleDownload = (pptTitle) => {
//     toast.success(`Downloading ${pptTitle}...`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* React Hot Toast container */}
//       <Toaster position="top-right" />

//       {/* Header row */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           All Induction PPT&apos;s
//         </h1>
//         {/* Add Induction PPT button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
//                      dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//           onClick={() => toast("Add Induction PPT clicked!")}
//         >
//           <FiPlus className="mr-2" />
//           Add Induction PPT
//         </motion.button>
//       </div>

//       {/* Grid of PPT cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cardData.map((item) => (
//           <motion.div
//             key={item.id}
//             whileHover={{ scale: 1.02 }}
//             className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
//           >
//             {/* Image */}
//             <img
//               src={item.image}
//               alt={item.title}
//               className="h-40 w-full object-cover"
//             />

//             {/* Card Content */}
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                 {item.title}
//               </h2>
//               <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
//                 {item.category}
//               </p>

//               {/* View/Download Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 
//                            dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
//                 onClick={() => handleDownload(item.title)}
//               >
//                 <FiDownload className="mr-2" />
//                 View/Download PPT
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiPlus, FiDownload, FiX } from "react-icons/fi";

export default function CompanyInduction() {
  // Track whether modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple form states
  const [pptName, setPptName] = useState("");
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState(null);

  // Dummy data for the PPT cards
  const cardData = [
    {
      id: 1,
      title: "Induction PPT for IT",
      category: "IT",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
    {
      id: 2,
      title: "Induction PPT for Sales",
      category: "Sales",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
    {
      id: 3,
      title: "Induction PPT for HR",
      category: "HR",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
    {
      id: 4,
      title: "Attendance & Discipline Policy",
      category: "Policy",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
    {
      id: 5,
      title: "Livekeeping Sales Process Framework",
      category: "Sales",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
    {
      id: 6,
      title: "Disciplinary Procedures Policy",
      category: "Policy",
      image: "https://images.unsplash.com/photo-1621089667522-272aa4b5b71b?fm=jpg",
    },
  ];

  // Handle card button click for View/Download
  const handleDownload = (pptTitle) => {
    toast.success(`Downloading ${pptTitle}...`);
  };

  // Submit handler for the modal form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate or process form data here...
    toast.success("PPT uploaded successfully!");
    // Close modal & reset fields
    setIsModalOpen(false);
    setPptName("");
    setDepartment("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* React Hot Toast container */}
      <Toaster position="top-right" />

      {/* Header row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Induction PPT&apos;s
        </h1>

        {/* Add Induction PPT button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
                     dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" />
          Add Induction PPT
        </motion.button>
      </div>

      {/* Grid of PPT cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {item.category}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 
                           dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
                onClick={() => handleDownload(item.title)}
              >
                <FiDownload className="mr-2" />
                View/Download PPT
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal (uses AnimatePresence for transition) */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Icon in top-right */}
                <button
                  className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FiX size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Add Induction PPT
                </h2>
                <form onSubmit={handleSubmit}>
                  {/* PPT Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="pptName"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Induction PPT Name
                    </label>
                    <input
                      id="pptName"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 
                                 rounded focus:outline-none focus:border-blue-500
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Induction PPT Name"
                      value={pptName}
                      onChange={(e) => setPptName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Select Department */}
                  <div className="mb-4">
                    <label
                      htmlFor="department"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Select Department
                    </label>
                    <select
                      id="department"
                      className="w-full px-3 py-2 border border-gray-300
                                 rounded focus:outline-none focus:border-blue-500 
                                 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Policy">Policy</option>
                    </select>
                  </div>

                  {/* File Upload */}
                  <div className="mb-4">
                    <label
                      htmlFor="pptFile"
                      className="block text-gray-700 dark:text-gray-200 mb-1"
                    >
                      Choose File
                    </label>
                    <input
                      id="pptFile"
                      type="file"
                      className="block w-full text-sm text-gray-500
                                 file:mr-4 file:py-2 file:px-4
                                 file:border-0 file:text-sm file:font-semibold
                                 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100
                                 dark:text-gray-200 dark:bg-gray-700 
                                 dark:file:bg-gray-600 dark:file:text-gray-100"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>

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
                      Upload
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
}
