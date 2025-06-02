import axiosInstance from "./axiosInstance";

export async function getAttendanceData(date) {
  const baseUrl = "/dashboard-stats/super-admin/attendence-review";
  const url = date ? `${baseUrl}?date=${encodeURIComponent(date)}` : baseUrl;
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function getTeamPerformance() {

  const response = await axiosInstance.get("/superadmin/performance-stats"); 
  return response.data; 
}


export async function getRaciScores(startDate, endDate) {
  let url = '/superadmin/raci-scores'; // update if your endpoint differs

  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axiosInstance.get(url, { params });
  return response.data; // { success: boolean, data: [...] }
}




export async function getDashboardStats() {

  const response = await axiosInstance.get("/dashboard-stats-user");
  return response.data; 
}




export async function getAttendanceStats() {

  const res = await axiosInstance.get("/dashboard-stats-user/attendance");
  return res.data; 
}
