// src/api/raciService.js
import axiosInstance from './axiosInstance';


// Fetch the operations score for a given date.
export const fetchOperationsScore = async (date ) => {
  try {
    const response = await axiosInstance.get(`/raci-dashboard/operations/score?date=${date}`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching Operations Score:", error);
    throw error;
  }
};

// Fetch the business score for a given date.
export const fetchBusinessScore = async (date, ) => {
  try {
    const response = await axiosInstance.get(`/raci-dashboard/business/score?date=${date}`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching Business Score:", error);
    throw error;
  }
};

// Fetch the operations table data (limit = 5).
export const fetchOperationsTable = async () => {
  try {
    const response = await axiosInstance.get(`/raci-dashboard/operations/scores?limit=5`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching Operations Table:", error);
    throw error;
  }
};

// Fetch the business table data (limit = 5).
export const fetchBusinessTable = async () => {
  try {
    const response = await axiosInstance.get(`/raci-dashboard/business/scores?limit=5`);
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching Business Table:", error);
    throw error;
  }
};
