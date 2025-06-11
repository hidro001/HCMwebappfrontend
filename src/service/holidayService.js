
import axiosInstance from "./axiosInstance";


export async function getHolidays() {
  const response = await axiosInstance.get("/company-settings/holidays");
  return response.data; 
}

export async function getMonthHolidays() {
  const response = await axiosInstance.get("/holiday/hoidays");
  return response.data
}
