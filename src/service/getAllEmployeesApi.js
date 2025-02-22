import axiosInstance from "./axiosInstance"; // your configured axios instance

export const getEmployeesApi = async () => {
  try {
    const response = await axiosInstance.get("/admin/subordinates");
    return response.data;  // { success: boolean, count: number, data: [ ... ] }
  } catch (error) {
    throw error;
  }
};
export const getAllEmployeesApi = async () => {
  try {
    const response = await axiosInstance.get("/superadmin/employees");
    return response.data;  // { success: boolean, count: number, data: [ ... ] }
  } catch (error) {
    throw error;
  }
};


export const getEmployeeByIdApi = async (employeeId) => {
  const { data } = await axiosInstance.get(`/superadmin/employees/${employeeId}`);
  return data; // { success: true, data: { ... } }
};

/**
 * Delete user by employeeId
 */
export const deleteUserApi = async (employeeId) => {
  const response = await axiosInstance.delete(
    `/admin/delete-user-and-info/${employeeId}`
  );
  // Typically returns { success: boolean, message?: string }
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

/**
 * Restore user by employeeId
 * (You can uncomment or adjust if/when needed.)
 */
// export const restoreUserApi = async (employeeId) => {
//   const response = await axiosInstance.post(
//     `/admin/recoveruser/${employeeId}`
//   );
//   return response.data;
// };
