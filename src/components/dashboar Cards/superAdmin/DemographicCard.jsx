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
        {/* <button
          className="
            bg-blue-50 dark:bg-blue-900
            text-blue-600 dark:text-blue-300
            rounded-md
            px-3 py-1.5
            text-sm font-medium
          "
        >
          View Report
        </button> */}
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