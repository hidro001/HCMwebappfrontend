// src/store/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useNotificationStore from "./notificationStore"; 
import useEngagementStore from "./engagementStore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Authentication States
      isAuthenticated: !!localStorage.getItem("accessToken"),
      _id: localStorage.getItem("_id") || "", // Add this line
      userRole: localStorage.getItem("userRole") || "",
      permissionRole: localStorage.getItem("permissionRole") || "",
      userName: localStorage.getItem("userName") || "",
      employeeId: localStorage.getItem("employeeId") || "",
      department: localStorage.getItem("department") || "",
      workingEmail: localStorage.getItem("workingEmail") || "",
      phoneNumber: localStorage.getItem("phoneNumber") || "",
      designation: localStorage.getItem("designation") || "",
      departmentAlocated:
        JSON.parse(localStorage.getItem("departmentAlocated")) || [],
      teams: JSON.parse(localStorage.getItem("teams")) || [],
      userAvatar: localStorage.getItem("userAvatar") || "",

      // Company Information States
      companyInfo: JSON.parse(localStorage.getItem("companyInfo")) || null,

      // Actions
      login: (userData) => {
        const {
          accessToken,
          _id, // Extract _id
          userRole,
          permissionRole,
          first_Name,
          last_Name,
          userName,
          employeeId,
          department,
          workingEmail,
          phoneNumber,
          designation,
          departmentAlocated,
          teams,
          userAvatar,
          permissions,
          notifications, // Extract notifications from userData
          engagement_permission, // Extract engagement_permission from userData
        } = userData;

        // Update Authentication State
        set({
          _id, // Store _id
          isAuthenticated: true,
          userRole,
          permissionRole,
          first_Name,
          last_Name,
          userName,
          employeeId,
          department,
          workingEmail,
          phoneNumber,
          designation,
          departmentAlocated,
          teams,
          userAvatar,
          permissions,
        });

        // Persist to localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("permissionRole", permissionRole);
        localStorage.setItem("userName", userName);
        localStorage.setItem("employeeId", employeeId);
        localStorage.setItem("department", department);
        localStorage.setItem("workingEmail", workingEmail);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("designation", designation);
        localStorage.setItem(
          "departmentAlocated",
          JSON.stringify(departmentAlocated)
        );
        localStorage.setItem("teams", JSON.stringify(teams));
        localStorage.setItem("userAvatar", userAvatar || "");
        localStorage.setItem("_id", _id || ""); // Store _id
        const userPermissions = permissions || [];
        if (userPermissions.includes("dashboard-super")) {
          window.location.href = "/dashboard/super-employee-dashboard";
        } else if (userPermissions.includes("dashboard-employee")) {
          window.location.href = "/dashboard/employee";
        } else {
          // fallback if user doesn't have either
          window.location.href = "/dashboard";
        }

        // Fetch notifications after login
        //  useNotificationStore.getState().fetchNotifications();
        // Initialize notifications in the notification store
        if (notifications && Array.isArray(notifications)) {
          useNotificationStore.getState().setNotifications(notifications);
          useNotificationStore
            .getState()
            .setUnreadCount(notifications.filter((n) => !n.isRead).length);
        }
        // Set engagement permissions in the engagement store

        if (
          engagement_permission &&
          Array.isArray(engagement_permission.permissions)
        ) {
          useEngagementStore
            .getState()
            .setPermissions(engagement_permission.permissions);
        }
      },

      setCompanyInfo: (companyData) => {
        const currentCompanyInfo = get().companyInfo;
        // Deep compare current and new companyData
        if (
          JSON.stringify(currentCompanyInfo) !== JSON.stringify(companyData)
        ) {
          set({ companyInfo: companyData });
          localStorage.setItem("companyInfo", JSON.stringify(companyData));
        }
        // If identical, do nothing to prevent redundant updates
      },

      logout: () => {
        // Clear Authentication and Company State
        set({
          isAuthenticated: false,
          _id: "", // Clear _id
          userRole: "",
          permissionRole: "",
          userName: "",
          employeeId: "",
          department: "",
          workingEmail: "",
          phoneNumber: "",
          designation: "",
          departmentAlocated: [],
          teams: [],
          userAvatar: "",
          companyInfo: null,
        });

        // Remove from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("permissionRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("employeeId");
        localStorage.removeItem("department");
        localStorage.removeItem("workingEmail");
        localStorage.removeItem("phoneNumber");
        localStorage.removeItem("designation");
        localStorage.removeItem("departmentAlocated");
        localStorage.removeItem("teams");
        localStorage.removeItem("userAvatar");
        localStorage.removeItem("_id"); // Remove _id
        localStorage.removeItem("companyInfo");
        // Clear notifications from the notification store
        useNotificationStore.getState().clearNotifications();
        // Reset engagement permissions
        useEngagementStore.getState().resetPermissions();
      },
    }),
    {
      name: "auth-storage", // unique name
    }
  )
);

export default useAuthStore;
