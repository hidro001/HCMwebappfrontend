
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiDownload, FiTrash } from "react-icons/fi";
import useInductionPPTStore from "../../../store/useInductionPPTStore";
import InductionPPTModal from "./model/InductionPPTModal";
import ConfirmationDialog from "../../common/ConfirmationDialog"; // Adjust the path as needed

export default function CompanyInduction() {
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
  const { pptList, fetchPPTs, createPPT, deletePPT } = useInductionPPTStore();

  useEffect(() => {
    fetchPPTs();
  }, []);

  // Submit handler for the modal form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pptName || !department || !file) {
      toast.error("Please fill in all fields");
      return;
    }
    const pptData = {
      pptName,
      department,
      pptFile: file,
      coverImage, // optional cover image
    };
    await createPPT(pptData);
    setIsModalOpen(false);
    // Clear form fields
    setPptName("");
    setDepartment("");
    setFile(null);
    setCoverImage(null);
  };

  // Instead of using window.confirm, we set the PPT ID to delete and open the confirmation dialog
  const handleDelete = (id) => {
    setPptToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  // Called when the user confirms deletion in the confirmation dialog
  const handleConfirmDelete = async () => {
    if (pptToDelete) {
      await deletePPT(pptToDelete);
      setPptToDelete(null);
      setIsConfirmDialogOpen(false);
    }
  };

  // Called when the user cancels deletion
  const handleCancelDelete = () => {
    setPptToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Induction PPT&apos;s
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-4 sm:mt-0 inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus className="mr-2" />
          Add Induction PPT
        </motion.button>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-all"
                  onClick={() => handleDelete(item._id)}
                >
                  <FiTrash className="mr-1" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Adding Induction PPT */}
      <InductionPPTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pptName={pptName}
        setPptName={setPptName}
        department={department}
        setDepartment={setDepartment}
        file={file}
        setFile={setFile}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        handleSubmit={handleSubmit}
      />

      {/* Confirmation Dialog for Deletion */}
      <ConfirmationDialog
        open={isConfirmDialogOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this PPT?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
