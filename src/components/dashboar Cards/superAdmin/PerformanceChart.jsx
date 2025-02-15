

// import * as React from "react";

// function PerformanceChart() {
//   const teams = [
//     { name: "Developer Team", percentage: "65%", color: "orange-500" },
//     { name: "Design Team", percentage: "84%", color: "blue-500" },
//     { name: "Marketing Team", percentage: "28%", color: "green-500" },
//     { name: "Management Team", percentage: "16%", color: "amber-500" },
//   ];

//   return (
//     <div
//       className="
//         w-full md:w-1/2
//         rounded-xl
//         shadow-2xl
//         bg-lime-50 dark:bg-lime-900
//         bg-opacity-60
//         p-4
//         text-gray-800 dark:text-gray-100
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-base sm:text-lg font-semibold text-lime-600 dark:text-lime-400">
//           Performance Statistics
//         </h2>
//         {/* Icon / Options Button */}
//         <button
//           className="
//             text-gray-400 hover:text-gray-600
//             dark:text-gray-300 dark:hover:text-gray-100
//           "
//           aria-label="Performance options"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 sm:h-6 sm:w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <circle cx="5" cy="12" r="1"></circle>
//             <circle cx="12" cy="12" r="1"></circle>
//             <circle cx="19" cy="12" r="1"></circle>
//           </svg>
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

//       {/* Teams & Bars */}
//       <div className="flex flex-col space-y-4">
//         {teams.map((team, index) => (
//           <div key={index}>
//             <div className="flex justify-between text-sm font-medium mb-1">
//               <span>{team.name}</span>
//               <span>{team.percentage}</span>
//             </div>
//             {/* Progress bar (using the color from the team object) */}
//             <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
//               <div
//                 className={`
//                   absolute left-0 top-0 h-3 rounded-full bg-${team.color}
//                 `}
//                 style={{
//                   width: team.percentage,
//                 }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PerformanceChart;


import React, { useEffect } from "react";
import { useDashboardStore } from "../../../store/useDashboardStore";

function PerformanceChart() {
  const { topDesignations, fetchTopDesignations } = useDashboardStore();

  // Fetch top designations when the component mounts.
  useEffect(() => {
    // Change the month/year as needed.
    fetchTopDesignations(1, 2025);
  }, [fetchTopDesignations]);

  // Default colors to cycle through.
  const defaultColors = ["orange-500", "blue-500", "green-500", "amber-500"];

  return (
    <div
      className="
        w-full md:w-1/2
        rounded-xl
        shadow-2xl
        bg-lime-50 dark:bg-lime-900
        bg-opacity-60
        p-4
        text-gray-800 dark:text-gray-100
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-semibold text-lime-600 dark:text-lime-400">
          Top Rated Designations
        </h2>
        {/* Icon / Options Button */}
        {/* <button
          className="
            text-gray-400 hover:text-gray-600
            dark:text-gray-300 dark:hover:text-gray-100
          "
          aria-label="Performance options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="5" cy="12" r="1"></circle>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
          </svg>
        </button> */}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

      {/* Designations & Bars */}
      <div className="flex flex-col space-y-4">
        {topDesignations && topDesignations.length > 0 ? (
          topDesignations.map((item, index) => {
            // Convert average rating (assumed out of 5) to percentage.
            const percentage = `${(item.averageRating / 5) * 100}%`;
            const color = defaultColors[index % defaultColors.length];

            return (
              <div key={item.designation}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{item.designation}</span>
                  <span>
                    {item.averageRating} ({item.totalRatings} ratings)
                  </span>
                </div>
                {/* Progress bar */}
                <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className={`absolute left-0 top-0 h-3 rounded-full bg-${color}`}
                    style={{ width: percentage }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No top rated designations found</div>
        )}
      </div>
    </div>
  );
}

export default PerformanceChart;


