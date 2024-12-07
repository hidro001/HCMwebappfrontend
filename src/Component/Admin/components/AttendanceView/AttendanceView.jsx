// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import userService from "../../../../services/Service";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { jsPDF } from "jspdf";

// const AttendanceView = () => {
//   const currentYear = new Date().getFullYear();
//   const currentMonthIndex = new Date().getMonth() + 1; // +1 to make it 1-indexed
//   const { employeeId } = useParams();
//   const navigate = useNavigate();
//   const [punchTimeData, setPunchTimeData] = useState(null);
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const userRole = useSelector((state) => state.auth.userRole);
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [paidLeaves, setPaidLeaves] = useState(0);
//   const [currentPage, setCurrentPage] = useState(currentMonthIndex);
//   const [targetCoordinates, setTargetCoordinates] = useState(null);
//   const [isActive, setIsActive] = useState(false);
//   const { teamName, department } = useParams(); // Get teamName and department from URL params

//   // Function to handle paid leave changes
//   const handlePaidLeavesChange = (newLeaves) => {
//     setPaidLeaves(newLeaves);
//   };

//   // user active status update

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const response = await userService.getUserDetails(employeeId);
//         setEmployee(response.data);
//         setIsActive(response.data.isActive);
//       } catch (error) {
//         setError("Failed to fetch employee details");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchPunchTime = async (employeeId) => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setError("Access token not found. Please log in again.");
//           return;
//         }

//         if (!employeeId) {
//           setError("Employee ID is required to fetch punch time.");
//           return;
//         }

//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/employee/punchtime/${employeeId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           const fetchedTargetCoordinates = {
//             latitude: response.data.data.latitude,
//             longitude: response.data.data.longitude,
//             shift_Timing: response.data.data.shift_Timing,
//             salary: response.data.data.salary, // fetch salary here
//           };
//           setTargetCoordinates(fetchedTargetCoordinates);
//           setPunchTimeData(response.data.data); // store the punch time data including salary
//         } else {
//           throw new Error(
//             response.data.message || "Failed to fetch coordinates"
//           );
//         }
//       } catch (error) {
//         setError(
//           error.response?.data?.message || "Failed to fetch punch time data"
//         );
//         console.error(error);
//       }
//     };

//     const fetchAttendance = async (employeeId) => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           setError("Access token not found. Please log in again.");
//           return;
//         }

//         if (!employeeId) {
//           setError("Employee ID is required.");
//           return;
//         }

//         const response = await axios.get(
//           `https://apiv2.humanmaximizer.com/api/v1/employee/attendencev2?employee_Id=${employeeId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // Ensure attendanceData is always an array
//         setAttendanceData(
//           Array.isArray(response.data.data) ? response.data.data : []
//         );
//       } catch (error) {
//         setError(
//           error.response?.data?.message || "Failed to fetch attendance data"
//         );
//         console.error(error);
//       }
//     };

//     fetchAttendance(employeeId);
//     fetchPunchTime(employeeId);
//     fetchEmployee();
//   }, [employeeId]);

//   const calculateRegularizations = () => {
//     const year = currentYear;
//     const month = currentPage; // currentPage represents the selected month (1-12)

//     const regularizedDays = attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);

//       // Check if the record is for the current year and selected month
//       if (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month &&
//         record.login &&
//         record.logout
//       ) {
//         const loginTime = new Date(`${record.date} ${record.login}`);
//         const logoutTime = new Date(`${record.date} ${record.logout}`);

//         // Calculate the difference in milliseconds between login and logout times
//         const timeDiff = logoutTime - loginTime;

//         // Convert the difference to hours
//         const hoursWorked = timeDiff / (1000 * 60 * 60);

//         // Consider a regularized shift if the person worked between 7 and 8 hours
//         return hoursWorked >= 7 && hoursWorked < 9;
//       }

//       return false;
//     });

//     return regularizedDays.length;
//   };

//   const calculateNotEvenHalfDays = () => {
//     const year = currentYear;
//     const month = currentPage;

//     let count = 0; // Initialize count for "Not Even Half Day"
//     attendanceData.forEach((record) => {
//       const recordDate = new Date(record.date);

//       // Check if the record belongs to the current month and year
//       if (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month &&
//         record.login &&
//         record.logout
//       ) {
//         const loginDate = convertTo24HourTime(record.login);
//         const logoutDate = convertTo24HourTime(record.logout);

//         // Calculate the difference in seconds
//         const timeDifferenceInSeconds = (logoutDate - loginDate) / 1000;

//         // Debugging logs (can be removed in production)

//         if (timeDifferenceInSeconds < 16200) {
//           count++; // Increment count
//         }
//       }
//     });

//     return count; // Return the count of "Not Even Half Day"
//   };

//   const convertTo24HourTime = (time) => {
//     const [timeString, modifier] = time.split(" ");
//     let [hours, minutes, seconds] = timeString.split(":").map(Number);

//     if (modifier === "PM" && hours !== 12) {
//       hours += 12;
//     }
//     if (modifier === "AM" && hours === 12) {
//       hours = 0; // Convert 12 AM to 00:00
//     }

//     return new Date(1970, 0, 1, hours, minutes, seconds || 0); // Return a Date object with the converted time
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Helper function to convert 12-hour time format to 24-hour time
//   const convertTo24Hour = (time) => {
//     if (!time) return null; // Check if the time is valid

//     let [hour, modifier] = time.split(" ");
//     let [hours, minutes, seconds] = hour.split(":");

//     hours = parseInt(hours, 10);
//     minutes = minutes || "00"; // Default to 00 if minutes are missing
//     seconds = seconds || "00"; // Default to 00 if seconds are missing

//     // Handle PM case and 12 PM
//     if (modifier === "PM" && hours !== 12) {
//       hours += 12;
//     }

//     // Handle 12 AM as 00:00
//     if (modifier === "AM" && hours === 12) {
//       hours = 0;
//     }

//     // Return time in HH:MM:SS format (24-hour format)
//     return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
//   };

//   const calculateTotalShifts = () => {
//     const year = currentYear;
//     const month = currentPage;

//     return attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);
//       return (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month &&
//         record.login &&
//         record.logout // Only count records with both login and logout times
//       );
//     }).length;
//   };

//   const calculateTotalLates = () => {
//     const year = currentYear;
//     const month = currentPage; // currentPage represents the selected month (1-12)

//     return attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);

//       // Only consider records from the selected year and month
//       if (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month
//       ) {
//         const shiftStartTime = punchTimeData?.shift_Timing.split(" - ")[0]; // Use global shift_Timing

//         const loginTime = record.login ? record.login : null;

//         // If both shift timing and login time are present, check for lateness
//         if (shiftStartTime && loginTime) {
//           const shiftStart = new Date(
//             `1970-01-01T${convertTo24Hour(shiftStartTime)}`
//           );
//           const loginDateTime = new Date(
//             `1970-01-01T${convertTo24Hour(loginTime)}`
//           );

