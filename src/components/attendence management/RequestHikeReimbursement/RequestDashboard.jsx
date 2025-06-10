import { useEffect, useState } from "react";
import { useRequestsStore } from "../../../store/useRequestsStore";
import RequestModal from "./RequestModal";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import { 
  FaPaperPlane, 
  FaMoneyBillWave, 
  FaHandHoldingUsd, 
  FaChartLine,
  FaFileInvoiceDollar,
  FaEye,
  FaClock,
  FaCalendarAlt,
  FaRegComment
} from "react-icons/fa";
import { 
  HiOutlineDocumentText, 
  HiOutlineSparkles,
  HiOutlineChartSquareBar
} from "react-icons/hi";

// Enhanced tab configuration with icons
const tabs = [
  { key: "Advance", label: "Advance", icon: <FaMoneyBillWave /> },
  { key: "Reimbursement", label: "Reimbursement", icon: <FaHandHoldingUsd /> },
  { key: "Loan", label: "Loan", icon: <FaChartLine /> },
];

const RequestDashboard = () => {

  const { requests, loading, fetchRequests } = useRequestsStore();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Advance");
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
    <div className="p-6 dark:bg-slate-900  bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* ConfirmationDialog */}
      <ConfirmationDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={handleCancelConfirm}
      />

      {/* Header Section with Glass Effect */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md bg-white/30 dark:bg-slate-800/30 p-3 rounded-lg shadow-lg mb-3 border border-white/20 dark:border-slate-700/30"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
               Request Hike Advance Reimbursement Dashboard
            </h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            onClick={handleOpenModal}
          >
            <FaPaperPlane />
            <span>New Request</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Custom Tabs with Animations */}
 <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-slate-700"
        >
      <div className="bg-[#E4E9F0] dark:bg-gray-600 px-2 py-2">
        <motion.div 
          className="flex flex-wrap gap-2 justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-2 mx-2  flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 "
                  : "  text-gray-700 dark:text-gray-300 hover:text-slate-500 dark:hover:text-slate-700 "
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* No requests */}
      {!loading && requests.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-12 bg-white dark:bg-slate-800 rounded-2xl shadow-md"
        >
          <HiOutlineDocumentText className="mx-auto text-6xl text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No requests submitted yet.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenModal}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Submit your first request
          </motion.button>
        </motion.div>
      )}

      {/* Render Active Tab with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          // className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 overflow-hidden border border-gray-100 dark:border-slate-700"
        >
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
      </AnimatePresence>

          {/* Request Modal */}
          <RequestModal isOpen={showModal} onClose={handleCloseModal} />
       </motion.div>
    </div>
   
  );
};

/**
 * Modernized table of requests with card-based layout
 */
