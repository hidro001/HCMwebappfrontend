// import * as React from "react";

// function DemographicCard() {
//   const genderData = [
//     { label: "Male (68%)", color: "sky-500" },
//     { label: "Female (38%)", color: "sky-400" },
//     { label: "Other (12%)", color: "sky-200" }
//   ];

//   const ageData = [
//     { label: "< 15 ", color: "pink-500", count: "21K", percentage: "27%" },
//     { label: "20 - 35 ", color: "sky-500", count: "64K", percentage: "40%" },
//     { label: "40 - 50 ", color: "emerald-400", count: "18K", percentage: "16%" },
//     { label: "> 50 ", color: "violet-600", count: "5K", percentage: "8%" }
//   ];

//   return (
//     <div className="flex flex-col pt-4 pb-6 w-full bg-white rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] ">
//       <div className="flex gap-4 self-center max-w-full text-2xl font-bold text-gray-800 ">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//           alt=""
//           className="object-contain shrink-0 aspect-square w-[34px]"
//         />
//         <div className=" my-auto ">Employee Demographic</div>
//       </div>
//       <div className="shrink-0 mt-4 h-px border border-solid border-zinc-300" />
//       <div className="flex flex-col self-end mt-5 mr-6 max-w-full w-[269px] max-md:mr-2.5">
//         <button className="flex flex-col justify-center self-end px-3.5 py-2.5 max-w-full text-sm text-sky-500 bg-violet-50 rounded-md w-[105px]">
//           <div className="gap-3 self-stretch">View Report</div>
//         </button>
     

//         <div className="flex relative flex-col px-7 py-16 mt-6 max-w-full text-lg font-bold text-center text-gray-800 aspect-square w-[168px] max-md:px-5">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//             alt="Demographic pie chart"
//             className="object-cover absolute inset-0 size-full"
//           />
//           438k
//           <br />
//           <span className="text-sm">audience</span>
//         </div>
//       </div>
//       <div className="flex gap-1.5 mx-5 mt-7 text-sm text-black max-md:mx-2.5">
//         {genderData.map((item, index) => (
//           <div key={index} className="flex flex-1 gap-2 px-2.5 py-1 rounded-lg border border-solid border-black border-opacity-10">
//             <div className={`flex shrink-0 my-auto w-3 h-3 bg-${item.color} rounded-3xl`} />
//             <div>{item.label}</div>
//           </div>
//         ))}
//       </div>
//       <div className="shrink-0 mt-3 h-px border border-solid border-zinc-300" />
//       <div className="flex flex-col px-7 mt-5 w-full max-md:px-5">
//         <div className="self-start text-lg font-bold text-gray-800">
//           Employee Age Distribution
//         </div>
//         <div className="flex mt-3.5">
//           {ageData.map((item, index) => (
//             <div
//               key={index}
//               className={`flex shrink-0 h-2.5 bg-${item.color} border border-white border-solid ${index === 0 || index === 3 ? 'rounded-none' : ''} ${
//                 index === 1 ? 'w-[175px]' : index === 2 ? 'w-20' : index === 3 ? 'w-[37px]' : 'w-[51px]'
//               }`}
//             />
//           ))}
//         </div>
//         <div className="flex gap-5 justify-between mt-5">
//           <div className="flex flex-col my-auto text-base text-gray-800">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-3 mt-7 first:mt-0">
//                 <div className={`flex shrink-0 self-start mt-1.5 w-3 h-3 bg-${item.color} rounded-3xl`} />
//                 <div className="grow shrink basis-auto">{item.label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col font-bold whitespace-nowrap">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-5 justify-between mt-4 first:mt-0">
//                 <div className="my-auto text-base text-right text-gray-800">
//                   {item.count}
//                 </div>
//                 <div className={`px-1.5 w-8 h-8 text-xs text-center text-sky-500 bg-sky-100 rounded-full`}>
//                   {item.percentage}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DemographicCard;

// import * as React from "react";

// function DemographicCard() {
//   const genderData = [
//     { label: "Male (68%)", color: "sky-500" },
//     { label: "Female (38%)", color: "sky-400" },
//     { label: "Other (12%)", color: "sky-200" },
//   ];

