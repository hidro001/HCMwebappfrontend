
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "recharts";
import {
  FiTrendingUp,
  FiTarget,
  FiPieChart,
  FiActivity,
  FiMaximize2,
  FiMinimize2,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import {
  BiLineChart,
  BiBarChart,
  BiPieChart,
  BiTrendingUp,
} from "react-icons/bi";
import { FaChartArea, FaChartBar } from "react-icons/fa";

// Modern color palette with better contrast
const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
  "#EC4899", // Pink
  "#14B8A6", // Teal
];

const GRADIENT_COLORS = {
  primary: "from-blue-500 to-purple-600",
  success: "from-green-400 to-blue-500",
  warning: "from-yellow-400 to-orange-500",
  danger: "from-red-400 to-pink-500",
  info: "from-cyan-400 to-blue-500",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

const iconVariants = {
  hover: {
    rotate: 360,
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

// Chart configuration for different screen sizes
const getChartHeight = (screenSize) => {
  if (screenSize === "mobile") return 250;
  if (screenSize === "tablet") return 300;
  return 350;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${
              formatter ? formatter(entry.value, entry.name)[0] : entry.value
            }`}
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
};

// Responsive chart wrapper
const ChartWrapper = ({
  children,
  title,
  icon: Icon,
  isExpanded,
  onToggleExpand,
  height = 300,
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 ${
      isExpanded ? "col-span-full" : ""
    }`}
  >
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            variants={iconVariants}
            whileHover="hover"
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h4>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleExpand}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
        </motion.button>
      </div>
      <div className="w-full overflow-x-auto">
        <div
          style={{
            minWidth: "300px",
            width: "100%",
            height: isExpanded ? height + 50 : height,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  </motion.div>
);

// Stat card component
const StatCard = ({ title, value, change, icon: Icon, gradient, trend }) => (
  <motion.div
    variants={cardVariants}
    whileHover="hover"
    className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            <FiTrendingUp
              className={`w-4 h-4 mr-1 ${trend === "down" ? "rotate-180" : ""}`}
            />
            {change}
          </div>
        )}
      </div>
      <div className={`p-3 bg-gradient-to-r ${gradient} rounded-2xl`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

export default function PerformanceAnalytics({
  aggregatedData = [],
  rawRatings = [],
}) {
  const [expandedChart, setExpandedChart] = useState(null);
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for demonstration
  const sampleAggregatedData =
    aggregatedData.length > 0
      ? aggregatedData
      : [
          {
            periodLabel: "Week 1",
            periodStartDate: "2024-01-01",
            periodEndDate: "2024-01-07",
            summary: {
              totalScore: 450,
              totalTarget: 500,
              totalAchieved: 420,
              percentOfTarget: 84,
              category: "Performance",
              perKpi: [
                {
                  kpiName: "Sales",
                  type: "quantitative",
                  targetSum: 100,
                  achievedSum: 85,
                  scoreSum: 85,
                  marksSum: 100,
                },
                {
                  kpiName: "Quality",
                  type: "qualitative",
                  scoreSum: 90,
                  marksSum: 100,
                },
              ],
            },
          },
          {
            periodLabel: "Week 2",
            periodStartDate: "2024-01-08",
            periodEndDate: "2024-01-14",
            summary: {
              totalScore: 520,
              totalTarget: 550,
              totalAchieved: 480,
              percentOfTarget: 87,
              category: "Growth",
              perKpi: [
                {
                  kpiName: "Sales",
                  type: "quantitative",
                  targetSum: 110,
                  achievedSum: 95,
                  scoreSum: 95,
                  marksSum: 110,
                },
                {
                  kpiName: "Quality",
                  type: "qualitative",
                  scoreSum: 95,
                  marksSum: 100,
                },
              ],
            },
          },
          {
            periodLabel: "Week 3",
            periodStartDate: "2024-01-15",
            periodEndDate: "2024-01-21",
            summary: {
              totalScore: 580,
              totalTarget: 600,
              totalAchieved: 550,
              percentOfTarget: 92,
              category: "Excellence",
              perKpi: [
                {
                  kpiName: "Sales",
                  type: "quantitative",
                  targetSum: 120,
                  achievedSum: 110,
                  scoreSum: 110,
                  marksSum: 120,
                },
                {
                  kpiName: "Quality",
                  type: "qualitative",
                  scoreSum: 98,
                  marksSum: 100,
                },
              ],
            },
          },
        ];

  const sampleRawRatings =
    rawRatings.length > 0
      ? rawRatings
      : [
          {
            date: "2024-01-01",
            kpis: [
              { kpiName: "Sales", score: 85 },
              { kpiName: "Quality", score: 90 },
            ],
          },
          {
            date: "2024-01-02",
            kpis: [
              { kpiName: "Sales", score: 88 },
              { kpiName: "Quality", score: 92 },
            ],
          },
        ];

  const chartData = useMemo(() => {
    return sampleAggregatedData.map((pd) => {
      const { periodLabel, summary, periodStartDate, periodEndDate } = pd;
      const daysCount = sampleRawRatings.filter((r) => {
        if (!r.date) return false;
        const d = new Date(r.date);
        const start = new Date(periodStartDate);
        const end = new Date(periodEndDate);
        return d >= start && d < end;
      }).length;
      const maxScore = daysCount * 100;
      const normalizedScore =
        maxScore > 0 ? (summary.totalScore / maxScore) * 100 : 0;

      return {
        period: periodLabel,
        totalScore: summary.totalScore,
        totalTarget: summary.totalTarget,
        totalAchieved: summary.totalAchieved,
        percentOfTarget: summary.percentOfTarget,
        normalizedScore: Math.round(normalizedScore * 10) / 10,
      };
    });
  }, [sampleAggregatedData, sampleRawRatings]);

  const categoryDistribution = useMemo(() => {
    const counts = {};
    sampleAggregatedData.forEach((pd) => {
      const cat = pd.summary.category || "Unknown";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([category, value]) => ({
      category,
      value,
    }));
  }, [sampleAggregatedData]);

  const kpiRadarData = useMemo(() => {
    const map = {};
    sampleAggregatedData.forEach((pd) => {
      const perKpi = pd.summary.perKpi || [];
      perKpi.forEach((k) => {
        const { kpiName, type } = k;
        let ratio = 0;
        if (type === "quantitative") {
          ratio = k.targetSum > 0 ? (k.achievedSum / k.targetSum) * 100 : 0;
        } else {
          ratio = k.marksSum > 0 ? (k.scoreSum / k.marksSum) * 100 : 0;
        }
        if (!map[kpiName]) {
          map[kpiName] = { sumRatio: 0, occurrences: 0 };
        }
        map[kpiName].sumRatio += ratio;
        map[kpiName].occurrences += 1;
      });
    });
    return Object.entries(map).map(([kpiName, { sumRatio, occurrences }]) => ({
      kpiName,
      avgPercent: Math.round((sumRatio / occurrences) * 10) / 10,
    }));
  }, [sampleAggregatedData]);

  const avgDailyKpiData = useMemo(() => {
    const map = {};
    sampleRawRatings.forEach((dr) => {
      if (!dr.date) return;
      const dateKey = new Date(dr.date).toISOString().slice(0, 10);
      dr.kpis.forEach((k) => {
        const name = k.kpiName || "Unnamed KPI";
        if (!map[name]) {
          map[name] = { sumScore: 0, countDates: new Set() };
        }
        map[name].sumScore += parseFloat(k.score || 0);
        map[name].countDates.add(dateKey);
      });
    });
    return Object.entries(map).map(([kpiName, { sumScore, countDates }]) => ({
      kpiName,
      avgDailyScore: Math.round((sumScore / countDates.size) * 10) / 10,
    }));
  }, [sampleRawRatings]);

  // Calculate summary stats
  const totalScore = chartData.reduce((sum, item) => sum + item.totalScore, 0);
  const avgPerformance =
    chartData.length > 0
      ? Math.round(
          chartData.reduce((sum, item) => sum + item.percentOfTarget, 0) /
            chartData.length
        )
      : 0;
  const bestPeriod = chartData.reduce(
    (best, current) =>
      current.percentOfTarget > best.percentOfTarget ? current : best,
    chartData[0] || {}
  );

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const toggleExpand = (chartId) => {
    setExpandedChart(expandedChart === chartId ? null : chartId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={cardVariants}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Performance Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive insights into your performance metrics
            </p>
          </div>

         
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatCard
            title="Total Score"
            value={totalScore.toLocaleString()}
            trend="up"
            icon={FiTrendingUp}
            gradient={GRADIENT_COLORS.primary}
          />
          <StatCard
            title="Avg Performance"
            value={`${avgPerformance}%`}
            trend="up"
            icon={FiTarget}
            gradient={GRADIENT_COLORS.success}
          />
          <StatCard
            title="Best Period"
            value={bestPeriod?.period || "N/A"}
            change={`${bestPeriod?.percentOfTarget || 0}%`}
            trend="up"
            icon={FiActivity}
            gradient={GRADIENT_COLORS.warning}
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score & Target Over Time */}
          <ChartWrapper
            title="Score & Target Trends"
            icon={BiLineChart}
            isExpanded={expandedChart === "trends"}
            onToggleExpand={() => toggleExpand("trends")}
            height={300}
          >
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FaChartBar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366F1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(val) => `${val}%`}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        formatter={(value, name) => {
                          if (name === "% of Target")
                            return [`${value}%`, name];
                          return [value, name];
                        }}
                      />
                    }
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="totalScore"
                    name="Total Score"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      fill: "#6366F1",
                      strokeWidth: 2,
                      stroke: "#FFFFFF",
                    }}
                    activeDot={{ r: 8, stroke: "#6366F1", strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="percentOfTarget"
                    name="% of Target"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{
                      r: 6,
                      fill: "#10B981",
                      strokeWidth: 2,
                      stroke: "#FFFFFF",
                    }}
                    activeDot={{ r: 8, stroke: "#10B981", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>

          {/* Target vs Achieved */}
          {/* <ChartWrapper
            title="Target vs Achieved"
            icon={BiBarChart}
            isExpanded={expandedChart === "comparison"}
            onToggleExpand={() => toggleExpand("comparison")}
            height={300}
          >
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiTarget className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="totalTarget"
                    name="Target"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                  <Bar
                    dataKey="totalAchieved"
                    name="Achieved"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper> */}

{/* Target vs Achieved */}
          <ChartWrapper
            title="Target vs Achieved"
            icon={BiBarChart}
            isExpanded={expandedChart === "comparison"}
            onToggleExpand={() => toggleExpand("comparison")}
            height={300}
          >
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiTarget className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 30, right: 40, left: 20, bottom: 20 }}
                  barCategoryGap="25%"
                  barGap={8}
                >
                  <defs>
                    <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="achievedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="2 4"
                    stroke="#E5E7EB"
                    opacity={0.3}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "#6B7280", fontSize: 13, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 'dataMax + 10']}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)', radius: 4 }}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                    iconType="roundRect"
                    wrapperStyle={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      paddingBottom: '10px'
                    }}
                  />
                  <Bar
                    dataKey="totalTarget"
                    name="Target"
                    fill="url(#targetGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={70}
                    stroke="#4F46E5"
                    strokeWidth={1}
                  />
                  <Bar
                    dataKey="totalAchieved"
                    name="Achieved"
                    fill="url(#achievedGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={70}
                    stroke="#059669"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>

          {/* Normalized Score Area Chart */}
          <ChartWrapper
            title="Performance Trend"
            icon={FaChartArea}
            isExpanded={expandedChart === "performance"}
            onToggleExpand={() => toggleExpand("performance")}
            height={300}
          >
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <BiTrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="performanceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        formatter={(val) => [`${val}%`, "Performance"]}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="normalizedScore"
                    name="Performance %"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#performanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>

          {/* Category Distribution */}
          <ChartWrapper
            title="Category Distribution"
            icon={BiPieChart}
            isExpanded={expandedChart === "categories"}
            onToggleExpand={() => toggleExpand("categories")}
            height={300}
          >
            {categoryDistribution.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiPieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ category, value }) => `${category}: ${value}`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>
        </div>

        {/* KPI Performance Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Average KPI Performance */}
          <ChartWrapper
            title="KPI Performance Overview"
            icon={FaChartBar}
            isExpanded={expandedChart === "kpi-overview"}
            onToggleExpand={() => toggleExpand("kpi-overview")}
            height={300}
          >
            {kpiRadarData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiActivity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No KPI data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={kpiRadarData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="kpiName"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    content={
                      <CustomTooltip
                        formatter={(value) => [`${value}%`, "Performance"]}
                      />
                    }
                  />
                  <Bar
                    dataKey="avgPercent"
                    name="Avg Performance %"
                    fill="#6366F1"
                    radius={[0, 8, 8, 0]}
                    barSize={30}
                  >
                    <LabelList
                      dataKey="avgPercent"
                      position="right"
                      formatter={(val) => `${val}%`}
                      fill="#6366F1"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>

          {/* Daily KPI Scores */}
          <ChartWrapper
            title="Daily KPI Performance"
            icon={FiCalendar}
            isExpanded={expandedChart === "daily-kpi"}
            onToggleExpand={() => toggleExpand("daily-kpi")}
            height={300}
          >
            {avgDailyKpiData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <FiCalendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No daily data available</p>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={avgDailyKpiData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="kpiName"
                    tick={{ fill: "#6B7280", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#D1D5DB" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="avgDailyScore"
                    name="Avg Daily Score"
                    fill="#F97316"
                    radius={[8, 8, 0, 0]}
                    barSize={40}
                  >
                    <LabelList
                      dataKey="avgDailyScore"
                      position="top"
                      fill="#F97316"
                      fontSize={11}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartWrapper>
        </div>
      </motion.div>
    </div>
  );
}
