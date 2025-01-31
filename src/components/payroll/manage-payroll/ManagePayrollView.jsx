

// Helper component for each "row" of the detail view
function DetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-700">
      <div className="p-3 font-semibold">{label}</div>
      <div className="p-3">{value}</div>
    </div>
  );
}

export default function PayrollDetailModal({ isOpen, onClose, payrollData }) {
  // If modal isn't open or no data, render nothing
  if (!isOpen || !payrollData) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 overflow-y-auto py-10">
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 bg-white dark:bg-gray-800 rounded-md shadow">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl md:text-2xl font-bold">
            Payroll Of {payrollData.employeeName} ({payrollData.employeeId})
          </h1>
          <div className="mt-2 flex justify-end space-x-3">
            <button
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <DetailRow label="EMPLOYEE ID" value={payrollData.employeeId} />
            <DetailRow label="EMPLOYEE NAME" value={payrollData.employeeName} />
            <DetailRow label="DEPARTMENT" value={payrollData.department} />
            <DetailRow label="ISSUED DATE" value={payrollData.issuedDate} />
            <DetailRow label="GROSS SALARY" value={payrollData.grossSalary} />
            <DetailRow label="DEDUCTION" value={payrollData.deduction} />
            <DetailRow label="FINAL AMOUNT" value={payrollData.finalAmount} />
            <DetailRow label="STATUS" value={payrollData.status} />
            <DetailRow label="LEAVES" value={payrollData.leaves} />
            <DetailRow label="HALF DAYS" value={payrollData.halfDays} />
            <DetailRow label="NOT EVEN HALF DAY" value={payrollData.notEvenHalfDay} />
            <DetailRow label="TOTAL SHIFTS" value={payrollData.totalShifts} />
            <DetailRow label="REMAINING PAID LEAVE" value={payrollData.remainingPaidLeave} />
            <DetailRow label="COMPLETE SHIFTS" value={payrollData.completeShifts} />
            <DetailRow label="NOT LOGGED OUT" value={payrollData.notLoggedOut} />
            <DetailRow label="TOTAL LATES" value={payrollData.totalLates} />
            <DetailRow label="REGULARIZATIONS" value={payrollData.regularizations} />
            <DetailRow label="ADVANCE AMOUNT" value={payrollData.advanceAmount} />
            <DetailRow label="REIMBURSEMENT AMOUNT" value={payrollData.reimbursementAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}
