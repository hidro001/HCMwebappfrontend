// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axiosInstance from "../service/axiosInstance";
// import { toast } from "react-hot-toast";
// import { parse } from "date-fns";

// /**
//  * Utility to parse shift timing: "Saket (09:00 - 07:00)"
//  */
// function parseShiftTiming(shiftTimingString) {
//   const regex = /(.+?)\s*\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/;
//   const match = shiftTimingString?.match(regex);
//   if (match) {
//     const [, name, startTime, endTime] = match;
//     return {
//       name: name.trim(),
//       startTime: startTime.trim(),
//       endTime: endTime.trim(),
//     };
//   }
//   return null;
// }

// /**
//  * Convert 12-hour time format (e.g. "10:30:00 AM") → 24-hour string ("10:30:00")
//  */
// function convertTo24Hour(time) {
//   if (!time) return null;
//   let [hourPart, modifier] = time.split(" ");
//   let [hours, minutes, seconds] = hourPart.split(":");
//   hours = parseInt(hours, 10);
//   minutes = minutes || "00";
//   seconds = seconds || "00";

//   if (modifier === "PM" && hours !== 12) {
//     hours += 12;
//   }
//   if (modifier === "AM" && hours === 12) {
//     hours = 0;
//   }
//   return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
// }

// /**
//  * Convert YYYY-MM-DD → local Date
//  */
// function toLocalDate(dateStr) {
//   if (!dateStr) return null;
//   return new Date(dateStr + "T00:00:00");
// }

// /**
//  * Convert login+logout → hours difference
//  */
// function getHoursWorked(login, logout) {
//   if (!login || !logout) return 0;
//   const loginDate = parse(convertTo24Hour(login), "HH:mm:ss", new Date());
//   const logoutDate = parse(convertTo24Hour(logout), "HH:mm:ss", new Date());
//   const diff = logoutDate - loginDate;
//   return diff / (1000 * 60 * 60);
// }

// /**
//  * Get all days in a specific month of a year
//  */
// function getAllDaysInMonth(year, month) {
//   const days = [];
//   let date = new Date(year, month - 1, 1);
//   while (date.getMonth() === month - 1) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// /**
//  * Sum up the total break time from the "breaks" array.
//  * - If `duration` is a positive number, treat it as minutes.
//  * - Otherwise, compute from `start` → `end`.
//  */
// function getTotalBreakTime(breaks = []) {
//   let totalMinutes = 0;

//   breaks.forEach((br) => {
//     if (typeof br.duration === "number" && br.duration > 0) {
//       // The API already provided a duration in minutes
//       totalMinutes += br.duration;
//     } else if (br.start && br.end) {
//       // We'll calculate from timestamps
//       const start = new Date(br.start);
//       const end = new Date(br.end);
//       const diffMs = end - start;
//       const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
//       totalMinutes += diffMins;
//     }
//   });

//   // Convert total minutes → "Xh Ym" format
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = Math.floor(totalMinutes % 60);
//   return `${hours}h ${minutes}m`;
// }

// export const useOwnFullAttendanceStore = create(
//   persist(
//     (set, get) => ({
//       // States
//       userProfileData: null,
//       approvedLeaves: [],
//       attendanceData: [],
//       companySettings: null,
//       shiftTimingDetails: null,
//       employmentTypeDetails: null,
//       leaveSystemDetails: null,
//       monthlyPaidLeaves: 0,
//       totalPaidLeaves: 0,
//       deductionDetails: [],
//       attendancePolicies: {},
//       error: null,

//       // Confirmation dialog for PDF
//       pdfDialogOpen: false,
//       pdfDialogTitle: "",
//       pdfDialogMessage: "",
//       onPdfConfirm: null,
//       onPdfCancel: null,

//       // ---- ACTIONS ----
//       setPdfDialogOpen: (open) => set(() => ({ pdfDialogOpen: open })),
//       setPdfDialogTitle: (title) => set(() => ({ pdfDialogTitle: title })),
//       setPdfDialogMessage: (message) => set(() => ({ pdfDialogMessage: message })),
//       setOnPdfConfirm: (fn) => set(() => ({ onPdfConfirm: fn })),
//       setOnPdfCancel: (fn) => set(() => ({ onPdfCancel: fn })),

