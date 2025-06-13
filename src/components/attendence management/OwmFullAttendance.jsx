// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiPrinter, FiDownload, FiSearch } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import 'react-clock/dist/Clock.css';      // React Clock's default styles
// import 'react-time-picker/dist/TimePicker.css'; 
// import TimePicker from 'react-time-picker';
// import axiosInstance from "../../service/axiosInstance";

// // If your store has a PDF method, import that from your Zustand store
// import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";
// import {
//   FiBriefcase,
//   FiCalendar,
//   FiAlertTriangle,
//   FiSun,
//   FiMoon,
//   FiCheckCircle,
//   FiLogOut,
// } from "react-icons/fi";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// /* 
//   --------------------------------------------------------------------------------------
//   HELPER FUNCTIONS (no TypeScript, purely JS)
//   --------------------------------------------------------------------------------------
// */

// // Returns all days of a given (year, month) pinned around noon to avoid TZ shift:
// function getAllDaysInMonth(year, month) {
//   const days = [];
//   let date = new Date(year, month - 1, 1, 12);
//   while (date.getMonth() === month - 1) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// // Convert "hh:mm:ss AM/PM" → "HH:mm:ss" in 24-hour format
// function convertTo24Hour(timeString) {
//   if (!timeString) return null;
//   const [timePart, ampm] = timeString.split(" ");
//   if (!timePart || !ampm) return null;

//   let [hours, minutes, seconds] = timePart.split(":").map(Number);
//   hours = hours || 0;
//   minutes = minutes || 0;
//   seconds = seconds || 0;

//   if (ampm.toUpperCase() === "PM" && hours !== 12) {
//     hours += 12;
//   }
//   if (ampm.toUpperCase() === "AM" && hours === 12) {
//     hours = 0;
//   }
//   return (
//     String(hours).padStart(2, "0") +
//     ":" +
//     String(minutes).padStart(2, "0") +
//     ":" +
//     String(seconds).padStart(2, "0")
//   );
// }

// // Calculate hours difference between login/logout
// function getHoursWorked(login, logout) {
//   if (!login || !logout) return 0;
//   const login24 = convertTo24Hour(login);
//   const logout24 = convertTo24Hour(logout);
//   if (!login24 || !logout24) return 0;

//   const loginDate = new Date("1970-01-01T" + login24);
//   const logoutDate = new Date("1970-01-01T" + logout24);
//   const diffMs = logoutDate - loginDate;
//   return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
// }

// // If your breaks contain either durations in minutes or start/end times:
// function getTotalBreakTime(breaks = []) {
//   let totalMinutes = 0;
//   for (const br of breaks) {
//     if (typeof br.duration === "number" && br.duration > 0) {
//       totalMinutes += br.duration;
//     } else if (br.start && br.end) {
//       const start = new Date(br.start);
//       const end = new Date(br.end);
//       const diffMs = end - start;
//       const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
//       totalMinutes += diffMins;
//     }
//   }
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = Math.floor(totalMinutes % 60);
//   return `${hours}h ${minutes}m`;
// }

// // Return only unique dates from attendance to avoid duplicates
// function getUniqueAttendanceData(attendanceData = []) {
//   const unique = [];
//   const seen = new Set();
//   for (const record of attendanceData) {
//     if (!seen.has(record.date)) {
//       unique.push(record);
//       seen.add(record.date);
//     }
//   }
//   return unique;
// }

// // total shifts (old snippet logic)
// function calculateTotalShifts(attendanceData, year, month) {
//   return attendanceData.filter((rec) => {
//     const d = new Date(rec.date);
//     return (
//       d.getFullYear() === year &&
//       d.getMonth() + 1 === month &&
//       rec.login &&
//       rec.logout
//     );
//   }).length;
// }

// // total leaves (excluding approved, ignoring holidays, etc.)
// function calculateTotalLeaves({
//   attendanceData,
//   approvedLeaves,
//   leaveSystemDetails,
//   companySettings,
//   year,
//   month,
// }) {
//   const allDays = getAllDaysInMonth(year, month);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const approvedLeaveDates = new Set();
//   for (const leave of approvedLeaves) {
//     const fromDate = new Date(leave.leave_From);
//     const toDate = new Date(leave.leave_To);
//     for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
//       approvedLeaveDates.add(d.toISOString().split("T")[0]);
//     }
//   }

//   let totalLeaves = 0;
//   for (const dateObj of allDays) {
//     const formatted = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

//     const isWorkingDay =
//       leaveSystemDetails &&
//       leaveSystemDetails.workingDays &&
//       leaveSystemDetails.workingDays.includes(dayName);
//     const isHoliday =
//       companySettings &&
//       companySettings.holidays &&
//       companySettings.holidays.some(
//         (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//       );

//     if (!isWorkingDay || isHoliday) {
//       continue;
//     }
//     if (approvedLeaveDates.has(formatted)) {
//       continue;
//     }

//     const rec = attendanceData.find((r) => r.date === formatted);
//     if (dateObj <= today) {
//       if (!rec || !rec.login) {
//         totalLeaves++;
//       }
//     }
//   }
//   return totalLeaves;
// }

// // total half days
// function calculateTotalHalfDays(
//   attendanceData,
//   year,
//   month,
//   attendancePolicies
// ) {
//   const halfDayHours = attendancePolicies?.halfDayHours || 5;
//   const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked > minWork && hoursWorked <= halfDayHours) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // not even half day
// function calculateNotEvenHalfDays(attendanceData, year, month) {
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked > 0 && hoursWorked < 4.5) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // completed days (≥ attendancePolicies.fullDayHours or 9 default)
// function calculateTotalCompletedDays(
//   attendanceData,
//   year,
//   month,
//   attendancePolicies
// ) {
//   const fullDayHours = attendancePolicies?.fullDayHours || 9;
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked >= fullDayHours) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // total lates
// function calculateTotalLates(
//   attendanceData,
//   year,
//   month,
//   shiftStart,
//   attendancePolicies
// ) {
//   if (!shiftStart) return 0;
//   const graceMins = attendancePolicies?.gracePeriodMinutes || 15;

//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month && rec.login) {
//       const shiftStart24 = convertTo24Hour(shiftStart);
//       if (!shiftStart24) continue;
//       const shiftDate = new Date("1970-01-01T" + shiftStart24);
//       shiftDate.setMinutes(shiftDate.getMinutes() + graceMins);

//       const loginDate = new Date("1970-01-01T" + convertTo24Hour(rec.login));
//       if (loginDate > shiftDate) {
//         count++;
//       }
//     }
//   }
//   return count;
// }

// // not logged out
// function calculateNotLoggedOut(attendanceData, year, month) {
//   const today = new Date();
//   return attendanceData.filter((rec) => {
//     const d = new Date(rec.date);
//     return (
//       d.getFullYear() === year &&
//       d.getMonth() + 1 === month &&
//       rec.login &&
//       !rec.logout &&
//       d <= today
//     );
//   }).length;
// }

// // get total working days
// function getTotalWorkingDays(
//   leaveSystemDetails,
//   companySettings,
//   year,
//   month,
//   upToToday = false
// ) {
//   const allDays = getAllDaysInMonth(year, month);
//   const today = new Date();
//   const workingDays = allDays.filter((dateObj) => {
//     if (
//       upToToday &&
//       year === today.getFullYear() &&
//       month === today.getMonth() + 1 &&
//       dateObj > today
//     ) {
//       return false;
//     }
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//     const isWorkingDay =
//       leaveSystemDetails &&
//       leaveSystemDetails.workingDays &&
//       leaveSystemDetails.workingDays.includes(dayName);
//     const isHoliday =
//       companySettings &&
//       companySettings.holidays &&
//       companySettings.holidays.some(
//         (h) =>
//           new Date(h.date).toISOString().split("T")[0] ===
//           dateObj.toISOString().split("T")[0]
//       );
//     return isWorkingDay && !isHoliday;
//   });
//   return workingDays.length;
// }

// // next payroll date
// function getPayrollPeriodDates({
//   year,
//   month,
//   userProfileData,
//   companySettings,
//   employmentTypeDetails,
// }) {
//   if (!employmentTypeDetails || !companySettings || !userProfileData) {
//     return { startDate: null, endDate: null, nextPayrollDate: null };
//   }
//   const payrollCycleId = employmentTypeDetails.payrollCycleId;
//   const payrollCycle = companySettings?.payrollCycles?.find(
//     (pc) => pc.id === payrollCycleId
//   );
//   if (!payrollCycle) {
//     return { startDate: null, endDate: null, nextPayrollDate: null };
//   }

//   const processingDate = payrollCycle.processingDate;
//   let startDate, endDate;

//   if (processingDate === 1) {
//     startDate = new Date(year, month - 1, 1);
//     endDate = new Date(year, month, 0);
//   } else {
//     startDate = new Date(year, month - 2, processingDate);
//     endDate = new Date(year, month - 1, processingDate - 1);
//   }

//   const doj = new Date(userProfileData.date_of_Joining);
//   if (startDate < doj) startDate = doj;

//   const now = new Date();
//   if (endDate > now) endDate = now;

//   let nextPayrollDate = new Date(
//     endDate.getFullYear(),
//     endDate.getMonth() + 1,
//     processingDate
//   );

//   return { startDate, endDate, nextPayrollDate };
// }

// // parse shift timing (e.g., "Saket (09:00 - 07:00)")
// function parseShiftTiming(shiftString) {
//   if (!shiftString) return null;
//   const regex = /(.+?)\s*\((\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\)/;
//   const match = shiftString.match(regex);
//   if (!match) return null;
//   const [_, name, start, end] = match;
//   return { name: name.trim(), startTime: start.trim(), endTime: end.trim() };
// }

// // old snippet approach to final salary
// function calculateFinalSalary({
//   baseSalary,
//   attendanceData,
//   approvedLeaves,
//   companySettings,
//   employmentTypeDetails,
//   userProfileData,
//   leaveSystemDetails,
//   attendancePolicies,
//   year,
//   month,
// }) {
//   // If baseSalary is 0 or missing, bail out
//   if (!baseSalary || !attendancePolicies || baseSalary <= 0) {
//     return {
//       finalSalary: "₹ 0.00",
//       deduction: "₹ 0.00",
//       leaves: 0,
//       unpaidLeaves: 0,
//       remainingPaidLeaves: 0,
//       deductionsBreakdown: [],
//     };
//   }

//   const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
//   const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

//   // determine denominator
//   const denom =
//     calcMethod === "CALENDAR_DAYS"
//       ? new Date(year, month, 0).getDate()
//       : getTotalWorkingDays(
//           leaveSystemDetails,
//           companySettings,
//           year,
//           month,
//           false
//         );

//   const isCurrentMonthAndYear =
//     year === new Date().getFullYear() && month === new Date().getMonth() + 1;
//   const daysUpToToday = isCurrentMonthAndYear
//     ? calcMethod === "CALENDAR_DAYS"
//       ? Math.min(new Date().getDate(), denom)
//       : getTotalWorkingDays(
//           leaveSystemDetails,
//           companySettings,
//           year,
//           month,
//           true
//         )
//     : denom;

//   // total leaves
//   const totalLeaves = calculateTotalLeaves({
//     attendanceData,
//     approvedLeaves,
//     leaveSystemDetails,
//     companySettings,
//     year,
//     month,
//   });
//   const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);
//   const notLoggedOutDays = calculateNotLoggedOut(attendanceData, year, month);
//   const totalUnpaidLeaves = totalLeaves + notEvenHalfDays + notLoggedOutDays;

//   // how many of those are "paid" leaves
//   let paidLeavesUsed = 0;
//   for (const lv of approvedLeaves) {
//     const from = new Date(lv.leave_From);
//     const to = new Date(lv.leave_To);
//     for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
//       if (
//         d.getFullYear() === year &&
//         d.getMonth() + 1 === month &&
//         lv.is_Paid === true
//       ) {
//         paidLeavesUsed++;
//       }
//     }
//   }
//   const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

//   // standard deductions from employmentType
//   const deductionIds = employmentTypeDetails?.deductions || [];
//   const allDeductions = companySettings?.deductions || [];
//   const deductionDetails = deductionIds
//     .map((id) => allDeductions.find((d) => d.id === id))
//     .filter(Boolean);

//   let totalDeductionsAmount = 0;
//   const breakdown = [];

//   for (const ded of deductionDetails) {
//     const amount = (ded.percentage / 100) * baseSalary;
//     totalDeductionsAmount += amount;
//     breakdown.push({
//       name: ded.name,
//       percentage: ded.percentage + "%",
//       amount,
//     });
//   }

//   const leftoverAfterDeductions = Math.max(
//     0,
//     baseSalary - totalDeductionsAmount
//   );

//   // fraction of the month
//   const fractionOfMonthWorked = daysUpToToday / denom;
//   const payForDaysUpToToday = leftoverAfterDeductions * fractionOfMonthWorked;

//   // daily rate
//   const dailyRate = leftoverAfterDeductions / denom;
//   const leavesDeduction = unpaidLeaves * dailyRate;
//   breakdown.push({
//     name: "Leaves Deduction",
//     percentage: "-",
//     amount: leavesDeduction,
//   });

//   // final
//   const finalSalaryAmount = Math.max(0, payForDaysUpToToday - leavesDeduction);

