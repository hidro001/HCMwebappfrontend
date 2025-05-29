import React, { useEffect } from "react";
import useUsageStatsStore from "../../../store/useUsageStore";

const OrgUsageSection = ({ department, designation }) => {
  const {
    orgMostUsedStats,
    fetchOrgMostUsedStats,
    loading,
  } = useUsageStatsStore();

  useEffect(() => {
    fetchOrgMostUsedStats(department, designation, 5);
  }, [department, designation, fetchOrgMostUsedStats]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Organization-wide Usage</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <h3 className="text-lg font-medium mb-2">Most Used Apps</h3>
          <ul>
            {orgMostUsedStats.topApps.map((app, index) => (
              <li key={index}>
                {app.appName}: {app.minutes} mins
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Most Visited Websites</h3>
          <ul>
            {orgMostUsedStats.topWebsites.map((website, index) => (
              <li key={index}>
                {website.url}: {website.minutes} mins
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrgUsageSection;
