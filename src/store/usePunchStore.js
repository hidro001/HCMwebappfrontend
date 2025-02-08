// src/store/usePunchStore.js
import { create } from "zustand";
import axiosInstance from "../service/axiosInstance"; // your custom axios
import { toast } from "react-hot-toast";

function parseShiftTiming(shiftTimingStr) {
  const regex = /\((\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\)/;
  const match = shiftTimingStr?.match(regex);
  if (match) {
    const [_, startHour, startMinute, endHour, endMinute] = match;
    return {
      startHour: parseInt(startHour, 10),
      startMinute: parseInt(startMinute, 10),
      endHour: parseInt(endHour, 10),
      endMinute: parseInt(endMinute, 10),
    };
  }
  return null;
}

function calculateDistance(coords1, coords2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);
  const dLat = lat2 - lat1;
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // meters
}

function getTotalBreakTime(todayAttendance) {
  if (!todayAttendance || !todayAttendance.breaks) return 0;
  return todayAttendance.breaks.reduce((sum, br) => sum + (br.duration || 0), 0);
}

// Create Zustand Store
const usePunchStore = create((set, get) => ({
  // -----------------------
  // States
  // -----------------------
  targetCoordinates: null,
  shiftStartTime: null,
  shiftEndTime: null,
  shiftStartMinusTwoHours: null,
  todayAttendance: null,
  attendanceData: [],
  userBreakType: null, // { breakHours: 1, etc. }
  onBreak: false,
  remainingBreakMins: 0, // how many minutes of break the user has left
  breakStartTime: null, // local in-app usage
  canPunchIn: false,
  canPunchOut: false,
  error: null,
  isLoading: false,

  // If you want to store the user's location
  userCoordinates: null,
  distance: null,

  // For hooking into your React usage:
  setError: (error) => set({ error }),

  // -----------------------
  // Actions
  // -----------------------

  // 1. FETCH SHIFT LOCATION & TIMING
  fetchTargetCoordinates: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/employee/punchtime"); 
      if (res.data?.success) {
        const data = res.data.data || {};
        const coords = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };

        // parse shift timing
        let shiftStartTime = null,
          shiftEndTime = null,
          shiftStartMinusTwoHours = null;
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
      set({
        error: `Coordinates Error: ${err.message}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // 2. FETCH ATTENDANCE
  fetchAttendanceData: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.get("/employee/attendence");
      if (res.data.success) {
        const allAttendance = res.data.data || [];
        set({ attendanceData: allAttendance });

        // find today's record
        const todayStr = new Date().toISOString().split("T")[0];
        const recordForToday = allAttendance.find(
          (item) => item.date === todayStr
        );

        if (recordForToday) {
          // check if user is currently on break
          let onBreak = false;
          if (recordForToday.breaks?.length) {
            const lastBreak =
              recordForToday.breaks[recordForToday.breaks.length - 1];
            onBreak = lastBreak.breakStatus === "Running";
          }
          set({
            todayAttendance: recordForToday,
            onBreak,
          });
        } else {
          set({
            todayAttendance: null,
            onBreak: false,
          });
        }
      } else {
        throw new Error(
          res.data?.message || "Failed to fetch attendance data"
        );
      }
    } catch (err) {
      console.error(err);
      set({
        error: `Attendance Error: ${err.message}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // 3. FETCH USER BREAK TYPE
  fetchUserBreakType: async (employeeId) => {
    try {
      const res = await axiosInstance.get(
        `/employee/attendence/getUserBreakType/${employeeId}`
      );
      if (res.data.success && res.data.data?.break_Type) {
        const bType = res.data.data.break_Type;
        // bType might have .breakHours
        const totalMins = bType.breakHours * 60;
        set({
          userBreakType: bType,
          remainingBreakMins: totalMins,
        });
      }
    } catch (err) {
      console.error("Error fetching user break type:", err.message);
    }
  },

  // 4. DETERMINE IF user canPunchIn / canPunchOut
  // call this after fetching data & geolocation
  decidePunchState: () => {
    const {
      targetCoordinates,
      shiftStartMinusTwoHours,
      todayAttendance,
      distance,
    } = get();
    // reset first
    set({ canPunchIn: false, canPunchOut: false });

    if (!targetCoordinates || !shiftStartMinusTwoHours) return;

    const now = new Date();
    // If there's a record for today
    if (todayAttendance) {
      const { login, logout, attendance_mode } = todayAttendance;
      // If it's a biometric device day, can only punch out if not logged out
      if (attendance_mode === "BiometricDevice") {
        if (!logout) {
          set({ canPunchOut: true });
        }
        return;
      }
      // If user has login but no logout => canPunchOut
      if (login && !logout) {
        set({ canPunchOut: true });
      }
      // If no login => check time & distance
      else if (!login) {
        if (now >= shiftStartMinusTwoHours) {
          // If you want location-based checking:
          // if distance <= 50 => canPunchIn
          // Or if you're on desktop, skip distance
          if (distance !== null && distance <= 50) {
            set({ canPunchIn: true });
          }
        }
      }
    } else {
      // No record for today => canPunchIn if time >= shiftStartMinusTwoHours
      if (now >= shiftStartMinusTwoHours) {
        if (distance !== null && distance <= 50) {
          set({ canPunchIn: true });
        }
      }
    }
  },

  // 5. PUNCH IN
  handlePunchIn: async () => {
    try {
      // Example of "confirmation" logic is now handled in the UI
      // We'll do just the call here
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
        // Re-fetch attendance
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

  // 6. PUNCH OUT
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
        // Re-fetch attendance
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

  // 7. START BREAK
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
        // set store state
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

  // 8. END BREAK
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

        // update store states
        const updated = res.data.data;
        let isRunning = false;
        if (updated.breaks?.length) {
          const lastB = updated.breaks[updated.breaks.length - 1];
          isRunning = lastB.breakStatus === "Running";
        }

        // calculate how many minutes used
        let newRemaining = remainingBreakMins;
        if (breakStartTime) {
          const now = new Date();
          const diffMs = now - breakStartTime;
          const diffMins = Math.floor(diffMs / 60000);
          newRemaining = Math.max(remainingBreakMins - diffMins, 0);
        }

        set({
          onBreak: isRunning,
          breakStartTime: null,
          remainingBreakMins: newRemaining,
        });
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

  // 9. Optional: GEOLOCATION
  getUserLocation: () => {
    // If you still want to handle location in the store
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
        // If we have target coords, compute distance
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
          toast.error(`Geolocation Error: ${err.message}`);
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  },
}));

export default usePunchStore;
