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





export const fetchOverview = async () => {
  try {
    const response = await axiosInstance.get(`/attendance-dashboard/overview`);
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching overview:", error);
    return null;
  }
};

export const fetchAbsenteeismChartApi = async () => {
  try {
    const response = await axiosInstance.get(`/attendance-dashboard/absenteeism`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching absenteeism chart:", error);
    return null;
  }
};

export const fetchAttendanceToday = async () => {
  try {
    const response = await axiosInstance.get(`/attendance-dashboard/attendance-today`);
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching attendance today:", error);
    return null;
  }
};

export const fetchEmployeeOverview = async () => {
  try {
    const response = await axiosInstance.get(`/attendance-dashboard/employee-overview`);
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching employee overview:", error);
    return null;
  }
};

export const fetchLateInToday = async () => {
  try {
    const response = await axiosInstance.get(`/attendance-dashboard/late-in-today`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching late-in today:", error);
    return null;
  }
};
