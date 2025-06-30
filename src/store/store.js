import { create } from "zustand";
import { persist } from "zustand/middleware";
import useNotificationStore from "./notificationStore";
import useEngagementStore  from "./engagementStore";
import { logout as logoutAPI, removeFcmToken } from "../service/service";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ─── State ──────────────────────────────────────────────────────────────
      isAuthenticated: false,
      _id: "",
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
      permissions: [],
      companyInfo: null,

      // ─── Actions ────────────────────────────────────────────────────────────

      // 1) Full login (sets token, stores data, fetches notifications & permissions)
      login: (userData) => {
        const {
          accessToken,
          _id,
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
          notifications,
          engagement_permission,
        } = userData;
    
        localStorage.setItem("employeeId", employeeId);
        const resolvedUserName = userName
          ? userName
          : `${first_Name || ""}${last_Name ? " " + last_Name : ""}`.trim();

        set({
          isAuthenticated: true,
          _id,
          userRole,
          permissionRole,
          userName: resolvedUserName,
          employeeId,
          department,
          workingEmail,
          phoneNumber,
          designation,
          departmentAlocated,
          teams,
          userAvatar,
          permissions: permissions || [],
        });
        localStorage.setItem("accessToken", accessToken);

        if (Array.isArray(notifications)) {
          const notifStore = useNotificationStore.getState();
          notifStore.setNotifications(notifications);
          notifStore.setUnreadCount(
            notifications.filter((n) => !n.isRead).length
          );
        }
        if (
          engagement_permission &&
          Array.isArray(engagement_permission.permissions)
        ) {
          useEngagementStore
            .getState()
            .setPermissions(engagement_permission.permissions);
        }

        // Redirect based on permission
        if (permissions.includes("dashboard-super")) {
          window.location.href = "/dashboard/super-employee-dashboard";
        } else if (permissions.includes("dashboard-employee")) {
          window.location.href = "/dashboard/employee";
        } else if (permissions.includes("registration/edit-rest-detail")) {
          window.location.href = "/dashboard/registration/edit-rest-detail";
        } else {
          window.location.href = "/dashboard";
        }
      },

      // 2) Full logout (calls backend + clears state)
      logout: async () => {
        try {
          const token    = localStorage.getItem("accessToken");
          const fcmToken = localStorage.getItem("fcm_token");

          if (token) {
            await logoutAPI();
          }
          if (fcmToken) {
            await removeFcmToken(fcmToken).catch(() =>
              console.warn("⚠️ Failed to remove FCM token from backend.")
            );
            localStorage.removeItem("fcm_token");
          }
        } catch {
          console.warn("Logout API failed. Proceeding with local logout.");
        }

        // Now reset everything
        
        set({
          isAuthenticated: false,
          _id: "",
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
          permissions: [],
          companyInfo: null,
        });
        localStorage.removeItem("accessToken");
        useNotificationStore.getState().clearNotifications();
        useEngagementStore.getState().resetPermissions();
      },

      // 3) Local‐only clear (no network) for interceptor use

      clearAuthState: () => {
        set({
          isAuthenticated: false,
          _id: "",
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
          permissions: [],
          companyInfo: null,
        });
        localStorage.removeItem("accessToken");
        useNotificationStore.getState().clearNotifications();
        useEngagementStore.getState().resetPermissions();
      },

      // 4) Optional helper

      setCompanyInfo: (companyData) => {
        const current = get().companyInfo;
        if (JSON.stringify(current) !== JSON.stringify(companyData)) {
          set({ companyInfo: companyData });
        }
      },

    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
