import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiCoffee, FiActivity, FiMonitor, FiGlobe, FiTrendingUp, FiInfo } from "react-icons/fi";
import useUsageStatsStore from "../../store/useUsageStore";
import useFullAttendanceStore from "../../store/useFullAttendanceStore";
import CustomTooltip from "./CustomToolTip";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default function EmployeeDailyStats() {
  const { attendanceData } = useFullAttendanceStore();
  const { empID, date } = useParams();
  const {
    dailyStats,
    fetchDailyStats,
    fetchDeptCategories,
    deptCategories,
    loading,
    error,
    timeline,
    fetchTimeline,
    fetchGraphData,   
    graphData,        
  } = useUsageStatsStore();

  const attendanceRecord = useMemo(() => {
    return attendanceData.find((rec) => rec.date === date);
  }, [attendanceData, date]);

 useEffect(() => {
  fetchDailyStats(empID, date).then((data) => {
    if (data?.department) {
      fetchDeptCategories(data.department);
    }
  });
  fetchTimeline(empID, date);
  fetchGraphData(empID, date);
}, [empID, date]);




  const { productiveTime, unproductiveTime } = useMemo(() => {
    if (!dailyStats || !deptCategories)
      return { productiveTime: 0, unproductiveTime: 0 };

    const prodSet = new Set(
      deptCategories.productive.map((d) => d.name.toLowerCase())
    );
    const unprodSet = new Set(
      deptCategories.unproductive.map((d) => d.name.toLowerCase())
    );

    let productiveTime = 0;
    let unproductiveTime = 0;

    dailyStats.appsUsed.forEach((app) => {
      const appName = app.appName.toLowerCase();
      if (prodSet.has(appName)) productiveTime += app.minutesUsed;
      else if (unprodSet.has(appName)) unproductiveTime += app.minutesUsed;
    });

    dailyStats.websitesVisited.forEach((site) => {
      const url = site.url.toLowerCase();
      if (prodSet.has(url)) productiveTime += site.minutesVisited;
      else if (unprodSet.has(url)) unproductiveTime += site.minutesVisited;
    });

    return { productiveTime, unproductiveTime };
  }, [dailyStats, deptCategories]);

  

  const combinedTimeline = useMemo(() => {
    const baseTimeline = (timeline || []).map((item, idx) => ({
      startTime: item.startTime,
      endTime: item.endTime,
      name: item.name,
      type: item.type || "app",
      duration:
        item.duration ||
        Math.round(
          (new Date(`2000-01-01T${item.endTime}`) -
            new Date(`2000-01-01T${item.startTime}`)) /
            60000
        ),
      id: `activity-${idx}-${item.startTime}`,
    }));

    const breaksTimeline = (attendanceRecord?.breaks || [])
      .filter((br) => {
        const breakDate = new Date(br.start).toISOString().split("T")[0];
        return breakDate === date;
      })
      .map((br, idx) => {
        const start = new Date(br.start);
        let end = new Date(br.end);
        if (end <= start) end.setDate(end.getDate() + 1);

        const duration = Math.round((end - start) / 60000);
        return {
          startTime: start.toTimeString().slice(0, 5),
          endTime: end.toTimeString().slice(0, 5),
          name: "Break",
          type: "break",
          duration: duration > 0 ? duration : 0,
          id: `break-${idx}-${start.getTime()}`,
        };
      });

    return [...baseTimeline, ...breaksTimeline].sort((a, b) => {
      const aDate = new Date(`2000-01-01T${a.startTime}`);
      const bDate = new Date(`2000-01-01T${b.startTime}`);
      return aDate - bDate;
    });
  }, [timeline, attendanceRecord, date]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          Loading daily statistics...
        </p>
      </div>
    );
    
  if (error)
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
          <FiInfo className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Unable to load data
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
    
  if (!dailyStats)
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-500 mb-6">
          <FiInfo className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No data available
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          No statistics found for this date.
        </p>
      </div>
    );

  const totalTime = productiveTime + unproductiveTime;
  const productivityPercentage = totalTime > 0 
    ? Math.round((productiveTime / totalTime) * 100) 
    : 0;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Daily Statistics</h1>
            <p className="text-indigo-100">Detailed activity for {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="mt-4 md:mt-0 bg-indigo-400/30 px-4 py-2 rounded-xl">
            <p className="font-medium">Employee #{empID}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <FiActivity className="mr-2 text-indigo-500" />
            Productivity Overview
          </h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">{productivityPercentage}%</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Productivity</div>
            </div>
            
            <div className="w-36 h-36 relative">
              <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div 
                className="absolute inset-0 rounded-full border-[12px] border-emerald-500" 
                style={{ 
                  clipPath: `inset(0 0 0 ${100 - productivityPercentage}%)` 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800 dark:text-white">{productiveTime + unproductiveTime}m</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex items-center">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 p-2 rounded-lg mr-3">
                  <FiTrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Productive</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-300">{productiveTime}m</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
              <div className="flex items-center">
                <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 p-2 rounded-lg mr-3">
                  <FiCoffee className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Unproductive</div>
                  <div className="text-xl font-bold text-rose-600 dark:text-rose-300">{unproductiveTime}m</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <FiClock className="mr-2 text-indigo-500" />
            Attendance Summary
          </h2>
          
          {attendanceRecord ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Login Time</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-300">
                    {attendanceRecord.login}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Logout Time</div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-300">
                    {attendanceRecord.logout || "Still active"}
                  </div>
                </div>
              </div>
              
              {attendanceRecord.breaks && attendanceRecord.breaks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Breaks Taken</h3>
                  <div className="space-y-2">
                    {attendanceRecord.breaks.map((br, i) => (
                      <div key={i} className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 p-2 rounded-lg mr-3">
                          <FiCoffee className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">
                            {new Date(br.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
                            {" → "} 
                            {new Date(br.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.round((new Date(br.end) - new Date(br.start)) / 60000)} minutes
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiInfo className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                No attendance record
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No attendance data available for this date
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
            <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
              <FiMonitor className="w-5 h-5" />
            </div>
            <h3 className="text-white text-lg font-semibold">Apps Used</h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {dailyStats.appsUsed.length > 0 ? (
                dailyStats.appsUsed.map((app, i) => (
                  <li key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                        <FiMonitor className="text-indigo-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{app.appName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{app.category || "Uncategorized"}</div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                      {app.minutesUsed}m
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-8 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center">
                    <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
                    No apps used
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 px-6 py-4 flex items-center">
            <div className="mr-3 text-white bg-indigo-400/20 p-2 rounded-lg">
              <FiGlobe className="w-5 h-5" />
            </div>
            <h3 className="text-white text-lg font-semibold">Websites Visited</h3>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {dailyStats.websitesVisited.length > 0 ? (
                dailyStats.websitesVisited.map((site, i) => (
                  <li key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                        <FiGlobe className="text-indigo-500" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[160px]">
                          {site.url.replace(/^https?:\/\/(www\.)?/, "")}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{site.category || "Uncategorized"}</div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium">
                      {site.minutesVisited}m
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-8 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center">
                    <FiInfo className="w-8 h-8 text-gray-400 mb-2" />
                    No websites visited
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <FiClock className="mr-2 text-indigo-500" />
            Activity Timeline
          </h2>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <span className="flex items-center text-sm">
              <span className="block w-3 h-3 rounded-full mr-2 bg-indigo-500"></span>
              App/Website
            </span>
            <span className="flex items-center text-sm">
              <span className="block w-3 h-3 rounded-full mr-2 bg-amber-500"></span>
              Break
            </span>
          </div>
        </div>
        
        {combinedTimeline.length > 0 ? (
          <div className="relative pl-4">
            {/* Timeline track */}
            <div className="absolute left-[18px] top-0 w-1 h-full bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full"></div>
            
            <div className="space-y-8">
              {combinedTimeline.map((block, idx) => {
                const isBreak = block.type === "break";
                const start24h = new Date(
                  `2000-01-01 ${block.startTime}`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const end24h = new Date(
                  `2000-01-01 ${block.endTime}`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={idx} className="relative flex group">
                    <div className="absolute left-[-9px] top-1/2 transform -translate-y-1/2 z-20">
                      <div className={`w-5 h-5 rounded-full ${
                        isBreak ? "bg-amber-500" : "bg-indigo-500"
                      } border-4 border-white dark:border-gray-800`}></div>
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <div className={`p-4 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md ${
                        isBreak 
                          ? "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border border-amber-100 dark:border-amber-900/30" 
                          : "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30"
                      }`}>
                        <div className="flex flex-wrap justify-between items-start">
                          <div>
                            <h3 className={`font-bold ${
                              isBreak ? "text-amber-600 dark:text-amber-300" : "text-indigo-600 dark:text-indigo-300"
                            }`}>
                              {block.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                {start24h} - {end24h}
                              </span>
                              {block.duration > 0 && (
                                <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                  {block.duration} min
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              isBreak 
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-700/30 dark:text-amber-200" 
                                : "bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-200"
                            }`}>
                              {block.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="bg-gray-100 dark:bg-gray-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiInfo className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
              No activity recorded
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No timeline data available for this date
            </p>
          </div>
        )}
      </div>
      
      {/* Summary Footer */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="text-lg font-bold">Daily Summary</h3>
            <p className="text-indigo-100">
              {productiveTime}m productive • {unproductiveTime}m unproductive
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              Export Report
            </button>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Share
            </button>
          </div>
        </div>
      </div>
      {/* Productivity Graph Section */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mb-8">
  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
    <FiTrendingUp className="mr-2 text-indigo-500" />
    Productivity Graph
  </h2>

  {graphData && graphData.length > 0 && graphData[0].Productivity > 0 ? (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="Productivity" stackId="a" fill="#3b82f6" />
      <Bar dataKey="Unproductivity" stackId="a" fill="#ef4444" />
      <Bar dataKey="BreakTime" stackId="a" fill="#a855f7" />
    </BarChart>
  </ResponsiveContainer>
) : (
  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
    No graph data available.
  </div>
)}

</div>

    </div>
  );
}
