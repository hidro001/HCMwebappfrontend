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