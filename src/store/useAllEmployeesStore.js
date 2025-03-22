import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  getEmployeesApi,
  getEmployeeByIdApi,
  getAllEmployeesApi,
  deleteUserApi,
  // restoreUserApi,
  updateUserStatusApi,
} from "../service/getAllEmployeesApi";

const useEmployeesStore = create((set, get) => ({
  // State
  employees: [],
  filteredEmployees: [],
  totalEmployeeCount: 0,
  searchTerm: "",
  sortOrder: "asc",
  loading: false,
  error: null,

  // Fetch employees from the backend
  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getEmployeesApi();
      if (response?.success) {
        const employeesFromApi = response.data || [];

        // Filter out any invalid employees if needed
        const validEmployees = employeesFromApi.filter(
          (employee) => employee._id
        );

        // Sort employees by first name || last name || employee_Id
        const sortedEmployees = validEmployees.sort((a, b) =>
          (a.first_Name || a.last_Name || a.employee_Id || "").localeCompare(
            b.first_Name || b.last_Name || b.employee_Id || ""
          )
        );

        set({
          employees: sortedEmployees,
          filteredEmployees: sortedEmployees,
          totalEmployeeCount: response.count || sortedEmployees.length,
        });
      } else {
        const errorMessage = response?.message || "Failed to fetch employees.";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      const errMsg =
        err?.message || "An error occurred while fetching employees.";
      set({ error: errMsg });
      toast.error(errMsg);
    } finally {
      set({ loading: false });
    }
  },

  getAllEmployeesApi: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllEmployeesApi();
      if (response?.success) {
        const employeesFromApi = response.data || [];

        // Filter out any invalid employees if needed
        const validEmployees = employeesFromApi.filter(
          (employee) => employee._id
        );

        // Sort employees by first name || last name || employee_Id
        const sortedEmployees = validEmployees.sort((a, b) =>
          (a.first_Name || a.last_Name || a.employee_Id || "").localeCompare(
            b.first_Name || b.last_Name || b.employee_Id || ""
          )
        );

        set({
          employees: sortedEmployees,
          filteredEmployees: sortedEmployees,
          totalEmployeeCount: response.count || sortedEmployees.length,
        });
      } else {
        const errorMessage = response?.message || "Failed to fetch employees.";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      const errMsg =
        err?.message || "An error occurred while fetching employees.";
      set({ error: errMsg });
      toast.error(errMsg);
    } finally {
      set({ loading: false });
    }
  },

  fetchEmployeeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getEmployeeByIdApi(id);

      if (response?.success) {
        set({
          employee: response.data,
          loading: false,
        });
      } else {
        const msg = response?.message || "Failed to load employee details";
        set({ error: msg, loading: false });
        toast.error(msg);
      }
    } catch (error) {
      const errMsg = error?.message || "An error occurred";
      set({ error: errMsg, loading: false });
      toast.error(errMsg);
    }
  },

  // Handle changes in the search input
  handleSearchChange: (searchValue) => {
    const { employees } = get();
    const lowerValue = searchValue.toLowerCase();

    // Filter by name or employee_Id
    const filtered = employees.filter(
      (employee) =>
        `${employee.first_Name || ""} ${employee.last_Name || ""}`
          .toLowerCase()
          .includes(lowerValue) ||
        (employee.employee_Id &&
          employee.employee_Id.toLowerCase().includes(lowerValue))
    );

    set({ searchTerm: searchValue, filteredEmployees: filtered });
  },

  // Sort employees by name ascending/descending
  handleSortOrderChange: () => {
    const { sortOrder, filteredEmployees } = get();
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    const sorted = [...filteredEmployees].sort((a, b) =>
      newSortOrder === "asc"
        ? (a.first_Name || "").localeCompare(b.first_Name || "")
        : (b.first_Name || "").localeCompare(a.first_Name || "")
    );

    set({ sortOrder: newSortOrder, filteredEmployees: sorted });
  },
  // ---------- NEW ACTION: Delete Employee ----------
  deleteEmployee: async (employeeId) => {
    try {
      const response = await deleteUserApi(employeeId);
      if (response.success) {
        toast.success("User Deleted successfully!");
        // Remove from local state or simply re-fetch:
        const updatedEmployees = get().employees.filter(
          (emp) => emp._id !== employeeId
        );
        set({
          employees: updatedEmployees,
          filteredEmployees: updatedEmployees,
          totalEmployeeCount: updatedEmployees.length,
        });
      } else {
        toast.error(response.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting");
      console.error("Error deleting employee:", error);
    }
  },

  /**
   * Toggle active/inactive status for a user.
   * employeeId => calls the service => updates store => returns success/error
   */
  toggleEmployeeStatus: async (employeeId, currentStatus) => {
    try {
      const response = await updateUserStatusApi(employeeId);
      if (response.success) {
        // Update local store arrays
        set((state) => {
          const updated = state.employees.map((emp) => {
            if (emp._id === employeeId || emp.employee_Id === employeeId) {
              return { ...emp, isActive: !currentStatus };
            }
            return emp;
          });
          return {
            employees: updated,
            filteredEmployees: updated,
          };
        });
        toast.success(
          `User ${currentStatus ? "deactivated" : "activated"} successfully!`
        );
      } else {
        throw new Error(response.message || "Failed to update user status.");
      }
    } catch (error) {
      toast.error(
        error.message || "Failed to update user status. Please try again."
      );
      console.error("Error toggling user status:", error);
    }
  },

  // ---------- If needed: Restore Employee ----------
  // restoreEmployee: async (employeeId) => {
  //   try {
  //     const response = await restoreUserApi(employeeId);
  //     if (response.success) {
  //       toast.success("Employee restored successfully!");
  //       // Re-fetch or add to local state
  //     } else {
  //       toast.error(response.message || "Failed to restore user");
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "An error occurred while restoring");
  //     console.error("Error restoring employee:", error);
  //   }
  // },
}));

export default useEmployeesStore;
