
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import BaseModal from "../../common/BaseModal";  // Your custom modal
import { useKpiStore } from "../../../store/useKpiStore";

function AddKpiModal({ isOpen, onClose }) {
  const { addKpi } = useKpiStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, weight } = data;
    // Attempt to add
    await addKpi(name, Number(weight));
    // If successful, close the modal and reset
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-md shadow-lg w-full max-w-md mx-4 p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Add New KPI
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="addKpiName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    KPI Name
                  </label>
                  <input
                    id="addKpiName"
                    {...register("name", { required: true })}
                    className="mt-1 block w-full border border-gray-300 
                      rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 
                      dark:text-gray-100 focus:outline-none 
                      focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Sales, Behavior..."
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      KPI Name is required.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="addKpiWeight"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Weight (%)
                  </label>
                  <input
                    id="addKpiWeight"
                    type="number"
                    step="0.1"
                    {...register("weight", {
                      required: true,
                      min: 0,
                      max: 100,
                    })}
                    className="mt-1 block w-full border border-gray-300 
                      rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 
                      dark:text-gray-100 focus:outline-none 
                      focus:ring-1 focus:ring-blue-500"
                    placeholder="0 - 100"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1">
                      Weight must be between 0 and 100.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded border border-orange-500 text-orange-500 
                    hover:bg-orange-100 dark:hover:bg-orange-600 
                    dark:hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white 
                    hover:bg-blue-700 transition dark:bg-blue-500 
                    dark:hover:bg-blue-600"
                >
                  Add KPI
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}

export default AddKpiModal;
