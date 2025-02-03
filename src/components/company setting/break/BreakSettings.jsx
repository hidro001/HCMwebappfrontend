import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import BreakSettingsModal from "./model/BreakSettingsModal";

const BreakSettings = () => {
  // Example data
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

  // Track whether the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track whether we’re adding or editing:
  // - If null -> we’re adding a new item
  // - Otherwise -> we store the entire item being edited
  const [editingItem, setEditingItem] = useState(null);

  // Form fields
  const [breakType, setBreakType] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [autoBreakStart, setAutoBreakStart] = useState("");
  const [detectionType, setDetectionType] = useState("Face Detection");

  // ------------------------------------------------------------------
  // When we click "Add Break Settings"
  // ------------------------------------------------------------------
  const handleAddBreakSettings = () => {
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
    setIsModalOpen(true);
  };

  // ------------------------------------------------------------------
  // When we click "Edit" on a row
  // ------------------------------------------------------------------
  const handleEdit = (id) => {
    const itemToEdit = breakSettingsData.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setBreakType(itemToEdit.breakType);
      setBreakDuration(itemToEdit.breakHours.replace(" Hours", ""));
      setAutoBreakStart(itemToEdit.autoBreak.replace(" Min", ""));
      setDetectionType(itemToEdit.detectionType);
      setIsModalOpen(true);
    }
  };

  // ------------------------------------------------------------------
  // When we click "Delete" on a row
  // ------------------------------------------------------------------
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      const updatedList = breakSettingsData.filter((item) => item.id !== id);
      setBreakSettingsData(updatedList);
    }
  };

  // ------------------------------------------------------------------
  // Submit (either Add or Edit)
  // ------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingItem) {
      // Editing an existing item
      const updatedItem = {
        ...editingItem,
        breakType,
        breakHours: breakDuration ? `${breakDuration} Hours` : "—",
        autoBreak: autoBreakStart ? `${autoBreakStart} Min` : "—",
        detectionType,
      };
      setBreakSettingsData((prev) =>
        prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
      );
    } else {
      // Adding a new item
      const newSetting = {
        id: breakSettingsData.length + 1,
        breakType: breakType || "—",
        breakHours: breakDuration ? `${breakDuration} Hours` : "—",
        autoBreak: autoBreakStart ? `${autoBreakStart} Min` : "—",
        detectionType,
      };
      setBreakSettingsData([...breakSettingsData, newSetting]);
    }

    // Close the modal and reset form
    setIsModalOpen(false);
    setEditingItem(null);
    setBreakType("");
    setBreakDuration("");
    setAutoBreakStart("");
    setDetectionType("Face Detection");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
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

      {/* Table */}
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
                      className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 transition-all"
                    >
                      <FiEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-all"
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

      {/* Modal */}
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
    </div>
  );
};

export default BreakSettings;
