import React from "react";
import { FaBuilding } from "react-icons/fa";

export default function CompaniesList({ companies, onSelectCompany }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {companies.map((company) => (
        <button
          key={company._id}
          onClick={() => onSelectCompany(company._id)}
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
        >
          <FaBuilding className="text-gray-500 dark:text-gray-300 w-6 h-6" />
          <span className="text-gray-800 dark:text-gray-100 font-medium">
            {company.name}
          </span>
        </button>
      ))}
    </div>
  );
}
