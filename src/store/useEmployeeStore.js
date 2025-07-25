import { create } from "zustand";
import {
  fetchShiftTimings,
  fetchEmploymentTypes,
  fetchDepartments,
  fetchAllEmployees,
  fetchPermissionRoles,
  fetchCompanyInfo,
  fetchDesignations,
  fetchLeaveTypes,
  fetchEmployeeById,
  updateEmployee,
} from "../service/employeeService";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";
import { getEmployeeByIdApi } from "../service/getAllEmployeesApi";

const useEmployeeStore = create((set, get) => ({

  shiftTimings: [],
  employmentTypes: [],
  departments: [],
  allEmployees: [],
  permissionRoles: [],
  addressOptions: [],
  designations: [],
  breakRecords: [],
  leaveTypes: [],

  // Loading States
  loadingBreakRecords: false,
  loadingShiftTimings: false,
  loadingEmploymentTypes: false,
  loadingDepartments: false,
  loadingAllEmployees: false,
  loadingPermissionRoles: false,
  loadingAddresses: false,
  loadingDesignations: false,
  loadingLeaveTypes: false,

  loadBreakRecords: async () => {
    try {
      set({ loadingBreakRecords: true });
      const response = await axiosInstance.get("/break/get");
      if (response.data.success) {
        // Map the break data into { label, value } format
        const breakOptions = response.data.data.map((b) => ({
          label: `${b.breakType} `,
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

  loadAllEmployees: async (department= '') => {
    try {
      set({ loadingAllEmployees: true });
      let data
      if(department.length >0){
       data = await fetchAllEmployees(department);

      }else{
       data = await fetchAllEmployees();
      }
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

   loadLeaveTypes: async () => {
    try {
      set({ loadingLeaveTypes: true });
      const data = await fetchLeaveTypes();
      const leaveTypesOptions = data.map((d) => ({
        label: d.name,
        value: d._id,
      }));

      set({ leaveTypes: leaveTypesOptions });
      
      console.log("leaveTypes:", leaveTypesOptions); 

    } catch (error) {
      console.error("Error fetching leaves:", error);
      set({ leaveTypes: [] });
    } finally {
      set({ loadingLeaveTypes: false });
    }
  },
  selectedEmployee: null,
  loadingSelectedEmployee: false,
  error: null,

  loadEmployeeById: async (id) => {
    set({ loadingSelectedEmployee: true, error: null });
    try {
      const response = await getEmployeeByIdApi(id);
      if (response.success) {
        set({
          selectedEmployee: response.data,
          loadingSelectedEmployee: false,
        });
      } else {
        throw new Error(response.message || "Failed to load employee data.");
      }
    } catch (error) {
      toast.error(error.message);
      set({ error: error.message, loadingSelectedEmployee: false });
    }
  },

  resetSelectedEmployee: () => set({ selectedEmployee: null }),

  // Action: update employee
  updateEmployeeData: async (id, formData) => {
    try {
      const response = await updateEmployee(id, formData);
      return response; // Let the caller handle success/failure
    } catch (error) {
      throw error;
    }
  },
  bulkUploadEmployees: async (formData) => {
    try {
      // Make sure you specify "multipart/form-data"
      const response = await axiosInstance.post("/user/bulk-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // e.g. { success: true, message, results }
    } catch (error) {
      console.error("Error uploading employees in bulk:", error);
      throw error;
    }
  },
}));

export default useEmployeeStore;
