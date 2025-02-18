import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DemographicNationalMarital() {
  // ===== Dummy Nationality Data (Donut) =====
  const totalNationality = 438; // e.g. "438K" in the UI
  const nationalityCounts = {
    Indian: 68,
    US: 38,
    Other: 12,
  };

  const nationalityLabels = Object.keys(nationalityCounts); // ["Indian", "US", "Other"]
  const nationalityData = Object.values(nationalityCounts); // [68, 38, 12]

  const donutData = {
    labels: nationalityLabels,
    datasets: [
      {
        label: 'Nationality',
        data: nationalityData,
        backgroundColor: ['#F97316', '#FB923C', '#FED7AA'], // orange-ish shades
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        display: false, // We'll build a custom legend
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  // ===== Marital Distribution (Segmented Bar) =====
  const maritalDistribution = [
    { status: 'Single', count: 210, color: '#EF4444' },
    { status: 'Married', count: 640, color: '#3B82F6' },
    { status: 'Divorced', count: 180, color: '#10B981' },
  ];

  const totalMarital = maritalDistribution.reduce((acc, item) => acc + item.count, 0);

  const maritalDistributionWithPct = maritalDistribution.map((item) => {
    const pct = ((item.count / totalMarital) * 100).toFixed(1);
    return { ...item, percentage: pct };
  });

  return (
    <div className="flex flex-col w-full  rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-4 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {/* Dummy icon */}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
            alt="Demographic Icon"
            className="h-8 w-8 object-contain"
          />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Demographic (Nationality,Marital)
          </h2>
        </div>
        <button className="text-blue-600 text-sm hover:underline">
          View Report
        </button>
      </div>

      {/* Donut Chart */}
      <div className="relative flex flex-col items-center h-48"> 
        <Doughnut data={donutData} options={donutOptions} />
        {/* Center text overlay */}
        <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2">
          <span className="text-xl font-bold text-gray-700 dark:text-gray-100">
            {totalNationality}k
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Nationality
          </span>
        </div>
      </div>

      {/* Nationality Custom Legend */}
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {nationalityLabels.map((label, i) => {
          const val = nationalityData[i];
          const sum = nationalityData.reduce((a, b) => a + b, 0);
          const pct = ((val / sum) * 100).toFixed(1);

          return (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-2 py-1 bg-gray-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-sm"
            >
              <span
                className="w-3 h-3 inline-block rounded-full"
                style={{ backgroundColor: donutData.datasets[0].backgroundColor[i] }}
              />
              <span className="text-gray-700 dark:text-gray-200">
                {label} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="my-4 h-px bg-gray-200 dark:bg-gray-600"></div>

      {/* Marital Distribution */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Employee Marital Status
        </h3>

        {/* Segmented Bar */}
        <div className="mt-4 mb-3 flex h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          {maritalDistributionWithPct.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
            />
          ))}
        </div>

        {/* Legend & Counts */}
        <div className="flex  md:flex-row justify-between gap-4">
          {/* Legend with labels */}
          <div>
            {maritalDistributionWithPct.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-3 last:mb-0">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 dark:text-gray-200 text-sm">
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Counts & Percentages */}
          <div className="flex gap-6">
            {/* Column of counts */}
            <div className="flex flex-col gap-3">
              {maritalDistributionWithPct.map((item, idx) => (
                <div
                  key={idx}
                  className="text-right text-gray-800 dark:text-gray-100 text-sm font-semibold"
                >
                  {item.count}K
                </div>
              ))}
            </div>
            {/* Column of percentages */}
            <div className="flex flex-col gap-3">
              {maritalDistributionWithPct.map((item, idx) => (
                <div
                  key={idx}
                  className="text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-800 rounded-full w-10 flex items-center justify-center text-sm font-semibold"
                >
                  {item.percentage}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
