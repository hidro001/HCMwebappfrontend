
// import React, { useEffect, useState } from "react";
// import { useRequestsStore } from "../../../store/useRequestsStore";
// import RequestModal from "./RequestModal";
// import { FaPaperPlane } from "react-icons/fa";
// import { motion } from "framer-motion";
// import ConfirmationDialog from "../../common/ConfirmationDialog";

// /**
//  * Simple Tab config
//  */
// const tabs = [
//   { key: "Hike", label: "Hike" },
//   { key: "Advance", label: "Advance" },
//   { key: "Reimbursement", label: "Reimbursement" },
//   { key: "Loan", label: "Loan" },
// ];

// const RequestDashboard = () => {
//   const { requests, loading, fetchRequests } = useRequestsStore();
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("Hike");
//   const [confirmDialog, setConfirmDialog] = useState({
//     open: false,
//     title: "",
//     message: "",
//     onConfirm: () => {},
//   });

//   useEffect(() => {
//     fetchRequests();
//     // eslint-disable-next-line
//   }, []);

//   // Group by type
//   const getRequestsByType = (type) => {
//     return requests.filter((r) => r.type === type);
//   };

//   const openMediaInNewTab = (url) => {
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };
//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   // Example usage of confirmation dialog (you can adapt as needed):
//   const handleDangerAction = () => {
//     setConfirmDialog({
//       open: true,
//       title: "Danger Action",
//       message: "Are you sure you want to proceed?",
//       onConfirm: () => {
//         // Perform dangerous action
//         setConfirmDialog({ ...confirmDialog, open: false });
//       },
//     });
//   };

//   const handleCancelConfirm = () => {
//     setConfirmDialog({ ...confirmDialog, open: false });
//   };

//   return (
//     <div className="p-4 dark:bg-slate-900 min-h-screen dark:text-white">
 

//       {/* ConfirmationDialog example (toggle open with handleDangerAction) */}
//       <ConfirmationDialog
//         open={confirmDialog.open}
//         title={confirmDialog.title}
//         message={confirmDialog.message}
//         onConfirm={confirmDialog.onConfirm}
//         onCancel={handleCancelConfirm}
//       />

//       {/* Heading / Submit Button */}
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-semibold">Request Hike Advance Reimbursement Dashboard</h1>
//         <button
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           onClick={handleOpenModal}
//         >
//           <FaPaperPlane />
//           <span>Submit Request</span>
//         </button>
//       </div>

//       {/* Custom Tabs */}
//       <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`py-2 px-4 focus:outline-none ${
//               activeTab === tab.key
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-600 dark:text-gray-300"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Loading Spinner */}
//       {loading && (
//         <div className="flex justify-center my-5">
//           <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* No requests */}
//       {!loading && requests.length === 0 && (
//         <p className="text-center text-gray-500">No requests submitted yet.</p>
//       )}

//       {/* Render Active Tab */}
//       <motion.div
//         key={activeTab}
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//       >
//         {activeTab === "Hike" && (
//           <RequestsTable
//             requests={getRequestsByType("Hike")}
//             openMediaInNewTab={openMediaInNewTab}
//             columns={[
//               "Employee ID",
//               "Salary Hike (%)",
//               "Reason",
//               "Status",
//               "Requested At",
//               "Processed At",
//               "Remarks",
//               "Media",
//             ]}
//           />
//         )}

//         {activeTab === "Advance" && (
//           <RequestsTable
//             requests={getRequestsByType("Advance")}
//             openMediaInNewTab={openMediaInNewTab}
//             columns={[
//               "Employee ID",
//               "Amount",
//               "Reason",
//               "Status",
//               "Requested At",
//               "Processed At",
//               "Remarks",
//               "Media",
//             ]}
//           />
//         )}

//         {activeTab === "Reimbursement" && (
//           <RequestsTable
//             requests={getRequestsByType("Reimbursement")}
//             openMediaInNewTab={openMediaInNewTab}
//             columns={[
//               "Employee ID",
//               "Amount",
//               "Reason",
//               "Status",
//               "Requested At",
//               "Processed At",
//               "Remarks",
//               "Documents",
//             ]}
//           />
//         )}

