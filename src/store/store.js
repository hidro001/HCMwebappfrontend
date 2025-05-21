
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useNotificationStore from "./notificationStore"; 
// import useNotificationStore from "./notificationStore";
import useEngagementStore from "./engagementStore";
import { logout as logoutAPI } from "../service/service"; // ✅ Import API

const useAuthStore = create(
  persist(
    (set, get) => ({
      // Initial state clearly defined here (no direct localStorage!)
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

      // Actions
     // Updated Zustand login action
login: (userData) => {
  const {
    accessToken,
    _id,
    userRole,
    permissionRole,
    first_Name,
    last_Name,
    userName, // ⬅️ explicitly extracting userName as well
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

  // ✅ Clearly handle both scenarios
  const resolvedUserName = userName 
    ? userName 
    : `${first_Name || ""}${last_Name ? " " + last_Name : ""}`.trim();

  set({
    isAuthenticated: true,
    _id,
    userRole,
    permissionRole,
    userName: resolvedUserName, // ⬅️ Fixed here
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

  if (notifications && Array.isArray(notifications)) {
    useNotificationStore.getState().setNotifications(notifications);
    useNotificationStore
      .getState()
      .setUnreadCount(notifications.filter((n) => !n.isRead).length);
  }

  if (
    engagement_permission &&
    Array.isArray(engagement_permission.permissions)
  ) {
    useEngagementStore
      .getState()
      .setPermissions(engagement_permission.permissions);
  }

  if (permissions.includes("dashboard-super")) {
    window.location.href = "/dashboard/super-employee-dashboard";
  } else if (permissions.includes("dashboard-employee")) {
    window.location.href = "/dashboard/employee";
  } else {
    window.location.href = "/dashboard";
  }
},


 logout: async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await logoutAPI(); // 🔥 API call to invalidate token in DB
    }
  } catch (error) {
    console.warn("Logout API failed. Proceeding with local logout.");
  }

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
      setCompanyInfo: (companyData) => {
        const currentCompanyInfo = get().companyInfo;
        if (
          JSON.stringify(currentCompanyInfo) !== JSON.stringify(companyData)
        ) {
          set({ companyInfo: companyData });
        }
      },
    }),
    {
      name: "auth-storage", // Zustand handles localStorage persistence
    }
  )
);

export default useAuthStore;
