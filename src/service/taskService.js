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




export const submitTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/admin/assign", taskData);
    console.log("Task Submitted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting task:", error);
    throw error;
  }
};
