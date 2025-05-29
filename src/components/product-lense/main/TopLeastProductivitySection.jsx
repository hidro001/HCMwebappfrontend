import React, { useEffect, useState } from 'react';
import useUsageStatsStore from '../../../store/useUsageStore';
import { fetchDesignations, fetchDepartments } from '../../../service/employeeService';

const TopLeastProductivitySection = () => {
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const { topLeastProductivity, fetchTopLeastProductiveEmployees, loading } = useUsageStatsStore();

  useEffect(() => {
    fetchTopLeastProductiveEmployees(department, designation);
  }, [department, designation, fetchTopLeastProductiveEmployees]);

  useEffect(() => {
    fetchDepartments().then(setDepartments);
    fetchDesignations().then(setDesignations);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold text-xl mb-4">Top & Least Productive Employees</h2>

      <div className="mb-4 flex gap-4">
        <select className="p-2 border rounded" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.department}>{dept.department}</option>
          ))}
        </select>

        <select className="p-2 border rounded" value={designation} onChange={(e) => setDesignation(e.target.value)}>
          <option value="">All Designations</option>
          {designations.map((desig) => (
            <option key={desig._id} value={desig.designation}>{desig.designation}</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <h3 className="font-medium mb-2">Top Productive Employees</h3>
          <table className="w-full text-sm mb-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1">Employee</th>
                <th className="px-2 py-1">Working Hours</th>
                <th className="px-2 py-1">Break Time</th>
              </tr>
            </thead>
            <tbody>
              {topLeastProductivity.topProductive.map(emp => (
                <tr key={emp.employeeId}>
                  <td className="px-2 py-1">{emp.name}</td>
                  <td className="px-2 py-1">{(emp.avgWorkingMinutes / 60).toFixed(1)} hrs</td>
                  <td className="px-2 py-1">{(emp.avgBreakMinutes / 60).toFixed(1)} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-medium mb-2">Least Productive Employees</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1">Employee</th>
                <th className="px-2 py-1">Working Hours</th>
                <th className="px-2 py-1">Break Time</th>
              </tr>
            </thead>
            <tbody>
              {topLeastProductivity.leastProductive.map(emp => (
                <tr key={emp.employeeId}>
                  <td className="px-2 py-1">{emp.name}</td>
                  <td className="px-2 py-1">{(emp.avgWorkingMinutes / 60).toFixed(1)} hrs</td>
                  <td className="px-2 py-1">{(emp.avgBreakMinutes / 60).toFixed(1)} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TopLeastProductivitySection;