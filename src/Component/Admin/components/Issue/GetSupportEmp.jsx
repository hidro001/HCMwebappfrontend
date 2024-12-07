// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import service from "../../services/Service";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Service function to add an issue

// const GetSupport = () => {
//   const userDetails = useSelector((state) => ({
//     workingEmail: state.auth.workingEmail,
//     phoneNumber: state.auth.phoneNumber,
//     userName: state.auth.userName,
//     employeeId: state.auth.employeeId,
//     designation: state.auth.designation,
//   }));

//   const [formData, setFormData] = useState({
//     issueTitle: "",
//     issueDescription: "",
//     priority: "Low",
//     assignedTo: "",
//     file: null,
//     ...userDetails,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       file: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // SweetAlert2 confirmation dialog
//     Swal.fire({
//       title: "Are you sure you want to submit the issue?",
//       text: "Please check your details before submitting!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, submit it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           // Call the addIssue service function
//           const response = await service.addIssue(formData);
//           console.log("Issue created successfully:", response);

//           // Resetting form after successful submission
//           setFormData({
//             issueTitle: "",
//             issueDescription: "",
//             priority: "Low",
//             assignedTo: "",
//             file: null,
//             ...userDetails,
//           });

//           // Toastify success message
//           toast.success("Issue submitted successfully!", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } catch (error) {
//           console.error("Error creating issue:", error);
//           // Optionally handle errors more visibly to the user here
//         }
//       }
//     });
//   };

//   return (
//     <div className=" main">
//       <ToastContainer />
//       <div className="ems-content">
//         <div className="row">
//           <div className="col-12">
//             <div className="issue-form-container">
//               <div className="header-row">
//                 <h2>Raise an Issue</h2>
//                 <Link to="/dashboard/get-support/previous-issues">
//                   <button className="previous-issues-button">
//                     PREVIOUS ISSUES
//                   </button>
//                 </Link>
//               </div>
//               <form onSubmit={handleSubmit} className="issue-form">
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <input
//                       type="text"
//                       id="issueTitle"
//                       name="issueTitle"
//                       value={formData.issueTitle}
//                       onChange={handleChange}
//                       required
//                       className="form-input"
//                     />
//                     <label htmlFor="issueTitle" className="form-label">
//                       Issue Title
//                     </label>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <textarea
//                       id="issueDescription"
//                       name="issueDescription"
//                       value={formData.issueDescription}
//                       onChange={handleChange}
//                       required
//                       className="form-input"
//                     />
//                     <label htmlFor="issueDescription" className="form-label">
//                       Issue Description
//                     </label>
//                   </div>
//                 </div>
//                 <div className="row-group">
//                   <div className="row-item">
//                     <div className="form-group">
//                       <div className="form-input-wrapper">
//                         <select
//                           id="priority"
//                           name="priority"
//                           value={formData.priority}
//                           onChange={handleChange}
//                           className="form-select"
//                         >
//                           <option value="Low">Low</option>
//                           <option value="Medium">Medium</option>
//                           <option value="High">High</option>
//                         </select>
//                         <label htmlFor="priority" className="form-label">
//                           Priority
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row-item">
//                     <div className="form-group">
//                       <div className="form-input-wrapper">
//                         <input
//                           type="text"
//                           id="assignedTo"
//                           name="assignedTo"
//                           value={formData.assignedTo}
//                           onChange={handleChange}
//                           required
//                           className="form-input"
//                         />
//                         <label htmlFor="assignedTo" className="form-label">
//                          Select department
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <input
//                       type="file"
//                       id="file"
//                       name="file"
//                       onChange={handleFileChange}
//                       className="form-input"
//                     />
//                     <label htmlFor="file" className="form-label">
//                       Upload File
//                     </label>
//                   </div>
//                 </div>
//                 <button type="submit" className="submit-button">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//           {/* <div className="col-6">
//             <div className="calendar-container">
//               <div className="calendar-header">
//                 <h3>Previous Issues</h3>
//                 <div className="calendar-switch">
//                   <span>Month</span>
//                   <span className="active">Week</span>
//                 </div>
//               </div>
//               <div className="calendar-weekdays">
//                 <span>26</span>
//                 <span>27</span>
//                 <span>28</span>
//                 <span>29</span>
//                 <span>30</span>
//                 <span>31</span>
//                 <span className="active">1</span>
//               </div>
//               <div className="calendar-day">

//                 {tasks.map((task, index) => (
//                   <div key={index} className="calendar-task">
//                     <div className="calendar-time">{task.time}</div>
//                     <div className={`calendar-task-content ${task.priority}`}>
//                       {task.description}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetSupport;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import service from "./api";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios"; // Ensure axios is imported for fetching departments

// const GetSupport = () => {
//   const userDetails = useSelector((state) => ({
//     workingEmail: state.auth.workingEmail,
//     phoneNumber: state.auth.phoneNumber,
//     userName: state.auth.userName,
//     employeeId: state.auth.employeeId,
//     designation: state.auth.designation,
//   }));

