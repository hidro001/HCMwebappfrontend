
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";

import BaseModal from "../../common/BaseModal";
import { useKpiStore } from "../../../store/useKpiStore";

function EditKpiModal({ isOpen, onClose, kpiId }) {
  const { kpis, updateKpi } = useKpiStore();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isOpen && kpiId) {
      const foundKpi = kpis.find((k) => k._id === kpiId);
      if (foundKpi) {
        reset({
          name: foundKpi.name,
          weight: foundKpi.weight,
        });
      }
    }
  }, [isOpen, kpiId, kpis, reset]);

  const onSubmit = async (data) => {
    if (!kpiId) return;
    const { name, weight } = data;
    await updateKpi(kpiId, name, Number(weight));
    onClose();
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  if (!isOpen || !kpiId) return null;

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
                Edit KPI
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
                    htmlFor="editKpiName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    KPI Name
                  </label>
                  <input
                    id="editKpiName"
                    {...register("name", { required: true })}
                    className="mt-1 block w-full border border-gray-300 
                      rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 
                      dark:text-gray-100 focus:outline-none 
                      focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="editKpiWeight"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Weight (%)
                  </label>
                  <input
                    id="editKpiWeight"
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
                  />
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
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
}

export default EditKpiModal;
