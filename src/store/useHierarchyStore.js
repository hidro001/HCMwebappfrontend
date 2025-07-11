import { create } from "zustand";
import axiosInstance from "../service/axiosInstance"; // your configured axios

export const useHierarchyStore = create((set) => ({
  // ---------------- State ----------------
  departments: [],
  designations: [],
  roles: [],

  loading: false,
  error: null,

  // ---------------- DEPARTMENT Logic ----------------
  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/departments");
      if (response.data.success) {
        set({ departments: response.data.data || [] });
      } else {
        set({ error: response.data.message || "Failed to fetch departments" });
        throw new Error(response.data.message || "Failed to fetch departments");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addDepartment: async (departmentName) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post("/departments", {
        department: departmentName,
      });
      if (response.data.success) {
        set((state) => ({
          departments: [...state.departments, response.data.data],
        }));
      } else {
        set({ error: response.data.message || "Failed to add department" });
        throw new Error(response.data.message || "Failed to add department");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateDepartment: async (departmentId, newName) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.put(`/departments/${departmentId}`, {
        department: newName,
      });
      if (response.data.success) {
        set((state) => ({
          departments: state.departments.map((dept) =>
            dept._id === departmentId ? { ...dept, department: newName } : dept
          ),
        }));
      } else {
        set({ error: response.data.message || "Failed to update department" });
        throw new Error(response.data.message || "Failed to update department");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteDepartment: async (departmentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.delete(
        `/departments/${departmentId}`
      );
      if (response.data.success) {
        set((state) => ({
          departments: state.departments.filter(
            (dept) => dept._id !== departmentId
          ),
        }));
      } else {
        set({ error: response.data.message || "Failed to delete department" });
        throw new Error(response.data.message || "Failed to delete department");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // ---------------- DESIGNATION Logic ----------------
  fetchDesignations: async () => {
    set({ loading: true, error: null });
    try {
      // GET /designations/get
      const response = await axiosInstance.get("/designation/get");
      if (response.data.success) {
        // Map "id" -> "_id" and "designation" stays the same
        const mapped = response.data.data.map((item) => ({
          _id: item.id,
          designation: item.designation,
          notice_period: item.notice_period,
        }));
        set({ designations: mapped });
      } else {
        set({ error: response.data.message || "Failed to fetch designations" });
        throw new Error(
          response.data.message || "Failed to fetch designations"
        );
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addDesignation: async (designationName,notice_period ) => {
    set({ loading: true, error: null });
    try {
      // POST /designations/add expects { designation_name: "X" }
      const response = await axiosInstance.post("/designation/add", {
        designation_name: designationName,
        notice_period: notice_period,
      });
      if (response.data.success) {
        // Suppose server returns { id: "...", designation_name: "..." }
        const created = response.data.data;
        const newDes = {
          _id: created.id || created._id,
          designation: created.designation_name,
          notice_period: created.notice_period,
        };
        set((state) => ({
          designations: [...state.designations, newDes],
        }));
      } else {
        set({ error: response.data.message || "Failed to add designation" });
        throw new Error(response.data.message || "Failed to add designation");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateDesignation: async (designationId, newName, newNoticePeriod) => {
    set({ loading: true, error: null });
    try {
      // PUT /designations/:id expects { designation_name: "X" }
      const response = await axiosInstance.put(
        `/designation/${designationId}`,
        {
          designation_name: newName,
          notice_period: newNoticePeriod,
        }
      );
      if (response.data.success) {
        // Suppose server returns updated data in response.data.data
        const updated = response.data.data;
        set((state) => ({
          designations: state.designations.map((des) =>
            des._id === designationId
              ? {
                  _id: updated.id || designationId,
                  designation: updated.designation_name,
                   notice_period: updated.notice_period,
                }
              : des
          ),
        }));
      } else {
        set({
          error: response.data.message || "Failed to update designation",
        });
        throw new Error(
          response.data.message || "Failed to update designation"
        );
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteDesignation: async (designationId) => {
    set({ loading: true, error: null });
    try {
      // DELETE /designations/:id
      const response = await axiosInstance.delete(
        `/designation/${designationId}`
      );
      if (response.data.success) {
        set((state) => ({
          designations: state.designations.filter(
            (des) => des._id !== designationId
          ),
        }));
      } else {
        set({
          error: response.data.message || "Failed to delete designation",
        });
        throw new Error(
          response.data.message || "Failed to delete designation"
        );
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  fetchRoles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/permission-role/get");

      if (response.data.success) {
        const mapped = response.data.data.map((r) => ({
          _id: r.id,
          role_name: r.role_name,
          permission: r.permission,
          // or rename if you want consistency
        }));
        set({ roles: mapped });
      } else {
        set({ error: response.data.message || "Failed to fetch roles" });
        throw new Error(response.data.message || "Failed to fetch roles");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addRole: async (roleName, permissionArray) => {
    set({ loading: true, error: null });
    try {
      // POST /api/v1/permission_roles
      // The server expects { role_name, permission: [{name, permission}] }
      const payload = {
        role_name: roleName,
        permission: permissionArray.map((perm) => ({
          name: perm.label,
          permission: perm.value,
        })),
      };
      const response = await axiosInstance.post(
        "/permission-role/add",
        payload
      );
      if (response.data.success) {
        // The newly created role is in response.data.data
        const newRole = response.data.data;
        // rename 'id' -> '_id'
        const mappedRole = {
          _id: newRole._id || newRole.id,
          role_name: newRole.role_name,
          permission: newRole.permission,
        };

        set((state) => ({
          roles: [...state.roles, mappedRole],
        }));
      } else {
        set({ error: response.data.message || "Failed to add role" });
        throw new Error(response.data.message || "Failed to add role");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateRole: async (roleId, updatedRoleName, updatedPermissionArray) => {
    set({ loading: true, error: null });
    try {
      // The server expects { role_name, permission: [{name, permission}] }
      const payload = {
        role_name: updatedRoleName,
        permission: updatedPermissionArray.map((perm) => ({
          name: perm.label,
          permission: perm.value,
        })),
      };
      // PUT /api/v1/permission_roles/:id
      const response = await axiosInstance.put(
        `/permission-role/${roleId}`,
        payload
      );
      if (response.data.success) {
        // The updated role is in response.data.data
        const updatedRole = response.data.data;
        // rename 'id' -> '_id'
        const mappedRole = {
          _id: updatedRole._id || updatedRole.id,
          role_name: updatedRole.role_name,
          permission: updatedRole.permission,
        };

        // Replace old role in local state
        set((state) => ({
          roles: state.roles.map((r) => (r._id === roleId ? mappedRole : r)),
        }));
      } else {
        set({ error: response.data.message || "Failed to update role" });
        throw new Error(response.data.message || "Failed to update role");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteRole: async (roleId) => {
    set({ loading: true, error: null });
    try {
      // DELETE /api/v1/permission_roles/:id
      const response = await axiosInstance.delete(`/permission-role/${roleId}`);
      if (response.data.success) {
        set((state) => ({
          roles: state.roles.filter((r) => r._id !== roleId),
        }));
      } else {
        set({ error: response.data.message || "Failed to delete role" });
        throw new Error(response.data.message || "Failed to delete role");
      }
    } catch (err) {
      set({ error: err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
