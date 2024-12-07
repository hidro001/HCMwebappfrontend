// // components/RequestModal.js
// import React, { useState } from "react";
// import Modal from "react-modal";
// import axios from "axios";
// import Swal from "sweetalert2";

// const RequestModal = ({ isOpen, onClose }) => {
//   const [type, setType] = useState("");
//   const [amount, setAmount] = useState("");
//   const [reason, setReason] = useState("");
//   const [documents, setDocuments] = useState([]);

//   const handleFileChange = (e) => {
//     setDocuments(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const employeeId = localStorage.getItem("employeeId");

//       // Submit the request
//       const response = await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/submit-request",
//         {
//           employeeId,
//           type,
//           amount: type === "Hike" ? undefined : amount,
//           reason,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       if (response.data.success) {
//         // If type is Reimbursement and documents are uploaded
//         if (type === "Reimbursement" && documents.length > 0) {
//           const formData = new FormData();
//           for (let i = 0; i < documents.length; i++) {
//             formData.append("documents", documents[i]);
//           }

//           await axios.post(
//             `https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/upload-documents/${response.data.data._id}`,
//             formData,
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//         }

//         Swal.fire("Success", "Request submitted successfully.", "success");
//         onClose();
//       } else {
//         Swal.fire("Error", response.data.message, "error");
//       }
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       Swal.fire("Error", "Failed to submit request.", "error");
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Submit Request"
//       style={{
//         position: "none",
//         Insert: "none",
//         border: "none",
//         backgroundColor: "none",
//         overflow: "none",
//         borderRadius: "0px",
//         padding: "0px",
//       }}
//     >
//       <div className="main">
//         <div className="ems-content">
//           <div className="container rzr-requesthike">
//             <div className="">
//               <h5 className="">Submit Request</h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 onClick={onClose}
//               ></button>
//             </div>
//             <form onSubmit={handleSubmit} className="">
//               <div className="mb-3">
//                 <label htmlFor="type" className="form-label">
//                   Type
//                 </label>
//                 <select
//                   id="type"
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="form-select"
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Hike">Hike</option>
//                   <option value="Advance">Advance</option>
//                   <option value="Reimbursement">Reimbursement</option>
//                 </select>
//               </div>
//               {type !== "Hike" && (
//                 <div className="mb-3">
//                   <label htmlFor="amount" className="form-label">
//                     Amount
//                   </label>
//                   <input
//                     type="number"
//                     id="amount"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     className="form-control"
//                     required
//                     min="1"
//                   />
//                 </div>
//               )}
//               <div className="mb-3">
//                 <label htmlFor="reason" className="form-label">
//                   Reason
//                 </label>
//                 <textarea
//                   id="reason"
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               {type === "Reimbursement" && (
//                 <div className="mb-3">
//                   <label htmlFor="documents" className="form-label">
//                     Upload Documents
//                   </label>
//                   <input
//                     type="file"
//                     id="documents"
//                     multiple
//                     onChange={handleFileChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//               )}
//               <div className="modal-footer">
//                 <button type="submit" className="btn btn-primary">
//                   Submit Request
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default RequestModal;

// components/RequestModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";

const RequestModal = ({ isOpen, onClose }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const employeeId = localStorage.getItem("employeeId");

      const formData = new FormData();
      formData.append("employeeId", employeeId);
      formData.append("type", type);
      if (type !== "Hike") {
        formData.append("amount", amount);
      }
      formData.append("reason", reason);

      // Append documents if type is Reimbursement
      if (type === "Reimbursement" && documents.length > 0) {
        for (let i = 0; i < documents.length; i++) {
          formData.append("documents", documents[i]);
        }
      }

      const response = await axios.post(
        // "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/submit-request",
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/submit-request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Swal.fire("Success", "Request submitted successfully.", "success");
        onClose();
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      Swal.fire("Error", "Failed to submit request.", "error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Submit Request"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          // Customize modal styles as needed
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="main">
        <div className="ems-content">
          <div className="container rzr-requesthike">
            <div className="">
              <h5 className="">Submit Request</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select</option>
                  <option value="Hike">Hike</option>
                  <option value="Advance">Advance</option>
                  <option value="Reimbursement">Reimbursement</option>
                </select>
              </div>
              {type !== "Hike" && (
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                    required
                    min="1"
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="reason" className="form-label">
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              {type === "Reimbursement" && (
                <div className="mb-3">
                  <label htmlFor="documents" className="form-label">
                    Upload Documents
                  </label>
                  <input
                    type="file"
                    id="documents"
                    multiple
                    onChange={handleFileChange}
                    className="form-control"
                    required
                  />
                </div>
              )}
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestModal;
