


// import { useEffect, useState } from "react";
// // 1) Remove react-toastify import:
// // import { toast } from "react-toastify";

// // 2) Import react-hot-toast instead:
// import toast from "react-hot-toast";

// import SubmitResignationModal from "./model/SubmitResignationModal";
// import ConfirmationDialog from "../../components/common/ConfirmationDialog"; 
// import useResignationStore from "../../store/useResignationStore";

// export default function SubmitResignation() {
//   const { 
//     resignations, 
//     resignation, 
//     loading, 
//     error, 
//     fetchEmployeeResignations, 
//     withdrawResignation, 
//     requestFNF 
//   } = useResignationStore();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
//   const [showRequestFNFConfirm, setShowRequestFNFConfirm] = useState(false);

//   useEffect(() => {
//     fetchEmployeeResignations();
//   }, [fetchEmployeeResignations]);

//   const handleWithdrawResignation = async () => {
//     try {
//       await withdrawResignation();
//       // If you want to show a success toast from react-hot-toast:
//       // toast.success("Resignation withdrawn successfully!");
//     } catch (err) {
//       // If you want to show an error toast:
//       // toast.error("Error withdrawing resignation.");
//     } finally {
//       setShowWithdrawConfirm(false);
//     }
//   };

//   const handleRequestFNF = async () => {
//     try {
//       await requestFNF();
//       // If you want to show a success toast:
//       // toast.success("FNF requested successfully!");
//     } catch (err) {
//       // If you want to show an error toast:
//       // toast.error("Error requesting FNF.");
//     } finally {
//       setShowRequestFNFConfirm(false);
//     }
//   };

//   // Refresh the resignation list after submission
//   const handleResignationSubmit = async () => {
//     setIsModalOpen(false);
//     await fetchEmployeeResignations();
//   };

//   if (loading) {
//     return <p className="text-center p-4">Loading...</p>;
//   }

//   if (error) {
//     return <p className="text-center p-4 text-red-600">{error}</p>;
//   }

//   return (
//     <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 p-6 min-h-screen">
      

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Resignation Dashboard</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           Submit Resignation
//         </button>
//       </div>

//       {/* Resignation Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {resignation ? (
//           <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
//             <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
//               Resignation Details
//             </h2>
//             <p className="mt-2">
//               <span className="font-semibold">Status: </span>
//               <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
//                 {resignation.status}
//               </span>
//             </p>
//             {resignation.status === "Pending" && (
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//                 Awaiting manager approvals.
//               </p>
//             )}
//             {resignation.status === "Approved" && (
//               <>
//                 <p className="mt-2">Your resignation has been approved.</p>
//                 <p className="mt-2 font-semibold">Approved By:</p>
//                 <ul className="text-sm text-gray-600 dark:text-gray-400">
//                   {resignation.approvers?.map((approver) => (
//                     <li key={approver._id}>
//                       {approver.manager.first_Name} {approver.manager.last_Name} (
//                       {approver.manager.employee_Id})
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//             {resignation.status === "Rejected" && (
//               <p className="mt-2">Your resignation has been rejected.</p>
//             )}
//             <p className="mt-2 font-semibold">
//               Requested At: {new Date(resignation.createdAt).toLocaleString()}
//             </p>
//             {resignation.status === "Pending" && (
//               <button
//                 onClick={() => setShowWithdrawConfirm(true)}
//                 className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-800"
//               >
//                 Withdraw Resignation
//               </button>
//             )}
//           </div>
//         ) : (
//           <p>No recent resignations found.</p>
//         )}

//         {/* FNF Details */}
//         <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
//           <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
//             FNF Details
//           </h2>
//           <p className="mt-2">
//             <span className="font-semibold">Status: </span>
//             <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
//               Pending
//             </span>
//           </p>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//             FNF has been requested. Awaiting approval.
//           </p>
//           <button
//             onClick={() => setShowRequestFNFConfirm(true)}
//             className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
//           >
//             Request FNF
//           </button>
//         </div>
//       </div>

