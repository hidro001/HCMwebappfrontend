import React from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ totalEmployees = 200, checkedIn = 174, onLeave = 10, absent = 6 }) => {
  const percentageCheckIn = Math.round((checkedIn / totalEmployees) * 100);
  const other = totalEmployees - checkedIn - onLeave - absent;

  const data = {
    datasets: [
      {
        data: [checkedIn, onLeave, absent, other],
        backgroundColor: [
          "#3B82F6", // Blue (Checked In)
          "#FBBF24", // Yellow (Leave)
          "#F87171", // Red (Absent)
          "#10B981", // Green (Other)
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 max-w-[200px]">
      <h2 className="text-lg font-semibold ">Statistics</h2>
      <div className="relative w-full aspect-square">
        <Doughnut data={data} options={options} />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm">Total Employees</div>
          <div className="text-2xl font-bold">{totalEmployees}</div>
        </div>

        {/* Floating label */}
        <motion.div
          className="absolute top-[5%] left-[5%] bg-white px-2 py-[2px] rounded-full shadow text-xs font-semibold"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {percentageCheckIn}% Check In
        </motion.div>
      </div>
    </div>
  );
};

export default DonutChart;
