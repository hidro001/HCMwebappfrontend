// // src/components/PendingLeaveRequests.js

// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { getAssignedLeavesByStatus, handleLeaveRequest } from "./api";

// const PendingLeaveRequests = () => {
//   const [leaves, setLeaves] = useState([]);

//   const fetchPendingLeaves = async () => {
//     try {
//       const response = await getAssignedLeavesByStatus("pending");
//       setLeaves(response.data);
//     } catch (err) {
//       console.error("Error fetching pending leaves:", err);
//       toast.error("Failed to fetch pending leaves");
//     }
//   };

//   useEffect(() => {
//     fetchPendingLeaves();
//   }, []);

//   const handleAction = async (leaveId, action) => {
//     try {
//       // Show confirmation swal before proceeding
//       const confirmResult = await Swal.fire({
//         title: `Are you sure you want to ${action} this leave request?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: `Yes, ${action} it!`,
//         cancelButtonText: "Cancel",
//       });

//       if (!confirmResult.isConfirmed) {
//         // User canceled the action
//         return;
//       }

//       let reason_For_Reject;

//       if (action === "rejected") {
//         const { value: reason } = await Swal.fire({
//           title: "Reason for Rejection",
//           input: "textarea",
//           inputLabel: "Enter reason for rejection:",
//           inputPlaceholder: "Type your reason here...",
//           inputAttributes: {
//             "aria-label": "Type your reason here",
//           },
//           showCancelButton: true,
//           confirmButtonText: "Submit",
//           cancelButtonText: "Cancel",
//           inputValidator: (value) => {
//             if (!value) {
//               return "Rejection reason is required!";
//             }
//           },
//         });

//         if (reason === undefined) {
//           // User canceled the action
//           return;
//         }

//         reason_For_Reject = reason;
//       }

//       await handleLeaveRequest(leaveId, { action, reason_For_Reject });
//       toast.success(`Leave request ${action} successfully`);
//       fetchPendingLeaves(); // Refresh the list
//     } catch (err) {
//       console.error("Error handling leave request:", err);
//       toast.error(
//         err.response?.data?.message || "Failed to handle leave request"
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Pending Leave Requests</h2>
//       {leaves.length === 0 ? (
//         <p>No pending leave requests found.</p>
//       ) : (
//         <Table bordered>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Immediate Manager</th>
//               <th>Leave Type</th>
//               <th>From</th>
//               <th>To</th>
//               <th>No. of Days</th>
//               <th>Reason for Leave</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>
//                   {leave.employee.first_Name} {leave.employee.last_Name}
//                 </td>
//                 <td>
//                   {leave.employee.assigned_to
//                     ? `${leave.employee.assigned_to.first_Name} ${leave.employee.assigned_to.last_Name}`
//                     : "N/A"}
//                 </td>
//                 <td>{leave.leave_Type}</td>
//                 <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
//                 <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
//                 <td>{leave.no_Of_Days}</td>
//                 <td>{leave.reason_For_Leave}</td>
//                 <td>
//                   <Button
//                     variant="success"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleAction(leave._id, "approved")}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleAction(leave._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default PendingLeaveRequests;

// src/components/PendingLeaveRequests.js

// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { getAssignedLeavesByStatus, handleLeaveRequest } from "./api";

// const PendingLeaveRequests = () => {
//   const [leaves, setLeaves] = useState([]);

//   const fetchPendingLeaves = async () => {
//     try {
//       const response = await getAssignedLeavesByStatus("pending");
//       setLeaves(response.data);
//     } catch (err) {
//       console.error("Error fetching pending leaves:", err);
//       toast.error("Failed to fetch pending leaves");
//     }
//   };

//   useEffect(() => {
//     fetchPendingLeaves();
//   }, []);

//   const handleAction = async (leaveId, action) => {
//     try {
//       // Show confirmation before proceeding
//       const confirmResult = await Swal.fire({
//         title: `Are you sure you want to ${action} this leave request?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: `Yes, ${action} it!`,
//         cancelButtonText: "Cancel",
//       });

//       if (!confirmResult.isConfirmed) {
//         return; // User canceled the action
//       }

//       let reason_For_Reject;

