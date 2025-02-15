// import { useEffect, useState } from "react";
// import {
//   getResignationHistory,
//   withdrawResignation,
// } from "../../service/recruitService";
// import { toast } from "react-toastify";
// import SubmitResignationModal from "./model/SubmitResignationModal";

// export default function SubmitResignation() {
//   const [resignations, setResignations] = useState([]);
//   const [latestResignation, setLatestResignation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedResignation, setSelectedResignation] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const data = await getResignationHistory();
//       setResignations(data);
//       if (data.length > 0) {
//         setLatestResignation(data[0]);
//       }
//     } catch (error) {
//       setMessage(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Withdraw resignation
//   const handleWithdrawResignation = async () => {
//     if (!latestResignation) return;

//     try {
//       const response = await withdrawResignation();
//       toast.success(response.message);
//       setLatestResignation(null); // Reset latest resignation after withdrawal
//       await fetchData(); // Refresh data
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const handleRequestFNF = () => {
//     alert("hello");
//   };

//   // Refresh resignation list after submission
//   const handleResignationSubmit = async () => {
//     setIsModalOpen(false);
//     await fetchData();
//   };

//   if (loading) {
//     return <p className="text-center p-4">Loading...</p>;
//   }

//   if (message) {
//     return <p className="text-center p-4 text-red-600">{message}</p>;
//   }

//   return (
//     <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100 p-6 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Resignation Dashboard</h1>
//         <button
//           onClick={() => {
//             setSelectedResignation(null);
//             setIsModalOpen(true);
//           }}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           Submit Resignation
//         </button>
//       </div>

//       {/* Resignation Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {latestResignation ? (
//           <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
//             <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
//               Resignation Details
//             </h2>
//             <p className="mt-2">
//               <span className="font-semibold">Status: </span>
//               <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
//                 {latestResignation.status}
//               </span>
//             </p>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//               Awaiting manager approvals.
//             </p>
//             <p className="mt-2 font-semibold">Approvers:</p>
//             <ul className="text-sm text-gray-600 dark:text-gray-400">
//               {latestResignation.approvers.map((approver, index) => (
//                 <li key={index}>
//                   {approver.manager.first_Name} {approver.manager.last_Name} (
//                   {approver.manager.employee_Id})
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-2 text-sm">
//               <span className="font-semibold">Requested At: </span>
//               {new Date(latestResignation.createdAt).toLocaleString()}
//             </p>
//             <button
//               onClick={handleWithdrawResignation}
//               className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-800"
//             >
//               Withdraw Resignation
//             </button>
//           </div>
//         ) : (
//           <p>No recent resignations found.</p>
//         )}

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
//             onClick={() => handleRequestFNF()}
//             className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
//           >
//             Request FNF
//           </button>
//         </div>
//       </div>

//       {/* Resignation Table */}
//       <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-5">
//         <h2 className="text-lg font-semibold mb-4">Resignation Records</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
//                 <th className="p-2 border dark:border-gray-600">S.L</th>
//                 <th className="p-2 border dark:border-gray-600">
//                   Employee Name
//                 </th>
//                 <th className="p-2 border dark:border-gray-600">Employee ID</th>
//                 <th className="p-2 border dark:border-gray-600">
//                   Resignation Date
//                 </th>
//                 <th className="p-2 border dark:border-gray-600">
//                   Last Working Day
//                 </th>
//                 <th className="p-2 border dark:border-gray-600">Comments</th>
//                 <th className="p-2 border dark:border-gray-600">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {resignations.length > 0 ? (
//                 resignations.map((row, index) => (
//                   <tr key={row._id} className="border dark:border-gray-600">
//                     <td className="p-2 border dark:border-gray-600">
//                       {index + 1}
//                     </td>
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

//       {/* Submit & Update Modal */}
//       <SubmitResignationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleResignationSubmit}
//       />
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubmitResignationModal from "./model/SubmitResignationModal";
import ConfirmationDialog from "../../components/common/ConfirmationDialog"; // Adjust the import path as needed
import useResignationStore from "../../store/useResignationStore";

export default function SubmitResignation() {
  const { 
    resignations, 
    resignation, 
    loading, 
    error, 
    fetchEmployeeResignations, 
    withdrawResignation, 
    requestFNF 
  } = useResignationStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showRequestFNFConfirm, setShowRequestFNFConfirm] = useState(false);

  useEffect(() => {
    fetchEmployeeResignations();
  }, [fetchEmployeeResignations]);

  const handleWithdrawResignation = async () => {
    try {
      await withdrawResignation();
    } catch (err) {
      // errors are handled via toast in the store
    } finally {
      setShowWithdrawConfirm(false);
    }
  };

  const handleRequestFNF = async () => {
    try {
      await requestFNF();
    } catch (err) {
      // errors are handled via toast in the store
    } finally {
      setShowRequestFNFConfirm(false);
    }
  };

  // Refresh the resignation list after submission
  const handleResignationSubmit = async () => {
    setIsModalOpen(false);
    await fetchEmployeeResignations();
  };

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-600">{error}</p>;
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
                      {approver.manager.first_Name} {approver.manager.last_Name} ({approver.manager.employee_Id})
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

        {/* FNF Details */}
        <div className="border border-green-500 p-5 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            FNF Details
          </h2>
          <p className="mt-2">
            <span className="font-semibold">Status: </span>
            <span className="px-2 py-1 text-sm font-medium bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-md">
              Pending
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            FNF has been requested. Awaiting approval.
          </p>
          <button
            onClick={() => setShowRequestFNFConfirm(true)}
            className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800"
          >
            Request FNF
          </button>
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
                <th className="p-2 border dark:border-gray-600">Resignation Date</th>
                <th className="p-2 border dark:border-gray-600">Last Working Day</th>
                <th className="p-2 border dark:border-gray-600">Comments</th>
                <th className="p-2 border dark:border-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {resignations.length > 0 ? (
                resignations.map((row, index) => (
                  <tr key={row._id} className="border dark:border-gray-600">
                    <td className="p-2 border dark:border-gray-600">{index + 1}</td>
                    <td className="p-2 border dark:border-gray-600">
                      {row.employee?.first_Name} {row.employee?.last_Name}
                    </td>
                    <td className="p-2 border dark:border-gray-600">{row.employee?.employee_Id}</td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.resignationDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">
                      {new Date(row.lastWorkingDay).toLocaleDateString()}
                    </td>
                    <td className="p-2 border dark:border-gray-600">{row.comments}</td>
                    <td className="p-2 border dark:border-gray-600">{row.status}</td>
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

      {/* Confirmation Dialog for Withdrawing Resignation */}
      <ConfirmationDialog
        open={showWithdrawConfirm}
        title="Withdraw Resignation"
        message="Are you sure you want to withdraw your resignation request?"
        onConfirm={handleWithdrawResignation}
        onCancel={() => setShowWithdrawConfirm(false)}
        confirmText="Yes, Withdraw"
        cancelText="Cancel"
      />

      {/* Confirmation Dialog for FNF Request */}
      <ConfirmationDialog
        open={showRequestFNFConfirm}
        title="Request FNF"
        message="Are you sure you want to request Full and Final Settlement?"
        onConfirm={handleRequestFNF}
        onCancel={() => setShowRequestFNFConfirm(false)}
        confirmText="Yes, Request"
        cancelText="Cancel"
      />
    </div>
  );
}
