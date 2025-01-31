// File: PayrollEditModal.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updatePayroll } from '../../../service/payrollService'; // <-- import your service
// If your service file is in a different path, adjust the import

function EditField({ label, value, onChange, readOnly = false }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-semibold">{label}</label>
      <input
        className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

export default function PayrollEditModal({
  isOpen,
  onClose,
  payrollData,
  onRefresh, // optional callback to re-fetch data in the parent
}) {
  // If no modal open or no data, render nothing
  if (!isOpen || !payrollData) return null;

  // Local state for each field
  const [employeeId, setEmployeeId] = useState(payrollData.employeeId);
  const [department, setDepartment] = useState(payrollData.department);
  const [issuedDate, setIssuedDate] = useState(payrollData.issuedDate);
  const [grossSalary, setGrossSalary] = useState(payrollData.grossSalary);
  const [deduction, setDeduction] = useState(payrollData.deduction);
  const [finalAmount, setFinalAmount] = useState(payrollData.finalAmount);
  const [status, setStatus] = useState(payrollData.status);

  const [leaves, setLeaves] = useState(payrollData.leaves);
  const [halfDays, setHalfDays] = useState(payrollData.halfDays);
  const [notEvenHalfDay, setNotEvenHalfDay] = useState(payrollData.notEvenHalfDay);
  const [totalShifts, setTotalShifts] = useState(payrollData.totalShifts);
  const [remainingPaidLeave, setRemainingPaidLeave] = useState(payrollData.remainingPaidLeave);
  const [completeShifts, setCompleteShifts] = useState(payrollData.completeShifts);
  const [notLoggedOut, setNotLoggedOut] = useState(payrollData.notLoggedOut);
  const [totalLates, setTotalLates] = useState(payrollData.totalLates);
  const [regularizations, setRegularizations] = useState(payrollData.regularizations);
  const [advanceAmount, setAdvanceAmount] = useState(payrollData.advanceAmount);
  const [reimbursementAmount, setReimbursementAmount] = useState(payrollData.reimbursementAmount);

  const handleSave = async () => {
    try {
      // Show a loading toast (optional)
      const loadingToastId = toast.loading('Updating payroll...');

      // Build the "updates" payload from local state
      const updates = {
        employeeId,
        department,
        issuedDate,
        grossSalary,
        deduction,
        finalAmount,
        status,
        leaves,
        halfDays,
        notEvenHalfDay,
        totalShifts,
        remainingPaidLeave,
        completeShifts,
        notLoggedOut,
        totalLates,
        regularizations,
        advanceAmount,
        reimbursementAmount,
      };

      // Call the service
      const result = await updatePayroll(payrollData._id, updates);

      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      // Check response
      if (result.success) {
        // Show success
        toast.success(result.message || 'Payroll updated successfully.');
        // Optionally trigger a refresh in parent
        if (onRefresh) {
          onRefresh();
        }
        onClose();
      } else {
        toast.error(result.message || 'Failed to update payroll.');
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || 'Error updating payroll.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-md shadow mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Edit Payroll</h2>
          <div className="mt-2 flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditField
              label="EMPLOYEE ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              readOnly
            />
            {/* Department as a <select> */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">DEPARTMENT</label>
              <select
                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            <EditField
              label="ISSUED DATE"
              value={issuedDate}
              onChange={(e) => setIssuedDate(e.target.value)}
            />
            <EditField
              label="GROSS SALARY"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
            />
            <EditField
              label="DEDUCTION"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
            />
            <EditField
              label="FINAL AMOUNT"
              value={finalAmount}
              onChange={(e) => setFinalAmount(e.target.value)}
            />

            {/* Status as a <select> */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold">STATUS</label>
              <select
                className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <EditField label="LEAVES" value={leaves} onChange={(e) => setLeaves(e.target.value)} />
            <EditField
              label="HALF DAYS"
              value={halfDays}
              onChange={(e) => setHalfDays(e.target.value)}
            />
            <EditField
              label="NOT EVEN HALF DAY"
              value={notEvenHalfDay}
              onChange={(e) => setNotEvenHalfDay(e.target.value)}
            />
            <EditField
              label="TOTAL SHIFTS"
              value={totalShifts}
              onChange={(e) => setTotalShifts(e.target.value)}
            />
            <EditField
              label="REMAINING PAID LEAVE"
              value={remainingPaidLeave}
              onChange={(e) => setRemainingPaidLeave(e.target.value)}
            />
            <EditField
              label="COMPLETE SHIFTS"
              value={completeShifts}
              onChange={(e) => setCompleteShifts(e.target.value)}
            />
            <EditField
              label="NOT LOGGED OUT"
              value={notLoggedOut}
              onChange={(e) => setNotLoggedOut(e.target.value)}
            />
            <EditField
              label="TOTAL LATES"
              value={totalLates}
              onChange={(e) => setTotalLates(e.target.value)}
            />
            <EditField
              label="REGULARIZATIONS"
              value={regularizations}
              onChange={(e) => setRegularizations(e.target.value)}
            />
            <EditField
              label="ADVANCE AMOUNT"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
            />
            <EditField
              label="REIMBURSEMENT AMOUNT"
              value={reimbursementAmount}
              onChange={(e) => setReimbursementAmount(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
