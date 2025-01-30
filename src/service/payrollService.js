import axiosInstance from './axiosInstance';

// Manage 





// Manage Payroll



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

// Manage Claims


export async function fetchAllRequests() {
 
  const response = await axiosInstance.get(
    'http://localhost:6060/api/v1/superadmin/companysettings/requests',
   
  );
  return response.data?.data || [];
}





export async function deleteRequests(id) {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:6060/api/v1/superadmin/companysettings/requests/${id}`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error deleting request:', error);
    throw new Error('Failed to delete the request.');
  }
}
export async function getDepartment() {
  try {
    const response = await axiosInstance.get(
      `http://localhost:6060/api/v1/superadmin/departments`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error deleting request:', error);
    throw new Error('Failed to delete the request.');
  }
}