//       if (action === "rejected") {
//         const { value: reason } = await Swal.fire({
//           title: "Reason for Rejection",
//           input: "textarea",
//           inputLabel: "Enter reason for rejection:",
//           inputPlaceholder: "Type your reason here...",
//           inputAttributes: {
//             "aria-label": "Type your reason here",
//           },
//           showCancelButton: true,
//           confirmButtonText: "Submit",
//           cancelButtonText: "Cancel",
//           inputValidator: (value) => {
//             if (!value) {
//               return "Rejection reason is required!";
//             }
//           },
//         });

//         if (reason === undefined) {
//           return; // User canceled the action
//         }

//         reason_For_Reject = reason;
//       }

//       await handleLeaveRequest(leaveId, { action, reason_For_Reject });
//       toast.success(`Leave request ${action} successfully`);
//       fetchPendingLeaves(); // Refresh the list
//     } catch (err) {
//       console.error("Error handling leave request:", err);
//       toast.error(
//         err.response?.data?.message || "Failed to handle leave request"
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Pending Leave Requests</h2>
//       {leaves.length === 0 ? (
//         <p>No pending leave requests found.</p>
//       ) : (
//         <Table bordered>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Immediate Manager</th>
//               <th>Leave Type</th>
//               <th>From</th>
//               <th>To</th>
//               <th>No. of Days</th>
//               <th>Reason for Leave</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>
//                   {leave.employee.first_Name} {leave.employee.last_Name}
//                 </td>
//                 <td>
//                   {leave.employee.assigned_to
//                     ? `${leave.employee.assigned_to.first_Name} ${leave.employee.assigned_to.last_Name}`
//                     : "N/A"}
//                 </td>
//                 <td>{leave.leave_Type}</td>
//                 <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
//                 <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
//                 <td>{leave.no_Of_Days}</td>
//                 <td>{leave.reason_For_Leave}</td>
//                 <td>
//                   <Button
//                     variant="success"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleAction(leave._id, "approved")}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleAction(leave._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default PendingLeaveRequests;

// PendingLeaveRequests.jsx
// import React, { useState, useEffect } from "react";
// import { Table, Button, Badge } from "react-bootstrap";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import { getAssignedLeavesByStatus, handleLeaveRequest } from "./api";

// const PendingLeaveRequests = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [isManager, setIsManager] = useState(false);

//   const fetchPendingLeaves = async () => {
//     try {
//       const response = await getAssignedLeavesByStatus("pending");
//       setLeaves(response.data);
//     } catch (err) {
//       console.error("Error fetching pending leaves:", err);
//       toast.error("Failed to fetch pending leaves");
//     }
//   };

//   const checkIfManager = () => {
//     const userPermissions =
//       JSON.parse(localStorage.getItem("user")).permission || [];
//     setIsManager(userPermissions.includes("acceptandrejectleave"));
//   };

//   useEffect(() => {
//     checkIfManager();
//     fetchPendingLeaves();
//   }, []);

//   const handleAction = async (leaveId, action) => {
//     try {
//       // Show confirmation before proceeding
//       const confirmResult = await Swal.fire({
//         title: `Are you sure you want to ${action} this leave request?`,
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: `Yes, ${action} it!`,
//         cancelButtonText: "Cancel",
//       });

//       if (!confirmResult.isConfirmed) {
//         return; // User canceled the action
//       }

//       let reason_For_Reject;

//       if (action === "rejected") {
//         const { value: reason } = await Swal.fire({
//           title: "Reason for Rejection",
//           input: "textarea",
//           inputLabel: "Enter reason for rejection:",
//           inputPlaceholder: "Type your reason here...",
//           inputAttributes: {
//             "aria-label": "Type your reason here",
//           },
//           showCancelButton: true,
//           confirmButtonText: "Submit",
//           cancelButtonText: "Cancel",
//           inputValidator: (value) => {
//             if (!value) {
//               return "Rejection reason is required!";
//             }
//           },
//         });

//         if (reason === undefined) {
//           return; // User canceled the action
//         }

//         reason_For_Reject = reason;
//       }

