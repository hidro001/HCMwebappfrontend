import axiosInstance from "./axiosInstance";


export const fetchSubordinates = async () => {
  try {
    const response = await axiosInstance.get("/user/get-all");
    return response;
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    throw error;
  }
};

export const fetchBoth = async () => {
  try {
    const response = await axiosInstance.get("/user/get-all");
    return response;
  } catch (error) {
    console.error("Error fetching both:", error);
    throw error;
  }
};



export const fetchAllMember = async () => {
  try {
    const response = await axiosInstance.get("/chat/member");
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};



// chatService.js (or wherever fetchChatHistory is defined)
export const fetchChatHistory = async (employeeId, selectedUserId) => {
  try {
    const response = await axiosInstance.get(`/chat/messages`, {
      params: { user1: employeeId, user2: selectedUserId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return { success: false, message: "Failed to fetch chat history", error };
  }
};
