
// import { create } from "zustand";
// import axiosInstance from "../service/axiosInstance"; 
// import { toast } from "react-hot-toast";



// function parseShiftTiming(shiftTimingStr) {
//   const regex = /\((\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\)/;
//   const match = shiftTimingStr?.match(regex);
//   if (match) {
//     const [_, startHour, startMinute, endHour, endMinute] = match;
//     return {
//       startHour: parseInt(startHour, 10),
//       startMinute: parseInt(startMinute, 10),
//       endHour: parseInt(endHour, 10),
//       endMinute: parseInt(endMinute, 10),
//     };
//   }
//   return null;
// }

// function calculateDistance(coords1, coords2) {
//   const toRad = (val) => (val * Math.PI) / 180;
//   const R = 6371e3; // meters
//   const lat1 = toRad(coords1.latitude);
//   const lat2 = toRad(coords2.latitude);
//   const dLat = lat2 - lat1;
//   const dLon = toRad(coords2.longitude - coords1.longitude);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function getTotalBreakTime(todayAttendance) {
//   if (!todayAttendance || !todayAttendance.breaks) return 0;
//   return todayAttendance.breaks.reduce((sum, br) => sum + (br.duration || 0), 0);
// }

// // ------------------------------------------------
// //  Zustand store
// // ------------------------------------------------
// const usePunchStore = create((set, get) => ({
//   // State
//   targetCoordinates: null,
//   shiftStartTime: null,
//   shiftEndTime: null,
//   shiftStartMinusTwoHours: null,
//   todayAttendance: null,
//   attendanceData: [],
//   userBreakType: null,
//   onBreak: false,
//   remainingBreakMins: 0,
//   breakStartTime: null,
//   canPunchIn: false,
//   canPunchOut: false,
//   error: null,
//   isLoading: false,

//   // (Optional) location-based states
//   userCoordinates: null,
//   distance: null,

//   // For direct setting of error if needed
//   setError: (error) => set({ error }),


//   fetchTargetCoordinates: async () => {
//     try {
//       set({ isLoading: true, error: null });
//       const res = await axiosInstance.get("/employee/punchtime");
//       if (res.data?.success) {
//         const data = res.data.data || {};
//         const coords = {
//           latitude: parseFloat(data.latitude),
//           longitude: parseFloat(data.longitude),
//         };

//         // parse shift timing
//         let shiftStartTime = null,
//           shiftEndTime = null,
//           shiftStartMinusTwoHours = null;

//         if (data.shift_Timing) {
//           const parsed = parseShiftTiming(data.shift_Timing);
//           if (parsed) {
//             const { startHour, startMinute, endHour, endMinute } = parsed;
//             const shiftStart = new Date();
//             shiftStart.setHours(startHour, startMinute, 0, 0);
//             const shiftEnd = new Date();
//             shiftEnd.setHours(endHour, endMinute, 0, 0);

//             shiftStartTime = shiftStart;
//             shiftEndTime = shiftEnd;
//             shiftStartMinusTwoHours = new Date(
//               shiftStart.getTime() - 2 * 3600_000
//             );
//           }
//         }

//         set({
//           targetCoordinates: coords,
//           shiftStartTime,
//           shiftEndTime,
//           shiftStartMinusTwoHours,
//         });
//       } else {
//         throw new Error(res.data?.message || "Failed to fetch punchtime coords");
//       }
//     } catch (err) {
//       console.error(err);
//       set({
//         error: `Coordinates Error: ${err.message}`,
//       });
//     } finally {
//       set({ isLoading: false });
//     }
//   },


// fetchAttendanceData: async () => {
//     try {
//       set({ isLoading: true, error: null });
//       const res = await axiosInstance.get("/employee/attendence");
//       if (res.data.success) {
//         const allAttendance = res.data.data || [];
//         set({ attendanceData: allAttendance });
  
//         // find today's record
//         const todayStr = new Date().toISOString().split("T")[0];
//         const recordForToday = allAttendance.find(
//           (item) => item.date === todayStr
//         );
  
//         if (recordForToday) {
//           let onBreak = false;
//           let breakStartTime = null;
  
//           // Check if the user is on a running break
//           if (recordForToday.breaks?.length) {
//             const lastBreak = recordForToday.breaks[recordForToday.breaks.length - 1];
//             if (lastBreak.breakStatus === "Running") {
//               onBreak = true;
//               // IMPORTANT: Set breakStartTime from the server's 'start'
//               // so the timer can continue after a page refresh
//               breakStartTime = new Date(lastBreak.start);
//             }
//           }
  
