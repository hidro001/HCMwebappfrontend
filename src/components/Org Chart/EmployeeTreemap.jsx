


import React, { useEffect } from "react";
import useEmployeeStore from "../../store/orgStore"; 
import OrgChart from "./OrgChart";

const EmployeeTreemap = () => {
  const { nodes, clinks, fetchEmployees, loading } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300 ">
      {loading && (
        <p className="mb-4 text-blue-600 dark:text-blue-300 font-semibold">
          Loading employees...
        </p>
      )}

      <div className="w-full h-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden ">
        <OrgChart nodes={nodes} clinks={clinks} />
      </div>
    </div>
  );
};

export default EmployeeTreemap;
