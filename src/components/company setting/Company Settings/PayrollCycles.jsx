import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import PayrollCycleModal from "./models/PayrollCycleModal";

export default function PayrollCycles() {
  const {
    payrollCycles,
    fetchPayrollCycles,
    addOrUpdatePayrollCycle,
    deletePayrollCycle,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cycleName, setCycleName] = useState("");
  const [processingDate, setProcessingDate] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayrollCycles();
  }, [fetchPayrollCycles]);

  const handleSave = () => {
    if (!cycleName || !processingDate) {
      toast.error("Please fill out all fields.");
      return;
    }
    const payload = {
      id: editId,
      name: cycleName,
      processingDate,
    };
    addOrUpdatePayrollCycle(payload);
    setIsModalOpen(false);
    setCycleName("");
    setProcessingDate("");
    setEditId(null);
  };

  const handleEdit = (cycle) => {
    setEditId(cycle.id);
    setCycleName(cycle.name);
    setProcessingDate(cycle.processingDate);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deletePayrollCycle(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCycleName("");
    setProcessingDate("");
    setEditId(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Payroll Cycles</h2>
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
            <th className="p-2 text-gray-800 dark:text-gray-100">Processing Date</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {payrollCycles.map((c) => (
            <tr key={c.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">{c.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{c.processingDate}</td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PayrollCycleModal
        isOpen={isModalOpen}
        editId={editId}
        cycleName={cycleName}
        processingDate={processingDate}
        onCycleNameChange={(e) => setCycleName(e.target.value)}
        onProcessingDateChange={(e) => setProcessingDate(e.target.value)}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
