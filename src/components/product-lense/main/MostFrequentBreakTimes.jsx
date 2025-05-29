import React, { useEffect, useState } from "react";
import axiosInstance from "../../../service/axiosInstance";

const MostFrequentBreakTimes = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDesig, setSelectedDesig] = useState("");

  const [breakTimes, setBreakTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy placeholders: Replace with actual API call or props to get depts/designations
  useEffect(() => {
    // Example static options, replace with real data fetching if needed
    setDepartments(["Sales", "Engineering", "HR", "Marketing"]);
    setDesignations(["Manager", "Developer", "Analyst", "Intern"]);
  }, []);

  const fetchBreakTimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedDept) params.department = selectedDept;
      if (selectedDesig) params.designation = selectedDesig;

      const queryString = new URLSearchParams(params).toString();
      const url = `/usage-stats/break-times${queryString ? `?${queryString}` : ""}`;

      const res = await axiosInstance.get(url);
      if (res.data.success) {
        setBreakTimes(res.data.data);
      } else {
        setBreakTimes([]);
        setError(res.data.message || "Failed to fetch break times");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch break times");
      setBreakTimes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBreakTimes();
  }, [selectedDept, selectedDesig]);

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Frequent Break Times</h2>

      <div className="mb-4 flex space-x-4">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="border rounded p-2 flex-1"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={selectedDesig}
          onChange={(e) => setSelectedDesig(e.target.value)}
          className="border rounded p-2 flex-1"
        >
          <option value="">All Designations</option>
          {designations.map((desig) => (
            <option key={desig} value={desig}>
              {desig}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading break times...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {breakTimes.length === 0 ? (
            <p>No break times found for selected filters.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left">Break Start Time</th>
                  <th className="border border-gray-300 p-2 text-left">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {breakTimes.map(({ _id: breakStart, count }) => (
                  <tr key={breakStart}>
                    <td className="border border-gray-300 p-2">{breakStart}</td>
                    <td className="border border-gray-300 p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default MostFrequentBreakTimes;
