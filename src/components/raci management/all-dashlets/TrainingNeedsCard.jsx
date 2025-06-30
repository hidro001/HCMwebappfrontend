// TrainingNeedsAssessmentCard.jsx
import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { FiChevronDown } from "react-icons/fi";
import DetailModal from "./BaseModal"; // ① add
import { useDrilldown } from "./useDrillDown"; // ① add
// Import the zustand store
import useTrainingNeedsStore from "../../../store/analytics dashboards cards/useTrainingNeedsStore"; // adjust path

const TrainingNeedsAssessmentCard = () => {
  // 1) Get relevant states and action from the store
  const { data, loading, error, fetchTrainingNeeds } = useTrainingNeedsStore();
  const drill = useDrilldown();
  // 2) Fetch data on component mount
  useEffect(() => {
    fetchTrainingNeeds();
  }, [fetchTrainingNeeds]);

  const handleCardClick = () => {
    if (drill.open || drill.loading) return; // <- key line
    drill.fetch("training");
  };

  // 3) Handle loading / error states
  if (loading) return <div>Loading Training Needs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // No data yet

  // 4) Extract percentages from the store's data
  const { upToDatePct, needsRefreshPct, needsCertificationPct } = data;
  // Convert string to number if needed
  const upToDateVal = parseFloat(upToDatePct) || 0;
  const needsRefreshVal = parseFloat(needsRefreshPct) || 0;
  const needsCertificationVal = parseFloat(needsCertificationPct) || 0;

  // Build the chart data object
  const chartData = {
    labels: ["Up-to-date", "Needs Refresh", "Needs Certification"],
    datasets: [
      {
        label: "Training Needs Assessment",
        data: [upToDateVal, needsRefreshVal, needsCertificationVal],
        backgroundColor: ["#F59E0B", "#10B981", "#1E3A8A"],
        hoverBackgroundColor: ["#D97706", "#059669", "#1E40AF"],
        borderWidth: 0,
      },
    ],
  };

  // Chart options
  const options = {
    cutout: "70%",
    rotation: -90,
    circumference: 360,
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyColor: "#fff",
        backgroundColor: "#111827",
        titleColor: "#F9FAFB",
        displayColors: false,
      },
    },
  };

  return (
    <div
      className="max-w-xs p-4 rounded-lg shadow-sm
                 bg-white dark:bg-slate-800
                 text-gray-900 dark:text-gray-100"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Training Needs Assessment</h2>
        {/* If you have a dropdown, place it here */}
      </div>

      {/* Donut Chart */}
      <div className="relative flex items-center justify-center">
        <div className="w-48 h-48">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {/* Up-to-date */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#F59E0B" }}
          />
          <span>Up-to-date:</span>
          <span className="font-semibold">{upToDateVal}%</span>
        </div>

        {/* Needs Refresh */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#10B981" }}
          />
          <span>Needs Refresh:</span>
          <span className="font-semibold">{needsRefreshVal}%</span>
        </div>

        {/* Needs Certification */}
        <div className="flex items-center space-x-1">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "#1E3A8A" }}
          />
          <span>Needs Certification:</span>
          <span className="font-semibold">{needsCertificationVal}%</span>
        </div>
      </div>
      <DetailModal
        open={drill.open}
        loading={drill.loading}
        rows={drill.rows}
        onClose={drill.close}
        title="Training Needs Assessment– User List"
      />
    </div>
  );
};

export default TrainingNeedsAssessmentCard;
