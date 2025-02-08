import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { BsThreeDotsVertical } from "react-icons/bs";

/* ---------------- REGISTER CHART.JS MODULES ---------------- */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/* ---------------- STYLES FOR DEPARTMENTS ---------------- */
const departmentStyles = {
  Development: {
    bg: "bg-purple-50 dark:bg-purple-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-purple-500 dark:bg-purple-500",
    pillText: "text-white",
  },
  "Sales & Marketing": {
    bg: "bg-orange-50 dark:bg-orange-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-green-500 dark:bg-green-500",
    pillText: "text-white",
  },
  "Project Management": {
    bg: "bg-green-50 dark:bg-green-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-blue-500 dark:bg-blue-500",
    pillText: "text-white",
  },
  "Analytics & Data": {
    bg: "bg-blue-50 dark:bg-blue-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-gray-400 dark:bg-gray-400",
    pillText: "text-white",
  },
  Finance: {
    bg: "bg-pink-50 dark:bg-pink-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-pink-500 dark:bg-pink-500",
    pillText: "text-white",
  },
};

/* ---------------- MINISPARKLINE COMPONENT ---------------- */
function MiniSparkline({ data }) {
  const sparkData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: "#3B82F6",
        borderWidth: 2,
        tension: 0.3,
        backgroundColor: "transparent",
        pointRadius: 0,
      },
    ],
  };

  const sparkOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-20 h-8">
      <Line data={sparkData} options={sparkOptions} />
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function RecruitDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  /* 
     We'll store the top squares in state:
     openPositions, applicants, outstandingOffers, onboarding 
  */
  const [openPositions, setOpenPositions] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [outstandingOffers, setOutstandingOffers] = useState(0);
  const [onboarding, setOnboarding] = useState(0);

  /* For "Top Hiring Sources" chart data */
  const [topHiringData, setTopHiringData] = useState({
    labels: [],
    datasets: [],
  });

  /* For "Recent Vacancies" table */
  const [vacancies, setVacancies] = useState([]);

  /* For "Departments" data */
  const [departments, setDepartments] = useState([]);

  /* For error/loading states */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 
     Adjust the base URL depending on your environment 
     e.g. "http://localhost:6060/api/v1/admin" if that's your route mount
  */
  const BASE_URL = "http://localhost:6060/api/v1/admin";
  const token = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    setError("");

    try {
      await fetchOverview();
      await fetchHiringSources();
      await fetchVacancies();
      await fetchDepartments();
    } catch (err) {
      console.error("Error loading Recruit Dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  /* 1) OVERVIEW STATS (top squares) */
  function fetchOverview() {
    return axios
      .get(`${BASE_URL}/recruit-dashboard/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          const { openPositions, applicants, outstandingOffers, onboarding } =
            res.data.data;
          setOpenPositions(openPositions);
          setApplicants(applicants);
          setOutstandingOffers(outstandingOffers);
          setOnboarding(onboarding);
        }
      });
  }

  /* 2) TOP HIRING SOURCES (stacked bar) */
  function fetchHiringSources() {
    return axios
      .get(`${BASE_URL}/recruit-dashboard/hiring-sources`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          setTopHiringData(res.data.data);
        }
      });
  }

  /* 3) RECENT VACANCIES (table) */
  function fetchVacancies() {
    return axios
      .get(`${BASE_URL}/recruit-dashboard/vacancies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          setVacancies(res.data.data);
        }
      });
  }

  /* 4) DEPARTMENTS */
  function fetchDepartments() {
    return axios
      .get(`${BASE_URL}/recruit-dashboard/departments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data?.data) {
          setDepartments(res.data.data);
        }
      });
  }

  /* Chart Options for the top hiring chart */
  const topHiringOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 100 },
    },
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6 transition-colors">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Recruitment Dashboard</h1>
          </div>

          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* ------------- TOP ROW: 4 big squares + Bar Chart ------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6 mb-6">
            {/* Left: 4 squares */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              {/* 1) Open Positions */}
              <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">{openPositions}</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Open Positions
                </div>
              </div>

              {/* 2) Applicants */}
              <div className="rounded-lg p-4 bg-orange-50 dark:bg-orange-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">{applicants}</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Applicants
                </div>
              </div>

              {/* 3) Outstanding Offers */}
              <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">
                  {outstandingOffers}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  Outstanding Offers
                </div>
              </div>

              {/* 4) Onboarding */}
              <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-900 shadow flex flex-col justify-center">
                <div className="text-3xl font-bold mb-1">{onboarding}</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Onboarding
                </div>
              </div>
            </div>

            {/* Right: Top Hiring Sources (Bar Chart) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Top Hiring Sources
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Nov. 01 – 07
                </span>
              </div>
              <div className="flex-grow relative h-56">
                <Bar data={topHiringData} options={topHiringOptions} />
              </div>
            </div>
          </div>

          {/* ------------- BOTTOM ROW: Vacancies Table + Departments ------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Vacancies Table */}
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Recent Vacancies
                </h2>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  All Vacancies
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-700 dark:text-gray-200">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="py-2 font-semibold">Job Title</th>
                      <th className="py-2 font-semibold">Location</th>
                      <th className="py-2 font-semibold">Applicants</th>
                      <th className="py-2 font-semibold">Trend</th>
                      <th className="py-2 w-10" />
                    </tr>
                  </thead>
                  <tbody>
                    {vacancies.map((vac, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 font-medium">{vac.title}</td>
                        <td className="py-3">{vac.location}</td>
                        <td className="py-3">
                          <span className="font-medium">{vac.applicants}</span>
                          {vac.newApplicants > 0 && (
                            <span className="ml-1 text-xs text-green-500 dark:text-green-300">
                              ({vac.newApplicants} new)
                            </span>
                          )}
                        </td>
                        <td className="py-3">
                          <MiniSparkline data={vac.sparkData || []} />
                        </td>
                        <td className="py-3 text-right">
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                            title="More actions"
                          >
                            <BsThreeDotsVertical />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {vacancies.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-3">
                          No vacancies found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Departments List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Departments
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sep. 01 – 07
                </span>
              </div>
              <div className="space-y-3">
                {departments.map((dept, i) => {
                  const styles = departmentStyles[dept.name] || {
                    bg: "bg-gray-100 dark:bg-gray-800",
                    text: "text-gray-800 dark:text-gray-100",
                    circle: "bg-gray-200 dark:bg-gray-600",
                    pillBg: "bg-gray-300 dark:bg-gray-700",
                    pillText: "text-gray-700 dark:text-gray-100",
                  };
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl ${styles.bg}`}
                    >
                      <span className={`font-medium ${styles.text}`}>
                        {dept.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="relative w-10 h-7">
                          <div
                            className={`absolute w-7 h-7 rounded-full top-0 left-0 ${styles.circle}`}
                          />
                          <div
                            className={`absolute w-7 h-7 rounded-full top-0 left-3 ${styles.circle}`}
                          />
                        </div>
                        {dept.newCount > 0 && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${styles.pillBg} ${styles.pillText}`}
                          >
                            +{dept.newCount} new
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
