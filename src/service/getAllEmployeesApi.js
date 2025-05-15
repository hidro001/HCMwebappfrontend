import axiosInstance from "./axiosInstance"; 

export const getEmployeesApi = async () => {
  try {
    const response = await axiosInstance.get("/subordinates");
    return response.data; 
  } catch (error) {
    throw error;
  }
};
export const getAllEmployeesApi = async () => {
  try {
    const response = await axiosInstance.get("/user/get-all");
    return response.data;  
  } catch (error) {
    throw error;
  }
};


export const getEmployeeByIdApi = async (employeeId) => {
  const { data } = await axiosInstance.get(`/user/get/${employeeId}`);
  return data; 
};

/**
 * Delete user by employeeId
 */
export const deleteUserApi = async (employeeId) => {
  const response = await axiosInstance.delete(
    `/admin/delete-user-and-info/${employeeId}`
  );
  return response.data;
};

/**
 * Toggle user active/inactive status by employeeId
 */
export const updateUserStatusApi = async (employeeId) => {
  const response = await axiosInstance.post(`/admin/user-status/${employeeId}`, {});
  // Typically returns { success: boolean, message?: string }
  return response.data;
};


