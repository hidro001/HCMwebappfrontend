import React from "react";

export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`
        px-4 py-2 text-sm font-medium
        ${
          isActive
            ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
        }
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
