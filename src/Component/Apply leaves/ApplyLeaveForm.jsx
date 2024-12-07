// // ApplyLeaveForm.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// const ApplyLeaveForm = ({ refreshLeaves }) => {
//   // State variables
//   const [leave_Category, setLeaveCategory] = useState(""); // Paid or Unpaid
//   const [leave_Type, setLeaveType] = useState("");
//   const [leave_From, setLeaveFrom] = useState("");
//   const [leave_To, setLeaveTo] = useState("");
//   const [no_Of_Days, setNoOfDays] = useState(0);
//   const [reason_For_Leave, setReasonForLeave] = useState("");
//   const [userProfile, setUserProfile] = useState(null);
//   const [companySettings, setCompanySettings] = useState(null);
//   const [leaveSystem, setLeaveSystem] = useState(null);
//   const [monthlyPaidLeaves, setMonthlyPaidLeaves] = useState(0);
//   const [leaveTypes, setLeaveTypes] = useState([]); // Dynamic leave types based on settings if needed
//   const [error, setError] = useState(null);

//   // Function to fetch User Profile
//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/user/user-profile",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         return response.data.response;
//       } else {
//         throw new Error(
//           response.data.message || "Failed to fetch user profile."
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       toast.error("Failed to fetch user profile.");
//       throw error;
//     }
//   };

//   // Function to fetch Company Settings
//   const fetchCompanySettings = async () => {
//     try {
//       const response = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         return response.data.data;
//       } else {
//         throw new Error(
//           response.data.message || "Failed to fetch company settings."
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching company settings:", error);
//       toast.error("Failed to fetch company settings.");
//       throw error;
//     }
//   };

//   // Function to apply for leave
//   const applyLeave = async (leaveData) => {
//     try {
//       const response = await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/leave/apply-leave",
//         leaveData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201) {
//         return response.data;
//       } else {
//         throw new Error(response.data.message || "Failed to apply leave.");
//       }
//     } catch (error) {
//       console.error("Error applying leave:", error);
//       throw error;
//     }
//   };

//   // Fetch user profile and company settings on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         setError("You are not authenticated. Please log in.");
//         return;
//       }

//       try {
//         const userData = await fetchUserProfile();
//         setUserProfile(userData);

//         const settingsData = await fetchCompanySettings();
//         setCompanySettings(settingsData);

//         // Match leaveSystemId from user's employment type
//         const employmentTypes = settingsData.employmentTypes || [];
//         const leaveSystems = settingsData.leaveSystems || [];

//         const employmentType = employmentTypes.find(
//           (et) => et.name.toLowerCase() === userData.employee_Type.toLowerCase()
//         );

//         if (employmentType) {
//           const matchedLeaveSystem = leaveSystems.find(
//             (ls) => ls.id === employmentType.leaveSystemId
//           );
//           if (matchedLeaveSystem) {
//             setLeaveSystem(matchedLeaveSystem);
//             setMonthlyPaidLeaves(matchedLeaveSystem.monthlyPaidLeaves || 0);
//           } else {
//             setError(
//               "Your employment type does not have an associated leave system."
//             );
//           }
//         } else {
//           // Handle the case where the employment type is not found
//           // You can set default values or prompt the user/admin
//           setError(
//             `Your employment type "${userData.employee_Type}" is not configured in the system. Please contact your administrator.`
//           );
//         }

//         // Optionally, fetch or define leave types dynamically
//         setLeaveTypes(["Casual Leave", "Sick Leave", "Emergency Leave"]); // Or fetch from settings
//       } catch (error) {
//         setError("Failed to load necessary data. Please try again later.");
//       }
//     };

//     fetchData();
//   }, []);

//   // Calculate number of days when leave_From or leave_To changes
//   useEffect(() => {
//     if (leave_From && leave_To) {
//       const fromDate = new Date(leave_From);
//       const toDate = new Date(leave_To);
//       const timeDiff = toDate.getTime() - fromDate.getTime();
//       const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates
//       if (dayDiff > 0) {
//         setNoOfDays(dayDiff);
//       } else {
//         setNoOfDays(0);
//       }
//     } else {
//       setNoOfDays(0);
//     }
//   }, [leave_From, leave_To]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate leave_Category
//     if (!["Paid", "Unpaid"].includes(leave_Category)) {
//       toast.error("Please select a leave category (Paid/Unpaid).");
//       return;
//     }

//     // If applying for Paid leave, check if user has enough balance
//     if (leave_Category === "Paid") {
//       if (userProfile.no_of_Paid_Leave < no_Of_Days) {
//         toast.error("Insufficient paid leave balance.");
//         return;
//       }
//     }

