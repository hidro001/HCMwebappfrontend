import React, { useState } from "react";
import { CHARTS_METADATA } from "../chartsMetadata/chartsMetadata";
import useDashboardStore from "../../../../store/dashboardStore";
import BaseModal from "../../../common/BaseModal"; // Adjust the path as needed

function CustomizeDashboardModal({ onClose }) {
  const { preferences, updatePreferences } = useDashboardStore();

  // local copy of preferences
  const [selectedChartIds, setSelectedChartIds] = useState(preferences);

  const handleCheckboxChange = (chartId) => {
    if (selectedChartIds.includes(chartId)) {
      setSelectedChartIds(selectedChartIds.filter((id) => id !== chartId));
    } else {
      setSelectedChartIds([...selectedChartIds, chartId]);
    }
  };

  const handleSave = async () => {
    await updatePreferences(selectedChartIds);
    onClose();
  };

  return (
    <BaseModal isOpen={true} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Customize Your Dashboard
        </h2>

        <div className="max-h-64 overflow-y-auto">
          {CHARTS_METADATA.map((chart) => {
            const { id, label } = chart;
            return (
              <label
                key={id}
                className="block py-1 text-gray-800 dark:text-gray-200"
              >
                <input
                  type="checkbox"
                  checked={selectedChartIds.includes(id)}
                  onChange={() => handleCheckboxChange(id)}
                  className="accent-blue-600 dark:accent-blue-400"
                />
                <span className="ml-2">{label}</span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 mr-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export default CustomizeDashboardModal;
