import  { useState } from 'react';

// For Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Main() {
  // Dummy data for the payroll list
  const [payrollList] = useState([
    {
      name: 'Dianne Russell',
      email: 'redaniel@gmail.com',
      joinDate: '27 Mar 2024',
      empId: 'RI0456',
      department: 'IT',
      status: 'Paid',
      avatarColor: '#f87171',
    },
    {
      name: 'Wade Warren',
      email: 'xterris@gmail.com',
      joinDate: '27 Mar 2024',
      empId: 'RI0456',
      department: 'Sales',
      status: 'Paid',
      avatarColor: '#fb923c',
    },
    {
      name: 'Albert Flores',
      email: 'seannand@mail.ru',
      joinDate: '27 Mar 2024',
      empId: 'RI0456',
      department: 'Finance',
      status: 'Paid',
      avatarColor: '#fbbf24',
    },
    {
      name: 'Bessie Cooper',
      email: 'igerrin@gmail.com',
      joinDate: '27 Mar 2024',
      empId: 'RI0456',
      department: 'Marketing',
      status: 'Paid',
      avatarColor: '#34d399',
    },
    {
      name: 'Arlene McCoy',
      email: 'fellora@mail.ru',
      joinDate: '27 Mar 2024',
      empId: 'RI0456',
      department: 'Designing',
      status: 'Paid',
      avatarColor: '#60a5fa',
    },
  ]);

  // -- Line chart (Total Payout) data --
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Payout',
        data: [5000, 12000, 30000, 18000, 27000, 75000, 45000, 60000, 20000, 40000, 25000, 50000],
        borderColor: '#3b82f6', // Tailwind blue-500
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (val) => '$' + val.toLocaleString(),
        },
      },
    },
  };

  // -- Doughnut chart (Employee Overview) data --
  const doughnutData = {
    labels: ['Paid', 'Pending'],
    datasets: [
      {
        data: [500, 300],
        backgroundColor: ['#3b82f6', '#f97316'], // blue-500, orange-500
        hoverBackgroundColor: ['#2563eb', '#ea580c'],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Top Info Banner */}
      <div
        className="
          bg-green-100 border border-green-200
          text-green-700 p-4 text-sm md:text-base
          flex flex-col md:flex-row items-center justify-between
          dark:bg-green-900 dark:border-green-800 dark:text-green-100
        "
      >
        <p>
          Stay on top of your department's progress with Department Statistics! Gain insights
          into department-wise tasks, track delayed and assigned tasks, and highlight important
          dates on the calendar. Keep your team organized, efficient, and always a step ahead!
        </p>
        <div className="mt-2 md:mt-0 flex items-center gap-4">
          <a href="#" className="underline text-green-800 dark:text-green-200">
            Hide Help
          </a>
          <a href="#" className="underline text-blue-600 dark:text-blue-300">
            Task
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="p-4 max-w-7xl mx-auto w-full flex-grow">
        {/* Top Cards Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Card: Total Payout with line chart */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Total Payout</h2>
                <p className="text-2xl font-bold mt-1 text-black dark:text-white">
                  ₹ 304,999.61
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">+10% Total This Month</p>
              </div>
              {/* Dropdown for monthly/yearly */}
              <div>
                <select
                  className="
                    border border-gray-300 dark:border-gray-700
                    rounded-md px-2 py-1 text-sm focus:outline-none
                    dark:bg-gray-900 dark:text-white
                  "
                  defaultValue="Monthly"
                >
                  <option>Monthly</option>
                  <option>Yearly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            {/* Actual line chart using react-chartjs-2 */}
            <div className="mt-4 h-48">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          {/* Right Card: Donut Chart "Employee Overview" */}
          <div className="
            w-full md:w-1/3
            bg-white dark:bg-gray-800
            rounded-lg border border-gray-200 dark:border-gray-700
            p-4 flex flex-col
          ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Employee Overview</h2>
              <select
                className="
                  border border-gray-300 dark:border-gray-700
                  rounded-md px-2 py-1 text-sm focus:outline-none
                  dark:bg-gray-900 dark:text-white
                "
                defaultValue="Month"
              >
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>

            {/* Doughnut chart */}
            <div className="flex flex-col items-center justify-center mt-4 h-44">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            {/* Legend */}
            <div className="flex gap-4 mt-3 text-sm justify-center">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span>Paid: 500</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                <span>Pending: 300</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll List Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold">Payroll list</h2>
            <a href="#" className="flex items-center text-blue-600 dark:text-blue-300">
              View All
            </a>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-4 py-2 text-left font-semibold">Users</th>
                  <th className="px-4 py-2 text-left font-semibold">Join Date</th>
                  <th className="px-4 py-2 text-left font-semibold">Emp ID</th>
                  <th className="px-4 py-2 text-left font-semibold">Department</th>
                  <th className="px-4 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payrollList.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: item.avatarColor }}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.joinDate}</td>
                    <td className="px-4 py-3">{item.empId}</td>
                    <td className="px-4 py-3">{item.department}</td>
                    <td className="px-4 py-3">
                      <span
                        className="
                          inline-block px-2 py-1 text-xs font-semibold
                          text-green-800 bg-green-100 rounded-md
                          dark:bg-green-900 dark:text-green-100
                        "
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {payrollList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                      No payroll records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