//     // Check if 'From Date' is after 'To Date'
//     if (new Date(leave_From) > new Date(leave_To)) {
//       toast.error("From date cannot be after To date");
//       return;
//     }

//     // Show confirmation swal before proceeding
//     const confirmResult = await Swal.fire({
//       title: "Confirm Leave Application",
//       html: `<p><strong>Leave Category:</strong> ${leave_Category}</p>
//              <p><strong>Leave Type:</strong> ${leave_Type}</p>
//              <p><strong>From:</strong> ${leave_From}</p>
//              <p><strong>To:</strong> ${leave_To}</p>
//              <p><strong>Number of Days:</strong> ${no_Of_Days}</p>
//              <p><strong>Reason:</strong> ${reason_For_Leave}</p>`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Apply",
//       cancelButtonText: "Cancel",
//     });

//     if (!confirmResult.isConfirmed) {
//       // User canceled the action
//       return;
//     }

//     try {
//       await applyLeave({
//         leave_Category,
//         leave_Type,
//         leave_From,
//         leave_To,
//         no_Of_Days,
//         reason_For_Leave,
//       });
//       toast.success("Leave applied successfully");
//       // Reset form
//       setLeaveCategory("");
//       setLeaveType("");
//       setLeaveFrom("");
//       setLeaveTo("");
//       setNoOfDays(0);
//       setReasonForLeave("");
//       refreshLeaves();
//       // Refresh user profile to update leave balance
//       const updatedUserProfile = await fetchUserProfile();
//       setUserProfile(updatedUserProfile);
//       // Display remaining leaves
//       toast.info(
//         `Remaining Paid Leaves: ${updatedUserProfile.no_of_Paid_Leave}`
//       );
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error("Failed to apply leave");
//       }
//     }
//   };

//   // Show error message if any
//   if (error) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         {error}
//       </div>
//     );
//   }

//   // Show loading spinner if data is not yet fetched
//   if (!userProfile || !companySettings || !leaveSystem) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="container mt-3">
//       <h2>Apply for Leave</h2>
//       <hr />

//       {/* Display Paid Leave Balance */}
//       <div className="form-group mb-3">
//         <label>
//           <strong>Paid Leave Balance:</strong> {userProfile.no_of_Paid_Leave}{" "}
//           days
//         </label>
//       </div>

//       {/* Leave Category Dropdown */}
//       <div className="form-group mb-3">
//         <label htmlFor="leaveCategory">
//           <strong>Leave Category</strong>
//         </label>
//         <select
//           id="leaveCategory"
//           className="form-control"
//           value={leave_Category}
//           onChange={(e) => setLeaveCategory(e.target.value)}
//           required
//         >
//           <option value="">Select Leave Category</option>
//           <option value="Paid" disabled={userProfile.no_of_Paid_Leave <= 0}>
//             Paid Leave
//           </option>
//           <option value="Unpaid">Unpaid Leave</option>
//         </select>
//         {leave_Category === "Paid" && userProfile.no_of_Paid_Leave <= 0 && (
//           <small className="text-danger">
//             You have no paid leaves available.
//           </small>
//         )}
//       </div>

//       {/* Leave Type Dropdown */}
//       <div className="form-group mb-3">
//         <label htmlFor="leaveType">
//           <strong>Leave Type</strong>
//         </label>
//         <select
//           id="leaveType"
//           className="form-control"
//           value={leave_Type}
//           onChange={(e) => setLeaveType(e.target.value)}
//           required
//         >
//           <option value="">Select Leave Type</option>
//           {leaveTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* From Date */}
//       <div className="form-group mb-3">
//         <label htmlFor="leaveFrom">
//           <strong>From Date</strong>
//         </label>
//         <input
//           type="date"
//           id="leaveFrom"
//           className="form-control"
//           value={leave_From}
//           onChange={(e) => setLeaveFrom(e.target.value)}
//           required
//         />
//       </div>

//       {/* To Date */}
//       <div className="form-group mb-3">
//         <label htmlFor="leaveTo">
//           <strong>To Date</strong>
//         </label>
//         <input
//           type="date"
//           id="leaveTo"
//           className="form-control"
//           value={leave_To}
//           onChange={(e) => setLeaveTo(e.target.value)}
//           required
//         />
//       </div>

//       {/* Number of Days */}
//       <div className="form-group mb-3">
//         <label htmlFor="noOfDays">
//           <strong>Number of Days</strong>
//         </label>
//         <input
//           type="number"
//           id="noOfDays"
//           className="form-control"
//           value={no_Of_Days}
//           onChange={(e) => setNoOfDays(Number(e.target.value))}
//           required
//           min="1"
//         />
//       </div>

