

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axiosInstance from "../service/axiosInstance";
// import { toast } from "react-hot-toast";
// import { parse, differenceInHours, differenceInMinutes } from "date-fns";

// // Utility to parse shift timing from user data: "Saket (09:00 - 07:00)"
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

// // Convert 12-hour time format ("10:30:00 AM") to 24-hour time string ("10:30:00")
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

// // Convert date string (e.g. "2025-01-20") to a JS Date object in local time
// function toLocalDate(dateStr) {
//   // Prevent invalid date
//   if (!dateStr) return null;
//   return new Date(dateStr + "T00:00:00");
// }

// // Convert attendance record times (login/logout) to hours difference
// function getHoursWorked(login, logout) {
//   if (!login || !logout) return 0;
//   const loginDate = parse(convertTo24Hour(login), "HH:mm:ss", new Date());
//   const logoutDate = parse(convertTo24Hour(logout), "HH:mm:ss", new Date());
//   const diff = logoutDate - loginDate;
//   return diff / (1000 * 60 * 60);
// }

// // Generate all days in a given month of a year
// function getAllDaysInMonth(year, month) {
//   const days = [];
//   // month is 1-based for external usage
//   let date = new Date(year, month - 1, 1);
//   while (date.getMonth() === month - 1) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
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

//       // Confirmation dialog states for PDF
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

//       // Fetches all required data from the server
//       fetchAttendanceData: async () => {
//         try {
//           const accessToken = localStorage.getItem("accessToken");

//           // 1) Fetch User Profile
//           const userProfileRes = await axiosInstance.get("/user/user-profile");
//           if (!userProfileRes.data.success) {
//             throw new Error(
//               userProfileRes.data.message || "Failed to fetch user profile"
//             );
//           }
//           const userData = userProfileRes.data.response;

//           // 2) Fetch Approved Leaves
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
//           // Filter leaves for current employee
//           const currentEmployeeId = userData.employee_Id;
//           const filteredApprovedLeaves = approvedLeavesData.filter(
//             (leave) => leave.employee?.employee_Id === currentEmployeeId
//           );

//           // 3) Fetch attendance data
//           const attendanceRes = await axiosInstance.get("/employee/attendence");
//           if (!attendanceRes.data.success) {
//             throw new Error(
//               attendanceRes.data.message || "Failed to fetch attendance data"
//             );
//           }
//           // remove duplicates by date
//           const uniqueData = attendanceRes.data.data.reduce((acc, current) => {
//             const found = acc.find((item) => item.date === current.date);
//             if (!found) acc.push(current);
//             return acc;
//           }, []);

//           // 4) Fetch company settings
//           const companySettingsRes = await axiosInstance.get(
//             "/superadmin/companysettings/settings"
//           );
//           if (!companySettingsRes.data.success) {
//             throw new Error(
//               companySettingsRes.data.message || "Failed to fetch company settings"
//             );
//           }

//           const settingsData = companySettingsRes.data.data;

//           // parse shift timing
//           const shiftTimingString = userData.shift_Timing;
//           const shiftTiming = parseShiftTiming(shiftTimingString);

//           // attendance policies
//           const attendancePoliciesData = settingsData.attendancePolicies || {};

//           // find employment type details
//           const employmentType = settingsData.employmentTypes?.find(
//             (et) => et.name === userData.employee_Type
//           );

//           if (!employmentType) {
//             throw new Error(
//               `Employment type "${userData.employee_Type}" not found in company settings.`
//             );
//           }

//           // find leave system
//           const leaveSystemId = employmentType.leaveSystemId;
//           const leaveSystem = settingsData.leaveSystems?.find(
//             (ls) => ls.id === leaveSystemId
//           );

//           const monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;

//           // Calculate total paid leaves
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

//           // get deductions
//           const employeeDeductions = (employmentType.deductions || [])
//             .map((deductionId) =>
//               settingsData.deductions.find((d) => d.id === deductionId)
//             )
//             .filter((d) => d !== undefined);

//           // Update the store with all data
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

//       // ---- CALCULATION METHODS (mirroring old code) ----
//       calculateTotalShifts: (year, month) => {
//         const { attendanceData } = get();
//         return attendanceData.filter((record) => {
//           const d = toLocalDate(record.date);
//           return (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login &&
//             record.logout
//           );
//         }).length;
//       },

