import axiosInstance from "./axiosInstance";




export const getEmployeeProfile = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/superadmin/myprofile/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    throw error;
  }
};
