// import React from 'react';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';

// // Register the Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function DemographicAgeGender() {
//   // ===== GENDER DONUT CHART DATA =====
//   const totalUsers = 1000;
//   const maleCount = 600;
//   const femaleCount = 300;
//   const otherCount = totalUsers - maleCount - femaleCount; // 100

//   const genderLabels = ['Male', 'Female', 'Other'];
//   const genderValues = [maleCount, femaleCount, otherCount];

//   const genderData = {
//     labels: genderLabels,
//     datasets: [
//       {
//         label: 'Gender Distribution',
//         data: genderValues,
//         backgroundColor: ['#0EA5E9', '#60A5FA', '#93C5FD'], // sky-500, sky-400, sky-200
//         hoverOffset: 4,
//       },
//     ],
//   };

//   const genderOptions = {
//     plugins: {
//       legend: {
//         display: false, // Hide default legend; we build our own
//       },
//     },
//     cutout: '70%',
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   // Compute custom legend data
//   const genderSum = genderValues.reduce((a, b) => a + b, 0);
//   const genderLegend = genderLabels.map((label, i) => {
//     const count = genderValues[i];
//     const pct = ((count / genderSum) * 100).toFixed(1);
//     return {
//       label,
//       count,
//       pct,
//       color: genderData.datasets[0].backgroundColor[i],
//     };
//   });

//   // ===== AGE SEGMENTED BAR DATA =====
//   const ageDistribution = [
//     { range: 'Below 18', count: 150, color: '#EF4444' },
//     { range: '18 - 30', count: 450, color: '#F59E0B' },
//     { range: '31 - 40', count: 250, color: '#10B981' },
//     { range: '41 - 50', count: 100, color: '#3B82F6' },
//     { range: '51 and above', count: 50, color: '#8B5CF6' },
//   ];

//   const ageTotal = ageDistribution.reduce((acc, item) => acc + item.count, 0);
//   const ageDistributionWithPct = ageDistribution.map((item) => {
//     const pct = ((item.count / ageTotal) * 100).toFixed(1);
//     return { ...item, pct };
//   });

//   return (
//     <div className="flex flex-col w-full  rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-4 ">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           {/* Dummy icon */}
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
//             alt="Demographic Icon"
//             className="h-8 w-8 object-contain"
//           />
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//             Demographic (Age, Gender)
//           </h2>
//         </div>
        
//       </div>

//       {/* Donut Chart (Gender) */}
//       <div className="relative flex flex-col items-center h-48">
//         <Doughnut data={genderData} options={genderOptions} />
//         {/* Center text overlay */}
//         <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2">
//           <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
//             {totalUsers}
//           </span>
//           <span className="text-sm text-gray-500 dark:text-gray-300">
//             Employees
//           </span>
//         </div>
//       </div>

//       {/* Gender Custom Legend */}
//       <div className="mt-2 flex flex-wrap gap-2 justify-center">
//         {genderLegend.map((item, i) => (
//           <div
//             key={i}
//             className="flex items-center gap-2 rounded-full px-2 py-1 bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-sm"
//           >
//             <span
//               className="w-3 h-3 inline-block rounded-full"
//               style={{ backgroundColor: item.color }}
//             />
//             <span className="text-gray-700 dark:text-gray-200">
//               {item.label} ({item.pct}%)
//             </span>
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

//         {/* Segmented Bar */}
//         <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
//           {ageDistributionWithPct.map((item, idx) => (
//             <div
//               key={idx}
//               style={{
//                 width: `${item.pct}%`,
//                 backgroundColor: item.color,
//               }}
//             />
//           ))}
//         </div>

