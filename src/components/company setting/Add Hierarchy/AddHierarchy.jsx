
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DepartmentTable from "./DepartmentTable";
import DesignationTable from "./DesignationTable";
import RoleTable from "./RoleTable";

export default function AddHierarchy() {
  const [activeTab, setActiveTab] = useState("department");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("department")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "department"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Add Department
        </button>
        <button
          onClick={() => setActiveTab("designation")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "designation"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Add Designation
        </button>
        <button
          onClick={() => setActiveTab("role")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "role"
              ? "bg-purple-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Add Role
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        {activeTab === "department" && <DepartmentTable isLoading={isLoading} />}
        {activeTab === "designation" && <DesignationTable isLoading={isLoading} />}
        {activeTab === "role" && <RoleTable isLoading={isLoading} />}
      </motion.div>
    </div>
  );
}
