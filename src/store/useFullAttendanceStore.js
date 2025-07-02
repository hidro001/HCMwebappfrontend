

import { create } from "zustand";
import { toast } from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../service/axiosInstance";

function convertTo24Hour(timeStr) {
  if (!timeStr) return null;
  const [timePart, ampm] = timeStr.split(" ");
  if (!timePart || !ampm) return null;

  let [hh, mm, ss] = timePart.split(":");
  hh = parseInt(hh, 10) || 0;
  mm = parseInt(mm, 10) || 0;
  ss = parseInt(ss, 10) || 0;

  if (ampm.toUpperCase() === "PM" && hh !== 12) hh += 12;
  if (ampm.toUpperCase() === "AM" && hh === 12) hh = 0;

  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}


// function getAllDaysInMonth(year, month) {
//   const days = [];
//   let current = new Date(year, month - 1, 1);
//   while (current.getMonth() === month - 1) {
//     days.push(new Date(current));
//     current.setDate(current.getDate() + 1);
//   }
//   return days;
// }

function getAllDaysInMonth(year, month) {
  const days = [];
  let current = new Date(year, month - 1, 1, 12, 0, 0, 0);

  while (current.getMonth() === month - 1) {
    days.push(new Date(current.getTime())); 
    current.setDate(current.getDate() + 1);
  }
  return days;
}


