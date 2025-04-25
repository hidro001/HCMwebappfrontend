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


import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useUsageStatsStore from '../../store/useUsageStore';

export default function EmployeeDailyStats() {
  const { empID, date } = useParams();
  const {
    dailyStats,
    fetchDailyStats,
    fetchDeptCategories,
    deptCategories,
    loading,
    error,
  } = useUsageStatsStore();

  useEffect(() => {
    fetchDailyStats(empID, date).then((data) => {
      if (data?.department) {
        fetchDeptCategories(data.department);
      }
    });
  }, [empID, date, fetchDailyStats, fetchDeptCategories]);

  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!dailyStats || !deptCategories) return { productiveTime: 0, unproductiveTime: 0 };

    const prodSet = new Set(deptCategories.productive.map((d) => d.name.toLowerCase()));
    const unprodSet = new Set(deptCategories.unproductive.map((d) => d.name.toLowerCase()));

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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!dailyStats) return <p className="text-center">No data available.</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

      <div className="my-4 grid grid-cols-2 gap-4">
        <div className="p-4 rounded bg-green-100">
          <h3 className="font-semibold text-green-800">Productive Time</h3>
          <p className="text-2xl">{productiveTime} min</p>
        </div>
        <div className="p-4 rounded bg-red-100">
          <h3 className="font-semibold text-red-800">Unproductive Time</h3>
          <p className="text-2xl">{unproductiveTime} min</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Apps Used</h3>
          <ul className="list-disc pl-4">
            {dailyStats.appsUsed.map((app, i) => (
              <li key={i}>
                {app.appName}: {app.minutesUsed} min
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Websites Visited</h3>
          <ul className="list-disc pl-4">
            {dailyStats.websitesVisited.map((site, i) => (
              <li key={i}>
                {site.url}: {site.minutesVisited} min
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