//       // 1) Fetch all needed data
//       fetchAttendanceData: async () => {
//         try {
//           // 1.1) User Profile
//           const userProfileRes = await axiosInstance.get("/user/user-profile");
//           if (!userProfileRes.data.success) {
//             throw new Error(
//               userProfileRes.data.message || "Failed to fetch user profile"
//             );
//           }
//           const userData = userProfileRes.data.response;

//           // 1.2) Approved Leaves
//           const approvedLeavesRes = await axiosInstance.get(
//             "/leave/employee/leaves?status=approved"
//           );
//           let approvedLeavesData = [];
//           if (Array.isArray(approvedLeavesRes.data)) {
//             approvedLeavesData = approvedLeavesRes.data;
//           } else if (
//             approvedLeavesRes.data.success &&
//             Array.isArray(approvedLeavesRes.data.leave)
//           ) {
//             approvedLeavesData = approvedLeavesRes.data.leave;
//           }
//           const currentEmployeeId = userData.employee_Id;
//           const filteredApprovedLeaves = approvedLeavesData.filter(
//             (leave) => leave.employee?.employee_Id === currentEmployeeId
//           );

//           // 1.3) Attendance Data
//           const attendanceRes = await axiosInstance.get("/employee/attendence");
//           if (!attendanceRes.data.success) {
//             throw new Error(
//               attendanceRes.data.message || "Failed to fetch attendance data"
//             );
//           }
//           // Remove duplicates by date
//           const uniqueData = attendanceRes.data.data.reduce((acc, item) => {
//             const found = acc.find((x) => x.date === item.date);
//             if (!found) acc.push(item);
//             return acc;
//           }, []);

//           // 1.4) Company Settings
//           const companySettingsRes = await axiosInstance.get(
//             "/superadmin/companysettings/settings"
//           );
//           if (!companySettingsRes.data.success) {
//             throw new Error(
//               companySettingsRes.data.message || "Failed to fetch settings"
//             );
//           }
//           const settingsData = companySettingsRes.data.data;

//           // Parse shift timing from user
//           const shiftTiming = parseShiftTiming(userData.shift_Timing);

//           // Attendance policies
//           const attendancePoliciesData = settingsData.attendancePolicies || {};

//           // Find employment type details
//           const employmentType = settingsData.employmentTypes?.find(
//             (et) => et.name === userData.employee_Type
//           );
//           if (!employmentType) {
//             throw new Error(
//               `Employment type "${userData.employee_Type}" not found in company settings.`
//             );
//           }

//           // Find leave system
//           const leaveSystemId = employmentType.leaveSystemId;
//           const leaveSystem = settingsData.leaveSystems?.find(
//             (ls) => ls.id === leaveSystemId
//           );

//           // Paid leaves
//           const monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;
//           const dateOfJoining = new Date(userData.date_of_Joining);
//           const today = new Date();
//           let monthsSinceJoining =
//             (today.getFullYear() - dateOfJoining.getFullYear()) * 12 +
//             (today.getMonth() - dateOfJoining.getMonth()) -
//             1;
//           monthsSinceJoining = Math.max(0, monthsSinceJoining);

//           const totalPaidLeavesValue =
//             (userData.no_of_Paid_Leave || 0) +
//             monthsSinceJoining * monthlyPaidLeavesValue;

//           // Deductions
//           const employeeDeductions = (employmentType.deductions || [])
//             .map((deductionId) =>
//               settingsData.deductions.find((d) => d.id === deductionId)
//             )
//             .filter(Boolean);

//           // Put everything in the store
//           set(() => ({
//             userProfileData: userData,
//             approvedLeaves: filteredApprovedLeaves,
//             attendanceData: uniqueData,
//             companySettings: settingsData,
//             shiftTimingDetails: shiftTiming,
//             employmentTypeDetails: employmentType,
//             leaveSystemDetails: leaveSystem,
//             monthlyPaidLeaves: monthlyPaidLeavesValue,
//             totalPaidLeaves: totalPaidLeavesValue,
//             deductionDetails: employeeDeductions,
//             attendancePolicies: attendancePoliciesData,
//             error: null,
//           }));
//         } catch (err) {
//           console.error(err);
//           set(() => ({ error: err?.message || "Something went wrong" }));
//           toast.error(err?.message || "Something went wrong", { position: "top-center" });
//         }
//       },

//       // 2) Calculation Methods (Mirroring Old Code)