//   return {
//     finalSalary: "₹ " + finalSalaryAmount.toFixed(2),
//     deduction: "₹ " + totalDeductionsAmount.toFixed(2),
//     leaves: totalUnpaidLeaves,
//     unpaidLeaves,
//     remainingPaidLeaves: Math.max(totalPaidLeaves - paidLeavesUsed, 0),
//     deductionsBreakdown: breakdown,
//   };
// }

// // monthName
// function monthName(m) {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[m - 1] || "Unknown";
// }




// export default function OwmFullAttendance() {
// const [punchReason, setPunchReason] = useState("");
//   const [missedPunchModalOpen, setMissedPunchModalOpen] = useState(false);
// const [selectedDateForPunch, setSelectedDateForPunch] = useState(null);
// const [punchInTime, setPunchInTime] = useState("");
// const [punchOutTime, setPunchOutTime] = useState("");
//   const fetchAttendanceData = useOwnFullAttendanceStore(
//     (s) => s.fetchAttendanceData
//   );
//   const attendanceDataRaw = useOwnFullAttendanceStore((s) => s.attendanceData);
//   const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
//   const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
//   const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);

//   const attendancePolicies = useOwnFullAttendanceStore(
//     (s) => s.attendancePolicies
//   );
//   const employmentTypeDetails = useOwnFullAttendanceStore(
//     (s) => s.employmentTypeDetails
//   );
//   const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);
//   const attendanceError = useOwnFullAttendanceStore((s) => s.error);
//   const leaveSystemDetails = useOwnFullAttendanceStore(
//     (s) => s.leaveSystemDetails
//   );

//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

//   function openMissedPunchModal(dateRow) {
//   // 'dateRow' is the object containing date info, etc.
//   setSelectedDateForPunch(dateRow);
//   setMissedPunchModalOpen(true);
// }

//   // Date controls
//   const today = new Date();
//   const defaultMonthString =
//     today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
//   const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

//   // Search & pagination
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchAttendanceData();
//   }, [fetchAttendanceData]);

//   // parse year & month
//   const parts = selectedMonth.split("-");
//   const year = parseInt(parts[0], 10);
//   const month = parseInt(parts[1], 10);

//   // Make sure we have unique attendance records
//   const attendanceData = getUniqueAttendanceData(attendanceDataRaw || []);

//   // SHIFT TIMING
//   const shiftTimingDetails = parseShiftTiming(
//     userProfileData?.shift_Timing || ""
//   );

//   // Build daily table
//   const allDaysInMonth = getAllDaysInMonth(year, month);

//   // set of approved leaves
//   const approvedLeaveDates = new Set();
//   if (approvedLeaves) {
//     for (const lv of approvedLeaves) {
//       const fromDate = new Date(lv.leave_From);
//       const toDate = new Date(lv.leave_To);
//       for (
//         let d = new Date(fromDate);
//         d <= toDate;
//         d.setDate(d.getDate() + 1)
//       ) {
//         approvedLeaveDates.add(d.toISOString().split("T")[0]);
//       }
//     }
//   }

//   const todayObj = new Date();
//   const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
//     const formatted = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//     let row = {
//       sl: idx + 1,
//       date: formatted,
//       day: dayName,
//       logInTime: "------",
//       logOutTime: "------",
//       totalBreak: "N/A",
//       status: "------",
//     };

//     // Check if holiday or not working or an approved leave
//     const isHoliday = companySettings?.holidays?.some(
//       (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//     );
//     const isWorkingDay =
//       leaveSystemDetails?.workingDays?.includes(dayName) || false;
//     const isApprovedLeave = approvedLeaveDates.has(formatted);

//     if (isApprovedLeave) {
//       // old code might say "Paid Leave" or "Unpaid Leave" – up to you
//       row.status = "Holiday";
//       return row;
//     }
//     if (!isWorkingDay || isHoliday) {
//       row.status = "Holiday";
//       return row;
//     }

//     // find attendance record
//     const record = attendanceData.find((r) => r.date === formatted);
//     if (!record) {
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // fill in login/logout
//     if (record.login) row.logInTime = record.login;
//     if (record.logout) row.logOutTime = record.logout;

//     // breaks
//     if (record.breaks && record.breaks.length > 0) {
//       row.totalBreak = getTotalBreakTime(record.breaks);
//     }

//     // if no logout in the past => absent
//     if (!record.logout) {
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // Calculate total hours worked
//     const hoursWorked = getHoursWorked(record.login, record.logout);

//     // Convert decimal hours to “h m” format
//     const wholeHours = Math.floor(hoursWorked); //total hours worked
//     const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60); //total hours worked

//     // Now store a string like "7h 21m"
//     row.hoursWorked = `${wholeHours}h ${remainingMinutes}m`; //total hours worked

//     if (hoursWorked >= 9) {
//       row.status = "Present";
//     } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
//       row.status = hoursWorked <= 5 ? "Half Day" : "Not Even Half Day";
//     } else if (hoursWorked > 0 && hoursWorked < 4.5) {
//       row.status = "Not Even Half Day";
//     } else {
//       row.status = "Present";
//     }
//     return row;
//   });

//   // filter by search
//   const filteredData = finalAttendanceData.filter((item) => {
//     const combined = (item.date + " " + item.day + " " + item.status)
//       .toLowerCase()
//       .trim();
//     return combined.includes(searchText.toLowerCase().trim());
//   });

//   // pagination
//   const totalEntries = filteredData.length;
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);
//   const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
//   const startIndex = (safeCurrentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedData = filteredData.slice(startIndex, endIndex);

//   // "Old snippet" stats
//   const totalShifts = calculateTotalShifts(attendanceData, year, month);
//   const totalLates = calculateTotalLates(
//     attendanceData,
//     year,
//     month,
//     shiftTimingDetails?.startTime || null,
//     attendancePolicies
//   );
//   const notLoggedOut = calculateNotLoggedOut(attendanceData, year, month);
//   const totalLeaves = calculateTotalLeaves({
//     attendanceData,
//     approvedLeaves,
//     leaveSystemDetails,
//     companySettings,
//     year,
//     month,
//   });
//   const totalCompletedDays = calculateTotalCompletedDays(
//     attendanceData,
//     year,
//     month,
//     attendancePolicies
//   );
//   const halfDays = calculateTotalHalfDays(
//     attendanceData,
//     year,
//     month,
//     attendancePolicies
//   );
//   const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

//   // final salary
//   // Parse the userProfileData?.salary as a number to avoid the toFixed() crash:
//   const numericBaseSalary =
//     parseFloat(userProfileData?.current_Base_Salary) || 0;

//   const {
//     finalSalary,
//     deduction,
//     leaves,
//     remainingPaidLeaves,
//     deductionsBreakdown,
//   } = calculateFinalSalary({
//     baseSalary: numericBaseSalary,
//     attendanceData,
//     approvedLeaves,
//     companySettings,
//     employmentTypeDetails,
//     userProfileData,
//     leaveSystemDetails,
//     attendancePolicies,
//     year,
//     month,
//   });

//   // next payroll date
//   const { nextPayrollDate } = getPayrollPeriodDates({
//     year,
//     month,
//     userProfileData,
//     companySettings,
//     employmentTypeDetails,
//   });
//   const formattedNextPayrollDate = nextPayrollDate
//     ? nextPayrollDate.toDateString()
//     : "Not available";

//   // event handlers
//   function handleMonthChange(e) {
//     setSelectedMonth(e.target.value);
//     setCurrentPage(1);
//   }
//   function handleSearch(e) {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//   }
//   function handleRowsPerPage(e) {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   }
//   function goToPage(pageNum) {
//     if (pageNum >= 1 && pageNum <= totalPages) {
//       setCurrentPage(pageNum);
//     }
//   }

//   function onRequestPDF() {
//     setConfirmDialogOpen(true);
//   }

//   function onConfirmPDF() {
//     setConfirmDialogOpen(false);
//     // Generate PDF for the selected month/year
//     if (generatePDF) {
//       generatePDF(year, month);
//     } else {
//       toast.error("No PDF generator found in the store!");
//     }
//   }

//   function onCancelPDF() {
//     setConfirmDialogOpen(false);
//     toast("PDF download cancelled", { icon: "❌" });
//   }
//   if (attendanceError) {
//     return (
//       <div className="p-6 text-center text-red-600 dark:text-red-300">
//         <p>Error: {attendanceError}</p>
//       </div>
//     );
//   }

//   const empName =
//     (userProfileData?.first_Name || "") +
//     " " +
//     (userProfileData?.last_Name || "");
//   const empCode = userProfileData?.employee_Id || "N/A";

//   const renderStatusBadge = (status) => {
//   const base =
//     "inline-flex items-center gap-1 rounded-lg px-4 py-[4px] text-xs font-medium";

//   const dot = "before:content-[''] before:block before:h-[6px] before:w-[6px] \
//                before:rounded-full";

//   switch (status) {
//     case "Present":
//       return (
//         <span
//           className={`${base} ${dot} bg-[#e1fae9] text-[#038403] border border-[#29ce29] \
//                       before:bg-[#038403]`}
//         >
//           Present
//         </span>
//       );
//     case "Absent":
//       return (
//         <span
//           className={`${base} ${dot} bg-[#FFE5E5] text-[#D92D20] border border-[#D92D20] \
//                       before:bg-[#D92D20]`}
//         >
//           Absent
//         </span>
//       );
//     case "Late":
//       return (
//         <span
//           className={`${base} ${dot} bg-[#E0EAFF] text-[#1849FF] border border-[#1849FF]\
//                       before:bg-[#1849FF]`}
//         >
//           Late
//         </span>
//       );
//     case "Half Day":
//       return (
//         <span
//           className={`${base} ${dot} bg-[#E5E5E5] text-[#575757] border border-[#575757] \
//                       before:bg-[#575757]`}
//         >
//           Half&nbsp;Day
//         </span>
//       );
//     default:
//       return (
//         <span
//           className={`${base} ${dot} bg-gray-200 text-gray-600 border border-gray-600 \
//                       before:bg-gray-600`}
//         >
//           {status}
//         </span>
//       );
//   }
// };

//   return (
//     <motion.div
//       className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Heading */}
//       <motion.h1
//         className="text-xl md:text-2xl font-bold mb-6"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Attendance for {monthName(month)} {year} ( {empName.trim()} ({empCode})
//         )
//       </motion.h1>

//       {/* Controls row */}
//       <motion.div
//         className="flex flex-col md:flex-row items-start md:items-center justify-between 
//                    bg-white dark:bg-gray-800 rounded-md shadow px-4 py-3 mb-6 gap-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex flex-wrap items-center gap-4">
//           {/* Rows Per Page */}
//           <div className="flex items-center space-x-2">
//             <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
//               Show
//             </label>
//             <select
//               className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-md py-1 px-2 text-sm focus:outline-none"
//               value={rowsPerPage}
//               onChange={handleRowsPerPage}
//             >
//               <option value={7}>7</option>
//               <option value={10}>10</option>
//               <option value={30}>30</option>
//               <option value={31}>31</option>
//             </select>
//           </div>

//           {/* Month-Year input */}
//           <div>
//             <input
//               type="month"
//               value={selectedMonth}
//               onChange={handleMonthChange}
//               className="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm 
//                          text-gray-700 dark:text-gray-200
//                          bg-white dark:bg-gray-700 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Right group: Search + icons */}

//         {/* Search box */}
//         <div className="relative">
//           <input
//             type="text"
//             value={searchText}
//             onChange={handleSearch}
//             placeholder="Search"
//             className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200
//                          rounded-md py-1 px-3 pr-8 text-sm focus:outline-none"
//           />
//           <FiSearch
//             className="absolute right-2 top-1/2 -translate-y-1/2 
//                          text-gray-400 dark:text-gray-400"
//             size={16}
//           />
//         </div>

//         {/* Print */}
//         <div className="flex justify-end space-x-3">
//           {/* Print button */}
//           <button
//             onClick={() => window.print()}
//             className="p-2 rounded bg-green-100 hover:bg-green-200"
//           >
//             <FiPrinter className="text-green-600" size={16} />
//           </button>

//           {/* Download Payslip button (with confirmation) */}
//           <button
//             className="p-2 rounded bg-pink-100 hover:bg-pink-200"
//             onClick={onRequestPDF}
//           >
//             <FiDownload className="text-pink-600" size={16} />
//             {/* Or label: "Download Payslip" */}
//           </button>
//         </div>
//       </motion.div>

//       {/* Main area: table + side overview */}
//       <motion.div
//         // className="grid grid-cols-1 lg:grid-cols-4 gap-4"
//         className="flex justify-center gap-2"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <motion.div
//           className="w-full  overflow-x-auto rounded-md shadow ring-1 ring-black/5
//                     bg-white dark:bg-gray-800"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <table className="w-full whitespace-nowrap text-sm">
//             <thead>
//               <tr className="bg-[#F3F7FF] dark:bg-gray-700 text-gray-600 dark:text-gray-300
//                             text-[13px] font-semibold tracking-wide">
//                 {[
//                   "S.L",
//                   "Date",
//                   "Days",
//                   "Checked In & Out",
//                   "Total Break",
//                   "Status",
//                   "Punch Request",
//                 ].map((h) => (
//                   <th key={h} className="py-[14px] px-3 text-left">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
//               {displayedData.map((item) => (
//                 <tr
//                   key={item.sl}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
                
