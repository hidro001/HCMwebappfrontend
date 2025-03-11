import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";

// Import the store hook (Zustand or other) that holds the fetching logic
import { useDashboardStore } from "../../../store/useDashboardStore";

// Modal style (tweak as needed)
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "20px",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    overflow: "auto",
    width: "90%",
    maxWidth: "600px",
  },
};

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    attendanceDetails = [],
    attendanceDetailsLoading,
    employeesOnLeaveList, // optional if you also want to display those who are on leave
    fetchLeaveDetails,
  } = useDashboardStore();

  // For controlling the attendance modal
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);

  // Fetch main stats on mount
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Wave images
  const waveLightGreen =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c";
  const waveDarkGreen = "https://iili.io/2D0pyIn.png";

  const waveLightYellow =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c";
  const waveDarkYellow = "https://iili.io/2D0mtDu.png";

  const waveLightRed =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f";
  const waveDarkRed = "https://iili.io/2D0bZCv.png";

  // Handle click for "Users Logged In Today"
  const handleAttendanceClick = async () => {
    await fetchAttendanceDetails();
    setIsAttendanceModalVisible(true);
  };

  // Close the modal
  const closeAttendanceModal = () => {
    setIsAttendanceModalVisible(false);
  };

  // Handle "Employees On Leave Today" if you want a separate modal
  const handleLeaveClick = async () => {
    await fetchLeaveDetails();
    // show a separate modal or the same one for leave details
  };

  // Define the data for each stat card
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

  // Separate users into "Logged In" vs "Not Logged In"
  const loggedInUsers = attendanceDetails.filter((user) => user.isPresent);
  const notLoggedInUsers = attendanceDetails.filter((user) => !user.isPresent);

  return (
    <>
      {/* Stat Cards Row */}
      <div className="flex flex-col gap-5 md:flex-row">
        {statCardsData.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Attendance Modal */}
      <Modal
        isOpen={isAttendanceModalVisible}
        onRequestClose={closeAttendanceModal}
        contentLabel="Attendance Details"
        style={customModalStyles}
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">User Attendance Details</h2>
        <button
          onClick={closeAttendanceModal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded mb-3"
        >
          Close
        </button>

        {attendanceDetailsLoading && <p>Loading attendance details...</p>}

        {!attendanceDetailsLoading && (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logged In (Present) */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-green-600">
                Logged In
              </h3>
              {loggedInUsers.length === 0 && <p>No one has logged in yet.</p>}
              {loggedInUsers.map((user) => (
                <div
                  key={user._id}
                  className="border border-green-200 p-2 mb-2 rounded"
                >
                  <p>
                    {user.first_Name} {user.last_Name}
                  </p>
                </div>
              ))}
            </div>

            {/* Not Logged In (Absent) */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-red-600">
                Not Logged In
              </h3>
              {notLoggedInUsers.length === 0 && <p>Everyone has logged in!</p>}
              {notLoggedInUsers.map((user) => (
                <div
                  key={user._id}
                  className="border border-red-200 p-2 mb-2 rounded"
                >
                  <p>
                    {user.first_Name} {user.last_Name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

// ------------------------------------------------------------------------
// StatCard Component - Now defined within the same file for convenience
// ------------------------------------------------------------------------
function StatCard({
  icon,
  count,
  label,
  chartLight,
  chartDark,
  onClickDetail,
}) {
  // For demonstration, we’ll just pick chartLight.
  // You could conditionally choose chartDark if you implement dark mode.
  const handleCardClick = () => {
    if (typeof onClickDetail === "function") {
      onClickDetail();
    }
  };

  return (
    <div
      className="relative w-full md:w-1/3 bg-white rounded-lg shadow-md p-4 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl">{icon}</div>
        <div className="text-right">
          <h2 className="text-gray-500 text-sm">{label}</h2>
          <p className="text-2xl font-bold">{count ?? 0}</p>
        </div>
      </div>

      {/* Wave background image */}
      <img
        src={chartLight}
        alt="stat-bg"
        className="absolute bottom-0 left-0 w-full h-10 object-cover rounded-b-lg"
        style={{ zIndex: -1 }}
      />
    </div>
  );
}

export default DashboardStatCards;
