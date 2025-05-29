import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../../../service/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BreakAndWorkGraphs = () => {
  const [deptData, setDeptData] = useState({ working: [], breaks: [] });
  const [desigData, setDesigData] = useState({ working: [], breaks: [] });

  const fetchData = async () => {
  try {
    const res = await axiosInstance.get("/usage-stats/full-aggregated-stats");
    if (!res.data.success) {
      console.warn("API responded with failure:", res.data.message);
      return;
    }
    const { department = [], designation = [] } = res.data.data || {};

    setDeptData({
      working: department.map(d => ({ label: d._id || "Unknown", value: d.avgWorkingMinutes || 0 })),
      breaks: department.map(d => ({ label: d._id || "Unknown", value: d.avgBreakMinutes || 0 })),
    });

    setDesigData({
      working: designation.map(d => ({ label: d._id || "Unknown", value: d.avgWorkingMinutes || 0 })),
      breaks: designation.map(d => ({ label: d._id || "Unknown", value: d.avgBreakMinutes || 0 })),
    });
  } catch (error) {
    console.error("Failed to fetch aggregated stats:", error);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  const prepareChartData = (dataArray) => ({
    labels: dataArray.map((d) => d.label || "Unknown"),
    datasets: [
      {
        label: "Minutes",
        data: dataArray.map((d) => d.value.toFixed(1)),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  });

  return (
    <div className="p-4 bg-white rounded shadow space-y-10">
      <h2 className="text-xl font-semibold mb-4">Break & Working Hours Analytics</h2>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-2 font-semibold">Average Working Hours by Department</h3>
          <Bar data={prepareChartData(deptData.working)} options={{ responsive: true }} />
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Average Break Minutes by Department</h3>
          <Bar data={prepareChartData(deptData.breaks)} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-2 font-semibold">Average Working Hours by Designation</h3>
          <Bar data={prepareChartData(desigData.working)} options={{ responsive: true }} />
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Average Break Minutes by Designation</h3>
          <Bar data={prepareChartData(desigData.breaks)} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default BreakAndWorkGraphs;