//       calculateTotalLates: (year, month) => {
//         const { attendanceData, attendancePolicies, shiftTimingDetails } = get();
//         const gracePeriod = attendancePolicies?.gracePeriodMinutes || 15;
//         if (!shiftTimingDetails?.startTime) return 0;

//         // parse shift start + grace
//         const shiftStart24 = convertTo24Hour(shiftTimingDetails.startTime);
//         if (!shiftStart24) return 0;

//         let shiftStartH = parse(shiftStart24, "HH:mm:ss", new Date());
//         shiftStartH.setMinutes(shiftStartH.getMinutes() + gracePeriod);

//         let totalLate = 0;
//         attendanceData.forEach((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login
//           ) {
//             const loginDateTime = parse(convertTo24Hour(record.login), "HH:mm:ss", new Date());
//             if (loginDateTime > shiftStartH) {
//               totalLate++;
//             }
//           }
//         });
//         return totalLate;
//       },

//       calculateTotalCompletedDays: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const minHoursForFullDay = attendancePolicies?.fullDayHours || 9;
//         return attendanceData.filter((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login &&
//             record.logout
//           ) {
//             const hoursWorked = getHoursWorked(record.login, record.logout);
//             return hoursWorked >= minHoursForFullDay;
//           }
//           return false;
//         }).length;
//       },

//       calculateRegularizations: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const minHours = attendancePolicies?.regularizationCriteria?.minHours || 7;
//         const maxHours = attendancePolicies?.regularizationCriteria?.maxHours || 9;
//         return attendanceData.filter((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login &&
//             record.logout
//           ) {
//             const hoursWorked = getHoursWorked(record.login, record.logout);
//             return hoursWorked >= minHours && hoursWorked < maxHours;
//           }
//           return false;
//         }).length;
//       },

//       calculateTotalHalfDays: (year, month) => {
//         const { attendanceData, attendancePolicies } = get();
//         const minWorkingHrs = attendancePolicies?.minimumWorkingHours || 4.5;
//         const halfDayHrs = attendancePolicies?.halfDayHours || 5;
//         return attendanceData.filter((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login &&
//             record.logout
//           ) {
//             const hoursWorked = getHoursWorked(record.login, record.logout);
//             // hours between ~4.5 and 5 => half day
//             return hoursWorked > minWorkingHrs && hoursWorked <= halfDayHrs;
//           }
//           return false;
//         }).length;
//       },

//       calculateNotEvenHalfDays: (year, month) => {
//         const { attendanceData } = get();
//         let count = 0;
//         attendanceData.forEach((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d?.getFullYear() === year &&
//             d?.getMonth() + 1 === month &&
//             record.login &&
//             record.logout
//           ) {
//             const hoursWorked = getHoursWorked(record.login, record.logout);
//             if (hoursWorked > 0 && hoursWorked < 4.5) {
//               count++;
//             }
//           }
//         });
//         return count;
//       },

//       calculateNotLoggedOut: (year, month) => {
//         const { attendanceData } = get();
//         const today = new Date();
//         let count = 0;
//         attendanceData.forEach((record) => {
//           const d = toLocalDate(record.date);
//           if (
//             d &&
//             d.getFullYear() === year &&
//             d.getMonth() + 1 === month &&
//             record.login &&
//             !record.logout &&
//             d <= today
//           ) {
//             count++;
//           }
//         });
//         return count;
//       },

//       calculateTotalLeaves: (year, month) => {
//         const { attendanceData, leaveSystemDetails, companySettings } = get();
//         const allDays = getAllDaysInMonth(year, month);
//         const today = new Date();
//         // Skip days after "today" if the selected month/year is current
//         // but the old code logic considered future days as absent if they're in the same month. Adapt if needed.

//         let totalLeaves = 0;
//         allDays.forEach((dateObj) => {
//           const formattedDate = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//           // check working day
//           const isWorkingDay =
//             leaveSystemDetails?.workingDays?.includes(dayName) ?? false;

//           // check holiday
//           const isHoliday = companySettings?.holidays?.some(
//             (holiday) =>
//               new Date(holiday.date).toISOString().split("T")[0] === formattedDate
//           );