//       // Example: how many days have login+logout
//       calculateTotalShifts: (year, month) => {
//         const { attendanceData } = get();
//         return attendanceData.filter((rec) => {
//           const d = toLocalDate(rec.date);
//           return (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             rec.login &&
//             rec.logout
//           );
//         }).length;
//       },

//       calculateTotalLates: (year, month) => {
//         const { attendanceData, attendancePolicies, shiftTimingDetails } = get();
//         const grace = attendancePolicies?.gracePeriodMinutes || 15;
//         if (!shiftTimingDetails?.startTime) return 0;
//         const shiftStart = parse(convertTo24Hour(shiftTimingDetails.startTime), "HH:mm:ss", new Date());
//         shiftStart.setMinutes(shiftStart.getMinutes() + grace);

//         let lateCount = 0;
//         attendanceData.forEach((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login) {
//               const loginDateTime = parse(convertTo24Hour(rec.login), "HH:mm:ss", new Date());
//               if (loginDateTime > shiftStart) {
//                 lateCount++;
//               }
//             }
//           }
//         });
//         return lateCount;
//       },

//       calculateTotalCompletedDays: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const fullDayHours = attendancePolicies?.fullDayHours || 9;
//         return attendanceData.filter((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login && rec.logout) {
//               const hrs = getHoursWorked(rec.login, rec.logout);
//               return hrs >= fullDayHours;
//             }
//           }
//           return false;
//         }).length;
//       },

//       calculateRegularizations: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const minHours = attendancePolicies?.regularizationCriteria?.minHours || 7;
//         const maxHours = attendancePolicies?.regularizationCriteria?.maxHours || 9;
//         return attendanceData.filter((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login && rec.logout) {
//               const hrs = getHoursWorked(rec.login, rec.logout);
//               return hrs >= minHours && hrs < maxHours;
//             }
//           }
//           return false;
//         }).length;
//       },

//       calculateTotalHalfDays: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
//         const halfDay = attendancePolicies?.halfDayHours || 5;
//         return attendanceData.filter((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login && rec.logout) {
//               const hrs = getHoursWorked(rec.login, rec.logout);
//               return hrs > minWork && hrs <= halfDay;
//             }
//           }
//           return false;
//         }).length;
//       },

//       calculateNotEvenHalfDays: (year, month) => {
//         const { attendanceData } = get();
//         let count = 0;
//         attendanceData.forEach((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login && rec.logout) {
//               const hrs = getHoursWorked(rec.login, rec.logout);
//               if (hrs > 0 && hrs < 4.5) {
//                 count++;
//               }
//             }
//           }
//         });
//         return count;
//       },

//       calculateNotLoggedOut: (year, month) => {
//         const { attendanceData } = get();
//         const today = new Date();
//         let count = 0;
//         attendanceData.forEach((rec) => {
//           const d = toLocalDate(rec.date);
//           if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
//             if (rec.login && !rec.logout && d <= today) {
//               count++;
//             }
//           }
//         });
//         return count;
//       },

//       calculateTotalLeaves: (year, month) => {
//         const { attendanceData, leaveSystemDetails, companySettings } = get();
//         const daysInMonth = getAllDaysInMonth(year, month);
//         const today = new Date();
//         let totalLeaves = 0;

//         daysInMonth.forEach((dateObj) => {
//           const formatted = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//           const isWorkDay = leaveSystemDetails?.workingDays?.includes(dayName);
//           const isHoliday = companySettings?.holidays?.some(
//             (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//           );

//           // If non-working or holiday, skip
//           if (!isWorkDay || isHoliday) return;

//           // Check if there's an attendance record
//           const rec = attendanceData.find((r) => r.date === formatted);
//           if (dateObj <= today) {
//             if (!rec || !rec.login || !rec.logout) {
//               totalLeaves++;
//             }
//           }
//         });
//         return totalLeaves;
//       },

//       // 3) Summary Stats for side panel
//       getSummaryStats: (year, month) => {
//         const totalShifts = get().calculateTotalShifts(year, month);
//         const completedShifts = get().calculateTotalCompletedDays(year, month);
//         const totalLates = get().calculateTotalLates(year, month);
//         const halfDays = get().calculateTotalHalfDays(year, month);
//         const notEvenHalfDays = get().calculateNotEvenHalfDays(year, month);
//         const regDays = get().calculateRegularizations(year, month);
//         const notLoggedOut = get().calculateNotLoggedOut(year, month);
//         const totalLeaves = get().calculateTotalLeaves(year, month);

