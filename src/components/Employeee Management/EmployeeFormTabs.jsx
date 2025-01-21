
import React, { useState, useEffect, useRef } from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  useFormContext,
  Controller,
} from "react-hook-form";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { FaTrash, FaUpload, FaFilePdf } from "react-icons/fa";

import useEmployeeStore from "../../store/useEmployeeStore.js";
import { createEmployee } from "../../service/employeeService.js";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { availablePermission } from "./AvailablePermissions.jsx";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function EmployeeFormTabs({
  formTitle = "Employee Form",
  onComplete = () => {},
}) {
  const {
    shiftTimings,
    employmentTypes,
    departments,
    allEmployees,
    permissionRoles,
    addressOptions,
    designations,
    loadingShiftTimings,
    loadingEmploymentTypes,
    loadingDepartments,
    loadingAllEmployees,
    loadingPermissionRoles,
    loadingAddresses,
    loadingDesignations,
    loadShiftTimings,
    loadEmploymentTypes,
    loadDepartments,
    loadAllEmployees,
    loadPermissionRoles,
    loadCompanyAddresses,
    loadDesignations,
  } = useEmployeeStore();

  const [activeTab, setActiveTab] = useState(0);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadShiftTimings();
    loadEmploymentTypes();
    loadDepartments();
    loadAllEmployees();
    loadPermissionRoles();
    loadCompanyAddresses();
    loadDesignations();
    // eslint-disable-next-line
  }, []);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      first_Name: "",
      last_Name: "",
      gender: "",
      mobile_No: "",
      personal_Email_Id: "",
      dob: "",
      permanent_Address: "",
      working_Email_Id: "",
      date_of_Joining: "",
      departmentAllocated: "",
      permission_role: "",
      permission: [],
      assigned_to: [],
      designation: "",
      employee_Id: "",
      officeLocation: "",
      latitude: "",
      longitude: "",
      shift_Timing: "",
      salary: "",
      otp: "no",
      no_of_Paid_Leave: 0,
      employee_Type: "",
      user_Avatar: null,
      qualifications: [
        {
          qualificationName: "",
          universityBoard: "",
          totalMarks: "",
          passingYear: "",
          percentageCgpa: "",
        },
      ],
      experiences: [
        {
          companyName: "",
          designation: "",
          totalExperience: "",
          startDate: "",
          endDate: "",
        },
      ],
      pan_No: "",
      adhaar_Number: "",
      bank_Holder_Name: "",
      bank_Name: "",
      bank_Account_No: "",
      confirmBankAccountNo: "",
      ifsc_Code: "",
      documents: [{ name: "", file: null }],
    },
  });

  const { handleSubmit, getValues, control } = methods;

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "qualifications",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: documentFields,
    append: appendDocument,
    remove: removeDocument,
  } = useFieldArray({
    control,
    name: "documents",
  });

  const onSubmitStep = () => {
    if (activeTab < 2) {
      setActiveTab((prev) => prev + 1);
    } else {
      setConfirmationOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setConfirmationOpen(false);
    setSubmitting(true);
    try {
      const formValues = getValues();
      const formData = new FormData();

      const omitKeys = [
        "permission",
        "assigned_to",
        "qualifications",
        "experiences",
        "documents",
        "confirmBankAccountNo",
        "user_Avatar",
      ];

      // Append normal form fields
      Object.keys(formValues).forEach((key) => {
        if (!omitKeys.includes(key)) {
          const val = formValues[key];
          if (val !== null && val !== "") {
            formData.append(key, val);
          }
        }
      });

      // Arrays & file fields
      formValues.permission.forEach((perm, index) => {
        formData.append(`permission[${index}]`, perm);
      });
      formValues.assigned_to.forEach((mgr, index) => {
        formData.append(`assigned_to[${index}]`, mgr);
      });
      if (formValues.user_Avatar) {
        formData.append("user_Avatar", formValues.user_Avatar);
      }
      formValues.documents.forEach((doc, index) => {
        if (doc.name) formData.append(`documents[${index}][name]`, doc.name);
        if (doc.file) formData.append(`documents[${index}][file]`, doc.file);
      });
      formValues.qualifications.forEach((qual, index) => {
        formData.append(
          `qualifications[${index}][qualificationName]`,
          qual.qualificationName || ""
        );
        formData.append(
          `qualifications[${index}][universityBoard]`,
          qual.universityBoard || ""
        );
        formData.append(
          `qualifications[${index}][totalMarks]`,
          qual.totalMarks || ""
        );
        formData.append(`qualifications[${index}][year]`, qual.passingYear || "");
        formData.append(
          `qualifications[${index}][percentageCgpa]`,
          qual.percentageCgpa || ""
        );
      });
      formValues.experiences.forEach((exp, index) => {
        formData.append(
          `experiences[${index}][companyName]`,
          exp.companyName || ""
        );
        formData.append(
          `experiences[${index}][designation]`,
          exp.designation || ""
        );
        formData.append(`experiences[${index}][startDate]`, exp.startDate || "");
        formData.append(`experiences[${index}][endDate]`, exp.endDate || "");
        formData.append(
          `experiences[${index}][totalExperience]`,
          exp.totalExperience || ""
        );
      });

      const response = await createEmployee(formData);
      if (response.success) {
        toast.success("User registered successfully!");
        onComplete(response);
      } else {
        toast.error("Registration failed: " + response.message);
      }
    } catch (error) {
      if (error.response?.data?.details) {
        error.response.data.details.forEach((detail) => {
          toast.error(detail.message);
        });
      } else if (error.response?.data?.message) {
        toast.error("Registration failed: " + error.response.data.message);
      } else {
        toast.error("Registration failed: " + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelSubmit = () => {
    setConfirmationOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="employee-form bg-bg-primary text-text-primary py-2">
        <div className="">
          <div className="bg-bg-secondary rounded-md shadow p-6">
            <h1 className="text-2xl font-bold text-center mb-6">{formTitle}</h1>

            {/* Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
              <TabButton
                label="Employee Details"
                isActive={activeTab === 0}
                onClick={() => setActiveTab(0)}
              />
              <TabButton
                label="Qualifications & Experience"
                isActive={activeTab === 1}
                onClick={() => setActiveTab(1)}
              />
              <TabButton
                label="Personal Details"
                isActive={activeTab === 2}
                onClick={() => setActiveTab(2)}
              />
            </div>

            <div className="mt-4">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="tab-employee"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step1EmployeeDetails
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                    />
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="tab-qualifications"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step2QualificationsExperience
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                      qualificationFields={qualificationFields}
                      removeQualification={removeQualification}
                      appendQualification={appendQualification}
                      experienceFields={experienceFields}
                      removeExperience={removeExperience}
                      appendExperience={appendExperience}
                    />
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="tab-personal"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Step3PersonalDetails
                      onSubmitStep={onSubmitStep}
                      submitting={submitting}
                      documentFields={documentFields}
                      removeDocument={removeDocument}
                      appendDocument={appendDocument}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation dialog for final submit */}
      <ConfirmationDialog
        open={confirmationOpen}
        title="Are you sure?"
        message="Do you want to add this user?"
        confirmText="Yes"
        cancelText="No, cancel!"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </FormProvider>
  );
}

/** Simple tab switch button */
function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium 
        ${
          isActive
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
        }
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/** Step 1: Employee Details */
function Step1EmployeeDetails({ onSubmitStep, submitting }) {
  const [scope, animate] = useAnimate();
  const { handleSubmit, register, watch, setValue, formState } =
    useFormContext();
  const { errors } = formState;
  const [avatarPreview, setAvatarPreview] = useState(null);

  const addressOptions = useEmployeeStore((state) => state.addressOptions);
  const departments = useEmployeeStore((state) => state.departments);
  const shiftTimings = useEmployeeStore((state) => state.shiftTimings);
  const employmentTypes = useEmployeeStore((state) => state.employmentTypes);
  const permissionRoles = useEmployeeStore((state) => state.permissionRoles);
  const designations = useEmployeeStore((state) => state.designations);
  const allEmployees = useEmployeeStore((state) => state.allEmployees);

  const loadingAddresses = useEmployeeStore((state) => state.loadingAddresses);
  const loadingDepartments = useEmployeeStore((state) => state.loadingDepartments);
  const loadingShiftTimings = useEmployeeStore((state) => state.loadingShiftTimings);
  const loadingEmploymentTypes = useEmployeeStore((state) => state.loadingEmploymentTypes);
  const loadingPermissionRoles = useEmployeeStore((state) => state.loadingPermissionRoles);
  const loadingDesignations = useEmployeeStore((state) => state.loadingDesignations);
  const loadingAllEmployees = useEmployeeStore((state) => state.loadingAllEmployees);

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

  // If office location changes, auto-fill lat/long
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

  // If role changes, auto-fill the role’s permissions
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

  // Handle profile avatar
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

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile image */}
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

        {/* First & Last Name */}
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

      {/* Shift Timing / Permissions */}
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

      <div className="mt-6">
        <FormMultiSelect
          label="Permissions"
          name="permission"
          options={availablePermission.map((p) => ({
            value: p.permission,
            label: p.name,
          }))}
          requiredMessage="At least one permission must be selected"
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

/** Step 2: Qualifications & Experience */
function Step2QualificationsExperience({
  onSubmitStep,
  submitting,
  qualificationFields,
  removeQualification,
  appendQualification,
  experienceFields,
  removeExperience,
  appendExperience,
}) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

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

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
      {qualificationFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Qualification Name"
              name={`qualifications.${index}.qualificationName`}
              placeholder="Enter Qualification Name"
            />
            <FormField
              label="University/Board"
              name={`qualifications.${index}.universityBoard`}
              placeholder="Enter University/Board"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Marks"
              name={`qualifications.${index}.totalMarks`}
              placeholder="Total Marks"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Passing Year"
              name={`qualifications.${index}.passingYear`}
              placeholder="YYYY"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Percentage/CGPA"
              name={`qualifications.${index}.percentageCgpa`}
              placeholder="e.g. 80% or 8.0"
              registerOptions={{
                pattern: {
                  value: /^(\d+(\.\d+)?%?)?$/,
                  message: "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
                },
              }}
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {qualificationFields.length > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeQualification(index)}
              >
                Remove
              </button>
            )}
            {index === qualificationFields.length - 1 &&
              qualificationFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendQualification({
                      qualificationName: "",
                      universityBoard: "",
                      totalMarks: "",
                      passingYear: "",
                      percentageCgpa: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}

      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Company Name"
              name={`experiences.${index}.companyName`}
              placeholder="Enter Company Name"
            />
            <FormField
              label="Designation"
              name={`experiences.${index}.designation`}
              placeholder="Enter Designation"
              registerOptions={{
                pattern: {
                  value: lettersOnlyRegex,
                  message: "Can only contain letters and spaces",
                },
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Years of Experience"
              name={`experiences.${index}.totalExperience`}
              placeholder="e.g. 3"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Start Date"
              name={`experiences.${index}.startDate`}
              type="date"
            />
            <FormField
              label="End Date"
              name={`experiences.${index}.endDate`}
              type="date"
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {experienceFields.length > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeExperience(index)}
              >
                Remove
              </button>
            )}
            {index === experienceFields.length - 1 &&
              experienceFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendExperience({
                      companyName: "",
                      designation: "",
                      totalExperience: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}

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

/** Step 3: Personal Details + Document Upload with Previews & Hidden input */
function Step3PersonalDetails({
  onSubmitStep,
  submitting,
  documentFields,
  removeDocument,
  appendDocument,
}) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

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

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      {/* PAN / Aadhaar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="PAN Number"
          name="pan_No"
          placeholder="ABCDE1234F"
          registerOptions={{
            required: "PAN is required",
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "Format: ABCDE1234F",
            },
          }}
        />
        <FormField
          label="Aadhaar Number"
          name="adhaar_Number"
          placeholder="12-digit Aadhaar"
          registerOptions={{
            required: "Aadhaar is required",
            pattern: {
              value: /^\d{12}$/,
              message: "Aadhaar must be 12 digits",
            },
          }}
        />
      </div>

      {/* Bank Details */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Bank Holder Name"
          name="bank_Holder_Name"
          placeholder="Account Holder Name"
          registerOptions={{
            required: "Bank Holder Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Name"
          name="bank_Name"
          placeholder="e.g. State Bank"
          registerOptions={{
            required: "Bank Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Account No."
          name="bank_Account_No"
          placeholder="1234567890"
          registerOptions={{
            required: "Account No. is required",
            pattern: {
              value: /^[0-9]{9,18}$/,
              message: "Account must be 9 to 18 digits",
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Confirm Bank Account No."
          name="confirmBankAccountNo"
          placeholder="Re-enter Account No."
          registerOptions={{
            required: "Please confirm Bank Account No.",
            validate: (val, formValues) =>
              val === formValues.bank_Account_No ||
              "Account numbers do not match",
          }}
        />
        <FormField
          label="IFSC Code"
          name="ifsc_Code"
          placeholder="ABCD0123456"
          registerOptions={{
            required: "IFSC Code is required",
            pattern: {
              value: /^[A-Z0-9]{11}$/,
              message: "Must be 11 chars (letters/numbers)",
            },
          }}
        />

        {/* Upload Documents Section */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-medium mb-1">
            Upload Documents <span className="text-red-500">*</span>
          </label>

          {/* If no documents, show a “no documents found” box */}
          {documentFields.length === 0 && (
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
              <FaUpload className="text-2xl mb-2" />
              <span>No document found</span>
            </div>
          )}

          {/* Otherwise, list out each DocumentUploader */}
          {documentFields.map((item, index) => (
            <DocumentUploader
              key={item.id}
              index={index}
              removeDocument={removeDocument}
              totalDocs={documentFields.length}
            />
          ))}

          {/* Button: add new document */}
          {documentFields.length < 20 && (
            <button
              type="button"
              onClick={() => appendDocument({ name: "", file: null })}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add More Documents
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
function DocumentUploader({ index, removeDocument, totalDocs }) {
  const { register, setValue, watch, formState } = useFormContext();
  const docFile = watch(`documents.${index}.file`);
  const docNameError = formState.errors?.documents?.[index]?.name?.message;
  const docFileError = formState.errors?.documents?.[index]?.file?.message;

  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (docFile && docFile.type?.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(docFile);
      setPreviewURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewURL(null);
  }, [docFile]);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert("File must be <= 5MB");
        return;
      }
      const allowed = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowed.includes(file.type)) {
        alert("Only JPG/PNG/PDF allowed");
        return;
      }
      setValue(`documents.${index}.file`, file);
    }
  };

  return (
    <div
      className={`
        border border-gray-300 dark:border-gray-600
        rounded p-3 mt-4 mb-4 relative
      `}
    >
      <label className="block text-sm font-medium mb-1">
        Document Name <span className="text-red-500">*</span>
      </label>
      <input
        className={`
          w-full px-3 py-2 rounded border mb-2 
          focus:outline-none focus:ring-2 bg-bg-secondary
          ${
            docNameError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
          }
        `}
        placeholder="Enter Document Name"
        {...register(`documents.${index}.name`, {
          required: "Document name is required",
        })}
      />
      {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

      <label className="block text-sm font-medium mb-1">Choose File</label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Custom "Upload" button + chosen filename */}
      <div className="flex items-center space-x-3 mb-2">
        <button
          type="button"
          onClick={handleFileClick}
          className={`
            px-3 py-1 bg-gray-200 rounded hover:bg-gray-300
            dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
          `}
        >
          <FaUpload className="inline mr-1" />
          Upload
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {docFile ? docFile.name : "No file chosen"}
        </span>
      </div>

      {/* Preview or icon */}
      {docFile && (
        <div className="mt-2">
          {previewURL ? (
            <img
              src={previewURL}
              alt="preview"
              className="w-24 h-auto border rounded mb-2"
            />
          ) : null}

          {!previewURL && docFile.type === "application/pdf" && (
            <div className="flex items-center space-x-2 text-sm">
              <FaFilePdf className="text-red-500" />
              <span>{docFile.name}</span>
            </div>
          )}

          {!previewURL &&
            docFile.type !== "application/pdf" &&
            !docFile.type?.startsWith("image/") && (
              <p className="text-sm">{docFile.name}</p>
            )}
        </div>
      )}
      {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

      {/* Remove file button */}
      {docFile && (
        <button
          type="button"
          onClick={() => setValue(`documents.${index}.file`, null)}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          title="Remove File"
        >
          <FaTrash />
        </button>
      )}

      {totalDocs > 1 && (
        <button
          type="button"
          onClick={() => removeDocument(index)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
        >
          <FaTrash className="mr-1" />
          Remove Document
        </button>
      )}
    </div>
  );
}

/** Common FormField (single-line input) */
function FormField({ label, name, placeholder, type = "text", registerOptions }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
          placeholder-gray-400 dark:placeholder-gray-500
          ${
            errorMsg
              ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Common FormSelect (single select) */
function FormSelect({ label, name, options = [], loading = false, registerOptions }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
          ${
            errorMsg
              ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      >
        {loading && <option value="">Loading...</option>}
        {!loading &&
          options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Common FormTextArea */
function FormTextArea({ label, name, placeholder, registerOptions, rows = 3 }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded
          focus:outline-none focus:ring-2
          placeholder-gray-400 dark:placeholder-gray-500
          ${
            errorMsg
              ? "border border-red-600 focus:ring-red-600 dark:border-red-600"
              : "border border-gray-300 dark:border-gray-600 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}

/** Multi-Select (react-select) with dark-mode support */
function FormMultiSelect({ label, name, options = [], loading = false, requiredMessage }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  const isDarkMode =
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: errorMsg ? "red" : base.borderColor,
      borderWidth: 1,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      "&:hover": {
        borderColor: errorMsg ? "red" : base.borderColor,
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#4B5563"
          : "#f5f5f5"
        : isDarkMode
        ? "#374151"
        : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#4B5563" : "#e2e8f0",
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
      ":hover": {
        backgroundColor: isDarkMode ? "#6B7280" : "#cbd5e0",
        color: isDarkMode ? "#fff" : "#000",
      },
    }),
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => {
            if (requiredMessage && (!value || value.length === 0)) {
              return requiredMessage;
            }
            return true;
          },
        }}
        render={({ field }) => {
          const { onChange, value } = field;
          const selected = options.filter((opt) => (value || []).includes(opt.value));

          return (
            <Select
              isMulti
              options={options}
              isLoading={loading}
              value={selected}
              onChange={(selectedOptions) => {
                onChange(selectedOptions.map((o) => o.value));
              }}
              styles={customStyles}
            />
          );
        }}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}