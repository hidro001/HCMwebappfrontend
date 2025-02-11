

import * as React from "react";

function PerformanceChart() {
  const teams = [
    { name: "Developer Team", percentage: "65%", color: "orange-500" },
    { name: "Design Team", percentage: "84%", color: "blue-500" },
    { name: "Marketing Team", percentage: "28%", color: "green-500" },
    { name: "Management Team", percentage: "16%", color: "amber-500" },
  ];

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
          Performance Statistics
        </h2>
        {/* Icon / Options Button */}
        <button
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
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

      {/* Teams & Bars */}
      <div className="flex flex-col space-y-4">
        {teams.map((team, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{team.name}</span>
              <span>{team.percentage}</span>
            </div>
            {/* Progress bar (using the color from the team object) */}
            <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className={`
                  absolute left-0 top-0 h-3 rounded-full bg-${team.color}
                `}
                style={{
                  width: team.percentage,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceChart;





// import  { useEffect, useState } from "react";
// import { getTeamPerformance } from "../../../service/dashboardService";

// function PerformanceChart() {
//   // We'll store an array of { name, percentage, color } here
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // A simple helper to pick a color based on the team name
//   // or the performance value, whichever you prefer.
//   function getColorForTeam(teamName) {
//     switch (teamName) {
//       case "Developer Team":
//         return "orange-500";
//       case "Design Team":
//         return "blue-500";
//       case "Marketing Team":
//         return "green-500";
//       case "Management Team":
//         return "amber-500";
//       default:
//         return "gray-500";
//     }
//   }

//   // On mount, fetch data from the API
//   useEffect(() => {
//     setLoading(true);
//     setErrorMsg("");

//     getTeamPerformance()
//       .then((res) => {
//         if (res.success) {
//           // res.data example:
//           // [
//           //   { team: "Developer Team", performance: 65 },
//           //   { team: "Design Team", performance: 84 },
//           //   ...
//           // ]

//           // Transform each item for your UI: { name, percentage, color }
//           const mappedTeams = res.data.map((item) => ({
//             name: item.team,
//             percentage: `${item.performance}%`, // e.g. "65%"
//             color: getColorForTeam(item.team),
//           }));

//           setTeams(mappedTeams);
//         } else {
//           setErrorMsg(res.message || "Failed to fetch performance stats");
//         }
//       })
//       .catch((err) => {
//         setErrorMsg(err.message || "Network error");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Render states: loading / error / normal UI
//   if (loading) {
//     return (
//       <div className="w-full md:w-1/2 rounded-xl shadow-2xl bg-lime-50 dark:bg-lime-900 bg-opacity-60 p-4">
//         <div className="text-gray-700 dark:text-gray-300">Loading...</div>
//       </div>
//     );
//   }

//   if (errorMsg) {
//     return (
//       <div className="w-full md:w-1/2 rounded-xl shadow-2xl bg-lime-50 dark:bg-lime-900 bg-opacity-60 p-4">
//         <div className="text-red-500">{errorMsg}</div>
//       </div>
//     );
//   }

//   // Now render the chart with the data from the server
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
//             <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
//               <div
//                 className={`absolute left-0 top-0 h-3 rounded-full bg-${team.color}`}
//                 style={{
//                   width: team.percentage,
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PerformanceChart;