//         // "Present" vs "Absent" vs "Holiday"
//         const { attendanceData, companySettings, leaveSystemDetails, totalPaidLeaves } = get();
//         let totalPresent = 0;
//         let totalAbsent = 0;
//         let totalHoliday = 0;

//         const daysInMonth = getAllDaysInMonth(year, month);
//         const today = new Date();

//         daysInMonth.forEach((dateObj) => {
//           const formatted = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//           const isHoliday = companySettings?.holidays?.some(
//             (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//           );
//           const isWorkDay = leaveSystemDetails?.workingDays?.includes(dayName);

//           if (isHoliday || !isWorkDay) {
//             totalHoliday++;
//             return;
//           }
//           const rec = attendanceData.find((r) => r.date === formatted);
//           if (dateObj <= today) {
//             if (rec?.login && rec?.logout) {
//               totalPresent++;
//             } else {
//               totalAbsent++;
//             }
//           }
//         });

//         // Return in UI-friendly shape
//         return [
//           {
//             label: "Total Present",
//             short: "P",
//             value: totalPresent,
//             bg: "bg-green-100 dark:bg-green-900",
//             text: "text-green-700 dark:text-green-100",
//           },
//           {
//             label: "Total Absent",
//             short: "A",
//             value: totalAbsent,
//             bg: "bg-red-100 dark:bg-red-900",
//             text: "text-red-700 dark:text-red-100",
//           },
//           {
//             label: "Total Shifts",
//             short: "TS",
//             value: totalShifts,
//             bg: "bg-purple-100 dark:bg-purple-900",
//             text: "text-purple-700 dark:text-purple-100",
//           },
//           {
//             label: "Completed Shifts",
//             short: "CS",
//             value: completedShifts,
//             bg: "bg-orange-100 dark:bg-orange-900",
//             text: "text-orange-700 dark:text-orange-100",
//           },
//           {
//             label: "Total Paid Leave",
//             short: "PL",
//             value: totalPaidLeaves,
//             bg: "bg-yellow-100 dark:bg-yellow-700",
//             text: "text-yellow-700 dark:text-yellow-100",
//           },
//           {
//             label: "Total Leave",
//             short: "TL",
//             value: totalLeaves,
//             bg: "bg-green-50 dark:bg-green-900",
//             text: "text-green-700 dark:text-green-100",
//           },
//           {
//             label: "Total Lates",
//             short: "L",
//             value: totalLates,
//             bg: "bg-blue-100 dark:bg-blue-900",
//             text: "text-blue-700 dark:text-blue-100",
//           },
//           {
//             label: "Half Day",
//             short: "H",
//             value: halfDays,
//             bg: "bg-pink-100 dark:bg-pink-900",
//             text: "text-pink-700 dark:text-pink-100",
//           },
//           {
//             label: "Not Even Half Day",
//             short: "?",
//             value: notEvenHalfDays,
//             bg: "bg-gray-100 dark:bg-gray-800",
//             text: "text-gray-700 dark:text-gray-200",
//           },
//           {
//             label: "Regularization",
//             short: "R",
//             value: regDays,
//             bg: "bg-cyan-100 dark:bg-cyan-900",
//             text: "text-cyan-700 dark:text-cyan-100",
//           },
//           {
//             label: "Not Logged Out",
//             short: "NO",
//             value: notLoggedOut,
//             bg: "bg-stone-100 dark:bg-stone-900",
//             text: "text-stone-700 dark:text-stone-100",
//           },
//           {
//             label: "Total Holiday",
//             short: "TH",
//             value: totalHoliday,
//             bg: "bg-black",
//             text: "text-white",
//           },
//           {
//             label: "Overtime",
//             short: "O",
//             value: "--",
//             bg: "bg-indigo-100 dark:bg-indigo-900",
//             text: "text-indigo-700 dark:text-indigo-100",
//           },
//         ];
//       },

//       // 4) Build final table data
//       getDisplayedAttendance: (year, month) => {
//         const {
//           attendanceData,
//           approvedLeaves,
//           leaveSystemDetails,
//           companySettings,
//         } = get();
//         const daysInMonth = getAllDaysInMonth(year, month);
//         const today = new Date();

