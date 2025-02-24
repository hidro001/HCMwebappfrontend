// import React from 'react'

// const CompanyInductionView = () => {
//   return (
//     <div>CompanyInductionView</div>
//   )
// }

// export default CompanyInductionView



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiDownload, FiTrash } from "react-icons/fi";
import useInductionPPTStore from "../../store/useInductionPPTStore";


export default function CompanyInductionView() {
  // Local state for the PPT modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pptName, setPptName] = useState("");
  const [department, setDepartment] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Local state for the delete confirmation dialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pptToDelete, setPptToDelete] = useState(null);

  // Use the induction PPT store
  const { pptList, fetchPPTsUser, createPPT, deletePPT } = useInductionPPTStore();

  useEffect(() => {
    fetchPPTsUser();
  }, []);

  // Submit handler for the modal form
 

  // Instead of using window.confirm, we set the PPT ID to delete and open the confirmation dialog
 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Induction PPT&apos;s
        </h1>
    
      </div>

      {/* Grid of PPT cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pptList.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden"
          >
            <img
              src={item.coverImage}
              alt={item.pptName}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.pptName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                {item.department}
              </p>
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
                >
                  <FiDownload className="mr-2" />
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PPT
                  </a>
                </motion.button>
          
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    
    </div>
  );
}
