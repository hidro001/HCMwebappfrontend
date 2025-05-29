// import  { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const { dailyStats, fetchDailyStats, loading, error } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date);
//   }, [empID, date, fetchDailyStats]);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center">No data available.</p>;

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

//       <div className="mt-4 grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="font-semibold">Apps Used</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i}>
//                 {app.appName}: {app.minutesUsed} min
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold">Websites Visited</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i}>
//                 {site.url}: {site.minutesVisited} min
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//   } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//   }, [empID, date, fetchDailyStats, fetchDeptCategories]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
//     const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   if (loading) return <p className="text-center">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center">No data available.</p>;

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

//       <div className="my-4 grid grid-cols-2 gap-4">
//         <div className="p-4 rounded bg-green-100">
//           <h3 className="font-semibold text-green-800">Productive Time</h3>
//           <p className="text-2xl">{productiveTime} min</p>
//         </div>
//         <div className="p-4 rounded bg-red-100">
//           <h3 className="font-semibold text-red-800">Unproductive Time</h3>
//           <p className="text-2xl">{unproductiveTime} min</p>
//         </div>
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-4">
//         <div>
//           <h3 className="font-semibold">Apps Used</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i}>
//                 {app.appName}: {app.minutesUsed} min
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-semibold">Websites Visited</h3>
//           <ul className="list-disc pl-4">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i}>
//                 {site.url}: {site.minutesVisited} min
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import useUsageStatsStore from '../../store/useUsageStore';

// export default function EmployeeDailyStats() {
//   const { empID, date } = useParams();
//   const {
//     dailyStats,
//     fetchDailyStats,
//     fetchDeptCategories,
//     deptCategories,
//     loading,
//     error,
//   } = useUsageStatsStore();

//   useEffect(() => {
//     fetchDailyStats(empID, date).then((data) => {
//       if (data?.department) {
//         fetchDeptCategories(data.department);
//       }
//     });
//   }, [empID, date, fetchDailyStats, fetchDeptCategories]);

//   const { productiveTime, unproductiveTime } = useMemo(() => {
//     if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

//     const prodSet = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
//     const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));

//     let productiveTime = 0;
//     let unproductiveTime = 0;

//     dailyStats.appsUsed.forEach((app) => {
//       const appName = app.appName.toLowerCase();
//       if (prodSet.has(appName)) productiveTime += app.minutesUsed;
//       else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
//     });

//     dailyStats.websitesVisited.forEach((site) => {
//       const url = site.url.toLowerCase();
//       if (prodSet.has(url)) productiveTime += site.minutesVisited;
//       else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
//     });

//     return { productiveTime, unproductiveTime };
//   }, [dailyStats, deptCategories]);

//   if (loading) return <p className="text-center py-6 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center py-6 text-red-500">{error}</p>;
//   if (!dailyStats) return <p className="text-center py-6 text-gray-500">No data available.</p>;

//   return (
//     <div className="p-6 sm:p-10 bg-gray-50 min-h-screen space-y-8">
//       <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
//         <h2 className="text-2xl font-bold">Usage Stats for {date}</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-green-100 p-6 rounded-lg shadow">
//           <h3 className="font-semibold text-green-800 mb-2">Productive Time</h3>
//           <p className="text-3xl font-bold text-green-700">{productiveTime} mins</p>
//         </div>
//         <div className="bg-red-100 p-6 rounded-lg shadow">
//           <h3 className="font-semibold text-red-800 mb-2">Unproductive Time</h3>
//           <p className="text-3xl font-bold text-red-700">{unproductiveTime} mins</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Apps Used</h3>
//           <ul className="space-y-2">
//             {dailyStats.appsUsed.map((app, i) => (
//               <li key={i} className="text-gray-600">
//                 <span className="font-medium">{app.appName}</span>
//                 <span className="ml-2 text-sm font-semibold text-gray-500">– {app.minutesUsed} mins</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Websites Visited</h3>
//           <ul className="space-y-2">
//             {dailyStats.websitesVisited.map((site, i) => (
//               <li key={i} className="text-gray-600">
//                 <span className="font-medium">{site.url}</span>
//                 <span className="ml-2 text-sm font-semibold text-gray-500">– {site.minutesVisited} mins</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useUsageStatsStore from "../../store/useUsageStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore"; // adjust path if needed

