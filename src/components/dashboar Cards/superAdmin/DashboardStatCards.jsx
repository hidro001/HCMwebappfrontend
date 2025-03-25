




import React, { useState, useEffect } from "react";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { useDashboardStore } from "../../../store/useDashboardStore";
import AttendanceModal from "./AttendanceModel"; // <-- Make sure the path is correct

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    attendanceDetails = [],
    attendanceDetailsLoading,
    employeesOnLeaveList,
    fetchLeaveDetails,
  } = useDashboardStore();

  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Wave images for both themes
  const waveLightGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c";
  const waveDarkGreen = "https://iili.io/2D0pyIn.png";
  const waveLightYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c";
  const waveDarkYellow = "https://iili.io/2D0mtDu.png";
  const waveLightRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f";
  const waveDarkRed = "https://iili.io/2D0bZCv.png";

  // Separate arrays for logged in / not logged in
  const loggedInUsers = attendanceDetails.filter((user) => user.isPresent);
  const notLoggedInUsers = attendanceDetails.filter((user) => !user.isPresent);

  const handleAttendanceClick = async () => {
    await fetchAttendanceDetails();
    setIsAttendanceModalVisible(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalVisible(false);
  };

  const handleLeaveClick = async () => {
    await fetchLeaveDetails();
    // Potentially open another modal, if desired
  };

  const statCardsData = [
    {
      icon: <FaUsers className="text-blue-600" />,
      count: totalUsers,
      label: "Total Employees",
      chartLight: waveLightGreen,
      chartDark: waveDarkGreen,
      onClickDetail: null,
    },
    {
      icon: <FaUserCheck className="text-green-600" />,
      count: usersLoggedInToday,
      label: "Users Logged In Today",
      chartLight: waveLightYellow,
      chartDark: waveDarkYellow,
      onClickDetail: handleAttendanceClick,
    },
    {
      icon: <FaUserTimes className="text-red-600" />,
      count: employeesOnLeaveToday,
      label: "Employees On Leave Today",
      chartLight: waveLightRed,
      chartDark: waveDarkRed,
      onClickDetail: handleLeaveClick,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row p-3 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {statCardsData.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalVisible}
        onRequestClose={closeAttendanceModal}
        attendanceDetailsLoading={attendanceDetailsLoading}
        loggedInUsers={loggedInUsers}
        notLoggedInUsers={notLoggedInUsers}
      />
    </>
  );
}

// ------------------------------------------------------------------------
// StatCard Component
// ------------------------------------------------------------------------
function StatCard({ icon, count, label, chartLight, chartDark, onClickDetail }) {
  const handleCardClick = () => {
    if (typeof onClickDetail === "function") {
      onClickDetail();
    }
  };

  return (
    <div
      className="relative w-full md:w-1/3 rounded-lg shadow-md p-4 cursor-pointer 
                 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl">{icon}</div>
        <div className="text-right">
          <h2 className="text-sm text-gray-500 dark:text-gray-400">{label}</h2>
          <p className="text-2xl font-bold">{count ?? 0}</p>
        </div>
      </div>

      <img
        src={chartLight}
        alt="stat-bg"
        className="absolute bottom-0 left-0 w-full h-10 object-cover rounded-b-lg block dark:hidden"
        style={{ zIndex: -1 }}
      />
      <img
        src={chartDark}
        alt="stat-bg-dark"
        className="absolute bottom-0 left-0 w-full h-10 object-cover rounded-b-lg hidden dark:block"
        style={{ zIndex: -1 }}
      />

      {label === "Users Logged In Today" && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCardClick}
            className="px-3 py-1 rounded shadow bg-blue-500 hover:bg-blue-400 text-white"
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardStatCards;
