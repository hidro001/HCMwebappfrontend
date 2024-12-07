// src/services/api.js

import axios from "axios";

// // Get manager's leave requests
// const getManagerLeaveRequestsByStatus = () => {
//   return axios.get(`https://apiv2.humanmaximizer.com/api/v1/leave/manager/leaverequests`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   });
// };

// const API_URL = "https://apiv2.humanmaximizer.com/api/v1/leave"; // Update if necessary
const API_URL = "https://apiv2.humanmaximizer.com/api/v1/leave"; // Update if necessary

// Leaves
export const applyLeave = (data) =>
  axios.post(`${API_URL}/apply-leave`, data, getAuthHeaders());

export const getEmployeeLeavesByStatus = (status) =>
  axios.get(`${API_URL}/employee/leaves?status=${status}`, getAuthHeaders());

export const getAssignedLeavesByStatus = (status) =>
  axios.get(`${API_URL}/assigned/leaves?status=${status}`, getAuthHeaders());

export const handleLeaveRequest = (leaveId, data) =>
  axios.put(`${API_URL}/handle-leave/${leaveId}`, data, getAuthHeaders());

// Notifications
export const getNotifications = () =>
  axios.get(`${API_URL}/notifications`, getAuthHeaders());

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Fetch User Profile (optional, if needed elsewhere)
export const fetchUserProfile = async () => {
  const response = await axios.get(
    `https://apiv2.humanmaximizer.com/api/v1/user/user-profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data.success) {
    return response.data.response;
  } else {
    throw new Error(response.data.message || "Failed to fetch user profile.");
  }
};

// Fetch Company Settings (optional, if needed elsewhere)
export const fetchCompanySettings = async () => {
  const response = await axios.get(
    `${API_URL}/superadmin/companysettings/settings`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(
      response.data.message || "Failed to fetch company settings."
    );
  }
};