//       {/* Resignation Records Table */}
//       <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-5">
//         <h2 className="text-lg font-semibold mb-4">Resignation Records</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
//                 <th className="p-2 border dark:border-gray-600">S.L</th>
//                 <th className="p-2 border dark:border-gray-600">Employee Name</th>
//                 <th className="p-2 border dark:border-gray-600">Employee ID</th>
//                 <th className="p-2 border dark:border-gray-600">Resignation Date</th>
//                 <th className="p-2 border dark:border-gray-600">Last Working Day</th>
//                 <th className="p-2 border dark:border-gray-600">Comments</th>
//                 <th className="p-2 border dark:border-gray-600">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {resignations.length > 0 ? (
//                 resignations.map((row, index) => (
//                   <tr key={row._id} className="border dark:border-gray-600">
//                     <td className="p-2 border dark:border-gray-600">{index + 1}</td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {row.employee?.first_Name} {row.employee?.last_Name}
//                     </td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {row.employee?.employee_Id}
//                     </td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {new Date(row.resignationDate).toLocaleDateString()}
//                     </td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {new Date(row.lastWorkingDay).toLocaleDateString()}
//                     </td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {row.comments}
//                     </td>
//                     <td className="p-2 border dark:border-gray-600">
//                       {row.status}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center p-4">
//                     No resignation history found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Submit Resignation Modal */}
//       <SubmitResignationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleResignationSubmit}
//       />

//       {/* Confirmation Dialog for Withdrawing Resignation */}
//       <ConfirmationDialog
//         open={showWithdrawConfirm}
//         title="Withdraw Resignation"
//         message="Are you sure you want to withdraw your resignation request?"
//         onConfirm={handleWithdrawResignation}
//         onCancel={() => setShowWithdrawConfirm(false)}
//         confirmText="Yes, Withdraw"
//         cancelText="Cancel"
//       />

//       {/* Confirmation Dialog for FNF Request */}
//       <ConfirmationDialog
//         open={showRequestFNFConfirm}
//         title="Request FNF"
//         message="Are you sure you want to request Full and Final Settlement?"
//         onConfirm={handleRequestFNF}
//         onCancel={() => setShowRequestFNFConfirm(false)}
//         confirmText="Yes, Request"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SubmitResignationModal from "./model/SubmitResignationModal";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import useResignationStore from "../../store/useResignationStore";

