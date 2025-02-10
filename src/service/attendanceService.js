// services/attendanceService.js

import axiosInstance from "./axiosInstance"; // your configured Axios instance

const attendanceService = {
  // Fetch subordinates for a given userId
  getSubordinates: (userId) => {
    // Could also do query param like: `/admin/subordinates?userId=${userId}`
    // or pass in data in the request body. Adjust as needed.
    return axiosInstance.get("/admin/subordinates", {
      params: { userId },
    });
  },
  getAllUser: (userId) => {
    // Could also do query param like: `/admin/subordinates?userId=${userId}`
    // or pass in data in the request body. Adjust as needed.
    return axiosInstance.get("/superadmin/employees", {
      params: { userId },
    });
  },

  // Fetch all departments
  getDepartments: () => {
    return axiosInstance.get("/superadmin/departments");
  },

  // Fetch stats
  getStats: () => {
    return axiosInstance.get("/admin/stats");
  },
};

export default attendanceService;




/**
 * 1) Top squares: Overview
 */
export async function fetchOverview() {
  try {

    const response = await axiosInstance.get(`/admin/attendance-dashboard/overview`, );
    return response.data; // or response.data.data if you prefer
  } catch (error) {
    console.error("Error in fetchOverview:", error);
    throw error; // Re-throw so caller can handle
  }
}

/**
 * 2) Absenteeism chart
 */
export async function fetchAbsenteeismChart() {
  try {

    const response = await axiosInstance.get(`/admin/attendance-dashboard/absenteeism`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchAbsenteeismChart:", error);
    throw error;
  }
}

/**
 * 3) Attendance Today (doughnut)
 */
export async function fetchAttendanceToday() {
  try {

    const response = await axiosInstance.get(`/admin/attendance-dashboard/attendance-today`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchAttendanceToday:", error);
    throw error;
  }
}

/**
 * 4) Employee Overview (doughnut)
 */
export async function fetchEmployeeOverview() {
  try {

    const response = await axiosInstance.get(`/admin/attendance-dashboard/employee-overview`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchEmployeeOverview:", error);
    throw error;
  }
}

/**
 * 5) Late In Today (table)
 */
export async function fetchLateInToday() {
  try {

    const response = await axiosInstance.get(`/admin/attendance-dashboard/late-in-today`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchLateInToday:", error);
    throw error;
  }
}
