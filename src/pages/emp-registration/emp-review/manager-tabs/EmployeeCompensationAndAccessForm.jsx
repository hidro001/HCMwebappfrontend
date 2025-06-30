// CompensationAndAccessFormWrapper.jsx
import { useState,useEffect } from "react";
import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form";
import { useAnimate } from "framer-motion";

import FormField from "./common/FormField";
import FormReactSelect from "./common/FormReactSelect";
import useEmployeeStore from "../../../../store/useEmployeeStore.js";
import PermissionModal from "./common/PermissionModal";
import { availablePermissionManager } from "../../../../service/availablePermissions";
import axiosInstance from "../../../../service/axiosInstance.js";

export default function CompensationAndAccessFormWrapper({ employeeId }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CompensationAndAccessForm employeeId={employeeId} />
    </FormProvider>
  );
}

function CompensationAndAccessForm({ employeeId }) {
  const [scope, animate] = useAnimate();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Global store data
  const addressOptions = useEmployeeStore((s) => s.addressOptions);
  const departments = useEmployeeStore((s) => s.departments);
  const shiftTimings = useEmployeeStore((s) => s.shiftTimings);
  const employmentTypes = useEmployeeStore((s) => s.employmentTypes);
  const permissionRoles = useEmployeeStore((s) => s.permissionRoles);
  const designations = useEmployeeStore((s) => s.designations);
  const allEmployees = useEmployeeStore((s) => s.allEmployees);
  const breakRecords = useEmployeeStore((s) => s.breakRecords);

  const loading = {
    addresses: useEmployeeStore((s) => s.loadingAddresses),
    departments: useEmployeeStore((s) => s.loadingDepartments),
    shiftTimings: useEmployeeStore((s) => s.loadingShiftTimings),
    employmentTypes: useEmployeeStore((s) => s.loadingEmploymentTypes),
    permissionRoles: useEmployeeStore((s) => s.loadingPermissionRoles),
    designations: useEmployeeStore((s) => s.loadingDesignations),
    employees: useEmployeeStore((s) => s.loadingAllEmployees),
    breaks: useEmployeeStore((s) => s.loadingBreakRecords),
  };

  const overtimeAllowed = useWatch({ name: "overtime_allowed" });
  const currentPermissions = useWatch({ name: "permission" }) || [];
  const officeLocation = useWatch({ name: "office_location" });
  const roleWatch = useWatch({ name: "roleId" });

  // Animate inputs
  useAnimateEffect(animate);

  // Set latitude/longitude
  useAutoFillLatLong(officeLocation, addressOptions, setValue);

  // Role-based permissions
  useAutoAssignPermissions(roleWatch, permissionRoles, setValue);

  // Permission modal
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const openPermissionModal = () => setPermissionModalOpen(true);
  const closePermissionModal = () => setPermissionModalOpen(false);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.put(`registration/employee/${employeeId}/compensation`, data);
      alert("Success: " + res.data.message);
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Failed to save");
    }
  };

  return (
    <form ref={scope} onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white dark:bg-gray-900 rounded-xl shadow mb-20">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 dark:border-gray-700">
        Compensation & Access Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField name="no_of_Paid_Leave" label="Paid Leave" type="number" />
        <FormReactSelect name="employee_Type" label="Employee Type" options={employmentTypes} loading={loading.employmentTypes} />
        <FormReactSelect name="department" label="Department" options={departments} loading={loading.departments} />
        <FormReactSelect name="designation" label="Designation" options={designations} loading={loading.designations} />
        <FormReactSelect name="roleId" label="Role" options={permissionRoles.map(r => ({ label: r.role_name, value: r.role_name }))} loading={loading.permissionRoles} />
        <FormReactSelect name="managerId" label="Manager" options={allEmployees} isMulti loading={loading.employees} />
        <FormField name="base_Salary" label="Base Salary" type="number" />
        <FormField name="current_Base_Salary" label="Current Base Salary" type="number" />
        <FormReactSelect name="otp_Required" label="OTP Required" options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        <FormReactSelect name="work_Mode" label="Work Mode" options={[{ value: 'onsite', label: 'Onsite' }, { value: 'remote', label: 'Remote' }, { value: 'hybrid', label: 'Hybrid' }]} />
        <FormReactSelect name="overtime_allowed" label="Overtime Allowed" options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]} />
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-1">Permissions</label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Selected: {currentPermissions.join(", ") || "None"}
        </p>
        <button type="button" onClick={openPermissionModal} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Select Permissions
        </button>
        <PermissionModal
          isOpen={isPermissionModalOpen}
          onClose={closePermissionModal}
          availablePermissions={availablePermissionManager}
          defaultSelected={currentPermissions}
          onSave={(selected) => {
            setValue("permission", selected);
            closePermissionModal();
          }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <FormReactSelect name="office_location" label="Office Location" options={addressOptions} loading={loading.addresses} />
        <FormField name="latitude" label="Latitude" />
        <FormField name="longitude" label="Longitude" />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <FormReactSelect name="shift_Timing" label="Shift Timing" options={shiftTimings} loading={loading.shiftTimings} />
        <FormReactSelect name="break_Type" label="Break Type" options={breakRecords} loading={loading.breaks} />
        <FormReactSelect
          name="allowances_Provided"
          label="Allowances Provided"
          isMulti
          options={[
            { value: "hra", label: "HRA" },
            { value: "da", label: "DA" },
            { value: "lta", label: "LTA" },
            { value: "medical", label: "Medical" },
            { value: "special", label: "Special" },
            { value: "travel", label: "Travel" },
          ]}
        />
      </div>

      <div className="flex justify-end mt-8">
        <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );
}

// 🔧 Helper hooks for modular behavior
function useAnimateEffect(animate) {
  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [".animatable-input", { opacity: 1, x: 0 }, { duration: 0.3, stagger: 0.05 }],
    ]);
  }, [animate]);
}

function useAutoFillLatLong(officeLocation, addressOptions, setValue) {
  useEffect(() => {
    const selected = addressOptions?.find((o) => o.value === officeLocation);
    setValue("latitude", selected?.latitude || "");
    setValue("longitude", selected?.longitude || "");
  }, [officeLocation, addressOptions, setValue]);
}

function useAutoAssignPermissions(roleWatch, permissionRoles, setValue) {
  useEffect(() => {
    const found = permissionRoles?.find((r) => r.role_name === roleWatch);
    if (found?.permission) {
      setValue("permission", found.permission.map((p) => p.permission));
    }
  }, [roleWatch, permissionRoles, setValue]);
}
