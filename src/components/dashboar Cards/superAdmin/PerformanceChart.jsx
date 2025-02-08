// import * as React from "react";

// function PerformanceChart() {
//   const teams = [
//     { name: "Developer Team", percentage: "65%" },
//     { name: "Design Team", percentage: "84%" },
//     { name: "Marketing Team", percentage: "28%" },
//     { name: "Management Team", percentage: "16%" }
//   ];

//   return (
//     <div className="flex overflow-hidden flex-col pt-2.5 pb-11 pl-5 mx-auto w-full rounded-2xl bg-lime-600 bg-opacity-10 shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] max-md:mt-9 max-md:max-w-full">
//       <div className="flex gap-10 items-center ml-4 max-w-full text-xl font-bold tracking-wide text-lime-600 min-h-[37px] w-[346px] max-md:ml-2.5">
//         <div className="self-stretch my-auto">Performance Statistics</div>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/e998b2223b107a48c672826263f2964d3e415027d8af83e5dd90514d5470d6a6?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//           alt=""
//           className="object-contain shrink-0 self-stretch my-auto rounded-xl aspect-[1.17] w-[42px]"
//         />
//       </div>
//       <div className="flex flex-col items-start mt-5">
//         {teams.map((team, index) => (
//           <div key={index} className="flex flex-col justify-between mt-3.5 max-w-full w-[391px]">
//             <div className="flex gap-10 justify-between items-start w-full text-xl font-medium tracking-wide text-slate-800">
//               <div className="w-[157px]">{team.name}</div>
//               <div className="w-[39px]">{team.percentage}</div>
//             </div>
//             <div className="flex flex-col items-start mt-3 max-w-full w-[330px]">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/0918c4fce15f9f431e86107f8fc8f7db260e70c98fcfb02548e8a9bd79f6f792?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//                 alt={`${team.name} performance chart`}
//                 className="object-contain w-full aspect-[38.46]"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PerformanceChart;

// import * as React from "react";

// function PerformanceChart() {
//   const teams = [
//     { name: "Developer Team", percentage: "65%" },
//     { name: "Design Team", percentage: "84%" },
//     { name: "Marketing Team", percentage: "28%" },
//     { name: "Management Team", percentage: "16%" },
//   ];

//   return (
//     <div className="
//       flex flex-col pt-2.5 pb-11 px-5 w-full
//       bg-lime-600 dark:bg-lime-700 bg-opacity-10
//       text-gray-800 dark:text-gray-100
//       rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       {/* Header */}
//       <div className="flex gap-10 items-center text-xl font-bold tracking-wide text-lime-600 dark:text-lime-400 min-h-[37px] w-full">
//         <div>Performance Statistics</div>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/e998b2223b107a48c672826263f2964d3e415027d8af83e5dd90514d5470d6a6"
//           alt=""
//           className="object-contain w-10 h-10 rounded-xl"
//         />
//       </div>

//       {/* Teams Performance */}
//       <div className="flex flex-col mt-5">
//         {teams.map((team, index) => (
//           <div
//             key={index}
//             className="flex flex-col mt-3.5 w-full max-w-md"
//           >
//             <div className="flex gap-10 justify-between text-xl font-medium tracking-wide">
//               <div>{team.name}</div>
//               <div>{team.percentage}</div>
//             </div>
//             <div className="flex flex-col mt-3">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/0918c4fce15f9f431e86107f8fc8f7db260e70c98fcfb02548e8a9bd79f6f792"
//                 alt={`${team.name} performance chart`}
//                 className="object-contain w-full h-auto"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PerformanceChart;

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





import  { useEffect, useState } from "react";
import { getTeamPerformance } from "../../../service/dashboardService";

function PerformanceChart() {
  // We'll store an array of { name, percentage, color } here
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // A simple helper to pick a color based on the team name
  // or the performance value, whichever you prefer.
  function getColorForTeam(teamName) {
    switch (teamName) {
      case "Developer Team":
        return "orange-500";
      case "Design Team":
        return "blue-500";
      case "Marketing Team":
        return "green-500";
      case "Management Team":
        return "amber-500";
      default:
        return "gray-500";
    }
  }

  // On mount, fetch data from the API
  useEffect(() => {
    setLoading(true);
    setErrorMsg("");

    getTeamPerformance()
      .then((res) => {
        if (res.success) {
          // res.data example:
          // [
          //   { team: "Developer Team", performance: 65 },
          //   { team: "Design Team", performance: 84 },
          //   ...
          // ]

          // Transform each item for your UI: { name, percentage, color }
          const mappedTeams = res.data.map((item) => ({
            name: item.team,
            percentage: `${item.performance}%`, // e.g. "65%"
            color: getColorForTeam(item.team),
          }));

          setTeams(mappedTeams);
        } else {
          setErrorMsg(res.message || "Failed to fetch performance stats");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message || "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Render states: loading / error / normal UI
  if (loading) {
    return (
      <div className="w-full md:w-1/2 rounded-xl shadow-2xl bg-lime-50 dark:bg-lime-900 bg-opacity-60 p-4">
        <div className="text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="w-full md:w-1/2 rounded-xl shadow-2xl bg-lime-50 dark:bg-lime-900 bg-opacity-60 p-4">
        <div className="text-red-500">{errorMsg}</div>
      </div>
    );
  }

  // Now render the chart with the data from the server
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
            <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className={`absolute left-0 top-0 h-3 rounded-full bg-${team.color}`}
                style={{
                  width: team.percentage,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceChart;
