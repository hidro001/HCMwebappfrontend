

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const LeaveSystems = () => {
  // Existing data & state
  const [systems, setSystems] = useState([
    { id: 1, name: "Saket", workingDays: "Mon-Fri", monthlyLeaves: "1.5" },
    { id: 2, name: "Noida", workingDays: "Mon-Sat", monthlyLeaves: "1.0" },
    { id: 3, name: "Delhi", workingDays: "Mon-Fri", monthlyLeaves: "2.0" },
  ]);

  // Existing states for adding a new system
  const [newName, setNewName] = useState("");
  const [newWorkingDays, setNewWorkingDays] = useState("");
  const [newMonthlyLeaves, setNewMonthlyLeaves] = useState("");

  // New: Control the modal’s open/close
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Existing logic for adding a new system
  const handleAddSystem = () => {
    if (!newName || !newWorkingDays || !newMonthlyLeaves) {
      toast.error("Please fill out all fields for leave system.");
      return;
    }

    const newSys = {
      id: Date.now(),
      name: newName,
      workingDays: newWorkingDays,
      monthlyLeaves: newMonthlyLeaves,
    };

    setSystems([...systems, newSys]);
    toast.success("Leave system added!");

    // Reset fields & close the modal
    setNewName("");
    setNewWorkingDays("");
    setNewMonthlyLeaves("");
    setIsModalOpen(false);
  };

  // Existing logic to delete and edit
  const handleDeleteSystem = (id) => {
    setSystems(systems.filter((s) => s.id !== id));
    toast.success("Leave system deleted.");
  };

  const handleEditSystem = (id) => {
    toast("Edit not implemented in this example.");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      {/* Existing header & button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Leave Systems
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Leave Systems
        </button>
      </div>

      {/* Existing table & icons */}
      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Working Days</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Monthly Paid Leaves</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {systems.map((sys) => (
            <tr key={sys.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{sys.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{sys.workingDays}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{sys.monthlyLeaves}</td>
              <td className="p-2 flex space-x-2">
                {/* Edit & Delete icons unchanged */}
                <button
                  onClick={() => handleEditSystem(sys.id)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteSystem(sys.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODAL (Add Leave System) --- */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0
            bg-gray-700 bg-opacity-50
            backdrop-blur-sm
            flex justify-center items-center
            z-50
          "
        >
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-sm p-6">
            <h3 className="text-xl font-bold mb-4">Add Leave System</h3>

            {/* Leave System Name */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Leave System Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter system name"
                className="
                  w-full p-2 
                  border border-gray-300 dark:border-gray-700 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-gray-800
                "
              />
            </div>

            {/* Working Days */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Working Days</label>
              <input
                type="text"
                value={newWorkingDays}
                onChange={(e) => setNewWorkingDays(e.target.value)}
                placeholder="e.g. Mon-Fri"
                className="
                  w-full p-2 
                  border border-gray-300 dark:border-gray-700 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-gray-800
                "
              />
            </div>

            {/* Monthly Paid Leaves */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Monthly Paid Leaves</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={newMonthlyLeaves}
                onChange={(e) => setNewMonthlyLeaves(e.target.value)}
                className="
                  w-full p-2 
                  border border-gray-300 dark:border-gray-700 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-gray-800
                "
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="
                  px-4 py-2 
                  bg-gray-300 dark:bg-gray-600
                  text-gray-800 dark:text-gray-100 
                  rounded 
                  hover:bg-gray-400 dark:hover:bg-gray-500
                "
              >
                Cancel
              </button>
              <button
                onClick={handleAddSystem}
                className="
                  px-4 py-2 
                  bg-blue-600 
                  text-white 
                  rounded 
                  hover:bg-blue-700
                "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- END MODAL --- */}
    </div>
  );
};

export default LeaveSystems;