//                   <td className="py-3 px-3 font-medium text-gray-700 dark:text-gray-200">
//                     {String(item.sl).padStart(2, "0")}
//                   </td>

                
//                   <td className="py-3 px-3 text-gray-700 dark:text-gray-200">
//                     {item.date}
//                   </td>

                
//                   <td className="py-3 px-3 text-gray-700 dark:text-gray-200">
//                     {item.day}
//                   </td>

                
//                   <td className="py-3 px-3">
//                     <div className="flex items-center gap-2 text-[13px]">
//                       <span className="font-semibold text-[#0d6efd]">
//                         {item.logInTime}
//                       </span>
//                       <span className="h-[4px] w-[4px] rounded-full bg-gray-400" />
//                       <span className="text-gray-500">{item.hoursWorked}</span>
//                       <span className="h-[4px] w-[4px] rounded-full bg-gray-400" />
//                       <span className="font-semibold text-[#ff3e3e]">
//                         {item.logOutTime}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="py-3 px-3 text-gray-700 dark:text-gray-200">
//                     {item.totalBreak}
//                   </td>

//                   <td className="py-3 px-3">
//                     {renderStatusBadge(item.status)}
//                   </td>

//                   <td className="py-3 px-3">
//                     {(item.status === "Absent" || item.status === "Holiday") && (
//                       <button
//                         onClick={() => openMissedPunchModal(item)}
//                         className="inline-flex items-center rounded-md border border-[#0d6efd]
//                                   px-3 py-1 text-[13px] font-medium text-[#0d6efd]
//                                   hover:bg-[#0d6efd] hover:text-white transition-colors"
//                       >
//                         Request
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {/* Empty-state row */}
//               {displayedData.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="py-4 text-center text-gray-500 dark:text-gray-400"
//                   >
//                     No records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </motion.div>


//         <motion.div
//           className="bg-white dark:bg-gray-800 rounded-md shadow p-4"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-md">
//             Employee Overview
//           </h2>

//           <div className="space-y-3 text-xs">
//             <div className="flex items-center justify-between">
//               <span>
//                 <FiBriefcase className="inline-block mr-1 text-blue-500 animate-bounce" />
//                 Total Shifts
//               </span>
//               <span className="font-medium">{totalShifts}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiCalendar className="inline-block mr-1 text-red-500 animate-pulse" />
//                 Total Leaves
//               </span>
//               <span className="font-medium">{totalLeaves}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiAlertTriangle className="inline-block mr-1 text-yellow-500 animate-ping" />
//                 Total Lates
//               </span>
//               <span className="font-medium">{totalLates}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiSun className="inline-block mr-1 text-purple-500 animate-bounce" />
//                 Half Days
//               </span>
//               <span className="font-medium">{halfDays}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiMoon className="inline-block mr-1 text-pink-500 animate-spin" />
//                 Not Even Half Days
//               </span>
//               <span className="font-medium">{notEvenHalfDays}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiCheckCircle className="inline-block mr-1 text-green-500 animate-pulse" />
//                 Completed Shifts
//               </span>
//               <span className="font-medium">{totalCompletedDays}</span>
//             </div>

//             <div className="flex items-center justify-between">
//               <span>
//                 <FiLogOut className="inline-block mr-1 text-orange-500 animate-bounce" />
//                 Not Logged Out
//               </span>
//               <span className="font-medium">{notLoggedOut}</span>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Payroll Summary */}
//       <motion.div
//         className="bg-white dark:bg-gray-800 rounded-md shadow p-4 mt-6"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 text-lg">
//           Payroll Summary
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-max w-full text-sm">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                 <th className="py-2 px-4">Base Salary</th>
//                 <th className="py-2 px-4">Standard Deductions</th>
//                 <th className="py-2 px-4">Leaves (Unpaid)</th>
//                 <th className="py-2 px-4">Remaining Paid Leaves</th>
//                 <th className="py-2 px-4">Final Salary</th>
//               </tr>
//             </thead>
//             <tbody className="border-t border-gray-200 dark:border-gray-600">
//               <tr>
//                 {/* numericBaseSalary is guaranteed a number */}
//                 <td className="py-2 px-4">₹ {numericBaseSalary.toFixed(2)}</td>
//                 <td className="py-2 px-4">{deduction}</td>
//                 <td className="py-2 px-4">{leaves}</td>
//                 <td className="py-2 px-4">{remainingPaidLeaves}</td>
//                 <td className="py-2 px-4">{finalSalary}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Deductions breakdown */}
//         {deductionsBreakdown && deductionsBreakdown.length > 0 && (
//           <div className="mt-4">
//             <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
//               Deductions Breakdown
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-max w-full text-sm">
//                 <thead>
//                   <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
//                     <th className="py-2 px-4">Deduction Name</th>
//                     <th className="py-2 px-4">Percentage</th>
//                     <th className="py-2 px-4">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody className="border-t border-gray-200 dark:border-gray-600">
//                   {deductionsBreakdown.map((d, i) => (
//                     <tr key={i}>
//                       <td className="py-2 px-4">{d.name}</td>
//                       <td className="py-2 px-4">{d.percentage}</td>
//                       <td className="py-2 px-4">₹ {d.amount.toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//         {missedPunchModalOpen && (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//     <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-md">
//       <h2 className="text-lg font-semibold mb-4">
//         Request Missed Punch for: {selectedDateForPunch?.date}
//       </h2>

//       {/* Punch In Time (Fancy TimePicker) */}
//       <label className="block mb-2 text-sm font-medium">Punch In Time</label>
//       <TimePicker
//         onChange={(timeVal) => setPunchInTime(timeVal)}
//         value={punchInTime}
//         disableClock
//         clearIcon={null}
//         format="hh:mm a"  // 12-hour format with AM/PM
//         className="w-full mb-4 border border-gray-300 dark:border-gray-600 
//              rounded p-2 bg-white dark:bg-gray-800 text-gray-800 
//              dark:text-gray-100"
//       />

//       {/* Punch Out Time (Fancy TimePicker) */}
//       <label className="block mb-2 text-sm font-medium">Punch Out Time</label>
//       <TimePicker
//         onChange={(timeVal) => setPunchOutTime(timeVal)}
//         value={punchOutTime}
//         disableClock
//         clearIcon={null}
//         format="hh:mm a"
//         className="w-full mb-4 border border-gray-300 dark:border-gray-600 
//              rounded p-2 bg-white dark:bg-gray-800 text-gray-800 
//              dark:text-gray-100"
//       />

//       {/* Reason Textarea */}
//       <label className="block mb-2 text-sm font-medium">Reason/Message</label>
//       <textarea
//         className="w-full h-20 mb-4 border border-gray-300 dark:border-gray-600 rounded p-2"
//         placeholder="Brief reason for missed punch..." onChange={(e) => setPunchReason(e.target.value)}
//       />

//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={() => {
//             // Reset or keep times as you wish
//             setPunchInTime("");
//             setPunchOutTime("");
//             setMissedPunchModalOpen(false);
//           }}
//           className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded"
//         >
//           Cancel
//         </button>
//         <button
//   onClick={async () => {
//     try {
//       // Call your missed-punch request API
//       await axiosInstance.post("/attendance-user/missed-punch-request", {
//         date: selectedDateForPunch?.date,      // e.g. "2023-08-15"
//         punchIn: punchInTime,                  // e.g. "09:00 AM"
//         punchOut: punchOutTime,               // e.g. "05:30 PM"
//         reason: punchReason,
//       });
//       toast.success("Missed Punch request submitted!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to submit missed punch request.");
//     } finally {
//       // Clean up and close modal
//       setPunchInTime("");
//       setPunchOutTime("");
//      setPunchReason("");
//       setMissedPunchModalOpen(false);
//     }
//   }}
//   className="px-3 py-1 bg-blue-600 text-white rounded"
// >
//   Submit
// </button>

//       </div>
//     </div>
//   </div>
// )}



//         {/* SHIFT TIMING TABLE */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
//             Shift Timings
//           </h3>
//           {shiftTimingDetails ? (
//             <table className="min-w-max text-sm w-full border dark:border-gray-700">
//               <tbody>
//                 <tr className="border-b dark:border-gray-700">
//                   <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700 w-40">
//                     Shift Name
//                   </th>
//                   <td className="px-4 py-2">{shiftTimingDetails.name}</td>
//                 </tr>
//                 <tr className="border-b dark:border-gray-700">
//                   <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700">
//                     Start Time
//                   </th>
//                   <td className="px-4 py-2">{shiftTimingDetails.startTime}</td>
//                 </tr>
//                 <tr>
//                   <th className="px-4 py-2 text-left bg-gray-50 dark:bg-gray-700">
//                     End Time
//                   </th>
//                   <td className="px-4 py-2">{shiftTimingDetails.endTime}</td>
//                 </tr>
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-sm">No shift timing details available.</p>
//           )}
//         </div>

//         {/* Next Payroll Date */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
//             Next Payroll Date
//           </h3>
//           <p className="text-sm">{formattedNextPayrollDate}</p>
//         </div>
//       </motion.div>

//       {/* Confirmation Dialog */}
//       <ConfirmationDialog
//         open={confirmDialogOpen}
//         title="Download PDF?"
//         message="Are you sure you want to download the payslip PDF?"
//         onConfirm={onConfirmPDF}
//         onCancel={onCancelPDF}
//         confirmText="Yes"
//         cancelText="No"
//       />
//     </motion.div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FiPrinter, 
//   FiDownload, 
//   FiSearch, 
//   FiBriefcase,
//   FiCalendar,
//   FiAlertTriangle,
//   FiSun,
//   FiMoon,
//   FiCheckCircle,
//   FiLogOut,
//   FiClock,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
//   FiFilter,
//   FiRefreshCw,
//   FiUser,
//   FiDollarSign,
//   FiTrendingUp,
//   FiMenu,
//   FiEye,
//   FiEyeOff
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";
// import ConfirmationDialog from "../common/ConfirmationDialog";
// import 'react-clock/dist/Clock.css';
// import 'react-time-picker/dist/TimePicker.css'; 
// import TimePicker from 'react-time-picker';
// import axiosInstance from "../../service/axiosInstance";
// import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// /* 
//   --------------------------------------------------------------------------------------
//   HELPER FUNCTIONS (no TypeScript, purely JS) - KEEPING ALL ORIGINAL FUNCTIONS
//   --------------------------------------------------------------------------------------
// */

// // Returns all days of a given (year, month) pinned around noon to avoid TZ shift:
// function getAllDaysInMonth(year, month) {
//   const days = [];
//   let date = new Date(year, month - 1, 1, 12);
//   while (date.getMonth() === month - 1) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// // Convert "hh:mm:ss AM/PM" → "HH:mm:ss" in 24-hour format
// function convertTo24Hour(timeString) {
//   if (!timeString) return null;
//   const [timePart, ampm] = timeString.split(" ");
//   if (!timePart || !ampm) return null;

//   let [hours, minutes, seconds] = timePart.split(":").map(Number);
//   hours = hours || 0;
//   minutes = minutes || 0;
//   seconds = seconds || 0;

//   if (ampm.toUpperCase() === "PM" && hours !== 12) {
//     hours += 12;
//   }
//   if (ampm.toUpperCase() === "AM" && hours === 12) {
//     hours = 0;
//   }
//   return (
//     String(hours).padStart(2, "0") +
//     ":" +
//     String(minutes).padStart(2, "0") +
//     ":" +
//     String(seconds).padStart(2, "0")
//   );
// }

// // Calculate hours difference between login/logout
// function getHoursWorked(login, logout) {
//   if (!login || !logout) return 0;
//   const login24 = convertTo24Hour(login);
//   const logout24 = convertTo24Hour(logout);
//   if (!login24 || !logout24) return 0;

//   const loginDate = new Date("1970-01-01T" + login24);
//   const logoutDate = new Date("1970-01-01T" + logout24);
//   const diffMs = logoutDate - loginDate;
//   return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
// }

// // If your breaks contain either durations in minutes or start/end times:
// function getTotalBreakTime(breaks = []) {
//   let totalMinutes = 0;
//   for (const br of breaks) {
//     if (typeof br.duration === "number" && br.duration > 0) {
//       totalMinutes += br.duration;
//     } else if (br.start && br.end) {
//       const start = new Date(br.start);
//       const end = new Date(br.end);
//       const diffMs = end - start;
//       const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
//       totalMinutes += diffMins;
//     }
//   }
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = Math.floor(totalMinutes % 60);
//   return `${hours}h ${minutes}m`;
// }

// // Return only unique dates from attendance to avoid duplicates
// function getUniqueAttendanceData(attendanceData = []) {
//   const unique = [];
//   const seen = new Set();
//   for (const record of attendanceData) {
//     if (!seen.has(record.date)) {
//       unique.push(record);
//       seen.add(record.date);
//     }
//   }
//   return unique;
// }

// // total shifts (old snippet logic)
// function calculateTotalShifts(attendanceData, year, month) {
//   return attendanceData.filter((rec) => {
//     const d = new Date(rec.date);
//     return (
//       d.getFullYear() === year &&
//       d.getMonth() + 1 === month &&
//       rec.login &&
//       rec.logout
//     );
//   }).length;
// }

