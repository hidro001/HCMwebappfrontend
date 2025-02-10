import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  FaUserFriends,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
  FaDollarSign,
} from "react-icons/fa";
import {
  fetchOverview,
  fetchAbsenteeismChart,
  fetchAttendanceToday,
  fetchEmployeeOverview,
  fetchLateInToday,
} from "../../service/attendanceService";

export default function AttendanceDashboard() {
  // ---------------------------
  // State for dynamic data
  // ---------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For the 4 top squares
  const [newUsers, setNewUsers] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);

  // For the Absenteeism bar chart
  const [absenteeBarData, setAbsenteeBarData] = useState({
    labels: [],
    datasets: [],
  });

  // For Attendance Today doughnut
  const [attendanceData, setAttendanceData] = useState({
    labels: ["Attendance", "Remaining"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  });
  const [attendanceMeta, setAttendanceMeta] = useState({});

  // For Employee Overview doughnut
  const [employeeOverviewData, setEmployeeOverviewData] = useState({
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#3b82f6", "#f97316"],
        borderWidth: 0,
      },
    ],
  });
  const [employeeOverviewMeta, setEmployeeOverviewMeta] = useState({});

  // For Late In Today table
  const [lateInToday, setLateInToday] = useState([]);

  // ----------------------------------------------------------------
  // useEffect to load all data on mount
  // ----------------------------------------------------------------
  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line
  }, []);

  // Master loader with a single try/catch
  async function loadDashboardData() {
    setLoading(true);
    setError("");

    try {
      await Promise.all([
        fetchOverviewData(),
        fetchAbsenteeismChartData(),
        fetchAttendanceTodayData(),
        fetchEmployeeOverviewData(),
        fetchLateInTodayData(),
      ]);
    } catch (err) {
      console.error("Error loading attendance dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  // 1) Top squares
  async function fetchOverviewData() {
    // No `try/catch`; let errors propagate
    const result = await fetchOverview();
    if (result?.data) {
      const { newUsers, totalDeposit, totalExpense, totalEarning } = result.data;
      setNewUsers(newUsers);
      setTotalDeposit(totalDeposit);
      setTotalExpense(totalExpense);
      setTotalEarning(totalEarning);
    }
  }

  // 2) Absenteeism chart
  async function fetchAbsenteeismChartData() {
    const result = await fetchAbsenteeismChart();
    if (result?.data) {
      setAbsenteeBarData(result.data);
    }
  }

  // 3) Attendance Today
  async function fetchAttendanceTodayData() {
    const result = await fetchAttendanceToday();
    if (result?.data) {
      setAttendanceData({
        labels: result.data.labels,
        datasets: result.data.datasets,
      });
      if (result.data.meta) {
        setAttendanceMeta(result.data.meta);
      }
    }
  }

  // 4) Employee Overview
  async function fetchEmployeeOverviewData() {
    const result = await fetchEmployeeOverview();
    if (result?.data) {
      setEmployeeOverviewData({
        labels: result.data.labels,
        datasets: result.data.datasets,
      });
      if (result.data.meta) {
        setEmployeeOverviewMeta(result.data.meta);
      }
    }
  }

  // 5) Late In Today
  async function fetchLateInTodayData() {
    const result = await fetchLateInToday();
    if (result?.data) {
      setLateInToday(result.data);
    }
  }

  // statsData for the top row
  const statsData = [
    {
      title: "New Users",
      amount: newUsers,
      diff: "+200 this week",
      iconColor: "bg-blue-500",
      icon: <FaUserFriends className="text-white" size={20} />,
    },
    {
      title: "Total Deposit",
      amount: totalDeposit,
      diff: "+200 this week",
      iconColor: "bg-purple-500",
      icon: <FaMoneyBillAlt className="text-white" size={20} />,
    },
    {
      title: "Total Expense",
      amount: totalExpense,
      diff: "+200 this week",
      iconColor: "bg-red-500",
      icon: <FaMoneyCheckAlt className="text-white" size={20} />,
    },
    {
      title: "Total Earning",
      amount: totalEarning,
      diff: "+200 this week",
      iconColor: "bg-green-500",
      icon: <FaDollarSign className="text-white" size={20} />,
    },
  ];

  // Example chart options
  const isDarkMode = false;
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
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
        ticks: { stepSize: 5 },
      },
    },
  };

  // Simple Framer Motion fade-in
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
        {/* Loading / Error messages */}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

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
                <div className={`p-2 rounded-lg ${stat.iconColor} flex items-center justify-center`}>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Absenteeism chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-semibold mb-3 text-gray-700 dark:text-gray-100">
              Absenteeism
            </h2>
            <div className="h-[480px] dark:text-white">
              <Bar data={absenteeBarData} options={barOptions} />
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
                  {attendanceData.datasets[0].data[0]}% Attendance
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-400 leading-5">
                  Reported Employers: {attendanceMeta.presentCount || 0} <br />
                  Total Active: {attendanceMeta.totalActive || 0}
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
                      Active:
                    </span>{" "}
                    {employeeOverviewMeta.activeCount || 0}
                    <br />
                    <span className="font-semibold text-gray-700 dark:text-gray-100">
                      Inactive:
                    </span>{" "}
                    {employeeOverviewMeta.inactiveCount || 0}
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
                  <tr
                    key={i}
                    className="border-b last:border-none border-gray-100 dark:border-gray-700"
                  >
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
                {lateInToday.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-3">
                      No late arrivals found today.
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
