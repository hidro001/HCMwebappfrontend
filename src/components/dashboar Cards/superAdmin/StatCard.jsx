
import React from "react";

function StatCard({ 
  icon, 
  count, 
  label, 
  chartLight, 
  chartDark,    // <-- We’ll accept two image URLs
  onClickDetail 
}) {
  return (
    <div
      className="
        relative
        flex flex-col
        w-full max-w-lg
        p-4
        rounded-xl
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        shadow-2xl
        overflow-hidden
      "
    >
      {/* Top Right Button */}
      {/* <div className="flex justify-end mb-2">
        <button
          className="
            flex items-center gap-1
            text-sm font-semibold
            text-gray-400 hover:text-gray-600
            dark:text-gray-300 dark:hover:text-gray-100
          "
          onClick={onClickDetail}
        >
          <span>See Detail</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      </div> */}

      {/* Icon + Stats */}
      <div className="flex flex-col gap-2">
        {/* Icon in a circular background */}
        <div className="flex items-center">
          <div
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-gray-100 dark:bg-gray-700
            "
          >
            {icon}
          </div>
        </div>

        {/* Count / Label */}
        <div className="mt-1">
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {count}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            {label}
          </div>
        </div>
      </div>

      {/* Wave / Chart Images */}
      {/* Light-mode image: shown in light mode, hidden in dark mode */}
      <img
        src={chartLight}
        alt={`${label} trend chart (light)`}
        className="block dark:hidden w-full h-auto"
        loading="lazy"
      />
      
      {/* Dark-mode image: hidden in light mode, shown in dark mode */}
      <img
        src={chartDark}
        alt={`${label} trend chart (dark)`}
        className="hidden dark:block w-full h-auto"
        loading="lazy"
      />
    </div>
  );
}

export default StatCard;
