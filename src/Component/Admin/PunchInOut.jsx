// // src/components/PunchInOut.js

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// const PunchInOut = ({ permissions }) => {
//   const [coordinates, setCoordinates] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   const [targetCoordinates, setTargetCoordinates] = useState(null);
//   const [error, setError] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [canPunchIn, setCanPunchIn] = useState(false);
//   const [punchedIn, setPunchedIn] = useState(
//     sessionStorage.getItem("punchedIn") === "true"
//   );
//   const [startDate, setStartDate] = useState("");
//   const [locationFetched, setLocationFetched] = useState(false);
//   const [canPunchOut, setCanPunchOut] = useState(
//     sessionStorage.getItem("canPunchOut") === "true"
//   );
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [endDate, setEndDate] = useState("");

//   const userRole = useSelector((state) => state.auth.userRole);
//   const userName = useSelector((state) => state.auth.userName);
//   const empId = useSelector((state) => state.auth.employeeId);

//   //   const permissions = useSelector((state) => state.sidebar.permissions); // Assuming permissions are stored in sidebar state

//   useEffect(() => {
//     console.log("Permissions:", permissions);
//   }, [permissions]);

//   useEffect(() => {
//     console.log(
//       "canPunchIn:",
//       canPunchIn,
//       "punchedIn:",
//       punchedIn,
//       "canPunchOut:",
//       canPunchOut
//     );
//   }, [canPunchIn, punchedIn, canPunchOut]);

//   // Fetch Target Coordinates and Attendance Data
//   useEffect(() => {
//     const fetchTargetCoordinates = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");

//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/employee/punchtime",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           const data = response.data.data;
//           setTargetCoordinates({
//             latitude: data.latitude,
//             longitude: data.longitude,
//             shift_Timing: data.shift_Timing,
//             salary: data.salary,
//           });
//         } else {
//           throw new Error(
//             response.data.message || "Failed to fetch coordinates"
//           );
//         }
//       } catch (error) {
//         setError(`Coordinates Error: ${error.message}`);
//       }
//     };

//     const fetchAttendanceData = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/employee/attendence",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           const today = new Date().toISOString().split("T")[0];
//           const todayAttendance = response.data.data.find(
//             (item) => item.date === today
//           );

//           if (todayAttendance) {
//             setStartDate(todayAttendance.login || "No login today");
//             setEndDate(todayAttendance.logout || "Not yet checked out");
//           } else {
//             setStartDate("No login today");
//             setEndDate("Not yet checked out");
//           }
//           setAttendanceData(response.data.data);
//         } else {
//           throw new Error(
//             response.data.message || "Failed to fetch attendance data"
//           );
//         }
//       } catch (error) {
//         setError(`Attendance Error: ${error.message}`);
//       }
//     };

//     fetchAttendanceData();
//     fetchTargetCoordinates();
//   }, []);

//   // Geolocation for Punch In/Out
//   useEffect(() => {
//     if (userRole !== "employee" && userRole !== "manager") return;
//     if (punchedIn || locationFetched) return;

//     const isMobileOrLaptop =
//       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//       );

//     const isDesktop = /Macintosh|Windows NT/i.test(navigator.userAgent);
//     const locationDenied = localStorage.getItem("locationDenied");

//     if (isMobileOrLaptop && !locationFetched) {
//       if (navigator.geolocation && locationDenied !== "true") {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             localStorage.removeItem("locationDenied");
//             const userCoordinates = {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             };
//             setCoordinates(userCoordinates);
//             setLocationFetched(true);

