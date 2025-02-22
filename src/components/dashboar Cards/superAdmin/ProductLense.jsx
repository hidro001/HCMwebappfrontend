import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// Import your new service
import { fetchBreakStats } from "../../../service/productLenseService";

const EmployeeBreakStatsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch break stats data on component mount
    const getData = async () => {
      setLoading(true);
      const result = await fetchBreakStats("daily"); // or "monthly", etc.
      setData(result);
      setLoading(false);
    };
    getData();
  }, []);

  // Slice data to only show the first 10 entries
  const limitedData = data.slice(0, 10);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-6">
      {/* Card Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header with Icon on the Right */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-gray-700 dark:to-gray-900 rounded-t-lg flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">
              Productivity Lense
            </h3>
            <p className="mt-2 text-sm text-white">
              Overview of employee break details.
            </p>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="p-4 overflow-x-auto sm:overflow-x-visible">
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : limitedData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No data found.</div>
          ) : (
            <table className="table-auto w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                    SRN
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                    EmpID
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                    Designation
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                    BreakTaken
                  </th>
                </tr>
              </thead>
              <tbody>
                {limitedData.map((item, index) => (
                  <tr
                    key={item.srn}
                    className={`${
                      index % 2 === 0
                        ? "bg-blue-50 dark:bg-gray-800"
                        : "bg-green-50 dark:bg-gray-900"
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.srn}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                      {item.empid}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                      {item.designation}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                      {item.breaktaken}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeBreakStatsTable;
