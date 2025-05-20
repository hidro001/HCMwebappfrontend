// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaUserCircle } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import ConfirmationDialog from "../../components/common/ConfirmationDialog";
// import usePunchStore from "../../store/usePunchStore";
// import useAuthStore from "../../store/store";

// // Helper to format seconds into HH:MM:SS
// function formatHMS(totalSeconds) {
//   const hrs = Math.floor(totalSeconds / 3600);
//   const mins = Math.floor((totalSeconds % 3600) / 60);
//   const secs = totalSeconds % 60;

//   const hh = hrs < 10 ? `0${hrs}` : hrs;
//   const mm = mins < 10 ? `0${mins}` : mins;
//   const ss = secs < 10 ? `0${secs}` : secs;
//   return `${hh}:${mm}:${ss}`;
// }

// export default function BreakCard() {
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [confirmProps, setConfirmProps] = useState({
//     title: "",
//     message: "",
//     onConfirm: () => {},
//   });

//   // Running break timer (for display)
//   const [elapsedBreakTime, setElapsedBreakTime] = useState("00:00:00");

//   // Pull user info from Auth store
//   const { userName, employeeId } = useAuthStore();

//   // Punch store
//   const {
//     todayAttendance,
//     userBreakType,
//     onBreak,
//     breakStartTime,
//     canPunchIn,
//     canPunchOut,
//     handlePunchIn,
//     handlePunchOut,
//     handleBreakStart,
//     handleBreakEnd,
//     fetchAttendanceData,
//     fetchTargetCoordinates,
//     fetchUserBreakType,
//     decidePunchState,
//     getUserLocation,
//     distance,
//   } = usePunchStore();

//   // Fetch data on mount
//   useEffect(() => {
//     fetchAttendanceData();
//     fetchTargetCoordinates();
//     fetchUserBreakType(employeeId);
//     getUserLocation(); // if location-based gating is needed
//   }, [employeeId]);

//   // Decide punch state after data is fetched
//   useEffect(() => {
//     decidePunchState();
//   }, [todayAttendance, distance]);

//   // =========================
//   // RUNNING BREAK TIMER
//   // =========================
//   useEffect(() => {
//     let timerId;
//     if (onBreak && breakStartTime) {
//       // set immediately
//       setElapsedBreakTime(calcTimeSince(breakStartTime));
//       // update every second
//       timerId = setInterval(() => {
//         setElapsedBreakTime(calcTimeSince(breakStartTime));
//       }, 1000);
//     } else {
//       // not on break or no breakStartTime => reset
//       setElapsedBreakTime("00:00:00");
//     }
//     return () => clearInterval(timerId);
//   }, [onBreak, breakStartTime]);

//   function calcTimeSince(startDate) {
//     const now = new Date();
//     const diffMs = now - new Date(startDate);
//     if (diffMs < 0) return "00:00:00";
//     const diffSeconds = Math.floor(diffMs / 1000);
//     return formatHMS(diffSeconds);
//   }

//   // =========================
//   // COMPUTE BREAK TIME USAGE
//   // =========================
//   // 1. total allocated (minutes)
//   const allocated =
//     userBreakType && userBreakType.breakHours
//       ? userBreakType.breakHours * 60
//       : 0;

//   // 2. total used so far from attendance's break durations
//   let totalUsedSoFar = 0;
//   if (todayAttendance?.breaks?.length) {
//     // sum up durations of completed breaks
//     totalUsedSoFar = todayAttendance.breaks.reduce(
//       (sum, br) => sum + (br.duration || 0),
//       0
//     );
//   }

//   // 3. If currently on break, add partial time since breakStart
//   if (onBreak && breakStartTime) {
//     const now = new Date();
//     const diffMs = now - new Date(breakStartTime);
//     const diffMins = Math.floor(diffMs / 60000);
//     totalUsedSoFar += diffMins;
//   }

//   // 4. remaining can go negative if user took more than allocated
//   const remaining = allocated - totalUsedSoFar;

//   // Attendance times
//   const checkInTime = todayAttendance?.login || "-----";
//   const checkOutTime = todayAttendance?.logout || "-----";

//   // total break used from attendance (excl. partial running time)
//   const totalBreakUsed = todayAttendance?.breaks
//     ? todayAttendance.breaks.reduce((sum, b) => sum + (b.duration || 0), 0)
//     : 0;

//   // Confirmation dialog
//   const openConfirmDialog = (title, message, onConfirm) => {
//     setConfirmProps({ title, message, onConfirm });
//     setConfirmDialogOpen(true);
//   };
//   const closeConfirmDialog = () => setConfirmDialogOpen(false);

//   // Punch In
//   const handleCheckInClick = () => {
//     if (!canPunchIn) {
//       toast.error("Cannot Punch In yet.");
//       return;
//     }
//     openConfirmDialog("Punch In", "Do you want to Punch In now?", async () => {
//       closeConfirmDialog();
//       await handlePunchIn();
//       decidePunchState();
//     });
//   };

//   // Punch Out
//   const handleCheckOutClick = () => {
//     if (!canPunchOut) {
//       toast.error("Cannot Punch Out yet.");
//       return;
//     }
//     openConfirmDialog(
//       "Punch Out",
//       "Are you sure you want to Punch Out?",
//       async () => {
//         closeConfirmDialog();
//         await handlePunchOut();
//         decidePunchState();
//       }
//     );
//   };

//   // Break Start
//   const handleBreakStartClick = () => {
//     openConfirmDialog(
//       "Start Break",
//       "Do you want to start your break now?",
//       async () => {
//         closeConfirmDialog();
//         await handleBreakStart(employeeId);
//       }
//     );
//   };

//   // Break End
//   const handleBreakEndClick = () => {
//     openConfirmDialog(
//       "End Break",
//       "Do you want to end your break now?",
//       async () => {
//         closeConfirmDialog();
//         await handleBreakEnd(employeeId);
//       }
//     );
//   };

//   return (
//     <motion.div
//       className="max-w-md w-full mx-auto p-4 rounded-lg shadow 
//                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
//                  space-y-4 border border-gray-400"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* MUI Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmDialogOpen}
//         title={confirmProps.title}
//         message={confirmProps.message}
//         onConfirm={confirmProps.onConfirm}
//         onCancel={closeConfirmDialog}
//         confirmText="Yes"
//         cancelText="No"
//       />

//       {/* Header / Profile */}
//       <div className="flex items-center space-x-3">
//         <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//           <FaUserCircle className="text-4xl text-gray-500 dark:text-gray-300" />
//         </div>
//         <div>
//           <h1 className="text-xl font-semibold">
//             {userName || "Unknown User"}
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             {employeeId || "No ID"}
//           </p>
//         </div>
//       </div>

//       {/* Times */}
//       <div className="flex justify-between text-sm">
//         <p>
//           Check In: <span className="font-bold p-1">{checkInTime}</span>
//         </p>
//         <p>
//           Check Out: <span className="font-bold p-1">{checkOutTime}</span>
//         </p>
//       </div>

//       {/* Punch In / Out Buttons */}
//       <div className="flex justify-around mt-2">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleCheckInClick}
//           className="px-4 py-2 bg-orange-100 dark:bg-orange-800 
//                      text-orange-700 dark:text-orange-100 
//                      rounded font-medium"
//           disabled={!canPunchIn}
//         >
//           Check In
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleCheckOutClick}
//           className="px-4 py-2 bg-red-100 dark:bg-red-800 
//                      text-red-700 dark:text-red-100 
//                      rounded font-medium"
//           disabled={!canPunchOut}
//         >
//           Check Out
//         </motion.button>
//       </div>

//       {/* Break Overview */}
//       <div className="border-t border-gray-200 dark:border-gray-700 pt-3 ">
//         <h2 className="text-sm font-semibold mb-1">Break Overview</h2>
//         <div className="text-sm flex justify-between ">
//           <p>
//             Break Used:{" "}
//             <span className="font-bold p-1">{totalBreakUsed} min</span>
//           </p>
//           <p>
//             Remaining Break:{" "}
//             <span className="font-bold p-1">{remaining} min</span>
//           </p>
//         </div>
//       </div>

//       {/* Break Buttons */}
//       <div className="flex justify-around mt-2">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBreakStartClick}
//           className="px-4 py-2 bg-green-100 dark:bg-green-800
//                      text-green-700 dark:text-green-100 
//                      rounded font-medium"
//           disabled={onBreak}
//         >
//           Break Start
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBreakEndClick}
//           className="px-4 py-2 bg-red-100 dark:bg-red-800
//                      text-red-700 dark:text-red-100 
//                      rounded font-medium"
//           disabled={!onBreak}
//         >
//           Break End
//         </motion.button>
//       </div>

