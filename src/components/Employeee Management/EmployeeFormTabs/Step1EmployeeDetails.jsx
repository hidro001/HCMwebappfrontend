
import React, { useState, useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import FormField from "../common/FormField";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";
import FormMultiSelect from "../common/FormMultiSelect";
import useEmployeeStore from "../../../store/useEmployeeStore.js";
import PermissionModal from "../common/PermissionModal"; // <-- new import
import { availablePermission } from "../../../service/availablePermissions";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function Step1EmployeeDetails({ onSubmitStep, submitting }) {
  const [scope, animate] = useAnimate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Store data
  const addressOptions = useEmployeeStore((state) => state.addressOptions);
  const departments = useEmployeeStore((state) => state.departments);
  const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
  const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
  const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
  const designations = useEmployeeStore((state) => state.designations);
  const allEmployees = useEmployeeStore((state) => state.allEmployees);

  // Loading states
  const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);
  const loadingDepartments = useEmployeeStore(
    (state) => state.loadingDepartments
  );
  const loadingShiftTimings = useEmployeeStore(
    (state) => state.loadingShiftTimings
  );
  const loadingEmploymentTypes = useEmployeeStore(
    (state) => state.loadingEmploymentTypes
  );
  const loadingPermissionRoles = useEmployeeStore(
    (state) => state.loadingPermissionRoles
  );
  const loadingDesignations = useEmployeeStore(
    (state) => state.loadingDesignations
  );
  const loadingAllEmployees = useEmployeeStore(
    (state) => state.loadingAllEmployees
  );

  // Animate on mount
  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [
        ".animatable-input",
        { opacity: 1, x: 0 },
        { duration: 0.3, stagger: 0.05 },
      ],
    ]);
  }, [animate]);

  // Watch changes for office location to auto-fill lat/long
  const watchOfficeLocation = watch("officeLocation");
  useEffect(() => {
    const selected = addressOptions?.find(
      (opt) => opt.value === watchOfficeLocation
    );
    if (selected) {
      setValue("latitude", selected.latitude || "");
      setValue("longitude", selected.longitude || "");
    } else {
      setValue("latitude", "");
      setValue("longitude", "");
    }
  }, [watchOfficeLocation, addressOptions, setValue]);

  // If role changes, auto-fill role’s permissions
  const watchRole = watch("permission_role");
  useEffect(() => {
    const foundRole = permissionRoles?.find((r) => r.role_name === watchRole);
    if (foundRole?.permission) {
      const perms = foundRole.permission.map((p) => p.permission);
      setValue("permission", perms);
    } else {
      setValue("permission", []);
    }
  }, [watchRole, permissionRoles, setValue]);

  // Handle profile image
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert("Profile image must be <= 5MB");
        return;
      }
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Unsupported file format. Only PNG/JPEG");
        return;
      }
      setValue("user_Avatar", file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setValue("user_Avatar", null);
      setAvatarPreview(null);
    }
  };

  // ====== MODAL for Permissions ======
  // We'll remove FormMultiSelect for "permission" and replace it with a modal approach.
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const currentPermissions = useWatch({ name: "permission" }); // array from the form

  const openPermissionModal = () => setIsPermissionModalOpen(true);
  const closePermissionModal = () => setIsPermissionModalOpen(false);

  const handlePermissionSave = (selected) => {
    // 'selected' is an array of permission strings from the modal
    setValue("permission", selected);
    setIsPermissionModalOpen(false);
  };
  // ============================

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      {/* Profile Image + First/Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <label className="block font-medium mb-2">Profile Image</label>
          <div
            className="w-32 h-32 rounded-full border relative mb-2 flex items-center justify-center overflow-hidden cursor-pointer dark:border-gray-600"
            onClick={() => document.getElementById("avatarInput")?.click()}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm dark:text-gray-500">
                No Image
              </span>
            )}
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
          />
          {errors.user_Avatar && (
            <p className="text-red-500 text-sm mt-1">
              {errors.user_Avatar.message}
            </p>
          )}
        </div>

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="First Name"
            name="first_Name"
            placeholder="Enter First Name"
            registerOptions={{
              required: "First Name is required",
              pattern: {
                value: lettersOnlyRegex,
                message: "Can only contain letters and spaces",
              },
            }}
          />
          <FormField
            label="Last Name"
            name="last_Name"
            placeholder="Enter Last Name"
            registerOptions={{
              pattern: {
                value: lettersOnlyRegex,
                message: "Can only contain letters and spaces",
              },
            }}
          />
        </div>
      </div>

      {/* Paid leaves / Employee Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          label="No. of Paid Leaves"
          name="no_of_Paid_Leave"
          placeholder="e.g. 12"
          type="number"
          registerOptions={{
            required: "No. of Paid Leaves is required",
            min: { value: 0, message: "Cannot be negative" },
          }}
        />
        <FormSelect
          label="Employee Type"
          name="employee_Type"
          loading={loadingEmploymentTypes}
          options={[
            { value: "", label: "Select Employee Type" },
            ...employmentTypes,
          ]}
          registerOptions={{ required: "Employee Type is required" }}
        />
      </div>

      {/* Phone / Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          label="Phone"
          name="mobile_No"
          placeholder="Enter phone number"
          registerOptions={{
            required: "Phone Number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Must be exactly 10 digits",
            },
          }}
        />
        <FormSelect
          label="Gender"
          name="gender"
          options={[
            { value: "", label: "Select" },
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
          registerOptions={{ required: "Gender is required" }}
        />
      </div>

      {/* Personal Email / DOB / Permanent Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Personal Email"
          name="personal_Email_Id"
          placeholder="test@gmail.com"
          type="email"
          registerOptions={{
            required: "Personal Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Email",
            },
          }}
        />
        <FormField
          label="DOB"
          name="dob"
          type="date"
          registerOptions={{
            required: "Date of Birth is required",
            validate: {
              isAdult: (value) => {
                if (!value) return true;
                const inputDate = new Date(value);
                const today = new Date();
                const eighteenYearsAgo = new Date(
                  today.getFullYear() - 18,
                  today.getMonth(),
                  today.getDate()
                );
                return (
                  inputDate <= eighteenYearsAgo ||
                  "You must be at least 18 years old"
                );
              },
            },
          }}
        />
        <FormTextArea
          label="Permanent Address"
          name="permanent_Address"
          placeholder="Write Address..."
          registerOptions={{ required: "Permanent Address is required" }}
        />
      </div>

      {/* Work Email / DOJ / Department */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Work Email"
          name="working_Email_Id"
          placeholder="test@company.com"
          type="email"
          registerOptions={{
            required: "Work Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid Work Email",
            },
          }}
        />
        <FormField
          label="DOJ"
          name="date_of_Joining"
          type="date"
          registerOptions={{
            required: "Date of Joining is required",
          }}
        />
        <FormSelect
          label="Department"
          name="departmentAllocated"
          loading={loadingDepartments}
          options={[{ value: "", label: "Select Department" }, ...departments]}
          registerOptions={{ required: "Department is required" }}
        />
      </div>

      {/* Role / Manager / Designation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormSelect
          label="Role"
          name="permission_role"
          loading={loadingPermissionRoles}
          options={[
            { value: "", label: "Select Role" },
            ...(permissionRoles || []).map((r) => ({
              value: r.role_name,
              label: r.role_name,
            })),
          ]}
          registerOptions={{ required: "Role is required" }}
        />
        {/* Manager assignment (unchanged) */}
        {/* <FormSelect
          label="Assign Manager"
          name="assigned_to"
          loading={loadingAllEmployees}
          options={allEmployees}
          registerOptions={{ required: "Manager is required" }}
        /> */}
        <FormMultiSelect
          label="Assign Manager"
          name="assigned_to"
          loading={loadingAllEmployees}
          options={allEmployees}
          requiredMessage="At least one manager must be assigned"
        />
        <FormSelect
          label="Designation"
          name="designation"
          loading={loadingDesignations}
          options={[
            { value: "", label: "Select Designation" },
            ...designations,
          ]}
          registerOptions={{ required: "Designation is required" }}
        />
      </div>

      {/* Employee ID / Salary / OTP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Employee ID"
          name="employee_Id"
          placeholder="R10004"
          registerOptions={{
            required: "Employee ID is required",
          }}
        />
        <FormField
          label="Salary"
          name="salary"
          placeholder="Salary"
          type="number"
          registerOptions={{
            required: "Salary is required",
            min: { value: 0, message: "Salary cannot be negative" },
          }}
        />
        <FormSelect
          label="OTP Required"
          name="otp"
          options={[
            { value: "", label: "Select" },
            { value: "no", label: "No" },
            { value: "yes", label: "Yes" },
          ]}
          registerOptions={{ required: "OTP selection is required" }}
        />
      </div>

      {/* Office Location / Latitude / Longitude */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormSelect
          label="Office Location"
          name="officeLocation"
          loading={loadingAddresses}
          options={[{ value: "", label: "Select Office" }, ...addressOptions]}
          registerOptions={{ required: "Office Location is required" }}
        />
        <FormField
          label="Latitude"
          name="latitude"
          placeholder="Latitude"
          registerOptions={{
            required: "Latitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Must be a valid number",
            },
          }}
        />
        <FormField
          label="Longitude"
          name="longitude"
          placeholder="Longitude"
          registerOptions={{
            required: "Longitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Must be a valid number",
            },
          }}
        />
      </div>

      {/* Shift Timing */}
      <div className="mt-6">
        <FormSelect
          label="Shift Timing"
          name="shift_Timing"
          loading={loadingShiftTimings}
          options={[
            { value: "", label: "Select Shift Timings" },
            ...shiftTimings,
          ]}
          registerOptions={{ required: "Shift Timing is required" }}
        />
      </div>

      {/* PERMISSIONS (MODAL version) */}
      <div className="mt-6">
        <label className="block font-medium mb-1">Permissions</label>

        {/* Show current picks, if any */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Selected: {currentPermissions.join(", ") || "None"}
        </p>

        <button
          type="button"
          onClick={openPermissionModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Select Permissions
        </button>

        {/* The actual modal */}
        <PermissionModal
          isOpen={isPermissionModalOpen}
          onClose={closePermissionModal}
          availablePermissions={availablePermission} // your full list
          defaultSelected={currentPermissions} // from form
          onSave={handlePermissionSave}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}
