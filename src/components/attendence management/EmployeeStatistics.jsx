import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useUsageStatsStore from "../../store/useUsageStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import ActivityTrendChart from "./ActivityTrendChart";
import {
  FiClock,
  FiCoffee,
  FiCalendar,
  FiTrendingUp,
  FiActivity,
  FiMonitor,
  FiGlobe,
  FiMousePointer,
  FiType,
  FiInfo,
  FiBarChart2,
  FiUser,
} from "react-icons/fi"; // Added missing icons

ChartJS.register(ArcElement, Tooltip, Legend);

// ────────────────────────────────────────────────────────────────────────────
//  Utilities
// ────────────────────────────────────────────────────────────────────────────
const isSameISO = (d1, d2) =>
  dayjs(d1).format("YYYY-MM-DD") === dayjs(d2).format("YYYY-MM-DD");

const isBetween = (date, start, end) =>
  dayjs(date).isAfter(dayjs(start).subtract(1, "day")) &&
  dayjs(date).isBefore(dayjs(end).add(1, "day"));

function convertTo24Hour(timeStr) {
  if (!timeStr) return timeStr;
  const [time, ampm] = timeStr.split(" ");
  if (!ampm) return timeStr;
  let [h, m, s] = time.split(":").map(Number);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
}

// App icon mapping
const appIconMap = {
  "google chrome": "https://img.icons8.com/color/48/chrome--v1.png",
  slack: "https://img.icons8.com/color/48/slack-new-logo.png",
  excel: "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  word: "https://img.icons8.com/color/48/ms-word.png",
  anydesk: "https://img.icons8.com/color/48/anydesk.png",
  calculator: "https://img.icons8.com/color/48/calculator.png",
  "docker desktop": "https://img.icons8.com/color/48/docker.png",
  electron: "https://img.icons8.com/color/48/electron.png",
  "lockapp.exe": "https://img.icons8.com/color/48/lock-2.png",
  "microsoft 365 copilot app":
    "https://img.icons8.com/color/48/microsoft-365.png",
  "microsoft copilot": "https://img.icons8.com/color/48/microsoft-365.png",
  "microsoft edge": "https://img.icons8.com/color/48/ms-edge-new.png",
  mongodbcompass: "https://img.icons8.com/color/48/mongodb.png",
  notepad: "https://img.icons8.com/color/48/notepad.png",
  "photos.exe": "https://img.icons8.com/color/48/windows-photos.png",
  postman: "https://img.icons8.com/color/48/postman-api.png",
  "python 3.13.3 (64-bit)": "https://img.icons8.com/color/48/python.png",
  "screenclippinghost.exe": "https://img.icons8.com/color/48/screenshot.png",
  "search application": "https://img.icons8.com/color/48/search--v1.png",
  settings: "https://img.icons8.com/color/48/settings--v1.png",
  "setup/uninstall": "https://img.icons8.com/color/48/uninstalling-updates.png",
  "ssh, telnet, rlogin, and supdup client":
    "https://img.icons8.com/color/48/console.png",
  "task manager": "https://img.icons8.com/color/48/task-manager.png",
  "tcp/ip ping command": "https://img.icons8.com/color/48/console.png",
  "visual studio code":
    "https://img.icons8.com/color/48/visual-studio-code-2019.png",
  "whatsapp.exe": "https://img.icons8.com/color/48/whatsapp--v1.png",
  "windows command processor":
    "https://img.icons8.com/color/48/command-line.png",
  "windows explorer": "https://img.icons8.com/color/48/windows-explorer.png",
  "windows shell experience host":
    "https://img.icons8.com/color/48/windows-10.png",
  "windows® installer": "https://img.icons8.com/color/48/windows-installer.png",
  "winscp: sftp, ftp, webdav, s3 and scp client":
    "https://img.icons8.com/color/48/ftp.png",
  "wps office": "https://img.icons8.com/color/48/wps-office.png",
  "wps spreadsheets": "https://img.icons8.com/color/48/wps-office.png",
  "x-lite.exe": "https://img.icons8.com/color/48/phone-office.png",
  "a desktop app for humanmaximizer":
    "https://img.icons8.com/color/48/monitor--v1.png",
};

const getFavicon = (url) =>
  `https://www.google.com/s2/favicons?domain=${url}&sz=64`;

const getAppIcon = (appName) => {
  const key = appName.toLowerCase();
  return (
    appIconMap[key] ||
    "https://img.icons8.com/fluency-systems-regular/48/application-window.png"
  );
};

