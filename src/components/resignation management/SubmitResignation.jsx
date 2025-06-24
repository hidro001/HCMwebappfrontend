import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiFileText,
  FiDollarSign,
  FiEye,
  FiPlus,
  FiRefreshCw,
  FiX,
  FiUsers,
  FiMessageSquare,
  FiHome,
  FiBriefcase,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";

import SubmitResignationModal from "./model/SubmitResignationModal";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import useResignationStore from "../../store/useResignationStore";
import FnfDetailsModal from "./model/FnfDetailsModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};



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
    await fetchEmployeeResignations();
    await fetchEmployeeFnf();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FiClock className="w-4 h-4" />;
      case "Approved":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiAlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your resignation dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Resignation Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your resignation requests and view FNF details
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm transition-all duration-200"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Submit Resignation
          </motion.button>
        </motion.div>

        {/* Main Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Current Resignation Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Current Resignation
                </h2>
              </div>

              <div className="p-6">
                {resignation ? (
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </span>
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${getStatusStyles(
                          resignation.status
                        )}`}
                      >
                        {getStatusIcon(resignation.status)}
                        <span>{resignation.status}</span>
                      </div>
                    </div>

                    {/* Status-specific messages */}
                    {resignation.status === "Pending" && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <p className="text-sm text-amber-800 dark:text-amber-400 flex items-center">
                          <FiClock className="w-4 h-4 mr-2" />
                          Awaiting manager approvals
                        </p>
                      </div>
                    )}

                    {resignation.status === "Approved" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm text-green-800 dark:text-green-400 flex items-center">
                            <FiCheckCircle className="w-4 h-4 mr-2" />
                            Your resignation has been approved
                          </p>
                        </div>

                        {resignation.approvers &&
                          resignation.approvers.length > 0 && (
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                                <FiUsers className="w-4 h-4 mr-2" />
                                Approved By:
                              </p>
                              <ul className="space-y-1">
                                {resignation.approvers.map((approver) => (
                                  <li
                                    key={approver._id}
                                    className="text-sm text-gray-600 dark:text-gray-400"
                                  >
                                    {approver.manager.first_Name}{" "}
                                    {approver.manager.last_Name} (
                                    {approver.manager.employee_Id})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}

                    {resignation.status === "Rejected" && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-400 flex items-center">
                          <FiXCircle className="w-4 h-4 mr-2" />
                          Your resignation has been rejected
                        </p>
                      </div>
                    )}

                    {/* Requested At */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        Requested:{" "}
                        {new Date(resignation.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {/* Withdraw Button */}
                    {resignation.status === "Pending" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowWithdrawConfirm(true)}
                        className="w-full mt-4 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <FiTrash2 className="w-4 h-4 mr-2" />
                        Withdraw Resignation
                      </motion.button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiFileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Active Resignation
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      You haven't submitted any resignation requests recently.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* FNF Details Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FiDollarSign className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  FNF Details
                </h2>
              </div>

              <div className="p-6">
                {resignation && resignation.status === "Approved" ? (
                  <div className="space-y-4">
                    {/* FNF Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        FNF Status
                      </span>
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${
                          employeeFnf?.status
                            ? getStatusStyles(employeeFnf.status)
                            : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                        }`}
                      >
                        {employeeFnf?.status ? (
                          getStatusIcon(employeeFnf.status)
                        ) : (
                          <FiAlertCircle className="w-4 h-4" />
                        )}
                        <span>{employeeFnf?.status || "Not Requested"}</span>
                      </div>
                    </div>

                    {/* Status Message */}
                    {employeeFnf ? (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          {employeeFnf.status === "Processed"
                            ? "FNF has been processed. View details below."
                            : "FNF request is in progress or pending."}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You haven't requested FNF yet.
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowRequestFNFConfirm(true)}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <FiEdit3 className="w-4 h-4 mr-2" />
                        Request FNF
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowFnfModal(true)}
                        className="px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <FiEye className="w-4 h-4 mr-2" />
                        View Details
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiDollarSign className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      FNF Not Available
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      FNF is only available once your resignation is approved.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Resignation Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FiFileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Resignation History
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              All your previous resignation requests
            </p>
          </div>

          <div className="overflow-x-auto">
            {resignations.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          S.L
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Resignation Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Working Day
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Comments
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {resignations.map((row, index) => (
                        <motion.tr
                          key={row._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {String(index + 1).padStart(2, "0")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                                <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {row.employee?.first_Name}{" "}
                                  {row.employee?.last_Name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  ID: {row.employee?.employee_Id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(row.resignationDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(row.lastWorkingDay).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                            {row.comments || "No comments"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
                                row.status
                              )}`}
                            >
                              {getStatusIcon(row.status)}
                              <span>{row.status}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet Cards */}
                <div className="lg:hidden p-4 space-y-4">
                  {resignations.map((row, index) => (
                    <motion.div
                      key={row._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {row.employee?.first_Name}{" "}
                              {row.employee?.last_Name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {row.employee?.employee_Id}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
                            row.status
                          )}`}
                        >
                          {getStatusIcon(row.status)}
                          <span>{row.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCalendar className="w-4 h-4" />
                          <div>
                            <span className="font-medium">Resignation:</span>
                            <p className="text-gray-900 dark:text-white">
                              {new Date(
                                row.resignationDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiCalendar className="w-4 h-4" />
                          <div>
                            <span className="font-medium">Last Working:</span>
                            <p className="text-gray-900 dark:text-white">
                              {new Date(
                                row.lastWorkingDay
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {row.comments && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <FiMessageSquare className="w-4 h-4 mt-0.5" />
                            <div>
                              <span className="font-medium">Comments:</span>
                              <p className="text-gray-900 dark:text-white mt-1">
                                {row.comments}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiFileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Resignation History
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You haven't submitted any resignation requests yet.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Modals and Dialogs */}
        <AnimatePresence>
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
            message="Are you sure you want to withdraw your resignation request? This action cannot be undone."
            onConfirm={handleWithdrawResignation}
            onCancel={() => setShowWithdrawConfirm(false)}
            confirmText="Yes, Withdraw"
            cancelText="Cancel"
            type="warning"
          />

          {/* Confirmation Dialog for Request FNF */}
          <ConfirmationDialog
            open={showRequestFNFConfirm}
            title="Request FNF"
            message="Are you sure you want to request Full and Final Settlement? This will initiate the FNF process."
            onConfirm={handleRequestFNF}
            onCancel={() => setShowRequestFNFConfirm(false)}
            confirmText="Yes, Request"
            cancelText="Cancel"
            type="info"
          />

          {/* FNF Details Modal */}
          {showFnfModal && (
            <FnfDetailsModal
              isOpen={showFnfModal}
              onClose={() => setShowFnfModal(false)}
              fnf={employeeFnf}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
