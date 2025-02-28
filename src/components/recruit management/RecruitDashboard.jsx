import React, { useState, useEffect } from "react";
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

// Import service functions
import {
  fetchOverview,
  fetchHiringSources,
  fetchVacancies,
  fetchDepartments,
} from "../../service/recruitService";

// Register ChartJS modules
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
  IT: {
    bg: "bg-indigo-50 dark:bg-indigo-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-indigo-500 dark:bg-indigo-500",
    pillText: "text-white",
  },
  Sales: {
    bg: "bg-orange-50 dark:bg-orange-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-green-500 dark:bg-green-500",
    pillText: "text-white",
  },
  Hr: {
    bg: "bg-cyan-50 dark:bg-cyan-900",
    text: "text-gray-800 dark:text-gray-100",
    circle: "bg-gray-200 dark:bg-gray-700",
    pillBg: "bg-cyan-500 dark:bg-cyan-500",
    pillText: "text-white",
  },
  // Optional: retain the other mappings if needed
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
  const [openPositions, setOpenPositions] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [outstandingOffers, setOutstandingOffers] = useState(0);
  const [onboarding, setOnboarding] = useState(0);

  const [topHiringData, setTopHiringData] = useState({
    labels: [],
    datasets: [],
  });

  const [vacancies, setVacancies] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    setError("");

    try {
      // 1) Overview
      const overviewRes = await fetchOverview();
      if (overviewRes?.data) {
        const { openPositions, applicants, pendingPositions, onboarding } =
          overviewRes.data;
        setOpenPositions(openPositions || 0);
        setApplicants(applicants || 0);
        setOutstandingOffers(pendingPositions || 0);
        setOnboarding(onboarding || 0);
      }

      // 2) Hiring Sources
      const hiringRes = await fetchHiringSources();
      if (hiringRes?.data) {
        setTopHiringData(hiringRes.data);
      }

      // 3) Vacancies
      const vacRes = await fetchVacancies();
      if (vacRes?.data) {
        setVacancies(vacRes.data);
      }

      // 4) Departments
      const deptRes = await fetchDepartments();
      if (deptRes?.data) {
        setDepartments(deptRes.data);
      }
    } catch (err) {
      console.error("Error loading Recruit Dashboard data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  // For the "Top Hiring Sources" bar chart
  const topHiringOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 100 },
    },
    plugins: { legend: { position: "bottom" } },
  };

  // ---------------
  // NO DATA CHECKS
  // ---------------
  const hasOverviewData =
    openPositions || applicants || outstandingOffers || onboarding;
  const hasHiringData =
    topHiringData.labels && topHiringData.labels.length > 0;
  const hasVacanciesData = vacancies.length > 0;
  const hasDepartmentsData = departments.length > 0;

  return (
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
          {!hasOverviewData && !loading && !error ? (
            <p className="col-span-2 text-gray-500">
              No overview data available.
            </p>
          ) : (
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
                <div className="text-3xl font-bold mb-1">{outstandingOffers}</div>
                <div className="text-gray-600 dark:text-gray-300">
                  Pending Position
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
          )}

          {/* Right: Top Hiring Sources (Bar Chart) */}
        
        </div>

        {/* ------------- BOTTOM ROW: Vacancies Table + Departments ------------- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Vacancies Table */}
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Recent Vacancies
              </h2>
              {/* <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                All Vacancies
              </button> */}
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
                  {hasVacanciesData ? (
                    vacancies.map((vac, idx) => (
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
                          {/* <button
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                            title="More actions"
                          >
                            <BsThreeDotsVertical />
                          </button> */}
                        </td>
                      </tr>
                    ))
                  ) : (
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
    {/* <span className="text-sm text-gray-500 dark:text-gray-400">
      Sep. 01 – 07
    </span> */}
  </div>
  {hasDepartmentsData ? (
    <div className="space-y-3">
      {departments.map((dept, i) => {
        const styles = departmentStyles[dept.department] || {
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
              {dept.department}
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
              {dept.count > 0 && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${styles.pillBg} ${styles.pillText}`}
                >
                  +{dept.count} new
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="text-gray-500">No departments data found.</p>
  )}
</div>

        </div>
      </div>
    </div>
  );
}
