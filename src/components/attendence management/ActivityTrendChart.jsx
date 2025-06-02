// ./ActivityTrendChart.jsx
import React from "react";
import { useMemo } from "react";
import useUsageStatsStore from "../../store/useUsageStore"; // or correct path
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ActivityTrendChart({ employeeId, date }) {
  // We'll assume `fetchActivityTrend` was already called in EmployeeStatistics
  const { activityTrend } = useUsageStatsStore();

  // If you want to filter locally or do transformations:
  const chartData = useMemo(() => {
    // e.g. rename fields or ensure numeric
    return activityTrend.map((d) => ({
      time: d.time,
      keyboardPresses: Number(d.keyboardPresses || 0),
      mouseClicks: Number(d.mouseClicks || 0),
    }));
  }, [activityTrend]);

  if (!chartData.length) {
    return <p className="text-sm text-gray-400">No activity trend data</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Activity Trend Throughout the day</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorKP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />

          {/* Keyboard Presses Area */}
          <Area
            type="monotone"
            dataKey="keyboardPresses"
            stroke="#3B82F6"
            fill="url(#colorKP)"
            name="Average Productivity Rating"
          />

         
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
