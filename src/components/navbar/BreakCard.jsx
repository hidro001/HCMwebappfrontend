// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaUserCircle } from 'react-icons/fa';
// import { toast, Toaster } from 'react-hot-toast';

// export default function BreakCard() {
//   const [checkInTime, setCheckInTime] = useState('11:15:29 AM');
//   const [checkOutTime, setCheckOutTime] = useState('-----');
//   const [totalBreak, setTotalBreak] = useState('01min 30sec');
//   const [remainingBreak, setRemainingBreak] = useState('15min 30sec');

//   // Example button handlers:
//   const handleCheckIn = () => {
//     toast.success('Checked in successfully!');
//   };

//   const handleCheckOut = () => {
//     toast.error('Checked out!');
//   };

//   const handleBreakStart = () => {
//     toast('Break started!', {
//       icon: '☕',
//     });
//   };

//   const handleBreakEnd = () => {
//     toast('Break ended!', {
//       icon: '✅',
//     });
//   };

//   return (
//     <motion.div
//       className="max-w-sm w-full mx-auto p-4 rounded-lg shadow 
//                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
//                  space-y-4"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* React Hot Toast container */}
//       <Toaster position="top-center" />

//       {/* Header / Profile */}
//       <div className="flex items-center space-x-3">
//         <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//           <FaUserCircle className="text-4xl text-gray-500 dark:text-gray-300" />
//         </div>
//         <div>
//           <h1 className="text-xl font-semibold">Riya Mishra</h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">RI0023</p>
//         </div>
//       </div>

//       {/* Times */}
//       <div className="flex justify-between text-sm">
//         <p>Check In: <span className="font-medium">{checkInTime}</span></p>
//         <p>Check Out: <span className="font-medium">{checkOutTime}</span></p>
//       </div>

//       {/* Buttons for CheckIn / CheckOut */}
//       <div className="flex justify-around mt-2">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleCheckIn}
//           className="px-4 py-2 bg-orange-100 dark:bg-orange-800 
//                      text-orange-700 dark:text-orange-100 
//                      rounded font-medium"
//         >
//           Check In
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleCheckOut}
//           className="px-4 py-2 bg-red-100 dark:bg-red-800 
//                      text-red-700 dark:text-red-100 
//                      rounded font-medium"
//         >
//           Check Out
//         </motion.button>
//       </div>

//       {/* Break Info */}
//       <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
//         <h2 className="text-sm font-semibold mb-1">Break Taken</h2>
//         <div className="text-sm flex justify-between">
//           <p>Total break : <span className="font-medium">{totalBreak}</span></p>
//           <p>
//             Remaining break :{' '}
//             <span className="font-medium">{remainingBreak}</span>
//           </p>
//         </div>
//       </div>

//       {/* Buttons for Break Start / Break End */}
//       <div className="flex justify-around mt-2">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBreakStart}
//           className="px-4 py-2 bg-green-100 dark:bg-green-800
//                      text-green-700 dark:text-green-100 
//                      rounded font-medium"
//         >
//           Break Start
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBreakEnd}
//           className="px-4 py-2 bg-red-100 dark:bg-red-800
//                      text-red-700 dark:text-red-100 
//                      rounded font-medium"
//         >
//           Break End
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FaUserCircle } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import ConfirmationDialog from "../../components/common/ConfirmationDialog"; 
// import usePunchStore from "../../store/usePunchStore"; 

