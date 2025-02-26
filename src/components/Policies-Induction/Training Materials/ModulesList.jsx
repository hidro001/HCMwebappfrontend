import React from "react";
import { FaTasks } from "react-icons/fa";

export default function ModulesList({ modules, onSelectModule }) {
  if (!modules || modules.length === 0) {
    return <div>No modules available for this company.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {modules.map((mod) => (
        <button
          key={mod._id}
          onClick={() => onSelectModule(mod._id)}
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-2"
        >
          <FaTasks className="text-gray-500 dark:text-gray-300 w-6 h-6" />
          <span className="text-gray-800 dark:text-gray-100 font-medium">
            {mod.name}
          </span>
        </button>
      ))}
    </div>
  );
}
