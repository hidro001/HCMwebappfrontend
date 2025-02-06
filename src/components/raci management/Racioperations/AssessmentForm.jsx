import React from "react";

const AssessmentForm = ({
  metrics,
  scoreOptions,
  handleDropdownChange,
  selectedFactor,
  keySuccessFactorsMapping,
}) => {
  return (
    <div className="border rounded p-4 mb-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Assessment Form</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b dark:border-gray-600">
            <th className="p-2">Metric</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, idx) => {
            const isHighlighted =
              selectedFactor &&
              keySuccessFactorsMapping[selectedFactor]?.includes(metric.id);

            return (
              <tr
                key={metric.id}
                className={`border-b last:border-none dark:border-gray-600 ${
                  isHighlighted ? "bg-yellow-100 dark:bg-yellow-900" : ""
                }`}
              >
                <td className="p-2">{metric.metric}</td>
                <td className="p-2">
                  <select
                    value={metric.score}
                    onChange={(e) =>
                      handleDropdownChange(metric.id, Number(e.target.value))
                    }
                    className="border rounded px-2 py-1 dark:bg-gray-700"
                  >
                    {scoreOptions.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentForm;
