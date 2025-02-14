

import axiosInstance from "./axiosInstance";

// 1) Overview
export async function fetchOverview() {
  try {
   
    const response = await axiosInstance.get(`/admin/recruit-dashboard/overview`, );
    return response.data; 
  } catch (error) {
    console.error("Error in fetchOverview:", error);
    throw error;
  }
}

// 2) Hiring Sources
export async function fetchHiringSources() {
  try {
   
    const response = await axiosInstance.get(`/admin/recruit-dashboard/hiring-sources`, );
    return response.data; 
  } catch (error) {
    console.error("Error in fetchHiringSources:", error);
    throw error;
  }
}

// 3) Vacancies
export async function fetchVacancies() {
  try {
   
    const response = await axiosInstance.get(`/admin/recruit-dashboard/vacancies`, );
    return response.data; 
  } catch (error) {
    console.error("Error in fetchVacancies:", error);
    throw error;
  }
}

// 4) Departments
export async function fetchDepartments() {
  try {
   
    const response = await axiosInstance.get(`/admin/recruit-dashboard/departments`, );
    return response.data; 
  } catch (error) {
    console.error("Error in fetchDepartments:", error);
    throw error;
  }
}



// ###############################################################


export const getResignationHistory = async () => {
  try {
    const response = await axiosInstance.get(`/resignation/history/employee`, 
    );
    return response.data.resignations;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching resignation history."
    );
  }
};


export const submitResignation = async ({ resignationDate, lastWorkingDay, comments }) => {
  try {
    const response = await axiosInstance.post(
      "/resignation/submit",
      { resignationDate, lastWorkingDay, comments },
     
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error submitting resignation.");
  }
};




// Withdraw resignation
export const withdrawResignation = async () => {
  try {
    const response = await axiosInstance.delete(
      "/resignation/withdraw",
      
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error withdrawing resignation.");
  }
};

