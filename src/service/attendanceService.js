

import axiosInstance from "./axiosInstance";


export async function fetchOverview() {
  try {

    const response = await axiosInstance.get(`/attendance/overview`, );
    return response.data; // or response.data.data if you prefer
  } catch (error) {
    console.error("Error in fetchOverview:", error);
    throw error; // Re-throw so caller can handle
  }
}

/**
 * 2) Absenteeism chart
 */
export async function fetchAbsenteeismChart() {
  try {

    const response = await axiosInstance.get(`/attendance/absenteeism`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchAbsenteeismChart:", error);
    throw error;
  }
}

/**
 * 3) Attendance Today (doughnut)
 */
export async function fetchAttendanceToday() {
  try {

    const response = await axiosInstance.get(`/attendance/attendance-today`, );
    console.log(response.data, 'full data')

    return response.data;
  } catch (error) {
    console.error("Error in fetchAttendanceToday:", error);
    throw error;
  }
}

/**
 * 4) Employee Overview (doughnut)
 */
export async function fetchEmployeeOverview() {
  try {

    const response = await axiosInstance.get(`/attendance/employee-overview`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchEmployeeOverview:", error);
    throw error;
  }
}

/**
 * 5) Late In Today (table)
 */
export async function fetchLateInToday() {
  try {

    const response = await axiosInstance.get(`/attendance/late-in-today`, );
    return response.data;
  } catch (error) {
    console.error("Error in fetchLateInToday:", error);
    throw error;
  }
}

/**
 * Punch-In Status Today (returns { onTime: [], late: [] })
 */
export async function fetchPunchStatusToday() {
  try {
    // Adjust the URL if you have a different route
    const response = await axiosInstance.get(
      "/attendance/punch-status-today"
    );
    return response.data; // This should be { success: true, data: { onTime: [...], late: [...] } }
  } catch (error) {
    console.error("Error in fetchPunchStatusToday:", error);
    throw error;
  }
}

// export async function fetchAttendanceStatusToday() {
//   try {
//    const response = await axiosInstance.get(
//       "/attendance/attendance-status-today"
//     );
//     return response.data; 
//   }catch (error) {
//     console.error("Error in fetchPunchStatusToday:", error);
//     throw error;
//   }
// }

export const fetchAttendanceByEmployeeId = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/attendance/employee-overview?employeeId=${employeeId}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch attendance.',
      data: [],
    };
  }
};

export async function fetchDepartmentAttendanceSummary() {
  try {
    const response = await axiosInstance.get(
      "/attendance/getDepartmentAttendanceSummary"
    );
    return response.data; // => { success: true, data: [ { department, present, absent, totalEmployees } ] }
  } catch (error) {
    console.error("Error in fetchDepartmentAttendanceSummary:", error);
    throw error;
  }
  
  
}