//           set({
//             todayAttendance: recordForToday,
//             onBreak,
//             breakStartTime, // <-- store from server if Running
//           });
//         } else {
//           // No attendance for today => no break
//           set({
//             todayAttendance: null,
//             onBreak: false,
//             breakStartTime: null,
//           });
//         }
//       } else {
//         throw new Error(
//           res.data?.message || "Failed to fetch attendance data"
//         );
//       }
//     } catch (err) {
//       console.error(err);
//       set({
//         error: `Attendance Error: ${err.message}`,
//       });
//     } finally {
//       set({ isLoading: false });
//     }
//   },
  




//   // 3. FETCH USER BREAK TYPE
//   fetchUserBreakType: async (employeeId) => {
//     try {
//       const res = await axiosInstance.get(
//         `/employee/attendence/getUserBreakType/${employeeId}`
//       );
//       if (res.data.success && res.data.data?.break_Type) {
//         const bType = res.data.data.break_Type; // e.g. { breakHours: 1, ... }
//         const totalMins = bType.breakHours * 60;
//         set({
//           userBreakType: bType,
//           remainingBreakMins: totalMins,
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching user break type:", err.message);
//       // not setting an error toast here because it might be optional
//     }
//   },

 
//   decidePunchState: () => {
//     const {
//       targetCoordinates,
//       shiftStartMinusTwoHours,
//       todayAttendance,
//       distance,
//     } = get();
  
//     // Reset first
//     set({ canPunchIn: false, canPunchOut: false });
//     if (!targetCoordinates || !shiftStartMinusTwoHours) return;
  
//     const now = new Date();
  
//     // Detect if device is mobile
//     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//     );
  
//     // Check attendance record conditions
//     if (todayAttendance) {
//       const { login, logout, attendance_mode } = todayAttendance;
//       // For Biometric devices, only allow Punch Out if not yet logged out.
//       if (attendance_mode === "BiometricDevice") {
//         if (!logout) {
//           set({ canPunchOut: true });
//         }
//         return;
//       }
  
//       // If already logged in and not logged out => enable Punch Out
//       if (login && !logout) {
//         set({ canPunchOut: true });
//       } else if (!login) {
//         // Allow Punch In if current time is past shiftStartMinusTwoHours
//         if (now >= shiftStartMinusTwoHours) {
//           if (!isMobile) {
//             // For desktop devices, ignore location check
//             set({ canPunchIn: true });
//           } else {
//             // For mobile devices, enforce location check (distance <= 50 meters)
//             if (distance !== null && distance <= 50) {
//               set({ canPunchIn: true });
//             }
//           }
//         }
//       }
//     } else {
//       // If there's no attendance record for today
//       if (now >= shiftStartMinusTwoHours) {
//         if (!isMobile) {
//           // For desktop devices, ignore location check
//           set({ canPunchIn: true });
//         } else {
//           if (distance !== null && distance <= 50) {
//             set({ canPunchIn: true });
//           }
//         }
//       }
//     }
//   },
  

//   // 5. PUNCH IN
//   handlePunchIn: async () => {
//     try {
//       const now = new Date();
//       const date = now.toISOString().split("T")[0];
//       const day = now.toLocaleDateString("en-us", { weekday: "long" });
//       const loginTime = now.toLocaleTimeString();

//       set({ isLoading: true });
//       const res = await axiosInstance.post("/employee/attendence/punchin", {
//         date,
//         day,
//         login: loginTime,
//         status: "Present",
//       });

//       if (res.data.success) {
//         toast.success("You have punched in successfully!");
//         // Re-fetch attendance
//         await get().fetchAttendanceData();
//       } else {
//         throw new Error(res.data.message || "Failed to punch in");
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error(err);
//       set({ error: err.message });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // 6. PUNCH OUT
//   handlePunchOut: async () => {
//     try {
//       const now = new Date();
//       const date = now.toISOString().split("T")[0];
//       const day = now.toLocaleDateString("en-us", { weekday: "long" });
//       const logoutTime = now.toLocaleTimeString();

//       set({ isLoading: true });
//       const res = await axiosInstance.post("/employee/attendence/punchout", {
//         date,
//         day,
//         logout: logoutTime,
//         status: "Present",
//       });