const useFullAttendanceStore = create((set, get) => ({

  userProfileData: null,
  approvedLeaves: [],
  attendanceData: [],
  companySettings: null,
  shiftTimingDetails: null,
  employmentTypeDetails: null,
  leaveSystemDetails: null,
  monthlyPaidLeaves: 0,
  totalPaidLeaves: 0,
  deductionDetails: [],
  attendancePolicies: null,
  error: null,
  isLoading: false,
  hasRealData: false,


  fetchAllData: async (employeeId) => {
    try {
      set({ isLoading: true, error: null });

      const userProfileResponse = await axiosInstance.get(`/user/profile/${employeeId}`);
      if (!userProfileResponse.data?.success) {
        throw new Error(
          userProfileResponse.data?.message || "Failed to fetch user profile data"
        );
      }
      const userData = userProfileResponse.data.data;

      const approvedLeavesResponse = await axiosInstance.get(`/leaves/employee/`, {
        params: {
          status: "approved",
          employee_Id: employeeId,
        },
      });
      let approvedLeavesData = [];
      if (Array.isArray(approvedLeavesResponse.data)) {
        approvedLeavesData = approvedLeavesResponse.data;
      } else if (
        approvedLeavesResponse.data?.success &&
        Array.isArray(approvedLeavesResponse.data.data)
      ) {
        approvedLeavesData = approvedLeavesResponse.data.data;
      } else if (
        approvedLeavesResponse.data?.success &&
        Array.isArray(approvedLeavesResponse.data.leave)
      ) {
        approvedLeavesData = approvedLeavesResponse.data.leave;
      }

      const attendanceResponse = await axiosInstance.get(`/attendance-user/employee`, {
        params: {
          employee_Id: employeeId,
        },
      });
      if (!attendanceResponse.data?.success) {
        throw new Error(
          attendanceResponse.data?.message || "Failed to fetch attendance data"
        );
      }
      const uniqueData = attendanceResponse.data.data.reduce((acc, current) => {
        if (!acc.find((item) => item.date === current.date)) {
          acc.push(current);
        }
        return acc;
      }, []);

      // 4) company settings
      const companySettingsResponse = await axiosInstance.get(
        `/company-settings/settings`
      );
      if (!companySettingsResponse.data?.success) {
        throw new Error(
          companySettingsResponse.data?.message || "Failed to fetch company settings"
        );
      }
      const settingsData = companySettingsResponse.data.data || {};
      const attendancePoliciesData = settingsData.attendancePolicies || {};

      set({
        userProfileData: userData,
        approvedLeaves: approvedLeavesData,
        attendanceData: uniqueData,
        companySettings: settingsData,
        attendancePolicies: attendancePoliciesData,
        isLoading: false,
        error: null,
        hasRealData: true,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error(err.message || "An unexpected error occurred.");
      set({
        error: err.message || "An unexpected error occurred.",
        hasRealData: false,
        isLoading: false,
      });
    }
  },

  getMonthlyAttendanceView: (year, month) => {
    const { attendanceData, approvedLeaves, companySettings, attendancePolicies } = get();

    // 1) build array of all days in (year, month)
    const allDays = getAllDaysInMonth(year, month);

    // 2) build sets for holiday & leaves
    const holidaySet = new Set(
      (companySettings?.holidays || []).map((h) =>
        new Date(h.date).toISOString().split("T")[0]
      )
    );

    const approvedLeavesSet = new Set();
    for (const lv of approvedLeaves) {
      const from = new Date(lv.leave_From);
      const to = new Date(lv.leave_To);
      for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        approvedLeavesSet.add(d.toISOString().split("T")[0]);
      }
    }

    // 3) map each day => row
    // return allDays.map((dateObj, idx) => {
    //   const dateStr = dateObj.toISOString().split("T")[0];
    //   const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    //   // find record if any
    //   const record = attendanceData.find((r) => r.date === dateStr);

    //   let status = "Absent";
    //   if (holidaySet.has(dateStr)) {
    //     status = "Holiday";
    //   } else if (approvedLeavesSet.has(dateStr)) {
    //     status = "Holiday"; // or “Paid Leave”
    //   } else if (record?.login && record?.logout) {
    //     // parse hours
    //     const login24 = convertTo24Hour(record.login);
    //     const logout24 = convertTo24Hour(record.logout);
    //     const start = new Date(`1970-01-01T${login24}`);
    //     const end = new Date(`1970-01-01T${logout24}`);
    //     const hoursWorked = (end - start) / 36e5;

    //     const fullDayHours = attendancePolicies?.fullDayHours || 9;
    //     const halfDayHours = attendancePolicies?.halfDayHours || 5;
    //     const minHours = attendancePolicies?.minimumWorkingHours || 4.5;

    //     if (hoursWorked >= fullDayHours) status = "Present";
    //     else if (hoursWorked >= minHours && hoursWorked <= halfDayHours) status = "Half Day";
    //     else if (hoursWorked > 0 && hoursWorked < minHours) status = "Not Even Half Day";
    //     else status = "Present"; // fallback
    //   } else {
    //     // if future date => “------”
    //     if (dateObj > new Date()) status = "------";
    //   }

    //   return {
    //     sl: idx + 1,
    //     date: dateStr,
    //     day: dayName,
    //     logInTime: record?.login || "------",
    //     logOutTime: record?.logout || "------",
    //     totalBreak: record?.breaks?.length ? `${record.breaks.length} break(s)` : "--",
    //     status,
    //   };
    // });

    return allDays.map((dateObj, idx) => {
      const dateStr = dateObj.toISOString().split("T")[0];
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    
      // find record if any
      const record = attendanceData.find((r) => r.date === dateStr);
    
      // compute total break minutes
      let totalBreakMinutes = 0;
      if (record?.breaks && record.breaks.length > 0) {
        record.breaks.forEach((br) => {
          if (br.start && br.end) {
            const breakStartTime = new Date(br.start);
            const breakEndTime = new Date(br.end);
            const breakDuration = (breakEndTime - breakStartTime) / 60000; // minutes
            if (breakDuration > 0) {
              totalBreakMinutes += Math.floor(breakDuration);

            }
          }
        });
      }
      
    
      let status = "Absent";
      if (holidaySet.has(dateStr)) {
        status = "Holiday";
      } else if (approvedLeavesSet.has(dateStr)) {
        status = "Holiday"; // or “Paid Leave”
      } else if (record?.login && record?.logout) {
        // parse hours
        const login24 = convertTo24Hour(record.login);
        const logout24 = convertTo24Hour(record.logout);
        const start = new Date(`1970-01-01T${login24}`);
        const end = new Date(`1970-01-01T${logout24}`);
        const hoursWorked = (end - start) / 36e5;
    
        const fullDayHours = attendancePolicies?.fullDayHours || 9;
        const halfDayHours = attendancePolicies?.halfDayHours || 5;
        const minHours = attendancePolicies?.minimumWorkingHours || 4.5;
    
        if (hoursWorked >= fullDayHours) status = "Present";
        else if (hoursWorked >= minHours && hoursWorked <= halfDayHours) status = "Half Day";
        else if (hoursWorked > 0 && hoursWorked < minHours) status = "Not Even Half Day";
        else status = "Present"; // fallback
      } else {
        // future date check => “------”
        if (dateObj > new Date()) status = "------";
      }
    
      return {
        sl: idx + 1,
        date: dateStr,
        day: dayName,
        logInTime: record?.login || "------",
        logOutTime: record?.logout || "------",
        // Show total break minutes (or “--” if none):
        totalBreak: totalBreakMinutes > 0 ? `${totalBreakMinutes} minutes` : "--",
        status,
      };
    });
    
  },

  calculateTotalShifts: (year, month) => {
    const { attendanceData } = get();
    return attendanceData.filter((rec) => {
      const d = new Date(rec.date);
      return (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        rec.login &&
        rec.logout
      );
    }).length;
  },

  calculateTotalCompletedDays: (year, month) => {
    const { attendanceData, attendancePolicies } = get();
    const fullDayHours = attendancePolicies?.fullDayHours || 9;

    return attendanceData.reduce((count, rec) => {
      const d = new Date(rec.date);
      if (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        rec.login &&
        rec.logout
      ) {
        const login24 = convertTo24Hour(rec.login);
        const logout24 = convertTo24Hour(rec.logout);
        if (login24 && logout24) {
          const start = new Date(`1970-01-01T${login24}`);
          const end = new Date(`1970-01-01T${logout24}`);
          const hoursWorked = (end - start) / 36e5;
          if (hoursWorked >= fullDayHours) count++;
        }
      }
      return count;
    }, 0);
  },

  calculateTotalLates: (year, month) => {
    const { attendanceData, shiftTimingDetails, attendancePolicies } = get();
    return attendanceData.filter((rec) => {
      const d = new Date(rec.date);
      if (d.getFullYear() === year && d.getMonth() + 1 === month) {
        const shiftStartTime = shiftTimingDetails?.startTime || "09:00";
        const grace = attendancePolicies?.gracePeriodMinutes || 15;
        if (rec.login && shiftStartTime) {
          const shiftStart = new Date(`1970-01-01T${convertTo24Hour(shiftStartTime)}`);
          shiftStart.setMinutes(shiftStart.getMinutes() + grace);

          const loginTime = new Date(`1970-01-01T${convertTo24Hour(rec.login)}`);
          return loginTime > shiftStart;
        }
      }
      return false;
    }).length;
  },

  calculateTotalHalfDays: (year, month) => {
    const { attendanceData, attendancePolicies } = get();
    const halfDayHours = attendancePolicies?.halfDayHours || 5;
    const minHours = attendancePolicies?.minimumWorkingHours || 4.5;

    let count = 0;
    attendanceData.forEach((rec) => {
      const d = new Date(rec.date);
      if (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        rec.login &&
        rec.logout
      ) {
        const login24 = convertTo24Hour(rec.login);
        const logout24 = convertTo24Hour(rec.logout);
        if (login24 && logout24) {
          const start = new Date(`1970-01-01T${login24}`);
          const end = new Date(`1970-01-01T${logout24}`);
          const hours = (end - start) / 36e5;

          if (hours >= minHours && hours <= halfDayHours) count++;
        }
      }
    });
    return count;
  },

  calculateNotEvenHalfDays: (year, month) => {
    const { attendanceData, attendancePolicies } = get();
    const minHrs = attendancePolicies?.minimumWorkingHours || 4.5;

    let count = 0;
    attendanceData.forEach((rec) => {
      const d = new Date(rec.date);
      if (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        rec.login &&
        rec.logout
      ) {
        const login24 = convertTo24Hour(rec.login);
        const logout24 = convertTo24Hour(rec.logout);
        if (login24 && logout24) {
          const start = new Date(`1970-01-01T${login24}`);
          const end = new Date(`1970-01-01T${logout24}`);
          const hours = (end - start) / 36e5;

          if (hours > 0 && hours < minHrs) count++;
        }
      }
    });
    return count;
  },

  calculateNotLoggedOut: (year, month) => {
    const { attendanceData } = get();
    const today = new Date();
    return attendanceData.filter((rec) => {
      const d = new Date(rec.date);
      return (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        rec.login &&
        !rec.logout &&
        d <= today
      );
    }).length;
  },


  generatePDF: () => {
    const doc = new jsPDF();
    doc.text("Hello from the PDF logic in Zustand store!", 10, 10);
    doc.save("payroll.pdf");
    toast.success("PDF downloaded successfully!");
  },

   getTimelineSegments(record) {
    const segments = [];
    const login = convertTo24Hour(record?.login);
    const logout = convertTo24Hour(record?.logout);
    if (!login || !logout) return [];
  
    const workStart = new Date(`1970-01-01T${login}`);
    const workEnd = new Date(`1970-01-01T${logout}`);
  
    const breaks = (record?.breaks || []).map(br => ({
      start: new Date(br.start),
      end: new Date(br.end)
    })).sort((a, b) => a.start - b.start);
  
    let pointer = new Date(workStart);
  
    for (const br of breaks) {
      // Add working time before break
      if (br.start > pointer) {
        segments.push({
          start: pointer.toTimeString().slice(0, 5),
          end: br.start.toTimeString().slice(0, 5),
          type: "Working"
        });
      }
  
      // Add break time
      segments.push({
        start: br.start.toTimeString().slice(0, 5),
        end: br.end.toTimeString().slice(0, 5),
        type: "Break"
      });
  
      pointer = new Date(br.end); // move pointer forward
    }
  
    // Add final working time after last break
    if (pointer < workEnd) {
      segments.push({
        start: pointer.toTimeString().slice(0, 5),
        end: workEnd.toTimeString().slice(0, 5),
        type: "Working"
      });
    }
  
    return segments;
  },

  fetchInsights: async (employeeId, mode, date = "") => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(
      `/break/employee-attendance-analytics/${employeeId}?interval=${mode}&date=${date}`
    );
    set({ insights: res.data.data });
  } catch (err) {
    set({ error: err.message });
    toast.error(err.message);
  } finally {
    set({ loading: false });
  }
},
insights: null,

  
}));

export default useFullAttendanceStore;
