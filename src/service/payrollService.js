import axiosInstance from './axiosInstance';




export async function fetchAllPayroll(month, year) {
  const response = await axiosInstance.get(
    `/admin/payroll/getpayroll?month=${month}&year=${year}`
  );
  return response.data?.data || [];
}




export async function fetchAllocatedDepartments(employeeId) {
  const response = await axiosInstance.get(
    `/superadmin/departmentAlocated/${employeeId}`
  );
  return response.data?.departmentAlocated || [];
}



export async function addPayroll(month, year) {

    const response = await axiosInstance.post(
      `/admin/payroll/addpayroll?month=${month}&year=${year}`
    );
   
    return response.data;
  }



export async function getAdminStats() {
   
    const response = await axiosInstance.get('/admin/stats');
  
  
    return response.data;
  }





  export async function updatePayroll(payrollId, updates) {

    const response = await axiosInstance.patch(
      `/admin/payroll/update/${payrollId}`,
      updates
    );
    return response.data;
  }