// src/store/useEmployeeStore.js
import { create } from "zustand";
import {
  fetchShiftTimings,
  fetchEmploymentTypes,
  fetchDepartments,
  fetchAllEmployees,
  fetchPermissionRoles,
  fetchCompanyInfo,
  fetchDesignations,
} from "../service/employeeService";

const useEmployeeStore = create((set, get) => ({
  // Data States
  shiftTimings: [],
  employmentTypes: [],
  departments: [],
  allEmployees: [],
  permissionRoles: [],
  addressOptions: [],
  designations: [],

  // Loading States
  loadingShiftTimings: false,
  loadingEmploymentTypes: false,
  loadingDepartments: false,
  loadingAllEmployees: false,
  loadingPermissionRoles: false,
  loadingAddresses: false,
  loadingDesignations: false,

  // Actions
  loadShiftTimings: async () => {
    try {
      set({ loadingShiftTimings: true });
      const data = await fetchShiftTimings();
      // Convert shift array to the { label, value } format if needed
      const shifts = data.map((shift) => ({
        label: `${shift.name} (${shift.startTime} - ${shift.endTime})`,
        value: shift.id,
      }));
      set({ shiftTimings: shifts });
    } catch (error) {
      console.error("Error fetching shift timings:", error);
      set({ shiftTimings: [] });
    } finally {
      set({ loadingShiftTimings: false });
    }
  },

  loadEmploymentTypes: async () => {
    try {
      set({ loadingEmploymentTypes: true });
      const data = await fetchEmploymentTypes();
      // Convert to { label, value } if needed
      const types = data.map((t) => ({ label: t.name, value: t.name }));
      set({ employmentTypes: types });
    } catch (error) {
      console.error("Error fetching employment types:", error);
      set({ employmentTypes: [] });
    } finally {
      set({ loadingEmploymentTypes: false });
    }
  },

  loadDepartments: async () => {
    try {
      set({ loadingDepartments: true });
      const data = await fetchDepartments();
      // Convert to { label, value } if needed
      const deptOptions = data.map((dept) => ({
        label: dept.department,
        value: dept.department,
      }));
      set({ departments: deptOptions });
    } catch (error) {
      console.error("Error fetching departments:", error);
      set({ departments: [] });
    } finally {
      set({ loadingDepartments: false });
    }
  },

  loadAllEmployees: async () => {
    try {
      set({ loadingAllEmployees: true });
      const data = await fetchAllEmployees();
      const employeeOptions = data.map((emp) => ({
        value: emp._id,
        label: `${emp.first_Name} ${emp.last_Name} (${emp.employee_Id}) (${emp.permission_role})`,
      }));
      set({ allEmployees: employeeOptions });
    } catch (error) {
      console.error("Error fetching employees:", error);
      set({ allEmployees: [] });
    } finally {
      set({ loadingAllEmployees: false });
    }
  },

  loadPermissionRoles: async () => {
    try {
      set({ loadingPermissionRoles: true });
      const data = await fetchPermissionRoles();
      set({ permissionRoles: data });
    } catch (error) {
      console.error("Error fetching permission roles:", error);
      set({ permissionRoles: [] });
    } finally {
      set({ loadingPermissionRoles: false });
    }
  },

  loadCompanyAddresses: async () => {
    try {
      set({ loadingAddresses: true });
      const companyInfo = await fetchCompanyInfo();
      if (companyInfo && companyInfo.addresses && Array.isArray(companyInfo.addresses)) {
        const formattedAddresses = companyInfo.addresses.map((address) => ({
          label: address.address,
          value: address.address,
          latitude: address.latitude,
          longitude: address.longitude,
        }));
        set({ addressOptions: formattedAddresses });
      } else {
        set({ addressOptions: [] });
      }
    } catch (error) {
      console.error("Error fetching company info (addresses):", error);
      set({ addressOptions: [] });
    } finally {
      set({ loadingAddresses: false });
    }
  },

  loadDesignations: async () => {
    try {
      set({ loadingDesignations: true });
      const data = await fetchDesignations();
      const designOptions = data.map((d) => ({
        label: d.designation,
        value: d.designation,
      }));
      set({ designations: designOptions });
    } catch (error) {
      console.error("Error fetching designations:", error);
      set({ designations: [] });
    } finally {
      set({ loadingDesignations: false });
    }
  },
}));

export default useEmployeeStore;