//       if (res.data.success) {
//         toast.success("You have punched out successfully!");
//         // Re-fetch attendance
//         await get().fetchAttendanceData();
//       } else {
//         throw new Error(res.data.message || "Failed to punch out");
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error(err);
//       set({ error: err.message });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // 7. START BREAK
//   handleBreakStart: async (employeeId) => {
//     const { onBreak, remainingBreakMins, todayAttendance } = get();
//     if (onBreak) {
//       toast.error("A break is already running!");
//       return;
//     }
//     if (remainingBreakMins <= 0) {
//       toast.error("You have no remaining break minutes!");
//       return;
//     }
//     if (!todayAttendance?.login) {
//       toast.error("You haven't Punched In yet!");
//       return;
//     }

//     try {
//       set({ isLoading: true });
//       const res = await axiosInstance.post("/employee/attendence/startBreak", {
//         employeeId,
//       });
//       if (res.data.success) {
//         toast("Break started!", { icon: "☕" });
//         // update store state
//         const updated = res.data.data;
//         let isRunning = false;
//         if (updated.breaks?.length) {
//           const lastB = updated.breaks[updated.breaks.length - 1];
//           isRunning = lastB.breakStatus === "Running";
//         }
//         set({
//           onBreak: isRunning,
//           breakStartTime: new Date(), // mark local start time
//         });
//       } else {
//         throw new Error(res.data.message || "Failed to start break");
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error(err);
//       set({ error: err.message });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // 8. END BREAK
//   handleBreakEnd: async (employeeId) => {
//     const { onBreak, breakStartTime, remainingBreakMins } = get();
//     if (!onBreak) {
//       toast.error("You are not currently on a break!");
//       return;
//     }
//     try {
//       set({ isLoading: true });
//       const res = await axiosInstance.post("/employee/attendence/endBreak", {
//         employeeId,
//       });
//       if (res.data.success) {
//         toast("Break ended!", { icon: "✅" });
//         // update store states
//         const updated = res.data.data;
//         let isRunning = false;
//         if (updated.breaks?.length) {
//           const lastB = updated.breaks[updated.breaks.length - 1];
//           isRunning = lastB.breakStatus === "Running";
//         }

//         // calculate how many minutes were used
//         let newRemaining = remainingBreakMins;
//         if (breakStartTime) {
//           const now = new Date();
//           const diffMs = now - breakStartTime;
//           const diffMins = Math.floor(diffMs / 60000);
//         //   newRemaining = Math.max(remainingBreakMins - diffMins, 0);
//         newRemaining = remainingBreakMins - diffMins;
//         }

//         set({
//           onBreak: isRunning,
//           breakStartTime: null,
//           remainingBreakMins: newRemaining,
//         });
//         await get().fetchAttendanceData();  
//       } else {
//         throw new Error(res.data.message || "Failed to end break");
//       }
//     } catch (err) {
//       toast.error(err.message);
//       console.error(err);
//       set({ error: err.message });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

 
// getUserLocation: () => {
 
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   );

//   // If not mobile, simply exit without asking for location permission.
//   if (!isMobile) {
//     console.log("Not a mobile device; skipping geolocation.");
//     return;
//   }

//   if (!navigator.geolocation) {
//     toast.error("Geolocation not supported.");
//     return;
//   }
  
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const userCoords = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };
//       set({ userCoordinates: userCoords });
//       const { targetCoordinates } = get();
//       if (targetCoordinates) {
//         const dist = calculateDistance(userCoords, targetCoordinates);
//         set({ distance: dist });
//       }
//     },
//     (err) => {
//       if (err.code === err.PERMISSION_DENIED) {
//         toast.error("Location permission denied.");
//       } else {
//         // Optionally handle other errors
//         console.error("Geolocation error:", err.message);
//       }
//     },
//     { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//   );
// },


// }));

// export default usePunchStore;




import { create } from "zustand";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

/**
 * Updated parser: now expects an object of the form
 * { id: string, name: string, startTime: "HH:MM", endTime: "HH:MM" }
 */
function parseShiftTiming(shiftTimingObj) {
  if (!shiftTimingObj) return null;
  const { startTime, endTime } = shiftTimingObj;
  if (!startTime || !endTime) return null;

  // e.g. "10:00" => ["10", "00"]
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  return {
    startHour: parseInt(startHour, 10),
    startMinute: parseInt(startMinute, 10),
    endHour: parseInt(endHour, 10),
    endMinute: parseInt(endMinute, 10),
  };
}

function calculateDistance(coords1, coords2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371e3; // meters
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);
  const dLat = lat2 - lat1;
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in meters
}

