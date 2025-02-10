
import axiosInstance from "./axiosInstance";


export async function getHolidays() {


  const response = await axiosInstance.get("/superadmin/companysettings/holidays");
  return response.data; 
}