//       {/* Reason for Leave */}
//       <div className="form-group mb-3">
//         <label htmlFor="reasonForLeave">
//           <strong>Reason for Leave</strong>
//         </label>
//         <textarea
//           id="reasonForLeave"
//           className="form-control"
//           value={reason_For_Leave}
//           onChange={(e) => setReasonForLeave(e.target.value)}
//           required
//           rows="4"
//         ></textarea>
//       </div>

//       <button type="submit" className="btn btn-primary">
//         Apply Leave
//       </button>
//     </form>
//   );
// };

// export default ApplyLeaveForm;


// ApplyLeaveForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ApplyLeaveForm = ({ refreshLeaves }) => {
  // State variables
  const [leave_Category, setLeaveCategory] = useState(""); // Paid or Unpaid
  const [leave_Type, setLeaveType] = useState("");
  const [leave_From, setLeaveFrom] = useState("");
  const [leave_To, setLeaveTo] = useState("");
  const [no_Of_Days, setNoOfDays] = useState(0);
  const [reason_For_Leave, setReasonForLeave] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [companySettings, setCompanySettings] = useState(null);
  const [leaveSystem, setLeaveSystem] = useState(null);
  const [monthlyPaidLeaves, setMonthlyPaidLeaves] = useState(0);
  const [leaveTypes, setLeaveTypes] = useState([]); // Dynamic leave types based on settings if needed
  const [error, setError] = useState(null);

  // Function to fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/user/user-profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data.response;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch user profile."
        );
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch user profile.");
      throw error;
    }
  };

  // Function to fetch Company Settings
  const fetchCompanySettings = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/settings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(
          response.data.message || "Failed to fetch company settings."
        );
      }
    } catch (error) {
      console.error("Error fetching company settings:", error);
      toast.error("Failed to fetch company settings.");
      throw error;
    }
  };

  // Function to apply for leave
  const applyLeave = async (leaveData) => {
    try {
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/leave/apply-leave",
        leaveData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Failed to apply leave.");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      throw error;
    }
  };

  // Fetch user profile and company settings on component mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      try {
        const userData = await fetchUserProfile();
        setUserProfile(userData);

        const settingsData = await fetchCompanySettings();
        setCompanySettings(settingsData);

        // Match leaveSystemId from user's employment type
        const employmentTypes = settingsData.employmentTypes || [];
        const leaveSystems = settingsData.leaveSystems || [];

        const employmentType = employmentTypes.find(
          (et) => et.name.toLowerCase() === userData.employee_Type.toLowerCase()
        );

        if (employmentType) {
          const matchedLeaveSystem = leaveSystems.find(
            (ls) => ls.id === employmentType.leaveSystemId
          );
          if (matchedLeaveSystem) {
            setLeaveSystem(matchedLeaveSystem);
            setMonthlyPaidLeaves(matchedLeaveSystem.monthlyPaidLeaves || 0);
          } else {
            setError(
              "Your employment type does not have an associated leave system."
            );
          }
        } else {
          // Handle the case where the employment type is not found
          // You can set default values or prompt the user/admin
          setError(
            `Your employment type "${userData.employee_Type}" is not configured in the system. Please contact your administrator.`
          );
        }

        // Optionally, fetch or define leave types dynamically
        setLeaveTypes(["Casual Leave", "Sick Leave", "Emergency Leave"]); // Or fetch from settings
      } catch (error) {
        setError("Failed to load necessary data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Calculate number of days when leave_From or leave_To changes
  useEffect(() => {
    if (leave_From && leave_To) {
      const fromDate = new Date(leave_From);
      const toDate = new Date(leave_To);
      const timeDiff = toDate.getTime() - fromDate.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates
      if (dayDiff > 0) {
        setNoOfDays(dayDiff);
      } else {
        setNoOfDays(0);
      }
    } else {
      setNoOfDays(0);
    }
  }, [leave_From, leave_To]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate leave_Category
    if (!["Paid", "Unpaid"].includes(leave_Category)) {
      toast.error("Please select a leave category (Paid/Unpaid).");
      return;
    }

    // If applying for Paid leave, check if user has enough balance
    if (leave_Category === "Paid") {
      if (userProfile.no_of_Paid_Leave < no_Of_Days) {
        toast.error("Insufficient paid leave balance.");
        return;
      }
    }

    // Check if 'From Date' is after 'To Date'
    if (new Date(leave_From) > new Date(leave_To)) {
      toast.error("From date cannot be after To date");
      return;
    }

    // Show confirmation swal before proceeding
    const confirmResult = await Swal.fire({
      title: "Confirm Leave Application",
      html: `<p><strong>Leave Category:</strong> ${leave_Category}</p>
             <p><strong>Leave Type:</strong> ${leave_Type}</p>
             <p><strong>From:</strong> ${leave_From}</p>
             <p><strong>To:</strong> ${leave_To}</p>
             <p><strong>Number of Days:</strong> ${no_Of_Days}</p>
             <p><strong>Reason:</strong> ${reason_For_Leave}</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      // User canceled the action
      return;
    }

    try {
      await applyLeave({
        leave_Category,
        leave_Type,
        leave_From,
        leave_To,
        no_Of_Days,
        reason_For_Leave,
      });
      toast.success("Leave applied successfully");
      // Reset form
      setLeaveCategory("");
      setLeaveType("");
      setLeaveFrom("");
      setLeaveTo("");
      setNoOfDays(0);
      setReasonForLeave("");
      refreshLeaves();
      // Refresh user profile to update leave balance
      const updatedUserProfile = await fetchUserProfile();
      setUserProfile(updatedUserProfile);
      // Display remaining leaves
      toast.info(
        `Remaining Paid Leaves: ${updatedUserProfile.no_of_Paid_Leave}`
      );
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to apply leave");
      }
    }
  };

  // Show error message if any
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // Show loading spinner if data is not yet fetched
  if (!userProfile || !companySettings || !leaveSystem) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (`0${today.getMonth() + 1}`).slice(-2); // Months are zero-based
    const day = (`0${today.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  return (
    <form onSubmit={handleSubmit} className="container mt-3">
      <h2>Apply for Leave</h2>
      <hr />

      {/* Display Paid Leave Balance */}
      <div className="form-group mb-3">
        <label>
          <strong>Paid Leave Balance:</strong> {userProfile.no_of_Paid_Leave}{" "}
          days
        </label>
      </div>

      {/* Leave Category Dropdown */}
      <div className="form-group mb-3">
        <label htmlFor="leaveCategory">
          <strong>Leave Category</strong>
        </label>
        <select
          id="leaveCategory"
          className="form-control"
          value={leave_Category}
          onChange={(e) => setLeaveCategory(e.target.value)}
          required
        >
          <option value="">Select Leave Category</option>
          <option value="Paid" disabled={userProfile.no_of_Paid_Leave <= 0}>
            Paid Leave
          </option>
          <option value="Unpaid">Unpaid Leave</option>
        </select>
        {leave_Category === "Paid" && userProfile.no_of_Paid_Leave <= 0 && (
          <small className="text-danger">
            You have no paid leaves available.
          </small>
        )}
      </div>

      {/* Leave Type Dropdown */}
      <div className="form-group mb-3">
        <label htmlFor="leaveType">
          <strong>Leave Type</strong>
        </label>
        <select
          id="leaveType"
          className="form-control"
          value={leave_Type}
          onChange={(e) => setLeaveType(e.target.value)}
          required
        >
          <option value="">Select Leave Type</option>
          {leaveTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* From Date */}
      <div className="form-group mb-3">
        <label htmlFor="leaveFrom">
          <strong>From Date</strong>
        </label>
        <input
          type="date"
          id="leaveFrom"
          className="form-control"
          value={leave_From}
          onChange={(e) => setLeaveFrom(e.target.value)}
          required
          min={todayDate} // Disable previous dates
        />
      </div>

      {/* To Date */}
      <div className="form-group mb-3">
        <label htmlFor="leaveTo">
          <strong>To Date</strong>
        </label>
        <input
          type="date"
          id="leaveTo"
          className="form-control"
          value={leave_To}
          onChange={(e) => setLeaveTo(e.target.value)}
          required
          min={leave_From || todayDate} // Disable previous dates and ensure To Date is not before From Date
        />
      </div>

      {/* Number of Days */}
      <div className="form-group mb-3">
        <label htmlFor="noOfDays">
          <strong>Number of Days</strong>
        </label>
        <input
          type="number"
          id="noOfDays"
          className="form-control"
          value={no_Of_Days}
          onChange={(e) => setNoOfDays(Number(e.target.value))}
          required
          min="1"
        />
      </div>

      {/* Reason for Leave */}
      <div className="form-group mb-3">
        <label htmlFor="reasonForLeave">
          <strong>Reason for Leave</strong>
        </label>
        <textarea
          id="reasonForLeave"
          className="form-control"
          value={reason_For_Leave}
          onChange={(e) => setReasonForLeave(e.target.value)}
          required
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Apply Leave
      </button>
    </form>
  );
};

export default ApplyLeaveForm;

