import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import HolidayModal from "./models/HolidayModal";

export default function Holidays() {
  const { holidays, fetchHolidays, addOrUpdateHoliday, deleteHoliday } =
    useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleSave = () => {
    if (!holidayName || !holidayDate) {
      toast.error("Please fill out holiday name and date.");
      return;
    }
    const payload = {
      id: editId,
      name: holidayName,
      date: holidayDate,
      recurring,
    };
    addOrUpdateHoliday(payload);
    setIsModalOpen(false);
    setHolidayName("");
    setHolidayDate("");
    setRecurring(false);
    setEditId(null);
  };

  const handleEdit = (hol) => {
    setEditId(hol.id);
    setHolidayName(hol.name);
    setHolidayDate(hol.date);
    setRecurring(hol.recurring);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteHoliday(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHolidayName("");
    setHolidayDate("");
    setRecurring(false);
    setEditId(null);
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
          {holidays.map((h) => (
            <tr key={h.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{h.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {h.date.split("T")[0]}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {h.recurring ? "Yes" : "No"}
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(h)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(h.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <HolidayModal
        isOpen={isModalOpen}
        editId={editId}
        holidayName={holidayName}
        holidayDate={holidayDate}
        recurring={recurring}
        onHolidayNameChange={(e) => setHolidayName(e.target.value)}
        onHolidayDateChange={(e) => setHolidayDate(e.target.value)}
        onRecurringChange={(e) => setRecurring(e.target.value === "true")}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