//           // Check if the login time is later than the shift start time
//           return loginDateTime > shiftStart;
//         }
//       }
//       return false;
//     }).length; // Return the count of late entries
//   };

//   const calculateTotalHalfDays = () => {
//     // Ensure we are filtering data for the current month and year
//     const year = currentYear;
//     const month = currentPage; // Represents the selected month

//     return attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);

//       // Only consider records for the current year and selected month
//       if (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month
//       ) {
//         if (record.login && record.logout) {
//           const logInTime = new Date(
//             `1970-01-01T${convertTo24Hour(record.login)}`
//           );
//           const logOutTime = new Date(
//             `1970-01-01T${convertTo24Hour(record.logout)}`
//           );

//           // Calculate the difference in hours
//           const hoursWorked = (logOutTime - logInTime) / (1000 * 60 * 60);

//           // Mark as a half day if worked hours are less than or equal to 5.5 but more than 0
//           return hoursWorked > 4.5 && hoursWorked <= 5.5;
//         }
//       }
//       return false;
//     }).length;
//   };

//   const calculateTotalCompletedDays = () => {
//     const year = currentYear;
//     const month = currentPage; // currentPage represents the selected month (1-12)

//     const completedDays = attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);

//       // Check if the record is for the current year and selected month
//       if (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month &&
//         record.login &&
//         record.logout
//       ) {
//         const loginTime = new Date(`${record.date} ${record.login}`);
//         const logoutTime = new Date(`${record.date} ${record.logout}`);

//         // Calculate the difference in milliseconds between login and logout times
//         const timeDiff = logoutTime - loginTime;

//         // Convert the difference to hours
//         const hoursWorked = timeDiff / (1000 * 60 * 60);

//         // Consider a complete shift if the person worked 9 hours or more
//         return hoursWorked >= 9;
//       }

//       return false;
//     });

//     return completedDays.length;
//   };
//   const getFirstPunchInDate = () => {
//     if (!attendanceData || attendanceData.length === 0) return null;

//     // Sort the attendance data by date and find the first record with both login and logout
//     const sortedAttendance = attendanceData
//       .filter((record) => record.login && record.logout) // Only consider records with login and logout
//       .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending

//     // Return the earliest date with login and logout
//     return sortedAttendance.length > 0
//       ? new Date(sortedAttendance[0].date)
//       : null;
//   };

//   const calculateTotalLeaves = () => {
//     const year = currentYear;
//     const month = currentPage;

//     // Get all days in the current month
//     const allDays = getAllDaysInMonth(year, month);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set the time to 00:00 for accurate comparison

//     // Get the first punch-in date
//     const firstPunchInDate = getFirstPunchInDate();

//     // If the employee hasn't punched in at all, return 0 leaves
//     if (!firstPunchInDate) {
//       return 0;
//     }

//     // Initialize the total leave count
//     let totalLeaves = 0;

//     // Loop through each day of the month
//     allDays.forEach((date) => {
//       const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

//       // Check if the current date is a Sunday or if it's before the first punch-in date
//       if (
//         date.getDay() === 0 ||
//         (firstPunchInDate && date < firstPunchInDate)
//       ) {
//         return; // Skip Sundays and dates before the first punch-in
//       }

//       const attendanceRecord = attendanceData.find(
//         (record) => record.date === formattedDate
//       );

//       // Check if the current date is in the past or today
//       if (date <= today) {
//         // Check if the current date has a punch-in and punch-out record
//         if (
//           !attendanceRecord ||
//           !attendanceRecord.login ||
//           !attendanceRecord.logout
//         ) {
//           totalLeaves++; // Count days without login/logout as leave
//         }
//       }
//     });

//     return totalLeaves; // Return total leaves for the selected month
//   };

//   const calculateNotLoggedOut = () => {
//     const year = currentYear;
//     const month = currentPage;
//     const today = new Date();

//     return attendanceData.filter((record) => {
//       const recordDate = new Date(record.date);
//       return (
//         recordDate.getFullYear() === year &&
//         recordDate.getMonth() + 1 === month &&
//         record.login && // Employee has logged in
//         !record.logout && // No logout time
//         recordDate <= today // Date is not in the future
//       );
//     }).length;
//   };

//   const currentMonthName = new Date(2024, currentPage - 1).toLocaleString(
//     "default",
//     { month: "long" }
//   );

//   const getAllDaysInMonth = (year, month) => {
//     const days = [];
//     // Subtract 1 from the month to handle JavaScript's zero-based month index
//     let date = new Date(Date.UTC(year, month - 1, 1)); // month is now 0-indexed

//     // Loop through the days in the current month
//     while (date.getUTCMonth() === month - 1) {
//       days.push(new Date(date)); // Add the current day to the array
//       date.setUTCDate(date.getUTCDate() + 1); // Move to the next day
//     }

//     return days;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-danger">{error}</div>;
//   }

//   if (!employee) {
//     return <div>No employee found</div>;
//   }

//   // Helper function to get the last punch-out date

//   const monthNames = [
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
//   const getFilteredData = () => {
//     const year = currentYear; // Adjusted to use dynamic current year
//     const month = currentPage;

//     const allDays = getAllDaysInMonth(year, month);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // A set to keep track of the dates that have already been processed
//     const seenDates = new Set();

//     const completeData = allDays
//       .map((date) => {
//         const formattedDate = date.toISOString().split("T")[0];
//         const dayName = new Date(
//           formattedDate + "T00:00:00"
//         ).toLocaleDateString("en-US", { weekday: "long" });

//         // Prevent processing if the date has already been seen
//         if (seenDates.has(formattedDate)) return null;
//         seenDates.add(formattedDate);

//         const isSunday = dayName === "Sunday";

//         const attendanceRecord = attendanceData.find(
//           (record) => record.date === formattedDate
//         );

//         if (isSunday) {
//           return {
//             date: formattedDate,
//             day: dayName,
//             logIn: "-",
//             logOut: "-",
//             status: "Holiday",
//           };
//         }

//         if (attendanceRecord) {
//           const logInTime = attendanceRecord.login
//             ? new Date(`1970-01-01T${attendanceRecord.login}`)
//             : null;
//           const logOutTime = attendanceRecord.logout
//             ? new Date(`1970-01-01T${attendanceRecord.logout}`)
//             : null;

//           const hoursWorked =
//             logInTime && logOutTime
//               ? (logOutTime - logInTime) / (1000 * 60 * 60)
//               : 0;

//           let status = attendanceRecord.status || "Absent";

//           if (hoursWorked >= 4.5 && hoursWorked < 9) {
//             status = "Halfday";
//           } else if (hoursWorked >= 9) {
//             status = "Present";
//           }

//           return {
//             date: formattedDate,
//             day: dayName,
//             logIn: attendanceRecord.login || "",
//             logOut: attendanceRecord.logout || "",
//             status: status,
//           };
//         }

