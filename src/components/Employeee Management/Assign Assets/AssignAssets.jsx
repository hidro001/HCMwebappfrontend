import React, { useState } from "react";
import { motion } from "framer-motion";
// Icons (choose from any icon set within react-icons)
import { FaFilePdf, FaFileExcel, FaPrint, FaSun, FaMoon } from "react-icons/fa";

// Sample Employee Data
const employees = [
  { sl: "01", id: "#526534", name: "Sameer Hameed", department: "IT" },
  { sl: "02", id: "#696589", name: "Kyser Shah", department: "Marketing" },
  { sl: "03", id: "#256584", name: "Nikunj Gupta", department: "Sales" },
  { sl: "04", id: "#526587", name: "Anand Sharma", department: "Finance" },
  { sl: "05", id: "#105986", name: "Yash Tandon", department: "Designing" },
  { sl: "06", id: "#526589", name: "Rishi Kumar", department: "Operation" },
  { sl: "07", id: "#526520", name: "Akhilesh Sharma", department: "Marketing" },
  { sl: "08", id: "#256584", name: "Kyser Shah", department: "Operation" },
  { sl: "09", id: "#200257", name: "Nishant Tandon", department: "IT" },
  { sl: "10", id: "#526525", name: "Nikunj Gupta", department: "Finance" },
];

export default function AssignAssets() {
  // State to manage theme
  const [isDark, setIsDark] = useState(false);

  // Toggle theme
  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  // top-level container classes: use conditional to apply dark or light
 

  return (
    <div >
    
      <motion.div
        className="dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-800 p-4 md:p-6 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold mb-4 sm:mb-0">Assign Assets</h1>
          
          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
        

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              View Assets Group
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Add Asset Group
            </button>
          </div>
        </div>

        {/* Filters / Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
          {/* Show entries */}
          <div className="flex items-center space-x-2">
            <label htmlFor="show" className="text-sm font-medium">
              Show
            </label>
            <select
              id="show"
              className="border dark:border-gray-700 rounded px-2 py-1 text-sm focus:outline-none bg-transparent"
              defaultValue="10"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center border dark:border-gray-700 rounded px-2 py-1 text-sm w-full max-w-xs bg-transparent">
            {/* Example search icon using react-icons */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="flex-grow focus:outline-none bg-transparent"
            />
          </div>

          {/* Date */}
          <div className="flex items-center border dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent">
            <input
              type="date"
              className="focus:outline-none bg-transparent"
              defaultValue="2025-01-11"
            />
          </div>

          {/* Department */}
          <div className="flex items-center border dark:border-gray-700 rounded px-2 py-1 text-sm bg-transparent">
            <select className="focus:outline-none bg-transparent">
              <option value="">Department</option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
              <option value="designing">Designing</option>
              <option value="operation">Operation</option>
            </select>
          </div>

          {/* Export Icons */}
          <div className="flex space-x-2">
            {/* PDF Export */}
            <button className="p-2 border dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FaFilePdf className="h-4 w-4 text-red-600" />
            </button>
            {/* Excel Export */}
            <button className="p-2 border dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FaFileExcel className="h-4 w-4 text-green-700" />
            </button>
            {/* Print */}
            <button className="p-2 border dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <FaPrint className="h-4 w-4 text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full bg-white dark:bg-gray-800 rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">S.L</th>
                <th className="px-4 py-2 font-medium">Employee ID</th>
                <th className="px-4 py-2 font-medium">Employee Name</th>
                <th className="px-4 py-2 font-medium">Department</th>
                <th className="px-4 py-2 font-medium">Assets</th>
              </tr>
            </thead>
            <tbody className="dark:divide-gray-700">
              {employees.map((emp, index) => (
                <tr key={index} className="border-b last:border-0 dark:border-gray-700">
                  <td className="px-4 py-2">{emp.sl}</td>
                  <td className="px-4 py-2 text-blue-500 dark:text-blue-400 font-medium">
                    {emp.id}
                  </td>
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
                      + Assign Asset
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="p-4 flex justify-end space-x-1 dark:bg-gray-800">
            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              3
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              4
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
              5
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
