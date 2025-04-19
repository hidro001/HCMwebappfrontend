// components/RatingDashboard.jsx

import React, { useState } from "react";
import RateEmployee from "./RateEmployee";
import BulkRating from "./BulkRating";

function RatingDashboard() {
  const [activeTab, setActiveTab] = useState("onebyone");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee Ratings</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("onebyone")}
          className={`px-4 py-2 rounded ${
            activeTab === "onebyone"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          One-by-One Rating
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`px-4 py-2 rounded ${
            activeTab === "bulk"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Bulk Rating
        </button>
      </div>

      {activeTab === "onebyone" && <RateEmployee />}
      {activeTab === "bulk" && <BulkRating />}
    </div>
  );
}

export default RatingDashboard;
