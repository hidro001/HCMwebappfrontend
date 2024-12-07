// // pages/RequestManagement.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Modal from "react-modal";

// const RequestManagement = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [remarks, setRemarks] = useState("");

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/requests",
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       if (response.data.success) {
//         setRequests(response.data.data);
//       } else {
//         throw new Error(response.data.message || "Failed to fetch requests.");
//       }
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//       Swal.fire("Error", "Failed to fetch requests.", "error");
//     }
//   };

//   const handleApproveReject = async (status) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/update-request/${selectedRequest._id}`,
//         { status, remarks },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       if (response.data.success) {
//         Swal.fire("Success", response.data.message, "success");
//         setModalIsOpen(false);
//         fetchRequests(); // Refresh the list
//       } else {
//         throw new Error(response.data.message || "Failed to update request.");
//       }
//     } catch (error) {
//       console.error("Error updating request:", error);
//       Swal.fire("Error", "Failed to update request.", "error");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <h2>Requests Management</h2>
//           <table className="table table-bordered mt-4">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Type</th>
//                 <th>Amount</th>
//                 <th>Reason</th>
//                 <th>Status</th>
//                 <th>Requested At</th>
//                 <th>Actions</th>
//                 <th>Media</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((req) => (
//                 <tr key={req._id}>
//                   <td>{req.employeeId}</td>
//                   <td>{req.type}</td>
//                   <td>{req.amount || "-"}</td>
//                   <td>{req.reason}</td>
//                   <td>{req.status}</td>
//                   <td>{new Date(req.requestedAt).toLocaleString()}</td>
//                   <td>
//                     {req.status === "Pending" && (
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => {
//                           setSelectedRequest(req);
//                           setModalIsOpen(true);
//                         }}
//                       >
//                         Process
//                       </button>
//                     )}
//                     {req.status !== "Pending" && "-"}
//                   </td>
//                   <td>{req.documents}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {selectedRequest && (
//             <Modal
//               isOpen={modalIsOpen}
//               onRequestClose={() => setModalIsOpen(false)}
//               contentLabel="Process Request"
//               className="modal-dialog"
//               overlayClassName="modal-backdrop"
//             >
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Process Request</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setModalIsOpen(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   {/* Your modal body content */}
//                   <p>
//                     <strong>Employee ID:</strong> {selectedRequest.employeeId}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {selectedRequest.type}
//                   </p>
//                   <p>
//                     <strong>Amount:</strong> {selectedRequest.amount || "-"}
//                   </p>
//                   <p>
//                     <strong>Reason:</strong> {selectedRequest.reason}
//                   </p>
//                   {selectedRequest.type === "Reimbursement" &&
//                     selectedRequest.documents &&
//                     selectedRequest.documents.length > 0 && (
//                       <div>
//                         <strong>Documents:</strong>
//                         <ul>
//                           {selectedRequest.documents.map((doc, index) => (
//                             <li key={index}>
//                               <a
//                                 href={doc}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 Document {index + 1}
//                               </a>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   <div className="mb-3">
//                     <label htmlFor="remarks" className="form-label">
//                       Remarks
//                     </label>
//                     <textarea
//                       id="remarks"
//                       value={remarks}
//                       onChange={(e) => setRemarks(e.target.value)}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-success"
//                     onClick={() => handleApproveReject("Approved")}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleApproveReject("Rejected")}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setModalIsOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </Modal>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestManagement;

// pages/RequestManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/requests",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data.success) {
        setRequests(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch requests.");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      Swal.fire("Error", "Failed to fetch requests.", "error");
    }
  };

  const handleApproveReject = async (status) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/update-request/${selectedRequest._id}`,
        { status, remarks },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response.data.success) {
        Swal.fire("Success", response.data.message, "success");
        setModalIsOpen(false);
        fetchRequests(); // Refresh the list
      } else {
        throw new Error(response.data.message || "Failed to update request.");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      Swal.fire("Error", "Failed to update request.", "error");
    }
  };

  const openMediaInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container ">
          <h2>Requests Management</h2>
          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Actions</th>
                <th>Media</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.employeeId}</td>
                  <td>{req.type}</td>
                  <td>{req.amount || "-"}</td>
                  <td>{req.reason}</td>
                  <td>{req.status}</td>
                  <td>{new Date(req.requestedAt).toLocaleString()}</td>
                  <td>
                    {req.status === "Pending" && (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedRequest(req);
                          setModalIsOpen(true);
                        }}
                      >
                        Process
                      </button>
                    )}
                    {req.status !== "Pending" && "-"}
                  </td>
                  <td>
                    {req.documents && req.documents.length > 0
                      ? req.documents.map((doc, index) => (
                          <button
                            key={index}
                            // className="btn btn-link"
                            className="btn btn-primary"
                            onClick={() => openMediaInNewTab(doc)}
                          >
                            View Media {index + 1}
                          </button>
                        ))
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedRequest && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Process Request"
              className="hm-pay-roll-claims-actions"
              overlayClassName="modal-backdrop"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Process Request</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalIsOpen(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Your modal body content */}
                  <p>
                    <strong>Employee ID:</strong> {selectedRequest.employeeId}
                  </p>
                  <p>
                    <strong>Type:</strong> {selectedRequest.type}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedRequest.amount || "-"}
                  </p>
                  <p>
                    <strong>Reason:</strong> {selectedRequest.reason}
                  </p>
                  {selectedRequest.type === "Reimbursement" &&
                    selectedRequest.documents &&
                    selectedRequest.documents.length > 0 && (
                      <div>
                        <strong>Documents:</strong>
                        <ul>
                          {selectedRequest.documents.map((doc, index) => (
                            <li key={index}>
                              <a
                                href={doc}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Document {index + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <div className="mb-3">
                    <label htmlFor="remarks" className="form-label">
                      Remarks
                    </label>
                    <textarea
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={() => handleApproveReject("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleApproveReject("Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setModalIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestManagement;