//           if (!isWorkingDay || isHoliday) {
//             // not a working day or holiday => skip
//             return;
//           }

//           // see if we have attendance
//           const record = attendanceData.find((r) => r.date === formattedDate);
//           if (dateObj <= today) {
//             // if date is in the past (or today) but no login/logout => absent
//             if (!record || !record.login || !record.logout) {
//               totalLeaves++;
//             }
//           }
//         });
//         return totalLeaves;
//       },

//       // Summaries for side panel (matching new UI's "overviewData")
//       getSummaryStats: (year, month) => {
//         // We'll map them into the same structure the new UI expects
//         const totalShifts = get().calculateTotalShifts(year, month);
//         const completedShifts = get().calculateTotalCompletedDays(year, month);
//         const totalLates = get().calculateTotalLates(year, month);
//         const halfDays = get().calculateTotalHalfDays(year, month);
//         const notEvenHalfDays = get().calculateNotEvenHalfDays(year, month);
//         const regDays = get().calculateRegularizations(year, month);
//         const notLoggedOut = get().calculateNotLoggedOut(year, month);
//         const totalLeaves = get().calculateTotalLeaves(year, month);

//         // We can define present vs absent for the "Present" vs "Absent" row
//         // e.g. "Present" might be completed shifts + halfDays + notEvenHalfDays + regDays
//         // or only the ones that have some login? Up to interpretation:
//         // Let's do "Present" = (# with login & logout) or hours > 0
//         const { attendanceData } = get();
//         let totalPresent = 0;
//         let totalAbsent = 0;
//         let totalHoliday = 0; // from company settings or leaves?

//         const allDays = getAllDaysInMonth(year, month);
//         const today = new Date();
//         allDays.forEach((dateObj) => {
//           const formattedDate = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//           const isHoliday = get().companySettings?.holidays?.some(
//             (h) => new Date(h.date).toISOString().split("T")[0] === formattedDate
//           );
//           if (isHoliday) {
//             totalHoliday++;
//             return;
//           }
//           // is working day?
//           const isWorkingDay =
//             get().leaveSystemDetails?.workingDays?.includes(dayName) ?? false;
//           if (!isWorkingDay) {
//             // treat as holiday/off day
//             totalHoliday++;
//             return;
//           }
//           const record = attendanceData.find((r) => r.date === formattedDate);
//           if (dateObj <= today) {
//             if (record?.login && record?.logout) {
//               totalPresent++;
//             } else {
//               totalAbsent++;
//             }
//           }
//         });

//         // totalPaidLeaves from store
//         const { totalPaidLeaves } = get();

//         // Return array of overview items (same shape as new UI used)
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
//             value: totalPaidLeaves, // from store
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
//             value: "--", // not implemented
//             bg: "bg-indigo-100 dark:bg-indigo-900",
//             text: "text-indigo-700 dark:text-indigo-100",
//           },
//         ];
//       },

//       // Build final "display data" for table: merges "allDaysInMonth" with attendance
//       getDisplayedAttendance: (year, month) => {
//         const {
//           attendanceData,
//           approvedLeaves,
//           leaveSystemDetails,
//           companySettings,
//         } = get();

//         const allDays = getAllDaysInMonth(year, month);
//         const today = new Date();

//         // Create a set of approved leave dates
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

//         const rows = [];
//         allDays.forEach((dateObj, idx) => {
//           const formattedDate = dateObj.toISOString().split("T")[0];
//           const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

//           // Check if holiday
//           const isHoliday = companySettings?.holidays?.some(
//             (h) => new Date(h.date).toISOString().split("T")[0] === formattedDate
//           );

//           // Check if is working day
//           const isWorkingDay =
//             leaveSystemDetails?.workingDays?.includes(dayName) ?? false;

//           // Check if it's an approved leave
//           const isApprovedLeave = approvedLeaveDates.has(formattedDate);

//           const record = attendanceData.find((r) => r.date === formattedDate);

//           // Initialize result row
//           let row = {
//             sl: idx + 1,
//             date: formattedDate,
//             day: dayName,
//             logInTime: "------",
//             logOutTime: "------",
//             totalBreak: "N/A", // old code didn't track breaks
//             status: "------",
//           };

//           if (isApprovedLeave) {
//             row.status = "Holiday";
//             rows.push(row);
//             return;
//           }

