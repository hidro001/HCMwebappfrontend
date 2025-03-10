

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRequestsStore } from "../../../store/useRequestsStore";
import BaseModal from "../../../components/common/BaseModal"; // Adjust the path as needed
import FullScreenLoader from "../../../components/common/FullScreenLoader"; // <-- Import your loader

const RequestModal = ({ isOpen, onClose }) => {
  const { submitRequest } = useRequestsStore();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [documents, setDocuments] = useState([]);
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  const resetForm = () => {
    setType("");
    setAmount("");
    setReason("");
    setDocuments([]);
    setTenure("");
    setInterestRate("");
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const employeeId = localStorage.getItem("employeeId");
    if (!employeeId) {
      // You could show a toast or alert here.
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", employeeId);
    formData.append("type", type);
    if (type !== "Hike") {
      formData.append("amount", amount);
    }
    formData.append("reason", reason);

    if (type === "Loan") {
      formData.append("tenure", tenure);
      formData.append("interestRate", interestRate);
    }

    if (type === "Reimbursement" && documents.length > 0) {
      for (let i = 0; i < documents.length; i++) {
        formData.append("documents", documents[i]);
      }
    }

    const success = await submitRequest(formData);
    setIsSubmitting(false);

    if (success) {
      handleClose();
    }
  };

  return (
    <>
      {/* If we're submitting, show full-screen loader. */}
      {isSubmitting && <FullScreenLoader />}

      <AnimatePresence>
        {isOpen && (
          <BaseModal isOpen={isOpen} onClose={handleClose}>
            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-md shadow-xl w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6"
              initial={{ translateY: 50, scale: 0.95 }}
              animate={{ translateY: 0, scale: 1 }}
              exit={{ translateY: 50, scale: 0.95 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={handleClose}
                disabled={isSubmitting} // optionally disable close while submitting
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Submit Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Request Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block mb-1 font-medium dark:text-gray-200"
                  >
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select</option>
                    {/* <option value="Hike">Hike</option> */}
                    <option value="Advance">Advance</option>
                    <option value="Reimbursement">Reimbursement</option>
                    <option value="Loan">Loan</option>
                  </select>
                </div>

                {/* Amount */}
                {(type === "Advance" ||
                  type === "Reimbursement" ||
                  type === "Loan") && (
                  <div>
                    <label
                      htmlFor="amount"
                      className="block mb-1 font-medium dark:text-gray-200"
                    >
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      min="1"
                      placeholder="Enter amount"
                    />
                  </div>
                )}

                {/* Loan Fields */}
                {type === "Loan" && (
                  <>
                    <div>
                      <label
                        htmlFor="tenure"
                        className="block mb-1 font-medium dark:text-gray-200"
                      >
                        Tenure (months) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="tenure"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                        min="1"
                        placeholder="Enter tenure in months"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="interestRate"
                        className="block mb-1 font-medium dark:text-gray-200"
                      >
                        Interest Rate (%){" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="interestRate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                        min="0"
                        step="0.01"
                        placeholder="Enter interest rate"
                      />
                    </div>
                  </>
                )}

                {/* Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    className="block mb-1 font-medium dark:text-gray-200"
                  >
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    rows={3}
                    placeholder="Enter reason for the request"
                  ></textarea>
                </div>

                {/* Documents (Reimbursement) */}
                {type === "Reimbursement" && (
                  <div>
                    <label
                      htmlFor="documents"
                      className="block mb-1 font-medium dark:text-gray-200"
                    >
                      Upload Documents <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="documents"
                      multiple
                      onChange={handleFileChange}
                      className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                      accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Allowed file types: JPG, JPEG, PNG, PDF. Max 5 files.
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    disabled={isSubmitting}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </motion.div>
          </BaseModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default RequestModal;
