import { create } from "zustand";
import { toast } from "react-hot-toast";
import { getEmployeesApi,getEmployeeByIdApi,getAllEmployeesApi } from "../service/getAllEmployeesApi";

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
        const errorMessage =
          response?.message || "Failed to fetch employees.";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      const errMsg = err?.message || "An error occurred while fetching employees.";
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
        const errorMessage =
          response?.message || "Failed to fetch employees.";
        set({ error: errorMessage });
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      const errMsg = err?.message || "An error occurred while fetching employees.";
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
        (employee.employee_Id && employee.employee_Id.toLowerCase().includes(lowerValue))
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
}));

export default useEmployeesStore;
