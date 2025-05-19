import axiosInstance from "./axiosInstance";




export const getEmployeeLeaveCount = async () => {
  try {
    const response = await axiosInstance.get(`/leaves/leavestats`);

    return response.data;
    
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    throw error;
  }
};


export const fetchSubordinateLeaveStats=async()=> {
    try {
      const response = await axiosInstance.get("/leaves/subordinate-stats", {
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching subordinate leave stats:", error);
      throw error;
    }
  }



export const fetchGlobalLeaveStats=async()=> {
  try {
    const response = await axiosInstance.get("/leaves/all-stats", {
     
    });
   
    return response.data;
  } catch (error) {
    console.error("Error fetching global leave stats:", error);
    throw error;
  }
}
