import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchAllPayroll, getPayrollById, updatePayrollDeductionAndSalary } from "../../../service/payrollService";

export default function PayrollEditModal({ isOpen, onClose, payrollData, onRefresh }) {
  const [deduction, setDeduction] = useState("");
  const [finalSalary, setFinalSalary] = useState("");
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  useEffect(() => {
    if (isOpen && payrollData?.employeeId) {
      fetchPayrollDetails(payrollData.employeeId, month, year);
    }
  }, [isOpen, payrollData?.employeeId, month, year]);

  const fetchPayrollDetails = async (employeeId, month, year) => {
    try {
      setLoading(true);
      const response = await getPayrollById(employeeId, month, year);

      if (response.success) {
        setDeduction(response.data.deduction || 0);
        setFinalSalary(response.data.finalSalary || 0);
      } else {
        toast.error(response.message || "Failed to fetch payroll data.");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching payroll data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const loadingToastId = toast.loading("Updating payroll...");

      const result = await updatePayrollDeductionAndSalary(payrollData.employeeId, month, year, deduction, finalSalary);

      toast.dismiss(loadingToastId);

      if (result.success) {
        toast.success(result.message || "Payroll updated successfully.");

        // ✅ Fetch updated payroll data and refresh state
        await fetchPayrollDetails(payrollData.employeeId, month, year);

        // ✅ Refresh main payroll table
        if (onRefresh) onRefresh();

        onClose();
      } else {
        toast.error(result.message || "Failed to update payroll.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error updating payroll.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-md shadow mx-4 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold mb-4">Edit Payroll</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-4">
            {/* Deduction Input */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Deduction</label>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                value={deduction}
                onChange={(e) => setDeduction(Number(e.target.value))}
              />
            </div>

            {/* Final Salary Input */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">Final Salary</label>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                value={finalSalary}
                onChange={(e) => setFinalSalary(Number(e.target.value))}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
