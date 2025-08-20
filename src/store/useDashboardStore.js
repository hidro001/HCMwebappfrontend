import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";

export const useDashboardStore = create((set) => ({
  // Shared state (works for both super admin & manager)
  totalUsers: 0,
  usersLoggedInToday: 0,
  employeesOnLeaveToday: 0,
  employeesPerDepartment: [],
  employeesPerEmployeeType: [],
  maleCount: 0,
  femaleCount: 0,
  monthlyHiringTrend: [],
  salaryRange: [],
  ageDistribution: [],
  totalSalaries: 0,
  topDesignations: [],
  attendanceDetails: [],
  attendanceDetailsLoading: false,
  hiringDetails: [],
  hiringDetailsLoading: false,
  error: null,
  loading: false,

  // 🔹 Super Admin: Fetch Global Dashboard Stats
  fetchDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/dashboard-stats/super-admin");
      if (response.data.success) {
        set({
          totalUsers: response.data.totalUsers ?? 0,
          usersLoggedInToday: response.data.numberOfUsersLoggedInToday ?? 0,
          employeesOnLeaveToday: response.data.numberOfEmployeesOnLeaveToday ?? 0,
          employeesPerDepartment: Array.isArray(response.data.employeesPerDepartment)
            ? response.data.employeesPerDepartment
            : [],
          employeesPerEmployeeType: Array.isArray(response.data.employeesPerEmployeeType)
            ? response.data.employeesPerEmployeeType
            : [],
          maleCount: response.data.maleCount ?? 0,
          femaleCount: response.data.femaleCount ?? 0,
          monthlyHiringTrend: Array.isArray(response.data.monthlyHiringTrend)
            ? response.data.monthlyHiringTrend
            : [],
          salaryRange: Array.isArray(response.data.salaryRange)
            ? response.data.salaryRange
            : [],
          ageDistribution: Array.isArray(response.data.ageDistribution)
            ? response.data.ageDistribution
            : [],
          totalSalaries: response.data.totalSalaries ?? 0,
        });
      } else {
        set({ error: response.data.message || "Failed to fetch dashboard stats" });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSubordinateDashboardStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/attendance/getSubordinateStats");
      if (response.data.success) {
        const apiData = response.data.data;

        set({
          totalUsers: apiData.totalUsers ?? apiData.count ?? 0,
          usersLoggedInToday: apiData.usersLoggedInToday ?? 0,
          employeesOnLeaveToday: apiData.employeesOnLeaveToday ?? 0,
          employeesPerDepartment: Array.isArray(apiData.employeesPerDepartment)
            ? apiData.employeesPerDepartment
            : [],
          employeesPerEmployeeType: Array.isArray(apiData.employeesPerEmployeeType)
            ? apiData.employeesPerEmployeeType
            : [],
          maleCount: apiData.maleCount ?? 0,
          femaleCount: apiData.femaleCount ?? 0,
          monthlyHiringTrend: Array.isArray(apiData.monthlyHiringTrend)
            ? apiData.monthlyHiringTrend
            : [],
          salaryRange: Array.isArray(apiData.salaryRange)
            ? apiData.salaryRange
            : [],
          ageDistribution: Array.isArray(apiData.ageDistribution)
            ? apiData.ageDistribution
            : [],
          totalSalaries: apiData.totalSalaries ?? 0,
        });
      } else {
        set({ error: response.data.message || "Failed to fetch subordinate stats" });
      }
    } catch (error) {
      console.error("Error fetching subordinate stats:", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Attendance Details (Super Admin only)
  fetchAttendanceDetails: async () => {
    try {
      set({ attendanceDetailsLoading: true });
      const response = await axiosInstance.get("/dashboard-stats/super-admin/attendance-details");
      if (response.data.success) {
        set({ attendanceDetails: response.data.attendanceDetails ?? [] });
      }
    } catch (error) {
      console.error("Error fetching attendance details:", error);
    } finally {
      set({ attendanceDetailsLoading: false });
    }
  },

  // 🔹 Leave Details (future use)
  fetchLeaveDetails: async () => {
    try {
      await axiosInstance.get("/admin/leave-details");
    } catch (error) {
      console.error("Error fetching leave details:", error);
    }
  },

  // 🔹 Top Designations
  fetchTopDesignations: async (month, year) => {
    try {
      const response = await axiosInstance.get("/kpi/ratings/top-designations", {
        params: { month, year },
      });
      if (response.data.success) {
        set({
          topDesignations: Array.isArray(response.data.data)
            ? response.data.data
            : [],
        });
      } else {
        console.error("Failed to fetch top designations:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching top designations:", error);
    }
  },

  // 🔹 Hiring Details
  fetchHiringDetails: async (month, year) => {
    try {
      set({ hiringDetailsLoading: true });
      const res = await axiosInstance.get("/dashboard-stats/super-admin/hiring-details", {
        params: { month, year },
      });
      if (res.data.success) {
        set({ hiringDetails: res.data.hires ?? [] });
      }
    } catch (err) {
      console.error("Error fetching hiring details:", err);
    } finally {
      set({ hiringDetailsLoading: false });
    }
  },
}));
