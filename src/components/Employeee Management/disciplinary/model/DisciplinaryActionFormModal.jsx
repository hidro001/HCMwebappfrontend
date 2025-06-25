// import React from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import { FaExclamationCircle } from "react-icons/fa";
// import BaseModal from "../../../common/BaseModal";

// const DisciplinaryActionFormModal = ({
//   open,
//   onClose,
//   defaultValues = {},
//   onSubmit,
//   isEdit = false,
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues,
//   });

//   React.useEffect(() => {
//     reset(defaultValues);
//   }, [defaultValues, reset]);

//   const submitHandler = (data) => {
//     onSubmit(data);
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: 50 },
//   };

//   return (
//     <BaseModal isOpen={open} onClose={onClose}>
//       <motion.div
//         variants={modalVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         transition={{ duration: 0.3 }}
//         className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
//       >
//         <div className="flex items-center mb-4">
//           <FaExclamationCircle className="text-indigo-500 mr-2" size={24} />
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//             {isEdit ? "Edit Disciplinary Action" : "Add Disciplinary Action"}
//           </h2>
//         </div>
//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
//           {/* Action Type */}
//           <div>
//             <label
//               htmlFor="actionType"
//               className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Action Type
//             </label>
//             <select
//               id="actionType"
//               className={`w-full px-3 py-2 text-base border ${
//                 errors.actionType
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-600"
//               } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               {...register("actionType", { required: true })}
//             >
//               <option value="" disabled selected>
//                 Select Action Type
//               </option>
//               <option value="verbalWarning">Verbal Warning</option>
//               <option value="writtenWarning">Written Warning</option>
//               <option value="suspension">Suspension</option>
//             </select>
//             {errors.actionType && (
//               <p className="mt-1 text-sm text-red-500 dark:text-red-400">
//                 Action type is required
//               </p>
//             )}
//           </div>

//           {/* Date */}
//           <div>
//             <label
//               htmlFor="date"
//               className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               className={`w-full px-3 py-2 text-base border ${
//                 errors.date
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-600"
//               } rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//               {...register("date", { required: true })}
//             />
//             {errors.date && (
//               <p className="mt-1 text-sm text-red-500 dark:text-red-400">
//                 Date is required
//               </p>
//             )}
//           </div>

//           {/* Notes */}
//           <div>
//             <label
//               htmlFor="notes"
//               className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Notes
//             </label>
//             <textarea
//               id="notes"
//               rows={4}
//               placeholder="Enter additional notes..."
//               className="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
//               {...register("notes")}
//             />
//           </div>

//           {/* Hidden userId field */}
//           <input type="hidden" {...register("userId")} />

//           {/* Buttons */}
//           <div className="flex items-center justify-end space-x-2 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//             >
//               {isEdit ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </BaseModal>
//   );
// };

// export default DisciplinaryActionFormModal;


