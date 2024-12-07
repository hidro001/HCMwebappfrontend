// import { useState } from "react";
// import service from "../../services/Service";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import { useEffect } from "react";

// const ApplyLeaves = () => {
//   const [leaveType, setLeaveType] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [numberOfDays, setNumberOfDays] = useState("");
//   const [reason, setReason] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to apply for leave?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, apply!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const leaveData = {
//             leave_Type: leaveType,
//             leave_From: fromDate,
//             leave_To: toDate,
//             no_Of_Days: numberOfDays,
//             reason_For_Leave: reason,
//           };
//           await service.postLeave(leaveData);
//           setMessage("Leave Request Submitted Successfully!");
//           toast.success("Leave Request Submitted Successfully!", {
//             position: "top-center",
//           });
//           // Clear the form inputs
//           setLeaveType("");
//           setFromDate("");
//           setToDate("");
//           setNumberOfDays("");
//           setReason("");
//         } catch (error) {
//           setMessage(error.message);
//           toast.error(error.message, {
//             position: "top-center",
//           });
//         }
//       }
//     });
//   };

//   const calculateDays = (from, to) => {
//     if (from && to) {
//       const fromDateObj = new Date(from);
//       const toDateObj = new Date(to);

//       const timeDifference = toDateObj.getTime() - fromDateObj.getTime();

//       const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

//       setNumberOfDays(daysDifference > 0 ? daysDifference : 0);
//     } else {
//       setNumberOfDays(0);
//     }
//   };

//   useEffect(() => {
//     calculateDays(fromDate, toDate);
//   }, [fromDate, toDate]);

//   return (
//     <div className="main">
//       <ToastContainer />
//       <section className="ems-content">
//         <div className="container">

//           <div className="all-employee">
//             <div className="all-head">
//               <h4>Apply For Leave</h4>
//             </div>
//             <div className="row mt-4">
//               <div className="col-lg-12">
//                 <div className="leave-form">
//                   <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                       <div className="row">
//                         <div className="col-lg-12">
//                           <label htmlFor="leave">Leave Type*</label>
//                           <select
//                             name="leaveType"
//                             required
//                             className="form-control"
//                             value={leaveType}
//                             onChange={(e) => setLeaveType(e.target.value)}>
//                             <option value="">--Leave Type--</option>
//                             <option>Casual Leave</option>
//                             <option>Paid Leave</option>
//                             <option>Comp. off</option>
//                             <option>Sick Leave</option>
//                           </select>
//                         </div>
//                         <div className="col-lg-4 my-4">
//                           <label htmlFor="from-date">From:</label>
//                           <input
//                             type="date"
//                             className="form-control"
//                             id="fromdate"
//                             value={fromDate}
//                             min={new Date().toISOString().split("T")[0]}
//                             onChange={(e) => setFromDate(e.target.value)}
//                           />
//                         </div>
//                         <div className="col-lg-4 my-4">
//                           <label htmlFor="to-date">To:</label>
//                           <input
//                             type="date"
//                             className="form-control"
//                             id="todate"
//                             value={toDate}
//                             min={new Date().toISOString().split("T")[0]}
//                             onChange={(e) => setToDate(e.target.value)}
//                           />
//                         </div>
//                         <div className="col-lg-4 my-4">
//                           <label htmlFor="number">No. of Days</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id="days"
//                             value={numberOfDays}
//                             onChange={(e) => setNumberOfDays(e.target.value)}
//                           />
//                         </div>
//                         <div className="col-lg-12 mb-3">
//                           <label htmlFor="reason">Reason for Leave*</label>
//                           <textarea
//                             name="reason"
//                             className="form-control"
//                             id="reason"
//                             placeholder="Write leave reason"
//                             value={reason}
//                             onChange={(e) => setReason(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <button type="submit" className="send-btn">
//                       Send
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="#fff"
//                         width={16}
//                         height={16}
//                         viewBox="0 0 24 24">
//                         <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
//                       </svg>
//                     </button>
//                   </form>
//                   {/* {message && <p>{message}</p>} */}
//                 </div>
//               </div>
//               {/* <div className="col-lg-4">
//                 <div className="holidays">
//                   <div className="holiday-head">Holidays</div>
//                   <ul>
//                     <li>
//                       Independence Day: <span>15/08/2024</span>
//                     </li>
//                     <li>
//                       Republic Day: <span>26/01/2024</span>
//                     </li>
//                     <li>
//                       Diwali: <span>03/11/2024</span>
//                     </li>
//                     <li>
//                       Christmas Day: <span>25/12/2024</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ApplyLeaves;


import { useState, useEffect } from "react";
import service from "../../services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const ApplyLeaves = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to apply for leave?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, apply!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const leaveData = {
            leave_Type: leaveType,
            leave_From: fromDate,
            leave_To: toDate,
            no_Of_Days: numberOfDays,
            reason_For_Leave: reason,
          };
          await service.postLeave(leaveData);
          toast.success("Leave Request Submitted Successfully!", {
            position: "top-center",
          });
          // Clear the form inputs
          setLeaveType("");
          setFromDate("");
          setToDate("");
          setNumberOfDays("");
          setReason("");
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to submit leave request.",
            {
              position: "top-center",
            }
          );
        }
      }
    });
  };

  const calculateDays = (from, to) => {
    if (from && to) {
      const fromDateObj = new Date(from);
      const toDateObj = new Date(to);

      const timeDifference = toDateObj.getTime() - fromDateObj.getTime();

      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Inclusive of start date

      setNumberOfDays(daysDifference > 0 ? daysDifference : 0);
    } else {
      setNumberOfDays(0);
    }
  };

  useEffect(() => {
    calculateDays(fromDate, toDate);
  }, [fromDate, toDate]);

  return (
    <div className="main">
      <ToastContainer />
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="all-head">
              <h4>Apply For Leave</h4>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="leave-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-12">
                          <label htmlFor="leave">Leave Type*</label>
                          <select
                            name="leaveType"
                            required
                            className="form-control"
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                          >
                            <option value="">--Leave Type--</option>
                            <option>Casual Leave</option>
                            <option>Paid Leave</option>
                            <option>Comp. off</option>
                            <option>Sick Leave</option>
                          </select>
                        </div>
                        <div className="col-lg-4 my-4">
                          <label htmlFor="from-date">From:</label>
                          <input
                            type="date"
                            className="form-control"
                            id="fromdate"
                            value={fromDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 my-4">
                          <label htmlFor="to-date">To:</label>
                          <input
                            type="date"
                            className="form-control"
                            id="todate"
                            value={toDate}
                            min={
                              fromDate || new Date().toISOString().split("T")[0]
                            }
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4 my-4">
                          <label htmlFor="number">No. of Days</label>
                          <input
                            type="number"
                            className="form-control"
                            id="days"
                            value={numberOfDays}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label htmlFor="reason">Reason for Leave*</label>
                          <textarea
                            name="reason"
                            className="form-control"
                            id="reason"
                            placeholder="Write leave reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="send-btn">
                      Send
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                      >
                        <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              {/* Optional: Holidays Sidebar */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyLeaves;
