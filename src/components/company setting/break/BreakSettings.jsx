import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import BreakSettingsModal from "./model/BreakSettingsModal";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import useBreakSettingsStore from "../../../store/breakSettingsStore.";

export default function BreakSettings() {
  const {
    breakRecords,
    loading,
    fetchBreakRecords,
    addBreakRecord,
    updateBreakRecord,
    deleteBreakRecord,
  } = useBreakSettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [breakType, setBreakType] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [autoBreakStart, setAutoBreakStart] = useState("");
  const [detectionType, setDetectionType] = useState("Face Detection");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchBreakRecords();
  }, [fetchBreakRecords]);

  const handleAddBreakSettings = () => {
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const itemToEdit = breakRecords.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setBreakType(itemToEdit.breakType);
      setBreakDuration(itemToEdit.breakHours.toString());
      setAutoBreakStart(itemToEdit.autoBreakMinutes.toString());
      setDetectionType(itemToEdit.detectionType);
      setIsModalOpen(true);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteBreakRecord(deleteId);
    }
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      breakType,
      breakHours: parseFloat(breakDuration) || 0,
      autoBreakMinutes: parseFloat(autoBreakStart) || 0,
      detectionType,
    };
    if (editingItem) {
      updateBreakRecord(editingItem._id, payload);
    } else {
      addBreakRecord(payload);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Break Settings
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 dark:text-gray-900 transition-all"
          onClick={handleAddBreakSettings}
        >
          <FiPlus className="mr-2" />
          Add Break Settings
        </motion.button>
      </div>
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
            {loading ? (
              // Render 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </td>
                </tr>
              ))
            ) : (
              // Render actual break records once loaded
              breakRecords.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3">{item.breakType}</td>
                  <td className="px-4 py-3">{item.breakHours} Hours</td>
                  <td className="px-4 py-3">{item.autoBreakMinutes} Min</td>
                  <td className="px-4 py-3">{item.detectionType}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleEdit(item._id)}
                        className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-all"
                      >
                        <FiEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => confirmDelete(item._id)}
                        className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-all"
                      >
                        <FiTrash2 />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <BreakSettingsModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        breakType={breakType}
        setBreakType={setBreakType}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
        autoBreakStart={autoBreakStart}
        setAutoBreakStart={setAutoBreakStart}
        detectionType={detectionType}
        setDetectionType={setDetectionType}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
          setBreakType("");
          setBreakDuration("");
          setAutoBreakStart("");
          setDetectionType("Face Detection");
        }}
        onSubmit={handleSubmit}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Confirmation"
        message="Are you sure you want to delete this break record?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Yes, delete it!"
        cancelText="Cancel"
      />
    </div>
  );
}
