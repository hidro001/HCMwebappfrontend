import axiosInstance from "./axiosInstance";

export const fetchSubordinates = async () => {
  try {
    const response = await axiosInstance.get("/admin/subordinates");
    if (response.data.success) {
      return response.data.data; 
    }
  } catch (error) {
    console.error("Error fetching subordinates:", error);
    return [];
  }
};