//           // If not working day or holiday => "Holiday"
//           if (!isWorkingDay || isHoliday) {
//             row.status = "Holiday";
//             rows.push(row);
//             return;
//           }

//           // If we do have an attendance record:
//           if (record) {
//             if (record.login) {
//               row.logInTime = record.login;
//             }
//             if (record.logout) {
//               row.logOutTime = record.logout;
//             }
//             const hoursWorked = getHoursWorked(record.login, record.logout);

//             if (!record.login || !record.logout) {
//               // partial or no data
//               if (dateObj < today) {
//                 // Past date => "Absent"
//                 row.status = "Absent";
//               } else {
//                 row.status = "------";
//               }
//             } else {
//               // We have login + logout
//               if (hoursWorked >= 9) {
//                 row.status = "Present";
//               } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
//                 // old code logic: < 5 => half day, < 4.5 => "Not Even Half Day"
//                 // new code example lumps 4.5 - 9 => "Half Day"? We'll unify with old code:
//                 if (hoursWorked >= 4.5 && hoursWorked <= 5) {
//                   row.status = "Half Day";
//                 } else if (hoursWorked > 5 && hoursWorked < 9) {
//                   // Could call it "Regularization"? We'll keep it simple:
//                   row.status = "Not Even Half Day";
//                 }
//                 // Adjust as you see fit
//               } else if (hoursWorked > 0 && hoursWorked < 4.5) {
//                 row.status = "Not Even Half Day";
//               } else {
//                 // fallback
//                 row.status = "Present";
//               }
//             }
//           } else {
//             // no record
//             if (dateObj <= today) {
//               row.status = "Absent";
//             } else {
//               row.status = "------";
//             }
//           }
//           rows.push(row);
//         });
//         return rows;
//       },

//       // Generate PDF after user confirms from dialog
//       generatePDF: async () => {
//         try {
//           const jsPDFImport = await import("jspdf");
//           const autoTableImport = await import("jspdf-autotable");
//           const { jsPDF } = jsPDFImport;

//           const doc = new jsPDF();
//           const logoBase64 =
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROF2tKIGVLV9_rdA9q36vsZ4YuWiDxnWZ93w&s"; // demo

//           // Add logo
//           doc.addImage(logoBase64, "PNG", 10, 10, 50, 30);

//           // Some example text or tables
//           doc.setFontSize(16);
//           doc.text("Razor Infotech Pvt Ltd", doc.internal.pageSize.getWidth() / 2, 20, {
//             align: "center",
//           });

//           doc.setFontSize(10);
//           const tableColumn = ["Description", "Details"];
//           const tableRows = [];
//           tableRows.push(["Demo Field", "Demo Value"]);

//           doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 50,
//             theme: "grid",
//           });

//           doc.save("payroll.pdf");
//           toast.success("PDF downloaded successfully!");
//         } catch (error) {
//           console.error(error);
//           toast.error("Failed to generate PDF");
//         }
//       },
//     }),
//     {
//       name: "attendance-store", // persist name
//       // If you want to disable persistence in localStorage, remove or comment out
//     }
//   )
// );


// src/store/useOwnFullAttendanceStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";
import { parse } from "date-fns";

/** 
 * Utility to parse shift timing: "Saket (09:00 - 07:00)"
 */
function parseShiftTiming(shiftTimingString) {
  const regex = /(.+?)\s*\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/;
  const match = shiftTimingString?.match(regex);
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

/** 
 * Convert 12-hour time format (e.g. "10:30:00 AM") → 24-hour string ("10:30:00")
 */
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

/** 
 * Convert YYYY-MM-DD → local Date 
 */
function toLocalDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr + "T00:00:00");
}

/** 
 * Convert login+logout → hours difference 
 */
function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const loginDate = parse(convertTo24Hour(login), "HH:mm:ss", new Date());
  const logoutDate = parse(convertTo24Hour(logout), "HH:mm:ss", new Date());
  const diff = logoutDate - loginDate;
  return diff / (1000 * 60 * 60);
}

/** 
 * Get all days in a specific month of a year
 */
