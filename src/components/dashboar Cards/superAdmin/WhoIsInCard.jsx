

import React, { useEffect, useState } from "react";
import { getAttendanceData } from "../../../service/dashboardService";

/**
 * Returns today's date as a string in YYYY-MM-DD format.
 */
function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function AttendanceSummary() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Use today's date by default (self-contained component)
  const today = getTodayString();

  useEffect(() => {
    setLoading(true);
    setErrorMsg("");

    getAttendanceData(today)
      .then((res) => {
        if (res.success) {
          const { whoIsIn, lateArrival, onTime } = res.data || {};

          // Build your sections array
          const sectionsData = [
            {
              title: "Who is in?",
              users: whoIsIn?.users?.map(mapUserToSection) || [],
              more: whoIsIn?.more || 0,
            },
            {
              title: "Late Arrival",
              users: lateArrival?.users?.map(mapUserToSection) || [],
              more: lateArrival?.more || 0,
            },
            {
              title: "On Time",
              users: onTime?.users?.map(mapUserToSection) || [],
              more: onTime?.more || 0,
            },
          ];

          setSections(sectionsData);
        } else {
          setErrorMsg(res.message || "Failed to fetch attendance");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message || "Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [today]);

  /**
   * Converts a single attendance document into an object
   * that matches the structure your UI code expects.
   */
  const mapUserToSection = (attendanceDoc) => {
    const avatar = attendanceDoc?.userData?.avatar || "";
    const fullName = attendanceDoc?.userData?.name || "Unknown User";

    if (avatar) {
      return { img: avatar };
    }

    const initials = fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return {
      initials,
      type: "red", // or any logic for color if desired
    };
  };

  // Check if ALL sections are empty (no user data)
  const hasNoData = sections.every((section) => section.users.length === 0);

  // We'll wrap *all* states in the same container so the UI is consistent
  const containerClasses = `
    w-full md:w-1/2
    bg-white dark:bg-gray-800
    text-gray-800 dark:text-gray-100
    rounded-xl
    shadow-2xl
    p-4
  `;

  if (loading) {
    return (
      <div className={containerClasses}>
        <div className="text-gray-700 dark:text-gray-300">
          Loading attendance data for {today}...
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className={containerClasses}>
        <div className="text-red-500">Error: {errorMsg}</div>
      </div>
    );
  }

  if (hasNoData) {
    return (
      <div className={`${containerClasses} flex flex-col items-center justify-center p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800`}>
      <div className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
        📅 No Attendance Records for Today.
      </div>
    </div>
    
    );
  }

  // Render the normal UI if there's data
  return (
    <div className={containerClasses}>
      {sections.map((section, index) => (
        <div key={index} className="mt-4 first:mt-0">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {section.title}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {section.users.map((user, userIndex) => {
              // Case 1: user has an avatar
              if (user.img) {
                return (
                  <img
                    key={userIndex}
                    loading="lazy"
                    src={user.img}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                );
              }
              // Case 2: user has initials
              return (
                <div
                  key={userIndex}
                  className={`
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full
                    text-sm font-medium
                    bg-white dark:bg-gray-700
                    text-gray-600 dark:text-gray-100
                    border
                    border-${user.type}-300 dark:border-${user.type}-600
                  `}
                >
                  {user.initials}
                </div>
              );
            })}

            {section.more > 0 && (
              <div className="text-lime-600 dark:text-lime-400 text-sm font-semibold">
                +{section.more} More
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttendanceSummary;