//             if (targetCoordinates) {
//               const calculatedDistance = calculateDistance(
//                 userCoordinates,
//                 targetCoordinates
//               );
//               setDistance(calculatedDistance);
//               setCanPunchIn(calculatedDistance <= 50);
//             }
//           },
//           (err) => {
//             if (err.code === err.PERMISSION_DENIED) {
//               localStorage.setItem("locationDenied", "true");
//               Swal.fire(
//                 "Location Access Required",
//                 "Please enable location services to use this feature.",
//                 "warning"
//               );
//             } else {
//               setError(`Geolocation Error: ${err.message}`);
//             }
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0,
//           }
//         );
//       } else if (locationDenied === "true") {
//         Swal.fire(
//           "Location Access Denied",
//           "Please enable location access to use this feature.",
//           "info"
//         );
//         localStorage.removeItem("locationDenied");
//       } else {
//         setError("Geolocation is not supported by this browser.");
//       }
//     } else if (isDesktop) {
//       setCanPunchIn(true);
//     }
//   }, [userRole, targetCoordinates, locationFetched, punchedIn]);

//   // Calculate Distance using Haversine Formula
//   const calculateDistance = (coords1, coords2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const R = 6371e3; // Earth radius in meters

//     const lat1 = toRad(coords1.latitude);
//     const lat2 = toRad(coords2.latitude);
//     const dLat = lat2 - lat1;
//     const dLon = toRad(coords2.longitude - coords1.longitude);

//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in meters
//   };

//   // Handle Punch In
//   const handlePunchIn = async () => {
//     if (!canPunchIn) return;

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You can only log in once for today.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Punch In!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const now = new Date();
//         const date = now.toISOString().split("T")[0];
//         const day = now.toLocaleDateString("en-us", { weekday: "long" });
//         const loginTime = now.toLocaleTimeString();

//         const accessToken = localStorage.getItem("accessToken");

//         const response = await axios.post(
//           "https://apiv2.humanmaximizer.com/api/v1/employee/attendence/punchin",
//           { date, day, login: loginTime, status: "Present" },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           setPunchedIn(true);
//           setCanPunchIn(false);
//           setCanPunchOut(true);
//           sessionStorage.setItem("punchedIn", "true");
//           sessionStorage.setItem("canPunchOut", "true");

//           // Update attendance data
//           setStartDate(loginTime);
//           setEndDate("Not yet checked out");
//         } else {
//           throw new Error(response.data.message || "Failed to punch in");
//         }
//       } catch (error) {
//         setError("Already logged in for today");
//         Swal.fire("Error", error.message || "Failed to punch in", "error");
//       }
//     }
//   };

//   // Handle Punch Out
//   const handlePunchOut = async () => {
//     if (!canPunchOut) return;

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You can only log out once for today.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Punch Out!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const now = new Date();
//         const date = now.toISOString().split("T")[0];
//         const day = now.toLocaleDateString("en-us", { weekday: "long" });
//         const logoutTime = now.toLocaleTimeString();

//         const accessToken = localStorage.getItem("accessToken");

//         const latestAttendance = attendanceData.find(
//           (record) => record.date === date
//         );

//         if (!latestAttendance) {
//           throw new Error("No punch-in record found for today.");
//         }

