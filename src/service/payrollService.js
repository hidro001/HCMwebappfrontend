import axiosInstance from './axiosInstance';


// main page #############################################################

export const fetchLineChartData = async ( year = 2025) => {
  try {
    const res = await axiosInstance.get(`/payroll-dashboard/linechart?year=${year}`);
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    throw error;
  }
};


export const fetchDoughnutChartData = async () => {
  try {
    const res = await axiosInstance.get(`/payroll-dashboard/doughnut`);
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching doughnut chart data:", error);
    throw error;
  }
};


export const fetchPayrollList = async () => {
  try {
    const res = await axiosInstance.get(`/payroll-dashboard/list`);
    return res.data?.data;
  } catch (error) {
    console.error("Error fetching payroll list:", error);
    throw error;
  }
};



// Manage Payroll #############################################################



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

// Manage Claims #############################################################


export async function fetchAllRequests() {
 
  const response = await axiosInstance.get(
    '/superadmin/companysettings/requests',
  );
  return response.data?.data || [];
}


export async function deleteRequests(id) {
  try {
    const response = await axiosInstance.delete(
      `/superadmin/companysettings/requests/${id}`
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
      `/superadmin/departments`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error deleting request:', error);
    throw new Error('Failed to delete the request.');
  }
}
export async function getPayrollCount() {
  try {
    const response = await axiosInstance.get(
      `/superadmin/departments`
    );
    return response.data?.data || [];
  } catch (error) {
    console.error('Error deleting request:', error);
    throw new Error('Failed to delete the request.');
  }
}

