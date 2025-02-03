import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import DeductionModal from "./models/DeductionModal";

export default function Deductions() {
  const {
    deductions,
    fetchDeductions,
    addOrUpdateDeduction,
    deleteDeduction,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deductionName, setDeductionName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDeductions();
  }, [fetchDeductions]);

  const handleSave = () => {
    if (!deductionName || percentage === "") {
      toast.error("Please fill out all deduction fields.");
      return;
    }
    const numericPercent = parseFloat(percentage);
    if (numericPercent < 0 || numericPercent > 100) {
      toast.error("Percentage must be between 0 and 100.");
      return;
    }
    const payload = {
      id: editId,
      name: deductionName,
      percentage: numericPercent,
    };
    addOrUpdateDeduction(payload);
    setIsModalOpen(false);
    setDeductionName("");
    setPercentage("");
    setEditId(null);
  };

  const handleEdit = (d) => {
    setEditId(d.id);
    setDeductionName(d.name);
    setPercentage(d.percentage);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteDeduction(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDeductionName("");
    setPercentage("");
    setEditId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Deductions
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Deduction
        </button>
      </div>
      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Percentage (%)</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((d) => (
            <tr key={d.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{d.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{d.percentage}%</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeductionModal
        isOpen={isModalOpen}
        editId={editId}
        deductionName={deductionName}
        percentage={percentage}
        onDeductionNameChange={(e) => setDeductionName(e.target.value)}
        onPercentageChange={(e) => setPercentage(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