function getAllDaysInMonth(year, month) {
  const days = [];
  let date = new Date(year, month - 1, 1);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/**
 * Sum up the total break time from the "breaks" array. 
 * - If `duration` is a positive number, treat it as minutes.
 * - Otherwise, compute from `start` → `end`.
 */
function getTotalBreakTime(breaks = []) {
  let totalMinutes = 0;

  breaks.forEach((br) => {
    if (typeof br.duration === "number" && br.duration > 0) {
      // The API already provided a duration in minutes
      totalMinutes += br.duration;
    } else if (br.start && br.end) {
      // We'll calculate from timestamps
      const start = new Date(br.start);
      const end = new Date(br.end);
      const diffMs = end - start;
      const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
      totalMinutes += diffMins;
    }
  });

  // Convert total minutes → "Xh Ym" format
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

export const useOwnFullAttendanceStore = create(
  persist(
    (set, get) => ({
      // States
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

      // Confirmation dialog for PDF
      pdfDialogOpen: false,
      pdfDialogTitle: "",
      pdfDialogMessage: "",
      onPdfConfirm: null,
      onPdfCancel: null,

      // ---- ACTIONS ----
      setPdfDialogOpen: (open) => set(() => ({ pdfDialogOpen: open })),
      setPdfDialogTitle: (title) => set(() => ({ pdfDialogTitle: title })),
      setPdfDialogMessage: (message) => set(() => ({ pdfDialogMessage: message })),
      setOnPdfConfirm: (fn) => set(() => ({ onPdfConfirm: fn })),
      setOnPdfCancel: (fn) => set(() => ({ onPdfCancel: fn })),

      // 1) Fetch all needed data
      fetchAttendanceData: async () => {
        try {
          // 1.1) User Profile
          const userProfileRes = await axiosInstance.get("/user/user-profile");
          if (!userProfileRes.data.success) {
            throw new Error(
              userProfileRes.data.message || "Failed to fetch user profile"
            );
          }
          const userData = userProfileRes.data.response;

          // 1.2) Approved Leaves
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

          // 1.3) Attendance Data
          const attendanceRes = await axiosInstance.get("/employee/attendence");
          if (!attendanceRes.data.success) {
            throw new Error(
              attendanceRes.data.message || "Failed to fetch attendance data"
            );
          }
          // Remove duplicates by date
          const uniqueData = attendanceRes.data.data.reduce((acc, item) => {
            const found = acc.find((x) => x.date === item.date);
            if (!found) acc.push(item);
            return acc;
          }, []);

          // 1.4) Company Settings
          const companySettingsRes = await axiosInstance.get(
            "/superadmin/companysettings/settings"
          );
          if (!companySettingsRes.data.success) {
            throw new Error(
              companySettingsRes.data.message || "Failed to fetch settings"
            );
          }
          const settingsData = companySettingsRes.data.data;

          // Parse shift timing from user
          const shiftTiming = parseShiftTiming(userData.shift_Timing);

          // Attendance policies
          const attendancePoliciesData = settingsData.attendancePolicies || {};

          // Find employment type details
          const employmentType = settingsData.employmentTypes?.find(
            (et) => et.name === userData.employee_Type
          );
          if (!employmentType) {
            throw new Error(
              `Employment type "${userData.employee_Type}" not found in company settings.`
            );
          }

          // Find leave system
          const leaveSystemId = employmentType.leaveSystemId;
          const leaveSystem = settingsData.leaveSystems?.find(
            (ls) => ls.id === leaveSystemId
          );

          // Paid leaves
          const monthlyPaidLeavesValue = leaveSystem?.monthlyPaidLeaves || 0;
          const dateOfJoining = new Date(userData.date_of_Joining);
          const today = new Date();
          let monthsSinceJoining =
            (today.getFullYear() - dateOfJoining.getFullYear()) * 12 +
            (today.getMonth() - dateOfJoining.getMonth()) -
            1;
          monthsSinceJoining = Math.max(0, monthsSinceJoining);

          const totalPaidLeavesValue =
            (userData.no_of_Paid_Leave || 0) +
            monthsSinceJoining * monthlyPaidLeavesValue;

          // Deductions
          const employeeDeductions = (employmentType.deductions || [])
            .map((deductionId) =>
              settingsData.deductions.find((d) => d.id === deductionId)
            )
            .filter(Boolean);

          // Put everything in the store
          set(() => ({
            userProfileData: userData,
            approvedLeaves: filteredApprovedLeaves,
            attendanceData: uniqueData,
            companySettings: settingsData,
            shiftTimingDetails: shiftTiming,
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
          toast.error(err?.message || "Something went wrong", { position: "top-center" });
        }
      },

      // 2) Calculation Methods (Mirroring Old Code)

      // Example: how many days have login+logout 
      calculateTotalShifts: (year, month) => {
        const { attendanceData } = get();
        return attendanceData.filter((rec) => {
          const d = toLocalDate(rec.date);
          return (
            d?.getFullYear() === year &&
            d?.getMonth() + 1 === month &&
            rec.login &&
            rec.logout
          );
        }).length;
      },

      calculateTotalLates: (year, month) => {
        const { attendanceData, attendancePolicies, shiftTimingDetails } = get();
        const grace = attendancePolicies?.gracePeriodMinutes || 15;
        if (!shiftTimingDetails?.startTime) return 0;
        const shiftStart = parse(convertTo24Hour(shiftTimingDetails.startTime), "HH:mm:ss", new Date());
        shiftStart.setMinutes(shiftStart.getMinutes() + grace);

        let lateCount = 0;
        attendanceData.forEach((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login) {
              const loginDateTime = parse(convertTo24Hour(rec.login), "HH:mm:ss", new Date());
              if (loginDateTime > shiftStart) {
                lateCount++;
              }
            }
          }
        });
        return lateCount;
      },

      calculateTotalCompletedDays: (year, month) => {
        const { attendanceData, attendancePolicies } = get();
        const fullDayHours = attendancePolicies?.fullDayHours || 9;
        return attendanceData.filter((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login && rec.logout) {
              const hrs = getHoursWorked(rec.login, rec.logout);
              return hrs >= fullDayHours;
            }
          }
          return false;
        }).length;
      },

      calculateRegularizations: (year, month) => {
        const { attendanceData, attendancePolicies } = get();
        const minHours = attendancePolicies?.regularizationCriteria?.minHours || 7;
        const maxHours = attendancePolicies?.regularizationCriteria?.maxHours || 9;
        return attendanceData.filter((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login && rec.logout) {
              const hrs = getHoursWorked(rec.login, rec.logout);
              return hrs >= minHours && hrs < maxHours;
            }
          }
          return false;
        }).length;
      },

      calculateTotalHalfDays: (year, month) => {
        const { attendanceData, attendancePolicies } = get();
        const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
        const halfDay = attendancePolicies?.halfDayHours || 5;
        return attendanceData.filter((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login && rec.logout) {
              const hrs = getHoursWorked(rec.login, rec.logout);
              return hrs > minWork && hrs <= halfDay;
            }
          }
          return false;
        }).length;
      },

      calculateNotEvenHalfDays: (year, month) => {
        const { attendanceData } = get();
        let count = 0;
        attendanceData.forEach((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login && rec.logout) {
              const hrs = getHoursWorked(rec.login, rec.logout);
              if (hrs > 0 && hrs < 4.5) {
                count++;
              }
            }
          }
        });
        return count;
      },

      calculateNotLoggedOut: (year, month) => {
        const { attendanceData } = get();
        const today = new Date();
        let count = 0;
        attendanceData.forEach((rec) => {
          const d = toLocalDate(rec.date);
          if (d && d.getFullYear() === year && d.getMonth() + 1 === month) {
            if (rec.login && !rec.logout && d <= today) {
              count++;
            }
          }
        });
        return count;
      },

      calculateTotalLeaves: (year, month) => {
        const { attendanceData, leaveSystemDetails, companySettings } = get();
        const daysInMonth = getAllDaysInMonth(year, month);
        const today = new Date();
        let totalLeaves = 0;

        daysInMonth.forEach((dateObj) => {
          const formatted = dateObj.toISOString().split("T")[0];
          const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          const isWorkDay = leaveSystemDetails?.workingDays?.includes(dayName);
          const isHoliday = companySettings?.holidays?.some(
            (h) => new Date(h.date).toISOString().split("T")[0] === formatted
          );

          // If non-working or holiday, skip
          if (!isWorkDay || isHoliday) return;

          // Check if there's an attendance record
          const rec = attendanceData.find((r) => r.date === formatted);
          if (dateObj <= today) {
            if (!rec || !rec.login || !rec.logout) {
              totalLeaves++;
            }
          }
        });
        return totalLeaves;
      },

      // 3) Summary Stats for side panel
      getSummaryStats: (year, month) => {
        const totalShifts = get().calculateTotalShifts(year, month);
        const completedShifts = get().calculateTotalCompletedDays(year, month);
        const totalLates = get().calculateTotalLates(year, month);
        const halfDays = get().calculateTotalHalfDays(year, month);
        const notEvenHalfDays = get().calculateNotEvenHalfDays(year, month);
        const regDays = get().calculateRegularizations(year, month);
        const notLoggedOut = get().calculateNotLoggedOut(year, month);
        const totalLeaves = get().calculateTotalLeaves(year, month);

        // "Present" vs "Absent" vs "Holiday"
        const { attendanceData, companySettings, leaveSystemDetails, totalPaidLeaves } = get();
        let totalPresent = 0;
        let totalAbsent = 0;
        let totalHoliday = 0;

        const daysInMonth = getAllDaysInMonth(year, month);
        const today = new Date();

        daysInMonth.forEach((dateObj) => {
          const formatted = dateObj.toISOString().split("T")[0];
          const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          const isHoliday = companySettings?.holidays?.some(
            (h) => new Date(h.date).toISOString().split("T")[0] === formatted
          );
          const isWorkDay = leaveSystemDetails?.workingDays?.includes(dayName);

          if (isHoliday || !isWorkDay) {
            totalHoliday++;
            return;
          }
          const rec = attendanceData.find((r) => r.date === formatted);
          if (dateObj <= today) {
            if (rec?.login && rec?.logout) {
              totalPresent++;
            } else {
              totalAbsent++;
            }
          }
        });

        // Return in UI-friendly shape
        return [
          {
            label: "Total Present",
            short: "P",
            value: totalPresent,
            bg: "bg-green-100 dark:bg-green-900",
            text: "text-green-700 dark:text-green-100",
          },
          {
            label: "Total Absent",
            short: "A",
            value: totalAbsent,
            bg: "bg-red-100 dark:bg-red-900",
            text: "text-red-700 dark:text-red-100",
          },
          {
            label: "Total Shifts",
            short: "TS",
            value: totalShifts,
            bg: "bg-purple-100 dark:bg-purple-900",
            text: "text-purple-700 dark:text-purple-100",
          },
          {
            label: "Completed Shifts",
            short: "CS",
            value: completedShifts,
            bg: "bg-orange-100 dark:bg-orange-900",
            text: "text-orange-700 dark:text-orange-100",
          },
          {
            label: "Total Paid Leave",
            short: "PL",
            value: totalPaidLeaves,
            bg: "bg-yellow-100 dark:bg-yellow-700",
            text: "text-yellow-700 dark:text-yellow-100",
          },
          {
            label: "Total Leave",
            short: "TL",
            value: totalLeaves,
            bg: "bg-green-50 dark:bg-green-900",
            text: "text-green-700 dark:text-green-100",
          },
          {
            label: "Total Lates",
            short: "L",
            value: totalLates,
            bg: "bg-blue-100 dark:bg-blue-900",
            text: "text-blue-700 dark:text-blue-100",
          },
          {
            label: "Half Day",
            short: "H",
            value: halfDays,
            bg: "bg-pink-100 dark:bg-pink-900",
            text: "text-pink-700 dark:text-pink-100",
          },
          {
            label: "Not Even Half Day",
            short: "?",
            value: notEvenHalfDays,
            bg: "bg-gray-100 dark:bg-gray-800",
            text: "text-gray-700 dark:text-gray-200",
          },
          {
            label: "Regularization",
            short: "R",
            value: regDays,
            bg: "bg-cyan-100 dark:bg-cyan-900",
            text: "text-cyan-700 dark:text-cyan-100",
          },
          {
            label: "Not Logged Out",
            short: "NO",
            value: notLoggedOut,
            bg: "bg-stone-100 dark:bg-stone-900",
            text: "text-stone-700 dark:text-stone-100",
          },
          {
            label: "Total Holiday",
            short: "TH",
            value: totalHoliday,
            bg: "bg-black",
            text: "text-white",
          },
          {
            label: "Overtime",
            short: "O",
            value: "--",
            bg: "bg-indigo-100 dark:bg-indigo-900",
            text: "text-indigo-700 dark:text-indigo-100",
          },
        ];
      },

      // 4) Build final table data
      getDisplayedAttendance: (year, month) => {
        const {
          attendanceData,
          approvedLeaves,
          leaveSystemDetails,
          companySettings,
        } = get();
        const daysInMonth = getAllDaysInMonth(year, month);
        const today = new Date();

        // Approved leave dates
        const approvedLeaveDates = new Set();
        approvedLeaves.forEach((leave) => {
          const fromDate = new Date(leave.leave_From);
          const toDate = new Date(leave.leave_To);
          for (
            let d = new Date(fromDate);
            d <= toDate;
            d.setDate(d.getDate() + 1)
          ) {
            approvedLeaveDates.add(d.toISOString().split("T")[0]);
          }
        });

        return daysInMonth.map((dateObj, idx) => {
          const formattedDate = dateObj.toISOString().split("T")[0];
          const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          let row = {
            sl: idx + 1,
            date: formattedDate,
            day: dayName,
            logInTime: "------",
            logOutTime: "------",
            totalBreak: "N/A",
            status: "------",
          };

          // Is it holiday or off-day or on approved leave?
          const isApprovedLeave = approvedLeaveDates.has(formattedDate);
          const isHoliday = companySettings?.holidays?.some(
            (h) => new Date(h.date).toISOString().split("T")[0] === formattedDate
          );
          const isWorkingDay =
            leaveSystemDetails?.workingDays?.includes(dayName) ?? false;

          if (isApprovedLeave) {
            row.status = "Holiday";
            return row;
          }
          if (!isWorkingDay || isHoliday) {
            row.status = "Holiday";
            return row;
          }

          // See if there's an attendance record
          const record = attendanceData.find((r) => r.date === formattedDate);
          if (!record) {
            // Past date => Absent, future => "------"
            row.status = dateObj < today ? "Absent" : "------";
            return row;
          }

          // We have some record
          if (record.login) {
            row.logInTime = record.login;
          }
          if (record.logout) {
            row.logOutTime = record.logout;
          }
          // Calculate total break from record.breaks if any
          if (record.breaks && record.breaks.length > 0) {
            row.totalBreak = getTotalBreakTime(record.breaks);
          }

          // If no logout and the date is in the past => Absent
          if (!record.logout) {
            row.status = dateObj < today ? "Absent" : "------";
            return row;
          }

          // If we do have login+logout, let's see hours
          const hoursWorked = getHoursWorked(record.login, record.logout);

          if (hoursWorked >= 9) {
            row.status = "Present";
          } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
            if (hoursWorked <= 5) {
              row.status = "Half Day";
            } else {
              row.status = "Not Even Half Day"; 
              // or "Regularization" if you prefer
            }
          } else if (hoursWorked > 0 && hoursWorked < 4.5) {
            row.status = "Not Even Half Day";
          } else {
            row.status = "Present";
          }

          return row;
        });
      },

      // 5) Generate PDF
      generatePDF: async () => {
        try {
          const jsPDFImport = await import("jspdf");
          await import("jspdf-autotable"); // extends jsPDF
          const { jsPDF } = jsPDFImport;

          const doc = new jsPDF();
          const logoBase64 =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROF2tKIGVLV9_rdA9q36vsZ4YuWiDxnWZ93w&s";

          // Sample Header
          doc.addImage(logoBase64, "PNG", 10, 10, 40, 30);
          doc.setFontSize(16);
          doc.text("Razor Infotech Pvt Ltd", doc.internal.pageSize.getWidth() / 2, 20, {
            align: "center",
          });

          // Demo table
          doc.setFontSize(10);
          const tableColumn = ["Description", "Details"];
          const tableRows = [["Demo Field", "Demo Value"]];
          doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50,
            theme: "grid",
          });

          doc.save("payroll.pdf");
          toast.success("PDF downloaded successfully!", { position: "top-center" });
        } catch (err) {
          console.error(err);
          toast.error("Failed to generate PDF");
        }
      },
    }),
    {
      name: "attendance-store",
      // Remove or comment out if you don't want to persist in localStorage
    }
  )
);