//         {activeTab === "Loan" && (
//           <RequestsTable
//             requests={getRequestsByType("Loan")}
//             openMediaInNewTab={openMediaInNewTab}
//             columns={[
//               "Employee ID",
//               "Amount",
//               "Tenure (months)",
//               "Interest Rate (%)",
//               "Monthly Repayment",
//               "Total Repayment",
//               "Reason",
//               "Status",
//               "Requested At",
//               "Processed At",
//               "Remarks",
//               "Media",
//             ]}
//           />
//         )}
//       </motion.div>

//       {/* Request Modal */}
//       <RequestModal isOpen={showModal} onClose={handleCloseModal} />
//     </div>
//   );
// };

// /**
//  * Renders a table of requests.
//  */
// const RequestsTable = ({ requests, openMediaInNewTab, columns }) => {
//   if (!requests || requests.length === 0) {
//     return (
//       <p className="text-center text-gray-500 dark:text-gray-400">
//         No requests found for this category.
//       </p>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border border-gray-200 dark:border-gray-700">
//         <thead className="bg-gray-100 dark:bg-gray-800">
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col}
//                 className="px-4 py-2 text-left text-sm font-semibold dark:text-gray-200"
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//           {requests.map((req) => (
//             <tr key={req._id} className="dark:text-gray-200">
//               {/*  Render different columns depending on type */}
//               {renderCells(req, columns, openMediaInNewTab)}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// /**
//  * Dynamically renders the row cells based on the columns array.
//  */
// const renderCells = (request, columns, openMediaInNewTab) => {
//   return columns.map((col) => {
//     switch (col) {
//       case "Employee ID":
//         return <td className="px-4 py-2" key={`${request._id}-emp`}>{request.employeeId}</td>;

//       case "Salary Hike (%)":
//         return <td className="px-4 py-2" key={`${request._id}-hike`}>{request.salaryHikePercentage ?? "N/A"}</td>;

//       case "Amount":
//         return <td className="px-4 py-2" key={`${request._id}-amount`}>{request.amount ? `₹${request.amount}` : "N/A"}</td>;

//       case "Tenure (months)":
//         return <td className="px-4 py-2" key={`${request._id}-tenure`}>{request.tenure ?? "N/A"}</td>;

//       case "Interest Rate (%)":
//         return <td className="px-4 py-2" key={`${request._id}-irate`}>{request.interestRate ?? "N/A"}</td>;

//       case "Monthly Repayment":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-mrep`}>
//             {request.monthlyRepayment ? `₹${request.monthlyRepayment.toFixed(2)}` : "N/A"}
//           </td>
//         );

//       case "Total Repayment":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-trep`}>
//             {request.totalRepayment ? `₹${request.totalRepayment.toFixed(2)}` : "N/A"}
//           </td>
//         );

//       case "Reason":
//         return <td className="px-4 py-2" key={`${request._id}-reason`}>{request.reason}</td>;

//       case "Status":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-status`}>
//             <span
//               className={`px-2 py-1 text-xs rounded ${
//                 request.status === "Approved"
//                   ? "bg-green-500 text-white"
//                   : request.status === "Rejected"
//                   ? "bg-red-500 text-white"
//                   : "bg-yellow-400 text-black"
//               }`}
//             >
//               {request.status}
//             </span>
//           </td>
//         );

//       case "Requested At":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-reqAt`}>
//             {new Date(request.requestedAt).toLocaleString()}
//           </td>
//         );

//       case "Processed At":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-procAt`}>
//             {request.processedAt ? new Date(request.processedAt).toLocaleString() : "N/A"}
//           </td>
//         );

//       case "Remarks":
//         return <td className="px-4 py-2" key={`${request._id}-remarks`}>{request.remarks || "N/A"}</td>;