// ────────────────────────────────────────────────────────────────────────────
//  Main component
// ────────────────────────────────────────────────────────────────────────────
export default function EmployeeStatistics() {
  const { empID } = useParams();
  const navigate = useNavigate();
  const today = dayjs();

  // Stores
  const {
    stats,
    dailyStats,
    deptCategories,
    fetchStats,
    fetchDailyStats,
    fetchDeptCategories,
    fetchTopProductivityStats,
    topProductivityStats,
    loading: prodStatsLoading,
    fetchMostUsedStats,
    mostUsedStats,
    loading: usageLoading,
    error: usageError,
    fetchActivityTrend,
  } = useUsageStatsStore();

  const attendanceData = useFullAttendanceStore(
    (state) => state.attendanceData
  );
  const fetchAllData = useFullAttendanceStore((state) => state.fetchAllData);
  const fetchInsights = useFullAttendanceStore((state) => state.fetchInsights);
  const insights = useFullAttendanceStore((state) => state.insights);
  const attendanceLoading = useFullAttendanceStore((state) => state.isLoading);
  const attendanceError = useFullAttendanceStore((state) => state.error);

  // State
  const [mode, setMode] = useState("daily");
  const [month, setMonth] = useState(today.month() + 1);
  const [year, setYear] = useState(today.year());

  // Initial data fetch
  useEffect(() => {
    fetchStats(empID);
    fetchAllData(empID);
  }, [empID]);

  useEffect(() => {
    fetchDailyStats(empID, today.format("YYYY-MM-DD")).then((d) => {
      if (d?.department) fetchDeptCategories(d.department);
    });
  }, [empID]);

  useEffect(() => {
    if (mode === "daily") {
      const dateStr = today.format("YYYY-MM-DD");
      fetchActivityTrend(empID, dateStr);
    }
  }, [empID, mode]);

  useEffect(() => {
    fetchTopProductivityStats(empID, mode);
  }, [empID, mode]);

  useEffect(() => {
    fetchMostUsedStats(empID, mode);
  }, [empID, mode]);

  // Time period calculation
  const period = useMemo(() => {
    if (mode === "yesterday") {
      return {
        start: today.subtract(1, "day").startOf("day"),
        end: today.subtract(1, "day").endOf("day"),
      };
    }
    if (mode === "daily") {
      return { start: today.startOf("day"), end: today.endOf("day") };
    }
    if (mode === "weekly") {
      const end = today.endOf("day");
      const start = today.subtract(6, "day").startOf("day");
      return { start, end };
    }
    if (mode === "monthly") {
      const start = dayjs(
        `${year}-${String(month).padStart(2, "0")}-01`
      ).startOf("month");
      const end = start.endOf("month");
      return { start, end };
    }
    const start = dayjs(`${year}-01-01`).startOf("year");
    const end = start.endOf("year");
    return { start, end };
  }, [mode, month, year]);

  const inWindow = (dateStr) => isBetween(dateStr, period.start, period.end);

  const filteredStats = useMemo(() => {
    return Array.isArray(stats) ? stats.filter((s) => inWindow(s.date)) : [];
  }, [stats, period]);

  const filteredAttendance = useMemo(() => {
    return Array.isArray(attendanceData)
      ? attendanceData.filter((a) => inWindow(a.date))
      : [];
  }, [attendanceData, period]);

  // Usage totals
  const totalUsage = useMemo(() => {
    return filteredStats.reduce(
      (acc, cur) => ({
        keyboardMinutes: acc.keyboardMinutes + cur.keyboardMinutes,
        mouseMinutes: acc.mouseMinutes + cur.mouseMinutes,
        keyboardPresses: acc.keyboardPresses + cur.keyboardPressCount,
        mouseClicks: acc.mouseClicks + cur.mouseClickCount,
      }),
      {
        keyboardMinutes: 0,
        mouseMinutes: 0,
        keyboardPresses: 0,
        mouseClicks: 0,
      }
    );
  }, [filteredStats]);

  // Attendance totals
  const attendanceTotals = useMemo(() => {
    const SHIFT_START = "10:00:00";
    const SHIFT_END = "19:00:00";

    let totalWorkMinutes = 0;
    let totalBreakMinutes = 0;

    filteredAttendance.forEach((rec) => {
      if (!rec.login) return;

      const date = rec.date;
      const shiftStart = dayjs(`${date} ${SHIFT_START}`, "YYYY-MM-DD HH:mm:ss");
      const shiftEnd = dayjs(`${date} ${SHIFT_END}`, "YYYY-MM-DD HH:mm:ss");
      const loginTime = dayjs(
        `${date} ${convertTo24Hour(rec.login)}`,
        "YYYY-MM-DD HH:mm:ss"
      );

      let logoutTime = null;
      if (rec.logout && rec.logout !== rec.login) {
        logoutTime = dayjs(
          `${date} ${convertTo24Hour(rec.logout)}`,
          "YYYY-MM-DD HH:mm:ss"
        );
      }

      const now = dayjs();
      let effectiveEndTime;

      if (dayjs(date).isSame(now, "day")) {
        if (now.isBefore(shiftEnd)) {
          effectiveEndTime = now;
        } else if (logoutTime && logoutTime.isAfter(shiftEnd)) {
          effectiveEndTime = logoutTime;
        } else {
          effectiveEndTime = shiftEnd;
        }
      } else {
        effectiveEndTime = logoutTime ? logoutTime : shiftEnd;
      }

      if (effectiveEndTime.isAfter(loginTime)) {
        totalWorkMinutes += effectiveEndTime.diff(loginTime, "minute");
      }

      rec.breaks?.forEach((br) => {
        if (br.start && br.end) {
          let breakStart = dayjs(br.start);
          let breakEnd = dayjs(br.end);

          if (breakEnd.isBefore(shiftStart) || breakStart.isAfter(shiftEnd))
            return;

          breakStart = breakStart.isBefore(shiftStart)
            ? shiftStart
            : breakStart;

          breakEnd = [breakEnd, effectiveEndTime, shiftEnd].reduce((min, cur) =>
            cur.isBefore(min) ? cur : min
          );

          if (breakEnd.isAfter(breakStart)) {
            totalBreakMinutes += breakEnd.diff(breakStart, "minute");
          }
        }
      });
    });

    const netWorkMinutes = Math.max(totalWorkMinutes - totalBreakMinutes, 0);
    const hours = Math.floor(netWorkMinutes / 60);
    const minutes = netWorkMinutes % 60;

    return {
      totalWorkingHours:
        netWorkMinutes > 0 ? `${hours} hrs ${minutes} mins` : "0 hrs 0 mins",
      totalBreakTaken: totalBreakMinutes,
    };
  }, [filteredAttendance]);

  useEffect(() => {
    const date =
      mode === "daily"
        ? today.format("YYYY-MM-DD")
        : mode === "monthly"
        ? `${year}-${String(month).padStart(2, "0")}`
        : mode === "yearly"
        ? String(year)
        : today.format("YYYY-MM-DD");

    fetchInsights(empID, mode, date);
  }, [empID, mode, month, year]);

  // Productivity calculations (daily only)
  const showProductivity = mode === "daily";
  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!showProductivity || !dailyStats || !deptCategories) {
      return { productiveTime: 0, unproductiveTime: 0 };
    }
    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );
    let p = 0,
      u = 0;
    dailyStats.appsUsed.forEach(({ appName, minutesUsed }) => {
      const n = appName.toLowerCase();
      prodSet.has(n)
        ? (p += minutesUsed)
        : unprodSet.has(n) && (u += minutesUsed);
    });
    dailyStats.websitesVisited.forEach(({ url, minutesVisited }) => {
      const n = url.toLowerCase();
      prodSet.has(n)
        ? (p += minutesVisited)
        : unprodSet.has(n) && (u += minutesVisited);
    });
    return { productiveTime: p, unproductiveTime: u };
  }, [dailyStats, deptCategories, showProductivity]);

  // Doughnut chart config
  const doughnutData = {
    labels: ["Productive", "Unproductive"],
    datasets: [
      {
        data: [productiveTime, unproductiveTime],
        backgroundColor: ["#2563EB", "#F97316"],
        hoverBackgroundColor: ["#1E40AF", "#EA580C"],
        borderColor: "#FFF",
        borderWidth: 4,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 15,
          font: {
            size: 14,
          },
          color: "#6B7280",
        },
      },
    },
  };

  // Top used apps/websites
  const top3Websites = useMemo(() => {
    if (!mostUsedStats?.topWebsites) return [];
    return [...mostUsedStats.topWebsites]
      .sort((a, b) => b.minutesVisited - a.minutesVisited)
      .slice(0, 3);
  }, [mostUsedStats]);

  const top3Apps = useMemo(() => {
    if (!mostUsedStats?.topApps) return [];
    return [...mostUsedStats.topApps]
      .sort((a, b) => b.minutesUsed - a.minutesUsed)
      .slice(0, 3);
  }, [mostUsedStats]);

  // Loading and error states
  if (usageLoading || attendanceLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            Loading employee statistics...
          </p>
        </div>
      </div>
    );

  if (usageError || attendanceError)
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
          <FiInfo className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Unable to load data
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {usageError || attendanceError}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );

  // Sub-components
  const StatsTableCard = ({ title, icon, data = [], isWebsite = false }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-5 py-4">
          <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
            {icon}
          </div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
                  #
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600">
                  {isWebsite ? "Website" : "App"}
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  Time (Min)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.slice(0, 5).map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300 border-r border-gray-100 dark:border-gray-700">
                      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 font-medium">
                        {i + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white border-r border-gray-100 dark:border-gray-700">
                      <div className="flex items-center">
                        <img
                          src={
                            isWebsite
                              ? getFavicon(row.url)
                              : getAppIcon(row.appName)
                          }
                          alt=""
                          className="w-8 h-8 mr-3 rounded-lg bg-gray-100 dark:bg-gray-700 p-1"
                        />
                        <span className="truncate max-w-[160px] font-medium">
                          {isWebsite ? row.url : row.appName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium">
                        {row.minutesVisited || row.minutesUsed || 0}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          min
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
                      No data available
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ProductivityBarGraph = ({ data }) => {
    const productivityMap = {
      less: 1,
      avg: 2,
      top: 3,
    };

    const productivityColor = {
      less: "#FF8A80",
      avg: "#90CAF9",
      top: "#B9F6CA",
    };

    const formattedData = data.map((app) => ({
      name: app.appName,
      productivityLevel: app.productivityLevel,
      productivityValue: productivityMap[app.productivityLevel] || 0,
    }));

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Productive Websites & Apps
        </h3>

        <ResponsiveContainer
          width="100%"
          height={formattedData.length * 50 + 50}
        >
          <BarChart layout="vertical" data={formattedData}>
            <XAxis type="number" hide domain={[0, 3]} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              width={150}
            />
            <RechartsTooltip
              formatter={(value, name, props) =>
                props?.payload?.productivityLevel
                  ? props.payload.productivityLevel.toUpperCase()
                  : "N/A"
              }
            />

            <Bar
              dataKey="productivityValue"
              barSize={25}
              radius={[0, 10, 10, 0]}
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={productivityColor[entry.productivityLevel]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex justify-around mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-2 bg-[#B9F6CA]"></span>
            Top
          </span>
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-2 bg-[#90CAF9]"></span>
            Avg
          </span>
          <span className="flex items-center">
            <span className="block w-3 h-3 rounded-full mr-2 bg-[#FF8A80]"></span>
            Less
          </span>
        </div>
      </div>
    );
  };

  const MetricCard = ({ color, icon, label, value }) => {
    const colorClasses = {
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-l-green-500",
        iconBg:
          "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300",
      },
      yellow: {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-l-yellow-500",
        iconBg:
          "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300",
      },
      indigo: {
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
        border: "border-l-indigo-500",
        iconBg:
          "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
      },
      teal: {
        bg: "bg-teal-50 dark:bg-teal-900/20",
        border: "border-l-teal-500",
        iconBg:
          "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300",
      },
      cyan: {
        bg: "bg-cyan-50 dark:bg-cyan-900/20",
        border: "border-l-cyan-500",
        iconBg:
          "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300",
      },
      amber: {
        bg: "bg-amber-50 dark:bg-amber-900/20",
        border: "border-l-amber-500",
        iconBg:
          "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300",
      },
    };

    return (
      <div
        className={`p-5 rounded-2xl shadow-sm ${colorClasses[color].bg} ${colorClasses[color].border} border-l-4 flex items-start`}
      >
        <div className={`mr-4 p-3 rounded-xl ${colorClasses[color].iconBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            {label}
          </h3>
          <p
            className={`text-xl font-bold text-gray-900 dark:text-white truncate`}
          >
            {value}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="bg-indigo-500/10 p-2 rounded-lg mr-3">
            <FiBarChart2 className="w-6 h-6 text-indigo-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Employee Statistics
          </h1>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
            {empID.slice(0, 2)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed analytics for employee #{empID}
          </p>
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <FiCalendar className="mr-2 w-4 h-4" />
              Time Range
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="daily">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="weekly">Weekly (last 7 days)</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {mode === "monthly" && (
            <>
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {dayjs().month(i).format("MMMM")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {mode === "yearly" && (
            <div className="flex-1 min-w-[160px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          color="green"
          icon={<FiClock className="w-5 h-5" />}
          label="Total Working Hours"
          value={attendanceTotals.totalWorkingHours}
        />
        <MetricCard
          color="yellow"
          icon={<FiCoffee className="w-5 h-5" />}
          label="Total Break Taken"
          value={`${attendanceTotals.totalBreakTaken} mins`}
        />
        {insights && (
          <>
            <MetricCard
              color="indigo"
              icon={<FiClock className="w-5 h-5" />}
              label="Avg Break/Day"
              value={insights.averageBreakTime || "0 mins"}
            />
            <MetricCard
              color="teal"
              icon={<FiClock className="w-5 h-5" />}
              label="Longest Break"
              value={insights.longestBreak || "0 mins"}
            />
            <MetricCard
              color="cyan"
              icon={<FiCalendar className="w-5 h-5" />}
              label="Frequent Break Times"
              value={insights.mostFrequentBreakTimes?.join(", ") || "N/A"}
            />
            <MetricCard
              color="amber"
              icon={<FiTrendingUp className="w-5 h-5" />}
              label="Avg Working Hours"
              value={insights.averageWorkingHours || "0 hrs"}
            />
          </>
        )}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Productivity chart */}
        {showProductivity && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/10 p-2 rounded-lg mr-3">
                <FiActivity className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Today's Productivity
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 mb-2">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                    +
                    {(
                      (productiveTime / (productiveTime + unproductiveTime)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                  <span className="ml-2">Productivity</span>
                </div>
                <div className="flex justify-center gap-4 mt-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {productiveTime} min productive
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {unproductiveTime} min unproductive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activity chart */}
        {mode === "daily" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/10 p-2 rounded-lg mr-3">
                <FiTrendingUp className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Activity Timeline
              </h3>
            </div>
            <ActivityTrendChart
              employeeId={empID}
              date={today.format("YYYY-MM-DD")}
            />
          </div>
        )}
      </div>

      {/* Usage table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mt-6">
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <FiMousePointer className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Usage Statistics
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              {mode === "daily" && dayjs().format("DD MMM YYYY")}
              {mode === "weekly" &&
                `${period.start.format("DD MMM")} - ${period.end.format(
                  "DD MMM YYYY"
                )}`}
              {mode === "monthly" &&
                dayjs(`${year}-${month}-01`).format("MMMM YYYY")}
              {mode === "yearly" && year}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-center">
                    <FiType className="mr-1" /> Keys
                  </div>
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-center">
                    <FiMousePointer className="mr-1" /> Mouse
                  </div>
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  Key Presses
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  Mouse Clicks
                </th>
                <th className="py-3 px-4 text-center font-medium text-gray-700 dark:text-gray-300">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredStats.map((stat) => (
                <tr
                  key={stat._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/20"
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                    {dayjs(stat.date).format("DD MMM YYYY")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300">
                      {stat.keyboardMinutes}
                      <span className="ml-1 text-xs">min</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300">
                      {stat.mouseMinutes}
                      <span className="ml-1 text-xs">min</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300 font-medium">
                    {stat.keyboardPressCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300 font-medium">
                    {stat.mouseClickCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/statistics/${empID}/${stat.date}`)
                      }
                      className="px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-medium rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {!filteredStats.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
                      No usage data available
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Productivity insights */}
      <div className="mt-8">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 rounded-t-2xl px-6 py-5 flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <FiMonitor className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Productivity Insights (
            {mode.charAt(0).toUpperCase() + mode.slice(1)})
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg overflow-hidden">
          {prodStatsLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <StatsTableCard
                title="Top Apps Used"
                icon={<FiMonitor className="w-5 h-5" />}
                data={topProductivityStats?.topApps || []}
              />
              <StatsTableCard
                title="Less Productive Apps"
                icon={<FiMonitor className="w-5 h-5" />}
                data={topProductivityStats?.leastApps || []}
              />
              <StatsTableCard
                title="Most Used Websites"
                icon={<FiGlobe className="w-5 h-5" />}
                data={top3Websites}
                isWebsite
              />
              <StatsTableCard
                title="Most Used Apps"
                icon={<FiMonitor className="w-5 h-5" />}
                data={top3Apps}
              />
            </div>
          )}
        </div>
      </div>

      {/* Productivity bar graph */}
      {topProductivityStats && topProductivityStats.topApps && (
        <div className="mt-8">
          <ProductivityBarGraph data={topProductivityStats.topApps} />
        </div>
      )}
    </div>
  );
}