//   const [formData, setFormData] = useState({
//     issueTitle: "",
//     issueDescription: "",
//     priority: "Low",
//     assignedTo: "",
//     file: null,
//     ...userDetails,
//   });

//   const [departments, setDepartments] = useState([]);
//   const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
//   const [departmentsError, setDepartmentsError] = useState(null);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//         );
//         if (response.data.success) {
//           console.log("Fetched Departments:", response.data.data); // Debugging line
//           setDepartments(response.data.data); // Adjust based on API response structure
//         } else {
//           setDepartmentsError(
//             response.data.message || "Failed to fetch departments"
//           );
//         }
//       } catch (error) {
//         setDepartmentsError(
//           error.response?.data?.message ||
//             "An error occurred while fetching departments"
//         );
//       } finally {
//         setIsLoadingDepartments(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       file: e.target.files[0],
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // SweetAlert2 confirmation dialog
//     Swal.fire({
//       title: "Are you sure you want to submit the issue?",
//       text: "Please check your details before submitting!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, submit it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           // Prepare form data for submission
//           const submissionData = new FormData();
//           submissionData.append("issueTitle", formData.issueTitle);
//           submissionData.append("issueDescription", formData.issueDescription);
//           submissionData.append("priority", formData.priority);
//           submissionData.append("assignedTo", formData.assignedTo);
//           submissionData.append("createdBy", userDetails.employeeId); // Assuming you have this field
//           submissionData.append("userName", userDetails.employeeId); // Assuming you have this field
//           submissionData.append("createdBy", userDetails.employeeId); // Assuming you have this field
//           if (formData.file) {
//             submissionData.append("file", formData.file);
//           }

//           // Call the addIssue service function with formData
//           const response = await service.addIssue(submissionData);
//           console.log("Issue created successfully:", response);

//           // Resetting form after successful submission
//           setFormData({
//             issueTitle: "",
//             issueDescription: "",
//             priority: "Low",
//             assignedTo: "",
//             file: null,
//             ...userDetails,
//           });

//           // Toastify success message
//           toast.success("Issue submitted successfully!", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } catch (error) {
//           console.error("Error creating issue:", error);
//           // Optionally handle errors more visibly to the user here
//           toast.error(
//             error.response?.data?.message || "Failed to submit the issue",
//             {
//               position: "top-center",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             }
//           );
//         }
//       }
//     });
//   };