// // total leaves (excluding approved, ignoring holidays, etc.)
// function calculateTotalLeaves({
//   attendanceData,
//   approvedLeaves,
//   leaveSystemDetails,
//   companySettings,
//   year,
//   month,
// }) {
//   const allDays = getAllDaysInMonth(year, month);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const approvedLeaveDates = new Set();
//   for (const leave of approvedLeaves) {
//     const fromDate = new Date(leave.leave_From);
//     const toDate = new Date(leave.leave_To);
//     for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
//       approvedLeaveDates.add(d.toISOString().split("T")[0]);
//     }
//   }

//   let totalLeaves = 0;
//   for (const dateObj of allDays) {
//     const formatted = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

//     const isWorkingDay =
//       leaveSystemDetails &&
//       leaveSystemDetails.workingDays &&
//       leaveSystemDetails.workingDays.includes(dayName);
//     const isHoliday =
//       companySettings &&
//       companySettings.holidays &&
//       companySettings.holidays.some(
//         (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//       );

//     if (!isWorkingDay || isHoliday) {
//       continue;
//     }
//     if (approvedLeaveDates.has(formatted)) {
//       continue;
//     }

//     const rec = attendanceData.find((r) => r.date === formatted);
//     if (dateObj <= today) {
//       if (!rec || !rec.login) {
//         totalLeaves++;
//       }
//     }
//   }
//   return totalLeaves;
// }

// // total half days
// function calculateTotalHalfDays(
//   attendanceData,
//   year,
//   month,
//   attendancePolicies
// ) {
//   const halfDayHours = attendancePolicies?.halfDayHours || 5;
//   const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked > minWork && hoursWorked <= halfDayHours) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // not even half day
// function calculateNotEvenHalfDays(attendanceData, year, month) {
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked > 0 && hoursWorked < 4.5) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // completed days (≥ attendancePolicies.fullDayHours or 9 default)
// function calculateTotalCompletedDays(
//   attendanceData,
//   year,
//   month,
//   attendancePolicies
// ) {
//   const fullDayHours = attendancePolicies?.fullDayHours || 9;
//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month) {
//       if (rec.login && rec.logout) {
//         const hoursWorked = getHoursWorked(rec.login, rec.logout);
//         if (hoursWorked >= fullDayHours) {
//           count++;
//         }
//       }
//     }
//   }
//   return count;
// }

// // total lates
// function calculateTotalLates(
//   attendanceData,
//   year,
//   month,
//   shiftStart,
//   attendancePolicies
// ) {
//   if (!shiftStart) return 0;
//   const graceMins = attendancePolicies?.gracePeriodMinutes || 15;

//   let count = 0;
//   for (const rec of attendanceData) {
//     const d = new Date(rec.date);
//     if (d.getFullYear() === year && d.getMonth() + 1 === month && rec.login) {
//       const shiftStart24 = convertTo24Hour(shiftStart);
//       if (!shiftStart24) continue;
//       const shiftDate = new Date("1970-01-01T" + shiftStart24);
//       shiftDate.setMinutes(shiftDate.getMinutes() + graceMins);

//       const loginDate = new Date("1970-01-01T" + convertTo24Hour(rec.login));
//       if (loginDate > shiftDate) {
//         count++;
//       }
//     }
//   }
//   return count;
// }

// // not logged out
// function calculateNotLoggedOut(attendanceData, year, month) {
//   const today = new Date();
//   return attendanceData.filter((rec) => {
//     const d = new Date(rec.date);
//     return (
//       d.getFullYear() === year &&
//       d.getMonth() + 1 === month &&
//       rec.login &&
//       !rec.logout &&
//       d <= today
//     );
//   }).length;
// }

// // get total working days
// function getTotalWorkingDays(
//   leaveSystemDetails,
//   companySettings,
//   year,
//   month,
//   upToToday = false
// ) {
//   const allDays = getAllDaysInMonth(year, month);
//   const today = new Date();
//   const workingDays = allDays.filter((dateObj) => {
//     if (
//       upToToday &&
//       year === today.getFullYear() &&
//       month === today.getMonth() + 1 &&
//       dateObj > today
//     ) {
//       return false;
//     }
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//     const isWorkingDay =
//       leaveSystemDetails &&
//       leaveSystemDetails.workingDays &&
//       leaveSystemDetails.workingDays.includes(dayName);
//     const isHoliday =
//       companySettings &&
//       companySettings.holidays &&
//       companySettings.holidays.some(
//         (h) =>
//           new Date(h.date).toISOString().split("T")[0] ===
//           dateObj.toISOString().split("T")[0]
//       );
//     return isWorkingDay && !isHoliday;
//   });
//   return workingDays.length;
// }

// // next payroll date
// function getPayrollPeriodDates({
//   year,
//   month,
//   userProfileData,
//   companySettings,
//   employmentTypeDetails,
// }) {
//   if (!employmentTypeDetails || !companySettings || !userProfileData) {
//     return { startDate: null, endDate: null, nextPayrollDate: null };
//   }
//   const payrollCycleId = employmentTypeDetails.payrollCycleId;
//   const payrollCycle = companySettings?.payrollCycles?.find(
//     (pc) => pc.id === payrollCycleId
//   );
//   if (!payrollCycle) {
//     return { startDate: null, endDate: null, nextPayrollDate: null };
//   }

//   const processingDate = payrollCycle.processingDate;
//   let startDate, endDate;

//   if (processingDate === 1) {
//     startDate = new Date(year, month - 1, 1);
//     endDate = new Date(year, month, 0);
//   } else {
//     startDate = new Date(year, month - 2, processingDate);
//     endDate = new Date(year, month - 1, processingDate - 1);
//   }

//   const doj = new Date(userProfileData.date_of_Joining);
//   if (startDate < doj) startDate = doj;

//   const now = new Date();
//   if (endDate > now) endDate = now;

//   let nextPayrollDate = new Date(
//     endDate.getFullYear(),
//     endDate.getMonth() + 1,
//     processingDate
//   );

//   return { startDate, endDate, nextPayrollDate };
// }

// // parse shift timing (e.g., "Saket (09:00 - 07:00)")
// function parseShiftTiming(shiftString) {
//   if (!shiftString) return null;
//   const regex = /(.+?)\s*\((\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\)/;
//   const match = shiftString.match(regex);
//   if (!match) return null;
//   const [_, name, start, end] = match;
//   return { name: name.trim(), startTime: start.trim(), endTime: end.trim() };
// }

// // old snippet approach to final salary
// function calculateFinalSalary({
//   baseSalary,
//   attendanceData,
//   approvedLeaves,
//   companySettings,
//   employmentTypeDetails,
//   userProfileData,
//   leaveSystemDetails,
//   attendancePolicies,
//   year,
//   month,
// }) {
//   // If baseSalary is 0 or missing, bail out
//   if (!baseSalary || !attendancePolicies || baseSalary <= 0) {
//     return {
//       finalSalary: "₹ 0.00",
//       deduction: "₹ 0.00",
//       leaves: 0,
//       unpaidLeaves: 0,
//       remainingPaidLeaves: 0,
//       deductionsBreakdown: [],
//     };
//   }

//   const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
//   const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

//   // determine denominator
//   const denom =
//     calcMethod === "CALENDAR_DAYS"
//       ? new Date(year, month, 0).getDate()
//       : getTotalWorkingDays(
//           leaveSystemDetails,
//           companySettings,
//           year,
//           month,
//           false
//         );

//   const isCurrentMonthAndYear =
//     year === new Date().getFullYear() && month === new Date().getMonth() + 1;
//   const daysUpToToday = isCurrentMonthAndYear
//     ? calcMethod === "CALENDAR_DAYS"
//       ? Math.min(new Date().getDate(), denom)
//       : getTotalWorkingDays(
//           leaveSystemDetails,
//           companySettings,
//           year,
//           month,
//           true
//         )
//     : denom;

//   // total leaves
//   const totalLeaves = calculateTotalLeaves({
//     attendanceData,
//     approvedLeaves,
//     leaveSystemDetails,
//     companySettings,
//     year,
//     month,
//   });
//   const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);
//   const notLoggedOutDays = calculateNotLoggedOut(attendanceData, year, month);
//   const totalUnpaidLeaves = totalLeaves + notEvenHalfDays + notLoggedOutDays;

//   // how many of those are "paid" leaves
//   let paidLeavesUsed = 0;
//   for (const lv of approvedLeaves) {
//     const from = new Date(lv.leave_From);
//     const to = new Date(lv.leave_To);
//     for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
//       if (
//         d.getFullYear() === year &&
//         d.getMonth() + 1 === month &&
//         lv.is_Paid === true
//       ) {
//         paidLeavesUsed++;
//       }
//     }
//   }
//   const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

//   // standard deductions from employmentType
//   const deductionIds = employmentTypeDetails?.deductions || [];
//   const allDeductions = companySettings?.deductions || [];
//   const deductionDetails = deductionIds
//     .map((id) => allDeductions.find((d) => d.id === id))
//     .filter(Boolean);

//   let totalDeductionsAmount = 0;
//   const breakdown = [];

//   for (const ded of deductionDetails) {
//     const amount = (ded.percentage / 100) * baseSalary;
//     totalDeductionsAmount += amount;
//     breakdown.push({
//       name: ded.name,
//       percentage: ded.percentage + "%",
//       amount,
//     });
//   }

//   const leftoverAfterDeductions = Math.max(
//     0,
//     baseSalary - totalDeductionsAmount
//   );

//   // fraction of the month
//   const fractionOfMonthWorked = daysUpToToday / denom;
//   const payForDaysUpToToday = leftoverAfterDeductions * fractionOfMonthWorked;

//   // daily rate
//   const dailyRate = leftoverAfterDeductions / denom;
//   const leavesDeduction = unpaidLeaves * dailyRate;
//   breakdown.push({
//     name: "Leaves Deduction",
//     percentage: "-",
//     amount: leavesDeduction,
//   });

//   // final
//   const finalSalaryAmount = Math.max(0, payForDaysUpToToday - leavesDeduction);

//   return {
//     finalSalary: "₹ " + finalSalaryAmount.toFixed(2),
//     deduction: "₹ " + totalDeductionsAmount.toFixed(2),
//     leaves: totalUnpaidLeaves,
//     unpaidLeaves,
//     remainingPaidLeaves: Math.max(totalPaidLeaves - paidLeavesUsed, 0),
//     deductionsBreakdown: breakdown,
//   };
// }

// // monthName
// function monthName(m) {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[m - 1] || "Unknown";
// }

// export default function OwnFullAttendance() {
//   const [punchReason, setPunchReason] = useState("");
//   const [missedPunchModalOpen, setMissedPunchModalOpen] = useState(false);
//   const [selectedDateForPunch, setSelectedDateForPunch] = useState(null);
//   const [punchInTime, setPunchInTime] = useState("");
//   const [punchOutTime, setPunchOutTime] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Handle initial sidebar state for desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(true);
//       } else {
//         setSidebarOpen(false);
//       }
//     };

//     // Set initial state
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
//   const [showPayrollDetails, setShowPayrollDetails] = useState(false);

//   // Store hooks - KEEPING ALL ORIGINAL STORE CONNECTIONS
//   const fetchAttendanceData = useOwnFullAttendanceStore((s) => s.fetchAttendanceData);
//   const attendanceDataRaw = useOwnFullAttendanceStore((s) => s.attendanceData);
//   const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
//   const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
//   const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);
//   const attendancePolicies = useOwnFullAttendanceStore((s) => s.attendancePolicies);
//   const employmentTypeDetails = useOwnFullAttendanceStore((s) => s.employmentTypeDetails);
//   const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);
//   const attendanceError = useOwnFullAttendanceStore((s) => s.error);
//   const leaveSystemDetails = useOwnFullAttendanceStore((s) => s.leaveSystemDetails);

//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

//   // Date controls - KEEPING ALL ORIGINAL STATE
//   const today = new Date();
//   const defaultMonthString = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
//   const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

//   // Search & pagination - KEEPING ALL ORIGINAL STATE
//   const [searchText, setSearchText] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchAttendanceData();
//   }, [fetchAttendanceData]);

//   // parse year & month - KEEPING ORIGINAL LOGIC
//   const parts = selectedMonth.split("-");
//   const year = parseInt(parts[0], 10);
//   const month = parseInt(parts[1], 10);

//   // Make sure we have unique attendance records - KEEPING ORIGINAL LOGIC
//   const attendanceData = getUniqueAttendanceData(attendanceDataRaw || []);

//   // SHIFT TIMING - KEEPING ORIGINAL LOGIC
//   const shiftTimingDetails = parseShiftTiming(userProfileData?.shift_Timing || "");

//   // Build daily table - KEEPING ALL ORIGINAL LOGIC
//   const allDaysInMonth = getAllDaysInMonth(year, month);

//   // set of approved leaves - KEEPING ORIGINAL LOGIC
//   const approvedLeaveDates = new Set();
//   if (approvedLeaves) {
//     for (const lv of approvedLeaves) {
//       const fromDate = new Date(lv.leave_From);
//       const toDate = new Date(lv.leave_To);
//       for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
//         approvedLeaveDates.add(d.toISOString().split("T")[0]);
//       }
//     }
//   }

//   const todayObj = new Date();
//   const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
//     const formatted = dateObj.toISOString().split("T")[0];
//     const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
//     let row = {
//       sl: idx + 1,
//       date: formatted,
//       day: dayName,
//       logInTime: "------",
//       logOutTime: "------",
//       totalBreak: "N/A",
//       status: "------",
//     };

