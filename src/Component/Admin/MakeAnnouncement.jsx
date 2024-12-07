// import { useState, useEffect } from "react";
// import service from "../../services/Service"; // Ensure this import is correct based on your project structure
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const MakeAnnouncement = () => {
//   const [formData, setFormData] = useState({
//     announcementDate: "",
//     announcementSubject: "",
//     announcementPostImg: null,
//     announcementDescription: "",
//     selectedDepartments: [], // Track selected departments here
//     forAllDepartments: true, // To manage if the announcement is for all departments
//   });

//   const [departments, setDepartments] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const announcementsPerPage = 5;
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Fetch departments allocated to the logged-in employee
//   const fetchDepartments = async () => {
//     try {
//       const employeeId = localStorage.getItem("employeeId");
//       const accessToken = localStorage.getItem("accessToken");

//       const response = await axios.get(
//         `https://apiv2.humanmaximizer.com/api/v1/superadmin/departmentAlocated/${employeeId}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("API Response for departments:", response.data);

//       // Assuming the response contains an array of department names in response.data.departmentAlocated
//       const validDepartments = response.data.departmentAlocated.filter(
//         (dept) => !dept.includes("[") && !dept.includes("]") // Ensure only valid departments
//       );
//       setDepartments(validDepartments);
//     } catch (error) {
//       setError("Failed to fetch departments.");
//       console.error("Error fetching departments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     getAnnouncements();
//   }, []);

//   // Fetch announcements
//   const getAnnouncements = async () => {
//     try {
//       const data = await service.fetchAnnouncementList();
//       setAnnouncements(data.data); // Assuming the API response has a data field containing the announcements
//     } catch (error) {
//       console.error("Error fetching announcement list:", error);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value, files, type, checked } = event.target;

//     // Handle file input separately
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     }
//     // Handle checkbox separately
//     else if (type === "checkbox") {
//       if (name === "forAllDepartments") {
//         // Toggle between selecting all departments or specific ones
//         setFormData({
//           ...formData,
//           forAllDepartments: checked,
//           selectedDepartments: checked ? [] : formData.selectedDepartments,
//         });
//       } else {
//         setFormData({ ...formData, [name]: checked });
//       }
//     }
//     // Handle other input types
//     else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Handle department checkbox selection
//   const handleDepartmentCheckboxChange = (dept) => {
//     const updatedDepartments = formData.selectedDepartments.includes(dept)
//       ? formData.selectedDepartments.filter((d) => d !== dept)
//       : [...formData.selectedDepartments, dept];

//     setFormData({
//       ...formData,
//       selectedDepartments: updatedDepartments,
//       forAllDepartments: false, // Uncheck "forAllDepartments" if specific departments are selected
//     });
//   };

//   const submitForm = async (event) => {
//     event.preventDefault();

//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to publish this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, publish it!",
//       cancelButtonText: "No, cancel!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const announcementDetails = new FormData();
//           announcementDetails.append(
//             "announcementDate",
//             formData.announcementDate
//           );
//           announcementDetails.append(
//             "announcementSubject",
//             formData.announcementSubject
//           );

//           if (formData.announcementPostImg) {
//             announcementDetails.append(
//               "announcementPostImg",
//               formData.announcementPostImg
//             );
//           }

//           announcementDetails.append(
//             "announcementDescription",
//             formData.announcementDescription
//           );

//           // Check if all departments are selected
//           if (formData.forAllDepartments) {
//             // If "Publish for all departments" is selected, set "publish_for_all" to true
//             announcementDetails.append("publish_for_all", true);
//             announcementDetails.append("department", []); // Empty array for departments
//           } else {
//             // If specific departments are selected, set "publish_for_all" to false
//             announcementDetails.append("publish_for_all", false);
//             // Pass the selected departments correctly as an array
//             formData.selectedDepartments.forEach((dept) => {
//               announcementDetails.append("department[]", dept);
//             });
//           }

//           const response = await service.addAnnouncement(announcementDetails);
//           console.log(response);

//           // Reset form after successful submission
//           setFormData({
//             announcementDate: "",
//             announcementSubject: "",
//             announcementPostImg: null,
//             announcementDescription: "",
//             selectedDepartments: [],
//             forAllDepartments: true,
//           });

//           // Fetch updated announcements list
//           getAnnouncements();

//           toast.success("Announcement published successfully!");
//         } catch (error) {
//           console.error("Error adding announcement:", error);
//           toast.error("Failed to publish announcement.");
//         }
//       }
//     });
//   };

