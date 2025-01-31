
import React from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  FaUserFriends,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
  FaDollarSign,
} from "react-icons/fa";


export default function AttendanceDashboard() {
  // ----------------------
  // Dummy Data & Icons
  // ----------------------
  const statsData = [
    {
      title: "New Users",
      amount: 500,
      diff: "+200 this week",
      iconColor: "bg-blue-500",
      icon: <FaUserFriends className="text-white" size={20} />,
    },
    {
      title: "Total Deposit",
      amount: 15000,
      diff: "+200 this week",
      iconColor: "bg-purple-500",
      icon: <FaMoneyBillAlt className="text-white" size={20} />,
    },
    {
      title: "Total Expense",
      amount: 15000,
      diff: "+200 this week",
      iconColor: "bg-red-500",
      icon: <FaMoneyCheckAlt className="text-white" size={20} />,
    },
    {
      title: "Total Earning",
      amount: 15000,
      diff: "+200 this week",
      iconColor: "bg-green-500",
      icon: <FaDollarSign className="text-white" size={20} />,
    },
  ];

  // -----------------------------
  // Example: Handling dark mode in Chart.js
  // (Assuming you have some "theme" variable or context in real usage)
  // -----------------------------
  const isDarkMode = true; // replace with your actual logic/context
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
  

  // Bar chart (Absenteeism) data & config
  const barData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Finance",
        data: [5, 6, 4, 8, 6, 10, 12, 7, 6, 9, 8, 6],
        backgroundColor: "#FBBF24", 
        stack: "combined",
      },
      {
        label: "Sales",
        data: [10, 8, 12, 6, 7, 5, 15, 10, 12, 6, 9, 8],
        backgroundColor: "#3B82F6",
        stack: "combined",
      },
      {
        label: "Marketing",
        data: [4, 3, 5, 7, 3, 6, 5, 3, 2, 5, 4, 6],
        backgroundColor: "#A78BFA",
        stack: "combined",
      },
      {
        label: "IT",
        data: [3, 4, 2, 3, 5, 2, 10, 5, 3, 4, 5, 3],
        backgroundColor: "#14B8A6",
        stack: "combined",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: true },
        ticks: { stepSize: 5 },
      },
      y: {
        stacked: true,
        grid: { color: gridColor },
        ticks: { stepSize: 5,  },
      },
    },
  };

  // Doughnut chart: Attendance Today
  const attendanceData = {
    labels: ["Attendance", "Remaining"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        hoverBackgroundColor: ["#16a34a", "#d1d5db"],
        borderWidth: 0,
      },
    ],
  };

  // Doughnut chart: Employee Overview
  const employeeOverviewData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [500, 300],
        backgroundColor: ["#3b82f6", "#f97316"],
        hoverBackgroundColor: ["#2563eb", "#ea580c"],
        borderWidth: 0,
      },
    ],
  };

  // Table data
  const lateInToday = [
    {
      empId: "Ri0001",
      department: "IT-Development",
      date: "27 Mar 2024",
      time: "11:35:45",
      manager: "Nikunj",
    },
    {
      empId: "Ri0002",
      department: "Marketing",
      date: "27 Mar 2024",
      time: "1:30:50",
      manager: "Amit",
    },
    {
      empId: "Ri0003",
      department: "Sales",
      date: "27 Mar 2024",
      time: "10:30:34",
      manager: "Akhilesh",
    },
  ];

  // Simple Framer Motion fade-in for cards
  const cardVariants = {
    offscreen: { opacity: 0, y: 30 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.2, duration: 0.7 },
    },
  };

  return (

    <div className="min-h-screen w-full bg-[#F8FBFF] dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col"
            >
              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg ${stat.iconColor} flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                <h4 className="text-sm font-medium text-gray-400 dark:text-gray-300">
                  {stat.title}
                </h4>
              </div>
              {/* Amount */}
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                {stat.amount.toLocaleString()}
              </div>
              {/* Subtext/diff */}
              <div className="text-xs font-semibold text-green-500">
                {stat.diff}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main content row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {/* Absenteeism chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-semibold mb-3 text-gray-700 dark:text-gray-100">
              Absenteeism
            </h2>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#FBBF24" }}
                ></span>
                Finance
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#3B82F6" }}
                ></span>
                Sales
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#A78BFA" }}
                ></span>
                Marketing
              </span>
              <span className="flex items-center gap-1">
                <span
                  className="block w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#14B8A6" }}
                ></span>
                IT
              </span>
            </div>
            <div className="h-[480px] dark:text-white">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Right side panel: Attendance & Employee Overview */}
          <div className="flex flex-col gap-5">
            {/* Attendance Today */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center">
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100 mb-3">
                Attendance Today
              </h3>
              <div className="w-32 h-32">
                <Doughnut data={attendanceData} />
              </div>
              <div className="mt-3 text-center">
                <div className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-1">
                  85% Attendance
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-400 leading-5">
                  Reported Employers: 230 <br />
                  On Leave: 12 <br />
                  Not yet Reported: 5
                </div>
              </div>
            </div>

            {/* Employee Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col">
              <div className="flex w-full items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100">
                  Employee Overview
                </h3>
                <span className="text-xs text-gray-400 dark:text-gray-300">
                  Today
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32">
                  <Doughnut data={employeeOverviewData} />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm text-gray-400 dark:text-gray-300 leading-5">
                    <span className="font-semibold text-gray-700 dark:text-gray-100">
                      Active:{" "}
                    </span>
                    500
                    <br />
                    <span className="font-semibold text-gray-700 dark:text-gray-100">
                      Inactive:{" "}
                    </span>
                    300
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Late In Today table */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-100">
            Late In Today
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="border-b text-sm text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-2 px-3 font-semibold">EMP ID</th>
                  <th className="py-2 px-3 font-semibold">Department</th>
                  <th className="py-2 px-3 font-semibold">Date</th>
                  <th className="py-2 px-3 font-semibold">Time</th>
                  <th className="py-2 px-3 font-semibold">Assigned Manager</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-200">
                {lateInToday.map((item, i) => (
                  <tr key={i} className="border-b last:border-none border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-3">{item.empId}</td>
                    <td className="py-3 px-3">{item.department}</td>
                    <td className="py-3 px-3">{item.date}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block bg-orange-100 dark:bg-orange-900 dark:text-orange-200 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        {item.time}
                      </span>
                    </td>
                    <td className="py-3 px-3">{item.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
