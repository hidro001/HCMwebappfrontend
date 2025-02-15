import  { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDashboardStore } from "../../../store/useDashboardStore"; // your zustand store

function EmployeeStatusChart() {
  // 1) Pull state + method from Zustand
  const {
    totalUsers,
    employeesPerEmployeeType = [], // destructure default
    fetchDashboardStats,
  } = useDashboardStore();

  // 2) Fetch data on mount
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // 3) Prepare the chart data
  // Convert `employee_Type` to a label, fallback to "Unknown" if null/undefined
  const labels = employeesPerEmployeeType.map(
    (item) => item.employee_Type
  );
  const dataValues = employeesPerEmployeeType.map((item) => item.count);

  // Optionally choose different colors for each bar
  const colors = [
    '#60A5FA', // blue
    '#F87171', // red
    '#34D399', // green
    '#FBBF24', // yellow
    '#A78BFA', // purple
    '#F472B6', // pink
    '#4ADE80', // another green
  ];
  const backgroundColors = dataValues.map((_, i) => colors[i % colors.length]);

  // 4) Build the chart.js data object
  const data = {
    labels,
    datasets: [
      {
        label: 'Employees',
        data: dataValues,
        backgroundColor: backgroundColors,
      },
    ],
  };

  // 5) Chart.js options
  //    - horizontal bar (indexAxis: 'y')
  //    - set x-axis max to totalUsers if you want the largest bar to be totalUsers
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // so it fills container's height
    scales: {
      x: {
        beginAtZero: true,
        max: totalUsers > 0 ? totalUsers :"",
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="mt-5 w-full md:w-1/2 md:mt-0 ">
      <div
        className="
          flex flex-col
          rounded-xl
          bg-white dark:bg-gray-800
          shadow-2xl
          p-4
          text-gray-800 dark:text-gray-100
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lime-600 dark:text-lime-400 font-semibold text-base sm:text-lg">
            Employees By Locations
          </h2>
          {/* Ellipsis Icon */}
          {/* <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="5" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
            </svg>
          </button> */}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-600 my-3" />

        {/* Chart Container: full width, fixed height */}
        <div className="w-full h-48">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeStatusChart;



