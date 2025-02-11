import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
import usePunchStore from "../../store/usePunchStore";
import useAuthStore from "../../store/store";

// Helper to format seconds into HH:MM:SS
function formatHMS(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const hh = hrs < 10 ? `0${hrs}` : hrs;
  const mm = mins < 10 ? `0${mins}` : mins;
  const ss = secs < 10 ? `0${secs}` : secs;
  return `${hh}:${mm}:${ss}`;
}

export default function BreakCard() {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmProps, setConfirmProps] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // Running break timer (for display)
  const [elapsedBreakTime, setElapsedBreakTime] = useState("00:00:00");

  // Pull user info from Auth store
  const { userName, employeeId } = useAuthStore();

  // Punch store
  const {
    todayAttendance,
    userBreakType,
    onBreak,
    breakStartTime,
    canPunchIn,
    canPunchOut,
    handlePunchIn,
    handlePunchOut,
    handleBreakStart,
    handleBreakEnd,
    fetchAttendanceData,
    fetchTargetCoordinates,
    fetchUserBreakType,
    decidePunchState,
    getUserLocation,
    distance,
  } = usePunchStore();

  // Fetch data on mount
  useEffect(() => {
    fetchAttendanceData();
    fetchTargetCoordinates();
    fetchUserBreakType(employeeId);
    getUserLocation(); // if location-based gating is needed
  }, [employeeId]);

  // Decide punch state after data is fetched
  useEffect(() => {
    decidePunchState();
  }, [todayAttendance, distance]);

  // =========================
  // RUNNING BREAK TIMER
  // =========================
  useEffect(() => {
    let timerId;
    if (onBreak && breakStartTime) {
      // set immediately
      setElapsedBreakTime(calcTimeSince(breakStartTime));
      // update every second
      timerId = setInterval(() => {
        setElapsedBreakTime(calcTimeSince(breakStartTime));
      }, 1000);
    } else {
      // not on break or no breakStartTime => reset
      setElapsedBreakTime("00:00:00");
    }
    return () => clearInterval(timerId);
  }, [onBreak, breakStartTime]);

  function calcTimeSince(startDate) {
    const now = new Date();
    const diffMs = now - new Date(startDate);
    if (diffMs < 0) return "00:00:00";
    const diffSeconds = Math.floor(diffMs / 1000);
    return formatHMS(diffSeconds);
  }

  // =========================
  // COMPUTE BREAK TIME USAGE
  // =========================
  // 1. total allocated (minutes)
  const allocated =
    userBreakType && userBreakType.breakHours
      ? userBreakType.breakHours * 60
      : 0;

  // 2. total used so far from attendance's break durations
  let totalUsedSoFar = 0;
  if (todayAttendance?.breaks?.length) {
    // sum up durations of completed breaks
    totalUsedSoFar = todayAttendance.breaks.reduce(
      (sum, br) => sum + (br.duration || 0),
      0
    );
  }

  // 3. If currently on break, add partial time since breakStart
  if (onBreak && breakStartTime) {
    const now = new Date();
    const diffMs = now - new Date(breakStartTime);
    const diffMins = Math.floor(diffMs / 60000);
    totalUsedSoFar += diffMins;
  }

  // 4. remaining can go negative if user took more than allocated
  const remaining = allocated - totalUsedSoFar;

  // Attendance times
  const checkInTime = todayAttendance?.login || "-----";
  const checkOutTime = todayAttendance?.logout || "-----";

  // total break used from attendance (excl. partial running time)
  const totalBreakUsed = todayAttendance?.breaks
    ? todayAttendance.breaks.reduce((sum, b) => sum + (b.duration || 0), 0)
    : 0;

  // Confirmation dialog
  const openConfirmDialog = (title, message, onConfirm) => {
    setConfirmProps({ title, message, onConfirm });
    setConfirmDialogOpen(true);
  };
  const closeConfirmDialog = () => setConfirmDialogOpen(false);

  // Punch In
  const handleCheckInClick = () => {
    if (!canPunchIn) {
      toast.error("Cannot Punch In yet.");
      return;
    }
    openConfirmDialog("Punch In", "Do you want to Punch In now?", async () => {
      closeConfirmDialog();
      await handlePunchIn();
      decidePunchState();
    });
  };

  // Punch Out
  const handleCheckOutClick = () => {
    if (!canPunchOut) {
      toast.error("Cannot Punch Out yet.");
      return;
    }
    openConfirmDialog(
      "Punch Out",
      "Are you sure you want to Punch Out?",
      async () => {
        closeConfirmDialog();
        await handlePunchOut();
        decidePunchState();
      }
    );
  };

  // Break Start
  const handleBreakStartClick = () => {
    openConfirmDialog(
      "Start Break",
      "Do you want to start your break now?",
      async () => {
        closeConfirmDialog();
        await handleBreakStart(employeeId);
      }
    );
  };

  // Break End
  const handleBreakEndClick = () => {
    openConfirmDialog(
      "End Break",
      "Do you want to end your break now?",
      async () => {
        closeConfirmDialog();
        await handleBreakEnd(employeeId);
      }
    );
  };

  return (
    <motion.div
      className="max-w-md w-full mx-auto p-4 rounded-lg shadow 
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                 space-y-4 border border-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* MUI Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title={confirmProps.title}
        message={confirmProps.message}
        onConfirm={confirmProps.onConfirm}
        onCancel={closeConfirmDialog}
        confirmText="Yes"
        cancelText="No"
      />

      {/* Header / Profile */}
      <div className="flex items-center space-x-3">
        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
          <FaUserCircle className="text-4xl text-gray-500 dark:text-gray-300" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{userName || "Unknown User"}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {employeeId || "No ID"}
          </p>
        </div>
      </div>

      {/* Times */}
      <div className="flex justify-between text-sm">
        <p>
          Check In: <span className="font-bold p-1">{checkInTime}</span>
        </p>
        <p>
          Check Out: <span className="font-bold p-1">{checkOutTime}</span>
        </p>
      </div>

      {/* Punch In / Out Buttons */}
      <div className="flex justify-around mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckInClick}
          className="px-4 py-2 bg-orange-100 dark:bg-orange-800 
                     text-orange-700 dark:text-orange-100 
                     rounded font-medium"
          disabled={!canPunchIn}
        >
          Check In
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckOutClick}
          className="px-4 py-2 bg-red-100 dark:bg-red-800 
                     text-red-700 dark:text-red-100 
                     rounded font-medium"
          disabled={!canPunchOut}
        >
          Check Out
        </motion.button>
      </div>

      {/* Break Overview */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 ">
        <h2 className="text-sm font-semibold mb-1">Break Overview</h2>
        <div className="text-sm flex justify-between ">
          <p>
            Break Used:{" "}
            <span className="font-bold p-1">{totalBreakUsed} min</span>
          </p>
          <p>
            Remaining Break:{" "}
            <span className="font-bold p-1">
              {remaining} min
            </span>
          </p>
        </div>
      </div>

      {/* Break Buttons */}
      <div className="flex justify-around mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBreakStartClick}
          className="px-4 py-2 bg-green-100 dark:bg-green-800
                     text-green-700 dark:text-green-100 
                     rounded font-medium"
          disabled={onBreak}
        >
          Break Start
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBreakEndClick}
          className="px-4 py-2 bg-red-100 dark:bg-red-800
                     text-red-700 dark:text-red-100 
                     rounded font-medium"
          disabled={!onBreak}
        >
          Break End
        </motion.button>
      </div>

      {/* If on break, show running timer */}
      {onBreak && (
        <div className="mt-2 text-center text-sm text-green-600 dark:text-green-300">
          Break Running: <span className="font-semibold">{elapsedBreakTime}</span>
        </div>
      )}
    </motion.div>
  );
}