//       case "Documents":
//       case "Media":
//         return (
//           <td className="px-4 py-2" key={`${request._id}-media`}>
//             {request.documents && request.documents.length > 0 ? (
//               request.documents.map((doc, index) => (
//                 <button
//                   key={index}
//                   className="inline-block px-3 py-1 m-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                   onClick={() => openMediaInNewTab(doc)}
//                 >
//                   View {col} {index + 1}
//                 </button>
//               ))
//             ) : (
//               <span>-</span>
//             )}
//           </td>
//         );

//       default:
//         return (
//           <td className="px-4 py-2" key={`${request._id}-default-${col}`}>
//             -
//           </td>
//         );
//     }
//   });
// };

// export default RequestDashboard;


// components/RequestDashboard.jsx

import React, { useEffect, useState } from "react";
import { useRequestsStore } from "../../../store/useRequestsStore";
import RequestModal from "./RequestModal";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import ConfirmationDialog from "../../common/ConfirmationDialog";

// Simple tab configuration
const tabs = [
  { key: "Hike", label: "Hike" },
  { key: "Advance", label: "Advance" },
  { key: "Reimbursement", label: "Reimbursement" },
  { key: "Loan", label: "Loan" },
];

const RequestDashboard = () => {
  const { requests, loading, fetchRequests } = useRequestsStore();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Hike");
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line
  }, []);

  // Group requests by type
  const getRequestsByType = (type) => {
    return requests.filter((r) => r.type === type);
  };

  const openMediaInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Example usage of ConfirmationDialog (you can adapt this as needed):
  const handleDangerAction = () => {
    setConfirmDialog({
      open: true,
      title: "Danger Action",
      message: "Are you sure you want to proceed?",
      onConfirm: () => {
        // Perform dangerous action here
        setConfirmDialog({ ...confirmDialog, open: false });
      },
    });
  };

  const handleCancelConfirm = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  return (
    <div className="p-4 dark:bg-slate-900 min-h-screen dark:text-white">
      {/* ConfirmationDialog example (toggle open with handleDangerAction) */}
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={handleCancelConfirm}
      />

      {/* Heading / Submit Button */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          Request Hike Advance Reimbursement Dashboard
        </h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleOpenModal}
        >
          <FaPaperPlane />
          <span>Submit Request</span>
        </button>
      </div>

      {/* Custom Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 focus:outline-none ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-5">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* No requests */}
      {!loading && requests.length === 0 && (
        <p className="text-center text-gray-500">
          No requests submitted yet.
        </p>
      )}

      {/* Render Active Tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
      >
        {activeTab === "Hike" && (
          <RequestsTable
            requests={getRequestsByType("Hike")}
            openMediaInNewTab={openMediaInNewTab}
            columns={[
              "Employee ID",
              "Salary Hike (%)",
              "Reason",
              "Status",
              "Requested At",
              "Processed At",
              "Remarks",
              "Media",
            ]}
          />
        )}

        {activeTab === "Advance" && (
          <RequestsTable
            requests={getRequestsByType("Advance")}
            openMediaInNewTab={openMediaInNewTab}
            columns={[
              "Employee ID",
              "Amount",
              "Reason",
              "Status",
              "Requested At",
              "Processed At",
              "Remarks",
              "Media",
            ]}
          />
        )}

        {activeTab === "Reimbursement" && (
          <RequestsTable
            requests={getRequestsByType("Reimbursement")}
            openMediaInNewTab={openMediaInNewTab}
            columns={[
              "Employee ID",
              "Amount",
              "Reason",
              "Status",
              "Requested At",
              "Processed At",
              "Remarks",
              "Documents",
            ]}
          />
        )}

        {activeTab === "Loan" && (
          <RequestsTable
            requests={getRequestsByType("Loan")}
            openMediaInNewTab={openMediaInNewTab}
            columns={[
              "Employee ID",
              "Amount",
              "Tenure (months)",
              "Interest Rate (%)",
              "Monthly Repayment",
              "Total Repayment",
              "Reason",
              "Status",
              "Requested At",
              "Processed At",
              "Remarks",
              "Media",
            ]}
          />
        )}
      </motion.div>

      {/* Request Modal */}
      <RequestModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

/**
 * Renders a table of requests with solid borders for each cell.
 */
const RequestsTable = ({ requests, openMediaInNewTab, columns }) => {
  if (!requests || requests.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No requests found for this category.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {columns.map((col) => (
              <th
                key={col}
                className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-sm font-semibold dark:text-gray-200"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="dark:text-gray-200">
              {renderCells(req, columns, openMediaInNewTab)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Dynamically renders each cell based on the columns array.
 * Adds a consistent border around each td.
 */
const renderCells = (request, columns, openMediaInNewTab) => {
  // Common classes for each <td>
  const baseTdClasses =
    "border border-gray-200 dark:border-gray-700 px-4 py-2";

  return columns.map((col) => {
    switch (col) {
      case "Employee ID":
        return (
          <td className={baseTdClasses} key={`${request._id}-emp`}>
            {request.employeeId}
          </td>
        );

      case "Salary Hike (%)":
        return (
          <td className={baseTdClasses} key={`${request._id}-hike`}>
            {request.salaryHikePercentage ?? "N/A"}
          </td>
        );

      case "Amount":
        return (
          <td className={baseTdClasses} key={`${request._id}-amount`}>
            {request.amount ? `₹${request.amount}` : "N/A"}
          </td>
        );

      case "Tenure (months)":
        return (
          <td className={baseTdClasses} key={`${request._id}-tenure`}>
            {request.tenure ?? "N/A"}
          </td>
        );

      case "Interest Rate (%)":
        return (
          <td className={baseTdClasses} key={`${request._id}-irate`}>
            {request.interestRate ?? "N/A"}
          </td>
        );

      case "Monthly Repayment":
        return (
          <td className={baseTdClasses} key={`${request._id}-mrep`}>
            {request.monthlyRepayment
              ? `₹${request.monthlyRepayment.toFixed(2)}`
              : "N/A"}
          </td>
        );

      case "Total Repayment":
        return (
          <td className={baseTdClasses} key={`${request._id}-trep`}>
            {request.totalRepayment
              ? `₹${request.totalRepayment.toFixed(2)}`
              : "N/A"}
          </td>
        );

      case "Reason":
        return (
          <td className={baseTdClasses} key={`${request._id}-reason`}>
            {request.reason}
          </td>
        );

      case "Status":
        return (
          <td className={baseTdClasses} key={`${request._id}-status`}>
            <span
              className={`px-2 py-1 text-xs rounded ${
                request.status === "Approved"
                  ? "bg-green-500 text-white"
                  : request.status === "Rejected"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {request.status}
            </span>
          </td>
        );

      case "Requested At":
        return (
          <td className={baseTdClasses} key={`${request._id}-reqAt`}>
            {new Date(request.requestedAt).toLocaleString()}
          </td>
        );

      case "Processed At":
        return (
          <td className={baseTdClasses} key={`${request._id}-procAt`}>
            {request.processedAt
              ? new Date(request.processedAt).toLocaleString()
              : "N/A"}
          </td>
        );

      case "Remarks":
        return (
          <td className={baseTdClasses} key={`${request._id}-remarks`}>
            {request.remarks || "N/A"}
          </td>
        );

      case "Documents":
      case "Media":
        return (
          <td className={baseTdClasses} key={`${request._id}-media`}>
            {request.documents && request.documents.length > 0 ? (
              request.documents.map((doc, index) => (
                <button
                  key={index}
                  className="inline-block px-3 py-1 m-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => openMediaInNewTab(doc)}
                >
                  View {col} {index + 1}
                </button>
              ))
            ) : (
              <span>-</span>
            )}
          </td>
        );

      default:
        return (
          <td className={baseTdClasses} key={`${request._id}-default-${col}`}>
            -
          </td>
        );
    }
  });
};

export default RequestDashboard;
