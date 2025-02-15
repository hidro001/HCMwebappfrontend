import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const EmployeeBreakStatsTable = () => {
  const data = [
    {
      srn: 1,
      empid: "E001",
      braketype: "Face Detection",
      name: "John Doe",
      designation: "Software Engineer",
      breaktaken: "30 mins",
    },
    {
      srn: 2,
      empid: "E002",
      braketype: "Monitor Track",
      name: "Jane Smith",
      designation: "Project Manager",
      breaktaken: "15 mins",
    },
    {
      srn: 3,
      empid: "E003",
      braketype: "Face Detection",
      name: "Alice Johnson",
      designation: "UI/UX Designer",
      breaktaken: "10 mins",
    },
    {
      srn: 4,
      empid: "E004",
      braketype: "Monitor Track",
      name: "Bob Brown",
      designation: "QA Engineer",
      breaktaken: "20 mins",
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      {/* Card Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header with Icon on the Right */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-teal-500 dark:from-gray-700 dark:to-gray-900 rounded-t-lg flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">Productivity Lense</h3>
            <p className="mt-2 text-sm text-white">
              Overview of employee break details.
            </p>
          </div>
          <div>
            <Link
              to="/all-break-stats"
              className="flex items-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <span>View All</span>
              <FaArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>

        {/* Responsive Table */}
        {/* On mobile, overflow-x-auto enables horizontal scroll;
            on screens "sm" and up, overflow is visible */}
        <div className="p-4 overflow-x-auto sm:overflow-x-visible">
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
                <th className="px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide">
                  BreakType
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
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
                  <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap">
                    {item.braketype}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeBreakStatsTable;
