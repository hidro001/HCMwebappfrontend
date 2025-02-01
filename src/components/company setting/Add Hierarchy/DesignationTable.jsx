
import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import SkeletonRows from "./SkeletonRows";

const data = [
  { id: 1, name: "Saket" },
  { id: 2, name: "Noida" },
  { id: 3, name: "Noida" },
  { id: 4, name: "Delhi" },
  { id: 5, name: "Saket" },
  { id: 6, name: "Delhi" },
  { id: 7, name: "Noida" },
  { id: 8, name: "Delhi" },
  { id: 9, name: "Saket" },
  { id: 10, name: "Noida" },
];

export default function DesignationTable({ isLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [designationName, setDesignationName] = useState("");

  // Opens the modal
  function handleOpenModal() {
    setShowModal(true);
  }

  // Closes the modal
  function handleCloseModal() {
    setShowModal(false);
    setDesignationName("");
  }

  // Handle form submission logic
  function handleAddDesignation() {
    console.log("New Designation:", designationName);
    // Could POST to an API here...
    handleCloseModal();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Designations</h2>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          + Add Designation
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4">S.L</th>
              <th className="py-3 px-4">Designation Name</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows count={10} columns={3} />
            ) : (
              data.map((designation, idx) => (
                <tr
                  key={designation.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="py-3 px-4">{designation.name}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (only rendered when showModal is true) */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center 
                     bg-black/40 backdrop-blur-sm"
        >
          <div className="relative w-96 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {/* Close (X) button in top-right corner */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700
                         dark:text-gray-300 dark:hover:text-gray-100"
              onClick={handleCloseModal}
            >
              <FaTimes />
            </button>

            {/* Modal title */}
            <h2 className="text-lg font-semibold mb-4">Add Designations</h2>

            {/* Input field */}
            <label htmlFor="designationName" className="block mb-2 font-medium">
              Designation Name
            </label>
            <input
              id="designationName"
              type="text"
              placeholder="Enter Designation Name"
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded 
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />

            {/* Action buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded
                           hover:bg-orange-50 dark:hover:bg-gray-700"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddDesignation}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
