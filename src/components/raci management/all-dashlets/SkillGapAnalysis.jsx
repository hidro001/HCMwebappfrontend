import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const skillGapData = [
  { name: 'Diploma', required: 30000, current: 25000 },
  { name: "Bachelor's", required: 40000, current: 35000 },
  { name: "Master's", required: 45000, current: 40000 },
  { name: 'PhD', required: 50000, current: 45000 },
];

export default function SkillGapAnalysisChart() {
  return (
    <div>
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Skill Gap Analysis
        </h2>
        <select className="border rounded p-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-100">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="h-60">
        <ResponsiveContainer>
          <BarChart data={skillGapData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="required" fill="#3b82f6" name="Required Skill" />
            <Bar dataKey="current" fill="#f97316" name="Current Skill" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
