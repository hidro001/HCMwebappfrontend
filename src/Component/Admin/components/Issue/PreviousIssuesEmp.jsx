// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const getIssues = async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = "https://apiv2.humanmaximizer.com/api/v1/issues";

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data.map((issue) => ({
//         _id: issue._id, // Correct mapping for ID
//         issueTitle: issue.issueTitle,
//         issueDescription: issue.issueDescription,
//         assignedTo: issue.assignedTo,
//         priority: issue.priority,
//         issueStatus: issue.issueStatus,
//         file: issue.file,
//         createdAt: issue.createdAt,
//       }));
//     } else {
//       throw new Error(response.data.message || "Failed to fetch issues");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch issues");
//   }
// };

// const updateIssue = async (issueId, updatedData) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.put(url, updatedData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data; // Make sure this returns the entire issue object, including _id
//     } else {
//       throw new Error(response.data.message || "Failed to update issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to update issue");
//   }
// };

// const convertToIST = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
// };

// const deleteIssue = async (issueId) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return true;
//     } else {
//       throw new Error(response.data.message || "Failed to delete issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete issue");
//   }
// };

// const PreviousIssuesEmp = () => {
//   // const [commentPopup, setCommentPopup] = useState(null);
//   // const [isViewingComments, setIsViewingComments] = useState(false);
//   // const [currentPage, setCurrentPage] = useState(1);
//   // const [issues, setIssues] = useState([]);
//   // const [filteredIssues, setFilteredIssues] = useState([]);
//   // const [popupContent, setPopupContent] = useState(null);
//   // const [newComment, setNewComment] = useState("");
//   // const [isEditing, setIsEditing] = useState(false);
//   // const [editIssueData, setEditIssueData] = useState(null);
//   // const issuesPerPage = 5;

//   // useEffect(() => {
//   //   const fetchIssues = async () => {
//   //     try {
//   //       const fetchedIssues = await getIssues();
//   //       setIssues(fetchedIssues);
//   //       setFilteredIssues(fetchedIssues);
//   //     } catch (error) {
//   //       console.error("Error fetching issues:", error.message);
//   //     }
//   //   };

//   //   fetchIssues();
//   // }, []);

//   // const indexOfLastIssue = currentPage * issuesPerPage;
//   // const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
//   // const currentIssues = filteredIssues.slice(
//   //   indexOfFirstIssue,
//   //   indexOfLastIssue
//   // );

//   // const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // const showPopup = (content) => {
//   //   setPopupContent(content);
//   // };

//   // const closePopup = () => {
//   //   setPopupContent(null);
//   // };

//   // const filterByPriority = (e) => {
//   //   const priority = e.target.value;
//   //   if (priority === "All") {
//   //     setFilteredIssues(issues);
//   //   } else {
//   //     setFilteredIssues(issues.filter((issue) => issue.priority === priority));
//   //   }
//   //   setCurrentPage(1);
//   // };

//   // const filterByStatus = (e) => {
//   //   const status = e.target.value;
//   //   if (status === "All") {
//   //     setFilteredIssues(issues);
//   //   } else {
//   //     setFilteredIssues(issues.filter((issue) => issue.issueStatus === status));
//   //   }
//   //   setCurrentPage(1);
//   // };

//   // const handleSearch = (e) => {
//   //   const query = e.target.value.toLowerCase();
//   //   setFilteredIssues(
//   //     issues.filter(
//   //       (issue) =>
//   //         issue.issueTitle.toLowerCase().includes(query) ||
//   //         issue.issueDate.includes(query)
//   //     )
//   //   );
//   //   setCurrentPage(1);
//   // };

//   // const handleDelete = async (issueId) => {
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "You won't be able to revert this!",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, delete it!",
//   //   }).then(async (result) => {
//   //     if (result.isConfirmed) {
//   //       try {
//   //         await deleteIssue(issueId);
//   //         setIssues(issues.filter((issue) => issue._id !== issueId));
//   //         setFilteredIssues(
//   //           filteredIssues.filter((issue) => issue._id !== issueId)
//   //         );

//   //         // Toastify success message
//   //         toast.success("Issue deleted successfully!", {
//   //           position: "top-center",
//   //           autoClose: 5000,
//   //           hideProgressBar: false,
//   //           closeOnClick: true,
//   //           pauseOnHover: true,
//   //           draggable: true,
//   //           progress: undefined,
//   //         });
//   //       } catch (error) {
//   //         console.error("Error deleting issue:", error.message);
//   //         // Optionally, handle the error with a toast or another alert here
//   //       }
//   //     }
//   //   });
//   // };

//   // const handleEdit = (issue) => {
//   //   Swal.fire({
//   //     title: "Are you sure?",
//   //     text: "Do you want to edit this issue?",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#3085d6",
//   //     cancelButtonColor: "#d33",
//   //     confirmButtonText: "Yes, edit it!",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       console.log("Editing issue:", issue); // Debugging: Log the entire issue object
//   //       setEditIssueData(issue); // This should include the _id property
//   //       setIsEditing(true);
//   //     }
//   //   });
//   // };

//   // const handleUpdate = async () => {
//   //   try {
//   //     console.log("Issue ID:", editIssueData._id); // This should log the correct _id

//   //     const updatedData = {
//   //       issueTitle: editIssueData.issueTitle,
//   //       issueDescription: editIssueData.issueDescription,
//   //       priority: editIssueData.priority,
//   //       assignedTo: editIssueData.assignedTo,
//   //       file: editIssueData.file,
//   //     };

//   //     // Make sure editIssueData._id is correctly passed here
//   //     const updatedIssue = await updateIssue(editIssueData._id, updatedData);
//   //     setIssues(
//   //       issues.map((issue) =>
//   //         issue._id === editIssueData._id ? updatedIssue : issue
//   //       )
//   //     );
//   //     setFilteredIssues(
//   //       filteredIssues.map((issue) =>
//   //         issue._id === editIssueData._id ? updatedIssue : issue
//   //       )
//   //     );
//   //     setIsEditing(false);
//   //     setEditIssueData(null);
//   //   } catch (error) {
//   //     console.error("Error updating issue:", error.message);
//   //   }
//   // };

//   // const uploadFile = async (file) => {
//   //   // Assume you have an API to handle file uploads
//   //   // You can use Cloudinary or any other service
//   //   const formData = new FormData();
//   //   formData.append("file", file);
//   //   formData.append("upload_preset", "your_upload_preset");

//   //   try {
//   //     const response = await axios.post(
//   //       "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
//   //       formData
//   //     );
//   //     return response.data.secure_url; // or response.data.public_id for fileId
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error.message);
//   //     throw error;
//   //   }
//   // };

//   // const handleEditChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setEditIssueData({ ...editIssueData, [name]: value });
//   // };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     // Handle file upload or set the file URL
//   //     // Assuming you have a function to upload the file and get the URL or ID
//   //     uploadFile(file).then((url) => {
//   //       setEditIssueData({ ...editIssueData, file: url });
//   //     });
//   //   }
//   // };

//     const [issues, setIssues] = useState([]);
//     const [filteredIssues, setFilteredIssues] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [popupContent, setPopupContent] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editIssueData, setEditIssueData] = useState(null);
//     const [newFiles, setNewFiles] = useState([]); // New files to be added to an issue
//     const issuesPerPage = 5;

//     useEffect(() => {
//       const fetchIssues = async () => {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           const url = "https://apiv2.humanmaximizer.com/api/v1/issues";
//           const response = await axios.get(url, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           });
//           if (response.data.success) {
//             setIssues(response.data.data);
//             setFilteredIssues(response.data.data);
//           } else {
//             throw new Error(response.data.message || "Failed to fetch issues");
//           }
//         } catch (error) {
//           console.error("Error fetching issues:", error.message);
//           toast.error(error.message || "Failed to fetch issues");
//         }
//       };

//       fetchIssues();
//     }, []);

//     const indexOfLastIssue = currentPage * issuesPerPage;
//     const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
//     const currentIssues = filteredIssues.slice(
//       indexOfFirstIssue,
//       indexOfLastIssue
//     );

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const handleEdit = (issue) => {
//       setEditIssueData(issue);
//       setIsEditing(true);
//       setNewFiles([]); // Reset new files for each edit
//     };

//     const handleUpdate = async () => {
//       if (!editIssueData) return;

//       Swal.fire({
//         title: "Are you sure you want to update this issue?",
//         text: "Please review the changes before confirming.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, update it!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const accessToken = localStorage.getItem("accessToken");
//             const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${editIssueData._id}`;

//             // Prepare form data for updating issue
//             const formData = new FormData();
//             formData.append("issueTitle", editIssueData.issueTitle);
//             formData.append("issueDescription", editIssueData.issueDescription);
//             formData.append("priority", editIssueData.priority);
//             formData.append("assignedTo", editIssueData.assignedTo);

//             // Append new files
//             newFiles.forEach((file) => formData.append("files", file));

//             const response = await axios.put(url, formData, {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             });

//             if (response.data.success) {
//               setIssues(
//                 issues.map((issue) =>
//                   issue._id === editIssueData._id ? response.data.data : issue
//                 )
//               );
//               setFilteredIssues(
//                 filteredIssues.map((issue) =>
//                   issue._id === editIssueData._id ? response.data.data : issue
//                 )
//               );
//               toast.success("Issue updated successfully!");
//               setIsEditing(false);
//               setEditIssueData(null);
//             } else {
//               throw new Error(
//                 response.data.message || "Failed to update issue"
//               );
//             }
//           } catch (error) {
//             console.error("Error updating issue:", error.message);
//             toast.error(error.message || "Failed to update issue");
//           }
//         }
//       });
//     };

//     const handleEditChange = (e) => {
//       const { name, value } = e.target;
//       setEditIssueData({ ...editIssueData, [name]: value });
//     };

//     const handleFileChange = (e) => {
//       const files = Array.from(e.target.files);
//       setNewFiles([...newFiles, ...files]);
//     };

//     const filterByPriority = (e) => {
//       const priority = e.target.value;
//       if (priority === "All") {
//         setFilteredIssues(issues);
//       } else {
//         setFilteredIssues(
//           issues.filter((issue) => issue.priority === priority)
//         );
//       }
//       setCurrentPage(1);
//     };

//     const filterByStatus = (e) => {
//       const status = e.target.value;
//       if (status === "All") {
//         setFilteredIssues(issues);
//       } else {
//         setFilteredIssues(
//           issues.filter((issue) => issue.issueStatus === status)
//         );
//       }
//       setCurrentPage(1);
//     };

//     const handleSearch = (e) => {
//       const query = e.target.value.toLowerCase();
//       setFilteredIssues(
//         issues.filter(
//           (issue) =>
//             issue.issueTitle.toLowerCase().includes(query) ||
//             issue.issueDescription.toLowerCase().includes(query)
//         )
//       );
//       setCurrentPage(1);
//     };

//   return (
//     <div className="main">
//       <ToastContainer />
//       <div className="ems-content">
//         <div className="rzr-pv-task-emp-container">
//           <div className="all-head d-flex align-items-center justify-content-between mb-4">
//             <h4>Previous Issues</h4>
//           </div>
//           <div className="rzr-emp-hcm-task-update-container">
//             <div className="rzr-pv-task-emp-filters">
//               <div className="rzr-pv-task-emp-filterGroup">
//                 <label htmlFor="priorityFilter">Filter by Priority: </label>
//                 <select
//                   id="priorityFilter"
//                   onChange={filterByPriority}
//                   className="rzr-pv-task-emp-dropdown">
//                   <option value="All">All</option>
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
//               <div className="rzr-pv-task-emp-filterGroup">
//                 <label htmlFor="statusFilter">Filter by Status: </label>
//                 <select
//                   id="statusFilter"
//                   onChange={filterByStatus}
//                   className="rzr-pv-task-emp-dropdown">
//                   <option value="All">All</option>
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="search-filter d-flex align-items-center gap-3">
//                 <form action="">
//                   <input
//                     className="form-control rzr-pv-task-emp-searchInput"
//                     type="text"
//                     placeholder="Search"
//                     onChange={handleSearch}
//                   />
//                 </form>
//               </div>
//             </div>

//             {/* Table wrapper for responsiveness */}
//             <div className="rzr-pv-task-emp-table-wrapper">
//               <table className="rzr-pv-task-emp-table">
//                 <thead>
//                   <tr>
//                     <th className="rzr-pv-task-emp-th">Serial No</th>
//                     <th className="rzr-pv-task-emp-th">Issue Title</th>
//                     <th className="rzr-pv-task-emp-th">Issue Date</th>
//                     <th className="rzr-pv-task-emp-th">Assigned To</th>
//                     <th className="rzr-pv-task-emp-th">Priority</th>
//                     <th className="rzr-pv-task-emp-th">Status</th>
//                     <th className="rzr-pv-task-emp-th">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentIssues.map((issue, index) => (
//                     <tr key={issue.id}>
//                       <td className="rzr-pv-task-emp-td">
//                         {indexOfFirstIssue + index + 1}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">{issue.issueTitle}</td>
//                       <td className="rzr-pv-task-emp-td">
//                         {convertToIST(issue.createdAt)}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">{issue.assignedTo}</td>
//                       <td className="rzr-pv-task-emp-td">{issue.priority}</td>
//                       <td className="rzr-pv-task-emp-td">
//                         {issue.issueStatus}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">
//                         <button
//                           className="rzr-pv-task-emp-button"
//                           onClick={() =>
//                             showPopup(`Description: ${issue.issueDescription}`)
//                           }>
//                           View Description
//                         </button>
//                         <span className="p-2" onClick={() => handleEdit(issue)}>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             height="20"
//                             width="20"
//                             viewBox="0 0 512 512">
//                             <path
//                               fill="#05941d"
//                               d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
//                             />
//                           </svg>
//                         </span>
//                         <span
//                           className="p-2"
//                           onClick={() => handleDelete(issue._id)}>
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             height="20"
//                             width="17.5"
//                             viewBox="0 0 448 512">
//                             <path
//                               fill="#b10606"
//                               d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
//                             />
//                           </svg>
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {currentIssues.length === 0 && (
//                     <tr>
//                       <td className="rzr-pv-task-emp-td" colSpan="7">
//                         No issues found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <Pagination
//             issuesPerPage={issuesPerPage}
//             totalIssues={filteredIssues.length}
//             paginate={paginate}
//             currentPage={currentPage}
//             className="pagination"
//           />
//         </div>
//       </div>

//       {isEditing && (
//         <div className="rzr-pv-task-emp-popup">
//           <div className="rzr-pv-task-emp-popupContent">
//             <h3>Edit Issue</h3>
//             <input
//               type="text"
//               name="issueTitle"
//               value={editIssueData.issueTitle}
//               onChange={handleEditChange}
//               placeholder="Issue Title"
//               className="rzr-pv-task-emp-input"
//             />
//             <textarea
//               name="issueDescription"
//               value={editIssueData.issueDescription}
//               onChange={handleEditChange}
//               placeholder="Issue Description"
//               className="rzr-pv-task-emp-textarea"
//             />
//             <select
//               name="priority"
//               value={editIssueData.priority}
//               onChange={handleEditChange}
//               className="rzr-pv-task-emp-select">
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//             <input
//               type="text"
//               name="assignedTo"
//               value={editIssueData.assignedTo}
//               onChange={handleEditChange}
//               placeholder="Assigned To"
//               className="rzr-pv-task-emp-input"
//             />
//             <input
//               type="file"
//               name="file"
//               onChange={handleFileChange}
//               className="rzr-pv-task-emp-input-file"
//             />
//             <div className="rzr-pv-task-emp-popupButtons">
//               <button
//                 onClick={handleUpdate}
//                 className="rzr-pv-task-emp-button update">
//                 Update
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="rzr-pv-task-emp-button cancel">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {popupContent && (
//         <div className="razor-hcm-decp-emp-popup">
//           <div className="razor-hcm-decp-emp-popupContent">
//             <button
//               className="razor-hcm-decp-emp-closeButton"
//               onClick={closePopup}>
//               &times;
//             </button>
//             <textarea className="razor-hcm-decp-emp-textarea" readOnly>
//               {popupContent}
//             </textarea>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="rzr-pv-task-emp-pagination">
//       <ul className="rzr-pv-task-emp-pagination-list">
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`rzr-pv-task-emp-pagination-item ${
//               currentPage === number ? "active" : ""
//             }`}>
//             <button
//               onClick={() => paginate(number)}
//               className="rzr-pv-task-emp-pagination-link">
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default PreviousIssuesEmp;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Helper function to fetch issues
// const getIssues = async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = "https://apiv2.humanmaximizer.com/api/v1/issues";

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data.map((issue) => ({
//         _id: issue._id,
//         issueTitle: issue.issueTitle,
//         issueDescription: issue.issueDescription,
//         assignedTo: issue.assignedTo,
//         priority: issue.priority,
//         issueStatus: issue.issueStatus,
//         file: issue.file,
//         createdAt: issue.createdAt,
//       }));
//     } else {
//       throw new Error(response.data.message || "Failed to fetch issues");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch issues");
//   }
// };

// // Helper function to update an issue
// const updateIssue = async (issueId, updatedData) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.put(url, updatedData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error(response.data.message || "Failed to update issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to update issue");
//   }
// };

// // Helper function to delete an issue
// const deleteIssue = async (issueId) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return true;
//     } else {
//       throw new Error(response.data.message || "Failed to delete issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete issue");
//   }
// };

// // Function to convert date to IST
// const convertToIST = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
// };

// const PreviousIssuesEmp = () => {
//   const [issues, setIssues] = useState([]);
//   const [filteredIssues, setFilteredIssues] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [popupContent, setPopupContent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIssueData, setEditIssueData] = useState(null);
//   const [departments, setDepartments] = useState([]);
//     const [departmentsError, setDepartmentsError] = useState(null);
//       const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);

//   const [newFiles, setNewFiles] = useState([]);
//   const issuesPerPage = 5;

//   useEffect(() => {
//     const fetchIssuesData = async () => {
//       try {
//         const fetchedIssues = await getIssues();
//         setIssues(fetchedIssues);
//         setFilteredIssues(fetchedIssues);
//       } catch (error) {
//         console.error("Error fetching issues:", error.message);
//         toast.error(error.message || "Failed to fetch issues");
//       }
//     };

//     fetchIssuesData();
//   }, []);

//  useEffect(() => {
//    const fetchDepartments = async () => {
//      try {
//        const response = await axios.get(
//          "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//        );

//        if (response.data.success) {
//          setDepartments(response.data.data); // Update department list
//        } else {
//          setDepartmentsError(
//            response.data.message || "Failed to fetch departments"
//          );
//        }
//      } catch (error) {
//        setDepartmentsError(
//          error.response?.data?.message ||
//            "An error occurred while fetching departments"
//        );
//      } finally {
//        setIsLoadingDepartments(false);
//      }
//    };

//    fetchDepartments();
//  }, []);

//   // Pagination calculations
//   const indexOfLastIssue = currentPage * issuesPerPage;
//   const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
//   const currentIssues = filteredIssues.slice(
//     indexOfFirstIssue,
//     indexOfLastIssue
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const showPopup = (content) => {
//     setPopupContent(content);
//   };

//   const closePopup = () => {
//     setPopupContent(null);
//   };

//   const filterByPriority = (e) => {
//     const priority = e.target.value;
//     if (priority === "All") {
//       setFilteredIssues(issues);
//     } else {
//       setFilteredIssues(issues.filter((issue) => issue.priority === priority));
//     }
//     setCurrentPage(1);
//   };

//   const filterByStatus = (e) => {
//     const status = e.target.value;
//     if (status === "All") {
//       setFilteredIssues(issues);
//     } else {
//       setFilteredIssues(issues.filter((issue) => issue.issueStatus === status));
//     }
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setFilteredIssues(
//       issues.filter(
//         (issue) =>
//           issue.issueTitle.toLowerCase().includes(query) ||
//           issue.issueDescription.toLowerCase().includes(query)
//       )
//     );
//     setCurrentPage(1);
//   };

//   const handleDelete = async (issueId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await deleteIssue(issueId);
//           const updatedIssues = issues.filter((issue) => issue._id !== issueId);
//           setIssues(updatedIssues);
//           const updatedFilteredIssues = filteredIssues.filter(
//             (issue) => issue._id !== issueId
//           );
//           setFilteredIssues(updatedFilteredIssues);

//           toast.success("Issue deleted successfully!", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } catch (error) {
//           console.error("Error deleting issue:", error.message);
//           toast.error(error.message || "Failed to delete issue");
//         }
//       }
//     });
//   };

//   const handleEdit = (issue) => {
//     setEditIssueData(issue);
//     setIsEditing(true);
//     setNewFiles([]);
//   };

//   const handleUpdate = async () => {
//     if (!editIssueData) return;

//     Swal.fire({
//       title: "Are you sure you want to update this issue?",
//       text: "Please review the changes before confirming.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, update it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           if (!accessToken) {
//             throw new Error("No access token found");
//           }

//           const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${editIssueData._id}`;

//           // Prepare form data for updating issue
//           const formData = new FormData();
//           formData.append("issueTitle", editIssueData.issueTitle);
//           formData.append("issueDescription", editIssueData.issueDescription);
//           formData.append("priority", editIssueData.priority);
//           formData.append("assignedTo", editIssueData.assignedTo);

//           // Append new files
//           newFiles.forEach((file) => formData.append("files", file));

//           const response = await axios.put(url, formData, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           if (response.data.success) {
//             const updatedIssue = response.data.data;
//             const updatedIssues = issues.map((issue) =>
//               issue._id === updatedIssue._id ? updatedIssue : issue
//             );
//             setIssues(updatedIssues);

//             const updatedFilteredIssues = filteredIssues.map((issue) =>
//               issue._id === updatedIssue._id ? updatedIssue : issue
//             );
//             setFilteredIssues(updatedFilteredIssues);

//             toast.success("Issue updated successfully!");
//             setIsEditing(false);
//             setEditIssueData(null);
//           } else {
//             throw new Error(response.data.message || "Failed to update issue");
//           }
//         } catch (error) {
//           console.error("Error updating issue:", error.message);
//           toast.error(error.message || "Failed to update issue");
//         }
//       }
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditIssueData({ ...editIssueData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewFiles([...newFiles, ...files]);
//   };

//   return (
//     <div className="main">
//       <ToastContainer />
//       <div className="ems-content">
//         <div className="rzr-pv-task-emp-container">
//           <div className="all-head d-flex align-items-center justify-content-between mb-4">
//             <h4>Previous Issues</h4>
//           </div>
//           <div className="rzr-emp-hcm-task-update-container">
//             <div className="rzr-pv-task-emp-filters">
//               <div className="rzr-pv-task-emp-filterGroup">
//                 <label htmlFor="priorityFilter">Filter by Priority: </label>
//                 <select
//                   id="priorityFilter"
//                   onChange={filterByPriority}
//                   className="rzr-pv-task-emp-dropdown"
//                 >
//                   <option value="All">All</option>
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
//               <div className="rzr-pv-task-emp-filterGroup">
//                 <label htmlFor="statusFilter">Filter by Status: </label>
//                 <select
//                   id="statusFilter"
//                   onChange={filterByStatus}
//                   className="rzr-pv-task-emp-dropdown"
//                 >
//                   <option value="All">All</option>
//                   <option value="Pending">Pending</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="search-filter d-flex align-items-center gap-3">
//                 <form>
//                   <input
//                     className="form-control rzr-pv-task-emp-searchInput"
//                     type="text"
//                     placeholder="Search"
//                     onChange={handleSearch}
//                   />
//                 </form>
//               </div>
//             </div>

//             {/* Table wrapper for responsiveness */}
//             <div className="rzr-pv-task-emp-table-wrapper">
//               <table className="rzr-pv-task-emp-table">
//                 <thead>
//                   <tr>
//                     <th className="rzr-pv-task-emp-th">Serial No</th>
//                     <th className="rzr-pv-task-emp-th">Issue Title</th>
//                     <th className="rzr-pv-task-emp-th">Issue Date</th>
//                     <th className="rzr-pv-task-emp-th">Assigned To</th>
//                     <th className="rzr-pv-task-emp-th">Priority</th>
//                     <th className="rzr-pv-task-emp-th">Status</th>
//                     <th className="rzr-pv-task-emp-th">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentIssues.map((issue, index) => (
//                     <tr key={issue._id}>
//                       <td className="rzr-pv-task-emp-td">
//                         {indexOfFirstIssue + index + 1}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">{issue.issueTitle}</td>
//                       <td className="rzr-pv-task-emp-td">
//                         {convertToIST(issue.createdAt)}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">{issue.assignedTo}</td>
//                       <td className="rzr-pv-task-emp-td">{issue.priority}</td>
//                       <td className="rzr-pv-task-emp-td">
//                         {issue.issueStatus}
//                       </td>
//                       <td className="rzr-pv-task-emp-td">
//                         <button
//                           className="rzr-pv-task-emp-button"
//                           onClick={() =>
//                             showPopup(`Description: ${issue.issueDescription}`)
//                           }
//                         >
//                           View Description
//                         </button>
//                         <span
//                           className="p-2"
//                           onClick={() => handleEdit(issue)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             height="20"
//                             width="20"
//                             viewBox="0 0 512 512"
//                           >
//                             <path
//                               fill="#05941d"
//                               d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
//                             />
//                           </svg>
//                         </span>
//                         <span
//                           className="p-2"
//                           onClick={() => handleDelete(issue._id)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             height="20"
//                             width="17.5"
//                             viewBox="0 0 448 512"
//                           >
//                             <path
//                               fill="#b10606"
//                               d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
//                             />
//                           </svg>
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                   {currentIssues.length === 0 && (
//                     <tr>
//                       <td className="rzr-pv-task-emp-td" colSpan="7">
//                         No issues found
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <Pagination
//             issuesPerPage={issuesPerPage}
//             totalIssues={filteredIssues.length}
//             paginate={paginate}
//             currentPage={currentPage}
//           />
//         </div>
//       </div>

//       {isEditing && editIssueData && (
//         <div className="rzr-pv-task-emp-popup">
//           <div className="rzr-pv-task-emp-popupContent">
//             <h3>Edit Issue</h3>
//             <input
//               type="text"
//               name="issueTitle"
//               value={editIssueData.issueTitle}
//               onChange={handleEditChange}
//               placeholder="Issue Title"
//               className="rzr-pv-task-emp-input"
//             />
//             <textarea
//               name="issueDescription"
//               value={editIssueData.issueDescription}
//               onChange={handleEditChange}
//               placeholder="Issue Description"
//               className="rzr-pv-task-emp-textarea"
//             />
//             <select
//               name="priority"
//               value={editIssueData.priority}
//               onChange={handleEditChange}
//               className="rzr-pv-task-emp-select"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//             <div className="row-item">
//               <div className="form-group">
//                 <div className="form-input-wrapper">
//                   {isLoadingDepartments ? (
//                     <p>Loading departments...</p>
//                   ) : departmentsError ? (
//                     <p className="error">{departmentsError}</p>
//                   ) : (
//                     <select
//                       id="assignedTo"
//                       name="assignedTo"
//                       value={editIssueData.assignedTo}
//                       onChange={handleEditChange}
//                       required
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Department
//                       </option>
//                       {departments.map((dept) => (
//                         <option key={dept._id} value={dept.department}>
//                           {dept.department}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                   <label htmlFor="assignedTo" className="form-label">
//                     Select Department
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <input
//               type="file"
//               name="file"
//               onChange={handleFileChange}
//               className="rzr-pv-task-emp-input-file"
//               multiple
//             />
//             <div className="rzr-pv-task-emp-popupButtons">
//               <button
//                 onClick={handleUpdate}
//                 className="rzr-pv-task-emp-button update"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditIssueData(null);
//                 }}
//                 className="rzr-pv-task-emp-button cancel"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {popupContent && (
//         <div className="razor-hcm-decp-emp-popup">
//           <div className="razor-hcm-decp-emp-popupContent">
//             <button
//               className="razor-hcm-decp-emp-closeButton"
//               onClick={closePopup}
//             >
//               &times;
//             </button>
//             <textarea className="razor-hcm-decp-emp-textarea" readOnly>
//               {popupContent}
//             </textarea>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Pagination component
// const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="rzr-pv-task-emp-pagination">
//       <ul className="rzr-pv-task-emp-pagination-list">
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`rzr-pv-task-emp-pagination-item ${
//               currentPage === number ? "active" : ""
//             }`}
//           >
//             <button
//               onClick={() => paginate(number)}
//               className="rzr-pv-task-emp-pagination-link"
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default PreviousIssuesEmp;

// src/components/Admin/components/Issue/PreviousIssuesEmp.jsx

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Comments from "./Comments"; // Import the Comments component
// import "./PreviousIssuesEmp.css"; // Optional: Create this CSS file for styling

// // Helper functions (getIssues, updateIssue, deleteIssue, convertToIST) remain unchanged
// // Helper function to fetch issues
// const getIssues = async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = "https://apiv2.humanmaximizer.com/api/v1/issues";

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data.map((issue) => ({
//         _id: issue._id,
//         issueTitle: issue.issueTitle,
//         issueDescription: issue.issueDescription,
//         assignedTo: issue.assignedTo,
//         priority: issue.priority,
//         issueStatus: issue.issueStatus,
//         file: issue.file,
//         createdAt: issue.createdAt,
//       }));
//     } else {
//       throw new Error(response.data.message || "Failed to fetch issues");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch issues");
//   }
// };

// // Helper function to update an issue
// const updateIssue = async (issueId, updatedData) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.put(url, updatedData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return response.data.data;
//     } else {
//       throw new Error(response.data.message || "Failed to update issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to update issue");
//   }
// };

// // Helper function to delete an issue
// const deleteIssue = async (issueId) => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");

//     if (!accessToken) {
//       throw new Error("No access token found");
//     }

//     const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`;

//     const response = await axios.delete(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (response.data.success) {
//       return true;
//     } else {
//       throw new Error(response.data.message || "Failed to delete issue");
//     }
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete issue");
//   }
// };

// // Function to convert date to IST
// const convertToIST = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
// };

// const PreviousIssuesEmp = () => {
//   const [issues, setIssues] = useState([]);
//   const [filteredIssues, setFilteredIssues] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [popupContent, setPopupContent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editIssueData, setEditIssueData] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [departmentsError, setDepartmentsError] = useState(null);
//   const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
//   const [newFiles, setNewFiles] = useState([]);
//   const [selectedIssue, setSelectedIssue] = useState(null); // Declare selectedIssue state
//   const issuesPerPage = 5;

//   // Fetch issues on component mount
//   useEffect(() => {
//     const fetchIssuesData = async () => {
//       try {
//         const fetchedIssues = await getIssues();
//         setIssues(fetchedIssues);
//         setFilteredIssues(fetchedIssues);
//       } catch (error) {
//         console.error("Error fetching issues:", error.message);
//         toast.error(error.message || "Failed to fetch issues");
//       }
//     };

//     fetchIssuesData();
//   }, []);

//   // Fetch departments on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         if (!accessToken) {
//           throw new Error("No access token found");
//         }

//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           setDepartments(response.data.data); // Update department list
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

//   // Pagination calculations
//   const indexOfLastIssue = currentPage * issuesPerPage;
//   const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
//   const currentIssues = filteredIssues.slice(
//     indexOfFirstIssue,
//     indexOfLastIssue
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const showPopup = (content) => {
//     setPopupContent(content);
//   };

//   const closePopup = () => {
//     setPopupContent(null);
//   };

//   const filterByPriority = (e) => {
//     const priority = e.target.value;
//     if (priority === "All") {
//       setFilteredIssues(issues);
//     } else {
//       setFilteredIssues(
//         issues.filter((issue) => issue.priority === priority)
//       );
//     }
//     setCurrentPage(1);
//   };

//   const filterByStatus = (e) => {
//     const status = e.target.value;
//     if (status === "All") {
//       setFilteredIssues(issues);
//     } else {
//       setFilteredIssues(
//         issues.filter((issue) => issue.issueStatus === status)
//       );
//     }
//     setCurrentPage(1);
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setFilteredIssues(
//       issues.filter(
//         (issue) =>
//           issue.issueTitle.toLowerCase().includes(query) ||
//           issue.issueDescription.toLowerCase().includes(query)
//       )
//     );
//     setCurrentPage(1);
//   };

//   const handleDelete = async (issueId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await deleteIssue(issueId);
//           const updatedIssues = issues.filter((issue) => issue._id !== issueId);
//           setIssues(updatedIssues);
//           const updatedFilteredIssues = filteredIssues.filter(
//             (issue) => issue._id !== issueId
//           );
//           setFilteredIssues(updatedFilteredIssues);

//           toast.success("Issue deleted successfully!", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } catch (error) {
//           console.error("Error deleting issue:", error.message);
//           toast.error(error.message || "Failed to delete issue");
//         }
//       }
//     });
//   };

//   const handleEdit = (issue) => {
//     setEditIssueData(issue);
//     setIsEditing(true);
//     setNewFiles([]);
//   };

//   const handleUpdate = async () => {
//     if (!editIssueData) return;

//     Swal.fire({
//       title: "Are you sure you want to update this issue?",
//       text: "Please review the changes before confirming.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, update it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const accessToken = localStorage.getItem("accessToken");
//           if (!accessToken) {
//             throw new Error("No access token found");
//           }

//           const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${editIssueData._id}`;

//           // Prepare form data for updating issue
//           const formData = new FormData();
//           formData.append("issueTitle", editIssueData.issueTitle);
//           formData.append("issueDescription", editIssueData.issueDescription);
//           formData.append("priority", editIssueData.priority);
//           formData.append("assignedTo", editIssueData.assignedTo);

//           // Append new files
//           newFiles.forEach((file) => formData.append("files", file));

//           const response = await axios.put(url, formData, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           if (response.data.success) {
//             const updatedIssue = response.data.data;
//             const updatedIssues = issues.map((issue) =>
//               issue._id === updatedIssue._id ? updatedIssue : issue
//             );
//             setIssues(updatedIssues);

//             const updatedFilteredIssues = filteredIssues.map((issue) =>
//               issue._id === updatedIssue._id ? updatedIssue : issue
//             );
//             setFilteredIssues(updatedFilteredIssues);

//             toast.success("Issue updated successfully!");
//             setIsEditing(false);
//             setEditIssueData(null);
//           } else {
//             throw new Error(response.data.message || "Failed to update issue");
//           }
//         } catch (error) {
//           console.error("Error updating issue:", error.message);
//           toast.error(error.message || "Failed to update issue");
//         }
//       }
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditIssueData({ ...editIssueData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewFiles([...newFiles, ...files]);
//   };

//   // Function to handle selecting an issue
//   const handleSelectIssue = (issue) => {
//     setSelectedIssue(issue);
//   };

//   return (
//     <div className="main">
//       <ToastContainer />
//       <div className="ems-content">
//         <div className="rzr-pv-task-emp-container">
//           <div className="all-head d-flex align-items-center justify-content-between mb-4">
//             <h4>Previous Issues</h4>
//           </div>
//           <div className="rzr-pv-task-emp-filters">
//             <div className="rzr-pv-task-emp-filterGroup">
//               <label htmlFor="priorityFilter">Filter by Priority: </label>
//               <select
//                 id="priorityFilter"
//                 onChange={filterByPriority}
//                 className="rzr-pv-task-emp-dropdown"
//               >
//                 <option value="All">All</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </div>
//             <div className="rzr-pv-task-emp-filterGroup">
//               <label htmlFor="statusFilter">Filter by Status: </label>
//               <select
//                 id="statusFilter"
//                 onChange={filterByStatus}
//                 className="rzr-pv-task-emp-dropdown"
//               >
//                 <option value="All">All</option>
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Resolved">Resolved</option>
//               </select>
//             </div>
//             <div className="search-filter d-flex align-items-center gap-3">
//               <form>
//                 <input
//                   className="form-control rzr-pv-task-emp-searchInput"
//                   type="text"
//                   placeholder="Search"
//                   onChange={handleSearch}
//                 />
//               </form>
//             </div>
//           </div>

//           {/* Table wrapper for responsiveness */}
//           <div className="rzr-pv-task-emp-table-wrapper">
//             <table className="rzr-pv-task-emp-table">
//               <thead>
//                 <tr>
//                   <th className="rzr-pv-task-emp-th">Serial No</th>
//                   <th className="rzr-pv-task-emp-th">Issue Title</th>
//                   <th className="rzr-pv-task-emp-th">Issue Date</th>
//                   <th className="rzr-pv-task-emp-th">Assigned To</th>
//                   <th className="rzr-pv-task-emp-th">Priority</th>
//                   <th className="rzr-pv-task-emp-th">Status</th>
//                   <th className="rzr-pv-task-emp-th">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentIssues.map((issue, index) => (
//                   <tr key={issue._id}>
//                     <td className="rzr-pv-task-emp-td">
//                       {indexOfFirstIssue + index + 1}
//                     </td>
//                     <td className="rzr-pv-task-emp-td">{issue.issueTitle}</td>
//                     <td className="rzr-pv-task-emp-td">
//                       {convertToIST(issue.createdAt)}
//                     </td>
//                     <td className="rzr-pv-task-emp-td">{issue.assignedTo}</td>
//                     <td className="rzr-pv-task-emp-td">{issue.priority}</td>
//                     <td className="rzr-pv-task-emp-td">{issue.issueStatus}</td>
//                     <td className="rzr-pv-task-emp-td">
//                       <button
//                         className="rzr-pv-task-emp-button"
//                         onClick={() =>
//                           showPopup(`Description: ${issue.issueDescription}`)
//                         }
//                       >
//                         View Description
//                       </button>
//                       <button
//                         className="rzr-pv-task-emp-button"
//                         onClick={() => handleSelectIssue(issue)} // New button handler
//                         style={{ marginLeft: "8px" }}
//                       >
//                         View Comments
//                       </button>
//                       <span
//                         className="p-2"
//                         onClick={() => handleEdit(issue)}
//                         style={{ cursor: "pointer", marginLeft: "8px" }}
//                       >
//                         {/* Edit SVG Icon */}
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           height="20"
//                           width="20"
//                           viewBox="0 0 512 512"
//                         >
//                           <path
//                             fill="#05941d"
//                             d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
//                           />
//                         </svg>
//                       </span>
//                       <span
//                         className="p-2"
//                         onClick={() => handleDelete(issue._id)}
//                         style={{ cursor: "pointer", marginLeft: "8px" }}
//                       >
//                         {/* Delete SVG Icon */}
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           height="20"
//                           width="17.5"
//                           viewBox="0 0 448 512"
//                         >
//                           <path
//                             fill="#b10606"
//                             d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
//                           />
//                         </svg>
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {currentIssues.length === 0 && (
//                   <tr>
//                     <td className="rzr-pv-task-emp-td" colSpan="7">
//                       No issues found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination Component */}
//         <Pagination
//           issuesPerPage={issuesPerPage}
//           totalIssues={filteredIssues.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       </div>

//       {/* Edit Issue Popup */}
//       {isEditing && editIssueData && (
//         <div className="rzr-pv-task-emp-popup">
//           <div className="rzr-pv-task-emp-popupContent">
//             <h3>Edit Issue</h3>
//             <input
//               type="text"
//               name="issueTitle"
//               value={editIssueData.issueTitle}
//               onChange={handleEditChange}
//               placeholder="Issue Title"
//               className="rzr-pv-task-emp-input"
//             />
//             <textarea
//               name="issueDescription"
//               value={editIssueData.issueDescription}
//               onChange={handleEditChange}
//               placeholder="Issue Description"
//               className="rzr-pv-task-emp-textarea"
//             />
//             <select
//               name="priority"
//               value={editIssueData.priority}
//               onChange={handleEditChange}
//               className="rzr-pv-task-emp-select"
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//             <div className="row-item">
//               <div className="form-group">
//                 <div className="form-input-wrapper">
//                   {isLoadingDepartments ? (
//                     <p>Loading departments...</p>
//                   ) : departmentsError ? (
//                     <p className="error">{departmentsError}</p>
//                   ) : (
//                     <select
//                       id="assignedTo"
//                       name="assignedTo"
//                       value={editIssueData.assignedTo}
//                       onChange={handleEditChange}
//                       required
//                       className="form-select"
//                     >
//                       <option value="" disabled>
//                         Select Department
//                       </option>
//                       {departments.map((dept) => (
//                         <option key={dept._id} value={dept.department}>
//                           {dept.department}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                   <label htmlFor="assignedTo" className="form-label">
//                     Select Department
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <input
//               type="file"
//               name="files"
//               onChange={handleFileChange}
//               className="rzr-pv-task-emp-input-file"
//               multiple
//             />
//             {newFiles.length > 0 && (
//               <div className="new-files">
//                 <h4>New Files to Upload:</h4>
//                 <ul>
//                   {newFiles.map((file, index) => (
//                     <li key={index}>{file.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div className="rzr-pv-task-emp-popupButtons">
//               <button
//                 onClick={handleUpdate}
//                 className="rzr-pv-task-emp-button update"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => {
//                   setIsEditing(false);
//                   setEditIssueData(null);
//                 }}
//                 className="rzr-pv-task-emp-button cancel"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Description Popup */}
//       {popupContent && (
//         <div className="razor-hcm-decp-emp-popup">
//           <div className="razor-hcm-decp-emp-popupContent">
//             <button
//               className="razor-hcm-decp-emp-closeButton"
//               onClick={closePopup}
//             >
//               &times;
//             </button>
//             <textarea className="razor-hcm-decp-emp-textarea" readOnly>
//               {popupContent}
//             </textarea>
//           </div>
//         </div>
//       )}

//       {/* Issue Details and Comments */}
//       {selectedIssue && (
//         <div className="issue-details">
//           <h3>{selectedIssue.issueTitle}</h3>
//           <p>{selectedIssue.issueDescription}</p>
//           <p>Priority: {selectedIssue.priority}</p>
//           <p>Assigned To: {selectedIssue.assignedTo}</p>
//           {/* Add more issue details as needed */}

//           {/* Comments Section */}
//           <Comments issueId={selectedIssue._id} />

//           {/* Close Issue Details */}
//           <button onClick={() => setSelectedIssue(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Pagination component remains unchanged

// const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav className="rzr-pv-task-emp-pagination">
//       <ul className="rzr-pv-task-emp-pagination-list">
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`rzr-pv-task-emp-pagination-item ${
//               currentPage === number ? "active" : ""
//             }`}
//           >
//             <button
//               onClick={() => paginate(number)}
//               className="rzr-pv-task-emp-pagination-link"
//             >
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default PreviousIssuesEmp;

// components/PreviousIssuesEmp.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comments from "./Comments"; // Ensure this component is properly implemented
import "./PreviousIssuesEmp.css";

const PreviousIssuesEmp = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupContent, setPopupContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIssueData, setEditIssueData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentsError, setDepartmentsError] = useState(null);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(true);
  const [newFiles, setNewFiles] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null); // For comments
  const issuesPerPage = 5;

  // Fetch issues on component mount
  useEffect(() => {
    const fetchIssuesData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found. Please log in.");
        }

        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/issues",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setIssues(response.data.data);
          setFilteredIssues(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch issues");
        }
      } catch (error) {
        console.error("Error fetching issues:", error.message);
        toast.error(error.message || "Failed to fetch issues");
      }
    };

    fetchIssuesData();
  }, []);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setDepartments(response.data.data);
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

  // Pagination calculations
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showPopup = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  const filterByPriority = (e) => {
    const priority = e.target.value;
    if (priority === "All") {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter((issue) => issue.priority === priority));
    }
    setCurrentPage(1);
  };

  const filterByStatus = (e) => {
    const status = e.target.value;
    if (status === "All") {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter((issue) => issue.issueStatus === status));
    }
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredIssues(
      issues.filter(
        (issue) =>
          issue.issueTitle.toLowerCase().includes(query) ||
          issue.issueDescription.toLowerCase().includes(query)
      )
    );
    setCurrentPage(1);
  };

  const handleDelete = async (issueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            throw new Error("No access token found. Please log in.");
          }

          await axios.delete(`https://apiv2.humanmaximizer.com/api/v1/issues/${issueId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });

          const updatedIssues = issues.filter((issue) => issue._id !== issueId);
          setIssues(updatedIssues);
          const updatedFilteredIssues = filteredIssues.filter(
            (issue) => issue._id !== issueId
          );
          setFilteredIssues(updatedFilteredIssues);

          toast.success("Issue deleted successfully!", {
            position: "top-center",
            autoClose: 5000,
          });
        } catch (error) {
          console.error("Error deleting issue:", error.message);
          toast.error(error.message || "Failed to delete issue");
        }
      }
    });
  };

  const handleEdit = (issue) => {
    setEditIssueData(issue);
    setIsEditing(true);
    setNewFiles([]);
  };

  const handleUpdate = async () => {
    if (!editIssueData) return;

    Swal.fire({
      title: "Are you sure you want to update this issue?",
      text: "Please review the changes before confirming.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          if (!accessToken) {
            throw new Error("No access token found. Please log in.");
          }

          const url = `https://apiv2.humanmaximizer.com/api/v1/issues/${editIssueData._id}`;

          // Prepare form data for updating issue
          const formData = new FormData();
          formData.append("issueTitle", editIssueData.issueTitle);
          formData.append("issueDescription", editIssueData.issueDescription);
          formData.append("priority", editIssueData.priority);
          formData.append("assignedTo", editIssueData.assignedTo);

          // Append new files
          newFiles.forEach((file) => formData.append("files", file));

          const response = await axios.put(url, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.success) {
            const updatedIssue = response.data.data;
            const updatedIssues = issues.map((issue) =>
              issue._id === updatedIssue._id ? updatedIssue : issue
            );
            setIssues(updatedIssues);

            const updatedFilteredIssues = filteredIssues.map((issue) =>
              issue._id === updatedIssue._id ? updatedIssue : issue
            );
            setFilteredIssues(updatedFilteredIssues);

            toast.success("Issue updated successfully!");
            setIsEditing(false);
            setEditIssueData(null);
          } else {
            throw new Error(response.data.message || "Failed to update issue");
          }
        } catch (error) {
          console.error("Error updating issue:", error.message);
          toast.error(error.message || "Failed to update issue");
        }
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditIssueData({ ...editIssueData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles([...newFiles, ...files]);
  };

  // Function to handle selecting an issue for comments
  const handleSelectIssue = (issue) => {
    setSelectedIssue(issue);
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="ems-content">
        <div className="rzr-pv-task-emp-container">
          <div className="all-head d-flex align-items-center justify-content-between mb-4">
            <h4>Previous Issues</h4>
          </div>
          <div className="rzr-pv-task-emp-filters">
            <div className="rzr-pv-task-emp-filterGroup">
              <label htmlFor="priorityFilter">Filter by Priority: </label>
              <select
                id="priorityFilter"
                onChange={filterByPriority}
                className="rzr-pv-task-emp-dropdown"
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="rzr-pv-task-emp-filterGroup">
              <label htmlFor="statusFilter">Filter by Status: </label>
              <select
                id="statusFilter"
                onChange={filterByStatus}
                className="rzr-pv-task-emp-dropdown"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="search-filter d-flex align-items-center gap-3">
              <form>
                <input
                  className="form-control rzr-pv-task-emp-searchInput"
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                />
              </form>
            </div>
          </div>

          {/* Table wrapper for responsiveness */}
          <div className="rzr-pv-task-emp-table-wrapper">
            <table className="rzr-pv-task-emp-table">
              <thead>
                <tr>
                  <th className="rzr-pv-task-emp-th">Serial No</th>
                  <th className="rzr-pv-task-emp-th">Issue Title</th>
                  <th className="rzr-pv-task-emp-th">Issue Date</th>
                  <th className="rzr-pv-task-emp-th">Assigned To</th>
                  <th className="rzr-pv-task-emp-th">Priority</th>
                  <th className="rzr-pv-task-emp-th">Status</th>
                  <th className="rzr-pv-task-emp-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentIssues.map((issue, index) => (
                  <tr key={issue._id}>
                    <td className="rzr-pv-task-emp-td">
                      {indexOfFirstIssue + index + 1}
                    </td>
                    <td className="rzr-pv-task-emp-td">{issue.issueTitle}</td>
                    <td className="rzr-pv-task-emp-td">
                      {new Date(issue.createdAt).toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className="rzr-pv-task-emp-td">{issue.assignedTo}</td>
                    <td className="rzr-pv-task-emp-td">{issue.priority}</td>
                    <td className="rzr-pv-task-emp-td">{issue.issueStatus}</td>
                    <td className="rzr-pv-task-emp-td">
                      <button
                        className="rzr-pv-task-emp-button"
                        onClick={() =>
                          showPopup(`Description: ${issue.issueDescription}`)
                        }
                      >
                        View Description
                      </button>
                      <button
                        className="rzr-pv-task-emp-button"
                        onClick={() => handleSelectIssue(issue)} // Open comments
                        style={{ marginLeft: "8px" }}
                      >
                        View Comments
                      </button>
                      <span
                        className="p-2"
                        onClick={() => handleEdit(issue)}
                        style={{ cursor: "pointer", marginLeft: "8px" }}
                      >
                        {/* Edit SVG Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="20"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="#05941d"
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                          />
                        </svg>
                      </span>
                      <span
                        className="p-2"
                        onClick={() => handleDelete(issue._id)}
                        style={{ cursor: "pointer", marginLeft: "8px" }}
                      >
                        {/* Delete SVG Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="17.5"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#b10606"
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                ))}
                {currentIssues.length === 0 && (
                  <tr>
                    <td className="rzr-pv-task-emp-td" colSpan="7">
                      No issues found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Component */}
        <Pagination
          issuesPerPage={issuesPerPage}
          totalIssues={filteredIssues.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {/* Edit Issue Popup */}
      {isEditing && editIssueData && (
        <div className="rzr-pv-task-emp-popup">
          <div className="rzr-pv-task-emp-popupContent">
            <h3>Edit Issue</h3>
            <input
              type="text"
              name="issueTitle"
              value={editIssueData.issueTitle}
              onChange={handleEditChange}
              placeholder="Issue Title"
              className="rzr-pv-task-emp-input"
            />
            <textarea
              name="issueDescription"
              value={editIssueData.issueDescription}
              onChange={handleEditChange}
              placeholder="Issue Description"
              className="rzr-pv-task-emp-textarea"
            />
            <select
              name="priority"
              value={editIssueData.priority}
              onChange={handleEditChange}
              className="rzr-pv-task-emp-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
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
                      value={editIssueData.assignedTo}
                      onChange={handleEditChange}
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
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              className="rzr-pv-task-emp-input-file"
              multiple
            />
            {newFiles.length > 0 && (
              <div className="new-files">
                <h4>New Files to Upload:</h4>
                <ul>
                  {newFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rzr-pv-task-emp-popupButtons">
              <button
                onClick={handleUpdate}
                className="rzr-pv-task-emp-button update"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditIssueData(null);
                }}
                className="rzr-pv-task-emp-button cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description Popup */}
      {popupContent && (
        <div className="razor-hcm-decp-emp-popup">
          <div className="razor-hcm-decp-emp-popupContent">
            <button
              className="razor-hcm-decp-emp-closeButton"
              onClick={closePopup}
            >
              &times;
            </button>
            <textarea className="razor-hcm-decp-emp-textarea" readOnly>
              {popupContent}
            </textarea>
          </div>
        </div>
      )}

      {/* Issue Details and Comments */}
      {selectedIssue && (
        <div className="issue-details">
          <h3>{selectedIssue.issueTitle}</h3>
          <p>{selectedIssue.issueDescription}</p>
          <p>Priority: {selectedIssue.priority}</p>
          <p>Assigned To: {selectedIssue.assignedTo}</p>
          {/* Add more issue details as needed */}

          {/* Comments Section */}
          <Comments issueId={selectedIssue._id} />

          {/* Close Issue Details */}
          <button onClick={() => setSelectedIssue(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

// Pagination component remains unchanged

const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="rzr-pv-task-emp-pagination">
      <ul className="rzr-pv-task-emp-pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`rzr-pv-task-emp-pagination-item ${
              currentPage === number ? "active" : ""
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className="rzr-pv-task-emp-pagination-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PreviousIssuesEmp;
