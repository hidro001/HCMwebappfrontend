// src/services/employeeService.js
import axiosInstance from "./axiosInstance"; // your configured axios instance

/**
 * Fetch Shift Timings from server
 */
export async function fetchShiftTimings() {
  const response = await axiosInstance.get("/company-settings/shift-timings");
  return response.data?.data || [];
}

/**
 * Fetch Employment Types
 */
export async function fetchEmploymentTypes() {
  const response = await axiosInstance.get("/company-settings/employment-types");
  return response.data?.data || [];
}

/**
 * Fetch Departments
 */
export async function fetchDepartments() {
  const response = await axiosInstance.get("/departments");
  return response.data?.data || [];
}

/**
 * Fetch All Employees (for manager assignment)
 */
export async function fetchAllEmployees(department ='') {
  let response;
  if(department.length >0){
     response = await axiosInstance.get(`/user/get-all?department=${department}`);
  }
  else{
     response = await axiosInstance.get("/user/get-all");
  }
  return response.data?.data || [];
}

/**
 * Fetch Permission Roles
 */
export async function fetchPermissionRoles() {
  const response = await axiosInstance.get("/permission-role/get");
  return response.data?.data || [];
}


export async function fetchCompanyInfo() {
  const response = await axiosInstance.get("/company-settings/info/getCompany");
  const companyArray = response.data?.data || [];
  return companyArray.length > 0 ? companyArray[0] : null;
}


export async function fetchDesignations() {
  const response = await axiosInstance.get("/designation/get");
  return response.data?.data || [];
}

export async function fetchLeaveTypes() {
  const response = await axiosInstance.get("/leaves-types/leave-type");
  return response.data?.data || [];
}


export async function createEmployee(formData) {
  // This is the final POST as in your old code (superadmin/register)
  const response = await axiosInstance.post("/user-management/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

/**
 * Fetch a single employee by ID
 */
export async function fetchEmployeeById(employeeId) {
  // Example: GET /superadmin/employees/:id
  const response = await axiosInstance.get(`/superadmin/employees/${employeeId}`);
  return response.data; // { success: boolean, data: {...} }
}

/**
 * Update an existing employee by ID (PUT)
 * Accepts FormData object just like createEmployee
 */
export async function updateEmployee(employeeId, formData) {
  // Example: PUT /superadmin/employees/:id
  const response = await axiosInstance.put(`/user-management/update/${employeeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { success: boolean, message?: string, etc. }
}

export const fetchSubordinateFilters = async () => {
  try {
    const response = await axiosInstance.get("/usage-stats/subordinate-departments-designations");
    return response.data.data; // { departments, designations }
  } catch (error) {
    console.error("Error fetching subordinate filters:", error);
    throw error;
  }
};