//   const ageData = [
//     { label: "< 15 ", color: "pink-500", count: "21K", percentage: "27%" },
//     { label: "20 - 35 ", color: "sky-500", count: "64K", percentage: "40%" },
//     { label: "40 - 50 ", color: "emerald-400", count: "18K", percentage: "16%" },
//     { label: "> 50 ", color: "violet-600", count: "5K", percentage: "8%" },
//   ];

//   return (
//     <div className="
//       flex flex-col py-4 w-full 
//       bg-white dark:bg-gray-800 
//       text-gray-800 dark:text-gray-100 
//       rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       {/* Header */}
//       <div className="flex items-center gap-4 px-4 text-2xl font-bold">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
//           alt=""
//           className="object-contain w-8 h-8"
//         />
//         <div className="my-auto">Employee Demographic</div>
//       </div>

//       <div className="mt-4 h-px border border-solid border-zinc-300 dark:border-zinc-600 mx-4" />

//       {/* View Report + Pie Chart */}
//       <div className="flex flex-col items-end mt-5 px-4">
//         <button className="
//           px-3.5 py-2.5 text-sm 
//           text-sky-500 dark:text-sky-300 
//           bg-violet-50 dark:bg-violet-900 
//           rounded-md
//         ">
//           View Report
//         </button>

//         <div className="relative flex flex-col items-center justify-center px-7 py-16 mt-6 text-lg font-bold text-center aspect-square w-full max-w-[168px]">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215"
//             alt="Demographic pie chart"
//             className="object-cover absolute inset-0 w-full h-full"
//           />
//           438k
//           <br />
//           <span className="text-sm">audience</span>
//         </div>
//       </div>

//       {/* Gender Distribution */}
//       <div className="flex gap-1.5 mx-5 mt-7 text-sm text-black dark:text-gray-100">
//         {genderData.map((item, index) => (
//           <div
//             key={index}
//             className="
//               flex flex-1 gap-2 px-2.5 py-1 
//               rounded-lg border border-solid border-black border-opacity-10
//             "
//           >
//             <div className={`w-3 h-3 bg-${item.color} rounded-full my-auto`} />
//             <div>{item.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3 h-px border border-solid border-zinc-300 dark:border-zinc-600 mx-4" />

//       {/* Age Distribution */}
//       <div className="px-7 mt-5 w-full text-gray-800 dark:text-gray-100">
//         <div className="text-lg font-bold">Employee Age Distribution</div>
//         <div className="flex mt-3.5">
//           {ageData.map((item, index) => (
//             <div
//               key={index}
//               className={`
//                 h-2.5 bg-${item.color} border border-white dark:border-gray-900
//                 ${index === 0 || index === 3 ? "" : ""}
//                 ${index === 1 ? "w-[175px]" 
//                   : index === 2 ? "w-20" 
//                   : index === 3 ? "w-[37px]" 
//                   : "w-[51px]"}
//               `}
//             />
//           ))}
//         </div>

//         <div className="flex gap-5 justify-between mt-5">
//           <div className="flex flex-col my-auto text-base">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-3 mt-7 first:mt-0">
//                 <div className={`w-3 h-3 bg-${item.color} rounded-full mt-1.5`} />
//                 <div>{item.label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col font-bold text-sm text-slate-800 dark:text-slate-200">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-5 justify-between mt-4 first:mt-0">
//                 <div className="my-auto text-base text-right">{item.count}</div>
//                 <div className="px-1.5 w-8 h-8 text-xs text-sky-500 dark:text-sky-300 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
//                   {item.percentage}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DemographicCard;

// import * as React from "react";

// function DemographicCard() {
//   const genderData = [
//     { label: "Male (68%)", color: "sky-500" },
//     { label: "Female (38%)", color: "sky-400" },
//     { label: "Other (12%)", color: "sky-200" },
//   ];