// ----------------------------------
// Modal to show FNF details
// ----------------------------------
function FnfDetailsModal({ isOpen, onClose, fnf }) {
  if (!isOpen) return null;

  // If fnf is null, we can show a message that no details exist yet.
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center p-4">
      {/* Modal backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">FNF Details</h2>
        {fnf ? (
          <>
            <p>
              <strong>Status:</strong> {fnf.status}
            </p>
            <p>
              <strong>FNF Amount:</strong> {fnf.fnfAmount}
            </p>
            <p>
              <strong>Deductions:</strong> {fnf.deductions}
            </p>
            <p>
              <strong>Net Payable:</strong> {fnf.netPayable}
            </p>
            {fnf.processedBy && (
              <div className="mt-2">
                <p>
                  <strong>Processed By:</strong>{" "}
                  {fnf.processedBy.first_Name} {fnf.processedBy.last_Name} (
                  {fnf.processedBy.employee_Id})
                </p>
                <p>
                  <strong>Processed At:</strong>{" "}
                  {fnf.processedAt
                    ? new Date(fnf.processedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            )}
          </>
        ) : (
          <p>No FNF record found yet.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ----------------------------------
// Main SubmitResignation component
// ----------------------------------
export default function SubmitResignation() {
  const {
    resignations,
    resignation,
    employeeFnf,
    loading,
    error,
    fetchEmployeeResignations,
    fetchEmployeeFnf,
    withdrawResignation,
    requestFNF,
  } = useResignationStore();

  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showRequestFNFConfirm, setShowRequestFNFConfirm] = useState(false);

  // Control whether we show the FNF modal
  const [showFnfModal, setShowFnfModal] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    fetchEmployeeResignations();
    fetchEmployeeFnf();
  }, [fetchEmployeeResignations, fetchEmployeeFnf]);

  // Handlers
  const handleWithdrawResignation = async () => {
    try {
      await withdrawResignation();
      toast.success("Resignation withdrawn successfully!");
    } catch (err) {
      toast.error("Error withdrawing resignation.");
    } finally {
      setShowWithdrawConfirm(false);
    }
  };

  const handleRequestFNF = async () => {
    try {
      await requestFNF();
      toast.success("FNF requested successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error requesting FNF.");
    } finally {
      setShowRequestFNFConfirm(false);
    }
  };

  const handleResignationSubmit = async () => {
    setIsModalOpen(false);
    // Refresh data
    await fetchEmployeeResignations();
    await fetchEmployeeFnf();
  };

  // Loading / Error states
  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }



  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Resignation Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit Resignation
        </button>
      </div>

      {/* Resignation Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column: current resignation */}
        {resignation ? (
          <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Resignation Details
            </h2>
            <p className="mt-2">
              <span className="font-semibold">Status: </span>
              <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
                {resignation.status}
              </span>
            </p>
            {resignation.status === "Pending" && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Awaiting manager approvals.
              </p>
            )}
            {resignation.status === "Approved" && (
              <>
                <p className="mt-2">Your resignation has been approved.</p>
                <p className="mt-2 font-semibold">Approved By:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400">
                  {resignation.approvers?.map((approver) => (
                    <li key={approver._id}>
                      {approver.manager.first_Name} {approver.manager.last_Name} (
                      {approver.manager.employee_Id})
                    </li>
                  ))}
                </ul>
              </>
            )}
            {resignation.status === "Rejected" && (
              <p className="mt-2">Your resignation has been rejected.</p>
            )}
            <p className="mt-2 font-semibold">
              Requested At: {new Date(resignation.createdAt).toLocaleString()}
            </p>
            {resignation.status === "Pending" && (
              <button
                onClick={() => setShowWithdrawConfirm(true)}
                className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-800"
              >
                Withdraw Resignation
              </button>
            )}
          </div>
        ) : (
          <p>No recent resignations found.</p>
        )}

        {/* Right column: FNF Details */}
        <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            FNF Details
          </h2>

          {resignation && resignation.status === "Approved" ? (
            <>
              <p className="mt-2">
                <span className="font-semibold">Status: </span>
                <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
                  {/* If we have an FNF record, display its status; otherwise fallback */}
                  {employeeFnf?.status || "No FNF record yet"}
                </span>
              </p>

              {/* If FNF record exists, you can show more info or a small message */}
              {employeeFnf ? (
                <>
                  {employeeFnf.status === "Processed" ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      FNF is processed. View details below.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      FNF request is in progress or pending.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  You haven’t requested FNF yet.
                </p>
              )}

              {/* Always show BOTH buttons */}
              <div className="mt-4 space-x-4">
                {/* Request FNF button */}
                <button
                  onClick={() => setShowRequestFNFConfirm(true)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  Request FNF
                </button>

                {/* View FNF Details button */}
                <button
                  onClick={() => setShowFnfModal(true)}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  View FNF Details
                </button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              FNF is only available once your resignation is approved.
            </p>
          )}
        </div>
      </div>

      {/* Resignation Records Table */}
      <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Resignation Records</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <th className="p-2 border dark:border-gray-600">S.L</th>
                <th className="p-2 border dark:border-gray-600">Employee Name</th>
                <th className="p-2 border dark:border-gray-600">Employee ID</th>
                <th className="p-2 border dark:border-gray-600">
                  Resignation Date
                </th>
                <th className="p-2 border dark:border-gray-600">
                  Last Working Day
                </th>
                <th className="p-2 border dark:border-gray-600">Comments</th>
                <th className="p-2 border dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {resignations.length > 0 ? (
                resignations.map((row, index) => (
                  <tr key={row._id} className="border dark:border-gray-600">
                    <td className="p-2 border dark:border-gray-600">
                      {index + 1}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.employee?.first_Name} {row.employee?.last_Name}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.employee?.employee_Id}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.resignationDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.lastWorkingDay).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.comments}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No resignation history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Resignation Modal */}
      <SubmitResignationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleResignationSubmit}
      />

      {/* Confirmation Dialog for Withdraw */}
      <ConfirmationDialog
        open={showWithdrawConfirm}
        title="Withdraw Resignation"
        message="Are you sure you want to withdraw your resignation request?"
        onConfirm={handleWithdrawResignation}
        onCancel={() => setShowWithdrawConfirm(false)}
        confirmText="Yes, Withdraw"
        cancelText="Cancel"
      />

      {/* Confirmation Dialog for Request FNF */}
      <ConfirmationDialog
        open={showRequestFNFConfirm}
        title="Request FNF"
        message="Are you sure you want to request Full and Final Settlement?"
        onConfirm={handleRequestFNF}
        onCancel={() => setShowRequestFNFConfirm(false)}
        confirmText="Yes, Request"
        cancelText="Cancel"
      />

      {/* FNF Details Modal */}
      <FnfDetailsModal
        isOpen={showFnfModal}
        onClose={() => setShowFnfModal(false)}
        fnf={employeeFnf}
      />
    </div>
  );
}
