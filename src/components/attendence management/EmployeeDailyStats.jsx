import  { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUsageStatsStore from '../../store/useUsageStore';

export default function EmployeeDailyStats() {
  const { empID, date } = useParams();
  const { dailyStats, fetchDailyStats, loading, error } = useUsageStatsStore();

  useEffect(() => {
    fetchDailyStats(empID, date);
  }, [empID, date, fetchDailyStats]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!dailyStats) return <p className="text-center">No data available.</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold">Usage Stats for {date}</h2>

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