//   const ageData = [
//     { label: "< 15 ", color: "pink-500", count: "21K", percentage: "27%" },
//     { label: "20 - 35 ", color: "sky-500", count: "64K", percentage: "40%" },
//     { label: "40 - 50 ", color: "emerald-400", count: "18K", percentage: "16%" },
//     { label: "> 50 ", color: "violet-600", count: "5K", percentage: "8%" },
//   ];

//   return (
//     <div
//       className="
//         flex flex-col w-full max-w-sm
//         rounded-xl bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         {/* Left side: Icon + Title */}
//         <div className="flex items-center gap-2">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
//             alt="Demographic Icon"
//             className="h-8 w-8 object-contain"
//           />
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             Employee Demographic
//           </h2>
//         </div>
//         {/* Right side: View Report Button */}
//         <button
//           className="
//             bg-blue-50 dark:bg-blue-900
//             text-blue-600 dark:text-blue-300
//             rounded-md
//             px-3 py-1.5
//             text-sm font-medium
//           "
//         >
//           View Report
//         </button>
//       </div>

//       {/* Donut Chart */}
//       <div className="flex flex-col items-center">
//         <div className="relative mb-4 h-36 w-36">
//           {/* Donut Chart Image */}
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215"
//             alt="Demographic Pie Chart"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//           {/* Center Text */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
//               438k
//             </span>
//             <span className="text-sm text-gray-500 dark:text-gray-300">
//               audience
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Gender Distribution */}
//       <div className="mt-2 flex flex-wrap gap-2 justify-center">
//         {genderData.map((item, index) => (
//           <div
//             key={index}
//             className="
//               flex items-center gap-2
//               rounded-full px-2 py-1
//               bg-gray-50 border border-gray-200
//               dark:bg-gray-700 dark:border-gray-600
//               text-sm
//             "
//           >
//             <span className={`w-3 h-3 inline-block rounded-full bg-${item.color}`} />
//             <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Separator */}
//       <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

//       {/* Age Distribution */}
//       <div>
//         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
//           Employee Age Distribution
//         </h3>

//         {/* Distribution Bar */}
//         <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
//           {/* Each segment of the distribution */}
//           {ageData.map((item, index) => {
//             // For demonstration, we’ll derive widths from item.percentage if you want real dynamic widths
//             // you may parse the number from item.percentage or rely on your logic to compute widths.
//             // Here, we simply do it manually for the sample data:
//             const widths = {
//               "< 15 ": "w-[27%]",
//               "20 - 35 ": "w-[40%]",
//               "40 - 50 ": "w-[16%]",
//               "> 50 ": "w-[8%]",
//             };
//             return (
//               <div
//                 key={index}
//                 className={`
//                   ${widths[item.label] || "w-[10%]"}
//                   bg-${item.color}
//                 `}
//               />
//             );
//           })}
//         </div>

//         {/* Age Distribution Legend & Counts */}
//         <div className="flex flex-col md:flex-row justify-between gap-4 ">
//           {/* Legend */}
//           <div>
//             {ageData.map((item, index) => (
//               <div key={index} className="flex items-center gap-2 mb-3 last:mb-0 ">
//                 <span className={`w-3 h-3 rounded-full bg-${item.color} `} />
//                 <span className="text-gray-700 dark:text-gray-200 text-sm " >
//                   {item.label}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Counts & Percents */}
//           <div className="flex gap-6">
//             <div className="flex flex-col gap-3">
//               {ageData.map((item, index) => (
//                 <div key={index} className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold ">
//                   {item.count}
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col gap-3">
//               {ageData.map((item, index) => (
//                 <div
//                   key={index}
//                   className="
//                     text-blue-600 dark:text-blue-300
//                     bg-blue-50 dark:bg-blue-800
//                     rounded-full w-10  flex items-center justify-center
//                     text-sm font-semibold
                    
//                   "
//                 >
//                   {item.percentage}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DemographicCard;


// src/components/dashboar Cards/superAdmin/DemographicCard.jsx
import  { useEffect } from 'react';
import { useDashboardStore } from '../../../store/useDashboardStore'; // adjust import path as needed


