// useDashboardStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance"; // Your custom axios setup

export const useDashboardStore = create((set) => ({
  // State fields
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
  attendanceDetails: [],          // NEW
  attendanceDetailsLoading: false, // NEW
  hiringDetails: [],              // NEW
  hiringDetailsLoading: false,    // NEW

  // ----------------------------
  // Fetches main dashboard stats
  // ----------------------------
  fetchDashboardStats: async () => {
    try {
      const response = await axiosInstance.get("/dashboard-stats/super-admin");
      if (response.data.success) {
        set({
          totalUsers: response.data.totalUsers ?? 0,
          usersLoggedInToday: response.data.numberOfUsersLoggedInToday ?? 0,
          employeesOnLeaveToday:
            response.data.numberOfEmployeesOnLeaveToday ?? 0,
          employeesPerDepartment: Array.isArray(
            response.data.employeesPerDepartment
          )
            ? response.data.employeesPerDepartment
            : [],
          employeesPerEmployeeType: Array.isArray(
            response.data.employeesPerEmployeeType
          )
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
        console.error(
          "Failed to fetch dashboard stats:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  },

  // --------------------------------
  // For attendance details (example)
  // --------------------------------
// For attendance details
fetchAttendanceDetails: async () => {
  try {
    // Optional: set a loading state if you want
    set({ attendanceDetailsLoading: true });

    const response = await axiosInstance.get('/dashboard-stats/super-admin/attendance-details');
    if (response.data.success) {
      // Save the fetched array into the Zustand store
      set({
        attendanceDetails: response.data.attendanceDetails ?? [],
      });
    }
  } catch (error) {
    console.error('Error fetching attendance details:', error);
  } finally {
    // Optional: turn off the loading state
    set({ attendanceDetailsLoading: false });
  }
},


  // --------------------------------
  // For leave details (example)
  // --------------------------------
  fetchLeaveDetails: async () => {
    try {
      const response = await axiosInstance.get("/admin/leave-details");
      // Replace with logic to update any store state if desired
      // e.g., set({ leaveDetails: response.data.leaveDetails || [] });
    } catch (error) {
      console.error("Error fetching leave details:", error);
    }
  },

  // ---------------------------------------------
  // Fetches top-rated designations for a given month/year
  // ---------------------------------------------
  fetchTopDesignations: async (month, year) => {
    try {
      const response = await axiosInstance.get(
        "/kpi/ratings/top-designations",
        {
          params: { month, year },
        }
      );
      if (response.data.success) {
        set({
          topDesignations: Array.isArray(response.data.data)
            ? response.data.data
            : [],
        });
      } else {
        console.error(
          "Failed to fetch top designations:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching top designations:", error);
    }
  },

  fetchHiringDetails: async (month, year) => {
        try {
          set({ hiringDetailsLoading: true });
          const res = await axiosInstance.get(
            "/dashboard-stats/super-admin/hiring-details",
            { params: { month, year } }
          );
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
