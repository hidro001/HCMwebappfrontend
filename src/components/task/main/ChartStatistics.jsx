import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getTaskStatusSummary } from "../../../service/taskService"; // Import service file
import PerformanceChart from "./PerformanceChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartStatistics = () => {
  const [taskData, setTaskData] = useState({
    Done: 0,
    Pending: 0,
    Delay: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = "EMP123"; // Replace this dynamically in real use

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setLoading(true);
        const response = await getTaskStatusSummary(employeeId);
        if (response.success) {
          setTaskData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch task data");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskData();
  }, [employeeId]);

  // Doughnut Chart Configuration
  const doughnutData = {
    labels: ["Done", "Pending", "Delay"],
    datasets: [
      {
        data: [taskData.Done, taskData.Pending, taskData.Delay], // Dynamically fetched data
        backgroundColor: ["#16a34a", "#3b82f6", "#ec4899"], // Colors for task status
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%", // Creates space in the middle
    plugins: { legend: { display: false } },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 justify-center items-start">
      {/* Task Status Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-2/3">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Task Status Overview
        </h2>

        {loading ? (
          <p className="text-gray-700 dark:text-gray-200">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Doughnut Chart */}
            <div className="relative w-full max-w-xs">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              {/* Centered Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 font-semibold">
                <span className="text-lg">Total Tasks</span>
                <span className="text-3xl">{taskData.Done + taskData.Pending + taskData.Delay}</span>
              </div>
            </div>

            {/* Task Status Table (Status & No. of Tasks) */}
            <div className="text-gray-700 dark:text-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-center">No. of Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Done", count: taskData.Done, color: "bg-green-500" },
                    { name: "Pending", count: taskData.Pending, color: "bg-blue-500" },
                    { name: "Delay", count: taskData.Delay, color: "bg-pink-500" },
                  ].map((task, index) => (
                    <tr key={index}>
                      <td className="py-1 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${task.color}`}></span>
                        {task.name}
                      </td>
                      <td className="text-center">{task.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Performance Statistics */}
      <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
        <PerformanceChart />
      </div>
    </div>
  );
};

export default ChartStatistics;
