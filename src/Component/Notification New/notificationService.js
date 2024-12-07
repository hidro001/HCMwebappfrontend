// services/notificationService.js
import axios from "axios";

const API_URL = "https://apiv2.humanmaximizer.com/api/v1/notification"; // Replace with your backend base URL

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(
      `${API_URL}/mark-as-read`,
      { notificationId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Adjust token retrieval as needed
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
