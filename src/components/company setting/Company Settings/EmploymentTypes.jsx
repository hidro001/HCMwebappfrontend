import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCompanySettingsStore from "../../../store/useCompanySettingsStore";
import EmploymentTypeModal from "./models/EmploymentTypeModal";

export default function EmploymentTypes() {
  const {
    employmentTypes,
    fetchEmploymentTypes,
    addOrUpdateEmploymentType,
    deleteEmploymentType,
    deductions,
    payrollCycles,
    workingDaySystem,
    fetchDeductions,
    fetchPayrollCycles,
    fetchWorkingDaySystems,
  } = useCompanySettingsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [empTypeName, setEmpTypeName] = useState("");
  const [deductionIds, setDeductionIds] = useState([]);
  const [selectedPayrollCycleId, setSelectedPayrollCycleId] = useState("");
  const [selectedLeaveSystemId, setSelectedLeaveSystemId] = useState("");
  const [salaryHike, setSalaryHike] = useState("");

  useEffect(() => {
    fetchEmploymentTypes();
    fetchDeductions();
    fetchPayrollCycles();
    fetchWorkingDaySystems();
  }, [
    fetchEmploymentTypes,
    fetchDeductions,
    fetchPayrollCycles,
    fetchWorkingDaySystems,
  ]);

  const handleAdd = () => {
    setIsModalOpen(true);
    setEditId(null);
    setEmpTypeName("");
    setDeductionIds([]);
    setSelectedPayrollCycleId("");
    setSelectedLeaveSystemId("");
    setSalaryHike("");
  };

  const handleEdit = (et) => {
    setEditId(et.id);
    setEmpTypeName(et.name);
    setDeductionIds(et.deductions || []);
    setSelectedPayrollCycleId(et.payrollCycleId || "");
    setSelectedLeaveSystemId(et.leaveSystemId || "");
    setSalaryHike(et.salaryHikePercentage || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteEmploymentType(id);
  };

  const handleSave = () => {
    if (!empTypeName || !selectedPayrollCycleId || !selectedLeaveSystemId) {
      toast.error("Please fill out all required fields.");
      return;
    }
    const numericHike = parseFloat(salaryHike);
    if (numericHike < 0 || numericHike > 100) {
      toast.error("Salary Hike must be between 0 and 100.");
      return;
    }
    const payload = {
      id: editId,
      name: empTypeName,
      deductions: deductionIds,
      payrollCycleId: selectedPayrollCycleId,
      leaveSystemId: selectedLeaveSystemId,
      salaryHikePercentage: numericHike,
    };
    addOrUpdateEmploymentType(payload);
    setIsModalOpen(false);
    setEditId(null);
    setEmpTypeName("");
    setDeductionIds([]);
    setSelectedPayrollCycleId("");
    setSelectedLeaveSystemId("");
    setSalaryHike("");
  };

  const handleCheckboxChange = (dedId) => {
    setDeductionIds((prev) =>
      prev.includes(dedId) ? prev.filter((id) => id !== dedId) : [...prev, dedId]
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setEmpTypeName("");
    setDeductionIds([]);
    setSelectedPayrollCycleId("");
    setSelectedLeaveSystemId("");
    setSalaryHike("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Employment Types
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Employment Type
        </button>
      </div>
      <table className="min-w-full text-left border dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
          <tr>
            <th className="p-2 text-gray-800 dark:text-gray-100">#</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Name</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Deductions</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Payroll Cycle</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Leave System</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Salary Hike %</th>
            <th className="p-2 text-gray-800 dark:text-gray-100">Action</th>
          </tr>
        </thead>
        <tbody>
          {employmentTypes.map((et, index) => (
            <tr key={et.id} className="border-b dark:border-gray-700">
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {index + 1}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">{et.name}</td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {et.deductions
                  ?.map((dId) => {
                    const dedObj = deductions.find((dd) => dd.id === dId);
                    return dedObj ? dedObj.name : dId;
                  })
                  .join(", ")}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {payrollCycles.find((pc) => pc.id === et.payrollCycleId)?.name ??
                  et.payrollCycleId}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {workingDaySystem.find((ls) => ls.id === et.leaveSystemId)?.name ??
                  et.leaveSystemId}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200">
                {et.salaryHikePercentage}%
              </td>
              <td className="p-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(et)}
                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(et.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmploymentTypeModal
        isOpen={isModalOpen}
        editId={editId}
        empTypeName={empTypeName}
        setEmpTypeName={setEmpTypeName}
        deductionIds={deductionIds}
        handleCheckboxChange={handleCheckboxChange}
        deductions={deductions}
        payrollCycles={payrollCycles}
        workingDaySystem={workingDaySystem}
        selectedPayrollCycleId={selectedPayrollCycleId}
        setSelectedPayrollCycleId={setSelectedPayrollCycleId}
        selectedLeaveSystemId={selectedLeaveSystemId}
        setSelectedLeaveSystemId={setSelectedLeaveSystemId}
        salaryHike={salaryHike}
        setSalaryHike={setSalaryHike}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
