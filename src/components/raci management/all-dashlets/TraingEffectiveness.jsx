import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const chartData = [
  { month: 'Jan 2024', performance: 15, training: 12 },
  { month: 'Feb 2024', performance: 25, training: 18 },
  { month: 'Mar 2024', performance: 20, training: 15 },
  { month: 'Apr 2024', performance: 35, training: 22 },
  { month: 'May 2024', performance: 40, training: 25 },
  { month: 'Jun 2024', performance: 50, training: 28 },
  { month: 'Jul 2024', performance: 55, training: 35 },
  { month: 'Aug 2024', performance: 45, training: 30 },
  { month: 'Sep 2024', performance: 60, training: 38 },
  { month: 'Oct 2024', performance: 70, training: 42 },
  { month: 'Nov 2024', performance: 65, training: 40 },
  { month: 'Dec 2024', performance: 80, training: 50 },
];

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700">
        <p className="text-sm text-gray-800 dark:text-gray-200">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-xs text-gray-600 dark:text-gray-300"
          >
            {entry.name}: ${entry.value}k
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrainingPerformanceChart = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white rounded-md shadow dark:bg-gray-900">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
        Training Effectiveness and Performance Outcomes
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Training Assessments and score range
      </p>

      {/* Chart */}
      <div className="h-96 w-full">
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={{ stroke: '#cbd5e1' }}
              // domain={[0, 100]} // Example if you want to fix the range
              label={{
                value: 'Value ($k)',
                angle: -90,
                position: 'insideLeft',
                fill: '#6b7280',
                fontSize: 12,
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ top: 0, left: 0 }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="performance"
              name="Avg. Performance Score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="training"
              name="Avg. Training Programs"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrainingPerformanceChart;
