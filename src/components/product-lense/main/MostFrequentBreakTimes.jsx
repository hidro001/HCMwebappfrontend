import React, { useEffect, useState } from "react";
import axiosInstance from "../../../service/axiosInstance";
import {
  fetchDesignations,
  fetchDepartments,
} from "../../../service/employeeService";

const MostFrequentBreakTimes = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDesig, setSelectedDesig] = useState("");
  const [breakTimes, setBreakTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch departments & designations
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptRes, desigRes] = await Promise.all([
          fetchDepartments(),
          fetchDesignations(),
        ]);

        setDepartments(deptRes.map((d) => d.department).filter(Boolean));
        setDesignations(desigRes.map((d) => d.designation).filter(Boolean));
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };

    fetchOptions();
  }, []);

  // Fetch break times
  useEffect(() => {
    const fetchBreakTimes = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (selectedDept) params.append("department", selectedDept);
        if (selectedDesig) params.append("designation", selectedDesig);

        const res = await axiosInstance.get(
          `/usage-stats/break-times?${params.toString()}`
        );

        if (res.data.success) {
          setBreakTimes(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch data.");
        }
      } catch (err) {
        setError("Error fetching break times: " + err.message);
      }

      setLoading(false);
    };

    fetchBreakTimes();
  }, [selectedDept, selectedDesig]);

  // Function to format time range for display
  const formatTimeRange = (range) => {
    const [start, end] = range.split("-");
    return `${start.replace(/(\d{2})(\d{2})/, "$1:$2")} - ${end.replace(
      /(\d{2})(\d{2})/,
      "$1:$2"
    )}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/80 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Frequent Break Times
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Discover peak break periods across your organization
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Department
          </label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Designation
          </label>
          <div className="relative">
            <select
              className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200"
              value={selectedDesig}
              onChange={(e) => setSelectedDesig(e.target.value)}
            >
              <option value="">All Designations</option>
              {designations.map((desig) => (
                <option key={desig} value={desig}>
                  {desig}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      {loading && (
        <div className="animate-pulse space-y-4 py-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-10"></div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Results */}
      {!loading && !error && breakTimes.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Break Time Range
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Frequency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {breakTimes.map(({ breakRange, count }) => (
                <tr
                  key={breakRange}
                  className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatTimeRange(breakRange)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      {count} {count === 1 ? "occurrence" : "occurrences"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && breakTimes.length === 0 && (
        <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <svg
            className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No break times found
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Try adjusting your filters or check back later as data becomes
            available.
          </p>
        </div>
      )}

      {/* Insights Panel */}
      {!loading && !error && breakTimes.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Peak Break Insight
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                The most common break time is{" "}
                <span className="font-semibold">
                  {formatTimeRange(breakTimes[0]?.breakRange || "")}
                </span>{" "}
                with {breakTimes[0]?.count} occurrences
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostFrequentBreakTimes;