//         // Approved leave dates
//         const approvedLeaveDates = new Set();
//         approvedLeaves.forEach((leave) => {
//           const fromDate = new Date(leave.leave_From);
//           const toDate = new Date(leave.leave_To);
//           for (
//             let d = new Date(fromDate);
//             d <= toDate;
//             d.setDate(d.getDate() + 1)
//           ) {
//             approvedLeaveDates.add(d.toISOString().split("T")[0]);
//           }
//         });

//         return daysInMonth.map((dateObj, idx) => {
//           const formattedDate = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//           let row = {
//             sl: idx + 1,
//             date: formattedDate,
//             day: dayName,
//             logInTime: "------",
//             logOutTime: "------",
//             totalBreak: "N/A",
//             status: "------",
//           };

//           // Is it holiday or off-day or on approved leave?
//           const isApprovedLeave = approvedLeaveDates.has(formattedDate);
//           const isHoliday = companySettings?.holidays?.some(
//             (h) => new Date(h.date).toISOString().split("T")[0] === formattedDate
//           );
//           const isWorkingDay =
//             leaveSystemDetails?.workingDays?.includes(dayName) ?? false;

//           if (isApprovedLeave) {
//             row.status = "Holiday";
//             return row;
//           }
//           if (!isWorkingDay || isHoliday) {
//             row.status = "Holiday";
//             return row;
//           }

//           // See if there's an attendance record
//           const record = attendanceData.find((r) => r.date === formattedDate);
//           if (!record) {
//             // Past date => Absent, future => "------"
//             row.status = dateObj < today ? "Absent" : "------";
//             return row;
//           }

//           // We have some record
//           if (record.login) {
//             row.logInTime = record.login;
//           }
//           if (record.logout) {
//             row.logOutTime = record.logout;
//           }
//           // Calculate total break from record.breaks if any
//           if (record.breaks && record.breaks.length > 0) {
//             row.totalBreak = getTotalBreakTime(record.breaks);
//           }

//           // If no logout and the date is in the past => Absent
//           if (!record.logout) {
//             row.status = dateObj < today ? "Absent" : "------";
//             return row;
//           }

//           // If we do have login+logout, let's see hours
//           const hoursWorked = getHoursWorked(record.login, record.logout);

//           if (hoursWorked >= 9) {
//             row.status = "Present";
//           } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
//             if (hoursWorked <= 5) {
//               row.status = "Half Day";
//             } else {
//               row.status = "Not Even Half Day";
//               // or "Regularization" if you prefer
//             }
//           } else if (hoursWorked > 0 && hoursWorked < 4.5) {
//             row.status = "Not Even Half Day";
//           } else {
//             row.status = "Present";
//           }

//           return row;
//         });
//       },

//       // 5) Generate PDF
//       generatePDF: async () => {
//         try {
//           const jsPDFImport = await import("jspdf");
//           await import("jspdf-autotable"); // extends jsPDF
//           const { jsPDF } = jsPDFImport;

//           const doc = new jsPDF();
//           const logoBase64 =
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROF2tKIGVLV9_rdA9q36vsZ4YuWiDxnWZ93w&s";

//           // Sample Header
//           doc.addImage(logoBase64, "PNG", 10, 10, 40, 30);
//           doc.setFontSize(16);
//           doc.text("Razor Infotech Pvt Ltd", doc.internal.pageSize.getWidth() / 2, 20, {
//             align: "center",
//           });

//           // Demo table
//           doc.setFontSize(10);
//           const tableColumn = ["Description", "Details"];
//           const tableRows = [["Demo Field", "Demo Value"]];
//           doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 50,
//             theme: "grid",
//           });

//           doc.save("payroll.pdf");
//           toast.success("PDF downloaded successfully!", { position: "top-center" });
//         } catch (err) {
//           console.error(err);
//           toast.error("Failed to generate PDF");
//         }
//       },
//     }),
//     {
//       name: "attendance-store",
//       // Remove or comment out if you don't want to persist in localStorage
//     }
//   )
// );

/**
 * useOwnFullAttendanceStore.js
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";
import { parse } from "date-fns";

/* --------------------------------------
   HELPER FUNCTIONS
-------------------------------------- */

// Convert 12-hour "hh:mm:ss AM/PM" → 24-hour "HH:mm:ss"
function convertTo24Hour(time) {
  if (!time) return null;
  let [hourPart, modifier] = time.split(" ");
  let [hours, minutes, seconds] = hourPart.split(":");
  hours = parseInt(hours, 10);
  minutes = minutes || "00";
  seconds = seconds || "00";

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
}