//     // Check if holiday or not working or an approved leave - KEEPING ORIGINAL LOGIC
//     const isHoliday = companySettings?.holidays?.some(
//       (h) => new Date(h.date).toISOString().split("T")[0] === formatted
//     );
//     const isWorkingDay = leaveSystemDetails?.workingDays?.includes(dayName) || false;
//     const isApprovedLeave = approvedLeaveDates.has(formatted);

//     if (isApprovedLeave) {
//       row.status = "Holiday";
//       return row;
//     }
//     if (!isWorkingDay || isHoliday) {
//       row.status = "Holiday";
//       return row;
//     }

//     // find attendance record - KEEPING ORIGINAL LOGIC
//     const record = attendanceData.find((r) => r.date === formatted);
//     if (!record) {
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // fill in login/logout - KEEPING ORIGINAL LOGIC
//     if (record.login) row.logInTime = record.login;
//     if (record.logout) row.logOutTime = record.logout;

//     // breaks - KEEPING ORIGINAL LOGIC
//     if (record.breaks && record.breaks.length > 0) {
//       row.totalBreak = getTotalBreakTime(record.breaks);
//     }

//     // if no logout in the past => absent - KEEPING ORIGINAL LOGIC
//     if (!record.logout) {
//       row.status = dateObj < todayObj ? "Absent" : "------";
//       return row;
//     }

//     // Calculate total hours worked - KEEPING ORIGINAL LOGIC
//     const hoursWorked = getHoursWorked(record.login, record.logout);
//     const wholeHours = Math.floor(hoursWorked);
//     const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60);
//     row.hoursWorked = `${wholeHours}h ${remainingMinutes}m`;

//     if (hoursWorked >= 9) {
//       row.status = "Present";
//     } else if (hoursWorked >= 4.5 && hoursWorked < 9) {
//       row.status = hoursWorked <= 5 ? "Half Day" : "Not Even Half Day";
//     } else if (hoursWorked > 0 && hoursWorked < 4.5) {
//       row.status = "Not Even Half Day";
//     } else {
//       row.status = "Present";
//     }
//     return row;
//   });

//   // filter by search - KEEPING ORIGINAL LOGIC
//   const filteredData = finalAttendanceData.filter((item) => {
//     const combined = (item.date + " " + item.day + " " + item.status).toLowerCase().trim();
//     return combined.includes(searchText.toLowerCase().trim());
//   });

//   // pagination - KEEPING ORIGINAL LOGIC
//   const totalEntries = filteredData.length;
//   const totalPages = Math.ceil(totalEntries / rowsPerPage);
//   const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
//   const startIndex = (safeCurrentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const displayedData = filteredData.slice(startIndex, endIndex);

//   // "Old snippet" stats - KEEPING ALL ORIGINAL CALCULATIONS
//   const totalShifts = calculateTotalShifts(attendanceData, year, month);
//   const totalLates = calculateTotalLates(
//     attendanceData,
//     year,
//     month,
//     shiftTimingDetails?.startTime || null,
//     attendancePolicies
//   );
//   const notLoggedOut = calculateNotLoggedOut(attendanceData, year, month);
//   const totalLeaves = calculateTotalLeaves({
//     attendanceData,
//     approvedLeaves,
//     leaveSystemDetails,
//     companySettings,
//     year,
//     month,
//   });
//   const totalCompletedDays = calculateTotalCompletedDays(
//     attendanceData,
//     year,
//     month,
//     attendancePolicies
//   );
//   const halfDays = calculateTotalHalfDays(attendanceData, year, month, attendancePolicies);
//   const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

//   // final salary - KEEPING ORIGINAL LOGIC
//   const numericBaseSalary = parseFloat(userProfileData?.current_Base_Salary) || 0;

//   const {
//     finalSalary,
//     deduction,
//     leaves,
//     remainingPaidLeaves,
//     deductionsBreakdown,
//   } = calculateFinalSalary({
//     baseSalary: numericBaseSalary,
//     attendanceData,
//     approvedLeaves,
//     companySettings,
//     employmentTypeDetails,
//     userProfileData,
//     leaveSystemDetails,
//     attendancePolicies,
//     year,
//     month,
//   });

//   // next payroll date - KEEPING ORIGINAL LOGIC
//   const { nextPayrollDate } = getPayrollPeriodDates({
//     year,
//     month,
//     userProfileData,
//     companySettings,
//     employmentTypeDetails,
//   });
//   const formattedNextPayrollDate = nextPayrollDate ? nextPayrollDate.toDateString() : "Not available";

//   // event handlers - KEEPING ALL ORIGINAL HANDLERS
//   function openMissedPunchModal(dateRow) {
//     setSelectedDateForPunch(dateRow);
//     setMissedPunchModalOpen(true);
//   }

//   function handleMonthChange(e) {
//     setSelectedMonth(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleSearch(e) {
//     setSearchText(e.target.value);
//     setCurrentPage(1);
//   }

//   function handleRowsPerPage(e) {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   }

//   function goToPage(pageNum) {
//     if (pageNum >= 1 && pageNum <= totalPages) {
//       setCurrentPage(pageNum);
//     }
//   }

//   function onRequestPDF() {
//     setConfirmDialogOpen(true);
//   }

//   function onConfirmPDF() {
//     setConfirmDialogOpen(false);
//     if (generatePDF) {
//       generatePDF(year, month);
//     } else {
//       toast.error("No PDF generator found in the store!");
//     }
//   }

//   function onCancelPDF() {
//     setConfirmDialogOpen(false);
//     toast("PDF download cancelled", { icon: "❌" });
//   }

//   // Error handling - KEEPING ORIGINAL ERROR HANDLING
//   if (attendanceError) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center p-6"
//       >
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiAlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">{attendanceError}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </motion.div>
//     );
//   }

//   const empName = (userProfileData?.first_Name || "") + " " + (userProfileData?.last_Name || "");
//   const empCode = userProfileData?.employee_Id || "N/A";

//   // Status badge renderer with dark mode support
//   const renderStatusBadge = (status) => {
//     const badgeConfig = {
//       Present: {
//         bg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
//         text: "text-green-700 dark:text-green-400",
//         border: "border-green-200 dark:border-green-700",
//         icon: FiCheckCircle,
//         iconColor: "text-green-500 dark:text-green-400"
//       },
//       Absent: {
//         bg: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
//         text: "text-red-700 dark:text-red-400",
//         border: "border-red-200 dark:border-red-700",
//         icon: FiX,
//         iconColor: "text-red-500 dark:text-red-400"
//       },
//       "Half Day": {
//         bg: "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
//         text: "text-yellow-700 dark:text-yellow-400",
//         border: "border-yellow-200 dark:border-yellow-700",
//         icon: FiSun,
//         iconColor: "text-yellow-500 dark:text-yellow-400"
//       },
//       "Not Even Half Day": {
//         bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
//         text: "text-purple-700 dark:text-purple-400",
//         border: "border-purple-200 dark:border-purple-700",
//         icon: FiMoon,
//         iconColor: "text-purple-500 dark:text-purple-400"
//       },
//       Holiday: {
//         bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
//         text: "text-blue-700 dark:text-blue-400",
//         border: "border-blue-200 dark:border-blue-700",
//         icon: FiCalendar,
//         iconColor: "text-blue-500 dark:text-blue-400"
//       },
//       Late: {
//         bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
//         text: "text-purple-700 dark:text-purple-400",
//         border: "border-purple-200 dark:border-purple-700",
//         icon: FiClock,
//         iconColor: "text-purple-500 dark:text-purple-400"
//       }
//     };

//     const config = badgeConfig[status] || badgeConfig.Holiday;
//     const IconComponent = config.icon;

//     return (
//       <motion.span
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
//       >
//         <IconComponent className={`w-3 h-3 ${config.iconColor}`} />
//         {status}
//       </motion.span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
//       {/* Mobile Sidebar Overlay */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Header */}
//       <motion.header
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
//       >
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//               </button>
//               <div>
//                 <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
//                   Attendance Dashboard
//                 </h1>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {monthName(month)} {year} • {empName.trim()} ({empCode})
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => window.print()}
//                 className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors"
//               >
//                 <FiPrinter className="w-4 h-4" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={onRequestPDF}
//                 className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
//               >
//                 <FiDownload className="w-4 h-4" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <div className="flex">
//         {/* Sidebar */}
//         <motion.aside
//           className={`w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 overflow-y-auto lg:block ${
//             sidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden'
//           } lg:relative lg:z-auto`}
//         >
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6 lg:hidden">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Overview</h2>
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//               >
//                 <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//               </button>
//             </div>

//             {/* Employee Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-6 border border-blue-100 dark:border-blue-800"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
//                   <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 dark:text-gray-200">Employee Stats</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Overview</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {[
//                   { label: "Total Shifts", value: totalShifts, icon: FiBriefcase, color: "blue" },
//                   { label: "Total Leaves", value: totalLeaves, icon: FiCalendar, color: "red" },
//                   { label: "Late Arrivals", value: totalLates, icon: FiAlertTriangle, color: "yellow" },
//                   { label: "Half Days", value: halfDays, icon: FiSun, color: "orange" },
//                   { label: "Incomplete Days", value: notEvenHalfDays, icon: FiMoon, color: "purple" },
//                   { label: "Completed Days", value: totalCompletedDays, icon: FiCheckCircle, color: "green" },
//                   { label: "Not Logged Out", value: notLoggedOut, icon: FiLogOut, color: "pink" }
//                 ].map((stat, index) => (
//                   <motion.div
//                     key={stat.label}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * index }}
//                     className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
//                   >
//                     <div className="flex items-center gap-3">
//                       <stat.icon className={`w-4 h-4 text-${stat.color}-500 dark:text-${stat.color}-400`} />
//                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
//                     </div>
//                     <span className={`text-sm font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Payroll Summary */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
//                     <FiDollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200">Payroll</h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Salary Summary</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowPayrollDetails(!showPayrollDetails)}
//                   className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
//                 >
//                   {showPayrollDetails ? (
//                     <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//                   ) : (
//                     <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
//                   )}
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Base Salary</span>
//                   <span className="font-semibold text-gray-800 dark:text-gray-200">₹ {numericBaseSalary.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Deductions</span>
//                   <span className="font-semibold text-red-600 dark:text-red-400">{deduction}</span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Final Salary</span>
//                   <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{finalSalary}</span>
//                 </div>
//               </div>

//               <AnimatePresence>
//                 {showPayrollDetails && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="mt-4 space-y-2"
//                   >
//                     <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Breakdown:</div>
//                     {deductionsBreakdown.map((breakdown, index) => (
//                       <div key={index} className="flex justify-between items-center p-2 bg-white/40 dark:bg-gray-700/40 rounded-lg text-xs border border-gray-200/30 dark:border-gray-600/30">
//                         <span className="text-gray-700 dark:text-gray-300">{breakdown.name}</span>
//                         <span className="font-medium text-gray-800 dark:text-gray-200">₹ {breakdown.amount.toFixed(2)}</span>
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700">
//                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
//                   <FiCalendar className="w-4 h-4" />
//                   <span>Next Payroll: {formattedNextPayrollDate}</span>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Shift Timing Details - KEEPING ORIGINAL SHIFT TIMING TABLE */}
//             {shiftTimingDetails && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800"
//               >
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
//                     <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200">Shift Timing</h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Working Hours</p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                     <span className="text-sm text-gray-600 dark:text-gray-400">Shift Name</span>
//                     <span className="font-semibold text-gray-800 dark:text-gray-200">{shiftTimingDetails.name}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                     <span className="text-sm text-gray-600 dark:text-gray-400">Start Time</span>
//                     <span className="font-semibold text-green-600 dark:text-green-400">{shiftTimingDetails.startTime}</span>
//                   </div>
//                   <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
//                     <span className="text-sm text-gray-600 dark:text-gray-400">End Time</span>
//                     <span className="font-semibold text-red-600 dark:text-red-400">{shiftTimingDetails.endTime}</span>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.aside>

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-0 w-full">
//           <div className="p-4 sm:p-6 lg:p-8">
//             {/* Controls */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
//             >
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <FiFilter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//                     <select
//                       className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                       value={rowsPerPage}
//                       onChange={handleRowsPerPage}
//                     >
//                       <option value={7}>7 rows</option>
//                       <option value={10}>10 rows</option>
//                       <option value={30}>30 rows</option>
//                       <option value={31}>All days</option>
//                     </select>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//                     <input
//                       type="month"
//                       value={selectedMonth}
//                       onChange={handleMonthChange}
//                       className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
//                   <input
//                     type="text"
//                     value={searchText}
//                     onChange={handleSearch}
//                     placeholder="Search by date, day, or status..."
//                     className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-64"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Attendance Table */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
//             >
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
//                     <tr>
//                       {["S.L", "Date", "Day", "Check In/Out", "Hours", "Break", "Status", "Action"].map((header, index) => (
//                         <th
//                           key={header}
//                           className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
//                         >
//                           {header}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                     <AnimatePresence>
//                       {displayedData.map((item, index) => (
//                         <motion.tr
//                           key={item.sl}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.05 }}
//                           className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
//                               {String(item.sl).padStart(2, "0")}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.date}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-600 dark:text-gray-400">{item.day}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex flex-col gap-1">
//                               <div className="flex items-center gap-2 text-xs">
//                                 <span className="font-semibold text-blue-600 dark:text-blue-400">{item.logInTime}</span>
//                                 <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
//                                 <span className="font-semibold text-red-600 dark:text-red-400">{item.logOutTime}</span>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                               {item.hoursWorked || "N/A"}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className="text-sm text-gray-600 dark:text-gray-400">{item.totalBreak}</span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {renderStatusBadge(item.status)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {(item.status === "Absent" || item.status === "Holiday") && (
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => openMissedPunchModal(item)}
//                                 className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-xs font-medium transition-colors"
//                               >
//                                 <FiClock className="w-3 h-3" />
//                                 Request
//                               </motion.button>
//                             )}
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </tbody>
//                 </table>