export default function EmployeeDailyStats() {
  const { attendanceData } = useFullAttendanceStore();
  const { empID, date } = useParams();
  const {
    dailyStats,
    fetchDailyStats,
    fetchDeptCategories,
    deptCategories,
    loading,
    error,
    timeline,
    fetchTimeline,
  } = useUsageStatsStore();

  const attendanceRecord = useMemo(() => {
    return attendanceData.find((rec) => rec.date === date);
  }, [attendanceData, date]);

  useEffect(() => {
    fetchDailyStats(empID, date).then((data) => {
      if (data?.department) {
        fetchDeptCategories(data.department);
      }
    });
    fetchTimeline(empID, date); // <-- add this
  }, [empID, date, fetchDailyStats, fetchDeptCategories, fetchTimeline]);

  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!dailyStats || !deptCategories)
      return { productiveTime: 0, unproductiveTime: 0 };

    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );

    let productiveTime = 0;
    let unproductiveTime = 0;

    dailyStats.appsUsed.forEach((app) => {
      const appName = app.appName.toLowerCase();
      if (prodSet.has(appName)) productiveTime += app.minutesUsed;
      else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
    });

    dailyStats.websitesVisited.forEach((site) => {
      const url = site.url.toLowerCase();
      if (prodSet.has(url)) productiveTime += site.minutesVisited;
      else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
    });

    return { productiveTime, unproductiveTime };
  }, [dailyStats, deptCategories]);

  const combinedTimeline = useMemo(() => {
    const baseTimeline = (timeline || []).map((item, idx) => ({
      startTime: item.startTime,
      endTime: item.endTime,
      name: item.name,
      type: item.type || "app",
      duration:
        item.duration ||
        Math.round(
          (new Date(`2000-01-01T${item.endTime}`) -
            new Date(`2000-01-01T${item.startTime}`)) /
            60000
        ),
      id: `activity-${idx}-${item.startTime}`,
    }));

    const breaksTimeline = (attendanceRecord?.breaks || [])
      .filter((br) => {
        const breakDate = new Date(br.start).toISOString().split("T")[0];
        return breakDate === date;
      })
      .map((br, idx) => {
        const start = new Date(br.start);
        let end = new Date(br.end);
        if (end <= start) end.setDate(end.getDate() + 1);

        const duration = Math.round((end - start) / 60000);
        return {
          startTime: start.toTimeString().slice(0, 5),
          endTime: end.toTimeString().slice(0, 5),
          name: "Break",
          type: "break",
          duration: duration > 0 ? duration : 0,
          id: `break-${idx}-${start.getTime()}`,
        };
      });

    // Combine apps/websites and breaks
    return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
      const aDate = new Date(`2000-01-01T${a.startTime}`);
      const bDate = new Date(`2000-01-01T${b.startTime}`);
      return aDate - bDate;
    });
  }, [timeline, attendanceRecord, date]);

  if (loading)
    return (
      <p className="text-center py-6 text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center py-6 text-red-500 dark:text-red-400">{error}</p>
    );
  if (!dailyStats)
    return (
      <p className="text-center py-6 text-gray-500 dark:text-gray-400">
        No data available.
      </p>
    );

  return (
    <div className="p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white dark:text-gray-200">
        <h2 className="text-2xl font-bold">Usage Stats for {date}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Productive Time
          </h3>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300">
            {productiveTime} mins
          </p>
        </div>
        <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
            Unproductive Time
          </h3>
          <p className="text-3xl font-bold text-red-700 dark:text-red-300">
            {unproductiveTime} mins
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-4">
            Apps Used
          </h3>
          <ul className="space-y-2">
            {dailyStats.appsUsed.map((app, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">{app.appName}</span>
                <span className="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  – {app.minutesUsed} mins
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 border-b pb-2 mb-4">
            Websites Visited
          </h3>
          <ul className="space-y-2">
            {dailyStats.websitesVisited.map((site, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">{site.url}</span>
                <span className="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  – {site.minutesVisited} mins
                </span>
              </li>
            ))}
          </ul>
        </div>
        {combinedTimeline.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 col-span-1 md:col-span-2 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-2xl font-[Inter]">
                Activity Timeline
                <span className="ml-3 text-blue-500 text-xl">⌚</span>
              </h3>
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-emerald-500"></div>
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-red-400 to-pink-500"></div>
              </div>
            </div>

            <div className="relative pl-4">
              {/* Glowing timeline track */}
              <div className="absolute left-[46px] top-0 w-1 h-full bg-gradient-to-b from-blue-200/50 via-purple-200/50 to-pink-200/50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-700 rounded-full opacity-30 animate-pulse"></div>
              </div>

              <div className="space-y-8">
                {combinedTimeline.map((block, idx) => {
                  const isBreak = block.type === "break";
                  const isProductive = block.type === "productive";
                  const start24h = new Date(
                    `2000-01-01 ${block.startTime}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                  const end24h = new Date(
                    `2000-01-01 ${block.endTime}`
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });

                  return (
                    <div key={idx} className="relative flex group">
                      {/* Animated time marker */}
                      <div className="absolute left-[34px] transform -translate-x-1/2 z-20">
                        <div
                          className={`relative w-14 h-14 flex items-center justify-center 
                  ${
                    isBreak ? "hover:scale-110" : "hover:scale-105"
                  } transition-transform`}
                        >
                          {/* Outer glow */}
                          <div
                            className={`absolute inset-0 rounded-full opacity-30 animate-pulse 
                    ${
                      isBreak
                        ? "bg-red-500"
                        : isProductive
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                          ></div>

                          {/* Main circle */}
                          <div
                            className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg
                    ${
                      isBreak
                        ? "bg-gradient-to-br from-red-400 to-pink-500"
                        : isProductive
                        ? "bg-gradient-to-br from-green-400 to-emerald-500"
                        : "bg-gradient-to-br from-blue-400 to-purple-500"
                    }`}
                          >
                            <span className="text-xs font-bold text-white tracking-tighter">
                              {start24h}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content card with dynamic gradient */}
                      <div className="ml-28 flex-1 relative min-h-[100px]">
                        {/* Card arrow */}
                        <div
                          className={`absolute left-[-8px] top-6 w-4 h-4 rotate-45 
                  ${
                    isBreak
                      ? "bg-red-100 dark:bg-red-900"
                      : isProductive
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-blue-100 dark:bg-blue-900"
                  }`}
                        ></div>

                        <div
                          className={`h-full p-6 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl
                  ${
                    isBreak
                      ? "bg-gradient-to-br from-red-50/80 to-pink-50/80 dark:from-red-900/30 dark:to-pink-900/20"
                      : isProductive
                      ? "bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/30 dark:to-emerald-900/20"
                      : "bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/20"
                  }
                   border ${
                     isBreak
                       ? "border-red-100"
                       : isProductive
                       ? "border-green-100"
                       : "border-blue-100"
                   }
                   dark:border-gray-700/30 backdrop-blur-sm`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-3">
                                <h4
                                  className={`font-bold text-lg tracking-tight ${
                                    isBreak
                                      ? "text-red-600 dark:text-red-300"
                                      : isProductive
                                      ? "text-emerald-600 dark:text-emerald-300"
                                      : "text-blue-600 dark:text-blue-300"
                                  }`}
                                >
                                  {block.name}
                                </h4>
                                <span
                                  className={`text-xs font-semibold px-2 py-1 rounded-full 
                          ${
                            isBreak
                              ? "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-200"
                              : isProductive
                              ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-200"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-200"
                          }`}
                                >
                                  {block.type.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">
                                <span className="bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-md">
                                  {start24h} – {end24h}
                                </span>
                              </p>
                            </div>
                            {block.duration && (
                              <div
                                className={`text-xs font-bold px-3 py-1 rounded-full shadow-inner 
                        ${
                          isBreak
                            ? "bg-red-200/50 text-red-800 dark:bg-red-700/30 dark:text-red-200"
                            : isProductive
                            ? "bg-green-200/50 text-green-800 dark:bg-green-700/30 dark:text-green-200"
                            : "bg-blue-200/50 text-blue-800 dark:bg-blue-700/30 dark:text-blue-200"
                        }`}
                              >
                                {block.duration}m
                              </div>
                            )}
                          </div>
                          {block.details && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              {block.details}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total entries: {combinedTimeline.length}
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Filter
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