import React from "react";
import { useForm } from "react-hook-form";
import { 
  FaExclamationCircle, 
  FaCalendarAlt, 
  FaStickyNote, 
  FaTimes,
  FaEdit,
  FaPlus
} from "react-icons/fa";
import { HiX, HiCheck } from "react-icons/hi";
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
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  const watchedActionType = watch("actionType");

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  // Get action type styling
  const getActionTypeStyle = (type) => {
    switch (type) {
      case 'verbalWarning':
        return {
          color: 'text-blue-700 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800'
        };
      case 'writtenWarning':
        return {
          color: 'text-yellow-700 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'suspension':
        return {
          color: 'text-red-700 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'termination':
        return {
          color: 'text-red-800 dark:text-red-300',
          bg: 'bg-red-100 dark:bg-red-900/30',
          border: 'border-red-300 dark:border-red-700'
        };
      default:
        return {
          color: 'text-gray-700 dark:text-gray-300',
          bg: 'bg-gray-50 dark:bg-gray-700/50',
          border: 'border-gray-200 dark:border-gray-600'
        };
    }
  };

  const actionTypeStyle = getActionTypeStyle(watchedActionType);

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg mx-auto overflow-hidden">
        {/* Header */}
        <div className="relative bg-blue-600 dark:bg-blue-700 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                {isEdit ? (
                  <FaEdit className="text-white text-xl" />
                ) : (
                  <FaPlus className="text-white text-xl" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEdit ? "Edit Disciplinary Action" : "Add Disciplinary Action"}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {isEdit ? "Update the disciplinary action details" : "Create a new disciplinary action record"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <HiX className="text-white text-xl" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="space-y-6">
            {/* Action Type */}
            <div className="space-y-2">
              <label
                htmlFor="actionType"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <FaExclamationCircle className="text-gray-500" />
                Action Type
              </label>
              <div className="relative">
                <select
                  id="actionType"
                  className={`w-full px-4 py-3 text-base border-2 ${
                    errors.actionType
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 transition-all duration-200 appearance-none cursor-pointer`}
                  {...register("actionType", { 
                    required: "Please select an action type" 
                  })}
                >
                  <option value="" disabled>
                    Select Action Type
                  </option>
                  <option value="verbalWarning">Verbal Warning</option>
                  <option value="writtenWarning">Written Warning</option>
                  <option value="suspension">Suspension</option>
                  <option value="termination">Termination</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.actionType && (
                <div className="flex items-center gap-2 mt-2">
                  <FaTimes className="text-red-500 text-sm" />
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.actionType.message}
                  </p>
                </div>
              )}
              {/* Action Type Preview */}
              {watchedActionType && (
                <div className={`mt-3 p-3 rounded-lg border ${actionTypeStyle.border} ${actionTypeStyle.bg}`}>
                  <div className="flex items-center gap-2">
                    <FaExclamationCircle className={actionTypeStyle.color} />
                    <span className={`text-sm font-medium ${actionTypeStyle.color}`}>
                      {watchedActionType === 'verbalWarning' && 'Verbal Warning - Informal discussion and counseling'}
                      {watchedActionType === 'writtenWarning' && 'Written Warning - Formal written documentation'}
                      {watchedActionType === 'suspension' && 'Suspension - Temporary removal from duties'}
                      {watchedActionType === 'termination' && 'Termination - End of employment relationship'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <FaCalendarAlt className="text-gray-500" />
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  className={`w-full px-4 py-3 text-base border-2 ${
                    errors.date
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20"
                  } rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 transition-all duration-200`}
                  {...register("date", { 
                    required: "Please select a date",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return selectedDate <= today || "Date cannot be in the future";
                    }
                  })}
                />
              </div>
              {errors.date && (
                <div className="flex items-center gap-2 mt-2">
                  <FaTimes className="text-red-500 text-sm" />
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.date.message}
                  </p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label
                htmlFor="notes"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <FaStickyNote className="text-gray-500" />
                Notes
                <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Enter detailed notes about the disciplinary action, including context, specific incidents, and any relevant information..."
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                  {...register("notes", {
                    maxLength: {
                      value: 500,
                      message: "Notes cannot exceed 500 characters"
                    }
                  })}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {watch("notes")?.length || 0}/500
                </div>
              </div>
              {errors.notes && (
                <div className="flex items-center gap-2 mt-2">
                  <FaTimes className="text-red-500 text-sm" />
                  <p className="text-sm text-red-500 dark:text-red-400">
                    {errors.notes.message}
                  </p>
                </div>
              )}
            </div>

            {/* Hidden userId field */}
            <input type="hidden" {...register("userId")} />

            {/* Warning for severe actions */}
            {(watchedActionType === 'suspension' || watchedActionType === 'termination') && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FaExclamationCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">
                      Important Notice
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {watchedActionType === 'suspension' 
                        ? 'This action will temporarily suspend the employee. Please ensure all proper procedures and documentation are in place.'
                        : 'This action will terminate the employee. Please ensure all legal requirements and documentation are complete before proceeding.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <HiX className="w-4 h-4" />
                  Cancel
                </span>
              </button>
              <button
                type="button"
                onClick={handleSubmit(submitHandler)}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {isEdit ? (
                        <>
                          <FaEdit className="w-4 h-4" />
                          Update Action
                        </>
                      ) : (
                        <>
                          <HiCheck className="w-4 h-4" />
                          Create Action
                        </>
                      )}
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default DisciplinaryActionFormModal;