//   const indexOfLastAnnouncement = currentPage * announcementsPerPage;
//   const indexOfFirstAnnouncement =
//     indexOfLastAnnouncement - announcementsPerPage;
//   const currentAnnouncements = announcements.slice(
//     indexOfFirstAnnouncement,
//     indexOfLastAnnouncement
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const HandleDeleteAnnouncement = (id) => {
//     // Show the confirmation dialog
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const token = localStorage.getItem("accessToken");
//           const headers = {
//             Authorization: `Bearer ${token}`,
//           };
//           const response = await axios.delete(
//             `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
//             { headers }
//           );

//           // Show a success message after deletion
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: response.data.message,
//           });

//           getAnnouncements(); // Refresh the list after deletion
//         } catch (error) {
//           console.error("Error deleting announcement:", error);
//           // Show an error message if deletion fails
//           Swal.fire({
//             icon: "error",
//             title: "Error!",
//             text: "Failed to delete the announcement.",
//           });
//         }
//       }
//     });
//   };

//   const HandleUpdateAnouncement = async (_id) => {
//     navigate(`/dashboard/make-announcement/${_id}`);
//   };

//   return (
//     <div className="main">
//       <section className="ems-content">
//         <div className="container">
//           <div className="all-employee">
//             <div className="all-head">
//               <h4>Make An Announcement</h4>
//             </div>
//             <div className="row mt-4">
//               <div className="col-lg-12">
//                 <div className="annouce-form">
//                   <form onSubmit={submitForm}>
//                     <div className="container">
//                       <div className="row">
//                         <div className="form-group mb-3 col-md-4">
//                           <label htmlFor="announcementDate">
//                             Announcement Date
//                           </label>
//                           <input
//                             type="date"
//                             className="form-control"
//                             id="announcementDate"
//                             name="announcementDate"
//                             value={formData.announcementDate}
//                             onChange={handleChange}
//                             required
//                             min={new Date().toISOString().split("T")[0]} // Ensure no past dates
//                           />
//                         </div>
//                         <div className="form-group mb-3 col-md-4">
//                           <label htmlFor="announcementSubject">
//                             Subject or Title*
//                           </label>
//                           <input
//                             type="text"
//                             required
//                             className="form-control"
//                             id="announcementSubject"
//                             name="announcementSubject"
//                             placeholder="Enter subject..."
//                             value={formData.announcementSubject}
//                             onChange={handleChange}
//                           />
//                         </div>
//                         <div className="form-group mb-3 col-md-4">
//                           <label htmlFor="announcementPostImg">
//                             Post Image
//                           </label>
//                           <input
//                             type="file"
//                             className="form-control"
//                             id="announcementPostImg"
//                             name="announcementPostImg"
//                             onChange={handleChange}
//                           />
//                         </div>

//                         <div className="form-group mb-3 col-md-12">
//                           <label htmlFor="announcementDescription">
//                             Announcement Description
//                           </label>
//                           <textarea
//                             className="form-control"
//                             required
//                             id="announcementDescription"
//                             name="announcementDescription"
//                             rows={3}
//                             value={formData.announcementDescription}
//                             onChange={handleChange}
//                           />
//                         </div>

//                         <div className="form-group mb-3 col-md-12">
//                           <label>Departments</label>
//                           <div className="d-flex flex-wrap">
//                             {departments.map((dept) => (
//                               <div
//                                 key={dept}
//                                 className="form-check"
//                                 style={{ marginRight: "15px" }}
//                               >
//                                 <input
//                                   className="form-check-input"
//                                   type="checkbox"
//                                   value={dept}
//                                   id={dept}
//                                   onChange={() =>
//                                     handleDepartmentCheckboxChange(dept)
//                                   }
//                                   checked={formData.selectedDepartments.includes(
//                                     dept
//                                   )}
//                                   disabled={formData.forAllDepartments}
//                                   style={{ width: "20px", height: "20px" }}
//                                 />
//                                 <label
//                                   className="form-check-label"
//                                   htmlFor={dept}
//                                 >
//                                   {dept}
//                                 </label>
//                               </div>
//                             ))}
//                             <span>
//                               <input
//                                 type="checkbox"
//                                 name="forAllDepartments"
//                                 checked={formData.forAllDepartments}
//                                 onChange={handleChange}
//                               />
//                             </span>
//                             <span>Publish for all departments</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <button type="submit" className="annouce-post">
//                       Publish
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="#fff"
//                         width={16}
//                         height={16}
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.999 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
//                       </svg>
//                     </button>
//                   </form>
//                 </div>
//               </div>

//               {/* Display previous announcements */}
//               <div className="col-lg-12 mt-3">
//                 <div className="pre-annoucments">
//                   <div className="annouce-head mb-4">
//                     <h5>Previous Announcements</h5>
//                   </div>
//                   {currentAnnouncements.map((announcement) => (
//                     <div className="pre-message-bx" key={announcement._id}>
//                       <div className="top-employee d-flex">
//                         <div className="">
//                           <img
//                             src={announcement.announcementPostImg}
//                             alt={announcement.announcementSubject}
//                             className="performer-view"
//                             style={{ width: "60px", height: "60px" }}
//                           />
//                         </div>
//                         <div className="top-emp-details mx-3 admin-accc-editbtn">
//                           <a href="#" className="top-emp-name">
//                             {announcement.announcementSubject}
//                           </a>
//                           <div className="emp-details">
//                             <span className="emp-designation">
//                               {announcement.announcementDate}
//                             </span>
//                             <br />
//                             <span className="emp-process">
//                               {announcement.announcementDescription}
//                             </span>
//                           </div>
//                           <div className="admin-accc-editbtn-buttons">
//                             <button
//                               className="admin-accc-editbtn-edit"
//                               onClick={() =>
//                                 HandleUpdateAnouncement(announcement._id)
//                               }
//                             >
//                               Edit
//                             </button>
//                             <button
//                               className="admin-accc-editbtn-delete"
//                               onClick={() =>
//                                 HandleDeleteAnnouncement(announcement._id)
//                               }
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div className="d-flex justify-content-end">
//                     <ul className="pagination">
//                       {currentPage > 1 && (
//                         <li className="page-item">
//                           <span
//                             className="page-link"
//                             onClick={() => paginate(currentPage - 1)}
//                           >
//                             ‹
//                           </span>
//                         </li>
//                       )}
//                       {[
//                         ...Array(
//                           Math.ceil(announcements.length / announcementsPerPage)
//                         ).keys(),
//                       ].map((number) => (
//                         <li
//                           key={number + 1}
//                           className={`page-item ${
//                             currentPage === number + 1 ? "active" : ""
//                           }`}
//                         >
//                           <span
//                             className="page-link"
//                             onClick={() => paginate(number + 1)}
//                           >
//                             {number + 1}
//                           </span>
//                         </li>
//                       ))}
//                       {currentPage <
//                         Math.ceil(
//                           announcements.length / announcementsPerPage
//                         ) && (
//                         <li className="page-item">
//                           <span
//                             className="page-link"
//                             onClick={() => paginate(currentPage + 1)}
//                           >
//                             ›
//                           </span>
//                         </li>
//                       )}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </div>
//   );
// };

// export default MakeAnnouncement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import service from "../../services/Service"; // Ensure correct path

const MakeAnnouncement = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    announcementDate: "",
    announcementSubject: "",
    announcementPostImg: null,
    announcementDescription: "",
    publish_for_all: false, // Default to 'All Departments'
    selectedDepartments: [], // Array to hold selected department IDs
  });

  // State to hold fetched departments
  const [departments, setDepartments] = useState([]);

  // State to handle errors
  const [error, setError] = useState(null);

  // Additional state for announcements
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  // Fetch departments and announcements from API on component mount
  useEffect(() => {
    fetchDepartments();
    getAnnouncements();
  }, []);

  // Function to fetch departments
  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Ensure your token is stored under 'accessToken'
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        setDepartments(response.data.data); // Access departments from response.data.data
      } else {
        throw new Error(
          response.data.message || "Failed to fetch departments."
        );
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to fetch departments.");
      toast.error(err.message || "Failed to fetch departments.");
    }
  };

  // Existing function to fetch announcements (Do Not Modify)
  const getAnnouncements = async () => {
    try {
      const data = await service.fetchAnnouncementList();
      setAnnouncements(data.data); // Assuming the API response has a data field containing the announcements
    } catch (error) {
      console.error("Error fetching announcement list:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // Handle file input separately
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    }
    // Handle checkbox separately
    else if (type === "checkbox") {
      if (name === "forAllDepartments") {
        // Toggle between selecting all departments or specific ones
        setFormData({
          ...formData,
          publish_for_all: checked,
          selectedDepartments: checked ? [] : formData.selectedDepartments,
        });
      }
    }
    // Handle other input types
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle department checkbox selection
  const handleDepartmentCheckboxChange = (deptId) => {
    const updatedDepartments = formData.selectedDepartments.includes(deptId)
      ? formData.selectedDepartments.filter((id) => id !== deptId)
      : [...formData.selectedDepartments, deptId];

    setFormData({
      ...formData,
      selectedDepartments: updatedDepartments,
      publish_for_all: false, // Uncheck "forAllDepartments" if specific departments are selected
    });
  };

  // Handle form submission
  const submitForm = async (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, publish it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            throw new Error("Authentication token not found. Please log in.");
          }

          const announcementDetails = new FormData();
          announcementDetails.append(
            "announcementDate",
            formData.announcementDate
          );
          announcementDetails.append(
            "announcementSubject",
            formData.announcementSubject
          );

          if (formData.announcementPostImg) {
            announcementDetails.append(
              "announcementPostImg",
              formData.announcementPostImg
            );
          }

          announcementDetails.append(
            "announcementDescription",
            formData.announcementDescription
          );

          // Check if all departments are selected
          if (formData.publish_for_all) {
            // If "Publish for all departments" is selected, set "publish_for_all" to true
            announcementDetails.append("publish_for_all", true);
            announcementDetails.append("department", []); // Empty array for departments
          } else {
            // If specific departments are selected, set "publish_for_all" to false
            announcementDetails.append("publish_for_all", false);
            // Append each selected department
            formData.selectedDepartments.forEach((deptId) => {
              announcementDetails.append("department[]", deptId);
            });
          }

          // POST request to create announcement using the existing service
          const response = await service.addAnnouncement(
            announcementDetails,
            token
          );

          if (response.success) {
            toast.success("Announcement published successfully!");

            // Reset form
            setFormData({
              announcementDate: "",
              announcementSubject: "",
              announcementPostImg: null,
              announcementDescription: "",
              publish_for_all: true,
              selectedDepartments: [],
            });

            // Fetch updated announcements list
            getAnnouncements();
          } else {
            throw new Error(
              response.message || "Failed to publish announcement."
            );
          }
        } catch (error) {
          console.error("Error adding announcement:", error);
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Failed to publish announcement."
          );
        }
      }
    });
  };

  // Pagination logic for announcements
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle deleting an announcement
  // const HandleDeleteAnnouncement = (id) => {
  //   // Show the confirmation dialog
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to delete this announcement?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "No, cancel!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const token = localStorage.getItem("accessToken");
  //         if (!token) {
  //           throw new Error("Authentication token not found. Please log in.");
  //         }

  //         // DELETE request using the existing service
  //         const response = await service.deleteAnnouncement(id, token);

  //         if (response.success) {
  //           // Show a success message after deletion
  //           Swal.fire({
  //             icon: "success",
  //             title: "Deleted!",
  //             text: response.message || "Announcement deleted successfully.",
  //           });

  //           getAnnouncements(); // Refresh the list after deletion
  //         } else {
  //           throw new Error(response.message || "Failed to delete announcement.");
  //         }
  //       } catch (error) {
  //         console.error("Error deleting announcement:", error);
  //         // Show an error message if deletion fails
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error!",
  //           text: error.response?.data?.message || "Failed to delete the announcement.",
  //         });
  //       }
  //     }
  //   });
  // };

  const HandleDeleteAnnouncement = (id) => {
    // Show the confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("accessToken");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.delete(
            `https://apiv2.humanmaximizer.com/api/v1/admin/announcement/${id}`,
            { headers }
          );

          // Show a success message after deletion
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response.data.message,
          });

          getAnnouncements(); // Refresh the list after deletion
        } catch (error) {
          console.error("Error deleting announcement:", error);
          // Show an error message if deletion fails
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete the announcement.",
          });
        }
      }
    });
  };

  // Handle updating an announcement
  const HandleUpdateAnouncement = async (_id) => {
    navigate(`/dashboard/make-announcement/${_id}`);
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container p-5">
          <div className="all-employee">
            <div className="all-head">
              <h4>Make An Announcement</h4>
            </div>
            <div className="row mt-4">
              {/* Announcement Form */}
              <div>
                <div className="annouce-form">
                  <form onSubmit={submitForm}>
                    <div className="container">
                      <div className="row">
                        {/* Announcement Date */}
                        <div className="form-group mb-3 col-md-4">
                          <label htmlFor="announcementDate">
                            Announcement Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="announcementDate"
                            name="announcementDate"
                            value={formData.announcementDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split("T")[0]} // No past dates
                          />
                        </div>

                        {/* Announcement Subject */}
                        <div className="form-group mb-3 col-md-4">
                          <label htmlFor="announcementSubject">
                            Subject or Title*
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            id="announcementSubject"
                            name="announcementSubject"
                            placeholder="Enter subject..."
                            value={formData.announcementSubject}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Announcement Image */}
                        <div className="form-group mb-3 col-md-4">
                          <label htmlFor="announcementPostImg">
                            Post Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="announcementPostImg"
                            name="announcementPostImg"
                            onChange={handleChange}
                            accept="image/*" // Optional: accept only images
                          />
                        </div>

                        {/* Announcement Description */}
                        <div className="form-group mb-3 col-md-12">
                          <label htmlFor="announcementDescription">
                            Announcement Description
                          </label>
                          <textarea
                            className="form-control"
                            required
                            id="announcementDescription"
                            name="announcementDescription"
                            rows={3}
                            value={formData.announcementDescription}
                            onChange={handleChange}
                          />
                        </div>

                        {/* Posting Options */}
                        <div className="form-group mb-3 col-md-12">
                          <label>Post Announcement</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              name="forAllDepartments"
                              checked={formData.publish_for_all}
                              onChange={handleChange}
                              style={{ width: "20px", height: "20px" }}
                            />
                            <span className="mx-2">
                              Publish for all departments
                            </span>
                          </div>
                        </div>

                        {/* Specific Departments Selection */}
                        {!formData.publish_for_all && (
                          <div className="form-group mb-3 col-md-12">
                            <label>Specific Departments</label>
                            <div className="d-flex flex-wrap">
                              {departments.map((dept) => (
                                <div
                                  key={dept._id}
                                  className="form-check"
                                  style={{ marginRight: "15px" }}
                                >
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={dept._id}
                                    id={dept._id}
                                    name="selectedDepartments"
                                    onChange={() =>
                                      handleDepartmentCheckboxChange(dept._id)
                                    }
                                    checked={formData.selectedDepartments.includes(
                                      dept._id
                                    )}
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={dept._id}
                                  >
                                    {dept.department}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="annouce-post btn btn-primary"
                    >
                      Publish
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#fff"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        style={{ marginLeft: "5px" }}
                      >
                        <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.999 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              {/* Display Previous Announcements */}
              {/* // Inside your MakeAnnouncement component's return statement */}
              {/* Display Previous Announcements */}
              <div className="hm-make-pvan mt-3">
                <div className="pre-annoucments">
                  <div className="annouce-head mb-4">
                    <h5>Previous Announcements</h5>
                  </div>
                  {currentAnnouncements.length > 0 ? (
                    currentAnnouncements.map((announcement) => (
                      <div className="pre-message-bx" key={announcement._id}>
                        <div className="top-employee d-flex">
                          <div className="">
                            {announcement.announcementPostImg && (
                              <img
                                src={announcement.announcementPostImg}
                                alt={announcement.announcementSubject}
                                className="performer-view"
                              />
                            )}
                          </div>
                          <div className="top-emp-details mx-3 admin-accc-editbtn">
                            <a href="#" className="top-emp-name">
                              {announcement.announcementSubject}
                            </a>
                            <div className="emp-details">
                              <span className="emp-designation">
                                {new Date(
                                  announcement.announcementDate
                                ).toLocaleDateString()}
                              </span>
                              <br />
                              <span className="emp-process">
                                <strong>Description:</strong>{" "}
                                {announcement.announcementDescription}
                              </span>
                              <br />
                              <span className="emp-department">
                                <strong>Department:</strong>{" "}
                                {announcement.publish_for_all
                                  ? "All Departments"
                                  : announcement.department
                                      .map((dept) => dept.department)
                                      .join(", ")}
                              </span>
                            </div>
                            <div className="admin-accc-editbtn-buttons mt-2">
                              <button
                                className="admin-accc-editbtn-edit btn btn-sm btn-warning me-2"
                                onClick={() =>
                                  HandleUpdateAnouncement(announcement._id)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="admin-accc-editbtn-delete btn btn-sm btn-danger"
                                onClick={() =>
                                  HandleDeleteAnnouncement(announcement._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No announcements found.</p>
                  )}
                  {/* Pagination */}
                  {announcements.length > announcementsPerPage && (
                    <div className="d-flex justify-content-end">
                      <ul className="pagination">
                        {currentPage > 1 && (
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => paginate(currentPage - 1)}
                            >
                              ‹
                            </button>
                          </li>
                        )}
                        {[
                          ...Array(
                            Math.ceil(
                              announcements.length / announcementsPerPage
                            )
                          ).keys(),
                        ].map((number) => (
                          <li
                            key={number + 1}
                            className={`page-item ${
                              currentPage === number + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(number + 1)}
                            >
                              {number + 1}
                            </button>
                          </li>
                        ))}
                        {currentPage <
                          Math.ceil(
                            announcements.length / announcementsPerPage
                          ) && (
                          <li className="page-item">
                            <button
                              className="page-link"
                              onClick={() => paginate(currentPage + 1)}
                            >
                              ›
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* End of Previous Announcements */}
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default MakeAnnouncement;
