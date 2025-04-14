import axiosInstance from "./axiosInstance"; 




export const getFieldworkers = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/geolocation/field-workers`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