//       await handleLeaveRequest(leaveId, { action, reason_For_Reject });
//       toast.success(`Leave request ${action} successfully`);
//       fetchPendingLeaves(); // Refresh the list
//     } catch (err) {
//       console.error("Error handling leave request:", err);
//       toast.error(
//         err.response?.data?.message || "Failed to handle leave request"
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Pending Leave Requests</h2>
//       {leaves.length === 0 ? (
//         <p>No pending leave requests found.</p>
//       ) : (
//         <Table bordered responsive>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Immediate Manager</th>
//               <th>Leave Type</th>
//               <th>From</th>
//               <th>To</th>
//               <th>No. of Days</th>
//               <th>Reason for Leave</th>
//               {isManager && <th>Requester</th>}
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.map((leave) => (
//               <tr key={leave._id}>
//                 <td>
//                   {leave.employee.first_Name} {leave.employee.last_Name}
//                 </td>
//                 <td>
//                   {leave.employee.assigned_to
//                     ? `${leave.employee.assigned_to.first_Name} ${leave.employee.assigned_to.last_Name}`
//                     : "N/A"}
//                 </td>
//                 <td>{leave.leave_Type}</td>
//                 <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
//                 <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
//                 <td>{leave.no_Of_Days}</td>
//                 <td>{leave.reason_For_Leave}</td>
//                 {isManager && (
//                   <td>
//                     {leave.employee._id !== leave.currentApproverId ? (
//                       <Badge bg="secondary">Subordinate</Badge>
//                     ) : (
//                       <Badge bg="primary">Self</Badge>
//                     )}
//                   </td>
//                 )}
//                 <td>
//                   <Button
//                     variant="success"
//                     size="sm"
//                     className="me-2"
//                     onClick={() => handleAction(leave._id, "approved")}
//                   >
//                     Approve
//                   </Button>
//                   <Button
//                     variant="danger"
//                     size="sm"
//                     onClick={() => handleAction(leave._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// };

// export default PendingLeaveRequests;

// PendingLeaveRequests.jsx
// PendingLeaveRequests.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Badge, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getAssignedLeavesByStatus, handleLeaveRequest } from "./api";

const PendingLeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of items per page
  const [isManager, setIsManager] = useState(false);

  // Fetch user details (ensure you have a way to retrieve the current user's permissions)
  const fetchUserDetails = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Adjust based on your storage strategy
    if (user && user.permission) {
      setIsManager(user.permission.includes("acceptandrejectleave"));
    }
  };

  const fetchPendingLeaves = async (page = 1) => {
    try {
      const response = await getAssignedLeavesByStatus("pending");
      setLeaves(response.data);
      // Assuming the backend returns pagination details if implemented
      // setCurrentPage(response.data.page);
      // setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching pending leaves:", err);
      toast.error("Failed to fetch pending leaves");
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchPendingLeaves();
  }, []);

  const handleAction = async (leaveId, action) => {
    try {
      // Show confirmation before proceeding
      const confirmResult = await Swal.fire({
        title: `Are you sure you want to ${action} this leave request?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${action} it!`,
        cancelButtonText: "Cancel",
      });

      if (!confirmResult.isConfirmed) {
        return; // User canceled the action
      }

      let reason_For_Reject;

      if (action === "rejected") {
        const { value: reason } = await Swal.fire({
          title: "Reason for Rejection",
          input: "textarea",
          inputLabel: "Enter reason for rejection:",
          inputPlaceholder: "Type your reason here...",
          inputAttributes: {
            "aria-label": "Type your reason here",
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "Rejection reason is required!";
            }
          },
        });

        if (reason === undefined) {
          return; // User canceled the action
        }

        reason_For_Reject = reason;
      }

      await handleLeaveRequest(leaveId, { action, reason_For_Reject });
      toast.success(`Leave request ${action} successfully`);
      fetchPendingLeaves(); // Refresh the list
    } catch (err) {
      console.error("Error handling leave request:", err);
      toast.error(
        err.response?.data?.message || "Failed to handle leave request"
      );
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchPendingLeaves(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <div className="container mt-5">
      <h2>Pending Leave Requests</h2>
      {leaves.length === 0 ? (
        <p>No pending leave requests found.</p>
      ) : (
        <>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Immediate Manager</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>No. of Days</th>
                <th>Reason for Leave</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id}>
                  <td>
                    {leave.employee.first_Name} {leave.employee.last_Name}
                  </td>
                  <td>
                    {leave.employee.assigned_to
                      ? `${leave.employee.assigned_to.first_Name} ${leave.employee.assigned_to.last_Name}`
                      : "N/A"}
                  </td>
                  <td>{leave.leave_Type}</td>
                  <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
                  <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
                  <td>{leave.no_Of_Days}</td>
                  <td>{leave.reason_For_Leave}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleAction(leave._id, "approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleAction(leave._id, "rejected")}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default PendingLeaveRequests;