//         const response = await axios.post(
//           "https://apiv2.humanmaximizer.com/api/v1/employee/attendence/punchout",
//           { date, day, logout: logoutTime, status: "Present" },
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.data.success) {
//           setPunchedIn(false);
//           setCanPunchIn(false);
//           setCanPunchOut(false);
//           sessionStorage.setItem("punchedIn", "false");
//           sessionStorage.setItem("canPunchOut", "false");

//           // Update attendance data
//           setEndDate(logoutTime);

//           // Reset punch in after 6 hours
//           setTimeout(() => {
//             setCanPunchIn(true);
//             setCanPunchOut(false);
//             sessionStorage.removeItem("punchedIn");
//             sessionStorage.removeItem("canPunchOut");
//           }, 6 * 60 * 60 * 1000);
//         } else {
//           throw new Error(response.data.message || "Failed to punch out");
//         }
//       } catch (error) {
//         setError(error.message);
//         Swal.fire("Error", error.message || "Failed to punch out", "error");
//       }
//     }
//   };

//   // Determine if the user is allowed to punch in based on permissions (optional)
//   const isAllowedToPunch = () => {
//     // Example: Check if the user has a specific permission
//     return permissions.includes("punchAccess"); // Replace with actual permission
//   };

//   // Render the Punch In/Punch Out UI
//   if (userRole !== "employee" && userRole !== "manager") {
//     return null; // Don't render for other roles
//   }

//   return (
//     <div className="rzr-emp-time-container">
//       <div className="rzr-emp-time-profile">
//         <div className="rzr-emp-time-details">
//           <h2 className="rzr-emp-time-name">{userName}</h2>
//           <p className="rzr-emp-time-id">{empId}</p>
//         </div>
//       </div>
//       <div className="rzr-emp-time-status">
//         <div className="rzr-emp-time-time">
//           <p className="mb-0">Check In: {startDate || "Fetching..."}</p>
//           <p className="mt-0">Check Out: {endDate || "Fetching..."}</p>
//         </div>

//         <div className="rzr-emp-time-buttons">
//           <button
//             onClick={handlePunchIn}
//             className="punch-button rzr-emp-punch-in mt-2 mb-3"
//             // disabled={!canPunchIn || punchedIn || !isAllowedToPunch()}
//           >
//             Punch In
//           </button>
//           <button
//             onClick={handlePunchOut}
//             className="punch-button rzr-emp-punch-out mt-2 mb-3"
//             // disabled={!canPunchOut}
//             // disabled={!canPunchOut || !isAllowedToPunch()}
//           >
//             Punch Out
//           </button>
//         </div>
//         {!canPunchIn && !punchedIn && (
//           <p className="too-far-message">You are too far away to punch in</p>
//         )}
//         <div className="rzr-emp-time-error-distance">
//           {error ? (
//             <p className="error-message">Error: {error}</p>
//           ) : (
//             <div>
//               {distance !== null && (
//                 <p>Distance from target: {distance.toFixed(2)} meters</p>
//               )}
//               {distance > 50 && (
//                 <p style={{ color: "red" }}>
//                   You are {distance.toFixed(2)} meters away from the punch-in
//                   location.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PunchInOut;

// src/Component/Admin/PunchInOut.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
// import PropTypes from "prop-types"; // Optional: for prop type validation

const PunchInOut = ({ permissions = [] }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [targetCoordinates, setTargetCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [canPunchIn, setCanPunchIn] = useState(false);
  const [punchedIn, setPunchedIn] = useState(
    sessionStorage.getItem("punchedIn") === "true"
  );
  const [startDate, setStartDate] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);
  const [canPunchOut, setCanPunchOut] = useState(
    sessionStorage.getItem("canPunchOut") === "true"
  );
  const [attendanceData, setAttendanceData] = useState([]);
  const [endDate, setEndDate] = useState("");

  const userRole = useSelector((state) => state.auth.userRole);
  const userName = useSelector((state) => state.auth.userName);
  const empId = useSelector((state) => state.auth.employeeId);
  console.log("userRole", userRole);

  // Debugging: Log permissions
  useEffect(() => {
    console.log("PunchInOut Permissions:", permissions);
  }, [permissions]);

  // Fetch Target Coordinates
  const fetchTargetCoordinates = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/employee/punchtime",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const data = response.data.data;
        setTargetCoordinates({
          latitude: data.latitude,
          longitude: data.longitude,
          shift_Timing: data.shift_Timing,
          salary: data.salary,
        });
        console.log("Fetched target coordinates:", data);
      } else {
        throw new Error(response.data.message || "Failed to fetch coordinates");
      }
    } catch (error) {
      setError(`Coordinates Error: ${error.message}`);
      console.error("Coordinates Error:", error.message);
    }
  }, []);

  // Fetch Attendance Data
  const fetchAttendanceData = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/employee/attendence",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const today = new Date().toISOString().split("T")[0];
        const todayAttendance = response.data.data.find(
          (item) => item.date === today
        );

        if (todayAttendance) {
          setStartDate(todayAttendance.login || "No login today");
          setEndDate(todayAttendance.logout || "Not yet checked out");
        } else {
          setStartDate("No login today");
          setEndDate("Not yet checked out");
        }
        setAttendanceData(response.data.data);
        console.log("Fetched attendance data:", response.data.data);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch attendance data"
        );
      }
    } catch (error) {
      setError(`Attendance Error: ${error.message}`);
      console.error("Attendance Error:", error.message);
    }
  }, []);

  // Initial Data Fetch
  useEffect(() => {
    fetchAttendanceData();
    fetchTargetCoordinates();
  }, [fetchAttendanceData, fetchTargetCoordinates]);

  // Geolocation for Punch In/Out
  useEffect(() => {
    if (userRole !== "employee" && userRole !== "manager") return;
    if (punchedIn || locationFetched) return;

    const isMobileOrLaptop =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const isDesktop = /Macintosh|Windows NT/i.test(navigator.userAgent);
    const locationDenied = localStorage.getItem("locationDenied");

    if (isMobileOrLaptop && !locationFetched) {
      if (navigator.geolocation && locationDenied !== "true") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            localStorage.removeItem("locationDenied");
            const userCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCoordinates(userCoordinates);
            setLocationFetched(true);

            if (targetCoordinates) {
              const calculatedDistance = calculateDistance(
                userCoordinates,
                targetCoordinates
              );
              setDistance(calculatedDistance);
              setCanPunchIn(calculatedDistance <= 50);
              console.log("Calculated distance:", calculatedDistance);
            }
          },
          (err) => {
            console.error("Geolocation error:", err);
            if (err.code === err.PERMISSION_DENIED) {
              localStorage.setItem("locationDenied", "true");
              Swal.fire(
                "Location Access Required",
                "Please enable location services to use this feature.",
                "warning"
              );
            } else {
              setError(`Geolocation Error: ${err.message}`);
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else if (locationDenied === "true") {
        Swal.fire(
          "Location Access Denied",
          "Please enable location access to use this feature.",
          "info"
        );
        localStorage.removeItem("locationDenied");
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    } else if (isDesktop) {
      setCanPunchIn(true);
    }
  }, [userRole, targetCoordinates, locationFetched, punchedIn]);

  // Calculate Distance using Haversine Formula
  const calculateDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const dLat = lat2 - lat1;
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  // Handle Punch In
  const handlePunchIn = async () => {
    if (!canPunchIn) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You can only log in once for today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Punch In!",
    });

    if (result.isConfirmed) {
      try {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        const day = now.toLocaleDateString("en-us", { weekday: "long" });
        const loginTime = now.toLocaleTimeString();

        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/employee/attendence/punchin",
          { date, day, login: loginTime, status: "Present" },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setPunchedIn(true);
          setCanPunchIn(false);
          setCanPunchOut(true);
          sessionStorage.setItem("punchedIn", "true");
          sessionStorage.setItem("canPunchOut", "true");

          // Update attendance data by re-fetching
          await fetchAttendanceData();

          // Update startDate and endDate
          setStartDate(loginTime);
          setEndDate("Not yet checked out");
          console.log("Punched In at:", loginTime);
        } else {
          throw new Error(response.data.message || "Failed to punch in");
        }
      } catch (error) {
        setError("Already logged in for today");
        Swal.fire("Error", error.message || "Failed to punch in", "error");
        console.error("Punch In Error:", error.message);
      }
    }
  };

  // Handle Punch Out
  const handlePunchOut = async () => {
    if (!canPunchOut) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You can only log out once for today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Punch Out!",
    });

    if (result.isConfirmed) {
      try {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        const day = now.toLocaleDateString("en-us", { weekday: "long" });
        const logoutTime = now.toLocaleTimeString();

        const accessToken = localStorage.getItem("accessToken");

        const latestAttendance = attendanceData.find(
          (record) => record.date === date
        );

        if (!latestAttendance) {
          throw new Error("No punch-in record found for today.");
        }

        const response = await axios.post(
          "https://apiv2.humanmaximizer.com/api/v1/employee/attendence/punchout",
          { date, day, logout: logoutTime, status: "Present" },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setPunchedIn(false);
          setCanPunchIn(false);
          setCanPunchOut(false);
          sessionStorage.setItem("punchedIn", "false");
          sessionStorage.setItem("canPunchOut", "false");

          // Update attendance data by re-fetching
          await fetchAttendanceData();

          // Update endDate
          setEndDate(logoutTime);
          console.log("Punched Out at:", logoutTime);

          // Reset punch in after 6 hours
          setTimeout(() => {
            setCanPunchIn(true);
            setCanPunchOut(false);
            sessionStorage.removeItem("punchedIn");
            sessionStorage.removeItem("canPunchOut");
            console.log("Punch In reset after 6 hours");
          }, 6 * 60 * 60 * 1000);
        } else {
          throw new Error(response.data.message || "Failed to punch out");
        }
      } catch (error) {
        setError(error.message);
        Swal.fire("Error", error.message || "Failed to punch out", "error");
        console.error("Punch Out Error:", error.message);
      }
    }
  };

  // Determine if the user is allowed to punch in based on permissions
  // const isAllowedToPunch = () => {
  //   // Example: Check if the user has a specific permission
  //   return permissions.includes("actionTracker"); // Replace with actual permission
  // };

  // Debugging: Log state variables
  useEffect(() => {
    console.log(
      `canPunchIn: ${canPunchIn}, punchedIn: ${punchedIn}, canPunchOut: ${canPunchOut}`
    );
  }, [canPunchIn, punchedIn, canPunchOut]);

  // Render the Punch In/Punch Out UI
  if (userRole !== "employee" && userRole !== "manager") {
    return null; // Don't render for other roles
  }

  return (
    <div className="rzr-emp-time-container">
      <div className="rzr-emp-time-profile">
        <div className="rzr-emp-time-details">
          <h2 className="rzr-emp-time-name">{userName}</h2>
          <p className="rzr-emp-time-id">{empId}</p>
        </div>
      </div>
      <div className="rzr-emp-time-status">
        <div className="rzr-emp-time-time">
          <p className="mb-0">Check In: {startDate || "Fetching..."}</p>
          <p className="mt-0">Check Out: {endDate || "Fetching..."}</p>
        </div>

        <div className="rzr-emp-time-buttons">
          <button
            onClick={handlePunchIn}
            className="punch-button rzr-emp-punch-in mt-2 mb-3"
            disabled={!canPunchIn || punchedIn}
          >
            Punch In
          </button>
          <button
            onClick={handlePunchOut}
            className="punch-button rzr-emp-punch-out mt-2 mb-3"
            disabled={!canPunchOut}
          >
            Punch Out
          </button>
        </div>
        {!canPunchIn && !punchedIn && (
          <p className="too-far-message">You are too far away to punch in</p>
        )}
        <div className="rzr-emp-time-error-distance">
          {error ? (
            <p className="error-message">Error: {error}</p>
          ) : (
            <div>
              {distance !== null && (
                <p>Distance from target: {distance.toFixed(2)} meters</p>
              )}
              {distance > 50 && (
                <p style={{ color: "red" }}>
                  You are {distance.toFixed(2)} meters away from the punch-in
                  location.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Debugging Information */}
        {/* <div className="debug-info">
          <p>canPunchIn: {canPunchIn.toString()}</p>
          <p>punchedIn: {punchedIn.toString()}</p>
          <p>canPunchOut: {canPunchOut.toString()}</p>
          <p>isAllowedToPunch: {isAllowedToPunch().toString()}</p>
          <p>Permissions: {permissions.join(", ")}</p>
        </div> */}
      </div>
    </div>
  );
};

// Optional: Prop type validation
// PunchInOut.propTypes = {
//   permissions: PropTypes.array.isRequired,
// };

export default PunchInOut;
