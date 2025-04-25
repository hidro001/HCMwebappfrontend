


import React, { useState } from "react";
import RateEmployee from "./RateEmployee";
import BulkRating from "./BulkRating";
import {
  FiUsers,
  FiDatabase,
  FiStar
} from "react-icons/fi";

function GiveRatingDashboard() {
  const [activeTab, setActiveTab] = useState("onebyone");

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 transition-colors duration-300 rounded-2xl shadow-lg overflow-hidden">
      <div className=" mx-auto px-2 py-2">
        {/* Header - Centered */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg mb-4">
            <FiStar size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Ratings</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Manage performance evaluations for your team
          </p>
        </div>

        {/* Tabs - Centered */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-1.5 inline-flex">
            <button
              onClick={() => setActiveTab("onebyone")}
              className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full transition-all
                ${
                  activeTab === "onebyone"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <FiUsers size={18} />
              <span>Individual Rating</span>
            </button>
            
            <button
              onClick={() => setActiveTab("bulk")}
              className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full transition-all
                ${
                  activeTab === "bulk"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <FiDatabase size={18} />
              <span>Bulk Rating</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-300">
          {activeTab === "onebyone" && <RateEmployee />}
          {activeTab === "bulk" && <BulkRating />}
        </div>
      </div>
    </div>
  );
}

export default GiveRatingDashboard;