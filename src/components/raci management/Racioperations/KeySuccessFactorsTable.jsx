import React from "react";

const KeySuccessFactorsTable = ({ keySuccessFactors }) => {
  return (
    <div className="border rounded p-4 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Key Success Factors</h2>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b dark:border-gray-600">
            <th className="p-2">Factor</th>
            <th className="p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(keySuccessFactors).map((factor) => (
            <tr key={factor} className="border-b last:border-none dark:border-gray-600">
              <td className="p-2">{factor}</td>
              <td className="p-2">{keySuccessFactors[factor].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeySuccessFactorsTable;
