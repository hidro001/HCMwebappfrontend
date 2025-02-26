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
  fetchEmployeeById,
  updateEmployee,
} from "../service/employeeService";
import axiosInstance from "../service/axiosInstance";

const useEmployeeStore = create((set, get) => ({
  // Data States
  shiftTimings: [],
  employmentTypes: [],
  departments: [],
  allEmployees: [],
  permissionRoles: [],
  addressOptions: [],
  designations: [],
  breakRecords: [],

  // Loading States
  loadingBreakRecords: false,
  loadingShiftTimings: false,
  loadingEmploymentTypes: false,
  loadingDepartments: false,
  loadingAllEmployees: false,
  loadingPermissionRoles: false,
  loadingAddresses: false,
  loadingDesignations: false,


  loadBreakRecords: async () => {
    try {
      set({ loadingBreakRecords: true });
      const response = await axiosInstance.get("/break/get");
      if (response.data.success) {
        // Map the break data into { label, value } format
        const breakOptions = response.data.data.map((b) => ({
          label: `${b.breakType} (${b.detectionType})`,
          // value: b, // storing the full object if needed later
          value: JSON.stringify(b), // <-- Change here to store a JSON string
        }));
        set({ breakRecords: breakOptions });
      } else {
        set({ breakRecords: [] });
        console.error(response.data.message || "Failed to fetch break data.");
      }
    } catch (error) {
      console.error("Error fetching break records:", error);
      set({ breakRecords: [] });
    } finally {
      set({ loadingBreakRecords: false });
    }
  },

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
      console.log("Employment Types:", types);
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
      if (
        companyInfo &&
        companyInfo.addresses &&
        Array.isArray(companyInfo.addresses)
      ) {
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
  // To store a single employee in the store (if you like):
  selectedEmployee: null,
  loadingSelectedEmployee: false,

  // Action: fetch employee by ID
  loadEmployeeById: async (id) => {
    set({ loadingSelectedEmployee: true });
    try {
      const response = await fetchEmployeeById(id);
      if (response.success) {
        set({ selectedEmployee: response.data });
      } else {
        console.error("Error loading employee: ", response.message);
      }
    } catch (error) {
      console.error("Error loading employee: ", error);
    } finally {
      set({ loadingSelectedEmployee: false });
    }
  },

  // Action: update employee
  updateEmployeeData: async (id, formData) => {
    try {
      const response = await updateEmployee(id, formData);
      return response; // Let the caller handle success/failure
    } catch (error) {
      throw error;
    }
  },
}));

export default useEmployeeStore;
