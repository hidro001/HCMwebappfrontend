import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import LeaveSystemModal from "./models/LeaveSystemModal";

export default function LeaveSystems() {
  const {
    leaveSystems,
    fetchLeaveSystems,
    addOrUpdateLeaveSystem,
    deleteLeaveSystem,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sysName, setSysName] = useState("");
  const [workingDays, setWorkingDays] = useState("");
  const [monthlyLeaves, setMonthlyLeaves] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLeaveSystems();
  }, [fetchLeaveSystems]);

  const handleSave = () => {
    if (!sysName || !workingDays || monthlyLeaves === "") {
      toast.error("Please fill out all fields for leave system.");
      return;
    }

    const payload = {
      id: editId,
      name: sysName,
      workingDays,
      monthlyPaidLeaves: monthlyLeaves,
    };
    addOrUpdateLeaveSystem(payload);

    setIsModalOpen(false);
    setSysName("");
    setWorkingDays("");
    setMonthlyLeaves("");
    setEditId(null);
  };

  const handleEdit = (ls) => {
    setEditId(ls.id);
    setSysName(ls.name);
    setWorkingDays(ls.workingDays);
    setMonthlyLeaves(ls.monthlyPaidLeaves);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteLeaveSystem(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSysName("");
    setWorkingDays("");
    setMonthlyLeaves("");
    setEditId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Leave Systems
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Leave System
        </button>
      </div>
      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Working Days</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">
              Monthly Paid Leaves
            </th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveSystems.map((ls) => (
            <tr key={ls.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{ls.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {Array.isArray(ls.workingDays)
                  ? ls.workingDays.join(", ")
                  : ls.workingDays}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {ls.monthlyPaidLeaves}
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(ls)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(ls.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LeaveSystemModal
        isOpen={isModalOpen}
        editId={editId}
        sysName={sysName}
        workingDays={workingDays}
        monthlyLeaves={monthlyLeaves}
        onSysNameChange={(e) => setSysName(e.target.value)}
        onWorkingDaysChange={(e) => setWorkingDays(e.target.value)}
        onMonthlyLeavesChange={(e) => setMonthlyLeaves(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
