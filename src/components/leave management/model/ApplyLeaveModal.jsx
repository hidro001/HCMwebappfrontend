import React, { useEffect, useState } from "react";
import BaseModal from "../../common/BaseModal";
import { useForm } from "react-hook-form";
import useLeaveStore from "../../../store/leaveStore.js";
import ConfirmationDialog from "../../common/ConfirmationDialog";
import toast from "react-hot-toast";

export default function ApplyLeaveModal({ show, onClose }) {
  const { applyLeave, userProfile, leaveTypes } = useLeaveStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leave_Type: "",
      leave_From: "",
      leave_To: "",
      no_Of_Days: 0,
      reason_For_Leave: "",
      half_Day_Session: "",
      leave_HalfDay: false,
    },
  });

  const leave_From = watch("leave_From");
  const leave_To = watch("leave_To");
  const leave_HalfDay = watch("leave_HalfDay");

  useEffect(() => {
    if (leave_HalfDay && leave_To) {
      setValue("leave_From", leave_To);
    }
  }, [leave_HalfDay, leave_To, setValue]);

  useEffect(() => {
    if (leave_From) {
      const fromDate = new Date(leave_From);
      const toDate = leave_To ? new Date(leave_To) : fromDate;
      let diff =
        Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)) + 1;
      if (diff < 1) diff = 1;
      if (leave_HalfDay) {
        // If half-day and single day, use 0.5; else subtract 0.5 from multi-day leaves
        setValue("no_Of_Days", diff === 1 ? 0.5 : diff - 0.5);
      } else {
        setValue("no_Of_Days", diff);
      }
    } else {
      setValue("no_Of_Days", 0);
    }
  }, [leave_From, leave_To, leave_HalfDay, setValue]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    // Additional validations
    if (data.leave_HalfDay && data.no_Of_Days > 0.5) {
      toast.error("For half-day leaves, the number of days cannot exceed 0.5.");
      return;
    }
    if (new Date(data.leave_From) > new Date(data.leave_To)) {
      toast.error("From date cannot be after To date");
      return;
    }
    if (data.leave_HalfDay && !data.half_Day_Session) {
      toast.error("Please select a session for half-day leave.");
      return;
    }
    setFormData(data);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setConfirmOpen(false);
    try {
      await applyLeave(formData);
      reset();
      onClose();
    } catch (error) {
      // Error is already handled in the store
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <BaseModal isOpen={show} onClose={onClose}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/2 relative">
          <h3 className="text-xl font-bold mb-4">Apply for Leave</h3>
          <div className="mb-4">
            <strong>Paid Leave: </strong>{" "}
            {userProfile ? userProfile.no_of_Paid_Leave : 0}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Leave Type */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Leave Type
              </label>
              <select
                {...register("leave_Type", { required: true })}
                className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Leave Type</option>
                {leaveTypes &&
                  leaveTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              {errors.leave_Type && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Half Day Toggle */}
            <div className="mb-4 flex items-center gap-2">
              <label className="text-sm font-semibold">Half Day</label>
              <input type="checkbox" {...register("leave_HalfDay")} />
            </div>

            {/* If NOT half-day */}
            {!leave_HalfDay && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      {...register("leave_From", { required: true })}
                      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.leave_From && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      {...register("leave_To", { required: true })}
                      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      min={leave_From || new Date().toISOString().split("T")[0]}
                    />
                    {errors.leave_To && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Number of Days
                    </label>
                    <input
                      type="number"
                      {...register("no_Of_Days")}
                      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      disabled
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">
                    Reason for Leave
                  </label>
                  <textarea
                    {...register("reason_For_Leave", { required: true })}
                    className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows="4"
                  ></textarea>
                  {errors.reason_For_Leave && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
              </>
            )}

            {/* If half-day */}
            {leave_HalfDay && (
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Half-Day Session
                    </label>
                    <select
                      {...register("half_Day_Session", { required: leave_HalfDay })}
                      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Select Session</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                    </select>
                    {errors.half_Day_Session && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      {...register("leave_To", { required: leave_HalfDay })}
                      className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.leave_To && (
                      <span className="text-red-500 text-sm">Required</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Reason for Leave
                  </label>
                  <textarea
                    {...register("reason_For_Leave", { required: true })}
                    className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows="4"
                  ></textarea>
                  {errors.reason_For_Leave && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-orange-500 hover:bg-orange-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Apply Leave
              </button>
            </div>
          </form>
        </div>
      </BaseModal>
      <ConfirmationDialog
        open={confirmOpen}
        title="Confirm Leave Application"
        message={
          <>
            <p>
              <strong>Leave Type:</strong> {formData?.leave_Type}
            </p>
            <p>
              <strong>Half-Day:</strong>{" "}
              {formData?.leave_HalfDay ? "Yes" : "No"}
            </p>
            {formData?.leave_HalfDay && (
              <p>
                <strong>Session:</strong> {formData?.half_Day_Session}
              </p>
            )}
            <p>
              <strong>From:</strong> {formData?.leave_From}
            </p>
            <p>
              <strong>To:</strong> {formData?.leave_To}
            </p>
            <p>
              <strong>Number of Days:</strong> {formData?.no_Of_Days}
            </p>
            <p>
              <strong>Reason:</strong> {formData?.reason_For_Leave}
            </p>
          </>
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Yes, Apply"
        cancelText="Cancel"
      />
    </>
  );
}