const RequestsTable = ({ requests, openMediaInNewTab, columns }) => {
  const [viewMode, setViewMode] = useState("auto");
  const [effectiveViewMode, setEffectiveViewMode] = useState("table");

  useEffect(() => {
  const handleResize = () => {
    if (viewMode === "auto") {
      const isMobile = window.innerWidth < 1024;
      setEffectiveViewMode(isMobile ? "cards" : "table");
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => window.removeEventListener("resize", handleResize);
}, [viewMode]);

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center p-10">
        <HiOutlineChartSquareBar className="mx-auto text-5xl text-gray-400 dark:text-gray-500 mb-4" />
        <p className="text-xl text-gray-500 dark:text-gray-400">
          No requests found for this category.
        </p>
      </div>
    );
  }

  // Toggle view between table and cards
// const toggleView = () => {
//   if (effectiveViewMode === "table") {
//     setViewMode("cards");
//     setEffectiveViewMode("cards");
//   } else {
//     setViewMode("table");
//     setEffectiveViewMode("table");
//   }
// };

  // Card view for more mobile-friendly experience
  if (effectiveViewMode === "cards") {
    return (
      <>
        {/* <div className="flex justify-end mb-4">
          <button 
            onClick={toggleView}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
          >
            <HiOutlineDocumentText /> Switch to Table View
          </button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {requests.map((request) => (
            <motion.div 
              key={request._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 dark:bg-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-slate-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="font-medium text-lg flex items-center gap-2">
                  <FaFileInvoiceDollar className="text-blue-600 dark:text-blue-400" />
                  <span>ID: {request.employeeId}</span>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    request.status === "Approved"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : request.status === "Rejected"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              {request.amount && (
                <div className="mb-3 text-2xl font-bold text-blue-700 dark:text-blue-300">
                  ₹{request.amount}
                </div>
              )}

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-start gap-2">
                  <FaRegComment className="mt-1 text-gray-500 dark:text-gray-400" /> 
                  <div>{request.reason}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500 dark:text-gray-400" /> 
                  <div>Requested: {new Date(request.requestedAt).toLocaleString()}</div>
                </div>
                
                {request.processedAt && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-500 dark:text-gray-400" /> 
                    <div>Processed: {new Date(request.processedAt).toLocaleString()}</div>
                  </div>
                )}

                {request.remarks && (
                  <div className="flex items-start gap-2">
                    <FaRegComment className="mt-1 text-gray-500 dark:text-gray-400" /> 
                    <div>Remarks: {request.remarks}</div>
                  </div>
                )}
              </div>

              {request.documents && request.documents.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {request.documents.map((doc, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm shadow-sm"
                      onClick={() => openMediaInNewTab(doc)}
                    >
                      <FaEye /> View {index + 1}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </>
    );
  }

  // Enhanced table view
  return (
    <>
      {/* <div className="flex justify-end mb-4">
        <button 
          onClick={toggleView}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          <HiOutlineChartSquareBar /> Switch to Card View
        </button>
      </div> */}

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-[#F3F4F6] dark:bg-slate-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider "
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
            {requests.map((req) => (
              <motion.tr 
                key={req._id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer "
                >
                {renderCells(req, columns, openMediaInNewTab)}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};


const renderCells = (request, columns, openMediaInNewTab) => {
  const baseTdClasses = "px-6 py-4 whitespace-nowrap text-sm";

  return columns.map((col) => {
    switch (col) {
      case "Employee ID":
        return (
          <td className={`${baseTdClasses} font-medium text-gray-900 dark:text-gray-100`} key={`${request._id}-emp `}>
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
          <td className={`${baseTdClasses}  `} key={`${request._id}-amount`}>
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
          <td className={`${baseTdClasses} `} key={`${request._id}-mrep`}>
            {request.monthlyRepayment
              ? `₹${request.monthlyRepayment.toFixed(2)}`
              : "N/A"}
          </td>
        );

      case "Total Repayment":
        return (
          <td className={`${baseTdClasses} font-medium text-blue-700 dark:text-blue-400`} key={`${request._id}-trep`}>
            {request.totalRepayment
              ? `₹${request.totalRepayment.toFixed(2)}`
              : "N/A"}
          </td>
        );

      case "Reason":
        return (
          <td className={baseTdClasses} key={`${request._id}-reason`}>
            <div className="max-w-xs truncate">{request.reason}</div>
          </td>
        );

      case "Status":
        return (
          <td className={baseTdClasses} key={`${request._id}-status`}>
            <span
              className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-medium ${
                request.status === "Approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : request.status === "Rejected"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : "bg-[#E6C418] text-white dark:bg-yellow-900 dark:text-yellow-200"
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
            <div className="max-w-xs truncate">{request.remarks || "N/A"}</div>
          </td>
        );

      case "Documents":
      case "Media":
        return (
          <td className={baseTdClasses} key={`${request._id}-media`}>
            {request.documents && request.documents.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {request.documents.map((doc, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                    onClick={() => openMediaInNewTab(doc)}
                  >
                    <FaEye /> {index + 1}
                  </motion.button>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 dark:text-gray-500 text-center">-</span>
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