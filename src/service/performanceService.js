// performanceManagementService.js
import axiosInstance from "./axiosInstance";

export async function fetchStats(range) {
  try {
    const response = await axiosInstance.get(`/kpi/dashboard/stats?range=${range}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchStats:", error);
    throw error;
  }
}

export async function fetchChart(range) {
  try {
    const response = await axiosInstance.get(`/kpi/dashboard/chart?range=${range}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchChart:", error);
    throw error;
  }
}

export async function fetchDonut(range) {
  try {
    const response = await axiosInstance.get(`/kpi/dashboard/donut?range=${range}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchDonut:", error);
    throw error;
  }
}

export async function fetchTopPerformerList(month, year, limit = 4) {
  try {
    const response = await axiosInstance.get(
      `/kpi/ratings/top-rated?month=${month}&year=${year}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchTopPerformerList:", error);
    throw error;
  }
}