// export default function BreakCard() {
//   // Local UI states
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [confirmProps, setConfirmProps] = useState({
//     title: "",
//     message: "",
//     onConfirm: () => {},
//   });

//   // In a real scenario, you'd get employee ID, userName, etc. from your global store or props
//   const employeeId = "RI0526";
//   const userName = "Riya Mishra";

//   // Zustand store: destructure data & actions
//   const {
//     todayAttendance,
//     remainingBreakMins,
//     onBreak,
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

//   // On mount, fetch initial data
//   useEffect(() => {
//     fetchAttendanceData();
//     fetchTargetCoordinates();
//     fetchUserBreakType(employeeId);
//     getUserLocation(); // if you want location-based gating
//   }, [employeeId]);

//   // After we get data & location, decide punch state
//   useEffect(() => {
//     decidePunchState();
//   }, [todayAttendance, distance]);

//   // We can show the times from the attendance record or local states
//   const checkInTime = todayAttendance?.login || "-----";
//   const checkOutTime = todayAttendance?.logout || "-----";

//   // For demonstration, let's also track total break from the record
//   // But you can pull this from an existing helper
//   const totalBreakUsed = (todayAttendance?.breaks || []).reduce(
//     (sum, br) => sum + (br.duration || 0),
//     0
//   );
//   // Format them as "XX min" if you want
//   const totalBreak = `${totalBreakUsed} min`;
//   const remaining = `${remainingBreakMins} min`;

//   // ----------- UI Handlers with Confirmation Dialog -----------

//   const openConfirmDialog = (title, message, onConfirm) => {
//     setConfirmProps({ title, message, onConfirm });
//     setConfirmDialogOpen(true);
//   };
//   const closeConfirmDialog = () => {
//     setConfirmDialogOpen(false);
//   };

//   const handleCheckInClick = () => {
//     if (!canPunchIn) {
//       toast.error("Cannot Punch In yet.");
//       return;
//     }
//     openConfirmDialog("Punch In", "Do you want to Punch In now?", async () => {
//       closeConfirmDialog();
//       await handlePunchIn();
//       // Optionally re-check
//       decidePunchState();
//     });
//   };

//   const handleCheckOutClick = () => {
//     if (!canPunchOut) {
//       toast.error("Cannot Punch Out yet.");
//       return;
//     }
//     openConfirmDialog("Punch Out", "Are you sure you want to Punch Out?", async () => {
//       closeConfirmDialog();
//       await handlePunchOut();
//       // Optionally re-check
//       decidePunchState();
//     });
//   };

//   const handleBreakStartClick = () => {
//     openConfirmDialog("Start Break", "Do you want to start your break now?", async () => {
//       closeConfirmDialog();
//       await handleBreakStart(employeeId);
//     });
//   };

//   const handleBreakEndClick = () => {
//     openConfirmDialog("End Break", "Do you want to end your break now?", async () => {
//       closeConfirmDialog();
//       await handleBreakEnd(employeeId);
//     });
//   };

//   return (
//     <motion.div
//       className="max-w-sm w-full mx-auto p-4 rounded-lg shadow 
//                  bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
//                  space-y-4"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       {/* MUI ConfirmationDialog */}
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
//           <h1 className="text-xl font-semibold">{userName}</h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">{employeeId}</p>
//         </div>
//       </div>

//       {/* Times */}
//       <div className="flex justify-between text-sm">
//         <p>
//           Check In:{" "}
//           <span className="font-medium">{checkInTime}</span>
//         </p>
//         <p>
//           Check Out:{" "}
//           <span className="font-medium">{checkOutTime}</span>
//         </p>
//       </div>

//       {/* Buttons for CheckIn / CheckOut */}
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

//       {/* Break Info */}
//       <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
//         <h2 className="text-sm font-semibold mb-1">Break Taken</h2>
//         <div className="text-sm flex justify-between">
//           <p>
//             Total break :{" "}
//             <span className="font-medium">{totalBreak}</span>
//           </p>
//           <p>
//             Remaining break :{" "}
//             <span className="font-medium">{remaining}</span>
//           </p>
//         </div>
//       </div>

//       {/* Buttons for Break Start / Break End */}
//       <div className="flex justify-around mt-2">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBreakStartClick}
//           className="px-4 py-2 bg-green-100 dark:bg-green-800
//                      text-green-700 dark:text-green-100 
//                      rounded font-medium"
//           disabled={onBreak} // Can't start break if onBreak is true
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
//           disabled={!onBreak} // Only enable if onBreak is true
//         >
//           Break End
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../../components/common/ConfirmationDialog"; 
import usePunchStore from "../../store/usePunchStore";
import useAuthStore from "../../store/store"; // The store where employeeId & userName are stored

export default function BreakCard() {
  // Local UI states
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmProps, setConfirmProps] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  // ---- Pull userName & employeeId from Auth Store (instead of hard-coding)
  const { userName, employeeId } = useAuthStore();

  // Zustand punch store: destructure data & actions
  const {
    todayAttendance,
    remainingBreakMins,
    onBreak,
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

  // On mount, fetch data
  useEffect(() => {
    fetchAttendanceData();
    fetchTargetCoordinates();
    fetchUserBreakType(employeeId);
    getUserLocation(); // if you want location-based gating
  }, [employeeId]);

  // After data & location are loaded, decide punch state
  useEffect(() => {
    decidePunchState();
  }, [todayAttendance, distance]);

  // Check In/Out times
  const checkInTime = todayAttendance?.login || "-----";
  const checkOutTime = todayAttendance?.logout || "-----";

  // Compute total break usage (in minutes) from today's attendance
  const totalBreakUsed = (todayAttendance?.breaks || []).reduce(
    (sum, br) => sum + (br.duration || 0),
    0
  );
  const totalBreak = `${totalBreakUsed} min`;
  const remaining = `${remainingBreakMins} min`;

  // ----------- Confirmation Dialog Handlers -----------
  const openConfirmDialog = (title, message, onConfirm) => {
    setConfirmProps({ title, message, onConfirm });
    setConfirmDialogOpen(true);
  };
  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

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
    openConfirmDialog("Punch Out", "Are you sure you want to Punch Out?", async () => {
      closeConfirmDialog();
      await handlePunchOut();
      decidePunchState();
    });
  };

  // Break Start
  const handleBreakStartClick = () => {
    openConfirmDialog("Start Break", "Do you want to start your break now?", async () => {
      closeConfirmDialog();
      await handleBreakStart(employeeId);
    });
  };

  // Break End
  const handleBreakEndClick = () => {
    openConfirmDialog("End Break", "Do you want to end your break now?", async () => {
      closeConfirmDialog();
      await handleBreakEnd(employeeId);
    });
  };

  return (
    <motion.div
      className="max-w-sm w-full mx-auto p-4 rounded-lg shadow 
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                 space-y-4"
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
          Check In: <span className="font-medium">{checkInTime}</span>
        </p>
        <p>
          Check Out: <span className="font-medium">{checkOutTime}</span>
        </p>
      </div>

      {/* Buttons for CheckIn / CheckOut */}
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

      {/* Break Info */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <h2 className="text-sm font-semibold mb-1">Break Taken</h2>
        <div className="text-sm flex justify-between">
          <p>
            Total break : <span className="font-medium">{totalBreak}</span>
          </p>
          <p>
            Remaining break : <span className="font-medium">{remaining}</span>
          </p>
        </div>
      </div>

      {/* Buttons for Break Start / Break End */}
      <div className="flex justify-around mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBreakStartClick}
          className="px-4 py-2 bg-green-100 dark:bg-green-800
                     text-green-700 dark:text-green-100 
                     rounded font-medium"
          disabled={onBreak} // disable if already on a break
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
          disabled={!onBreak} // enable only if currently on a break
        >
          Break End
        </motion.button>
      </div>
    </motion.div>
  );
}

