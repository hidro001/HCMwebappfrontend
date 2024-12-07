// import axios from "axios";

// export const API_BASE_URL_NEW = "https://apiv2.humanmaximizer.com";

// export const fetchNotifications = async () => {
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL_NEW}/api/v1/admin/notification`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     throw error;
//   }
// };

// export const markAllAsRead = async () => {
//   try {
//     await axios.post(
//       `${API_BASE_URL_NEW}/api/v1/admin/notification/markAllAsRead`
//     );
//   } catch (error) {
//     console.error("Error marking all notifications as read:", error);
//     throw error;
//   }
// };

// export const deleteAllNotifications = async () => {
//   try {
//     await axios.delete(
//       `${API_BASE_URL_NEW}/api/v1/admin/delete-all-notification`
//     );
//   } catch (error) {
//     console.error("Error deleting all notifications:", error);
//     throw error;
//   }
// };

// export const deleteNotification = async (notificationId) => {
//   try {
//     await axios.delete(
//       `${API_BASE_URL_NEW}/api/v1/admin/notification/${notificationId}`
//     );
//   } catch (error) {
//     console.error(
//       "Error deleting notification:",
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// };

// export const markAsRead = async (notificationId) => {
//   try {
//     await axios.post(
//       `${API_BASE_URL_NEW}/api/v1/admin/notification/markAsRead/${notificationId}`
//     );
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     throw error;
//   }
// };
