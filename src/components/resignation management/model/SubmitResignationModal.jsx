import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCalendar, FiMessageSquare, FiAlertCircle, FiFileText, FiSend, FiInfo,} from "react-icons/fi";
import BaseModal from "../../../components/common/BaseModal";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import useResignationStore from "../../../store/useResignationStore";
import toast from "react-hot-toast";
import useDesignationStore from "../../../store/designationStore.js"
import useAuthStore from "../../../store/store";


const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function SubmitResignationModal({ isOpen, onClose, onSubmit }) {

  const { submitResignation, loading } = useResignationStore();
  const {desNotice, fetchDesNoticePeriod } = useDesignationStore()
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors },
    watch 
  } = useForm();
  
   const currentUser = useAuthStore();
   const designation = currentUser?.designation;
 
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [calculatedLastWorkingDay, setCalculatedLastWorkingDay] = useState("");


  const resignationDate = watch("resignationDate");
  const lastWorkingDay = watch("lastWorkingDay");
  
 useEffect(() => {
    if (designation) {
      fetchDesNoticePeriod(designation)
    } else {
      toast.error("No employeeId found in localStorage.");
    }
    
  }, [fetchDesNoticePeriod, designation]);

useEffect(() => {
  if (resignationDate && desNotice !== null && desNotice !== undefined) {
    const date = new Date(resignationDate);
    date.setDate(date.getDate() + Number(desNotice));
    setCalculatedLastWorkingDay(date.toISOString().split("T")[0]);
  }
}, [resignationDate, desNotice]);


  // const getNoticePeriod = () => {
  //   if (resignationDate && lastWorkingDay) {
  //     const start = new Date(resignationDate);
  //     const end = new Date(lastWorkingDay);
  //     const diffTime = Math.abs(end - start);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     return diffDays;
  //   }
  //   return 0;
  // };

  const lastWorkingDayUser = watch("lastWorkingDayUser");

