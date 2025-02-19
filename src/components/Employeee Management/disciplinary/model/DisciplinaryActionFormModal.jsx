


// import React from "react";
// import { useForm } from "react-hook-form";
// import BaseModal from "../../../common/BaseModal"; // your custom modal wrapper

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

//   return (
//     <BaseModal isOpen={open} onClose={onClose}>
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
//         <h2 className="text-xl font-bold mb-4">
//           {isEdit ? "Edit Disciplinary Action" : "Add Disciplinary Action"}
//         </h2>
//         <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
//           {/* Action Type */}
//           <div>
//             <label className="block mb-1 font-semibold">Action Type</label>
//             <select
//               className={`w-full border rounded p-2 ${
//                 errors.actionType ? "border-red-500" : "border-gray-300"
//               }`}
//               {...register("actionType", { required: true })}
//             >
//               <option value="">Select Action Type</option>
//               <option value="verbalWarning">Verbal Warning</option>
//               <option value="writtenWarning">Written Warning</option>
//               <option value="suspension">Suspension</option>
//             </select>
//             {errors.actionType && (
//               <p className="text-red-500 text-sm">Action type is required</p>
//             )}
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block mb-1 font-semibold">Date</label>
//             <input
//               type="date"
//               className={`w-full border rounded p-2 ${
//                 errors.date ? "border-red-500" : "border-gray-300"
//               }`}
//               {...register("date", { required: true })}
//             />
//             {errors.date && (
//               <p className="text-red-500 text-sm">Date is required</p>
//             )}
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="block mb-1 font-semibold">Notes</label>
//             <textarea
//               rows={3}
//               className="w-full border border-gray-300 rounded p-2"
//               {...register("notes")}
//             />
//           </div>

//           {/* Hidden userId field */}
//           <input type="hidden" {...register("userId")} />

//           <div className="flex items-center justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="py-2 px-4 border border-transparent rounded bg-blue-600 text-white hover:bg-blue-700"
//             >
//               {isEdit ? "Update" : "Create"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </BaseModal>
//   );
// };

// export default DisciplinaryActionFormModal;


import React from "react";
import { useForm } from "react-hook-form";
import BaseModal from "../../../common/BaseModal"; // your custom modal wrapper

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

  return (
    <BaseModal isOpen={open} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {isEdit ? "Edit Disciplinary Action" : "Add Disciplinary Action"}
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {/* Action Type */}
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Action Type
            </label>
            <select
              className={`w-full border rounded p-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 ${
                errors.actionType ? "border-red-500" : "border-gray-300"
              }`}
              {...register("actionType", { required: true })}
            >
              <option value="">Select Action Type</option>
              <option value="verbalWarning">Verbal Warning</option>
              <option value="writtenWarning">Written Warning</option>
              <option value="suspension">Suspension</option>
            </select>
            {errors.actionType && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Action type is required
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Date
            </label>
            <input
              type="date"
              className={`w-full border rounded p-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
              {...register("date", { required: true })}
            />
            {errors.date && (
              <p className="text-red-500 dark:text-red-400 text-sm">
                Date is required
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Notes
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              {...register("notes")}
            />
          </div>

          {/* Hidden userId field */}
          <input type="hidden" {...register("userId")} />

          <div className="flex items-center justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-gray-300 rounded bg-white hover:bg-gray-100 
                         dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded bg-blue-600 text-white hover:bg-blue-700 
                         dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default DisciplinaryActionFormModal;