//   return (
//     <div className="main">
//       <ToastContainer />
//       <div className="ems-content">
//         <div className="row">
//           <div className="col-12">
//             <div className="issue-form-container">
//               <div className="header-row">
//                 <h2>Raise an Issue</h2>
//                 <Link to="/dashboard/get-support/previous-issues">
//                   <button className="previous-issues-button">
//                     PREVIOUS ISSUES
//                   </button>
//                 </Link>
//               </div>
//               <form onSubmit={handleSubmit} className="issue-form">
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <input
//                       type="text"
//                       id="issueTitle"
//                       name="issueTitle"
//                       value={formData.issueTitle}
//                       onChange={handleChange}
//                       required
//                       className="form-input"
//                     />
//                     <label htmlFor="issueTitle" className="form-label">
//                       Issue Title
//                     </label>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <textarea
//                       id="issueDescription"
//                       name="issueDescription"
//                       value={formData.issueDescription}
//                       onChange={handleChange}
//                       required
//                       className="form-input"
//                     />
//                     <label htmlFor="issueDescription" className="form-label">
//                       Issue Description
//                     </label>
//                   </div>
//                 </div>
//                 <div className="row-group">
//                   <div className="row-item">
//                     <div className="form-group">
//                       <div className="form-input-wrapper">
//                         <select
//                           id="priority"
//                           name="priority"
//                           value={formData.priority}
//                           onChange={handleChange}
//                           className="form-select"
//                         >
//                           <option value="Low">Low</option>
//                           <option value="Medium">Medium</option>
//                           <option value="High">High</option>
//                         </select>
//                         <label htmlFor="priority" className="form-label">
//                           Priority
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row-item">
//                     <div className="form-group">
//                       <div className="form-input-wrapper">
//                         {isLoadingDepartments ? (
//                           <p>Loading departments...</p>
//                         ) : departmentsError ? (
//                           <p className="error">{departmentsError}</p>
//                         ) : (
//                           <select
//                             id="assignedTo"
//                             name="assignedTo"
//                             value={formData.assignedTo}
//                             onChange={handleChange}
//                             required
//                             className="form-select"
//                           >
//                             <option value="" disabled>
//                               Select Department
//                             </option>
//                             {departments.map((dept) => (
//                               <option key={dept._id} value={dept.department}>
//                                 {dept.department}
//                               </option>
//                             ))}
//                           </select>
//                         )}
//                         <label htmlFor="assignedTo" className="form-label">
//                           Select Department
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="form-group">
//                   <div className="form-input-wrapper">
//                     <input
//                       type="file"
//                       id="file"
//                       name="file"
//                       onChange={handleFileChange}
//                       className="form-input"
//                       accept="image/*"
//                     />
//                     <label htmlFor="file" className="form-label">
//                       Upload Image (Optional)
//                     </label>
//                   </div>
//                 </div>
//                 <button type="submit" className="submit-button">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//           {/* Commented Out Calendar Section (If Needed, Can Be Reintroduced) */}
//           {/* <div className="col-6">
//             <div className="calendar-container">
//               ...
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetSupport;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "./api"; // Assuming `service` contains API functions
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const GetSupport = () => {
  // User details fetched from Redux store
  const userDetails = useSelector((state) => ({
    workingEmail: state.auth.workingEmail,
    phoneNumber: state.auth.phoneNumber,
    userName: state.auth.userName,
    employeeId: state.auth.employeeId,
    designation: state.auth.designation,
  }));

  // Form state
  const [formData, setFormData] = useState({
    issueTitle: "",
    issueDescription: "",
    priority: "Low",
    assignedTo: "",
    file: null,
    ...userDetails, // Prepopulate with user details
  });

  // State for department options and error handling
  const [departments, setDepartments] = useState([]);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
  const [departmentsError, setDepartmentsError] = useState(null);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
        );

        if (response.data.success) {
          setDepartments(response.data.data); // Update department list
        } else {
          setDepartmentsError(
            response.data.message || "Failed to fetch departments"
          );
        }
      } catch (error) {
        setDepartmentsError(
          error.response?.data?.message ||
            "An error occurred while fetching departments"
        );
      } finally {
        setIsLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // // Handle file input changes
  // const handleFileChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     file: e.target.files[0],
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
      console.log("File selected:", file.name); // Log the file name
    } else {
      console.warn("No file selected");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    Swal.fire({
      title: "Are you sure you want to submit the issue?",
      text: "Please check your details before submitting!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Prepare form data for API submission
          const submissionData = new FormData();
          submissionData.append("issueTitle", formData.issueTitle);
          submissionData.append("issueDescription", formData.issueDescription);
          submissionData.append("priority", formData.priority);
          submissionData.append("assignedTo", formData.assignedTo);
          submissionData.append("createdBy", formData.employeeId);
          submissionData.append("userName", formData.userName);
          submissionData.append("workingEmail", formData.workingEmail);
          submissionData.append("phoneNumber", formData.phoneNumber);

          // Include the current timestamp in ISO format
          const currentTime = new Date().toISOString();
          submissionData.append("reportedTime", currentTime);

          if (formData.file) {
            submissionData.append("file", formData.file); // Append the file if it exists
          } else {
            console.warn("No file selected"); // Log a warning if no file is selected
          }

          // Call API to create the issue
          const response = await service.addIssue(submissionData);

          // Handle success response
          toast.success("Issue submitted successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Reset form fields
          setFormData({
            issueTitle: "",
            issueDescription: "",
            priority: "Low",
            assignedTo: "",
            file: null,
            ...userDetails,
          });
        } catch (error) {
          console.error("Error creating issue:", error);

          // Handle error response
          toast.error(
            error.response?.data?.message || "Failed to submit the issue",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }
      }
    });
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="ems-content">
        <div className="row">
          <div className="col-12">
            <div className="issue-form-container">
              <div className="header-row">
                <h2>Raise an Issue</h2>
                <Link to="/dashboard/get-support/previous-issues">
                  <button className="previous-issues-button">
                    PREVIOUS ISSUES
                  </button>
                </Link>
              </div>
              <form onSubmit={handleSubmit} className="issue-form">
                <div className="form-group">
                  <div className="form-input-wrapper">
                    <input
                      type="text"
                      id="issueTitle"
                      name="issueTitle"
                      value={formData.issueTitle}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    <label htmlFor="issueTitle" className="form-label">
                      Issue Title
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-input-wrapper">
                    <textarea
                      id="issueDescription"
                      name="issueDescription"
                      value={formData.issueDescription}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                    <label htmlFor="issueDescription" className="form-label">
                      Issue Description
                    </label>
                  </div>
                </div>
                <div className="row-group">
                  <div className="row-item">
                    <div className="form-group">
                      <div className="form-input-wrapper">
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                        <label htmlFor="priority" className="form-label">
                          Priority
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row-item">
                    <div className="form-group">
                      <div className="form-input-wrapper">
                        {isLoadingDepartments ? (
                          <p>Loading departments...</p>
                        ) : departmentsError ? (
                          <p className="error">{departmentsError}</p>
                        ) : (
                          <select
                            id="assignedTo"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            required
                            className="form-select"
                          >
                            <option value="" disabled>
                              Select Department
                            </option>
                            {departments.map((dept) => (
                              <option key={dept._id} value={dept.department}>
                                {dept.department}
                              </option>
                            ))}
                          </select>
                        )}
                        <label htmlFor="assignedTo" className="form-label">
                          Select Department
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-input-wrapper">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="form-input"
                      accept="image/*"
                    />
                    <label htmlFor="file" className="form-label">
                      Upload Image (Optional)
                    </label>
                  </div>
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetSupport;
