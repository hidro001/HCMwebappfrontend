// // src/components/LeaveTable.js

// import React from "react";

// const LeaveTable = ({ leaves }) => {
//   return (
//     <table className="table table-bordered">
//       <thead>
//         <tr>
//           <th>Leave Type</th>
//           <th>From</th>
//           <th>To</th>
//           <th>No. of Days</th>
//           <th>Reason for leave</th>
//           <th>Status</th>
//           <th>Reason For Reject</th> {/* New Column */}
//           <th>Processed By</th> {/* New Column */}
//         </tr>
//       </thead>
//       <tbody>
//         {leaves.length === 0 ? (
//           <tr>
//             <td colSpan="8">No leave requests found.</td>
//           </tr>
//         ) : (
//           leaves.map((leave) => (
//             <tr key={leave._id}>
//               <td>{leave.leave_Type}</td>
//               <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
//               <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
//               <td>{leave.no_Of_Days}</td>
//               <td>{leave.reason_For_Leave}</td>
//               <td>{leave.leave_Status}</td>

//               {/* <td>{leave.reason_For_Reject}</td> */}
//               <td>
//                 {leave.reason_For_Reject ? `${leave.reason_For_Reject}` : "N/A"}
//               </td>
//               <td>
//                 {leave.leave_Status === "approved" && leave.approved_By
//                   ? `Approved by ${leave.approved_By.first_Name} ${leave.approved_By.last_Name}`
//                   : leave.leave_Status === "rejected" && leave.rejected_By
//                   ? `Rejected by ${leave.rejected_By.first_Name} ${leave.rejected_By.last_Name}`
//                   : "Pending"}
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default LeaveTable;

// src/components/LeaveTable.js

import React from "react";

const LeaveTable = ({ leaves }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Leave Type</th>
          <th>From</th>
          <th>To</th>
          <th>No. of Days</th>
          <th>Reason for Leave</th>
          <th>Status</th>
          <th>Reason For Reject</th>
          <th>Processed By</th>
        </tr>
      </thead>
      <tbody>
        {leaves.length === 0 ? (
          <tr>
            <td colSpan="8">No leave requests found.</td>
          </tr>
        ) : (
          leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.leave_Type}</td>
              <td>{new Date(leave.leave_From).toLocaleDateString()}</td>
              <td>{new Date(leave.leave_To).toLocaleDateString()}</td>
              <td>{leave.no_Of_Days}</td>
              <td>{leave.reason_For_Leave}</td>
              <td>{leave.leave_Status}</td>
              <td>{leave.reason_For_Reject || "N/A"}</td>
              <td>
                {leave.leave_Status === "approved" && leave.approved_By
                  ? `Approved by ${leave.approved_By.first_Name} ${leave.approved_By.last_Name}`
                  : leave.leave_Status === "rejected" && leave.rejected_By
                  ? `Rejected by ${leave.rejected_By.first_Name} ${leave.rejected_By.last_Name}`
                  : "Pending"}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LeaveTable;