const getNoticePeriod = () => {
  if (resignationDate && lastWorkingDayUser) {
    const start = new Date(resignationDate);
    const end = new Date(lastWorkingDayUser);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
};


  const noticePeriod = getNoticePeriod();

  // const onFormSubmit = (data) => {
  //   setError(null);
    
  //   if (new Date(data.resignationDate) > new Date(data.lastWorkingDay)) {
  //     setError("Last working day must be after resignation date.");
  //     return;
  //   }

  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   const resignationDateObj = new Date(data.resignationDate);
    
  //   if (resignationDateObj < today) {
  //     setError("Resignation date cannot be in the past.");
  //     return;
  //   }

  //   setFormData(data);
  //   setShowConfirm(true);
  // };

const onFormSubmit = (data) => {
  
  setError(null);

  if (!resignationDate) {
    setError("Resignation date is required.");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const resignationDateObj = new Date(data.resignationDate);

  if (resignationDateObj < today) {
    setError("Resignation date cannot be in the past.");
    return;
  }

  const fullData = {
    ...data,
    lastWorkingDayCompany: calculatedLastWorkingDay,
  };
  setFormData(fullData);
  setShowConfirm(true);
};


  const handleConfirmSubmit = async () => {
    try {
      await submitResignation(formData);
      toast.success("Resignation submitted successfully!");
      setShowConfirm(false);
      reset();
      onClose();
      onSubmit();
    } catch (err) {
      toast.error("Failed to submit resignation. Please try again.");
      setShowConfirm(false);
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={handleClose}>
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative bg-white dark:bg-gray-800 w-full max-w-2xl  h-[90vh] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <FiFileText className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                  Submit Resignation
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Please fill in your resignation details carefully
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
                >
                  <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-400">
                      Validation Error
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit(onFormSubmit)}
              className="space-y-6"
            >
              {/* Resignation Date */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="resignationDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <FiCalendar className="w-4 h-4 inline mr-2" />
                  Resignation Date
                </label>
                <input
                  id="resignationDate"
                  type="date"
                  {...register("resignationDate", { 
                    required: "Resignation date is required" 
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.resignationDate && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.resignationDate.message}
                  </p>
                )}
              </motion.div>

              {/* Last Working Day */}
              {/* <motion.div variants={fieldVariants}>
                <label
                  htmlFor="lastWorkingDay"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <FiCalendar className="w-4 h-4 inline mr-2" />
                  Last Working Day
                </label>
                <input
                  id="lastWorkingDay"
                  type="date"
                  {...register("lastWorkingDay", { 
                    required: "Last working day is required" 
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {errors.lastWorkingDay && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.lastWorkingDay.message}
                  </p>
                )}
              </motion.div> */}

              {/* Auto-calculated Last Working Day */}
<motion.div variants={fieldVariants}>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    <FiCalendar className="w-4 h-4 inline mr-2" />
    Last Working Day (Based on Notice Period)
  </label>
  <input
    type="date"
    value={calculatedLastWorkingDay}
    disabled
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
  />
</motion.div>

{/* User-selected Custom Last Working Day */}
<motion.div variants={fieldVariants}>
  <label
    htmlFor="lastWorkingDayUser"
    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
  >
    <FiCalendar className="w-4 h-4 inline mr-2" />
    Custom Last Working Day (Optional)
  </label>
  <input
    id="lastWorkingDayUser"
    type="date"
    {...register("lastWorkingDayUser")}
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
  />
</motion.div>


              {/* Notice Period Info */}
              {resignationDate && lastWorkingDay && noticePeriod > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <FiInfo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-400">
                        Notice Period Information
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Your notice period will be <span className="font-semibold">{noticePeriod} days</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Comments */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  <FiMessageSquare className="w-4 h-4 inline mr-2" />
                  Reason for Resignation
                  <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  placeholder="Please provide a brief reason for your resignation..."
                  {...register("comments")}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  This information will help HR understand your decision better.
                </p>
              </motion.div>

              {/* Important Notice */}
              <motion.div
                variants={fieldVariants}
                className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <FiAlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                      Important Notice
                    </p>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                      <li>• Your resignation will require manager approval</li>
                      <li>• Please ensure you complete all pending tasks</li>
                      <li>• Knowledge transfer should be arranged before your last day</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={fieldVariants}
                className="flex flex-col sm:flex-row gap-3 pt-4"
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Submit Resignation</span>
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </BaseModal>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirm}
        title="Confirm Resignation Submission"
        message={
          formData ? (
            <div className="space-y-3">
              <p>Please confirm the following resignation details:</p>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-sm space-y-2">
                <p><strong>Resignation Date:</strong> {formData.resignationDate ? new Date(formData.resignationDate).toLocaleDateString() : 'N/A'}</p>
                {/* <p><strong>Last Working Day:</strong> {formData.lastWorkingDay ? new Date(formData.lastWorkingDay).toLocaleDateString() : 'N/A'}</p> */}
                {/* <p><strong>Notice Period:</strong> {getNoticePeriod()} days</p>
                {formData.comments && (
                  <p><strong>Reason:</strong> {formData.comments}</p>
                )} */}

              <p><strong>Resignation Date:</strong> {formData.resignationDate ? new Date(formData.resignationDate).toLocaleDateString() : 'N/A'}</p>
<p><strong>Auto Last Working Day:</strong> {formData.lastWorkingDayAuto}</p>
{formData.lastWorkingDayUser && (
  <p><strong>Custom Last Working Day:</strong> {new Date(formData.lastWorkingDayUser).toLocaleDateString()}</p>
)}
<p><strong>Notice Period:</strong> {getNoticePeriod()} days</p>


              </div>
              <p className="text-amber-600 dark:text-amber-400 text-sm">
                ⚠️ Once submitted, this resignation will require manager approval and cannot be easily modified.
              </p>
            </div>
          ) : (
            "Are you sure you want to submit your resignation?"
          )
        }
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowConfirm(false)}
        confirmText="Yes, Submit Resignation"
        cancelText="Cancel"
        loading={loading}
      />
    </>
  );
}