

import  { useEffect } from "react";
import StatCard from "./StatCard";
import { useDashboardStore } from "../../../store/useDashboardStore";

// React Icons
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";

function DashboardStatCards() {
  const {
    totalUsers,
    usersLoggedInToday,
    employeesOnLeaveToday,
    fetchDashboardStats,
    fetchAttendanceDetails,
    fetchLeaveDetails,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  
  const waveLightGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c"
  const waveDarkGreen = "https://iili.io/2D0pyIn.png"

  const waveLightYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c"
  const waveDarkYellow = "https://iili.io/2D0mtDu.png"

  const waveLightRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f"
  const waveDarkRed = "https://iili.io/2D0bZCv.png"




  const statCardsData = [
    {
      icon: <FaUsers className="text-blue-600" />,
      count: totalUsers,
      label: "Total Logged In",
      chartLight: waveLightGreen,  // Light version
      chartDark: waveDarkGreen,    // Dark version
      onClickDetail: null,
    },
    {
      icon: <FaUserCheck className="text-green-600" />,
      count: usersLoggedInToday,
      label: "Total Leaves Taken",
      chartLight: waveLightYellow,
      chartDark: waveDarkYellow,
      onClickDetail: fetchAttendanceDetails,
    },
    {
      icon: <FaUserTimes className="text-red-600" />,
      count: employeesOnLeaveToday,
      label: "Total Task Pending",
      chartLight: waveLightRed,
      chartDark: waveDarkRed,
      onClickDetail: fetchLeaveDetails,
    },
  ];

  return (
    <div className="flex flex-col gap-5 md:flex-row bg-blend-darken">
      {statCardsData.map((item, index) => (
        <StatCard  key={index} {...item} />
      ))}
    </div>
  );
}

export default DashboardStatCards;