//                 {displayedData.length === 0 && (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FiSearch className="w-8 h-8 text-gray-400 dark:text-gray-500" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No records found</h3>
//                     <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
//                   </div>
//                 )}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
//                   <div className="text-sm text-gray-700 dark:text-gray-300">
//                     Showing {startIndex + 1}-{Math.min(endIndex, totalEntries)} of {totalEntries} results
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(safeCurrentPage - 1)}
//                       disabled={safeCurrentPage === 1}
//                       className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <FiChevronLeft className="w-4 h-4" />
//                     </motion.button>
                    
//                     <div className="flex items-center gap-1">
//                       {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                         const page = i + 1;
//                         return (
//                           <motion.button
//                             key={page}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => goToPage(page)}
//                             className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                               page === safeCurrentPage
//                                 ? "bg-blue-600 dark:bg-blue-500 text-white"
//                                 : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
//                             }`}
//                           >
//                             {page}
//                           </motion.button>
//                         );
//                       })}
//                     </div>

//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => goToPage(safeCurrentPage + 1)}
//                       disabled={safeCurrentPage === totalPages}
//                       className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <FiChevronRight className="w-4 h-4" />
//                     </motion.button>
//                   </div>
//                 </div>
//               )}
//             </motion.div>

//             {/* KEEPING ORIGINAL PAYROLL SUMMARY TABLE */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-8"
//             >
//               <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-6 text-xl flex items-center gap-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
//                   <FiDollarSign className="w-4 h-4 text-white" />
//                 </div>
//                 Payroll Summary
//               </h2>
              
//               <div className="overflow-x-auto mb-6">
//                 <table className="min-w-full text-sm">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 rounded-lg">
//                       <th className="py-3 px-4 text-left font-semibold">Base Salary</th>
//                       <th className="py-3 px-4 text-left font-semibold">Standard Deductions</th>
//                       <th className="py-3 px-4 text-left font-semibold">Leaves (Unpaid)</th>
//                       <th className="py-3 px-4 text-left font-semibold">Remaining Paid Leaves</th>
//                       <th className="py-3 px-4 text-left font-semibold">Final Salary</th>
//                     </tr>
//                   </thead>
//                   <tbody className="border-t border-gray-200 dark:border-gray-600">
//                     <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                       <td className="py-4 px-4 font-semibold text-gray-800 dark:text-gray-200">₹ {numericBaseSalary.toFixed(2)}</td>
//                       <td className="py-4 px-4 font-semibold text-red-600 dark:text-red-400">{deduction}</td>
//                       <td className="py-4 px-4 font-semibold text-orange-600 dark:text-orange-400">{leaves}</td>
//                       <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">{remainingPaidLeaves}</td>
//                       <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-lg">{finalSalary}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               {/* Deductions breakdown - KEEPING ORIGINAL BREAKDOWN TABLE */}
//               {deductionsBreakdown && deductionsBreakdown.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-6"
//                 >
//                   <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
//                     <FiTrendingUp className="w-4 h-4 text-blue-500" />
//                     Deductions Breakdown
//                   </h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm">
//                       <thead>
//                         <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300">
//                           <th className="py-3 px-4 text-left font-semibold">Deduction Name</th>
//                           <th className="py-3 px-4 text-left font-semibold">Percentage</th>
//                           <th className="py-3 px-4 text-left font-semibold">Amount</th>
//                         </tr>
//                       </thead>
//                       <tbody className="border-t border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
//                         {deductionsBreakdown.map((d, i) => (
//                           <motion.tr
//                             key={i}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: 0.1 * i }}
//                             className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
//                           >
//                             <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{d.name}</td>
//                             <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{d.percentage}</td>
//                             <td className="py-3 px-4 font-semibold text-red-600 dark:text-red-400">₹ {d.amount.toFixed(2)}</td>
//                           </motion.tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </motion.div>
//               )}
//             </motion.div>
//           </div>
//         </main>
//       </div>

//       {/* Missed Punch Modal - KEEPING ALL ORIGINAL MODAL FUNCTIONALITY */}
//       <AnimatePresence>
//         {missedPunchModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
//             >
//               <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
//                       <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                         Missed Punch Request
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         Date: {selectedDateForPunch?.date}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setPunchInTime("");
//                       setPunchOutTime("");
//                       setPunchReason("");
//                       setMissedPunchModalOpen(false);
//                     }}
//                     className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Punch In Time
//                   </label>
//                   <TimePicker
//                     onChange={(timeVal) => setPunchInTime(timeVal)}
//                     value={punchInTime}
//                     disableClock
//                     clearIcon={null}
//                     format="hh:mm a"
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Punch Out Time
//                   </label>
//                   <TimePicker
//                     onChange={(timeVal) => setPunchOutTime(timeVal)}
//                     value={punchOutTime}
//                     disableClock
//                     clearIcon={null}
//                     format="hh:mm a"
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Reason for Missed Punch
//                   </label>
//                   <textarea
//                     value={punchReason}
//                     onChange={(e) => setPunchReason(e.target.value)}
//                     placeholder="Please provide a brief explanation..."
//                     rows={4}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
//                   />
//                 </div>
//               </div>

//               <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => {
//                     setPunchInTime("");
//                     setPunchOutTime("");
//                     setPunchReason("");
//                     setMissedPunchModalOpen(false);
//                   }}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={async () => {
//                     try {
//                       await axiosInstance.post("/attendance-user/missed-punch-request", {
//                         date: selectedDateForPunch?.date,
//                         punchIn: punchInTime,
//                         punchOut: punchOutTime,
//                         reason: punchReason,
//                       });
//                       toast.success("Missed Punch request submitted successfully!");
//                     } catch (error) {
//                       console.error(error);
//                       toast.error("Failed to submit missed punch request.");
//                     } finally {
//                       setPunchInTime("");
//                       setPunchOutTime("");
//                       setPunchReason("");
//                       setMissedPunchModalOpen(false);
//                     }
//                   }}
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
//                 >
//                   <FiCheckCircle className="w-4 h-4" />
//                   Submit Request
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Confirmation Dialog - KEEPING ORIGINAL CONFIRMATION DIALOG */}
//       <ConfirmationDialog
//         open={confirmDialogOpen}
//         title="Download Payslip PDF"
//         message="Are you sure you want to download the payslip PDF for this month?"
//         onConfirm={onConfirmPDF}
//         onCancel={onCancelPDF}
//         confirmText="Download"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPrinter, 
  FiDownload, 
  FiSearch, 
  FiBriefcase,
  FiCalendar,
  FiAlertTriangle,
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiLogOut,
  FiClock,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiRefreshCw,
  FiUser,
  FiDollarSign,
  FiTrendingUp,
  FiMenu,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "../common/ConfirmationDialog";
import 'react-clock/dist/Clock.css';
import 'react-time-picker/dist/TimePicker.css'; 
import TimePicker from 'react-time-picker';
import axiosInstance from "../../service/axiosInstance";
import { useOwnFullAttendanceStore } from "../../store/useOwnFullAttendanceStore";
import jsPDF from "jspdf";
import "jspdf-autotable";

/* 
  --------------------------------------------------------------------------------------
  HELPER FUNCTIONS (no TypeScript, purely JS) - KEEPING ALL ORIGINAL FUNCTIONS
  --------------------------------------------------------------------------------------
*/
// Returns all days of a given (year, month) pinned around noon to avoid TZ shift:
function getAllDaysInMonth(year, month) {
  const days = [];
  let date = new Date(year, month - 1, 1, 12);
  while (date.getMonth() === month - 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Convert "hh:mm:ss AM/PM" → "HH:mm:ss" in 24-hour format
function convertTo24Hour(timeString) {
  if (!timeString) return null;
  const [timePart, ampm] = timeString.split(" ");
  if (!timePart || !ampm) return null;

  let [hours, minutes, seconds] = timePart.split(":").map(Number);
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;

  if (ampm.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }
  if (ampm.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }
  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

// Calculate hours difference between login/logout
function getHoursWorked(login, logout) {
  if (!login || !logout) return 0;
  const login24 = convertTo24Hour(login);
  const logout24 = convertTo24Hour(logout);
  if (!login24 || !logout24) return 0;

  // FIX: Use the converted 24-hour format instead of original 12-hour format
  const loginDate = new Date("1970-01-01T" + login24);
  const logoutDate = new Date("1970-01-01T" + logout24);
  const diffMs = logoutDate - loginDate;
  return diffMs > 0 ? diffMs / (1000 * 60 * 60) : 0;
}

// IMPROVED: Better formatting for hours worked display
function formatHoursWorked(hoursWorked) {
  if (hoursWorked === 0) return "0h 0m";
  
  const totalMinutes = hoursWorked * 60;
  
  // If less than 1 minute, show seconds
  if (totalMinutes < 1) {
    const seconds = Math.round(hoursWorked * 3600);
    return `${seconds}s`;
  }
  
  // If less than 60 minutes, show minutes
  if (totalMinutes < 60) {
    const minutes = Math.round(totalMinutes);
    return `${minutes}m`;
  }
  
  // Otherwise show hours and minutes
  const wholeHours = Math.floor(hoursWorked);
  const remainingMinutes = Math.round((hoursWorked - wholeHours) * 60);
  
  if (remainingMinutes === 0) {
    return `${wholeHours}h`;
  }
  
  return `${wholeHours}h ${remainingMinutes}m`;
}

// If your breaks contain either durations in minutes or start/end times:
function getTotalBreakTime(breaks = []) {
  let totalMinutes = 0;
  for (const br of breaks) {
    if (typeof br.duration === "number" && br.duration > 0) {
      totalMinutes += br.duration;
    } else if (br.start && br.end) {
      const start = new Date(br.start);
      const end = new Date(br.end);
      const diffMs = end - start;
      const diffMins = diffMs > 0 ? diffMs / (1000 * 60) : 0;
      totalMinutes += diffMins;
    }
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

// Return only unique dates from attendance to avoid duplicates
function getUniqueAttendanceData(attendanceData = []) {
  const unique = [];
  const seen = new Set();
  for (const record of attendanceData) {
    if (!seen.has(record.date)) {
      unique.push(record);
      seen.add(record.date);
    }
  }
  return unique;
}

// total shifts (old snippet logic)
function calculateTotalShifts(attendanceData, year, month) {
  return attendanceData.filter((rec) => {
    const d = new Date(rec.date);
    return (
      d.getFullYear() === year &&
      d.getMonth() + 1 === month &&
      rec.login &&
      rec.logout
    );
  }).length;
}

// total leaves (excluding approved, ignoring holidays, etc.)
function calculateTotalLeaves({
  attendanceData,
  approvedLeaves,
  leaveSystemDetails,
  companySettings,
  year,
  month,
}) {
  const allDays = getAllDaysInMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const approvedLeaveDates = new Set();
  for (const leave of approvedLeaves) {
    const fromDate = new Date(leave.leave_From);
    const toDate = new Date(leave.leave_To);
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      approvedLeaveDates.add(d.toISOString().split("T")[0]);
    }
  }

  let totalLeaves = 0;
  for (const dateObj of allDays) {
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    const isWorkingDay =
      leaveSystemDetails &&
      leaveSystemDetails.workingDays &&
      leaveSystemDetails.workingDays.includes(dayName);
    const isHoliday =
      companySettings &&
      companySettings.holidays &&
      companySettings.holidays.some(
        (h) => new Date(h.date).toISOString().split("T")[0] === formatted
      );

    if (!isWorkingDay || isHoliday) {
      continue;
    }
    if (approvedLeaveDates.has(formatted)) {
      continue;
    }

    const rec = attendanceData.find((r) => r.date === formatted);
    if (dateObj <= today) {
      if (!rec || !rec.login) {
        totalLeaves++;
      }
    }
  }
  return totalLeaves;
}

// total half days
function calculateTotalHalfDays(
  attendanceData,
  year,
  month,
  attendancePolicies
) {
  const halfDayHours = attendancePolicies?.halfDayHours || 5;
  const minWork = attendancePolicies?.minimumWorkingHours || 4.5;
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > minWork && hoursWorked <= halfDayHours) {
          count++;
        }
      }
    }
  }
  return count;
}

// not even half day
function calculateNotEvenHalfDays(attendanceData, year, month) {
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked > 0 && hoursWorked < 4.5) {
          count++;
        }
      }
    }
  }
  return count;
}