//       {/* If on break, show running timer */}
//       {onBreak && (
//         <div className="mt-2 text-center text-sm text-green-600 dark:text-green-300">
//           Break Running:{" "}
//           <span className="font-semibold">{elapsedBreakTime}</span>
//         </div>
//       )}
//     </motion.div>
//   );
// }


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiUserLine, 
  RiTimeLine, 
  RiLoginCircleLine, 
  RiLogoutCircleLine,
  RiRestTimeLine,
  RiPauseCircleLine,
  RiPlayLine,
  RiStopLine,
  RiTimerFlashLine,
  RiCalendarCheckLine,
  RiArrowLeftRightLine
} from "react-icons/ri";
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
  const [activeTab, setActiveTab] = useState("status"); // status or breaks

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
  const remainingPercentage = allocated > 0 ? (remaining / allocated) * 100 : 0;
  const breakProgress = allocated > 0 ? (totalUsedSoFar / allocated) * 100 : 0;

  // Attendance times
  const checkInTime = todayAttendance?.login || "--:--";
  const checkOutTime = todayAttendance?.logout || "--:--";

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
      className="w-full max-w-md overflow-hidden rounded-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
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

      {/* Header - User Info */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
        <div className="relative p-5 flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <RiUserLine className="text-2xl text-white" />
          </div>
          <div className="text-white">
            <h2 className="text-xl font-medium">{userName || "Unknown User"}</h2>
            <div className="flex items-center text-white/80 text-sm">
              <RiCalendarCheckLine className="mr-1" />
              <span>ID: {employeeId || "No ID"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-100 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("status")}
          className={`flex-1 py-3 text-sm font-medium flex justify-center items-center gap-1 transition-colors ${
            activeTab === "status"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <RiTimeLine />
          Status
        </button>
        <button
          onClick={() => setActiveTab("breaks")}
          className={`flex-1 py-3 text-sm font-medium flex justify-center items-center gap-1 transition-colors ${
            activeTab === "breaks"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <RiRestTimeLine />
          Breaks
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "status" ? (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            {/* Today's Times */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex flex-col items-center justify-center">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <RiLoginCircleLine className="mr-1" />
                  Check In
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{checkInTime}</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex flex-col items-center justify-center">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <RiLogoutCircleLine className="mr-1" />
                  Check Out
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">{checkOutTime}</span>
              </div>
            </div>

            {/* Punch In/Out Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckInClick}
                disabled={!canPunchIn}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                  canPunchIn
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                <RiLoginCircleLine size={18} />
                Check In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleCheckOutClick}
                disabled={!canPunchOut}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                  canPunchOut
                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                <RiLogoutCircleLine size={18} />
                Check Out
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="breaks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            {/* Break Timer - if on break */}
            {onBreak && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-100 dark:border-green-900/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-green-700 dark:text-green-400">
                    <RiTimerFlashLine className="mr-2" size={20} />
                    <span className="font-medium">Break Running</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-green-700 dark:text-green-400">
                    {elapsedBreakTime}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${breakProgress}%` }}
                    transition={{ type: "spring", stiffness: 50 }}
                  ></motion.div>
                </div>
              </motion.div>
            )}

            {/* Break Overview */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <RiArrowLeftRightLine className="mr-1.5" />
                  Break Allocation
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{allocated} minutes total</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-3">
                <div 
                  className={`h-full rounded-full ${
                    remainingPercentage > 25 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                      : remainingPercentage > 10
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`} 
                  style={{ width: `${100 - Math.min(breakProgress, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">Used: </span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{totalUsedSoFar} min</span>
                </div>
                <div>
                  <span className="font-medium">Remaining: </span>
                  <span className={`font-bold ${
                    remaining > 15 
                      ? 'text-green-600 dark:text-green-400' 
                      : remaining > 5
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                  }`}>{remaining} min</span>
                </div>
              </div>
            </div>

            {/* Break Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBreakStartClick}
                disabled={onBreak}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                  !onBreak
                    ? "bg-gradient-to-r from-green-500 to-teal-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                <RiPlayLine size={18} />
                Start Break
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBreakEndClick}
                disabled={!onBreak}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                  onBreak
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }`}
              >
                <RiStopLine size={18} />
                End Break
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}