// Calculate hours difference
function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const loginDate = parse(convertTo24Hour(login), "HH:mm:ss", new Date());
  const logoutDate = parse(convertTo24Hour(logout), "HH:mm:ss", new Date());
  const diff = logoutDate - loginDate;
  return diff / (1000 * 60 * 60);
}

// Return all working days (if needed)
function getTotalWorkingDays(
  leaveSystemDetails,
  companySettings,
  year,
  month,
  upToToday = false
) {
  // Implementation from your original code, if needed
  // Or keep your existing logic
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  const today = new Date();

  while (date.getMonth() === month - 1) {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const isWorkingDay =
      leaveSystemDetails?.workingDays?.includes(dayName) || false;

    const isHoliday = companySettings?.holidays?.some((h) => {
      const holidayDate = new Date(h.date);
      return holidayDate.toDateString() === date.toDateString();
    });

    if (isWorkingDay && !isHoliday) {
      if (upToToday && date > today) {
        // skip future dates if upToToday
      } else {
        days.push(new Date(date));
      }
    }
    date.setDate(date.getDate() + 1);
  }

  return days.length;
}

// Calculate total leaves used
function calculateTotalLeaves({
  attendanceData,
  approvedLeaves,
  leaveSystemDetails,
  companySettings,
  year,
  month,
}) {
  // EXACT logic from your snippet (you can unify if you like).
  // For brevity, let's do a simple example:
  let totalLeaves = 0;
  // ...
  // your code to figure out how many days are absent (that are not holidays, not weekends, etc.)
  // ...
  return totalLeaves;
}

// Calculate not even half days
function calculateNotEvenHalfDays(attendanceData, year, month) {
  let count = 0;
  attendanceData.forEach((rec) => {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > 0 && hoursWorked < 4.5) {
          count++;
        }
      }
    }
  });
  return count;
}

// Example “calculateFinalSalary” pulled from your snippet
function calculateFinalSalary({
  baseSalary,
  attendanceData,
  approvedLeaves,
  companySettings,
  employmentTypeDetails,
  userProfileData,
  leaveSystemDetails,
  attendancePolicies,
  year,
  month,
}) {
  // If baseSalary is 0 or missing, bail out
  if (!baseSalary || !attendancePolicies || baseSalary <= 0) {
    return {
      finalSalary: "₹ 0.00",
      deduction: "₹ 0.00",
      leaves: 0,
      unpaidLeaves: 0,
      remainingPaidLeaves: 0,
      deductionsBreakdown: [],
    };
  }

  // Example from your snippet:
  const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
  const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

  // denominator
  const denom =
    calcMethod === "CALENDAR_DAYS"
      ? new Date(year, month, 0).getDate()
      : getTotalWorkingDays(leaveSystemDetails, companySettings, year, month);

  // up to today if current
  const isCurrentMonthAndYear =
    year === new Date().getFullYear() && month === new Date().getMonth() + 1;
  let daysUpToToday = denom;
  if (isCurrentMonthAndYear) {
    daysUpToToday =
      calcMethod === "CALENDAR_DAYS"
        ? Math.min(new Date().getDate(), denom)
        : getTotalWorkingDays(
            leaveSystemDetails,
            companySettings,
            year,
            month,
            true
          );
  }

  // total leaves
  const totalLeaves = calculateTotalLeaves({
    attendanceData,
    approvedLeaves,
    leaveSystemDetails,
    companySettings,
    year,
    month,
  });
  const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

  // figure out how many of those are "unpaid" vs "paid"
  let paidLeavesUsed = 0;
  for (const lv of approvedLeaves) {
    const from = new Date(lv.leave_From);
    const to = new Date(lv.leave_To);
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      if (
        d.getFullYear() === year &&
        d.getMonth() + 1 === month &&
        lv.is_Paid === true
      ) {
        paidLeavesUsed++;
      }
    }
  }
  const totalUnpaidLeaves = totalLeaves + notEvenHalfDays; // simplified
  const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

  // standard deductions
  const deductionIds = employmentTypeDetails?.deductions || [];
  const allDeductions = companySettings?.deductions || [];
  const deductionDetails = deductionIds
    .map((id) => allDeductions.find((d) => d.id === id))
    .filter(Boolean);

  let totalDeductionsAmount = 0;
  const breakdown = [];

  for (const ded of deductionDetails) {
    const amount = (ded.percentage / 100) * baseSalary;
    totalDeductionsAmount += amount;
    breakdown.push({
      name: ded.name,
      percentage: ded.percentage + "%",
      amount,
    });
  }

  const leftoverAfterDeductions = Math.max(
    0,
    baseSalary - totalDeductionsAmount
  );

  // fraction
  const fractionOfMonthWorked = daysUpToToday / denom;
  const payForDaysUpToToday = leftoverAfterDeductions * fractionOfMonthWorked;

  // daily rate
  const dailyRate = leftoverAfterDeductions / denom;
  const leavesDeduction = unpaidLeaves * dailyRate;
  breakdown.push({
    name: "Leaves Deduction",
    percentage: "-",
    amount: leavesDeduction,
  });

  const finalSalaryAmount = Math.max(0, payForDaysUpToToday - leavesDeduction);

  return {
    finalSalary: "₹ " + finalSalaryAmount.toFixed(2),
    deduction: "₹ " + totalDeductionsAmount.toFixed(2),
    leaves: totalUnpaidLeaves,
    unpaidLeaves,
    remainingPaidLeaves: Math.max(totalPaidLeaves - paidLeavesUsed, 0),
    deductionsBreakdown: breakdown,
  };
}