function DemographicCard() {
  const {
    totalUsers,
    maleCount,
    femaleCount,
    ageDistribution,
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Compute “other” for gender
  const otherCount = totalUsers - maleCount - femaleCount;
  const genderSegments = [
    { label: 'Male', count: maleCount },
    { label: 'Female', count: femaleCount },
    { label: 'Other', count: otherCount },
  ];

  // Convert genderSegments -> { label, count, percentage }
  const genderData = genderSegments.map((seg) => {
    const pct = totalUsers ? ((seg.count / totalUsers) * 100).toFixed(1) : 0;
    return { ...seg, percentage: pct };
  });

  // Updated color map to match the new ranges from the API response
  const colorMap = {
    'Below 18 ': 'red-500',
    '18 - 30 ': 'pink-500',
    '31 - 40 ': 'emerald-400',
    '41 - 50 ': 'sky-500',
    '51 - 60 ': 'violet-600',
    '61 - 90 ': 'gray-500',
  };

  // Convert each item in ageDistribution -> the format needed by the UI
  // item => { range, count, percentage: "xx.x%" }
  const ageData = (ageDistribution || []).map((item) => {
    const color = colorMap[item.range] || 'gray-400'; // fallback color
    return {
      label: item.range,
      color,
      count: `${item.count}`,
      percentage: item.percentage,
    };
  });

  return (
    <div
      className="
        flex flex-col w-full max-w-sm
        rounded-xl bg-white dark:bg-gray-800
        shadow-2xl
        p-4
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Left side: Icon + Title */}
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
            alt="Demographic Icon"
            className="h-8 w-8 object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Employee Demographic
          </h2>
        </div>
        {/* Right side: View Report Button */}
        <button
          className="
            bg-blue-50 dark:bg-blue-900
            text-blue-600 dark:text-blue-300
            rounded-md
            px-3 py-1.5
            text-sm font-medium
          "
        >
          View Report
        </button>
      </div>

      {/* Donut Chart (placeholder image + center text) */}
      <div className="flex flex-col items-center">
        <div className="relative mb-4 h-36 w-36">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215"
            alt="Demographic Pie Chart"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
              {totalUsers}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
            Employees
            </span>
          </div>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {genderData.map((item, index) => {
          const colorMapping = {
            Male: 'sky-500',
            Female: 'sky-400',
            Other: 'sky-200',
          };
          const colorClass = colorMapping[item.label] || 'sky-200';
          return (
            <div
              key={index}
              className="
                flex items-center gap-2
                rounded-full px-2 py-1
                bg-gray-50 border border-gray-200
                dark:bg-gray-700 dark:border-gray-600
                text-sm
              "
            >
              <span
                className={`w-3 h-3 inline-block rounded-full bg-${colorClass}`}
              />
              <span className="text-gray-700 dark:text-gray-200">
                {item.label} ({item.percentage}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

      {/* Age Distribution */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Employee Age Distribution
        </h3>

        {/* Distribution Bar */}
        <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          {ageData.map((item, index) => {
            // parse the percentage string -> number
            // e.g. "25.0%" -> 25.0
            const numeric = parseFloat(item.percentage);
            const barWidth = `${numeric}%`;
            return (
              <div
                key={index}
                className={`bg-${item.color}`}
                style={{ width: barWidth }}
              />
            );
          })}
        </div>

        {/* Age Distribution Legend & Counts */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Legend */}
          <div>
            {ageData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-3 last:mb-0"
              >
                <span className={`w-3 h-3 rounded-full bg-${item.color}`} />
                <span className="text-gray-700 dark:text-gray-200 text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Counts & Percents */}
          <div className="flex gap-6">
            {/* Column of counts */}
            <div className="flex flex-col gap-3">
              {ageData.map((item, index) => (
                <div
                  key={index}
                  className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
                >
                  {item.count}
                </div>
              ))}
            </div>
            {/* Column of percentages */}
            <div className="flex flex-col gap-3">
              {ageData.map((item, index) => (
                <div
                  key={index}
                  className="
                    text-blue-600 dark:text-blue-300
                    bg-blue-50 dark:bg-blue-800
                    rounded-full w-10 flex items-center justify-center
                    text-sm font-semibold
                  "
                >
                  {item.percentage}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemographicCard;