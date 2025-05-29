import React, { useEffect, useState } from "react";
import useUsageStatsStore from "../../../store/useUsageStore";
import { fetchDepartments, fetchDesignations } from "../../../service/employeeService";

const OrgUsageSection = () => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const { orgMostUsedStats, fetchOrgMostUsedStats, loading } = useUsageStatsStore();

  useEffect(() => {
    const fetchFilters = async () => {
      const fetchedDepartments = await fetchDepartments();
      const fetchedDesignations = await fetchDesignations();

      setDepartments(fetchedDepartments);
      setDesignations(fetchedDesignations);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    fetchOrgMostUsedStats(department, designation, 5);
  }, [department, designation, fetchOrgMostUsedStats]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Organization-wide Usage</h2>

      <div className="mb-4 flex gap-4">
        <select
          className="p-2 border rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.department}>
              {dept.department}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">All Designations</option>
          {designations.map((desig) => (
            <option key={desig._id} value={desig.designation}>
              {desig.designation}
            </option>
          ))}
        </select>
      </div>

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

          <h3 className="text-lg font-medium mt-4 mb-2">
            Most Visited Websites
          </h3>
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