//         // For days before first login or today, mark as absent
//         if (date < today) {
//           return {
//             date: formattedDate,
//             day: dayName,
//             logIn: "",
//             logOut: "",
//             status: "Absent",
//           };
//         } else if (date.toDateString() === today.toDateString()) {
//           return {
//             date: formattedDate,
//             day: dayName,
//             logIn: "",
//             logOut: "",
//             status: "Absent",
//           };
//         } else {
//           return {
//             date: formattedDate,
//             day: dayName,
//             logIn: "-",
//             logOut: "-",
//             status: "-",
//           };
//         }
//       })
//       .filter((record) => record !== null); // Filter out null entries

//     return completeData;
//   };

//   const attendanceRecords = getFilteredData();

//   return (
//     <div className="main">
//       <ToastContainer />
//       <section className="ems-content">
//         <div className="container">
//           <div className="all-employee razor-emp-atd-container mt-5">
//             <div className="rzr-admin-emp-details-dashboard ">
//               <div className="rzr-hcm-profiledetails-row">
//                 <div className="rzr-hcm-profiledetails-col-lg-5">
//                   <div className="rzr-hcm-profiledetails-card rzr-hcm-profiledetails-profile-card">
//                     {/* <div className="rzr-hcm-profiledetails-profile-image">
//                       <img
//                         src={
//                           employee.user_Avatar ||
//                           "assets/images/default-avatar.jpg"
//                         }
//                         alt="Employee Profile"
//                         height="160px"
//                         className="rzr-hcm-profiledetails-profile-img rounded"
//                       />
//                     </div> */}
//                     <div className="rzr-hcm-profiledetails-profile-bio">
//                       <div className="rzr-hcm-profiledetails-profile-name-title">
//                         {employee.first_Name} {employee.last_Name}
//                         <span className="rzr-hcm-profiledetails-profile-designation">
//                           {employee.designation || "N/A"}
//                         </span>
//                       </div>
//                       <div className="rzr-hcm-profiledetails-profile-id-doj">
//                         <strong>Employee ID:</strong>
//                         {employee.employee_Id || "N/A"}
//                         &nbsp;
//                         <span>
//                           <strong>DOJ: </strong>
//                           {new Date(
//                             employee.date_of_Joining
//                           ).toLocaleDateString()}
//                         </span>
//                       </div>
//                       {userRole === "admin" ? (
//                         <Link
//                           to={`/dashboard/all-employees/${department}/${teamName}/${employee.employee_Id}`}
//                           className="edit-user"
//                         >
//                           Edit user
//                           <svg
//                             width={18}
//                             height={18}
//                             fill="#fff"
//                             className="ms-2"
//                             viewBox="0 0 24 24"
//                           >
//                             <path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path>
//                             <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path>
//                           </svg>
//                         </Link>
//                       ) : null}
//                     </div>
//                   </div>
//                   {userRole === "admin" || userRole === "super-admin" ? (
//                     <div className="unique-user-status-form-switch">
//                       <input
//                         className={`unique-user-status-input ${
//                           isActive
//                             ? "unique-user-status-active-switch"
//                             : "unique-user-status-inactive-switch"
//                         }`}
//                         checked={isActive}
//                         onChange={handleToggleChange} // Call updated function
//                         type="checkbox"
//                         role="switch"
//                         id="uniqueUserStatusSwitch"
//                       />
//                       <label
//                         className={`unique-user-status-label ${
//                           isActive
//                             ? "unique-user-status-active-label"
//                             : "unique-user-status-inactive-label"
//                         }`}
//                         htmlFor="uniqueUserStatusSwitch"
//                       >
//                         User Active Status: {isActive ? "Active" : "Inactive"}
//                       </label>
//                     </div>
//                   ) : null}
//                 </div>
//                 <div className="rzr-hcm-profiledetails-col-lg-7 "></div>
//               </div>
//               <div className="all-head mb-5">
//                 <h4 className="rzr-admin-emp-details-title">
//                   {currentMonthName} Attendance
//                 </h4>
//               </div>

//               <div className="razor-emp-atd-calendar-header ">
//                 {monthNames.map((month, index) => (
//                   <div
//                     key={index + 1}
//                     className={` razor-emp-atd-calendar-month ${
//                       currentPage === index + 1 ? "active" : ""
//                     }`}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {month}
//                   </div>
//                 ))}
//               </div>

//               <div className="rzr-admin-emp-details-cards-container row mt-4">
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateTotalShifts()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Total Shifts
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateTotalLates()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Total Lates
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateNotLoggedOut()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Not Logged Out
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateTotalLeaves()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Total Leaves
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateTotalCompletedDays()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Completed Shifts
//                     </div>
//                   </div>
//                 </div>
//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateRegularizations()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Regularizations
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateTotalHalfDays()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Half Days
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                   <div className="rzr-admin-emp-details-card-body">
//                     <span className="rzr-admin-emp-details-card-value">
//                       {calculateNotEvenHalfDays()}
//                     </span>
//                     <div className="rzr-admin-emp-details-card-title">
//                       Not Even Half Day
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
//                 <div className="rzr-admin-emp-details-card-body">
//                   <span className="rzr-admin-emp-details-card-value">
//                     {calculateTotalOvertime()}
//                   </span>
//                   <div className="rzr-admin-emp-details-card-title">
//                     Total Overtime
//                   </div>
//                 </div>
//               </div> */}
//               </div>
//               <div className="row mt-4">
//                 <div className="rzr-admin-emp-details-table-responsive">
//                   <table className="rzr-admin-emp-details-table text-center table table-striped table-bordered">
//                     <thead className="rzr-admin-emp-details-table-header">
//                       <tr>
//                         <th>Date</th>
//                         <th>Day</th>
//                         <th>Log In</th>
//                         <th>Log Out</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {attendanceRecords.map((record, index) => (
//                         <tr key={index}>
//                           <td>{record.date}</td>
//                           <td>{record.day}</td>
//                           <td>{record.logIn}</td>
//                           <td>{record.logOut}</td>
//                           <td>{record.status}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {userRole === "super-admin" ? (
//             <div className="container mt-5 razor-payroll-emp-container">
//               <p className="razor-payroll-emp-header">Payroll</p>

//               <div className="row col-lg-12 hcm-raz-salery-count align-items-center">
//                 <div className="col-lg-6">
//                   {/* <h3 className="d-inline-block me-3 razor-payroll-emp-header">
//                     PAID LEAVES
//                   </h3> */}
//                 </div>
//                 {/* <div className="col-lg-6 text-end">
//                   <PaidLeaveInput
//                     totalPaidLeaves={paidLeaves}
//                     handlePaidLeavesChange={handlePaidLeavesChange}
//                   />
//                 </div> */}
//               </div>
//               <div className="row mt-4">
//                 <div className="table-responsive">
//                   <table className="text-center table table-striped table-bordered table-hover razor-payroll-emp-table">
//                     <thead className="razor-payroll-emp-table-header">
//                       <tr>
//                         <th>Amount</th>
//                         <th>Deduction</th>
//                         <th>Leaves</th>
//                         <th>Half Days</th>
//                         <th>Not Even Half Days</th>
//                         <th>Final salary</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {getFilteredPayrollData().map((record, index) => (
//                         <tr key={index} className="razor-payroll-emp-table-row">
//                           <td>{record.amount}</td>
//                           <td>{record.deduction}</td>
//                           <td>{calculateTotalLeaves()}</td>
//                           <td> {calculateTotalHalfDays()}</td>
//                           <td>{calculateNotEvenHalfDays()}</td>
//                           <td>{record.finalsalary}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="row mt-4">
//                 <div className="col text-center">
//                   <button
//                     onClick={generatePDF}
//                     className="payroll-emo-down-btn"
//                     style={{ marginTop: "10px" }}
//                   >
//                     Download PDF
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AttendanceView;