const usePunchStore = create((set, get) => ({
  // ------------------
  // State Variables
  // ------------------
  targetCoordinates: null,
  shiftStartTime: null,
  shiftEndTime: null,
  shiftStartMinusTwoHours: null,
  todayAttendance: null,
  attendanceData: [],
  userBreakType: null,
  onBreak: false,
  remainingBreakMins: 0,
  breakStartTime: null,
  canPunchIn: false,
  canPunchOut: false,
  error: null,
  isLoading: false,

  // For location-based states
  userCoordinates: null,
  distance: null,

  // ------------------
  // Shared Actions
  // ------------------
  setError: (error) => set({ error }),

  // 1) Fetch Coordinates & Shift Times
  fetchTargetCoordinates: async () => {
    try {
      set({ isLoading: true, error: null });

      // Call your endpoint: /employee/punchtime
      const res = await axiosInstance.get("/employee/punchtime");
      if (res.data?.success) {
        const data = res.data.data || {};
        // Convert lat/long to numbers
        const coords = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };

        // Parse shift timing from object
        let shiftStartTime = null;
        let shiftEndTime = null;
        let shiftStartMinusTwoHours = null;

        if (data.shift_Timing) {
          const parsed = parseShiftTiming(data.shift_Timing);
          if (parsed) {
            const { startHour, startMinute, endHour, endMinute } = parsed;
            const shiftStart = new Date();
            shiftStart.setHours(startHour, startMinute, 0, 0);

            const shiftEnd = new Date();
            shiftEnd.setHours(endHour, endMinute, 0, 0);

            shiftStartTime = shiftStart;
            shiftEndTime = shiftEnd;
            shiftStartMinusTwoHours = new Date(
              shiftStart.getTime() - 2 * 3600_000
            );
          }
        }

        set({
          targetCoordinates: coords,
          shiftStartTime,
          shiftEndTime,
          shiftStartMinusTwoHours,
        });
      } else {
        throw new Error(res.data?.message || "Failed to fetch punchtime coords");
      }
    } catch (err) {
      console.error(err);
      set({ error: `Coordinates Error: ${err.message}` });
    } finally {
      set({ isLoading: false });
    }
  },

  // 2) Fetch Attendance
  fetchAttendanceData: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/employee/attendence");
      if (res.data.success) {
        const allAttendance = res.data.data || [];
        set({ attendanceData: allAttendance });

        // Find today's record
        const todayStr = new Date().toISOString().split("T")[0];
        const recordForToday = allAttendance.find(
          (item) => item.date === todayStr
        );

        if (recordForToday) {
          let onBreak = false;
          let breakStartTime = null;

          // Check if the user is on a running break
          if (recordForToday.breaks?.length) {
            const lastBreak =
              recordForToday.breaks[recordForToday.breaks.length - 1];
            if (lastBreak.breakStatus === "Running") {
              onBreak = true;
              // Set breakStartTime from the server’s 'start'
              breakStartTime = new Date(lastBreak.start);
            }
          }

          set({
            todayAttendance: recordForToday,
            onBreak,
            breakStartTime,
          });
        } else {
          // No attendance for today => no break
          set({
            todayAttendance: null,
            onBreak: false,
            breakStartTime: null,
          });
        }
      } else {
        throw new Error(
          res.data?.message || "Failed to fetch attendance data"
        );
      }
    } catch (err) {
      console.error(err);
      set({ error: `Attendance Error: ${err.message}` });
    } finally {
      set({ isLoading: false });
    }
  },

  // 3) Fetch User Break Type
  fetchUserBreakType: async (employeeId) => {
    try {
      const res = await axiosInstance.get(
        `/employee/attendence/getUserBreakType/${employeeId}`
      );
      if (res.data.success && res.data.data?.break_Type) {
        const bType = res.data.data.break_Type; // e.g. { breakHours: 1, ... }
        const totalMins = bType.breakHours * 60;
        set({
          userBreakType: bType,
          remainingBreakMins: totalMins,
        });
      }
    } catch (err) {
      console.error("Error fetching user break type:", err.message);
      // optional: set an error or show toast if needed
    }
  },

  // 4) Decide whether to enable Punch In / Out
  decidePunchState: () => {
    const {
      targetCoordinates,
      shiftStartMinusTwoHours,
      todayAttendance,
      distance,
    } = get();

    // Reset
    set({ canPunchIn: false, canPunchOut: false });

    // If we have no shift timing or coordinates, bail out
    if (!targetCoordinates || !shiftStartMinusTwoHours) {
      return;
    }

    const now = new Date();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (todayAttendance) {
      const { login, logout, attendance_mode } = todayAttendance;

      // If attendance mode is Biometric, only Punch Out if not logged out
      if (attendance_mode === "BiometricDevice") {
        if (!logout) {
          set({ canPunchOut: true });
        }
        return;
      }

      // If user is already logged in and not logged out => can Punch Out
      if (login && !logout) {
        set({ canPunchOut: true });
      } else if (!login) {
        // Not logged in => check if current time >= shiftStartMinusTwoHours
        if (now >= shiftStartMinusTwoHours) {
          // If not on mobile, ignore location check
          if (!isMobile) {
            set({ canPunchIn: true });
          } else {
            // On mobile, enforce location check (distance <= 50m)
            if (distance !== null && distance <= 50) {
              set({ canPunchIn: true });
            }
          }
        }
      }
    } else {
      // No attendance record for today => same logic
      if (now >= shiftStartMinusTwoHours) {
        if (!isMobile) {
          set({ canPunchIn: true });
        } else {
          if (distance !== null && distance <= 50) {
            set({ canPunchIn: true });
          }
        }
      }
    }
  },

  // 5) Punch In
  handlePunchIn: async () => {
    try {
      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const day = now.toLocaleDateString("en-us", { weekday: "long" });
      const loginTime = now.toLocaleTimeString();

      set({ isLoading: true });

      const res = await axiosInstance.post("/employee/attendence/punchin", {
        date,
        day,
        login: loginTime,
        status: "Present",
      });

      if (res.data.success) {
        toast.success("You have punched in successfully!");
        await get().fetchAttendanceData();
      } else {
        throw new Error(res.data.message || "Failed to punch in");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 6) Punch Out
  handlePunchOut: async () => {
    try {
      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const day = now.toLocaleDateString("en-us", { weekday: "long" });
      const logoutTime = now.toLocaleTimeString();

      set({ isLoading: true });

      const res = await axiosInstance.post("/employee/attendence/punchout", {
        date,
        day,
        logout: logoutTime,
        status: "Present",
      });

      if (res.data.success) {
        toast.success("You have punched out successfully!");
        await get().fetchAttendanceData();
      } else {
        throw new Error(res.data.message || "Failed to punch out");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 7) Start Break
  handleBreakStart: async (employeeId) => {
    const { onBreak, remainingBreakMins, todayAttendance } = get();
    if (onBreak) {
      toast.error("A break is already running!");
      return;
    }
    if (remainingBreakMins <= 0) {
      toast.error("You have no remaining break minutes!");
      return;
    }
    if (!todayAttendance?.login) {
      toast.error("You haven't Punched In yet!");
      return;
    }

    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/employee/attendence/startBreak", {
        employeeId,
      });
      if (res.data.success) {
        toast("Break started!", { icon: "☕" });
        const updated = res.data.data;
        let isRunning = false;
        if (updated.breaks?.length) {
          const lastB = updated.breaks[updated.breaks.length - 1];
          isRunning = lastB.breakStatus === "Running";
        }
        set({
          onBreak: isRunning,
          breakStartTime: new Date(),
        });
      } else {
        throw new Error(res.data.message || "Failed to start break");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 8) End Break
  handleBreakEnd: async (employeeId) => {
    const { onBreak, breakStartTime, remainingBreakMins } = get();
    if (!onBreak) {
      toast.error("You are not currently on a break!");
      return;
    }
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/employee/attendence/endBreak", {
        employeeId,
      });
      if (res.data.success) {
        toast("Break ended!", { icon: "✅" });
        const updated = res.data.data;
        let isRunning = false;
        if (updated.breaks?.length) {
          const lastB = updated.breaks[updated.breaks.length - 1];
          isRunning = lastB.breakStatus === "Running";
        }

        // Calculate how many minutes were used
        let newRemaining = remainingBreakMins;
        if (breakStartTime) {
          const now = new Date();
          const diffMs = now - breakStartTime;
          const diffMins = Math.floor(diffMs / 60000);
          newRemaining = remainingBreakMins - diffMins;
        }

        set({
          onBreak: isRunning,
          breakStartTime: null,
          remainingBreakMins: newRemaining,
        });

        await get().fetchAttendanceData();
      } else {
        throw new Error(res.data.message || "Failed to end break");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  // 9) Get User Location (for mobile)
  getUserLocation: () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // If not mobile, do nothing
    if (!isMobile) {
      console.log("Not a mobile device; skipping geolocation.");
      return;
    }

    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        set({ userCoordinates: userCoords });
        const { targetCoordinates } = get();
        if (targetCoordinates) {
          const dist = calculateDistance(userCoords, targetCoordinates);
          set({ distance: dist });
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          toast.error("Location permission denied.");
        } else {
          console.error("Geolocation error:", err.message);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  },
}));

export default usePunchStore;
