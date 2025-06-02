import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaExclamationCircle } from "react-icons/fa";
import BaseModal from "../../../common/BaseModal";

const DisciplinaryActionFormModal = ({
  open,
  onClose,
  defaultValues = {},
  onSubmit,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="flex items-center mb-4">
          <FaExclamationCircle className="text-indigo-500 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEdit ? "Edit Disciplinary Action" : "Add Disciplinary Action"}
          </h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Action Type */}
          <div>
            <label
              htmlFor="actionType"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Action Type
            </label>
            <select
              id="actionType"
              className={`w-full px-3 py-2 text-base border ${
                errors.actionType
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              {...register("actionType", { required: true })}
            >
              <option value="" disabled selected>
                Select Action Type
              </option>
              <option value="verbalWarning">Verbal Warning</option>
              <option value="writtenWarning">Written Warning</option>
              <option value="suspension">Suspension</option>
            </select>
            {errors.actionType && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                Action type is required
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className={`w-full px-3 py-2 text-base border ${
                errors.date
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              {...register("date", { required: true })}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                Date is required
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Enter additional notes..."
              className="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              {...register("notes")}
            />
          </div>

          {/* Hidden userId field */}
          <input type="hidden" {...register("userId")} />

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </BaseModal>
  );
};

export default DisciplinaryActionFormModal;