import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import RequestModal from "../Admin/RequestModal";

const AttendanceView = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [punchTimeData, setPunchTimeData] = useState(null);
  const [targetCoordinates, setTargetCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(currentMonth);
  const [attendanceData, setAttendanceData] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  // New state variables
  const [userProfileData, setUserProfileData] = useState(null);
  const [shiftTimingDetails, setShiftTimingDetails] = useState(null);
  const [employmentTypeDetails, setEmploymentTypeDetails] = useState(null);
  const [leaveSystemDetails, setLeaveSystemDetails] = useState(null);
  const [monthlyPaidLeaves, setMonthlyPaidLeaves] = useState(0);
  const [totalPaidLeaves, setTotalPaidLeaves] = useState(0);
  const [deductionDetails, setDeductionDetails] = useState([]);
  const [attendancePolicies, setAttendancePolicies] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const { employeeId } = useParams();
  // Fetch all necessary data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        // Fetch User Profile Data
        const userProfileResponse = await axios.post(
          `https://apiv2.humanmaximizer.com/api/v1/user/getuser/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(userProfileResponse);
        if (userProfileResponse.data.success) {
          const userData = userProfileResponse.data.data;
          console.log("awishuishnui", userProfileResponse.data.data);
          setUserProfileData(userData);

          // Store data
          setPunchTimeData(userData); // assuming we use punchTimeData for user data

          // Set target coordinates
          setTargetCoordinates({
            latitude: userData.latitude,
            longitude: userData.longitude,
          });
        } else {
          throw new Error(
            userProfileResponse.data.message ||
              "Failed to fetch user profile data"
          );
        }

        // Fetch Approved Leaves
        const approvedLeavesResponse = await axios.get(
          `https://apiv2.humanmaximizer.com/api/v1/leave/employee/leaves?status=approved&employee_Id=${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // **Fixed Handling of Approved Leaves Response**
        let approvedLeavesData = [];
        if (Array.isArray(approvedLeavesResponse.data)) {
          approvedLeavesData = approvedLeavesResponse.data;
        } else if (
          approvedLeavesResponse.data.success &&
          Array.isArray(approvedLeavesResponse.data.leave)
        ) {
          approvedLeavesData = approvedLeavesResponse.data.leave;
        } else {
          throw new Error(
            approvedLeavesResponse.data.message ||
              "Failed to fetch approved leaves"
          );
        }

        setApprovedLeaves(approvedLeavesData);
        console.log("Fetched Approved Leaves:", approvedLeavesData);

        // Fetch Attendance Data
        const attendanceResponse = await axios.get(
          `https://apiv2.humanmaximizer.com/api/v1/employee/attendencev2?employee_Id=${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (attendanceResponse.data.success) {
          const uniqueData = attendanceResponse.data.data.reduce(
            (acc, current) => {
              const found = acc.find((item) => item.date === current.date);
              if (!found) acc.push(current);
              return acc;
            },
            []
          );

          setAttendanceData(uniqueData);
        } else {
          throw new Error(
            attendanceResponse.data.message || "Failed to fetch attendance data"
          );
        }

        // Fetch Company Settings
        const companySettingsResponse = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const [userShiftStartTime, userShiftEndTime] =
          userProfileResponse.data.data.shift_Timing
            .split(" - ")
            .map((time) => time.trim());
        if (companySettingsResponse.data.success) {
          const settingsData = companySettingsResponse.data.data;
          setCompanySettings(settingsData);

          // Fetch attendance policies
          const attendancePoliciesData = settingsData.attendancePolicies || {};
          setAttendancePolicies(attendancePoliciesData);
          // Find shift timing based on start and end times
          const shiftTiming = settingsData.shiftTimings.find(
            (st) =>
              st.startTime === userShiftStartTime &&
              st.endTime === userShiftEndTime
          );
          setShiftTimingDetails(shiftTiming);

          // Add a safety check to ensure shiftTiming is found
          if (!shiftTiming) {
            throw new Error(
              `Shift timing "${userProfileResponse.data.response.shift_Timing}" not found in company settings.`
            );
          }

          // Match employee_Type ID
          const employmentType = settingsData.employmentTypes.find(
            (et) => et.name === userProfileResponse.data.data.employee_Type
          );
          setEmploymentTypeDetails(employmentType);

          // Optional: Add safety check
          if (!employmentType) {
            throw new Error(
              `Employment type "${userProfileResponse.data.response.employee_Type}" not found in company settings.`
            );
          }

          // Now, get leaveSystemId from employmentType
          const leaveSystemId = employmentType.leaveSystemId;
          const leaveSystem = settingsData.leaveSystems.find(
            (ls) => ls.id === leaveSystemId
          );
          setLeaveSystemDetails(leaveSystem);

          const monthlyPaidLeavesValue = leaveSystem.monthlyPaidLeaves || 0;
          setMonthlyPaidLeaves(monthlyPaidLeavesValue);

          // Now calculate totalPaidLeaves
          // Get the date_Of_Creation from user profile
          const dateOfCreation = new Date(
            userProfileResponse.data.data.createdAt
          );

          const today = new Date();

          // Calculate months since dateOfCreation, starting from the next month
          let monthsSinceCreation =
            (today.getFullYear() - dateOfCreation.getFullYear()) * 12 +
            (today.getMonth() - dateOfCreation.getMonth()) -
            1;

          monthsSinceCreation = Math.max(0, monthsSinceCreation);

          const calculatedTotalPaidLeaves =
            userProfileResponse.data.data.no_of_Paid_Leave +
            monthsSinceCreation * monthlyPaidLeavesValue;

          setTotalPaidLeaves(calculatedTotalPaidLeaves);

          // Get deductions applicable to the employee
          const employeeDeductions = employmentType.deductions
            .map((deductionId) => {
              return settingsData.deductions.find(
                (deduction) => deduction.id === deductionId
              );
            })
            .filter((deduction) => deduction !== undefined);

          setDeductionDetails(employeeDeductions);
        } else {
          throw new Error(
            companySettingsResponse.data.message ||
              "Failed to fetch company settings"
          );
        }
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchData();
  }, []);

  // Function to handle paid leave changes (if needed in future)
  const handlePaidLeavesChange = (newLeaves) => {
    setTotalPaidLeaves(newLeaves);
  };

  // Function to generate PDF
  const generatePDF = () => {
    Swal.fire({
      title: "Are you sure you want to download the payroll PDF?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const doc = new jsPDF();

        // Company details
        const companyName = "Razor Infotech Pvt Ltd";
        const companyAddress = [
          "627, F/F, Westend Marg, Saidulajab",
          "Butterfly Park, Saiyad Ul Ajaib Extension,",
          "Sainik Farm, New Delhi, Delhi 110030",
        ];

        // Add logo - Ensure you have a base64 logo or an image URL
        const logoBase64 =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROF2tKIGVLV9_rdA9q36vsZ4YuWiDxnWZ93w&s"; // Replace with actual base64 image string

        // Insert logo at left (10, 10), width 50, height 30
        doc.addImage(logoBase64, "PNG", 10, 10, 50, 30);

        // Set font size for the address and position it to the extreme right
        doc.setFontSize(10);
        const pageWidth = doc.internal.pageSize.getWidth();

        // Align the address text to the right (set x position to pageWidth minus margin)
        companyAddress.forEach((line, index) => {
          doc.text(line, pageWidth - 10, 20 + index * 5, null, null, "right");
        });

        // Set font size for company name and center it
        doc.setFontSize(16);
        doc.text(
          companyName,
          pageWidth / 2, // Center company name
          20,
          null,
          null,
          "center"
        );

        // Get payroll data
        const payrollData = getFilteredPayrollData()[0];

        // Table content
        const tableColumn = ["Description", "Details"];
        const tableRows = [];

        // Add content to the table depending on the availability of data
        if (payrollData.amount === "Salary not available") {
          tableRows.push([
            "Amount",
            "Salary is not available for this period.",
          ]);
        } else {
          tableRows.push(["Amount", payrollData.amount]);
          tableRows.push(["Deduction", payrollData.deduction]);
          tableRows.push(["Leaves", payrollData.leaves]);
          tableRows.push(["Final Salary", payrollData.finalsalary]);
        }

        // Set table position and add to the document
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 50, // Starting position after the header
          theme: "grid", // Optional theme for better table structure
        });

        // Save the PDF
        doc.save("payroll.pdf");

        // Show success toast notification
        toast.success("PDF downloaded successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  // Function to handle page (month) change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle year change
  const handleYearChange = (year) => {
    setCurrentYear(year);
  };

  // Helper function to convert 12-hour time (AM/PM) to 24-hour Date object
  const convertTo24HourTime = (time) => {
    if (!time) return null; // Check if the time is valid
    const [timeString, modifier] = time.split(" ");
    let [hours, minutes, seconds] = timeString.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0; // Convert 12 AM to 00:00
    }

    return new Date(1970, 0, 1, hours, minutes, seconds || 0); // Return a Date object with the converted time
  };

  // Helper function to convert 12-hour time format to 24-hour time
  const convertTo24Hour = (time) => {
    if (!time) return null; // Check if the time is valid

    let [hour, modifier] = time.split(" ");
    let [hours, minutes, seconds] = hour.split(":");

    hours = parseInt(hours, 10);
    minutes = minutes || "00"; // Default to 00 if minutes are missing
    seconds = seconds || "00"; // Default to 00 if seconds are missing

    // Handle PM case and 12 PM
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    // Handle 12 AM as 00:00
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    // Return time in HH:MM:SS format (24-hour format)
    return `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  };

  // Function to calculate total shifts
  const calculateTotalShifts = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login &&
        record.logout // Only count records with both login and logout times
      );
    }).length;
  };

  // Function to calculate total lates
  const calculateTotalLates = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);

      if (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth
      ) {
        const shiftStartTime = shiftTimingDetails?.startTime; // Use shiftTimingDetails
        const gracePeriod = attendancePolicies?.gracePeriodMinutes || 15;

        const loginTime = record.login ? record.login : null;

        if (shiftStartTime && loginTime) {
          const shiftStart = new Date(
            `1970-01-01T${convertTo24Hour(shiftStartTime)}`
          );
          shiftStart.setMinutes(shiftStart.getMinutes() + gracePeriod);

          const loginDateTime = new Date(
            `1970-01-01T${convertTo24Hour(loginTime)}`
          );

          return loginDateTime > shiftStart;
        }
      }
      return false;
    }).length;
  };

  // Function to calculate completed shifts
  const calculateTotalCompletedDays = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    const completedDays = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);

      if (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login &&
        record.logout
      ) {
        const loginTime = new Date(
          `${record.date} ${convertTo24Hour(record.login)}`
        );
        const logoutTime = new Date(
          `${record.date} ${convertTo24Hour(record.logout)}`
        );

        const timeDiff = logoutTime - loginTime;
        const hoursWorked = timeDiff / (1000 * 60 * 60);

        // Dynamically use `fullDayHours` from attendance policies
        return hoursWorked >= (attendancePolicies?.fullDayHours || 9);
      }

      return false;
    });

    return completedDays.length;
  };

  // Function to calculate regularizations
  const calculateRegularizations = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    const regularizedDays = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);

      if (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login &&
        record.logout
      ) {
        const loginTime = new Date(
          `${record.date} ${convertTo24Hour(record.login)}`
        );
        const logoutTime = new Date(
          `${record.date} ${convertTo24Hour(record.logout)}`
        );

        const timeDiff = logoutTime - loginTime;
        const hoursWorked = timeDiff / (1000 * 60 * 60);

        const minHours =
          attendancePolicies?.regularizationCriteria?.minHours || 7;
        const maxHours =
          attendancePolicies?.regularizationCriteria?.maxHours || 9;

        return hoursWorked >= minHours && hoursWorked < maxHours;
      }

      return false;
    });

    return regularizedDays.length;
  };

  // Function to calculate total half days
  const calculateTotalHalfDays = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);

      if (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login &&
        record.logout
      ) {
        const logInTime = new Date(
          `1970-01-01T${convertTo24Hour(record.login)}`
        );
        const logOutTime = new Date(
          `1970-01-01T${convertTo24Hour(record.logout)}`
        );

        const hoursWorked = (logOutTime - logInTime) / (1000 * 60 * 60);

        // Dynamically use `halfDayHours` from attendance policies
        return (
          hoursWorked > (attendancePolicies?.minimumWorkingHours || 4.5) &&
          hoursWorked <= (attendancePolicies?.halfDayHours || 5)
        );
      }
      return false;
    }).length;
  };

  // Function to calculate not even half days
  const calculateNotEvenHalfDays = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    let count = 0; // Initialize count for "Not Even Half Day"
    attendanceData.forEach((record) => {
      const recordDate = new Date(record.date);

      // Check if the record is within the selected year and month
      if (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login &&
        record.logout
      ) {
        const loginDate = convertTo24HourTime(record.login);
        const logoutDate = convertTo24HourTime(record.logout);

        if (loginDate && logoutDate) {
          // Calculate the difference in seconds
          const timeDifferenceInSeconds = (logoutDate - loginDate) / 1000;

          // Consider "Not Even Half Day" if worked less than 4.5 hours (16200 seconds)
          if (timeDifferenceInSeconds < 16200) {
            count++; // Increment count
          }
        }
      }
    });

    return count; // Return the count of "Not Even Half Day"
  };

  // Function to calculate not logged out
  const calculateNotLoggedOut = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;
    const today = new Date();

    return attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login && // Employee has logged in
        !record.logout && // No logout time
        recordDate <= today // Date is not in the future
      );
    }).length;
  };

  // Function to calculate total overtime (if needed)
  const calculateTotalOvertime = () => {
    // Implement as needed
    return "0 hours";
  };

  // Function to get all days in a month
  const getAllDaysInMonth = (year, month) => {
    const days = [];
    // Subtract 1 from the month to handle JavaScript's zero-based month index
    let date = new Date(Date.UTC(year, month - 1, 1)); // month is now 0-indexed

    // Loop through the days in the current month
    while (date.getUTCMonth() === month - 1) {
      days.push(new Date(date)); // Add the current day to the array
      date.setUTCDate(date.getUTCDate() + 1); // Move to the next day
    }

    return days;
  };

  // Function to get payroll period dates
  const getPayrollPeriodDates = () => {
    if (!employmentTypeDetails || !companySettings || !userProfileData) {
      return { startDate: null, endDate: null, nextPayrollDate: null };
    }

    const payrollCycleId = employmentTypeDetails.payrollCycleId;

    const payrollCycle = companySettings.payrollCycles.find(
      (pc) => pc.id === payrollCycleId
    );

    if (!payrollCycle) {
      return { startDate: null, endDate: null, nextPayrollDate: null };
    }

    const processingDate = payrollCycle.processingDate; // e.g., 1

    const selectedYear = currentYear;
    const selectedMonth = currentPage; // currentPage represents the selected month (1-12)

    let startDate, endDate;

    if (processingDate === 1) {
      // Payroll period is from the 1st to the last day of the selected month
      startDate = new Date(selectedYear, selectedMonth - 1, 1);
      endDate = new Date(selectedYear, selectedMonth, 0); // Last day of selected month
    } else {
      // For other processing dates, adjust accordingly
      startDate = new Date(selectedYear, selectedMonth - 2, processingDate);
      endDate = new Date(selectedYear, selectedMonth - 1, processingDate - 1);
    }

    // Ensure startDate is not before date_Of_Creation
    const dateOfCreation = new Date(userProfileData.date_Of_Creation);
    if (startDate < dateOfCreation) {
      startDate = dateOfCreation;
    }

    // Ensure endDate is not in the future
    const currentDate = new Date();
    if (endDate > currentDate) {
      endDate = currentDate;
    }

    // Now calculate nextPayrollDate
    let nextPayrollDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      payrollCycle.processingDate
    );

    return { startDate, endDate, nextPayrollDate };
  };

  // Function to get total days in the selected month
  const getTotalDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // Month is 1-based here
  };

  // Function to calculate total leaves considering paid leaves
  const calculateTotalLeaves = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    // Get all days in the selected month
    const allDays = getAllDaysInMonth(selectedYear, selectedMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00 for accurate comparison

    // Initialize the total leave count
    let totalLeaves = 0;

    // Loop through each day of the selected month
    allDays.forEach((date) => {
      const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      // Check if the day is a working day according to leaveSystemDetails
      const isWorkingDay =
        leaveSystemDetails &&
        leaveSystemDetails.workingDays &&
        leaveSystemDetails.workingDays.includes(dayName);

      // Check if the day is a holiday
      const isHoliday =
        companySettings &&
        companySettings.holidays &&
        companySettings.holidays.some(
          (holiday) =>
            new Date(holiday.date).toISOString().split("T")[0] === formattedDate
        );

      // Skip non-working days and holidays
      if (!isWorkingDay || isHoliday) {
        return;
      }

      const attendanceRecord = attendanceData.find(
        (record) => record.date === formattedDate
      );

      // Check if the current date is in the past or today
      if (date <= today) {
        // Check if the current date has a punch-in and punch-out record
        if (
          !attendanceRecord ||
          !attendanceRecord.login ||
          !attendanceRecord.logout
        ) {
          totalLeaves++; // Count days without login/logout as leave
        }
      }
    });

    return totalLeaves; // Return total leaves for the selected month
  };

  // Helper function to get the first punch-in date
  const getFirstPunchInDate = () => {
    if (!attendanceData || attendanceData.length === 0) return null;

    // Sort the attendance data by date and find the first record with both login and logout
    const sortedAttendance = attendanceData
      .filter((record) => record.login && record.logout) // Only consider records with login and logout
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending

    // Return the earliest date with login and logout
    return sortedAttendance.length > 0
      ? new Date(sortedAttendance[0].date)
      : null;
  };

  // Function to calculate total working days
  const getTotalWorkingDays = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    const allDays = getAllDaysInMonth(selectedYear, selectedMonth);

    const workingDays = allDays.filter((date) => {
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      // Check if the day is a working day according to leaveSystemDetails
      const isWorkingDay =
        leaveSystemDetails &&
        leaveSystemDetails.workingDays &&
        leaveSystemDetails.workingDays.includes(dayName);

      // Check if the day is a holiday
      const isHoliday =
        companySettings &&
        companySettings.holidays &&
        companySettings.holidays.some(
          (holiday) =>
            new Date(holiday.date).toISOString().split("T")[0] ===
            date.toISOString().split("T")[0]
        );

      return isWorkingDay && !isHoliday;
    });

    return workingDays.length;
  };

  // Function to calculate total days worked
  const calculateTotalDaysWorked = () => {
    const completedDays = calculateTotalCompletedDays(); // days where hoursWorked >=9
    const halfDays = calculateTotalHalfDays(); // half days
    const regularizations = calculateRegularizations(); // days where hoursWorked >=7 and <9

    const totalDaysWorked =
      completedDays +
      regularizations + // Assuming regularizations count as full day
      halfDays * 0.5;

    return totalDaysWorked;
  };

  // Function to calculate final salary considering paid leaves
  const calculateFinalSalary = (baseSalary) => {
    const totalDaysInMonth = getTotalDaysInMonth(currentYear, currentPage);
    const dailyRate = baseSalary / totalDaysInMonth;

    const totalLeaves = calculateTotalLeaves(); // Total absent days excluding approved leaves
    const notEvenHalfDays = calculateNotEvenHalfDays(); // Total "Not Even Half Days"

    // Total unpaid leaves include both absent days and "Not Even Half Days"
    const totalUnpaidLeaves = totalLeaves + notEvenHalfDays;

    // Filter out leaves that are paid
    // Assuming approvedLeaves have a field 'is_Paid' indicating if the leave is paid
    const paidLeavesUsed = approvedLeaves
      .filter((leave) => {
        const leaveStartDate = new Date(leave.leave_From);
        const leaveEndDate = new Date(leave.leave_To);
        const leaveMonth = leaveStartDate.getMonth() + 1;
        const leaveYear = leaveStartDate.getFullYear();
        return (
          leaveYear === currentYear &&
          leaveMonth === currentPage &&
          leave.is_Paid === true
        );
      })
      .reduce((acc, leave) => acc + leave.no_Of_Days, 0);

    // Remaining unpaid leaves after considering paid leaves
    const unpaidLeaves = Math.max(totalUnpaidLeaves - paidLeavesUsed, 0);

    // Calculate leaves deduction
    const leavesDeduction = unpaidLeaves * dailyRate;

    // Calculate gross salary after leaves deduction
    const grossSalary = baseSalary - leavesDeduction;

    // Calculate deductions from base salary (e.g., PF, Tax)
    let totalDeductionsAmount = 0;
    const deductionsBreakdown = [];

    deductionDetails.forEach((deduction) => {
      const amount = (deduction.percentage / 100) * baseSalary; // Use baseSalary for fixed deductions
      totalDeductionsAmount += amount;
      deductionsBreakdown.push({
        name: deduction.name,
        percentage: `${deduction.percentage}%`,
        amount: amount,
      });
    });

    // Include leaves deduction in the total deductions
    totalDeductionsAmount += leavesDeduction;
    deductionsBreakdown.push({
      name: "Leaves Deduction",
      percentage: "-",
      amount: leavesDeduction,
    });

    // **Ensure final salary does not go negative**
    const finalSalaryAmount = Math.max(0, grossSalary - totalDeductionsAmount);

    return {
      finalSalary: `₹ ${finalSalaryAmount.toFixed(2)}`,
      deduction: `₹ ${totalDeductionsAmount.toFixed(2)}`,
      leaves: totalUnpaidLeaves, // Total unpaid leaves including "Not Even Half Days"
      unpaidLeaves: unpaidLeaves,
      remainingPaidLeaves: Math.max(totalPaidLeaves - paidLeavesUsed, 0),
      deductionsBreakdown: deductionsBreakdown,
    };
  };

  // Function to get all payroll data
  const getFilteredPayrollData = () => {
    const baseSalary = punchTimeData?.salary || 0;

    // Filter records to ensure only those from the selected month and with both login and logout are considered
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    const attendanceRecords = attendanceData.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getFullYear() === selectedYear &&
        recordDate.getMonth() + 1 === selectedMonth &&
        record.login !== null &&
        record.logout !== null
      );
    });

    if (!baseSalary || attendanceRecords.length === 0) {
      return [
        {
          amount: "Salary not available",
          deduction: "-",
          leaves: "-",
          finalsalary: "-",
          deductionsBreakdown: [],
          remainingPaidLeaves: "-",
        },
      ];
    }

    const {
      finalSalary,
      deduction,
      leaves,
      unpaidLeaves,
      remainingPaidLeaves,
      deductionsBreakdown,
    } = calculateFinalSalary(baseSalary);

    return [
      {
        amount: `₹ ${baseSalary.toFixed(2)}`,
        deduction,
        leaves: leaves,
        finalsalary: finalSalary,
        remainingPaidLeaves: remainingPaidLeaves,
        deductionsBreakdown: deductionsBreakdown,
      },
    ];
  };

  // If there's an error, display it
  if (error) {
    return (
      <div className="main">
        <section className="ems-content">
          <div className="container">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Display loading state if company settings or punch time data is not yet loaded
  if (!companySettings || !punchTimeData || !userProfileData) {
    return (
      <div className="main">
        <section className="ems-content">
          <div className="container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Function to get filtered attendance data considering holidays and off days
  const getFilteredData = () => {
    const selectedYear = currentYear;
    const selectedMonth = currentPage;

    const allDays = getAllDaysInMonth(selectedYear, selectedMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00 for accurate comparison

    // Create a Set of approved leave dates for quick lookup
    const approvedLeaveDates = new Set(
      approvedLeaves
        .map((leave) => {
          // Assuming leave.leave_From and leave.leave_To are ISO date strings
          const fromDate = new Date(leave.leave_From);
          const toDate = new Date(leave.leave_To);
          const dates = [];

          for (
            let d = new Date(fromDate);
            d <= toDate;
            d.setDate(d.getDate() + 1)
          ) {
            dates.push(d.toISOString().split("T")[0]);
          }

          return dates;
        })
        .flat()
    );

    // A set to keep track of the dates that have already been processed
    const seenDates = new Set();

    const completeData = allDays
      .map((date) => {
        const formattedDate = date.toISOString().split("T")[0];
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        // Prevent processing if the date has already been seen
        if (seenDates.has(formattedDate)) return null;
        seenDates.add(formattedDate);

        // Check if the day is a working day according to leaveSystemDetails
        const isWorkingDay =
          leaveSystemDetails &&
          leaveSystemDetails.workingDays &&
          leaveSystemDetails.workingDays.includes(dayName);

        // Check if the day is a holiday
        const isHoliday =
          companySettings &&
          companySettings.holidays &&
          companySettings.holidays.some(
            (holiday) =>
              new Date(holiday.date).toISOString().split("T")[0] ===
              formattedDate
          );

        // Check if the date is an approved leave
        const isApprovedLeave = approvedLeaveDates.has(formattedDate);

        // If it's an approved leave, mark as Holiday
        if (isApprovedLeave) {
          return {
            date: formattedDate,
            day: dayName,
            logIn: "-",
            logOut: "-",
            status: "Holiday",
          };
        }

        // If it's not a working day or it's a holiday, mark as Holiday
        if (!isWorkingDay || isHoliday) {
          return {
            date: formattedDate,
            day: dayName,
            logIn: "-",
            logOut: "-",
            status: "Holiday",
          };
        }

        const attendanceRecord = attendanceData.find(
          (record) => record.date === formattedDate
        );

        if (attendanceRecord) {
          const logInTime = attendanceRecord.login
            ? new Date(`1970-01-01T${attendanceRecord.login}`)
            : null;
          const logOutTime = attendanceRecord.logout
            ? new Date(`1970-01-01T${attendanceRecord.logout}`)
            : null;

          const hoursWorked =
            logInTime && logOutTime
              ? (logOutTime - logInTime) / (1000 * 60 * 60)
              : 0;

          let status = attendanceRecord.status || "Absent";

          if (hoursWorked > 4.5 && hoursWorked < 9) {
            status = "Halfday";
          } else if (hoursWorked >= 9) {
            status = "Present";
          } else if (hoursWorked > 0 && hoursWorked <= 4.5) {
            status = "Not Even Half Day";
          }

          return {
            date: formattedDate,
            day: dayName,
            logIn: attendanceRecord.login || "",
            logOut: attendanceRecord.logout || "",
            status: status,
          };
        }

        // For days before today, mark as absent
        if (date < today) {
          return {
            date: formattedDate,
            day: dayName,
            logIn: "",
            logOut: "",
            status: "Absent",
          };
        } else if (date.toDateString() === today.toDateString()) {
          return {
            date: formattedDate,
            day: dayName,
            logIn: "",
            logOut: "",
            status: "Absent",
          };
        } else {
          return {
            date: formattedDate,
            day: dayName,
            logIn: "-",
            logOut: "-",
            status: "-",
          };
        }
      })
      .filter((record) => record !== null); // Filter out null entries

    return completeData;
  };

  const attendanceRecords = getFilteredData();

  const currentMonthName = new Date(
    currentYear,
    currentPage - 1
  ).toLocaleString("default", { month: "long" });

  const monthNames = [
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

  const dateOfJoining = new Date(userProfileData.date_of_Joining);

  return (
    <div className="main">
      <ToastContainer />
      <section className="ems-content hm-my-attendence-prf p-5">
        <div className="container">
          <div className="all-employee razor-emp-atd-container">
            <div className="all-head mb-5">
              <h4>{currentMonthName} Attendance</h4>
            </div>
            {/* Year Selector */}
            <div className="year-selector mb-4">
              <button
                onClick={() => handleYearChange(currentYear - 1)}
                disabled={currentYear <= dateOfJoining.getFullYear()}
                className="btn btn-primary me-2"
              >
                Previous Year
              </button>
              <span>{currentYear}</span>
              <button
                onClick={() => handleYearChange(currentYear + 1)}
                className="btn btn-primary ms-2"
              >
                Next Year
              </button>
            </div>
            {/* Calendar Header for Months */}
            <div className="razor-emp-atd-calendar-header ">
              {monthNames.map((month, index) => (
                <div
                  key={index + 1}
                  className={`razor-emp-atd-calendar-month ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                    color: currentPage === index + 1 ? "#fff" : "#000",
                    marginRight: "5px",
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
            <div className="rzr-admin-emp-details-cards-container row mt-4">
              {/* Total Shifts */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateTotalShifts()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Total Shifts
                  </div>
                </div>
              </div>
              {/* Total Paid Leaves */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {totalPaidLeaves}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Total Paid Leaves
                  </div>
                </div>
              </div>
              {/* Total Lates */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateTotalLates()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Total Lates
                  </div>
                </div>
              </div>
              {/* Not Logged Out */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateNotLoggedOut()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Not Logged Out
                  </div>
                </div>
              </div>

              {/* Total Leaves */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateTotalLeaves()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Total Leaves
                  </div>
                </div>
              </div>
              {/* Completed Shifts */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateTotalCompletedDays()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Completed Shifts
                  </div>
                </div>
              </div>
              {/* Regularizations */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateRegularizations()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Regularizations
                  </div>
                </div>
              </div>

              {/* Half Days */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateTotalHalfDays()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Half Days
                  </div>
                </div>
              </div>

              {/* Not Even Half Day */}
              <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="rzr-admin-emp-details-card-body">
                  <span className="rzr-admin-emp-details-card-value">
                    {calculateNotEvenHalfDays()}
                  </span>
                  <div className="rzr-admin-emp-details-card-title">
                    Not Even Half Day
                  </div>
                </div>
              </div>
              {/* Uncomment if you want to display Overtime */}
              {/*
                <div className="rzr-admin-emp-details-card col-lg-3 col-md-4 col-sm-6 mb-4">
                  <div className="rzr-admin-emp-details-card-body">
                    <span className="rzr-admin-emp-details-card-value">
                      {calculateTotalOvertime()}
                    </span>
                    <div className="rzr-admin-emp-details-card-title">
                      Total Overtime
                    </div>
                  </div>
                </div>
                */}
            </div>
            <div className="row mt-4">
              <div className="rzr-admin-emp-details-table-responsive">
                <table className="rzr-admin-emp-details-table text-center table table-striped table-bordered">
                  <thead className="rzr-admin-emp-details-table-header">
                    <tr>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Log In</th>
                      <th>Log Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.day}</td>
                        <td>{record.logIn}</td>
                        <td>{record.logOut}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payroll Section */}
          <div className="container mt-5 razor-payroll-emp-container">
            <p className="razor-payroll-emp-header">Payroll</p>
            <div className="row col-lg-12 hcm-raz-salery-count align-items-center">
              <div className="col-lg-6">
                {/* Placeholder for future components or headers */}
              </div>
            </div>

            <div className="row mt-4">
              <div className="table-responsive">
                <table className="text-center table table-striped table-bordered table-hover razor-payroll-emp-table">
                  <thead className="razor-payroll-emp-table-header">
                    <tr>
                      <th>Amount</th>
                      <th>Deduction</th>
                      <th>Leaves</th>
                      <th>Half Days</th>
                      <th>Not Even Half Days</th>
                      <th>Total Shifts</th>
                      <th>Remaining Paid Leaves</th>
                      <th>Completed Shifts</th>
                      <th>Not Logged Out</th>
                      <th>Total Lates</th>
                      <th>Regularizations</th>
                      <th>Final Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredPayrollData().map((record, index) => (
                      <tr key={index} className="razor-payroll-emp-table-row">
                        <td>{record.amount}</td>
                        <td>{record.deduction}</td>
                        <td>{record.leaves}</td>
                        <td>{calculateTotalHalfDays()}</td>
                        <td>{calculateNotEvenHalfDays()}</td>
                        <td>{calculateTotalShifts()}</td>
                        <td>{record.remainingPaidLeaves}</td>
                        <td>{calculateTotalCompletedDays()}</td>
                        <td>{calculateNotLoggedOut()}</td>
                        <td>{calculateTotalLates()}</td>
                        <td>{calculateRegularizations()}</td>
                        <td>{record.finalsalary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions Table */}
            {getFilteredPayrollData()[0]?.deductionsBreakdown?.length > 0 && (
              <div className="container mt-5">
                <h4>Deductions</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Deduction Name</th>
                      <th>Percentage (%)</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredPayrollData()[0].deductionsBreakdown.map(
                      (deduction, index) => (
                        <tr key={index}>
                          <td>{deduction.name}</td>
                          <td>{deduction.percentage}</td>
                          <td>₹ {deduction.amount.toFixed(2)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Shift Timings */}
            <div className="container mt-5">
              <h4>Shift Timings</h4>
              {shiftTimingDetails ? (
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Shift Name</th>
                      <td>{shiftTimingDetails.name}</td>
                    </tr>
                    <tr>
                      <th>Start Time</th>
                      <td>{shiftTimingDetails.startTime}</td>
                    </tr>
                    <tr>
                      <th>End Time</th>
                      <td>{shiftTimingDetails.endTime}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No shift timing details available.</p>
              )}
            </div>

            {/* Next Payroll Date */}
            <div className="container mt-5">
              <h4>Next Payroll Date</h4>
              {(() => {
                const { nextPayrollDate } = getPayrollPeriodDates();
                const formattedNextPayrollDate = nextPayrollDate
                  ? nextPayrollDate.toDateString()
                  : "Not available";
                return <p>Next Payroll Date: {formattedNextPayrollDate}</p>;
              })()}
            </div>

            <div className="row mt-4">
              <div className="col text-center">
                <button
                  onClick={generatePDF}
                  className="payroll-emo-down-btn btn btn-success"
                  style={{ marginTop: "10px" }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsRequestModalOpen(true)}
        >
          Request Hike/Advance/Reimbursement
        </button>
      </section>
    </div>
  );
};

export default AttendanceView;
