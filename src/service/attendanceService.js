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
