

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const Holidays = () => {
  const [holidays, setHolidays] = useState([
    { id: 1, name: "Republic Day", date: "26 Jan 2025", recurring: "No" },
    { id: 2, name: "Some Festival", date: "10 Feb 2025", recurring: "Yes" },
  ]);

  // Form fields for a new holiday
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newRecurring, setNewRecurring] = useState("No");

  // State for showing/hiding the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddHoliday = () => {
    if (!newName || !newDate) {
      toast.error("Please fill out holiday name and date.");
      return;
    }

    const newHol = {
      id: Date.now(),
      name: newName,
      date: newDate,
      recurring: newRecurring,
    };
    setHolidays([...holidays, newHol]);
    toast.success("Holiday added!");

    // Clear form and close modal
    setNewName("");
    setNewDate("");
    setNewRecurring("No");
    setIsModalOpen(false);
  };

  const handleDeleteHoliday = (id) => {
    setHolidays(holidays.filter((h) => h.id !== id));
    toast.success("Holiday deleted.");
  };

  const handleEditHoliday = (id) => {
    toast("Edit not implemented in this example.");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Holidays
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Declare Holidays
        </button>
      </div>

      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Date</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Recurring</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((hol) => (
            <tr key={hol.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {hol.name}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {hol.date}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {hol.recurring}
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEditHoliday(hol.id)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteHoliday(hol.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -- MODAL OVERLAY & CONTENT -- */}
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-sm w-full relative">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Declare Holiday
            </h2>

            {/* Holiday Name */}
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Holiday Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
                placeholder="Enter Holiday Name"
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Date
              </label>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
                placeholder="DD-MM-YY"
              />
            </div>

            {/* Recurring */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Recurring
              </label>
              <select
                value={newRecurring}
                onChange={(e) => setNewRecurring(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHoliday}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Declare Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holidays;

