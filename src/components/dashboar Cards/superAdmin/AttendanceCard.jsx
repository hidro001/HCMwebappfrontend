import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiClock,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import { HiOutlineChartPie, HiOutlineSparkles } from "react-icons/hi2";

function AttendanceCard({totalUsers, usersLoggedInToday, employeesOnLeaveToday}) {
  const reportedEmployers = usersLoggedInToday;
  const onLeave = employeesOnLeaveToday;
  const notYetReported = totalUsers - reportedEmployers;
  const attendancePct =
    totalUsers > 0 ? (reportedEmployers / totalUsers) * 100 : 0;

  const data = {
    labels: ["Present", "On Leave", "Pending"],
    datasets: [
      {
        label: "Attendance Status",
        data: [reportedEmployers, onLeave, notYetReported],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(168, 85, 247, 0.8)"
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(168, 85, 247, 1)",
        ],
        borderWidth: 2,
        hoverOffset: 8,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "rgba(75, 85, 99, 0.3)",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage =
              totalUsers > 0 ? ((value / totalUsers) * 100).toFixed(1) : 0;
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const centerTextPlugin = {
    id: "modernCenterTextPlugin",
    afterDraw: (chart) => {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();
      const isSmall = width < 150;
      const isMedium = width < 200;
      
      const mainFontSize = isSmall ? 20 : isMedium ? 24 : 28;
      const subFontSize = isSmall ? 10 : isMedium ? 11 : 12;

    
      ctx.fillStyle = "#111827"; 
      ctx.textAlign = "center";
      ctx.font = `bold ${mainFontSize}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(`${Math.round(attendancePct)}%`, width / 2, height / 2 - 4);

      // Subtitle
      ctx.fillStyle = "#6B7280"; // dark mode: #9CA3AF
      ctx.font = `${subFontSize}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Present Today", width / 2, height / 2 + (isSmall ? 16 : 20));

      ctx.restore();
    },
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const chartVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Stats data for mapping
  const statsData = [
    {
      label: "Present",
      value: reportedEmployers,
      icon: FiUserCheck,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800/30",
    },
    {
      label: "On Leave",
      value: onLeave,
      icon: FiUserX,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800/30",
    },
    {
      label: "Pending",
      value: notYetReported,
      icon: FiClock,
      color: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      borderColor: "border-violet-200 dark:border-violet-800/30",
    },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="
        relative overflow-hidden
        w-full h-full
        rounded-xl sm:rounded-xl lg:rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200/50 dark:border-gray-700/50
        shadow-lg sm:shadow-xl shadow-gray-200/20 dark:shadow-black/20
        backdrop-blur-sm
        p-3 sm:p-4 lg:p-6
        text-gray-900 dark:text-gray-100
        flex flex-col
        min-h-0
      "
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4 sm:mb-5 lg:mb-6 flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md sm:shadow-lg flex-shrink-0">
            <HiOutlineChartPie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent truncate">
              Attendance Overview
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
              <FiActivity className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
              <span className="hidden sm:inline">Live Status</span>
              <span className="sm:hidden">Live</span>
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 shadow-md sm:shadow-lg flex-shrink-0"
        >
          <HiOutlineSparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="relative flex justify-center mb-4 sm:mb-6 lg:mb-8 flex-shrink-0">
        <motion.div 
          variants={chartVariants} 
          className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
        >
          <Doughnut
            data={data}
            options={options}
            plugins={[centerTextPlugin]}
          />

          {/* Floating total users indicator */}
          <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 text-xs font-semibold shadow-md sm:shadow-lg">
            <FiUsers className="inline w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden sm:inline">{totalUsers} Total</span>
            <span className="sm:hidden">{totalUsers}</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid - Scrollable on small screens */}
      <div className="space-y-2 sm:space-y-3 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-600">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={statVariants}
              custom={index}
              className={`
                relative group
                flex items-center justify-between
                p-2.5 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl
                ${stat.bgColor}
                border ${stat.borderColor}
                hover:shadow-md hover:scale-[1.02]
                transition-all duration-300
                cursor-pointer
                min-w-0
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div
                  className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${stat.color} bg-white/80 dark:bg-gray-800/80 flex-shrink-0`}
                >
                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base truncate">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </span>
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${stat.color.replace(
                    "text-",
                    "bg-"
                  )} opacity-60 flex-shrink-0`}
                />
              </div>

              {/* Hover effect line */}
              <div
                className={`absolute bottom-0 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4 h-0.5 ${stat.color.replace(
                  "text-",
                  "bg-"
                )} scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Performance indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 sm:mt-5 lg:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 border border-gray-200/50 dark:border-gray-700/50 flex-shrink-0"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
              <span className="hidden sm:inline">Attendance Rate</span>
              <span className="sm:hidden">Rate</span>
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-12 sm:w-16 lg:w-20 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${attendancePct}%` }}
                transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-emerald-500 min-w-max">
              {Math.round(attendancePct)}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AttendanceCard;