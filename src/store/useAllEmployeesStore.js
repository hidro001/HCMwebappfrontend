import { create } from "zustand";
import { toast } from "react-hot-toast";
import {
  getEmployeesApi,
  getAllEmployeesApi,
  getEmployeeByIdApi,
  deleteUserApi,
  updateUserStatusApi,
  reassignTeamMembersApi,
} from "../service/getAllEmployeesApi";
import useEmployeeStore from "./orgStore";
import { updateEmployee } from "../service/employeeService";

const useEmployeesStore = create((set, get) => ({
  employees: [],
  filteredEmployees: [],
  selectedEmployee: null,
  loadingSelectedEmployee: false,
  totalEmployeeCount: 0,
  searchTerm: "",
  sortOrder: "asc",
  loading: false,

  // ---------- Fetch All Employees ----------
  fetchAllEmployees: async () => {
    set({ loading: true });
    try {
      const response = await getAllEmployeesApi();
      if (response.success) {
        set({
          employees: response.data,
          filteredEmployees: response.data,
          totalEmployeeCount: response.data.length,
        });
      } else {
        toast.error(response.message || "Failed to fetch employees");
      }
    } catch (error) {
      toast.error("Error fetching employees");
      console.error("Error fetching employees:", error);
    } finally {
      set({ loading: false });
    }
  },
  loadEmployeeById: async (employeeId) => {
    set({ loadingSelectedEmployee: true });
    try {
      const response = await getEmployeeByIdApi(employeeId);
      if (response.success) {
        set({ selectedEmployee: response.data });
      } else {
        toast.error(response.message || "Failed to fetch employee details");
      }
    } catch (error) {
      toast.error("Error fetching employee details");
      console.error("Error fetching employee details:", error);
    } finally {
      set({ loadingSelectedEmployee: false });
    }
  },

  resetSelectedEmployee: () => {
    set({ selectedEmployee: null });
  },

  handleSearch: (searchValue) => {
    const { employees } = get();
    const filtered = employees.filter((emp) =>
      emp.first_Name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.last_Name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.employee_Id?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.department?.toLowerCase().includes(searchValue.toLowerCase()) ||
      emp.working_Email_Id?.toLowerCase().includes(searchValue.toLowerCase())
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
   * If the user is a manager and is being deactivated, reassign their team members
   * employeeId => calls the service => updates store => returns success/error
   */
  toggleEmployeeStatus: async (employeeId, currentStatus) => {
    try {
      const response = await updateUserStatusApi(employeeId);
      if (response.success) {
        // Check if this employee is a manager (has subordinates)
        const { employees } = get();
        const employee = employees.find(emp => emp._id === employeeId || emp.employee_Id === employeeId);
        
        // If the employee is being deactivated and has subordinates, reassign them
        if (currentStatus && employee) {
          // Find all direct subordinates
          const subordinates = employees.filter(emp => 
            emp.assigned_to && emp.assigned_to.some(manager => (manager._id || manager) === employee._id)
          );
          console.log("[DEBUG] Subordinates to reassign:", subordinates.map(s => ({ id: s._id, name: s.first_Name + ' ' + s.last_Name })));

          // Helper to find the next active manager up the chain
          function findNextActiveManager(manager) {
            if (!manager || !manager.assigned_to || manager.assigned_to.length === 0) return null;
            for (const mgr of manager.assigned_to) {
              const mgrId = mgr._id || mgr; // handle both object and string
              const mgrObj = employees.find(e => e._id === mgrId);
              if (mgrObj) {
                if (mgrObj.isActive) return mgrObj;
                const next = findNextActiveManager(mgrObj);
                if (next) return next;
              }
            }
            return null;
          }

          let allSuccess = true;
          for (const subordinate of subordinates) {
            const nextActiveManager = findNextActiveManager(employee);
            console.log(`[DEBUG] For subordinate ${subordinate._id} (${subordinate.first_Name} ${subordinate.last_Name}), next active manager:`, nextActiveManager ? { id: nextActiveManager._id, name: nextActiveManager.first_Name + ' ' + nextActiveManager.last_Name } : null);
            const formData = new FormData();
            if (nextActiveManager) {
              // Send as array if backend expects it
              formData.append("assigned_to", nextActiveManager._id);
              // If backend expects array: formData.append('assigned_to[]', nextActiveManager._id);
            }
            // If no active manager, do not append assigned_to (or append empty if backend expects it)
            if (!nextActiveManager) {
              // formData.append("assigned_to", ""); // Uncomment if backend expects empty string/array
            }
            // Debug log what is being sent
            for (let pair of formData.entries()) {
              console.log(`[DEBUG] API payload for subordinate ${subordinate._id}:`, pair[0], pair[1]);
            }
            const updateRes = await updateEmployee(subordinate._id, formData);
            if (updateRes.success) {
              toast.success(`Reassigned ${subordinate.first_Name} ${subordinate.last_Name} to ${nextActiveManager ? nextActiveManager.first_Name + ' ' + nextActiveManager.last_Name : 'no manager'}`);
            } else {
              allSuccess = false;
              toast.error(`Failed to reassign ${subordinate.first_Name} ${subordinate.last_Name}`);
            }
          }

          if (subordinates.length > 0) {
            if (allSuccess) {
              toast.success("Manager deactivated and all team members reassigned to next active manager!");
            } else {
              toast.warning("Manager deactivated but some team members could not be reassigned. Please check manually.");
            }
          } else {
            toast.success("User deactivated successfully!");
          }
        } else {
          toast.success(`User ${currentStatus ? "deactivated" : "activated"} successfully!`);
        }

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
        
        // Refresh org chart to reflect the status change
        const orgStore = useEmployeeStore.getState();
        await orgStore.forceRefresh();
        
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
