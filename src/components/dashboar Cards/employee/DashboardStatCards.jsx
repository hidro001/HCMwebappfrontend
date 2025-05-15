import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
// React Icons
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
// Import the service function
import { getDashboardStats } from "../../../service/dashboardService";

function DashboardStatCards() {
  // Local state for the three stats
  const [totalLoggedIn, setTotalLoggedIn] = useState(0);
  const [totalLeavesTaken, setTotalLeavesTaken] = useState(0);
  const [totalTaskPending, setTotalTaskPending] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  // Function to fetch stats from the service
  const fetchStats = async () => {
    try {
      const res = await getDashboardStats(); 
      // { success: boolean, data: { totalLoggedIn, totalLeavesTaken, totalTaskPending } }
      if (res.success) {
        const { totalLoggedIn, totalLeavesTaken, totalTaskPending } = res.data;
        setTotalLoggedIn(totalLoggedIn);
        setTotalLeavesTaken(totalLeavesTaken);
        setTotalTaskPending(totalTaskPending);
      } else {
        console.error("Failed to fetch stats: success=false", res.message);
      }
    } catch (error) {
      console.error("Error in fetchStats:", error);
    }
  };

  // Wave images
  const waveLightGreen = "https://cdn.builder.io/api/v1/image/assets/TEMP/a91cd45b-c76f-4c19-8f57-d0142fc9304c";
  const waveDarkGreen = "https://iili.io/2D0pyIn.png";

  const waveLightYellow = "https://cdn.builder.io/api/v1/image/assets/TEMP/14c3fe2b-6284-40fc-a837-4d939737641c";
  const waveDarkYellow = "https://iili.io/2D0mtDu.png";

  const waveLightRed = "https://cdn.builder.io/api/v1/image/assets/TEMP/bcc2ae50-6637-4179-8a2a-a3fceaca0d9f";
  const waveDarkRed = "https://iili.io/2D0bZCv.png";

  // Prepare stat card data
  const statCardsData = [
    {
      icon: <FaUsers className="text-blue-600" />,
      count: totalLoggedIn,
      label: "Total Logged In",
      chartLight: waveLightGreen,
      chartDark: waveDarkGreen,
      viewAllLink: "/dashboard/view-attendance", // <-- Add this link
    },
    {
      icon: <FaUserCheck className="text-green-600" />,
      count: totalLeavesTaken,
      label: "Total Leaves Taken",
      chartLight: waveLightYellow,
      chartDark: waveDarkYellow,
      viewAllLink: "/dashboard/leave-history", // <-- Add this link
    },
    {
      icon: <FaUserTimes className="text-red-600" />,
      count: totalTaskPending,
      label: "Total Task Pending",
      chartLight: waveLightRed,
      chartDark: waveDarkRed,
      viewAllLink: "/dashboard/assigned-task/employee", // <-- Add this link
    },
  ];
  

  return (
    <div className="flex flex-col gap-5 md:flex-row bg-blend-darken">
      {statCardsData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
}

export default DashboardStatCards;
