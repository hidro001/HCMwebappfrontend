import React, { useState } from "react";
import LessProductiveEmployee from "./LessProductiveEmployee";
import TopProductiveEmployee from "./TopProductiveEmployee";

const TeamProductivity = () => {
  // "top" or "less" to track which tab is active
  const [activeTab, setActiveTab] = useState("top");

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("top")}
          className={`px-4 py-2 border rounded 
            ${
              activeTab === "top"
                ? "bg-purple-200 border-purple-600 text-purple-800"
                : "text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700"
            }`}
        >
          Top Productive Employee
        </button>

        <button
          onClick={() => setActiveTab("less")}
          className={`px-4 py-2 border rounded
            ${
              activeTab === "less"
                ? "bg-purple-200 border-purple-600 text-purple-800"
                : "text-purple-600 border-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700"
            }`}
        >
          Less Productive Employee
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "top" ? <TopProductiveEmployee /> : <LessProductiveEmployee />}
      </div>
    </div>
  );
};

export default TeamProductivity;
