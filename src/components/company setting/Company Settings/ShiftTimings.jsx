import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import ShiftTimingModal from "./models/ShiftTimingModal";

export default function ShiftTimings() {
  const {
    shiftTimings,
    fetchShiftTimings,
    addOrUpdateShiftTiming,
    deleteShiftTiming,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchShiftTimings();
  }, [fetchShiftTimings]);

  const handleSave = () => {
    if (!name || !start || !end) {
      toast.error("Please fill out all fields.");
      return;
    }
    const payload = {
      id: editId,
      name,
      startTime: start,
      endTime: end,
    };
    addOrUpdateShiftTiming(payload);
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteShiftTiming(id);
  };

  const handleEditClick = (shift) => {
    setEditId(shift.id);
    setName(shift.name);
    setStart(shift.startTime);
    setEnd(shift.endTime);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setStart("");
    setEnd("");
    setEditId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Shift Timings
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Shift Timing
        </button>
      </div>
      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Start Time</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">End Time</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {shiftTimings.map((st) => (
            <tr key={st.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.startTime}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{st.endTime}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEditClick(st)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(st.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ShiftTimingModal
        isOpen={isModalOpen}
        editId={editId}
        name={name}
        start={start}
        end={end}
        onNameChange={(e) => setName(e.target.value)}
        onStartChange={(e) => setStart(e.target.value)}
        onEndChange={(e) => setEnd(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
