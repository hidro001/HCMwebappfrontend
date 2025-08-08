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
    `/user-management/delete-user-and-info/${employeeId}`
  );
  return response.data;
};

/**
 * Toggle user active/inactive status by employeeId
 */
export const updateUserStatusApi = async (employeeId) => {
  const response = await axiosInstance.post(`/user-management/status-update/${employeeId}`, {});
  // Typically returns { success: boolean, message?: string }
  return response.data;
};

/**
 * Reassign team members when manager is deactivated
 * This function will reassign all subordinates of a deactivated manager to the manager's manager
 */
export const reassignTeamMembersApi = async (managerId) => {
  const response = await axiosInstance.post(`/user-management/reassign-team-members/${managerId}`, {});
  return response.data;
};