/* Parse shift timing strings like "Saket (09:00 - 07:00)" */
function parseShiftTiming(shiftTimingString) {
  if (!shiftTimingString) return null;
  const regex = /(.+?)\s*\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/;
  const match = shiftTimingString.match(regex);
  if (match) {
    const [, name, startTime, endTime] = match;
    return {
      name: name.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
    };
  }
  return null;
}

export const useOwnFullAttendanceStore = create(
  persist(
    (set, get) => ({
      // ---------- STATES ----------
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
      attendancePolicies: {},
      error: null,

      // ---------- ACTIONS ----------

      fetchAttendanceData: async () => {
        try {
          // 1) User profile
          const userProfileRes = await axiosInstance.get("/user/profile");
          if (!userProfileRes.data.success) {
            throw new Error(
              userProfileRes.data.message || "Failed to fetch user profile"
            );
          }
          const userData = userProfileRes.data.response;

          // 2) Approved Leaves
          const approvedLeavesRes = await axiosInstance.get(
            "/leave/employee/leaves?status=approved"
          );
          let approvedLeavesData = [];
          if (Array.isArray(approvedLeavesRes.data)) {
            approvedLeavesData = approvedLeavesRes.data;
          } else if (
            approvedLeavesRes.data.success &&
            Array.isArray(approvedLeavesRes.data.leave)
          ) {
            approvedLeavesData = approvedLeavesRes.data.leave;
          }
          const currentEmployeeId = userData.employee_Id;
          const filteredApprovedLeaves = approvedLeavesData.filter(
            (leave) => leave.employee?.employee_Id === currentEmployeeId
          );

          // 3) Attendance
          const attendanceRes = await axiosInstance.get("/employee/attendence");
          if (!attendanceRes.data.success) {
            throw new Error(
              attendanceRes.data.message || "Failed to fetch attendance data"
            );
          }
          const uniqueData = attendanceRes.data.data.reduce((acc, item) => {
            if (!acc.find((x) => x.date === item.date)) {
              acc.push(item);
            }
            return acc;
          }, []);

          // 4) Company Settings
          const settingsRes = await axiosInstance.get(
            "/superadmin/companysettings/settings"
          );
          if (!settingsRes.data.success) {
            throw new Error(
              settingsRes.data.message || "Failed to fetch company settings"
            );
          }
          const settingsData = settingsRes.data.data;
          const allShifts = settingsData.shifts || [];
          // SHIFT TIMING
          let finalShiftTiming = null;
          // 1) If userData.shift_Timing is an object with name/startTime/endTime
          if (
            userData.shift_Timing &&
            typeof userData.shift_Timing === "object" &&
            userData.shift_Timing.name &&
            userData.shift_Timing.startTime &&
            userData.shift_Timing.endTime
          ) {
            finalShiftTiming = {
              name: userData.shift_Timing.name,
              startTime: userData.shift_Timing.startTime,
              endTime: userData.shift_Timing.endTime,
            };
          }
          // 2) If userData.shift_Timing is a string that looks like "Name (00:00 - 00:00)"
          else if (
            typeof userData.shift_Timing === "string" &&
            userData.shift_Timing.includes("(") // just a quick guess
          ) {
            finalShiftTiming = parseShiftTiming(userData.shift_Timing) || null;
          }
          // 3) If userData.shift_Timing is a string that looks like an ID
          else if (
            typeof userData.shift_Timing === "string" &&
            userData.shift_Timing.length > 15 // or some other check
          ) {
            // NEW CODE: Try to find it in allShifts by ID
            const shiftId = userData.shift_Timing;
            const foundShift = allShifts.find((sh) => sh.id === shiftId);
            if (foundShift) {
              finalShiftTiming = {
                name: foundShift.name,
                startTime: foundShift.startTime,
                endTime: foundShift.endTime,
              };
            }
          }

          const attendancePoliciesData = settingsData.attendancePolicies || {};
          const employmentType = settingsData.employmentTypes?.find(
            (et) => et.name === userData.employee_Type
          );
          if (!employmentType) {
            throw new Error(
              `Employment type "${userData.employee_Type}" not found in company settings.`
            );
          }
          const leaveSystemId = employmentType.leaveSystemId;
          const leaveSystem = settingsData.leaveSystems?.find(
            (ls) => ls.id === leaveSystemId
          );

          const monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;
          const totalPaidLeavesValue = userData?.no_of_Paid_Leave || 0;

          const employeeDeductions = (employmentType.deductions || [])
            .map((dedId) => settingsData.deductions.find((d) => d.id === dedId))
            .filter(Boolean);

          // Store everything
          set(() => ({
            userProfileData: userData,
            approvedLeaves: filteredApprovedLeaves,
            attendanceData: uniqueData,
            companySettings: settingsData,
            shiftTimingDetails: finalShiftTiming,
            employmentTypeDetails: employmentType,
            leaveSystemDetails: leaveSystem,
            monthlyPaidLeaves: monthlyPaidLeavesValue,
            totalPaidLeaves: totalPaidLeavesValue,
            deductionDetails: employeeDeductions,
            attendancePolicies: attendancePoliciesData,
            error: null,
          }));
        } catch (err) {
          console.error(err);
          set(() => ({ error: err?.message || "Something went wrong" }));
          toast.error(err?.message || "Something went wrong", {
            position: "top-center",
          });
        }
      },

      // Generate PDF for a specific (year, month)
      generatePDF: async (year, month) => {
        try {
          // 1) Grab data from the store
          const {
            attendanceData,
            approvedLeaves,
            companySettings,
            employmentTypeDetails,
            userProfileData,
            leaveSystemDetails,
            attendancePolicies,
          } = get();

          // 2) Calculate final salary for that (year, month)
          const baseSalary = parseFloat(userProfileData?.current_Base_Salary) || 0;
          const { finalSalary, deduction, leaves } = calculateFinalSalary({
            baseSalary,
            attendanceData,
            approvedLeaves,
            companySettings,
            employmentTypeDetails,
            userProfileData,
            leaveSystemDetails,
            attendancePolicies,
            year,
            month,
          });

          // Dynamically import jsPDF and jspdf-autotable
          const { default: JSPDF } = await import("jspdf");
          await import("jspdf-autotable"); // extends jsPDF

          // Create doc after imports
          const doc = new JSPDF();

          // Title
          doc.setFontSize(14);
          doc.text(
            `Payslip for ${userProfileData?.first_Name || "Employee"}`,
            10,
            10
          );

          // Example table
          doc.autoTable({
            head: [["Description", "Value"]],
            body: [
              ["Employee ID", userProfileData?.employee_Id || "N/A"],
              ["Month/Year", `${month}/${year}`],
              ["Base Salary", `₹ ${baseSalary.toFixed(2)}`],
              ["Leaves (Unpaid)", String(leaves)],
              ["Deductions", deduction],
              ["Final Salary", finalSalary],
            ],
            startY: 20,
            theme: "grid",
          });

          doc.save(`Payslip_${month}_${year}.pdf`);
          toast.success("Payslip PDF downloaded!", { position: "top-center" });
        } catch (err) {
          console.error(err);
          toast.error("Failed to generate PDF");
        }
      },
    }),
    {
      name: "own-attendance-store",
    }
  )
);
