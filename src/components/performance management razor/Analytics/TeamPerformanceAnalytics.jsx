import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LabelList,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  FiTrendingUp,
  FiTarget,
  FiActivity,
  FiPieChart,
  FiCalendar,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { BiLineChart, BiBarChart, BiPieChart } from "react-icons/bi";
import { FaChartArea, FaChartBar } from "react-icons/fa";

// colors & animation variants
const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#84CC16",
  "#EC4899",
  "#14B8A6",
];
const gradientMap = {
  primary: "from-indigo-500 to-purple-600",
  success: "from-green-400 to-blue-500",
  warning: "from-yellow-400 to-orange-500",
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  hover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
};
const iconVariants = {
  hover: { rotate: 360, scale: 1.1, transition: { duration: 0.3 } },
};

// reusable components
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
    >
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {p.value}
          {p.unit || ""}
        </p>
      ))}
    </motion.div>
  );
};

// Scatter-chart specific tooltip
const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  // the data object you passed in your scatterData array
  const { period, target, achieved } = payload[0].payload;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
    >
      <p className="font-semibold mb-2">{period}</p>
      <p>Target: {target}</p>
      <p>Achieved: {achieved}</p>
    </motion.div>
  );
};

const EmptyState = ({ icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <Icon className="w-12 h-12 mb-2" />
    <span>No data available</span>
  </div>
);

const ChartCard = ({ title, icon: Icon, isExpanded, onToggle, children }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border overflow-hidden ${
      isExpanded ? "col-span-full" : ""
    }`}
  >
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg"
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <button
        onClick={onToggle}
        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
      </button>
    </div>
    <div style={{ height: isExpanded ? 350 : 300 }} className="px-4 pb-4">
      {children}
    </div>
  </motion.div>
);

const StatCard = ({ title, value, icon: Icon, gradient }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border flex justify-between items-center"
  >
    <div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className={`p-3 bg-gradient-to-r ${gradient} rounded-2xl`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </motion.div>
);

export default function PerformanceAnalytics({ data }) {
  // bring back aggregatedTeam so we know each period’s category
  const {
    chart = [],
    aggregatedTeam = [],
    categories = [],
    avgKpi = [],
    scatter = [],
    avgDailyKpi = [],
    buckets = [],
    employees = [],
    top = [],
    bottom = [],
    heatmap = [],
    movingAverage = [],
    periodChange = [],
  } = data || {};

  // build category → [periods] map
  const categoryMap = useMemo(() => {
    const map = {};
    aggregatedTeam.forEach((p) => {
      const cat = p.summary.category;
      if (!map[cat]) map[cat] = [];
      map[cat].push(p.periodLabel);
    });
    return map;
  }, [aggregatedTeam]);

  // moving avg + percent-change series
  const mvData = useMemo(
    () =>
      chart.map((c, i) => ({
        period: c.period,
        movingAverage: movingAverage[i] ?? 0,
        periodChange: periodChange[i] ?? 0,
      })),
    [chart, movingAverage, periodChange]
  );

  // update buckets to also carry period list
  const bucketsWithPeriods = useMemo(() => {
    const b = buckets.map((bkt) => ({
      ...bkt,
      periods: [],
    }));
    chart.forEach((d) => {
      const idx = Math.min(
        Math.floor(d.normalizedScore / 10),
        buckets.length - 1
      );
      b[idx].periods.push(d.period);
    });
    return b;
  }, [buckets, chart]);

  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded(expanded === id ? null : id);

  // summary cards
  const totalScore = chart.reduce((s, c) => s + (c.totalScore || 0), 0);
  const avgPerf = chart.length
    ? Math.round(
        chart.reduce((s, c) => s + (c.percentOfTarget || 0), 0) / chart.length
      )
    : 0;
  const best =
    chart.reduce(
      (b, c) => (c.percentOfTarget > (b.percentOfTarget || 0) ? c : b),
      {}
    ) || {};

  return (
    <div className="space-y-8">
      {/* summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Score"
          value={totalScore}
          icon={FiTrendingUp}
          gradient={gradientMap.primary}
        />
        <StatCard
          title="Avg. % of Target"
          value={`${avgPerf}%`}
          icon={FiTarget}
          gradient={gradientMap.success}
        />
        <StatCard
          title="Best Period"
          value={best.period || "—"}
          icon={FiActivity}
          gradient={gradientMap.warning}
        />
      </div>

      {/* main charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* trends */}
        <ChartCard
          title="Score & % Over Time"
          icon={BiLineChart}
          isExpanded={expanded === "trends"}
          onToggle={() => toggle("trends")}
        >
          {chart.length === 0 ? (
            <EmptyState icon={BiLineChart} />
          ) : (
            <ResponsiveContainer>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  dataKey="totalScore"
                  name="Total Score"
                  stroke={COLORS[0]}
                  dot
                />
                <Line
                  yAxisId="right"
                  dataKey="percentOfTarget"
                  name="% of Target"
                  stroke={COLORS[1]}
                  dot
                  unit="%"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* target vs achieved */}
        <ChartCard
          title="Target vs Achieved"
          icon={BiBarChart}
          isExpanded={expanded === "comparison"}
          onToggle={() => toggle("comparison")}
        >
          {chart.length === 0 ? (
            <EmptyState icon={BiBarChart} />
          ) : (
            <ResponsiveContainer>
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalTarget" name="Target" fill={COLORS[4]}>
                  <LabelList dataKey="totalTarget" position="top" />
                </Bar>
                <Bar dataKey="totalAchieved" name="Achieved" fill={COLORS[3]}>
                  <LabelList dataKey="totalAchieved" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* performance */}
        <ChartCard
          title="Performance Trend (%)"
          icon={FaChartArea}
          isExpanded={expanded === "performance"}
          onToggle={() => toggle("performance")}
        >
          {chart.length === 0 ? (
            <EmptyState icon={FaChartArea} />
          ) : (
            <ResponsiveContainer>
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="normalizedScore"
                  name="Normalized Score"
                  stroke={COLORS[1]}
                  fill="url(#perfGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* category distribution */}
        {/* <ChartCard title="Category Distribution" icon={BiPieChart} isExpanded={expanded === "categories"} onToggle={() => toggle("categories")}>
          {categories.length === 0 ? (
            <EmptyState icon={BiPieChart} />
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100}>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    const { category, value } = payload[0].payload;
                    const periods = categoryMap[category] || [];
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
                      >
                        <p className="font-semibold mb-1">{category}</p>
                        <p>{value} period{value > 1 ? "s" : ""}</p>
                        <p className="text-sm text-gray-600 mt-1">Periods:</p>
                        <p className="text-sm">{periods.join(", ")}</p>
                      </motion.div>
                    );
                  }}
                />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard> */}

        <ChartCard
          title="Category Distribution"
          icon={BiPieChart}
          isExpanded={expanded === "categories"}
          onToggle={() => toggle("categories")}
        >
          {categories.length === 0 ? (
            <EmptyState icon={BiPieChart} />
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ category, value }) => `${category}: ${value}`}
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    // pull period list directly from the slice’s payload
                    const { category, value, periods } = payload[0].payload;
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
                      >
                        <p className="font-semibold mb-1">{category}</p>
                        <p>
                          {value} period{value > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">Periods:</p>
                        <p className="text-sm break-words">
                          {periods.join(", ")}
                        </p>
                      </motion.div>
                    );
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* KPI overviews */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartCard
          title="Average % per KPI"
          icon={FaChartBar}
          isExpanded={expanded === "kpi-overview"}
          onToggle={() => toggle("kpi-overview")}
        >
          {avgKpi.length === 0 ? (
            <EmptyState icon={FaChartBar} />
          ) : (
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={avgKpi.map((k) => ({
                  kpiName: k.kpiName,
                  avgPercent: Math.round(k.avgPercent * 10) / 10,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis type="category" dataKey="kpiName" width={120} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgPercent" name="Avg %" fill={COLORS[0]}>
                  <LabelList
                    dataKey="avgPercent"
                    position="right"
                    formatter={(v) => `${v}%`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title="Avg Daily KPI Score"
          icon={FiCalendar}
          isExpanded={expanded === "daily-kpi"}
          onToggle={() => toggle("daily-kpi")}
        >
          {avgDailyKpi.length === 0 ? (
            <EmptyState icon={FiCalendar} />
          ) : (
            <ResponsiveContainer>
              <BarChart
                data={avgDailyKpi.map((k) => ({
                  kpiName: k.kpiName,
                  avgDailyScore: Math.round(k.avgDailyScore * 10) / 10,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="kpiName"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avgDailyScore" name="Avg Score" fill={COLORS[6]}>
                  <LabelList dataKey="avgDailyScore" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* scatter & buckets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Target vs Achieved (Scatter)"
          icon={BiBarChart}
          isExpanded={expanded === "scatter"}
          onToggle={() => toggle("scatter")}
        >
          {scatter.length === 0 ? (
            <EmptyState icon={BiBarChart} />
          ) : (
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="target" name="Target" />
                <YAxis dataKey="achieved" name="Achieved" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<ScatterTooltip />}
                />
                <Scatter data={scatter} fill={COLORS[2]} />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title="Periods by Performance Range"
          icon={BiPieChart}
          isExpanded={expanded === "buckets"}
          onToggle={() => toggle("buckets")}
        >
          {bucketsWithPeriods.length === 0 ? (
            <EmptyState icon={BiPieChart} />
          ) : (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={bucketsWithPeriods}
                  dataKey="count"
                  nameKey="range"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ range, count }) => `${range}: ${count}`}
                >
                  {bucketsWithPeriods.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const { range, count, periods } = payload[0].payload;
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border"
                      >
                        <p className="font-semibold mb-1">{range}</p>
                        <p>
                          {count} period{count > 1 ? "s" : ""}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Periods:</p>
                        <p className="text-sm">{periods.join(", ")}</p>
                      </motion.div>
                    );
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* moving avg & change */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Moving Average"
          icon={BiLineChart}
          isExpanded={expanded === "movingAvg"}
          onToggle={() => toggle("movingAvg")}
        >
          {mvData.length === 0 ? (
            <EmptyState icon={BiLineChart} />
          ) : (
            <ResponsiveContainer>
              <LineChart data={mvData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line dataKey="movingAverage" stroke={COLORS[1]} dot />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title="Period-to-Period % Change"
          icon={FaChartArea}
          isExpanded={expanded === "periodChange"}
          onToggle={() => toggle("periodChange")}
        >
          {mvData.length === 0 ? (
            <EmptyState icon={FaChartArea} />
          ) : (
            <ResponsiveContainer>
              <BarChart data={mvData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="periodChange" fill={COLORS[3]}>
                  <LabelList
                    dataKey="periodChange"
                    position="top"
                    formatter={(v) => (v != null ? `${v}%` : "")}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Employee aggregates */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-auto">
        <h3 className="text-lg font-semibold mb-4">Employee Aggregates</h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-right text-sm font-medium">
                Avg Rating
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium">
                Count
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Category
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {employees.map((e, i) => (
              <tr key={i}>
                <td className="px-4 py-2">{`${e.employee.first_Name} ${e.employee.last_Name}`}</td>
                <td className="px-4 py-2 text-right">{e.averageRating}</td>
                <td className="px-4 py-2 text-right">{e.ratingCount}</td>
                <td className="px-4 py-2">{e.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top/Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Top Performers</h3>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-right">Avg Rating</th>
                <th className="px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {top.map((p, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{`${p.employee.first_Name} ${p.employee.last_Name}`}</td>
                  <td className="px-4 py-2 text-right">{p.averageRating}</td>
                  <td className="px-4 py-2">{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Bottom Performers</h3>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-right">Avg Rating</th>
                <th className="px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bottom.map((p, i) => (
                <tr key={i}>
                  <td className="px-4 py-2">{`${p.employee.first_Name} ${p.employee.last_Name}`}</td>
                  <td className="px-4 py-2 text-right">{p.averageRating}</td>
                  <td className="px-4 py-2">{p.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-auto">
        <h3 className="text-lg font-semibold mb-4">
          Heatmap (Normalized Scores)
        </h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-3 py-2 text-left">Employee</th>
              {chart.map((c, i) => (
                <th key={i} className="px-3 py-2 text-center">
                  {c.period}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {heatmap.map((row, i) => (
              <tr key={i}>
                <td className="px-3 py-2">{row.employee}</td>
                {row.data.map((cell, j) => (
                  <td key={j} className="px-3 py-2 text-center">
                    {cell.normalizedScore}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
