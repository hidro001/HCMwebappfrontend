import axiosInstance from "./axiosInstance";

export const getEmployeeProfile = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/user/profile/${employeeId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    throw error;
  }
};
