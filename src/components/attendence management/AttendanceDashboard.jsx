import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaCheckCircle, FaRegClock } from "react-icons/fa";
import { fetchOverview, fetchAttendanceToday, fetchEmployeeOverview, fetchPunchStatusToday, fetchDepartmentAttendanceSummary,} from "../../service/attendanceService";

export default function AttendanceDashboard() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [departmentBarData, setDepartmentBarData] = useState({
    labels: [],
    datasets: [],
  });

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

  const [lateInToday, setLateInToday] = useState([]);

  const [onTimeCount, setOnTimeCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    setError("");
    try {
      await Promise.all([
        fetchOverviewData(),
        fetchAttendanceTodayData(),
        fetchEmployeeOverviewData(),
        fetchPunchStatusTodayData(),
        fetchDepartmentAttendanceData(), 
      ]);
    } catch (err) {
      console.error("Error loading attendance dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function fetchOverviewData() {
    const result = await fetchOverview();
    if (result?.data) {
  
    }
  }

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

  async function fetchPunchStatusTodayData() {
    const result = await fetchPunchStatusToday();
    if (result?.data) {
      setLateInToday(result.data.late);
      setOnTimeCount(result.data.onTimeCount);
      setLateCount(result.data.lateCount);

    }
  }


  async function fetchDepartmentAttendanceData() {
    const result = await fetchDepartmentAttendanceSummary();
    if (result?.data) {
      const departmentLabels = result.data.map((d) => d.department);

      const presentData = result.data.map((d) => d.present);

      const absentData = result.data.map((d) => d.absent);

      const barData = {
        labels: departmentLabels,
        datasets: [
          {
            label: "Present",
            data: presentData,
            backgroundColor: "#22c55e", 
          },
          {
            label: "Absent",
            data: absentData,
            backgroundColor: "#ef4444", 
          },
        ],
      };
      setDepartmentBarData(barData);
    }
  }

  const isDarkMode = false;
  const gridColor = isDarkMode ? "#374151" : "#e5e7eb";
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Department Attendance" },
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

        {loading && <p className="text-blue-500 mb-4">Loading...</p>}
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center">
            <div className="flex items-center mb-2">
              <FaCheckCircle className="text-green-500 text-3xl mr-2" />
              <h3 className="text-lg font-semibold">Today On Time Employess </h3>
            </div>
            <p className="text-2xl font-bold">{onTimeCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center">
            <div className="flex items-center mb-2">
              <FaRegClock className="text-orange-500 text-3xl mr-2" />
              <h3 className="text-lg font-semibold">Today Late Employess</h3>
            </div>
            <p className="text-2xl font-bold">{lateCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-base font-semibold mb-3 text-gray-700 dark:text-gray-100">
              Today Department Attendance
            </h2>
            <div className="h-[480px] dark:text-white">
              <Bar data={departmentBarData} options={barOptions} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm flex flex-col items-center">
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-100 mb-3">
                Attendance Today
              </h3>
              <div className="w-32 h-32">
                <Doughnut data={attendanceData} />
              </div>
              <div className="mt-3 text-center">
                <div className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-1">
                  {attendanceData.datasets[0].data[0] ?? 0}% Attendance
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-400 leading-5">
                  Reported Employers: {attendanceMeta.presentCount || 0} <br />
                  Total Active: {attendanceMeta.totalActive || 0}
                </div>
              </div>
            </div>

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
                  <th className="py-2 px-3 font-semibold">Punch In</th>
                  <th className="py-2 px-3 font-semibold">Manager</th>
                  <th className="py-2 px-3 font-semibold">Manager ID</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600 dark:text-gray-200">
                {lateInToday.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-3 px-3">{item.employeeId}</td>
                    <td className="py-3 px-3">{item.department}</td>
                    <td className="py-3 px-3">{item.date}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block bg-orange-100 dark:bg-orange-900 dark:text-orange-200 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        {item.punchIn}
                      </span>
                    </td>
                    <td className="py-3 px-3">{item.managerName || "N/A"}</td>
                    <td className="py-3 px-3">{item.managerId || "N/A"}</td>
                  </tr>
                ))}
                {lateInToday.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500 py-3">
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
