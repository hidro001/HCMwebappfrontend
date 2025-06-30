import React, { useEffect, useState } from "react";
import EmployeeDetails from "../manager-tabs/EmployeeDetails";
import axiosInstance from "../../../../service/axiosInstance";

export default function FinalReview({ employeeId }) {
  const [data, setData] = useState({
    compensationAndAccess: null,
    benefitsAndVerification: null,
    exitDetails: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const res = await axiosInstance.get(
          `/registration/employee-section/${employeeId}`
        );
        setData(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch section-wise data:", err);
        setError("Failed to load employee review data.");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) fetchSectionData();
  }, [employeeId]);

  if (loading) return <div className="p-6">Loading review data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const { compensationAndAccess, benefitsAndVerification, exitDetails } = data;

  return (
    <div className="p-6 space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Final Review</h2>

      {/* ✅ Show Employee Details on top */}
      <div className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Employee Details</h3>
        <EmployeeDetails employeeId={employeeId} />
      </div>

      {/* ✅ Section-wise details */}
      <SectionBlock title="Compensation & Access" data={compensationAndAccess} />
      <SectionBlock title="Benefits & Verification" data={benefitsAndVerification} />
      <SectionBlock title="Exit Details" data={exitDetails} />
    </div>
  );
}

function SectionBlock({ title, data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <section className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">No data available.</p>
      </section>
    );
  }

  return (
    <section className="border border-gray-300 dark:border-gray-700 rounded p-4 shadow space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 capitalize">
              {formatKey(key)}
            </span>

            {/* Render value based on its type */}
            {Array.isArray(value) ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {value.length === 0 ? (
                  <span className="text-gray-500 text-sm">None</span>
                ) : (
                  value.map((item, idx) =>
                    typeof item === "object" && item !== null ? (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs rounded"
                      >
                        {Object.values(item).join(" ")}
                      </span>
                    ) : (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs rounded"
                      >
                        {item}
                      </span>
                    )
                  )
                )}
              </div>
            ) : typeof value === "object" && value !== null ? (
              <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {Object.values(value).join(" ") || "—"}
              </span>
            ) : (
              <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {value || "—"}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function formatKey(key) {
  return key
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
