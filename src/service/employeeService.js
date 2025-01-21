// src/services/employeeService.js
import axiosInstance from "./axiosInstance"; // your configured axios instance

/**
 * Fetch Shift Timings from server
 */
export async function fetchShiftTimings() {
  const response = await axiosInstance.get("/superadmin/companysettings/shift-timings");
  return response.data?.data || [];
}

/**
 * Fetch Employment Types
 */
export async function fetchEmploymentTypes() {
  const response = await axiosInstance.get("/superadmin/companysettings/employment-types");
  return response.data?.data || [];
}

/**
 * Fetch Departments
 */
export async function fetchDepartments() {
  const response = await axiosInstance.get("/superadmin/departments");
  return response.data?.data || [];
}

/**
 * Fetch All Employees (for manager assignment)
 */
export async function fetchAllEmployees() {
  const response = await axiosInstance.get("/user/all-user");
  return response.data?.data || [];
}

/**
 * Fetch Permission Roles
 */
export async function fetchPermissionRoles() {
  const response = await axiosInstance.get("/PermissionRole/get");
  return response.data?.data || [];
}

/**
 * Fetch Company Info (Addresses)
 */
export async function fetchCompanyInfo() {
  const response = await axiosInstance.get("/superadmin/info/getCompanyInfo");
  const companyArray = response.data?.data || [];
  return companyArray.length > 0 ? companyArray[0] : null;
}

/**
 * Fetch Designations
 */
export async function fetchDesignations() {
  const response = await axiosInstance.get("/designations/get");
  return response.data?.data || [];
}

/**
 * Final Create Employee call (POST) with FormData
 */
export async function createEmployee(formData) {
  // This is the final POST as in your old code (superadmin/register)
  const response = await axiosInstance.post("/superadmin/register", formData, {
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
  const response = await axiosInstance.put(`/superadmin/employees/${employeeId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // { success: boolean, message?: string, etc. }
}
