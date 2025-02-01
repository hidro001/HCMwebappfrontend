

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const PayrollCycles = () => {
  const [cycles, setCycles] = useState([
    { id: 1, name: "Saket", processingDate: "7th Date" },
    { id: 2, name: "Noida", processingDate: "1st Date" },
    { id: 3, name: "Delhi", processingDate: "1st Date" },
  ]);

  // Track form fields for the new cycle
  const [newName, setNewName] = useState("");
  const [newProcessingDate, setNewProcessingDate] = useState("");

  // State to manage whether the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCycle = () => {
    if (!newName || !newProcessingDate) {
      toast.error("Please fill all fields.");
      return;
    }
    
    const newCycle = {
      id: Date.now(),
      name: newName,
      processingDate: newProcessingDate,
    };

    setCycles([...cycles, newCycle]);
    toast.success("Payroll cycle added!");

    // Reset the form and close the modal
    setNewName("");
    setNewProcessingDate("");
    setIsModalOpen(false);
  };

  const handleDeleteCycle = (id) => {
    setCycles(cycles.filter((c) => c.id !== id));
    toast.success("Payroll cycle deleted.");
  };

  const handleEditCycle = (id) => {
    toast("Edit not implemented yet.");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Payroll Cycle
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Payroll Cycle
        </button>
      </div>

      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Cycle Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">
              Processing Date
            </th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => (
            <tr key={cycle.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {cycle.name}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {cycle.processingDate}
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEditCycle(cycle.id)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCycle(cycle.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -- MODAL -- */}
      {isModalOpen && (
        <div
          className="
            fixed inset-0
            bg-gray-500 bg-opacity-50 
            backdrop-blur-sm 
            flex justify-center items-center 
            z-50
          "
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Add Payroll Cycle
            </h2>

            {/* Cycle Name */}
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Cycle Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
                placeholder="Enter Cycle Name"
              />
            </div>

            {/* Processing Date */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Processing Date
              </label>
              <input
                type="text"
                value={newProcessingDate}
                onChange={(e) => setNewProcessingDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
                placeholder="Enter Processing Date"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCycle}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Payroll Cycle
              </button>
            </div>
          </div>
        </div>
      )}
      {/* -- END MODAL -- */}
    </div>
  );
};

export default PayrollCycles;
