import React from 'react';

function FilterChip({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full border transition
        ${
          selected
            ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-200 dark:text-blue-900'
            : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200'
        }
      `}
    >
      {label}
    </button>
  );
}

export default FilterChip;
