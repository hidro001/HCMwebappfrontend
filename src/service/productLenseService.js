import axiosInstance from "./axiosInstance";

export const fetchProductivityData = async (
  interval = "monthly",
  date = "2025-01"
) => {
  try {
    const res = await axiosInstance.get("/break/productivity/employee-productivity", {
      params: { interval, date },
    });

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

export const fetchTopSubordinates = async (
  interval = "daily",
  date = "",
  search = ""
) => {
  try {
    const res = await axiosInstance.get("/break/productivity/top-productivity-subordinates", {
      params: { interval, date, search },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching top subordinates:", error);
    return [];
  }
};

export const fetchLessSubordinates = async (
  interval = "daily",
  date = "",
  search = ""
) => {
  try {
    const res = await axiosInstance.get("/break/productivity/less-productivity-subordinates", {
      params: { interval, date, search },
    });
    return res.data.data;
  } catch (error) {
    console.error("Error fetching less subordinates:", error);
    return [];
  }
};



export const fetchBreakStats = async (interval = "daily", date = "", page = 1, limit = 10) => {
  try {
    const res = await axiosInstance.get("/productivity-lens/productivity/break", {
      params: { interval, date, page, limit },
    });
    // Expected response structure:
    // {
    //   data: [ ...paginated break stats... ],
    //   pagination: {
    //     totalResults, totalPages, currentPage, limit
    //   }
    // }
    return res.data;
  } catch (error) {
    console.error("Error fetching break stats:", error);
    return { data: [], pagination: {} };
  }
};