// completed days (≥ attendancePolicies.fullDayHours or 9 default)
function calculateTotalCompletedDays(
  attendanceData,
  year,
  month,
  attendancePolicies
) {
  const fullDayHours = attendancePolicies?.fullDayHours || 9;
  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      if (rec.login && rec.logout) {
        const hoursWorked = getHoursWorked(rec.login, rec.logout);
        if (hoursWorked >= fullDayHours) {
          count++;
        }
      }
    }
  }
  return count;
}

// total lates
function calculateTotalLates(
  attendanceData,
  year,
  month,
  shiftStart,
  attendancePolicies
) {
  if (!shiftStart) return 0;
  const graceMins = attendancePolicies?.gracePeriodMinutes || 15;

  let count = 0;
  for (const rec of attendanceData) {
    const d = new Date(rec.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === month && rec.login) {
      const shiftStart24 = convertTo24Hour(shiftStart);
      if (!shiftStart24) continue;
      const shiftDate = new Date("1970-01-01T" + shiftStart24);
      shiftDate.setMinutes(shiftDate.getMinutes() + graceMins);

      // FIX: Use converted 24-hour format here too
      const login24 = convertTo24Hour(rec.login);
      if (!login24) continue;
      const loginDate = new Date("1970-01-01T" + login24);
      
      if (loginDate > shiftDate) {
        count++;
      }
    }
  }
  return count;
}

// not logged out
function calculateNotLoggedOut(attendanceData, year, month) {
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
}

// get total working days
function getTotalWorkingDays(
  leaveSystemDetails,
  companySettings,
  year,
  month,
  upToToday = false
) {
  const allDays = getAllDaysInMonth(year, month);
  const today = new Date();
  const workingDays = allDays.filter((dateObj) => {
    if (
      upToToday &&
      year === today.getFullYear() &&
      month === today.getMonth() + 1 &&
      dateObj > today
    ) {
      return false;
    }
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const isWorkingDay =
      leaveSystemDetails &&
      leaveSystemDetails.workingDays &&
      leaveSystemDetails.workingDays.includes(dayName);
    const isHoliday =
      companySettings &&
      companySettings.holidays &&
      companySettings.holidays.some(
        (h) =>
          new Date(h.date).toISOString().split("T")[0] ===
          dateObj.toISOString().split("T")[0]
      );
    return isWorkingDay && !isHoliday;
  });
  return workingDays.length;
}

// next payroll date
function getPayrollPeriodDates({
  year,
  month,
  userProfileData,
  companySettings,
  employmentTypeDetails,
}) {
  if (!employmentTypeDetails || !companySettings || !userProfileData) {
    return { startDate: null, endDate: null, nextPayrollDate: null };
  }
  const payrollCycleId = employmentTypeDetails.payrollCycleId;
  const payrollCycle = companySettings?.payrollCycles?.find(
    (pc) => pc.id === payrollCycleId
  );
  if (!payrollCycle) {
    return { startDate: null, endDate: null, nextPayrollDate: null };
  }

  const processingDate = payrollCycle.processingDate;
  let startDate, endDate;

  if (processingDate === 1) {
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month, 0);
  } else {
    startDate = new Date(year, month - 2, processingDate);
    endDate = new Date(year, month - 1, processingDate - 1);
  }

  const doj = new Date(userProfileData.date_of_Joining);
  if (startDate < doj) startDate = doj;

  const now = new Date();
  if (endDate > now) endDate = now;

  let nextPayrollDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    processingDate
  );

  return { startDate, endDate, nextPayrollDate };
}

// parse shift timing (e.g., "Saket (09:00 - 07:00)")
function parseShiftTiming(shiftString) {
  if (!shiftString) return null;
  const regex = /(.+?)\s*\((\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\)/;
  const match = shiftString.match(regex);
  if (!match) return null;
  const [_, name, start, end] = match;
  return { name: name.trim(), startTime: start.trim(), endTime: end.trim() };
}

// old snippet approach to final salary
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

  const calcMethod = attendancePolicies.calcSalaryBasedOn || "WORKING_DAYS";
  const totalPaidLeaves = userProfileData?.no_of_Paid_Leave || 0;

  // determine denominator
  const denom =
    calcMethod === "CALENDAR_DAYS"
      ? new Date(year, month, 0).getDate()
      : getTotalWorkingDays(
          leaveSystemDetails,
          companySettings,
          year,
          month,
          false
        );

  const isCurrentMonthAndYear =
    year === new Date().getFullYear() && month === new Date().getMonth() + 1;
  const daysUpToToday = isCurrentMonthAndYear
    ? calcMethod === "CALENDAR_DAYS"
      ? Math.min(new Date().getDate(), denom)
      : getTotalWorkingDays(
          leaveSystemDetails,
          companySettings,
          year,
          month,
          true
        )
    : denom;

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
  const notLoggedOutDays = calculateNotLoggedOut(attendanceData, year, month);
  const totalUnpaidLeaves = totalLeaves + notEvenHalfDays + notLoggedOutDays;

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
  const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

  // standard deductions from employmentType
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

  // fraction of the month
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

  // final
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

// monthName
function monthName(m) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[m - 1] || "Unknown";
}