//         {/* Legend & Counts */}
//         <div className="flex  md:flex-row justify-between gap-4 ">
//           {/* Legend with labels */}
//           <div>
//             {ageDistributionWithPct.map((item, idx) => (
//               <div key={idx} className="flex items-center gap-2 mb-3 last:mb-0">
//                 <span
//                   className="w-3 h-3 rounded-full"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <span className="text-gray-700 dark:text-gray-200 text-sm">
//                   {item.range}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Counts & Percentages */}
//           <div className="flex gap-6 ">
//             {/* Column of counts */}
//             <div className="flex flex-col gap-3">
//               {ageDistributionWithPct.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
//                 >
//                   {item.count}
//                 </div>
//               ))}
//             </div>
//             {/* Column of percentages */}
//             <div className="flex flex-col gap-3">
//               {ageDistributionWithPct.map((item, idx) => (
//                 <div
//                   key={idx}
//                   className="text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-800 rounded-full w-10 flex items-center justify-center text-sm font-semibold"
//                 >
//                   {item.pct}%
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useDemographicsStore from '../../../store/analytics dashboards cards/useDemographicsStore'; // adjust path

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DemographicAgeGender() {
  // 1) Get store data and the fetch action
  const { demographicsData, loading, error, fetchDemographics } =
    useDemographicsStore();

  // 2) On mount, fetch the data from the API
  useEffect(() => {
    fetchDemographics();
  }, [fetchDemographics]);

  // 3) Handle loading or error states
  if (loading) return <div>Loading demographics...</div>;
  if (error) return <div>Error: {error}</div>;

  // 4) If there's no data yet, you might return null or a fallback
  if (!demographicsData) return null;

  // Extract data from store
  const { totalUsers, maleCount, femaleCount, otherCount, ageDistribution } =
    demographicsData;

  // ====== GENDER ======
  const genderLabels = ['Male', 'Female', 'Other'];
  const genderValues = [maleCount, femaleCount, otherCount];
  const genderData = {
    labels: genderLabels,
    datasets: [
      {
        label: 'Gender Distribution',
        data: genderValues,
        backgroundColor: ['#0EA5E9', '#60A5FA', '#93C5FD'],
        hoverOffset: 4,
      },
    ],
  };
  const genderSum = genderValues.reduce((a, b) => a + b, 0);

  // Construct legend
  const genderLegend = genderLabels.map((label, i) => {
    const count = genderValues[i];
    const pct = genderSum ? ((count / genderSum) * 100).toFixed(1) : 0;
    return {
      label,
      count,
      pct,
      color: genderData.datasets[0].backgroundColor[i],
    };
  });

  const genderOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  // ====== AGE DISTRIBUTION ======
  // ageDistribution = { below18, between18_30, between31_40, between41_50, above51 }
  // Build a suitable array for your segmented bar
  const ageArray = [
    { range: 'Below 18', count: ageDistribution.below18, color: '#EF4444' },
    { range: '18 - 30', count: ageDistribution.between18_30, color: '#F59E0B' },
    { range: '31 - 40', count: ageDistribution.between31_40, color: '#10B981' },
    { range: '41 - 50', count: ageDistribution.between41_50, color: '#3B82F6' },
    { range: '51 and above', count: ageDistribution.above51, color: '#8B5CF6' },
  ];

  const ageTotal = ageArray.reduce((acc, item) => acc + item.count, 0);
  const ageDistributionWithPct = ageArray.map((item) => {
    const pct = ageTotal ? ((item.count / ageTotal) * 100).toFixed(1) : 0;
    return { ...item, pct };
  });

  // Render your chart
  return (
    <div className="flex flex-col w-full rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
            alt="Demographic Icon"
            className="h-8 w-8 object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Demographic (Age, Gender)
          </h2>
        </div>
      </div>

      {/* Donut Chart (Gender) */}
      <div className="relative flex flex-col items-center h-48">
        <Doughnut data={genderData} options={genderOptions} />
        {/* Center text overlay */}
        <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2">
          <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
            {totalUsers}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Employees
          </span>
        </div>
      </div>

      {/* Gender Custom Legend */}
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {genderLegend.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full px-2 py-1 bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-sm"
          >
            <span
              className="w-3 h-3 inline-block rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 dark:text-gray-200">
              {item.label} ({item.pct}%)
            </span>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

      {/* Age Distribution */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Employee Age Distribution
        </h3>

        {/* Segmented Bar */}
        <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          {ageDistributionWithPct.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: `${item.pct}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>

        {/* Legend & Counts */}
        <div className="flex md:flex-row justify-between gap-4">
          {/* Legend with labels */}
          <div>
            {ageDistributionWithPct.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 mb-3 last:mb-0"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 dark:text-gray-200 text-sm">
                  {item.range}
                </span>
              </div>
            ))}
          </div>

          {/* Counts & Percentages */}
          <div className="flex gap-6">
            {/* Column of counts */}
            <div className="flex flex-col gap-3">
              {ageDistributionWithPct.map((item, idx) => (
                <div
                  key={idx}
                  className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
                >
                  {item.count}
                </div>
              ))}
            </div>
            {/* Column of percentages */}
            <div className="flex flex-col gap-3">
              {ageDistributionWithPct.map((item, idx) => (
                <div
                  key={idx}
                  className="text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-800 rounded-full w-10 flex items-center justify-center text-sm font-semibold"
                >
                  {item.pct}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
