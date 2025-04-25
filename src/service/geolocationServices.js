import axiosInstance from "./axiosInstance"; 



export const getFieldworkers = async (page = 1, limit = 10, searchQuery = "") => {
  try {
    const response = await axiosInstance.get(`/geolocation/field-workers`, {
      params: { page, limit, searchQuery },  // Pass the searchQuery to the API
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
