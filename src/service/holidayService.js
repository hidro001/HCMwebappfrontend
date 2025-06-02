
import axiosInstance from "./axiosInstance";


export async function getHolidays() {


  const response = await axiosInstance.get("/company-settings/holidays");
  return response.data; 
}
