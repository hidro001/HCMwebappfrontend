import axiosInstance from "./axiosInstance";


export const fetchSubordinates = async () => {
  try {
    const response = await axiosInstance.get("/admin/subordinates");
    return response;
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    throw error;
  }
};

export const fetchBoth = async () => {
  try {
    const response = await axiosInstance.get("/admin/both");
    return response;
  } catch (error) {
    console.error("Error fetching both:", error);
    throw error;
  }
};


// chat history api ###########################################################



import axios from "axios";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL;

export const fetchChatHistory = async (employeeId, selectedUserId, accessToken) => {
  const response = await axios.get(`${SOCKET_SERVER_URL}/api/v1/chats/messages`, {
    params: { user1: employeeId, user2: selectedUserId },
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
