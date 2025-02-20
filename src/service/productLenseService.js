import axiosInstance from './axiosInstance';


export const fetchProductivityData = async () => {
  try {
    const res = await axiosInstance.get("/break/productivity");

    if (res.data && res.data.data) {
      return res.data.data.map((item, index) => ({
        sl: String(index + 1).padStart(2, "0"),
        empID: item.empID,
        empName: item.empName,
        designation: item.designation,
        department: item.department,
        breakTime: "", // or item.breakTime if provided
        unproductiveTime: item.unproductiveTime || "0",
        productiveTime: item.productiveTime || "0",
        detectionType: "", // remove if not needed
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching productivity data:", error);
    return [];
  }
};
