import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUsageStatsStore from '../../store/useUsageStore';
import useFullAttendanceStore from '../../store/useFullAttendanceStore';

export default function EmployeeStatistics() {
  const { empID } = useParams();
  const navigate = useNavigate();
  const { stats, fetchStats, loading, error } = useUsageStatsStore();

  const fetchAllData = useFullAttendanceStore((state) => state.fetchAllData);
  const getMonthlyAttendanceView = useFullAttendanceStore(
    (state) => state.getMonthlyAttendanceView
  );
  const attendanceLoading = useFullAttendanceStore((state) => state.isLoading);

  useEffect(() => {
    fetchStats(empID);
    fetchAllData(empID);
  }, [empID, fetchStats, fetchAllData]);

  if (loading || attendanceLoading)
    return <p className="text-center py-6 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center py-6 text-red-500">{error}</p>;

  const monthlyAttendance = getMonthlyAttendanceView(2025, 4);

  return (
    <div className="p-10 bg-gray-100 min-h-screen space-y-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <h2 className="text-2xl font-semibold text-white">Employee Usage Statistics ({empID})</h2>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                {['Date', 'Keyboard Minutes', 'Mouse Minutes', 'Keyboard Presses', 'Mouse Clicks', 'Details'].map((head) => (
                  <th key={head} className="py-3 px-4 text-center font-semibold border-b">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr key={stat._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center border-b">{stat.date}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseMinutes}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.keyboardPressCount}</td>
                  <td className="py-3 px-4 text-center border-b">{stat.mouseClickCount}</td>
                  <td className="py-3 px-4 text-center border-b">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-3 py-1 text-sm"
                      onClick={() => navigate(`/dashboard/statistics/${empID}/${stat.date}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-green-500">
          <h2 className="text-2xl font-semibold text-white">Monthly Attendance (Break Minutes)</h2>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                {['SL', 'Date', 'Day', 'Total Break', 'Status'].map((head) => (
                  <th key={head} className="py-3 px-4 text-center font-semibold border-b">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyAttendance.map((row) => (
                <tr key={row.date} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-center border-b">{row.sl}</td>
                  <td className="py-3 px-4 text-center border-b">{row.date}</td>
                  <td className="py-3 px-4 text-center border-b">{row.day}</td>
                  <td className="py-3 px-4 text-center border-b">{row.totalBreak}</td>
                  <td className="py-3 px-4 text-center border-b">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}