// DEBUGGING FUNCTIONS - NEW
function debugAttendanceData(attendanceDataRaw, year, month) {
  console.log("=== DEBUGGING ATTENDANCE DATA ===");
  console.log("Raw attendance data count:", attendanceDataRaw?.length || 0);
  
  if (!attendanceDataRaw || attendanceDataRaw.length === 0) {
    console.log("❌ No attendance data found");
    return;
  }
  
  // Show sample of raw data
  console.log("Sample raw data:", attendanceDataRaw.slice(0, 2));
  
  // Filter for current month
  const currentMonthData = attendanceDataRaw.filter(rec => {
    const d = new Date(rec.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  
  console.log("Current month data count:", currentMonthData.length);
  console.log("Target year/month:", year, month);
  
  if (currentMonthData.length === 0) {
    console.log("❌ No data for current month");
    console.log("Available dates:", attendanceDataRaw.map(r => r.date));
    return;
  }
  
  // Check each record
  currentMonthData.forEach((record, index) => {
    console.log(`\n--- Record ${index + 1} ---`);
    console.log("Date:", record.date);
    console.log("Login:", record.login);
    console.log("Logout:", record.logout);
    console.log("Status:", record.status);
    
    if (record.login && record.logout) {
      const hoursWorked = getHoursWorked(record.login, record.logout);
      console.log("Hours worked:", hoursWorked);
      console.log("Formatted:", formatHoursWorked(hoursWorked));
    }
  });
  
  return currentMonthData;
}

function checkFilteringIssues(finalAttendanceData, searchText) {
  console.log("=== CHECKING FILTERING ISSUES ===");
  console.log("Total processed records:", finalAttendanceData.length);
  
  const recordsWithData = finalAttendanceData.filter(item => 
    item.logInTime !== "------" || item.logOutTime !== "------"
  );
  console.log("Records with actual data:", recordsWithData.length);
  
  if (searchText) {
    console.log("Search text:", searchText);
    const filteredCount = finalAttendanceData.filter((item) => {
      const combined = (item.date + " " + item.day + " " + item.status).toLowerCase().trim();
      return combined.includes(searchText.toLowerCase().trim());
    }).length;
    console.log("Records after search filter:", filteredCount);
  }
  
  // Show sample of records with data
  if (recordsWithData.length > 0) {
    console.log("\nSample records with data:");
    recordsWithData.slice(0, 3).forEach(record => {
      console.log(`${record.date}: ${record.logInTime} - ${record.logOutTime} (${record.status}) - ${record.hoursWorked || 'N/A'}`);
    });
  }
}

export default function OwnFullAttendance() {
  const [punchReason, setPunchReason] = useState("");
  const [missedPunchModalOpen, setMissedPunchModalOpen] = useState(false);
  const [selectedDateForPunch, setSelectedDateForPunch] = useState(null);
  const [punchInTime, setPunchInTime] = useState("");
  const [punchOutTime, setPunchOutTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle initial sidebar state for desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [showPayrollDetails, setShowPayrollDetails] = useState(false);

  // Store hooks - KEEPING ALL ORIGINAL STORE CONNECTIONS
  const fetchAttendanceData = useOwnFullAttendanceStore((s) => s.fetchAttendanceData);
  const attendanceDataRaw = useOwnFullAttendanceStore((s) => s.attendanceData);
  const approvedLeaves = useOwnFullAttendanceStore((s) => s.approvedLeaves);
  const companySettings = useOwnFullAttendanceStore((s) => s.companySettings);
  const userProfileData = useOwnFullAttendanceStore((s) => s.userProfileData);
  const attendancePolicies = useOwnFullAttendanceStore((s) => s.attendancePolicies);
  const employmentTypeDetails = useOwnFullAttendanceStore((s) => s.employmentTypeDetails);
  const generatePDF = useOwnFullAttendanceStore((s) => s.generatePDF);
  const attendanceError = useOwnFullAttendanceStore((s) => s.error);
  const leaveSystemDetails = useOwnFullAttendanceStore((s) => s.leaveSystemDetails);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Date controls - KEEPING ALL ORIGINAL STATE
  const today = new Date();
  const defaultMonthString = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonthString);

  // Search & pagination - KEEPING ALL ORIGINAL STATE
  const [searchText, setSearchText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  // parse year & month - KEEPING ORIGINAL LOGIC
  const parts = selectedMonth.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);

  // Make sure we have unique attendance records - KEEPING ORIGINAL LOGIC
  const attendanceData = getUniqueAttendanceData(attendanceDataRaw || []);

  // DEBUGGING - NEW: Add comprehensive debugging
  useEffect(() => {
    console.log("=== ATTENDANCE COMPONENT DEBUG ===");
    console.log("Selected year/month:", year, month);
    console.log("Raw attendance data:", attendanceDataRaw);
    console.log("Unique attendance data:", attendanceData);
    console.log("Leave system details:", leaveSystemDetails);
    console.log("Company settings:", companySettings);
    
    if (attendanceDataRaw) {
      debugAttendanceData(attendanceDataRaw, year, month);
    }
  }, [attendanceDataRaw, year, month, leaveSystemDetails, companySettings]);

  // SHIFT TIMING - KEEPING ORIGINAL LOGIC
  const shiftTimingDetails = parseShiftTiming(userProfileData?.shift_Timing || "");

  // Build daily table - KEEPING ALL ORIGINAL LOGIC BUT WITH IMPROVED DEBUGGING
  const allDaysInMonth = getAllDaysInMonth(year, month);

  // set of approved leaves - KEEPING ORIGINAL LOGIC
  const approvedLeaveDates = new Set();
  if (approvedLeaves) {
    for (const lv of approvedLeaves) {
      const fromDate = new Date(lv.leave_From);
      const toDate = new Date(lv.leave_To);
      for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
        approvedLeaveDates.add(d.toISOString().split("T")[0]);
      }
    }
  }

  const todayObj = new Date();
  const finalAttendanceData = allDaysInMonth.map((dateObj, idx) => {
    const formatted = dateObj.toISOString().split("T")[0];
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    let row = {
      sl: idx + 1,
      date: formatted,
      day: dayName,
      logInTime: "------",
      logOutTime: "------",
      totalBreak: "N/A",
      status: "------",
    };

    // Check if holiday or not working or an approved leave - KEEPING ORIGINAL LOGIC
    const isHoliday = companySettings?.holidays?.some(
      (h) => new Date(h.date).toISOString().split("T")[0] === formatted
    );
    const isWorkingDay = leaveSystemDetails?.workingDays?.includes(dayName) || false;
    const isApprovedLeave = approvedLeaveDates.has(formatted);

    // DEBUGGING - Add logging for working days
    if (formatted === "2025-06-13") {
      console.log(`=== DEBUGGING ${formatted} ===`);
      console.log("Day name:", dayName);
      console.log("Is working day:", isWorkingDay);
      console.log("Working days config:", leaveSystemDetails?.workingDays);
      console.log("Is holiday:", isHoliday);
      console.log("Is approved leave:", isApprovedLeave);
    }

    if (isApprovedLeave) {
      row.status = "Holiday";
      return row;
    }
    if (!isWorkingDay || isHoliday) {
      row.status = "Holiday";
      return row;
    }

    // find attendance record - KEEPING ORIGINAL LOGIC
    const record = attendanceData.find((r) => r.date === formatted);
    
    // DEBUGGING - Add logging for record finding
    if (formatted === "2025-06-13") {
      console.log("Found record:", !!record);
      console.log("Record details:", record);
    }
    
    if (!record) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // fill in login/logout - KEEPING ORIGINAL LOGIC
    if (record.login) row.logInTime = record.login;
    if (record.logout) row.logOutTime = record.logout;

    // breaks - KEEPING ORIGINAL LOGIC
    if (record.breaks && record.breaks.length > 0) {
      row.totalBreak = getTotalBreakTime(record.breaks);
    }

    // if no logout in the past => absent - KEEPING ORIGINAL LOGIC
    if (!record.logout) {
      row.status = dateObj < todayObj ? "Absent" : "------";
      return row;
    }

    // Calculate total hours worked - IMPROVED WITH BETTER FORMATTING
    const hoursWorked = getHoursWorked(record.login, record.logout);
    row.hoursWorked = formatHoursWorked(hoursWorked); // IMPROVED: Use better formatting

    // DEBUGGING - Add logging for hours calculation
    if (formatted === "2025-06-13") {
      console.log("Hours worked:", hoursWorked);
      console.log("Formatted hours:", row.hoursWorked);
    }

    // IMPROVED: Better status logic
    if (hoursWorked >= 9) {
      row.status = "Present";
    } else if (hoursWorked >= 4.5) {
      row.status = hoursWorked <= 5 ? "Half Day" : "Present";
    } else if (hoursWorked > 0) {
      row.status = "Not Even Half Day";
    } else {
      row.status = "Absent";
    }
    
    // DEBUGGING - Add logging for status calculation
    if (formatted === "2025-06-13") {
      console.log("Final status:", row.status);
    }
    
    return row;
  });

  // DEBUGGING - Add comprehensive debugging for final data
  useEffect(() => {
    if (finalAttendanceData.length > 0) {
      checkFilteringIssues(finalAttendanceData, searchText);
    }
  }, [finalAttendanceData, searchText]);

  // filter by search - KEEPING ORIGINAL LOGIC
  const filteredData = finalAttendanceData.filter((item) => {
    const combined = (item.date + " " + item.day + " " + item.status).toLowerCase().trim();
    return combined.includes(searchText.toLowerCase().trim());
  });

  // pagination - KEEPING ORIGINAL LOGIC
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  // "Old snippet" stats - KEEPING ALL ORIGINAL CALCULATIONS
  const totalShifts = calculateTotalShifts(attendanceData, year, month);
  const totalLates = calculateTotalLates(
    attendanceData,
    year,
    month,
    shiftTimingDetails?.startTime || null,
    attendancePolicies
  );
  const notLoggedOut = calculateNotLoggedOut(attendanceData, year, month);
  const totalLeaves = calculateTotalLeaves({
    attendanceData,
    approvedLeaves,
    leaveSystemDetails,
    companySettings,
    year,
    month,
  });
  const totalCompletedDays = calculateTotalCompletedDays(
    attendanceData,
    year,
    month,
    attendancePolicies
  );
  const halfDays = calculateTotalHalfDays(attendanceData, year, month, attendancePolicies);
  const notEvenHalfDays = calculateNotEvenHalfDays(attendanceData, year, month);

  // final salary - KEEPING ORIGINAL LOGIC
  const numericBaseSalary = parseFloat(userProfileData?.current_Base_Salary) || 0;

  const {
    finalSalary,
    deduction,
    leaves,
    remainingPaidLeaves,
    deductionsBreakdown,
  } = calculateFinalSalary({
    baseSalary: numericBaseSalary,
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

  // next payroll date - KEEPING ORIGINAL LOGIC
  const { nextPayrollDate } = getPayrollPeriodDates({
    year,
    month,
    userProfileData,
    companySettings,
    employmentTypeDetails,
  });
  const formattedNextPayrollDate = nextPayrollDate ? nextPayrollDate.toDateString() : "Not available";

  // event handlers - KEEPING ALL ORIGINAL HANDLERS
  function openMissedPunchModal(dateRow) {
    setSelectedDateForPunch(dateRow);
    setMissedPunchModalOpen(true);
  }

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  }

  function handleSearch(e) {
    setSearchText(e.target.value);
    setCurrentPage(1);
  }

  function handleRowsPerPage(e) {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }

  function goToPage(pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  }

  function onRequestPDF() {
    setConfirmDialogOpen(true);
  }

  function onConfirmPDF() {
    setConfirmDialogOpen(false);
    if (generatePDF) {
      generatePDF(year, month);
    } else {
      toast.error("No PDF generator found in the store!");
    }
  }

  function onCancelPDF() {
    setConfirmDialogOpen(false);
    toast("PDF download cancelled", { icon: "❌" });
  }

  // Error handling - KEEPING ORIGINAL ERROR HANDLING
  if (attendanceError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center p-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{attendanceError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  const empName = (userProfileData?.first_Name || "") + " " + (userProfileData?.last_Name || "");
  const empCode = userProfileData?.employee_Id || "N/A";

  // Status badge renderer with dark mode support
  const renderStatusBadge = (status) => {
    const badgeConfig = {
      Present: {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-200 dark:border-green-700",
        icon: FiCheckCircle,
        iconColor: "text-green-500 dark:text-green-400"
      },
      Absent: {
        bg: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
        text: "text-red-700 dark:text-red-400",
        border: "border-red-200 dark:border-red-700",
        icon: FiX,
        iconColor: "text-red-500 dark:text-red-400"
      },
      "Half Day": {
        bg: "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        text: "text-yellow-700 dark:text-yellow-400",
        border: "border-yellow-200 dark:border-yellow-700",
        icon: FiSun,
        iconColor: "text-yellow-500 dark:text-yellow-400"
      },
      "Not Even Half Day": {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-700",
        icon: FiMoon,
        iconColor: "text-purple-500 dark:text-purple-400"
      },
      Holiday: {
        bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-700",
        icon: FiCalendar,
        iconColor: "text-blue-500 dark:text-blue-400"
      },
      Late: {
        bg: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-700",
        icon: FiClock,
        iconColor: "text-purple-500 dark:text-purple-400"
      }
    };

    const config = badgeConfig[status] || badgeConfig.Holiday;
    const IconComponent = config.icon;

    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
      >
        <IconComponent className={`w-3 h-3 ${config.iconColor}`} />
        {status}
      </motion.span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Attendance Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {monthName(month)} {year} • {empName.trim()} ({empCode})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={sidebarOpen ? "Hide Overview" : "Show Overview"}
              >
                <FiMenu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 transition-colors"
              >
                <FiPrinter className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRequestPDF}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
              >
                <FiDownload className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex flex-row-reverse ">
        {/* Sidebar - moved to right side */}
        <motion.aside
          className={`w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700 overflow-y-auto ${
            sidebarOpen 
              ? 'fixed top-0 right-0 bottom-0 z-40 lg:relative lg:z-auto' 
              : 'hidden lg:block lg:relative'
          }`}
        >
          <div className="p-6 ">
            <div className="flex items-center justify-between mb-6 lg:hidden border">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Overview</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Employee Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 mb-6 border border-blue-100 dark:border-blue-800 min-w-56"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Employee Stats</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Overview</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Total Shifts", value: totalShifts, icon: FiBriefcase, color: "blue" },
                  { label: "Total Leaves", value: totalLeaves, icon: FiCalendar, color: "red" },
                  { label: "Late Arrivals", value: totalLates, icon: FiAlertTriangle, color: "yellow" },
                  { label: "Half Days", value: halfDays, icon: FiSun, color: "orange" },
                  { label: "Incomplete Days", value: notEvenHalfDays, icon: FiMoon, color: "purple" },
                  { label: "Completed Days", value: totalCompletedDays, icon: FiCheckCircle, color: "green" },
                  { label: "Not Logged Out", value: notLoggedOut, icon: FiLogOut, color: "pink" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-4 h-4 text-${stat.color}-500 dark:text-${stat.color}-400`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</span>
                    </div>
                    <span className={`text-sm font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Payroll Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800 min-w-56"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Payroll</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Salary Summary</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPayrollDetails(!showPayrollDetails)}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  {showPayrollDetails ? (
                    <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Base Salary</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">₹ {numericBaseSalary.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deductions</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">{deduction}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Final Salary</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{finalSalary}</span>
                </div>
              </div>

              <AnimatePresence>
                {showPayrollDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Breakdown:</div>
                    {deductionsBreakdown.map((breakdown, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white/40 dark:bg-gray-700/40 rounded-lg text-xs border border-gray-200/30 dark:border-gray-600/30">
                        <span className="text-gray-700 dark:text-gray-300">{breakdown.name}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">₹ {breakdown.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Shift Timing Details - KEEPING ORIGINAL SHIFT TIMING TABLE */}
            {shiftTimingDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Shift Timing</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Working Hours</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Shift Name</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{shiftTimingDetails.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Start Time</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{shiftTimingDetails.startTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                    <span className="text-sm text-gray-600 dark:text-gray-400">End Time</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{shiftTimingDetails.endTime}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FiFilter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <select
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      value={rowsPerPage}
                      onChange={handleRowsPerPage}
                    >
                      <option value={7}>7 rows</option>
                      <option value={10}>10 rows</option>
                      <option value={30}>30 rows</option>
                      <option value={31}>All days</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search by date, day, or status..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-64"
                  />
                </div>
              </div>
            </motion.div>

            {/* Attendance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <tr>
                      {["S.L", "Date", "Day", "Check In/Out", "Hours", "Break", "Status", "Action"].map((header, index) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {displayedData.map((item, index) => (
                        <motion.tr
                          key={item.sl}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                              {String(item.sl).padStart(2, "0")}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-400">{item.day}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-semibold text-blue-600 dark:text-blue-400">{item.logInTime}</span>
                                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                                <span className="font-semibold text-red-600 dark:text-red-400">{item.logOutTime}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.hoursWorked || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.totalBreak}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(item.status === "Absent" || item.status === "Holiday") && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openMissedPunchModal(item)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-xs font-medium transition-colors"
                              >
                                <FiClock className="w-3 h-3" />
                                Request
                              </motion.button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {displayedData.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No records found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {startIndex + 1}-{Math.min(endIndex, totalEntries)} of {totalEntries} results
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </motion.button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <motion.button
                            key={page}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              page === safeCurrentPage
                                ? "bg-blue-600 dark:bg-blue-500 text-white"
                                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {page}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => goToPage(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* KEEPING ORIGINAL PAYROLL SUMMARY TABLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-8"
            >
              <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-6 text-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="w-4 h-4 text-white" />
                </div>
                Payroll Summary
              </h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 rounded-lg">
                      <th className="py-3 px-4 text-left font-semibold">Base Salary</th>
                      <th className="py-3 px-4 text-left font-semibold">Standard Deductions</th>
                      <th className="py-3 px-4 text-left font-semibold">Leaves (Unpaid)</th>
                      <th className="py-3 px-4 text-left font-semibold">Remaining Paid Leaves</th>
                      <th className="py-3 px-4 text-left font-semibold">Final Salary</th>
                    </tr>
                  </thead>
                  <tbody className="border-t border-gray-200 dark:border-gray-600">
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-800 dark:text-gray-200">₹ {numericBaseSalary.toFixed(2)}</td>
                      <td className="py-4 px-4 font-semibold text-red-600 dark:text-red-400">{deduction}</td>
                      <td className="py-4 px-4 font-semibold text-orange-600 dark:text-orange-400">{leaves}</td>
                      <td className="py-4 px-4 font-semibold text-blue-600 dark:text-blue-400">{remainingPaidLeaves}</td>
                      <td className="py-4 px-4 font-bold text-emerald-600 dark:text-emerald-400 text-lg">{finalSalary}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Deductions breakdown - KEEPING ORIGINAL BREAKDOWN TABLE */}
              {deductionsBreakdown && deductionsBreakdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-blue-500" />
                    Deductions Breakdown
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300">
                          <th className="py-3 px-4 text-left font-semibold">Deduction Name</th>
                          <th className="py-3 px-4 text-left font-semibold">Percentage</th>
                          <th className="py-3 px-4 text-left font-semibold">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="border-t border-gray-200 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
                        {deductionsBreakdown.map((d, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{d.name}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{d.percentage}</td>
                            <td className="py-3 px-4 font-semibold text-red-600 dark:text-red-400">₹ {d.amount.toFixed(2)}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Missed Punch Modal - KEEPING ALL ORIGINAL MODAL FUNCTIONALITY */}
      <AnimatePresence>
        {missedPunchModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                      <FiClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Missed Punch Request
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date: {selectedDateForPunch?.date}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPunchInTime("");
                      setPunchOutTime("");
                      setPunchReason("");
                      setMissedPunchModalOpen(false);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Punch In Time
                  </label>
                  <TimePicker
                    onChange={(timeVal) => setPunchInTime(timeVal)}
                    value={punchInTime}
                    disableClock
                    clearIcon={null}
                    format="hh:mm a"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Punch Out Time
                  </label>
                  <TimePicker
                    onChange={(timeVal) => setPunchOutTime(timeVal)}
                    value={punchOutTime}
                    disableClock
                    clearIcon={null}
                    format="hh:mm a"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Reason for Missed Punch
                  </label>
                  <textarea
                    value={punchReason}
                    onChange={(e) => setPunchReason(e.target.value)}
                    placeholder="Please provide a brief explanation..."
                    rows={4}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setPunchInTime("");
                    setPunchOutTime("");
                    setPunchReason("");
                    setMissedPunchModalOpen(false);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    try {
                      await axiosInstance.post("/attendance-user/missed-punch-request", {
                        date: selectedDateForPunch?.date,
                        punchIn: punchInTime,
                        punchOut: punchOutTime,
                        reason: punchReason,
                      });
                      toast.success("Missed Punch request submitted successfully!");
                    } catch (error) {
                      console.error(error);
                      toast.error("Failed to submit missed punch request.");
                    } finally {
                      setPunchInTime("");
                      setPunchOutTime("");
                      setPunchReason("");
                      setMissedPunchModalOpen(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  Submit Request
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog - KEEPING ORIGINAL CONFIRMATION DIALOG */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        title="Download Payslip PDF"
        message="Are you sure you want to download the payslip PDF for this month?"
        onConfirm={onConfirmPDF}
        onCancel={onCancelPDF}
        confirmText="Download"
        cancelText="Cancel"
      />
    </div>
  );
}