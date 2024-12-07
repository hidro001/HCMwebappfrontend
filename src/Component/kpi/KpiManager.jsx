// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // API URLs
// const API_URL = "https://apiv2.humanmaximizer.com/api/v1/superadmin";
// const KPI_API_URL = "https://apiv2.humanmaximizer.com/api/v1/admin/kpis";

// const PERFORMER_API_URL =
//   "https://apiv2.humanmaximizer.com/api/v1/admin/top-performer";
// const TOP_PERFORMERS_API_URL =
//   "https://apiv2.humanmaximizer.com/api/v1/admin/topperformerscore";
// const TEAM_API_URL =
//   "https://apiv2.humanmaximizer.com/api/v1/admin/team/team-list";

// const ActionTrackerAdmin2 = () => {
//   // State variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([{ name: "", weight: "" }]);
//   const [savedKpis, setSavedKpis] = useState([]); // To store fetched KPIs for the selected department
//   const [error, setError] = useState(null);
//   const [topPerformers, setTopPerformers] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editKpi, setEditKpi] = useState({ id: "", name: "", weight: "" });
//   const [isAddKpiFormVisible, setIsAddKpiFormVisible] = useState(false);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [performerOfTheMonth, setPerformerOfTheMonth] = useState({});
//   const [isPerformerPosted, setIsPerformerPosted] = useState(false);
//   const [selectedPerformerId, setSelectedPerformerId] = useState("");
//   const [teams, setTeams] = useState([]);
//   const [loadingTopPerformers, setLoadingTopPerformers] = useState(false);
//   const [performerDescription, setPerformerDescription] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   // Removed employeeToTeamMap as team name is directly available
//   const [selectedMonth, setSelectedMonth] = useState(
//     `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
//       2,
//       "0"
//     )}`
//   );

//   // Fetch departments dynamically from the API
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const employeeId = localStorage.getItem("employeeId");
//         const accessToken = localStorage.getItem("accessToken");

//         setLoading(true);
//         const response = await axios.get(
//           `${API_URL}/departmentAlocated/${employeeId}`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }
//         );

//         const validDepartments = response.data.departmentAlocated.filter(
//           (dept) => !dept.includes("[") && !dept.includes("]")
//         );
//         setDepartments(validDepartments);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//         setError("Failed to fetch departments.");
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs for the selected department
//   const fetchKpisForDepartment = async (department) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       const response = await axios.get(
//         `${KPI_API_URL}?department=${department}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       // Map each KPI to include the departmentKpiRecordId
//       const departmentKpis = response.data.data
//         .filter((item) => item.department === department)
//         .reduce((acc, item) => {
//           const departmentKpiRecordId = item._id; // The department KPI record ID
//           const kpisWithRecordId = item.kpis.map((kpi) => ({
//             ...kpi,
//             departmentKpiRecordId: departmentKpiRecordId,
//           }));
//           return acc.concat(kpisWithRecordId);
//         }, []);

//       setSavedKpis(departmentKpis); // Set the combined KPIs to state
//     } catch (error) {
//       console.error("Error fetching KPIs:", error);
//       toast.error("Failed to fetch KPIs for the department.");
//     }
//   };

//   // Fetch teams by department
//   const fetchTeamsByDepartment = async (department) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `${TEAM_API_URL}/?department=${department}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       const teamList = response.data.data || [];
//       setTeams(teamList);

//       // Since team members are not provided in the new API response, we skip mapping
//     } catch (error) {
//       console.error("Error fetching teams:", error);
//       setError(
//         error.response?.data?.message ||
//         "Failed to fetch teams for the selected department"
//       );
//     }
//   };

//   // Fetch top performers from the API
//   const fetchTopPerformers = async (department, month) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const [year, monthNum] = month.split("-");

//       setLoadingTopPerformers(true); // Start loading

//       const response = await axios.get(
//         `${TOP_PERFORMERS_API_URL}?department=${department}&month=${parseInt(
//           monthNum
//         )}&year=${parseInt(year)}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       setTopPerformers(response.data.data || []);
//       setLoadingTopPerformers(false); // End loading
//     } catch (error) {
//       console.error("Error fetching top performers:", error);
//       toast.error("Failed to fetch top performers.");
//       setTopPerformers([]); // Ensure topPerformers is empty on error
//       setLoadingTopPerformers(false); // End loading
//     }
//   };

//   const openPopup = async () => {
//     if (!selectedDepartment) {
//       toast.error("Please select a department first.");
//       return;
//     }

//     try {
//       await fetchTopPerformers(selectedDepartment, selectedMonth);
//       setIsPopupVisible(true);
//     } catch (error) {
//       console.error("Error opening popup:", error);
//       // Error handling is already managed in fetchTopPerformers
//     }
//   };

//   // Check if performer of the month has already been posted
//   const checkPerformerOfTheMonth = async (department, month) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const [year, monthNum] = month.split("-");

//       const response = await axios.get(
//         `${PERFORMER_API_URL}?department=${department}&month=${parseInt(
//           monthNum
//         )}&year=${parseInt(year)}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       if (response.data.data && response.data.data.length > 0) {
//         setIsPerformerPosted(true);
//         setPerformerOfTheMonth(response.data.data[0]);
//       } else {
//         setIsPerformerPosted(false);
//         setPerformerOfTheMonth({});
//       }
//     } catch (error) {
//       console.error("Error checking performer of the month:", error);
//       toast.error("Failed to check performer of the month.");
//     }
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e) => {
//     const department = e.target.value;
//     setSelectedDepartment(department);
//     setIsAddKpiFormVisible(false);
//     setKpis([{ name: "", weight: "" }]);
//     // Fetch teams for the selected department
//     fetchTeamsByDepartment(department);
//   };

//   // Handle month change
//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   // Fetch data when selectedDepartment or selectedMonth changes
//   useEffect(() => {
//     if (selectedDepartment) {
//       // Clear existing KPIs to avoid showing stale data
//       setSavedKpis([]);

//       // Reset top performers to prevent displaying old data
//       setTopPerformers([]);
//       setIsPerformerPosted(false);
//       setPerformerOfTheMonth({});
//       setSelectedPerformerId("");

//       // Fetch new KPIs for the selected department
//       fetchKpisForDepartment(selectedDepartment);

//       // Fetch top performers for the selected department and month
//       fetchTopPerformers(selectedDepartment, selectedMonth);

//       // Check if performer of the month has already been posted
//       checkPerformerOfTheMonth(selectedDepartment, selectedMonth);

//       // Fetch teams for the selected department
//       fetchTeamsByDepartment(selectedDepartment);
//     }
//   }, [selectedDepartment, selectedMonth]);

//   // Handle KPI input changes
//   const handleKpiChange = (index, field, value) => {
//     const newKpis = [...kpis];
//     newKpis[index][field] = value;
//     setKpis(newKpis);
//   };

//   // Add a new KPI field
//   const addKpi = () => {
//     setKpis([...kpis, { name: "", weight: "" }]);
//   };

//   const handleImageUpload = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setUploadedImage(e.target.files[0]); // Store the selected image file in state
//     }
//   };

//   // Remove a KPI field
//   const removeKpi = (index) => {
//     const newKpis = kpis.filter((_, i) => i !== index);
//     setKpis(newKpis);
//   };

//   // Handle form submission to post KPIs
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const totalWeight =
//       kpis.reduce((total, kpi) => total + parseFloat(kpi.weight || 0), 0) +
//       savedKpis.reduce((total, kpi) => total + parseFloat(kpi.weight || 0), 0);

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.post(
//         KPI_API_URL,
//         {
//           department: selectedDepartment,
//           kpis: kpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       toast.success("KPIs saved successfully");
//       setKpis([{ name: "", weight: "" }]);
//       setIsAddKpiFormVisible(false);
//       // Fetch updated KPIs
//       fetchKpisForDepartment(selectedDepartment);
//     } catch (error) {
//       console.error("Error saving KPIs:", error);
//       toast.error("Failed to save KPIs.");
//     }
//   };

//   // Delete a saved KPI by updating the department KPI record
//   // Delete a saved KPI by deleting the entire department KPI record
//   const deleteSavedKpi = async (departmentKpiRecordId, kpiId) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       await axios.delete(`${KPI_API_URL}/${departmentKpiRecordId}`, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       toast.success("KPI deleted successfully");
//       // Refresh KPIs after deletion
//       fetchKpisForDepartment(selectedDepartment);
//     } catch (error) {
//       console.error("Error deleting KPI:", error);
//       toast.error("Failed to delete KPI.");
//     }
//   };

//   // Edit a saved KPI
//   const editSavedKpi = (index) => {
//     const kpiToEdit = savedKpis[index]; // Get the correct KPI based on index
//     setEditIndex(index); // Store the index of the KPI being edited
//     setEditKpi({
//       id: kpiToEdit._id, // Use kpi._id as it's used in delete and update
//       name: kpiToEdit.name,
//       weight: kpiToEdit.weight,
//     });
//   };

//   // Handle changes in the edited KPI
//   const handleEditKpiChange = (field, value) => {
//     setEditKpi({ ...editKpi, [field]: value });
//   };

//   // Save the edited KPI
//   const saveKpiEdit = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       // Get the departmentKpiRecordId from the KPI to be edited
//       const departmentKpiRecordId = savedKpis[editIndex].departmentKpiRecordId;

//       // Create an updated KPI array with the modified KPI at the editIndex
//       const updatedKpis = savedKpis.map((kpi, index) =>
//         index === editIndex
//           ? { ...kpi, name: editKpi.name, weight: editKpi.weight }
//           : kpi
//       );

//       // Calculate total weight
//       const totalWeight = updatedKpis.reduce(
//         (total, kpi) => total + parseFloat(kpi.weight || 0),
//         0
//       );

//       if (totalWeight !== 100) {
//         toast.error("Total weight must be exactly 100%");
//         return;
//       }

//       // Send the updated KPI array to the server
//       await axios.put(
//         `${KPI_API_URL}/${departmentKpiRecordId}`,
//         {
//           kpis: updatedKpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI updated successfully");
//       setEditIndex(null); // Clear the editing index
//       setEditKpi({ id: "", name: "", weight: "" }); // Reset the form

//       // Fetch the updated KPIs to reflect the changes in the UI
//       fetchKpisForDepartment(selectedDepartment);
//     } catch (error) {
//       console.error("Error updating KPI:", error);
//       toast.error("Failed to update KPI.");
//     }
//   };

//   // Cancel KPI edit
//   const cancelKpiEdit = () => {
//     setEditIndex(null);
//     setEditKpi({ id: "", name: "", weight: "" });
//   };

//   // Get total weight of all KPIs (saved and new)
//   const getTotalWeight = () => {
//     let total = savedKpis.reduce(
//       (sum, kpi) => sum + parseFloat(kpi.weight || 0),
//       0
//     );
//     total += kpis.reduce((sum, kpi) => sum + parseFloat(kpi.weight || 0), 0);
//     return total;
//   };

//   // Handle performer selection
//   const handlePerformerSelection = (e) => {
//     setSelectedPerformerId(e.target.value);
//   };

//   // Post performer of the month
//   const postPerformerOfTheMonth = async () => {
//     if (!selectedPerformerId) {
//       toast.error("Please select a performer.");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const selectedPerformer = topPerformers.find(
//         (performer) => performer.topPerformer.emp_Id === selectedPerformerId
//       );

//       if (!selectedPerformer) {
//         toast.error("Selected performer not found.");
//         return;
//       }

//       // Extract team from the top-level 'team' field
//       const team = selectedPerformer.team || "N/A";

//       // Extract full name and handle 'undefined undefined'
//       const fullName =
//         selectedPerformer.topPerformer.full_Name &&
//           selectedPerformer.topPerformer.full_Name.trim() !==
//           "undefined undefined"
//           ? selectedPerformer.topPerformer.full_Name
//           : "N/A";

//       const formData = new FormData();
//       formData.append("empId", selectedPerformer.topPerformer.emp_Id);
//       formData.append("fullName", fullName);
//       formData.append("department", selectedDepartment);
//       formData.append("team", team);

//       if (performerDescription) {
//         formData.append("description", performerDescription);
//       }

//       if (uploadedImage) {
//         formData.append("image", uploadedImage); // Attach image file if provided
//       }

//       const response = await axios.post(PERFORMER_API_URL, formData, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data.success) {
//         toast.success("Performer of the Month posted successfully.");
//         setIsPerformerPosted(true);
//         setPerformerOfTheMonth({
//           ...selectedPerformer,
//           description: performerDescription,
//         });
//         setIsPopupVisible(false); // Close the popup

//         // Optionally, you can refresh the top performers or perform other actions here
//         // For example:
//         // fetchTopPerformers(selectedDepartment, selectedMonth);
//       } else {
//         toast.error(
//           response.data.message || "Failed to post Performer of the Month."
//         );
//       }
//     } catch (error) {
//       console.error("Error posting Performer of the Month:", error);
//       toast.error(
//         error.response?.data?.message ||
//         "Failed to post Performer of the Month."
//       );
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">

//           <div className="rzr-hm-review-mgmt2">
//             <h2 className="rzr-hm-review-heading">Set KPIs for Department</h2>
//             {error && <p className="rzr-hm-review-error">{error}</p>}

//             {/* Department Selection */}
//             <div className="rzr-hm-review-formGroup">
//               <label>Select Department:</label>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 disabled={loading}
//                 className="rzr-hm-review-select"
//               >
//                 <option value="">--Select Department--</option>
//                 {departments.map((dept, index) => (
//                   <option key={index} value={dept}>
//                     {dept}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {selectedDepartment && (
//               <>
//                 {/* Existing KPIs */}
//                 {savedKpis.length > 0 ? (
//                   <div className="rzr-hm-review-kpi-section">
//                     <h3>KPIs for {selectedDepartment}</h3>
//                     <table className="rzr-hm-review-kpi-table">
//                       <thead>
//                         <tr>
//                           <th>KPI Name</th>
//                           <th>Weight (%)</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {savedKpis.map((kpi, index) => (
//                           <tr key={kpi._id}>
//                             {editIndex === index ? (
//                               <>
//                                 <td>
//                                   <input
//                                     type="text"
//                                     value={editKpi.name}
//                                     onChange={(e) => handleEditKpiChange("name", e.target.value)}
//                                     className="rzr-hm-review-input"
//                                   />
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="number"
//                                     value={editKpi.weight}
//                                     onChange={(e) => handleEditKpiChange("weight", e.target.value)}
//                                     className="rzr-hm-review-input"
//                                   />
//                                 </td>
//                                 <td>
//                                   <button onClick={saveKpiEdit} className="rzr-hm-review-saveButton">Save</button>
//                                   <button onClick={cancelKpiEdit} className="rzr-hm-review-cancelButton">Cancel</button>
//                                 </td>
//                               </>
//                             ) : (
//                               <>
//                                 <td>{kpi.name}</td>
//                                 <td>{kpi.weight}</td>
//                                 <td>
//                                   <div className="d-flex justify-content-center">
//                                     <button onClick={() => editSavedKpi(index)} className="rzr-hm-review-editButton">
//                                       Edit
//                                     </button>
//                                     <button onClick={() => deleteSavedKpi(kpi.departmentKpiRecordId, kpi._id)} className="rzr-hm-review-removeButton">
//                                       Delete
//                                     </button>
//                                   </div>
//                                 </td>

//                               </>
//                             )}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                     <p className="rzr-hm-review-totalWeight" style={{ color: getTotalWeight() === 100 ? 'green' : 'red' }}>
//                       Total Weight: {getTotalWeight()}%
//                     </p>
//                     {getTotalWeight() < 100 && (
//                       <button onClick={() => setIsAddKpiFormVisible(true)} className="rzr-hm-review-addButton">Add KPI</button>
//                     )}
//                   </div>
//                 ) : (
//                   <div>
//                     <p>No KPIs defined for this department.</p>
//                     <button onClick={() => setIsAddKpiFormVisible(true)} className="rzr-hm-review-addButton">Add KPI</button>
//                   </div>
//                 )}

//                 {/* Add KPI Form */}
//                 {isAddKpiFormVisible && (
//                   <form onSubmit={handleSubmit} className="rzr-hm-review-form">
//                     <h3 className="rzr-hm-review-subHeading">
//                       {savedKpis.length > 0
//                         ? `Add more KPIs for ${selectedDepartment}`
//                         : `Define KPIs for ${selectedDepartment}`}
//                     </h3>
//                     {kpis.map((kpi, index) => (
//                       <div key={index} className="rzr-hm-review-kpiRow">
//                         <input
//                           type="text"
//                           placeholder="KPI Name"
//                           value={kpi.name}
//                           onChange={(e) => handleKpiChange(index, "name", e.target.value)}
//                           className="rzr-hm-review-input"
//                           required
//                         />
//                         <input
//                           type="number"
//                           placeholder="Weight (%)"
//                           value={kpi.weight}
//                           onChange={(e) => handleKpiChange(index, "weight", e.target.value)}
//                           className="rzr-hm-review-input"
//                           required
//                         />
//                         {kpis.length > 1 && (
//                           <button type="button" onClick={() => removeKpi(index)} className="rzr-hm-review-removeButton">
//                             <i className="fas fa-trash-alt"></i> Remove
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <p className="rzr-hm-review-totalWeight" style={{ color: getTotalWeight() === 100 ? 'green' : 'red' }}>
//                       Total Weight: {getTotalWeight()}%
//                     </p>
//                     <button type="button" onClick={addKpi} className="rzr-hm-review-addButton">Add KPI</button>
//                     <div className="rzr-hm-review-buttonGroup">
//                       <button type="submit" className="rzr-hm-review-submitButton" disabled={getTotalWeight() !== 100}>
//                         Save KPIs
//                       </button>
//                       <button type="button" onClick={() => setIsAddKpiFormVisible(false)} className="rzr-hm-review-cancelButton">
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 )}

//                 {/* Month Picker */}
//                 <div className="rzr-hm-review-formGroup">
//                   <label>Select Month:</label>
//                   <input
//                     type="month"
//                     value={selectedMonth}
//                     onChange={handleMonthChange}
//                     className="rzr-hm-review-select"
//                   />
//                 </div>

//                 {/* Top Performers Section */}
//                 {loadingTopPerformers ? (
//                   <p>Loading top performers...</p>
//                 ) : topPerformers.length > 0 ? (
//                   <div className="rzr-hm-review-top-performers">
//                     <h3>Top Performers in {selectedDepartment}</h3>
//                     <table className="rzr-hm-review-performers-table">
//                       <thead>
//                         <tr>
//                           <th>Employee</th>
//                           <th>Team</th>
//                           <th>Total Score</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {topPerformers.map((performer, index) => (
//                           <tr key={performer.topPerformer.emp_Id || index}>
//                             <td>{performer.topPerformer.full_Name}</td>
//                             <td>{performer.team || '-'}</td>
//                             <td>{performer.topPerformer.totalScore || '-'}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p>No top performers found for the selected month.</p>
//                 )}

//                 {/* Post Performer of the Month */}
//                 {!isPerformerPosted && topPerformers.length > 0 && (
//                   <div>
//                     <button onClick={() => setIsPopupVisible(true)} className="rzr-hm-review-addButton">Post Performer of the Month</button>
//                   </div>
//                 )}

//                 {/* Performer of the Month Popup */}
//                 {isPopupVisible && (
//                   <div className="rzr-hm-review-popupOverlay">
//                     <div className="rzr-hm-review-popupContent">
//                       <h3>Select Performer of the Month</h3>
//                       <div className="rzr-hm-review-performerList">
//                         <select
//                           value={selectedPerformerId}
//                           onChange={handlePerformerSelection}
//                           className="rzr-hm-review-select"
//                         >
//                           <option value="">--Select Performer--</option>
//                           {topPerformers.map((performer) => (
//                             <option
//                               key={performer.topPerformer.emp_Id}
//                               value={performer.topPerformer.emp_Id}
//                             >
//                               {performer.topPerformer.full_Name} - Score: {performer.topPerformer.totalScore || '-'}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Description Input */}
//                       <div className="rzr-hm-review-formGroup">
//                         <label>Description (optional):</label>
//                         <textarea
//                           value={performerDescription}
//                           onChange={(e) => setPerformerDescription(e.target.value)}
//                           className="rzr-hm-review-textarea"
//                           placeholder="Write a description for the performer"
//                         />
//                       </div>

//                       {/* Image Upload */}
//                       <div className="rzr-hm-review-formGroup">
//                         <label>Upload Image (optional):</label>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageUpload}
//                           className="rzr-hm-review-inputFile"
//                         />
//                       </div>

//                       <div className="rzr-hm-review-popupButtons">
//                         <button
//                           onClick={postPerformerOfTheMonth}
//                           className="rzr-hm-review-submitButton"
//                           disabled={!selectedPerformerId}
//                         >
//                           Post
//                         </button>
//                         <button onClick={() => setIsPopupVisible(false)} className="rzr-hm-review-cancelButton">Cancel</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//             <ToastContainer />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionTrackerAdmin2;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing React Icons

// const ActionTrackerAdmin2 = () => {
//   // State variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([{ name: "", weight: "" }]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for displaying saved KPIs
//   const [savedKpis, setSavedKpis] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentKpi, setCurrentKpi] = useState({ name: "", weight: "" });
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch departments from API on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//         );
//         setDepartments(response.data.data); // Corrected to extract the array
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError("Failed to fetch departments.");
//         setLoading(false);
//         toast.error("Failed to fetch departments.");
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch saved KPIs for a department
//   const fetchSavedKpis = async (department) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `https://apiv2.humanmaximizer.com/api/v1/admin/kpis?department=${department}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       setSavedKpis(response.data.kpis); // Adjust based on your API response
//     } catch (err) {
//       console.error("Error fetching saved KPIs:", err);
//       toast.error("Failed to fetch saved KPIs.");
//     }
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e) => {
//     const department = e.target.value;
//     setSelectedDepartment(department);
//     setIsKpiFormVisible(false);
//     setKpis([{ name: "", weight: "" }]);
//     setSavedKpis([]);
//     setIsEditing(false);
//     setCurrentKpi({ name: "", weight: "" });
//     setEditIndex(null);

//     if (department) {
//       fetchSavedKpis(department);
//     }
//   };

//   // Handle KPI input changes
//   const handleKpiChange = (index, field, value) => {
//     const newKpis = [...kpis];
//     newKpis[index][field] = value;
//     setKpis(newKpis);
//   };

//   // Add a new KPI field
//   const addKpi = () => {
//     setKpis([...kpis, { name: "", weight: "" }]);
//   };

//   // Remove a KPI field
//   const removeKpi = (index) => {
//     const newKpis = kpis.filter((_, i) => i !== index);
//     setKpis(newKpis);
//   };

//   // Calculate total weight (including saved KPIs)
//   const getTotalWeight = () => {
//     const savedTotal = savedKpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     const newTotal = kpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     return savedTotal + newTotal;
//   };

//   // Handle form submission to save KPIs
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const totalWeight = getTotalWeight();

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     // Prepare KPI data
//     const formattedKpis = kpis.map((kpi) => ({
//       name: kpi.name,
//       weight: parseFloat(kpi.weight),
//     }));

//     try {
//       const accessToken = localStorage.getItem("accessToken"); // Adjust if needed

//       await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/admin/kpis", // Adjust endpoint as necessary
//         {
//           department: selectedDepartment,
//           kpis: formattedKpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPIs saved successfully");
//       setIsKpiFormVisible(false);
//       setKpis([{ name: "", weight: "" }]);
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error saving KPIs:", err);
//       toast.error("Failed to save KPIs.");
//     }
//   };

//   // Handle Edit Click
//   const handleEditClick = (index) => {
//     setIsEditing(true);
//     setEditIndex(index);
//     setCurrentKpi({ ...savedKpis[index] });
//   };

//   // Handle Edit Change
//   const handleEditChange = (field, value) => {
//     setCurrentKpi({ ...currentKpi, [field]: value });
//   };

//   // Save Edited KPI
//   const handleSaveEdit = async (e) => {
//     e.preventDefault();

//     // Calculate new total weight
//     const totalWeight =
//       getTotalWeight() - parseFloat(savedKpis[editIndex].weight || 0) +
//       parseFloat(currentKpi.weight || 0);

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const kpiId = savedKpis[editIndex]._id;

//       await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/admin/kpis/${kpiId}`, // Adjust endpoint
//         {
//           name: currentKpi.name,
//           weight: parseFloat(currentKpi.weight),
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI updated successfully");
//       setIsEditing(false);
//       setEditIndex(null);
//       setCurrentKpi({ name: "", weight: "" });
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error updating KPI:", err);
//       toast.error("Failed to update KPI.");
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditIndex(null);
//     setCurrentKpi({ name: "", weight: "" });
//   };

//   // Handle Delete KPI
//   const handleDeleteKpi = async (kpiId) => {
//     if (!window.confirm("Are you sure you want to delete this KPI?")) return;

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://apiv2.humanmaximizer.com/api/v1/admin/kpis/${kpiId}`, // Adjust endpoint
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI deleted successfully");
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error deleting KPI:", err);
//       toast.error("Failed to delete KPI.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <div className="rzr-hm-review-mgmt2">
//             <h2 className="rzr-hm-review-heading">Set KPIs for Department</h2>
//             {error && <p className="rzr-hm-review-error">{error}</p>}

//             {/* Department Selection */}
//             <div className="rzr-hm-review-formGroup">
//               <label>Select Department:</label>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 disabled={loading}
//                 className="rzr-hm-review-select"
//               >
//                 <option value="">--Select Department--</option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept.department}>
//                     {dept.department}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Display Saved KPIs */}
//             {selectedDepartment && savedKpis.length > 0 && (
//               <div className="saved-kpis">
//                 <h3>Saved KPIs for {selectedDepartment}</h3>
//                 <table className="saved-kpi-table">
//                   <thead>
//                     <tr>
//                       <th>KPI Name</th>
//                       <th>Weight (%)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {savedKpis.map((kpi, index) => (
//                       <tr key={kpi._id}>
//                         <td>{kpi.name}</td>
//                         <td>{kpi.weight}</td>
//                         <td>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="edit-button"
//                             aria-label="Edit KPI"
//                           >
//                             <FaEdit /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteKpi(kpi._id)}
//                             className="remove-button"
//                             aria-label="Remove KPI"
//                           >
//                             <FaTrashAlt /> Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Add KPI Button */}
//             {selectedDepartment && (
//               <div>
//                 <button
//                   onClick={() => setIsKpiFormVisible(true)}
//                   className="rzr-hm-review-addButton"
//                 >
//                   Add KPI
//                 </button>
//               </div>
//             )}

//             {/* Add KPI Form */}
//             {isKpiFormVisible && (
//               <form onSubmit={handleSubmit} className="rzr-hm-review-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Add KPIs for {selectedDepartment}
//                 </h3>
//                 {kpis.map((kpi, index) => (
//                   <div key={index} className="rzr-hm-review-kpiRow">
//                     <input
//                       type="text"
//                       placeholder="KPI Name"
//                       value={kpi.name}
//                       onChange={(e) =>
//                         handleKpiChange(index, "name", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Weight (%)"
//                       value={kpi.weight}
//                       onChange={(e) =>
//                         handleKpiChange(index, "weight", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                       min="0"
//                       max="100"
//                       step="0.01"
//                     />
//                     {kpis.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeKpi(index)}
//                         className="rzr-hm-review-removeButton"
//                         aria-label="Remove KPI"
//                       >
//                         <FaTrashAlt /> Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <p
//                   className="rzr-hm-review-totalWeight"
//                   style={{
//                     color: getTotalWeight() === 100 ? "green" : "red",
//                   }}
//                 >
//                   Total Weight: {getTotalWeight()}%
//                 </p>
//                 {getTotalWeight() < 100 && (
//                   <button
//                     type="button"
//                     onClick={addKpi}
//                     className="rzr-hm-review-addButton"
//                   >
//                     Add Another KPI
//                   </button>
//                 )}
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save KPIs
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsKpiFormVisible(false)}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Edit KPI Form */}
//             {isEditing && (
//               <form onSubmit={handleSaveEdit} className="edit-kpi-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Edit KPI for {selectedDepartment}
//                 </h3>
//                 <div className="rzr-hm-review-kpiRow">
//                   <input
//                     type="text"
//                     placeholder="KPI Name"
//                     value={currentKpi.name}
//                     onChange={(e) => handleEditChange("name", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                   />
//                   <input
//                     type="number"
//                     placeholder="Weight (%)"
//                     value={currentKpi.weight}
//                     onChange={(e) => handleEditChange("weight", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                     min="0"
//                     max="100"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionTrackerAdmin2;

//   import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing React Icons

// const ActionTrackerAdmin2 = () => {
//   // State variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([{ name: "", weight: "" }]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for displaying saved KPIs
//   const [savedKpis, setSavedKpis] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentKpi, setCurrentKpi] = useState({ name: "", weight: "" });
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch departments from API on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//         );
//         setDepartments(response.data.data); // Corrected to extract the array
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError("Failed to fetch departments.");
//         setLoading(false);
//         toast.error("Failed to fetch departments.");
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch saved KPIs for a department
//   const fetchSavedKpis = async (department) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis?department=${department}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       // Check if the response has data and at least one department object
//       if (response.data.data && response.data.data.length > 0) {
//         const departmentData = response.data.data[0];
//         setSavedKpis(departmentData.kpis || []);
//       } else {
//         // No KPIs found for the selected department
//         setSavedKpis([]);
//       }
//     } catch (err) {
//       console.error("Error fetching saved KPIs:", err);
//       toast.error("Failed to fetch saved KPIs.");
//     }
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e) => {
//     const department = e.target.value;
//     setSelectedDepartment(department);
//     setIsKpiFormVisible(false);
//     setKpis([{ name: "", weight: "" }]);
//     setSavedKpis([]);
//     setIsEditing(false);
//     setCurrentKpi({ name: "", weight: "" });
//     setEditIndex(null);

//     if (department) {
//       fetchSavedKpis(department);
//     }
//   };

//   // Handle KPI input changes
//   const handleKpiChange = (index, field, value) => {
//     const newKpis = [...kpis];
//     newKpis[index][field] = value;
//     setKpis(newKpis);
//   };

//   // Add a new KPI field
//   const addKpi = () => {
//     setKpis([...kpis, { name: "", weight: "" }]);
//   };

//   // Remove a KPI field
//   const removeKpi = (index) => {
//     const newKpis = kpis.filter((_, i) => i !== index);
//     setKpis(newKpis);
//   };

//   // Calculate total weight (including saved KPIs)
//   const getTotalWeight = () => {
//     const savedTotal = savedKpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     const newTotal = kpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     return savedTotal + newTotal;
//   };

//   // Handle form submission to save KPIs
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const totalWeight = getTotalWeight();

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     // Prepare KPI data
//     const formattedKpis = kpis.map((kpi) => ({
//       name: kpi.name,
//       weight: parseFloat(kpi.weight),
//     }));

//     try {
//       const accessToken = localStorage.getItem("accessToken"); // Adjust if needed

//       await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/kpi/kpis", // Adjust endpoint as necessary
//         {
//           department: selectedDepartment,
//           kpis: formattedKpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPIs saved successfully");
//       setIsKpiFormVisible(false);
//       setKpis([{ name: "", weight: "" }]);
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error saving KPIs:", err);
//       toast.error("Failed to save KPIs.");
//     }
//   };

//   // Handle Edit Click
//   const handleEditClick = (index) => {
//     setIsEditing(true);
//     setEditIndex(index);
//     setCurrentKpi({ ...savedKpis[index] });
//   };

//   // Handle Edit Change
//   const handleEditChange = (field, value) => {
//     setCurrentKpi({ ...currentKpi, [field]: value });
//   };

//   // Save Edited KPI
//   const handleSaveEdit = async (e) => {
//     e.preventDefault();

//     // Calculate new total weight
//     const totalWeight =
//       getTotalWeight() -
//       parseFloat(savedKpis[editIndex].weight || 0) +
//       parseFloat(currentKpi.weight || 0);

//     // if (totalWeight !== 100) {
//     //   toast.error("Total weight must be exactly 100%");
//     //   return;
//     // }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const kpiId = savedKpis[editIndex]._id;

//       await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpisss/${kpiId}`, // Adjust endpoint
//         {
//           name: currentKpi.name,
//           weight: parseFloat(currentKpi.weight),
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI updated successfully");
//       setIsEditing(false);
//       setEditIndex(null);
//       setCurrentKpi({ name: "", weight: "" });
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error updating KPI:", err);
//       toast.error("Failed to update KPI.");
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditIndex(null);
//     setCurrentKpi({ name: "", weight: "" });
//   };

//   // Handle Delete KPI
//   const handleDeleteKpi = async (kpiId) => {
//     if (!window.confirm("Are you sure you want to delete this KPI?")) return;

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis/${kpiId}`, // Adjust endpoint
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI deleted successfully");
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error deleting KPI:", err);
//       toast.error("Failed to delete KPI.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <div className="rzr-hm-review-mgmt2">
//             <h2 className="rzr-hm-review-heading">Set KPIs for Department</h2>
//             {error && <p className="rzr-hm-review-error">{error}</p>}

//             {/* Department Selection */}
//             <div className="rzr-hm-review-formGroup">
//               <label>Select Department:</label>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 disabled={loading}
//                 className="rzr-hm-review-select"
//               >
//                 <option value="">--Select Department--</option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept.department}>
//                     {dept.department}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Display Saved KPIs */}
//             {selectedDepartment && savedKpis.length > 0 && (
//               <div className="saved-kpis">
//                 <h3>Saved KPIs for {selectedDepartment}</h3>
//                 <table className="saved-kpi-table">
//                   <thead>
//                     <tr>
//                       <th>KPI Name</th>
//                       <th>Weight (%)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {savedKpis.map((kpi, index) => (
//                       <tr key={kpi._id}>
//                         <td>{kpi.name}</td>
//                         <td>{kpi.weight}</td>
//                         <td>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="edit-button"
//                             aria-label="Edit KPI"
//                           >
//                             <FaEdit /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteKpi(kpi._id)}
//                             className="remove-button"
//                             aria-label="Remove KPI"
//                           >
//                             <FaTrashAlt /> Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Add KPI Button */}
//             {selectedDepartment && (
//               <div>
//                 <button
//                   onClick={() => setIsKpiFormVisible(true)}
//                   className="rzr-hm-review-addButton"
//                 >
//                   Add KPI
//                 </button>
//               </div>
//             )}

//             {/* Add KPI Form */}
//             {isKpiFormVisible && (
//               <form onSubmit={handleSubmit} className="rzr-hm-review-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Add KPIs for {selectedDepartment}
//                 </h3>
//                 {kpis.map((kpi, index) => (
//                   <div key={index} className="rzr-hm-review-kpiRow">
//                     <input
//                       type="text"
//                       placeholder="KPI Name"
//                       value={kpi.name}
//                       onChange={(e) =>
//                         handleKpiChange(index, "name", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Weight (%)"
//                       value={kpi.weight}
//                       onChange={(e) =>
//                         handleKpiChange(index, "weight", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                       min="0"
//                       max="100"
//                       step="0.01"
//                     />
//                     {kpis.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeKpi(index)}
//                         className="rzr-hm-review-removeButton"
//                         aria-label="Remove KPI"
//                       >
//                         <FaTrashAlt /> Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <p
//                   className="rzr-hm-review-totalWeight"
//                   style={{
//                     color: getTotalWeight() === 100 ? "green" : "red",
//                   }}
//                 >
//                   Total Weight: {getTotalWeight()}%
//                 </p>
//                 {getTotalWeight() < 100 && (
//                   <button
//                     type="button"
//                     onClick={addKpi}
//                     className="rzr-hm-review-addButton"
//                   >
//                     Add Another KPI
//                   </button>
//                 )}
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save KPIs
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsKpiFormVisible(false)}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Edit KPI Form */}
//             {isEditing && (
//               <form onSubmit={handleSaveEdit} className="edit-kpi-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Edit KPI for {selectedDepartment}
//                 </h3>
//                 <div className="rzr-hm-review-kpiRow">
//                   <input
//                     type="text"
//                     placeholder="KPI Name"
//                     value={currentKpi.name}
//                     onChange={(e) => handleEditChange("name", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                   />
//                   <input
//                     type="number"
//                     placeholder="Weight (%)"
//                     value={currentKpi.weight}
//                     onChange={(e) => handleEditChange("weight", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                     min="0"
//                     max="100"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionTrackerAdmin2;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing React Icons

// const ActionTrackerAdmin2 = () => {
//   // State variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([{ name: "", weight: "" }]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [loadingDepartments, setLoadingDepartments] = useState(false);
//   const [error, setError] = useState(null);

//   // State for displaying saved KPIs
//   const [savedKpis, setSavedKpis] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentKpi, setCurrentKpi] = useState({ name: "", weight: "" });
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch departments from API on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoadingDepartments(true);
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//         );
//         setDepartments(response.data.data); // Ensure this is an array of departments
//         setLoadingDepartments(false);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError("Failed to fetch departments.");
//         setLoadingDepartments(false);
//         toast.error("Failed to fetch departments.");
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch saved KPIs for a department
//   const fetchSavedKpis = async (departmentId) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis?department=${departmentId}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       // Directly set savedKpis to the array of KPI objects
//       setSavedKpis(response.data.data || []);
//     } catch (err) {
//       console.error("Error fetching saved KPIs:", err);
//       toast.error("Failed to fetch saved KPIs.");
//     }
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e) => {
//     const departmentId = e.target.value;
//     setSelectedDepartment(departmentId);
//     setIsKpiFormVisible(false);
//     setKpis([{ name: "", weight: "" }]);
//     setSavedKpis([]);
//     setIsEditing(false);
//     setCurrentKpi({ name: "", weight: "" });
//     setEditIndex(null);

//     if (departmentId) {
//       fetchSavedKpis(departmentId);
//     }
//   };

//   // Handle KPI input changes
//   const handleKpiChange = (index, field, value) => {
//     const newKpis = [...kpis];
//     newKpis[index][field] = value;
//     setKpis(newKpis);
//   };

//   // Add a new KPI field
//   const addKpi = () => {
//     setKpis([...kpis, { name: "", weight: "" }]);
//   };

//   // Remove a KPI field
//   const removeKpi = (index) => {
//     const newKpis = kpis.filter((_, i) => i !== index);
//     setKpis(newKpis);
//   };

//   // Calculate total weight (including saved KPIs)
//   const getTotalWeight = () => {
//     const savedTotal = savedKpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     const newTotal = kpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     return savedTotal + newTotal;
//   };

//   // Handle form submission to save KPIs
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const totalWeight = getTotalWeight();

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     // Prepare KPI data
//     const formattedKpis = kpis.map((kpi) => ({
//       name: kpi.name,
//       weight: parseFloat(kpi.weight),
//     }));

//     try {
//       const accessToken = localStorage.getItem("accessToken"); // Ensure this token exists

//       await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/kpi/kpis", // Ensure this endpoint is correct
//         {
//           department: selectedDepartment, // This should be the department ID
//           kpis: formattedKpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPIs saved successfully");
//       setIsKpiFormVisible(false);
//       setKpis([{ name: "", weight: "" }]);
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error saving KPIs:", err);
//       toast.error("Failed to save KPIs.");
//     }
//   };

//   // Handle Edit Click
//   const handleEditClick = (index) => {
//     setIsEditing(true);
//     setEditIndex(index);
//     setCurrentKpi({ ...savedKpis[index] });
//   };

//   // Handle Edit Change
//   const handleEditChange = (field, value) => {
//     setCurrentKpi({ ...currentKpi, [field]: value });
//   };

//   // Save Edited KPI
//   const handleSaveEdit = async (e) => {
//     e.preventDefault();

//     // Calculate new total weight
//     const totalWeight =
//       getTotalWeight() -
//       parseFloat(savedKpis[editIndex].weight || 0) +
//       parseFloat(currentKpi.weight || 0);

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const kpiId = savedKpis[editIndex]._id;

//       await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis/${kpiId}`, // Corrected endpoint
//         {
//           name: currentKpi.name,
//           weight: parseFloat(currentKpi.weight),
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI updated successfully");
//       setIsEditing(false);
//       setEditIndex(null);
//       setCurrentKpi({ name: "", weight: "" });
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error updating KPI:", err);
//       toast.error("Failed to update KPI.");
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditIndex(null);
//     setCurrentKpi({ name: "", weight: "" });
//   };

//   // Handle Delete KPI
//   const handleDeleteKpi = async (kpiId) => {
//     if (!window.confirm("Are you sure you want to delete this KPI?")) return;

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis/${kpiId}`, // Ensure this endpoint is correct
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       toast.success("KPI deleted successfully");
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error deleting KPI:", err);
//       toast.error("Failed to delete KPI.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <div className="rzr-hm-review-mgmt2">
//             <h2 className="rzr-hm-review-heading">Set KPIs for Department</h2>
//             {error && <p className="rzr-hm-review-error">{error}</p>}

//             {/* Department Selection */}
//             <div className="rzr-hm-review-formGroup">
//               <label>Select Department:</label>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 disabled={loadingDepartments}
//                 className="rzr-hm-review-select"
//               >
//                 <option value="">--Select Department--</option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept._id}> {/* Use dept._id as value */}
//                     {dept.department}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Display Saved KPIs */}
//             {selectedDepartment && savedKpis.length > 0 && (
//               <div className="saved-kpis">
//                 <h3>Saved KPIs for {departments.find(d => d._id === selectedDepartment)?.department}</h3>
//                 <table className="saved-kpi-table">
//                   <thead>
//                     <tr>
//                       <th>KPI Name</th>
//                       <th>Weight (%)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {savedKpis.map((kpi, index) => (
//                       <tr key={kpi._id}>
//                         <td>{kpi.name}</td>
//                         <td>{kpi.weight}</td>
//                         <td>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="edit-button"
//                             aria-label="Edit KPI"
//                           >
//                             <FaEdit /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteKpi(kpi._id)}
//                             className="remove-button"
//                             aria-label="Remove KPI"
//                           >
//                             <FaTrashAlt /> Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Add KPI Button */}
//             {selectedDepartment && (
//               <div>
//                 <button
//                   onClick={() => setIsKpiFormVisible(true)}
//                   className="rzr-hm-review-addButton"
//                 >
//                   Add KPI
//                 </button>
//               </div>
//             )}

//             {/* Add KPI Form */}
//             {isKpiFormVisible && (
//               <form onSubmit={handleSubmit} className="rzr-hm-review-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Add KPIs for {departments.find(d => d._id === selectedDepartment)?.department}
//                 </h3>
//                 {kpis.map((kpi, index) => (
//                   <div key={index} className="rzr-hm-review-kpiRow">
//                     <input
//                       type="text"
//                       placeholder="KPI Name"
//                       value={kpi.name}
//                       onChange={(e) =>
//                         handleKpiChange(index, "name", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Weight (%)"
//                       value={kpi.weight}
//                       onChange={(e) =>
//                         handleKpiChange(index, "weight", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                       min="0"
//                       max="100"
//                       step="0.01"
//                     />
//                     {kpis.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeKpi(index)}
//                         className="rzr-hm-review-removeButton"
//                         aria-label="Remove KPI"
//                       >
//                         <FaTrashAlt /> Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <p
//                   className="rzr-hm-review-totalWeight"
//                   style={{
//                     color: getTotalWeight() === 100 ? "green" : "red",
//                   }}
//                 >
//                   Total Weight: {getTotalWeight()}%
//                 </p>
//                 {getTotalWeight() < 100 && (
//                   <button
//                     type="button"
//                     onClick={addKpi}
//                     className="rzr-hm-review-addButton"
//                   >
//                     Add Another KPI
//                   </button>
//                 )}
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save KPIs
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsKpiFormVisible(false)}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Edit KPI Form */}
//             {isEditing && (
//               <form onSubmit={handleSaveEdit} className="edit-kpi-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Edit KPI for {departments.find(d => d._id === selectedDepartment)?.department}
//                 </h3>
//                 <div className="rzr-hm-review-kpiRow">
//                   <input
//                     type="text"
//                     placeholder="KPI Name"
//                     value={currentKpi.name}
//                     onChange={(e) => handleEditChange("name", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                   />
//                   <input
//                     type="number"
//                     placeholder="Weight (%)"
//                     value={currentKpi.weight}
//                     onChange={(e) => handleEditChange("weight", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                     min="0"
//                     max="100"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             <ToastContainer />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionTrackerAdmin2;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Importing React Icons

// const ActionTrackerAdmin2 = () => {
//   // State variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [loadingDepartments, setLoadingDepartments] = useState(false);
//   const [error, setError] = useState(null);

//   // Editing state
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentKpi, setCurrentKpi] = useState({ name: "", weight: "" });
//   const [editIndex, setEditIndex] = useState(null);

//   // Fetch departments from API on component mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         setLoadingDepartments(true);
//         const response = await axios.get(
//           "https://apiv2.humanmaximizer.com/api/v1/superadmin/departments"
//         );
//         setDepartments(response.data.data); // Ensure this is an array of departments
//         setLoadingDepartments(false);
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError("Failed to fetch departments.");
//         setLoadingDepartments(false);
//         toast.error("Failed to fetch departments.");
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch saved KPIs for a department
//   const fetchSavedKpis = async (departmentId) => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.get(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis?department=${departmentId}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       // Set kpis to the array of KPI objects
//       setKpis(response.data.data || []);
//     } catch (err) {
//       console.error("Error fetching saved KPIs:", err);
//       toast.error("Failed to fetch saved KPIs.");
//     }
//   };

//   // Handle department selection
//   const handleDepartmentChange = (e) => {
//     const departmentId = e.target.value;
//     setSelectedDepartment(departmentId);
//     setIsKpiFormVisible(false);
//     setKpis([]);
//     setIsEditing(false);
//     setCurrentKpi({ name: "", weight: "" });
//     setEditIndex(null);

//     if (departmentId) {
//       fetchSavedKpis(departmentId);
//     }
//   };

//   // Handle KPI input changes
//   const handleKpiChange = (index, field, value) => {
//     const newKpis = [...kpis];
//     newKpis[index][field] = value;
//     setKpis(newKpis);
//   };

//   // Add a new KPI field
//   const addKpi = () => {
//     setKpis([...kpis, { name: "", weight: "" }]);
//   };

//   // Remove a KPI field
//   const removeKpi = (index) => {
//     const newKpis = kpis.filter((_, i) => i !== index);
//     setKpis(newKpis);
//   };

//   // Calculate total weight (only kpis)
//   const getTotalWeight = () => {
//     const newTotal = kpis.reduce(
//       (total, kpi) => total + parseFloat(kpi.weight || 0),
//       0
//     );
//     return newTotal;
//   };

//   // Handle form submission to save KPIs
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("handleSubmit called");

//     const totalWeight = getTotalWeight();
//     console.log("Total Weight:", totalWeight);

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     // Prepare KPI data
//     const formattedKpis = kpis.map((kpi) => ({
//       name: kpi.name,
//       weight: parseFloat(kpi.weight),
//     }));

//     console.log("Formatted KPIs:", formattedKpis);

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       console.log("Access Token:", accessToken);

//       const response = await axios.post(
//         "https://apiv2.humanmaximizer.com/api/v1/kpi/kpis", // Ensure this endpoint is correct
//         {
//           department: selectedDepartment, // This should be the department ID
//           kpis: formattedKpis,
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("POST response:", response.data);

//       toast.success("KPIs saved successfully");
//       setIsKpiFormVisible(false);
//       setKpis([]); // Reset KPIs to an empty array
//       fetchSavedKpis(selectedDepartment); // Refresh KPIs from backend
//     } catch (err) {
//       console.error("Error saving KPIs:", err.response?.data || err.message);
//       toast.error("Failed to save KPIs.");
//     }
//   };

//   // Handle Edit Click
//   const handleEditClick = (index) => {
//     setIsEditing(true);
//     setEditIndex(index);
//     setCurrentKpi({ ...kpis[index] });
//   };

//   // Handle Edit Change
//   const handleEditChange = (field, value) => {
//     setCurrentKpi({ ...currentKpi, [field]: value });
//   };

//   // Save Edited KPI
//   const handleSaveEdit = async (e) => {
//     e.preventDefault();

//     // Calculate new total weight
//     const totalWeight =
//       getTotalWeight() -
//       parseFloat(kpis[editIndex].weight || 0) +
//       parseFloat(currentKpi.weight || 0);

//     if (totalWeight !== 100) {
//       toast.error("Total weight must be exactly 100%");
//       return;
//     }

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const kpiId = kpis[editIndex]._id;

//       const response = await axios.put(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis/${kpiId}`, // Ensure this endpoint is correct
//         {
//           name: currentKpi.name,
//           weight: parseFloat(currentKpi.weight),
//         },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("PUT response:", response.data);

//       toast.success("KPI updated successfully");
//       setIsEditing(false);
//       setEditIndex(null);
//       setCurrentKpi({ name: "", weight: "" });
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error updating KPI:", err.response?.data || err.message);
//       toast.error("Failed to update KPI.");
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditIndex(null);
//     setCurrentKpi({ name: "", weight: "" });
//   };

//   // Handle Delete KPI
//   const handleDeleteKpi = async (kpiId) => {
//     if (!window.confirm("Are you sure you want to delete this KPI?")) return;

//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       const response = await axios.delete(
//         `https://apiv2.humanmaximizer.com/api/v1/kpi/kpis/${kpiId}`, // Ensure this endpoint is correct
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("DELETE response:", response.data);

//       toast.success("KPI deleted successfully");
//       fetchSavedKpis(selectedDepartment);
//     } catch (err) {
//       console.error("Error deleting KPI:", err.response?.data || err.message);
//       toast.error("Failed to delete KPI.");
//     }
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">
//         <div className="container">
//           <div className="rzr-hm-review-mgmt2">
//             <h2 className="rzr-hm-review-heading">Set KPIs for Department</h2>
//             {error && <p className="rzr-hm-review-error">{error}</p>}

//             {/* Department Selection */}
//             <div className="rzr-hm-review-formGroup">
//               <label>Select Department:</label>
//               <select
//                 value={selectedDepartment}
//                 onChange={handleDepartmentChange}
//                 disabled={loadingDepartments}
//                 className="rzr-hm-review-select"
//               >
//                 <option value="">--Select Department--</option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept._id}>
//                     {dept.department}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Display Saved KPIs */}
//             {selectedDepartment && kpis.length > 0 && (
//               <div className="saved-kpis">
//                 <h3>
//                   Saved KPIs for{" "}
//                   {departments.find((d) => d._id === selectedDepartment)?.department}
//                 </h3>
//                 <table className="saved-kpi-table">
//                   <thead>
//                     <tr>
//                       <th>KPI Name</th>
//                       <th>Weight (%)</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {kpis.map((kpi, index) => (
//                       <tr key={kpi._id}>
//                         <td>{kpi.name}</td>
//                         <td>{kpi.weight}</td>
//                         <td>
//                           <button
//                             onClick={() => handleEditClick(index)}
//                             className="edit-button"
//                             aria-label="Edit KPI"
//                           >
//                             <FaEdit /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteKpi(kpi._id)}
//                             className="remove-button"
//                             aria-label="Remove KPI"
//                           >
//                             <FaTrashAlt /> Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Add KPI Button */}
//             {selectedDepartment && (
//               <div>
//                 <button
//                   onClick={() => setIsKpiFormVisible(true)}
//                   className="rzr-hm-review-addButton"
//                 >
//                   Add KPI
//                 </button>
//               </div>
//             )}

//             {/* Add KPI Form */}
//             {isKpiFormVisible && (
//               <form onSubmit={handleSubmit} className="rzr-hm-review-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Add KPIs for{" "}
//                   {departments.find((d) => d._id === selectedDepartment)?.department}
//                 </h3>
//                 {kpis.map((kpi, index) => (
//                   <div key={index} className="rzr-hm-review-kpiRow">
//                     <input
//                       type="text"
//                       placeholder="KPI Name"
//                       value={kpi.name}
//                       onChange={(e) =>
//                         handleKpiChange(index, "name", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                     />
//                     <input
//                       type="number"
//                       placeholder="Weight (%)"
//                       value={kpi.weight}
//                       onChange={(e) =>
//                         handleKpiChange(index, "weight", e.target.value)
//                       }
//                       className="rzr-hm-review-input"
//                       required
//                       min="0"
//                       max="100"
//                       step="0.01"
//                     />
//                     {kpis.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeKpi(index)}
//                         className="rzr-hm-review-removeButton"
//                         aria-label="Remove KPI"
//                       >
//                         <FaTrashAlt /> Remove
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <p
//                   className="rzr-hm-review-totalWeight"
//                   style={{
//                     color: getTotalWeight() === 100 ? "green" : "red",
//                   }}
//                 >
//                   Total Weight: {getTotalWeight()}%
//                 </p>
//                 {getTotalWeight() < 100 && (
//                   <button
//                     type="button"
//                     onClick={addKpi}
//                     className="rzr-hm-review-addButton"
//                   >
//                     Add Another KPI
//                   </button>
//                 )}
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save KPIs
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setIsKpiFormVisible(false)}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             {/* Edit KPI Form */}
//             {isEditing && (
//               <form onSubmit={handleSaveEdit} className="edit-kpi-form">
//                 <h3 className="rzr-hm-review-subHeading">
//                   Edit KPI for{" "}
//                   {departments.find((d) => d._id === selectedDepartment)?.department}
//                 </h3>
//                 <div className="rzr-hm-review-kpiRow">
//                   <input
//                     type="text"
//                     placeholder="KPI Name"
//                     value={currentKpi.name}
//                     onChange={(e) => handleEditChange("name", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                   />
//                   <input
//                     type="number"
//                     placeholder="Weight (%)"
//                     value={currentKpi.weight}
//                     onChange={(e) => handleEditChange("weight", e.target.value)}
//                     className="rzr-hm-review-input"
//                     required
//                     min="0"
//                     max="100"
//                     step="0.01"
//                   />
//                 </div>
//                 <div className="rzr-hm-review-buttonGroup">
//                   <button
//                     type="submit"
//                     className="rzr-hm-review-submitButton"
//                     disabled={getTotalWeight() !== 100}
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleCancelEdit}
//                     className="rzr-hm-review-cancelButton"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             )}

//             <ToastContainer position="top-right" autoClose={5000} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionTrackerAdmin2;

// src/components/KpiManager.js

// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// const KpiManager = () => {
//   // State Variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [kpis, setKpis] = useState([]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [newKpi, setNewKpi] = useState({ name: '', weight: '' });
//   const [editKpi, setEditKpi] = useState(null); // { id, name, weight }

//   // Fetch Departments on Mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('/superadmin/departments');
//         setDepartments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         // Error handled by Axios interceptor
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs when a department is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedDepartment) {
//         try {
//           const response = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//           setKpis(response.data.data);
//         } catch (error) {
//           console.error('Error fetching KPIs:', error);
//           // Error handled by Axios interceptor
//         }
//       } else {
//         setKpis([]);
//       }
//     };

//     fetchKpis();
//   }, [selectedDepartment]);

//   // Handle Department Selection
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setIsKpiFormVisible(false);
//     setNewKpi({ name: '', weight: '' });
//     setEditKpi(null);
//   };

//   // Handle New KPI Input Change
//   const handleNewKpiChange = (e) => {
//     const { name, value } = e.target;
//     setNewKpi((prev) => ({ ...prev, [name]: value }));
//   };

//   // Add New KPI to Local State
//   const addKpi = () => {
//     if (!newKpi.name || !newKpi.weight) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (parseFloat(newKpi.weight) < 0 || parseFloat(newKpi.weight) > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight = kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) + parseFloat(newKpi.weight);

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     setKpis((prev) => [...prev, { _id: Date.now(), name: newKpi.name, weight: newKpi.weight }]);
//     setNewKpi({ name: '', weight: '' });
//   };

//   // Save KPIs to Backend
//   const saveKpis = async () => {
//     if (kpis.length === 0) {
//       toast.error('No KPIs to save.');
//       return;
//     }

//     const totalWeight = kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0);

//     if (totalWeight !== 100) {
//       toast.error('Total weight must be exactly 100%.');
//       return;
//     }

//     try {
//       const formattedKpis = kpis.map((kpi) => ({
//         name: kpi.name,
//         weight: parseFloat(kpi.weight),
//       }));

//       await axios.post('/kpi/kpis', {
//         department: selectedDepartment,
//         kpis: formattedKpis,
//       });

//       toast.success('KPIs saved successfully.');
//       setIsKpiFormVisible(false);
//       // Refresh KPIs from backend
//       const response = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//       setKpis(response.data.data);
//     } catch (error) {
//       console.error('Error saving KPIs:', error);
//       // Error handled by Axios interceptor
//     }
//   };

//   // Handle KPI Deletion
//   const deleteKpi = async (id) => {
//     if (window.confirm('Are you sure you want to delete this KPI?')) {
//       try {
//         await axios.delete(`/kpi/kpis/${id}`);
//         toast.success('KPI deleted successfully.');
//         setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
//       } catch (error) {
//         console.error('Error deleting KPI:', error);
//         // Error handled by Axios interceptor
//       }
//     }
//   };

//   // Handle KPI Editing
//   const startEditingKpi = (kpi) => {
//     setEditKpi(kpi);
//     setIsKpiFormVisible(true);
//   };

//   // Handle Edit Input Change
//   const handleEditKpiChange = (e) => {
//     const { name, value } = e.target;
//     setEditKpi((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save Edited KPI
//   const saveEditedKpi = async () => {
//     if (!editKpi.name || !editKpi.weight) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (parseFloat(editKpi.weight) < 0 || parseFloat(editKpi.weight) > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight = kpis.reduce((acc, kpi) => {
//       if (kpi._id === editKpi._id) {
//         return acc;
//       }
//       return acc + parseFloat(kpi.weight);
//     }, 0) + parseFloat(editKpi.weight);

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     setKpis((prev) => prev.map((kpi) => (kpi._id === editKpi._id ? editKpi : kpi)));
//     setEditKpi(null);
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditKpi(null);
//     setIsKpiFormVisible(false);
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4">KPI Management</h2>

//       {/* Department Selection */}
//       <div className="mb-4">
//         <label htmlFor="department" className="form-label">
//           Select Department:
//         </label>
//         <select
//           id="department"
//           className="form-select"
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           <option value="">-- Select Department --</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept._id}>
//               {dept.department}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display KPIs */}
//       {selectedDepartment && (
//         <div className="mb-4">
//           <h4>KPIs for {departments.find((d) => d._id === selectedDepartment)?.department}</h4>
//           {kpis.length > 0 ? (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Weight (%)</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {kpis.map((kpi) => (
//                   <tr key={kpi._id}>
//                     <td>{kpi.name}</td>
//                     <td>{kpi.weight}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-primary me-2"
//                         onClick={() => startEditingKpi(kpi)}
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => deleteKpi(kpi._id)}
//                       >
//                         <FaTrashAlt /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No KPIs found for this department.</p>
//           )}
//         </div>
//       )}

//       {/* Add/Edit KPI Form */}
//       {isKpiFormVisible && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">{editKpi ? 'Edit KPI' : 'Add New KPI'}</h5>
//             <div className="mb-3">
//               <label htmlFor="kpiName" className="form-label">
//                 KPI Name:
//               </label>
//               <input
//                 type="text"
//                 id="kpiName"
//                 name="name"
//                 className="form-control"
//                 value={editKpi ? editKpi.name : newKpi.name}
//                 onChange={editKpi ? handleEditKpiChange : handleNewKpiChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="kpiWeight" className="form-label">
//                 Weight (%):
//               </label>
//               <input
//                 type="number"
//                 id="kpiWeight"
//                 name="weight"
//                 className="form-control"
//                 value={editKpi ? editKpi.weight : newKpi.weight}
//                 onChange={editKpi ? handleEditKpiChange : handleNewKpiChange}
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </div>
//             <div>
//               {editKpi ? (
//                 <>
//                   <button className="btn btn-success me-2" onClick={saveEditedKpi}>
//                     Save
//                   </button>
//                   <button className="btn btn-secondary" onClick={cancelEditing}>
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button className="btn btn-primary me-2" onClick={addKpi}>
//                     Add KPI
//                   </button>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => {
//                       setIsKpiFormVisible(false);
//                       setNewKpi({ name: '', weight: '' });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Button to Show Add KPI Form */}
//       {selectedDepartment && !isKpiFormVisible && (
//         <button className="btn btn-primary mb-4" onClick={() => setIsKpiFormVisible(true)}>
//           Add New KPI
//         </button>
//       )}

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default KpiManager;

// src/components/KpiManager.js

// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig'; // Ensure this points to the correct Axios instance
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// const KpiManager = () => {
//   // State Variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [kpis, setKpis] = useState([]);
//   const [isKpiFormVisible, setIsKpiFormVisible] = useState(false);
//   const [newKpi, setNewKpi] = useState({ name: '', weight: '' });
//   const [editKpi, setEditKpi] = useState(null); // { _id, name, weight }

//   // Fetch Departments on Mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('/superadmin/departments'); // Ensure the endpoint is correct
//         setDepartments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         // Error handled by Axios interceptor
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs when a department is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedDepartment) {
//         try {
//           const response = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//           setKpis(response.data.data);
//         } catch (error) {
//           console.error('Error fetching KPIs:', error);
//           // Error handled by Axios interceptor
//         }
//       } else {
//         setKpis([]);
//       }
//     };

//     fetchKpis();
//   }, [selectedDepartment]);

//   // Handle Department Selection
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setIsKpiFormVisible(false);
//     setNewKpi({ name: '', weight: '' });
//     setEditKpi(null);
//   };

//   // Handle New KPI Input Change
//   const handleNewKpiChange = (e) => {
//     const { name, value } = e.target;
//     setNewKpi((prev) => ({ ...prev, [name]: value }));
//   };

//   // Add New KPI to Local State
//   const addKpi = () => {
//     if (!newKpi.name || !newKpi.weight) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (parseFloat(newKpi.weight) < 0 || parseFloat(newKpi.weight) > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) + parseFloat(newKpi.weight);

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     setKpis((prev) => [
//       ...prev,
//       { _id: Date.now().toString(), name: newKpi.name, weight: newKpi.weight },
//     ]);
//     setNewKpi({ name: '', weight: '' });
//   };

//   // Save KPIs to Backend
//   const saveKpis = async () => {
//     if (kpis.length === 0) {
//       toast.error('No KPIs to save.');
//       return;
//     }

//     const totalWeight = kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0);

//     // if (totalWeight !== 100) {
//     //   toast.error('Total weight must be exactly 100%.');
//     //   return;
//     // }

//     try {
//       const formattedKpis = kpis.map((kpi) => ({
//         name: kpi.name,
//         weight: parseFloat(kpi.weight),
//       }));

//       const response = await axios.post('/kpi/kpis', {
//         department: selectedDepartment,
//         kpis: formattedKpis,
//       });

//       toast.success('KPIs saved successfully.');
//       setIsKpiFormVisible(false);
//       setKpis([]); // Clear local KPIs after saving

//       // Refresh KPIs from backend to get real _id's
//       const refreshedKpis = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//       setKpis(refreshedKpis.data.data);
//     } catch (error) {
//       console.error('Error saving KPIs:', error);
//       // Error handled by Axios interceptor
//     }
//   };

//   // Handle KPI Deletion
//   const deleteKpi = async (id) => {
//     if (window.confirm('Are you sure you want to delete this KPI?')) {
//       try {
//         await axios.delete(`/kpi/kpis/${id}`);
//         toast.success('KPI deleted successfully.');
//         setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
//       } catch (error) {
//         console.error('Error deleting KPI:', error);
//         // Error handled by Axios interceptor
//       }
//     }
//   };

//   // Handle KPI Editing
//   const startEditingKpi = (kpi) => {
//     setEditKpi(kpi);
//     setIsKpiFormVisible(true);
//   };

//   // Handle Edit Input Change
//   const handleEditKpiChange = (e) => {
//     const { name, value } = e.target;
//     setEditKpi((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save Edited KPI
//   const saveEditedKpi = async () => {
//     if (!editKpi.name || !editKpi.weight) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (parseFloat(editKpi.weight) < 0 || parseFloat(editKpi.weight) > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => {
//         if (kpi._id === editKpi._id) {
//           return acc;
//         }
//         return acc + parseFloat(kpi.weight);
//       }, 0) + parseFloat(editKpi.weight);

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     try {
//       // Assuming the backend uses the same _id as frontend. If not, ensure to use the backend's _id.
//       await axios.put(`/kpi/kpis/${editKpi._id}`, {
//         name: editKpi.name,
//         weight: parseFloat(editKpi.weight),
//       });

//       toast.success('KPI updated successfully.');
//       setIsKpiFormVisible(false);
//       setEditKpi(null);

//       // Refresh KPIs from backend
//       const refreshedKpis = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//       setKpis(refreshedKpis.data.data);
//     } catch (error) {
//       console.error('Error updating KPI:', error);
//       // Error handled by Axios interceptor
//     }
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditKpi(null);
//     setIsKpiFormVisible(false);
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4">KPI Management</h2>

//       {/* Department Selection */}
//       <div className="mb-4">
//         <label htmlFor="department" className="form-label">
//           Select Department:
//         </label>
//         <select
//           id="department"
//           className="form-select"
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           <option value="">-- Select Department --</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept._id}>
//               {dept.department}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display KPIs */}
//       {selectedDepartment && (
//         <div className="mb-4">
//           <h4>
//             KPIs for{' '}
//             {departments.find((d) => d._id === selectedDepartment)?.department || 'Selected Department'}
//           </h4>
//           {kpis.length > 0 ? (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Weight (%)</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {kpis.map((kpi) => (
//                   <tr key={kpi._id}>
//                     <td>{kpi.name}</td>
//                     <td>{kpi.weight}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-primary me-2"
//                         onClick={() => startEditingKpi(kpi)}
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => deleteKpi(kpi._id)}
//                       >
//                         <FaTrashAlt /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No KPIs found for this department.</p>
//           )}
//         </div>
//       )}

//       {/* Add/Edit KPI Form */}
//       {isKpiFormVisible && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">{editKpi ? 'Edit KPI' : 'Add New KPI'}</h5>
//             <div className="mb-3">
//               <label htmlFor="kpiName" className="form-label">
//                 KPI Name:
//               </label>
//               <input
//                 type="text"
//                 id="kpiName"
//                 name="name"
//                 className="form-control"
//                 value={editKpi ? editKpi.name : newKpi.name}
//                 onChange={editKpi ? handleEditKpiChange : handleNewKpiChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="kpiWeight" className="form-label">
//                 Weight (%):
//               </label>
//               <input
//                 type="number"
//                 id="kpiWeight"
//                 name="weight"
//                 className="form-control"
//                 value={editKpi ? editKpi.weight : newKpi.weight}
//                 onChange={editKpi ? handleEditKpiChange : handleNewKpiChange}
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </div>
//             <div>
//               {editKpi ? (
//                 <>
//                   <button className="btn btn-success me-2" onClick={saveEditedKpi}>
//                     Save
//                   </button>
//                   <button className="btn btn-secondary" onClick={cancelEditing}>
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button className="btn btn-primary me-2" onClick={addKpi}>
//                     Add KPI
//                   </button>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => {
//                       setIsKpiFormVisible(false);
//                       setNewKpi({ name: '', weight: '' });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Save KPIs Button */}
//       {selectedDepartment && kpis.length > 0 && (
//         <div className="mb-4">
//           <button className="btn btn-success" onClick={saveKpis}>
//             Save KPIs
//           </button>
//         </div>
//       )}

//       {/* Button to Show Add KPI Form */}
//       {selectedDepartment && !isKpiFormVisible && (
//         <button className="btn btn-primary mb-4" onClick={() => setIsKpiFormVisible(true)}>
//           Add New KPI
//         </button>
//       )}

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default KpiManager;

// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig'; // Ensure this points to the correct Axios instance
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// const KpiManager = () => {
//   // State Variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [kpis, setKpis] = useState([]);
//   const [isAddingKpi, setIsAddingKpi] = useState(false);
//   const [newKpi, setNewKpi] = useState({ name: '', weight: 0 });
//   const [editingKpi, setEditingKpi] = useState(null); // { _id, name, weight }

//   // Fetch Departments on Mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('/superadmin/departments'); // Ensure the endpoint is correct
//         setDepartments(response.data.data);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         toast.error('Failed to fetch departments.');
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs when a department is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedDepartment) {
//         try {
//           const response = await axios.get(`/kpi/kpis?department=${selectedDepartment}`);
//           setKpis(response.data.data);
//         } catch (error) {
//           console.error('Error fetching KPIs:', error);
//           toast.error('Failed to fetch KPIs.');
//         }
//       } else {
//         setKpis([]);
//       }
//     };

//     fetchKpis();
//   }, [selectedDepartment]);

//   // Handle Department Selection
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setIsAddingKpi(false);
//     setNewKpi({ name: '', weight: 0 });
//     setEditingKpi(null);
//   };

//   // Handle New KPI Input Change
//   const handleNewKpiChange = (e) => {
//     const { name, value } = e.target;
//     setNewKpi((prev) => ({
//       ...prev,
//       [name]: name === 'weight' ? parseFloat(value) : value,
//     }));
//   };

//   // Add New KPI
//   const addKpi = async () => {
//     if (!newKpi.name || newKpi.weight === '' || newKpi.weight === null) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (newKpi.weight < 0 || newKpi.weight > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) + newKpi.weight;

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     try {
//       const response = await axios.post('/kpi/kpis', {
//         department: selectedDepartment,
//         name: newKpi.name,
//         weight: newKpi.weight,
//       });

//       // Assuming the backend returns the created KPI with its _id
//       setKpis((prev) => [...prev, response.data.data]);
//       toast.success('KPI added successfully.');
//       setNewKpi({ name: '', weight: 0 });
//       setIsAddingKpi(false);
//     } catch (error) {
//       console.error('Error adding KPI:', error);
//       toast.error('Failed to add KPI.');
//     }
//   };

//   // Handle KPI Deletion
//   const deleteKpi = async (id) => {
//     if (window.confirm('Are you sure you want to delete this KPI?')) {
//       try {
//         await axios.delete(`/kpi/kpis/${id}`);
//         toast.success('KPI deleted successfully.');
//         setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
//       } catch (error) {
//         console.error('Error deleting KPI:', error);
//         toast.error('Failed to delete KPI.');
//       }
//     }
//   };

//   // Start Editing KPI
//   const startEditingKpi = (kpi) => {
//     setEditingKpi({ ...kpi }); // Create a copy to avoid direct state mutation
//   };

//   // Handle Edit KPI Input Change
//   const handleEditKpiChange = (e) => {
//     const { name, value } = e.target;
//     setEditingKpi((prev) => ({
//       ...prev,
//       [name]: name === 'weight' ? parseFloat(value) : value,
//     }));
//   };

//   // Save Edited KPI
//   const saveEditedKpi = async () => {
//     if (!editingKpi.name || editingKpi.weight === '' || editingKpi.weight === null) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (editingKpi.weight < 0 || editingKpi.weight > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => {
//         if (kpi._id === editingKpi._id) {
//           return acc;
//         }
//         return acc + parseFloat(kpi.weight);
//       }, 0) + editingKpi.weight;

//     if (totalWeight > 100) {
//       toast.error('Total weight exceeds 100%. Please adjust the KPI weights.');
//       return;
//     }

//     try {
//       await axios.put(`/kpi/kpis/${editingKpi._id}`, {
//         name: editingKpi.name,
//         weight: editingKpi.weight,
//       });

//       toast.success('KPI updated successfully.');
//       setKpis((prev) =>
//         prev.map((kpi) => (kpi._id === editingKpi._id ? editingKpi : kpi))
//       );
//       setEditingKpi(null);
//     } catch (error) {
//       console.error('Error updating KPI:', error);
//       toast.error('Failed to update KPI.');
//     }
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditingKpi(null);
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-4">KPI Management</h2>

//       {/* Department Selection */}
//       <div className="mb-4">
//         <label htmlFor="department" className="form-label">
//           Select Department:
//         </label>
//         <select
//           id="department"
//           className="form-select"
//           value={selectedDepartment}
//           onChange={handleDepartmentChange}
//         >
//           <option value="">-- Select Department --</option>
//           {departments.map((dept) => (
//             <option key={dept._id} value={dept._id}>
//               {dept.department}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Display KPIs */}
//       {selectedDepartment && (
//         <div className="mb-4">
//           <h4>
//             KPIs for{' '}
//             {departments.find((d) => d._id === selectedDepartment)?.department ||
//               'Selected Department'}
//           </h4>
//           {kpis.length > 0 ? (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Weight (%)</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {kpis.map((kpi) => (
//                   <tr key={kpi._id}>
//                     <td>{kpi.name}</td>
//                     <td>{kpi.weight}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-primary me-2"
//                         onClick={() => startEditingKpi(kpi)}
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => deleteKpi(kpi._id)}
//                       >
//                         <FaTrashAlt /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No KPIs found for this department.</p>
//           )}
//         </div>
//       )}

//       {/* Add KPI Form */}
//       {isAddingKpi ? (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">Add New KPI</h5>
//             <div className="mb-3">
//               <label htmlFor="newKpiName" className="form-label">
//                 KPI Name:
//               </label>
//               <input
//                 type="text"
//                 id="newKpiName"
//                 name="name"
//                 className="form-control"
//                 value={newKpi.name}
//                 onChange={handleNewKpiChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="newKpiWeight" className="form-label">
//                 Weight (%):
//               </label>
//               <input
//                 type="number"
//                 id="newKpiWeight"
//                 name="weight"
//                 className="form-control"
//                 value={newKpi.weight}
//                 onChange={handleNewKpiChange}
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </div>
//             <div>
//               <button className="btn btn-success me-2" onClick={addKpi}>
//                 Add KPI
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setIsAddingKpi(false);
//                   setNewKpi({ name: '', weight: 0 });
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         selectedDepartment && (
//           <button
//             className="btn btn-primary mb-4"
//             onClick={() => setIsAddingKpi(true)}
//           >
//             Add New KPI
//           </button>
//         )
//       )}

//       {/* Edit KPI Form */}
//       {editingKpi && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">Edit KPI</h5>
//             <div className="mb-3">
//               <label htmlFor="editKpiName" className="form-label">
//                 KPI Name:
//               </label>
//               <input
//                 type="text"
//                 id="editKpiName"
//                 name="name"
//                 className="form-control"
//                 value={editingKpi.name}
//                 onChange={handleEditKpiChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="editKpiWeight" className="form-label">
//                 Weight (%):
//               </label>
//               <input
//                 type="number"
//                 id="editKpiWeight"
//                 name="weight"
//                 className="form-control"
//                 value={editingKpi.weight}
//                 onChange={handleEditKpiChange}
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </div>
//             <div>
//               <button className="btn btn-success me-2" onClick={saveEditedKpi}>
//                 Save
//               </button>
//               <button className="btn btn-secondary" onClick={cancelEditing}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default KpiManager;

// import React, { useState, useEffect } from 'react';
// import axios from './axiosConfig'; // Ensure this points to the correct Axios instance
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Table,
//   Button,
//   Card,
//   Modal,
// } from 'react-bootstrap';
// import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

// const KpiManager = () => {
//   // State Variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [kpis, setKpis] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newKpi, setNewKpi] = useState({ name: '', weight: 0 });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingKpi, setEditingKpi] = useState(null); // { _id, name, weight }
//   const [loading, setLoading] = useState(false); // For API call loading states

//   // Fetch Departments on Mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('/superadmin/departments'); // Ensure the endpoint is correct
//         setDepartments(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         toast.error('Failed to fetch departments.');
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs when a department is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedDepartment) {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `/kpi/kpis?department=${selectedDepartment}`
//           );
//           setKpis(response.data.data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching KPIs:', error);
//           toast.error('Failed to fetch KPIs.');
//           setLoading(false);
//         }
//       } else {
//         setKpis([]);
//       }
//     };

//     fetchKpis();
//   }, [selectedDepartment]);

//   // Handle Department Selection
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setShowAddModal(false);
//     setNewKpi({ name: '', weight: 0 });
//     setShowEditModal(false);
//     setEditingKpi(null);
//   };

//   // Handle New KPI Input Change
//   const handleNewKpiChange = (e) => {
//     const { name, value } = e.target;
//     setNewKpi((prev) => ({
//       ...prev,
//       [name]: name === 'weight' ? parseFloat(value) : value,
//     }));
//   };

//   // Handle Edit KPI Input Change
//   const handleEditKpiChange = (e) => {
//     const { name, value } = e.target;
//     setEditingKpi((prev) => ({
//       ...prev,
//       [name]: name === 'weight' ? parseFloat(value) : value,
//     }));
//   };

//   // Add New KPI
//   const addKpi = async () => {
//     if (!newKpi.name || newKpi.weight === '' || newKpi.weight === null) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (newKpi.weight < 0 || newKpi.weight > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) +
//       newKpi.weight;

//     if (totalWeight > 100) {
//       toast.error(
//         'Total weight exceeds 100%. Please adjust the KPI weights.'
//       );
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post('/kpi/kpis', {
//         department: selectedDepartment,
//         name: newKpi.name,
//         weight: newKpi.weight,
//       });

//       // Assuming the backend returns the created KPI with its _id
//       setKpis((prev) => [...prev, response.data.data]);
//       toast.success('KPI added successfully.');
//       setNewKpi({ name: '', weight: 0 });
//       setShowAddModal(false);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error adding KPI:', error);
//       toast.error('Failed to add KPI.');
//       setLoading(false);
//     }
//   };

//   // Handle KPI Deletion with SweetAlert2
//   const deleteKpi = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to delete this KPI?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#dc3545',
//       cancelButtonColor: '#6c757d',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         try {
//           await axios.delete(`/kpi/kpis/${id}`);
//           setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
//           toast.success('KPI deleted successfully.');
//           Swal.fire('Deleted!', 'The KPI has been deleted.', 'success');
//           setLoading(false);
//         } catch (error) {
//           console.error('Error deleting KPI:', error);
//           toast.error('Failed to delete KPI.');
//           Swal.fire('Error!', 'There was an issue deleting the KPI.', 'error');
//           setLoading(false);
//         }
//       }
//     });
//   };

//   // Start Editing KPI and Show Edit Modal
//   const startEditingKpi = (kpi) => {
//     setEditingKpi({ ...kpi }); // Create a copy to avoid direct state mutation
//     setShowEditModal(true);
//   };

//   // Save Edited KPI
//   const saveEditedKpi = async () => {
//     if (
//       !editingKpi.name ||
//       editingKpi.weight === '' ||
//       editingKpi.weight === null
//     ) {
//       toast.error('Please fill in all fields for the KPI.');
//       return;
//     }

//     if (editingKpi.weight < 0 || editingKpi.weight > 100) {
//       toast.error('Weight must be between 0 and 100.');
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => {
//         if (kpi._id === editingKpi._id) {
//           return acc;
//         }
//         return acc + parseFloat(kpi.weight);
//       }, 0) + editingKpi.weight;

//     if (totalWeight > 100) {
//       toast.error(
//         'Total weight exceeds 100%. Please adjust the KPI weights.'
//       );
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.put(`/kpi/kpis/${editingKpi._id}`, {
//         name: editingKpi.name,
//         weight: editingKpi.weight,
//       });

//       setKpis((prev) =>
//         prev.map((kpi) =>
//           kpi._id === editingKpi._id ? editingKpi : kpi
//         )
//       );
//       toast.success('KPI updated successfully.');
//       setEditingKpi(null);
//       setShowEditModal(false);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error updating KPI:', error);
//       toast.error('Failed to update KPI.');
//       setLoading(false);
//     }
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditingKpi(null);
//     setShowEditModal(false);
//   };

//   return (
//     <Container className="my-4">
//       <Row>
//         <Col>
//           <h2 className="mb-4 text-center">KPI Management</h2>
//         </Col>
//       </Row>

//       {/* Department Selection */}
//       <Row className="mb-4">
//         <Col md={6} className="mx-auto">
//           <Form.Group controlId="department">
//             <Form.Label>Select Department:</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedDepartment}
//               onChange={handleDepartmentChange}
//               className="shadow-sm"
//             >
//               <option value="">-- Select Department --</option>
//               {departments.map((dept) => (
//                 <option key={dept._id} value={dept._id}>
//                   {dept.department}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Display KPIs */}
//       {selectedDepartment && (
//         <Row className="mb-4">
//           <Col>
//             <Card className="shadow-sm">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h4>
//                   KPIs for{' '}
//                   {
//                     departments.find(
//                       (d) => d._id === selectedDepartment
//                     )?.department
//                   }
//                 </h4>
//                 <Button
//                   variant="success"
//                   onClick={() => setShowAddModal(true)}
//                 >
//                   <FaPlus /> Add New KPI
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 {kpis.length > 0 ? (
//                   <Table bordered hover responsive>
//                     <thead className="table-dark">
//                       <tr>
//                         <th>Name</th>
//                         <th>Weight (%)</th>
//                         <th className="text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {kpis.map((kpi) => (
//                         <tr key={kpi._id}>
//                           <td>{kpi.name}</td>
//                           <td>{kpi.weight}</td>
//                           <td className="text-center">
//                             <Button
//                               variant="primary"
//                               size="sm"
//                               className="me-2"
//                               onClick={() => startEditingKpi(kpi)}
//                             >
//                               <FaEdit /> Edit
//                             </Button>
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() => deleteKpi(kpi._id)}
//                             >
//                               <FaTrashAlt /> Delete
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 ) : (
//                   <p className="text-center">No KPIs found for this department.</p>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Add KPI Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New KPI</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="newKpiName" className="mb-3">
//               <Form.Label>KPI Name:</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={newKpi.name}
//                 onChange={handleNewKpiChange}
//                 placeholder="Enter KPI Name"
//               />
//             </Form.Group>
//             <Form.Group controlId="newKpiWeight" className="mb-3">
//               <Form.Label>Weight (%):</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="weight"
//                 value={newKpi.weight}
//                 onChange={handleNewKpiChange}
//                 placeholder="Enter Weight"
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowAddModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="success"
//             onClick={addKpi}
//             disabled={loading}
//           >
//             {loading ? 'Adding...' : 'Add KPI'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Edit KPI Modal */}
//       <Modal show={showEditModal} onHide={cancelEditing}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit KPI</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editingKpi && (
//             <Form>
//               <Form.Group controlId="editKpiName" className="mb-3">
//                 <Form.Label>KPI Name:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={editingKpi.name}
//                   onChange={handleEditKpiChange}
//                   placeholder="Enter KPI Name"
//                 />
//               </Form.Group>
//               <Form.Group controlId="editKpiWeight" className="mb-3">
//                 <Form.Label>Weight (%):</Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="weight"
//                   value={editingKpi.weight}
//                   onChange={handleEditKpiChange}
//                   placeholder="Enter Weight"
//                   min="0"
//                   max="100"
//                   step="0.01"
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={cancelEditing}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="primary"
//             onClick={saveEditedKpi}
//             disabled={loading}
//           >
//             {loading ? 'Saving...' : 'Save Changes'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer position="top-right" autoClose={5000} />
//     </Container>
//   );
// };

// export default KpiManager;

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css"; // Import Swal CSS
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Table,
//   Button,
//   Card,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

// const KpiManager = () => {
//   // State Variables
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [kpis, setKpis] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newKpi, setNewKpi] = useState({ name: "", weight: 0 });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingKpi, setEditingKpi] = useState(null); // { _id, name, weight }
//   const [loading, setLoading] = useState(false); // For API call loading states

//   // Fetch Departments on Mount
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("/superadmin/departments"); // Ensure the endpoint is correct
//         setDepartments(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//         toast.error("Failed to fetch departments.");
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Fetch KPIs when a department is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedDepartment) {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `/kpi/kpis?department=${selectedDepartment}`
//           );
//           setKpis(response.data.data);
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching KPIs:", error);
//           toast.error("Failed to fetch KPIs.");
//           setLoading(false);
//         }
//       } else {
//         setKpis([]);
//       }
//     };

//     fetchKpis();
//   }, [selectedDepartment]);

//   // Handle Department Selection
//   const handleDepartmentChange = (e) => {
//     setSelectedDepartment(e.target.value);
//     setShowAddModal(false);
//     setNewKpi({ name: "", weight: 0 });
//     setShowEditModal(false);
//     setEditingKpi(null);
//   };

//   // Handle New KPI Input Change
//   const handleNewKpiChange = (e) => {
//     const { name, value } = e.target;
//     setNewKpi((prev) => ({
//       ...prev,
//       [name]: name === "weight" ? parseFloat(value) : value,
//     }));
//   };

//   // Handle Edit KPI Input Change
//   const handleEditKpiChange = (e) => {
//     const { name, value } = e.target;
//     setEditingKpi((prev) => ({
//       ...prev,
//       [name]: name === "weight" ? parseFloat(value) : value,
//     }));
//   };

//   // Add New KPI
//   const addKpi = async () => {
//     if (!newKpi.name || newKpi.weight === "" || newKpi.weight === null) {
//       toast.error("Please fill in all fields for the KPI.");
//       return;
//     }

//     if (newKpi.weight < 0 || newKpi.weight > 100) {
//       toast.error("Weight must be between 0 and 100.");
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) +
//       newKpi.weight;

//     if (totalWeight > 100) {
//       toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post("/kpi/kpis", {
//         department: selectedDepartment,
//         name: newKpi.name,
//         weight: newKpi.weight,
//       });

//       // Assuming the backend returns the created KPI with its _id
//       setKpis((prev) => [...prev, response.data.data]);
//       toast.success("KPI added successfully.");
//       setNewKpi({ name: "", weight: 0 });
//       setShowAddModal(false);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error adding KPI:", error);
//       toast.error("Failed to add KPI.");
//       setLoading(false);
//     }
//   };

//   // Handle KPI Deletion with SweetAlert2
//   const deleteKpi = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this KPI?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#dc3545",
//       cancelButtonColor: "#6c757d",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         try {
//           await axios.delete(`/kpi/kpis/${id}`);
//           setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
//           toast.success("KPI deleted successfully.");
//           Swal.fire("Deleted!", "The KPI has been deleted.", "success");
//           setLoading(false);
//         } catch (error) {
//           console.error("Error deleting KPI:", error);
//           toast.error("Failed to delete KPI.");
//           Swal.fire("Error!", "There was an issue deleting the KPI.", "error");
//           setLoading(false);
//         }
//       }
//     });
//   };

//   // Start Editing KPI and Show Edit Modal
//   const startEditingKpi = (kpi) => {
//     setEditingKpi({ ...kpi }); // Create a copy to avoid direct state mutation
//     setShowEditModal(true);
//   };

//   // Save Edited KPI
//   const saveEditedKpi = async () => {
//     if (
//       !editingKpi.name ||
//       editingKpi.weight === "" ||
//       editingKpi.weight === null
//     ) {
//       toast.error("Please fill in all fields for the KPI.");
//       return;
//     }

//     if (editingKpi.weight < 0 || editingKpi.weight > 100) {
//       toast.error("Weight must be between 0 and 100.");
//       return;
//     }

//     const totalWeight =
//       kpis.reduce((acc, kpi) => {
//         if (kpi._id === editingKpi._id) {
//           return acc;
//         }
//         return acc + parseFloat(kpi.weight);
//       }, 0) + editingKpi.weight;

//     if (totalWeight > 100) {
//       toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.put(`/kpi/kpis/${editingKpi._id}`, {
//         name: editingKpi.name,
//         weight: editingKpi.weight,
//       });

//       setKpis((prev) =>
//         prev.map((kpi) => (kpi._id === editingKpi._id ? editingKpi : kpi))
//       );
//       toast.success("KPI updated successfully.");
//       setEditingKpi(null);
//       setShowEditModal(false);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error updating KPI:", error);
//       toast.error("Failed to update KPI.");
//       setLoading(false);
//     }
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditingKpi(null);
//     setShowEditModal(false);
//   };

//   return (
//     <div className="main">
//       <div className="ems-content">

//     <Container className="my-4">
//       <Row>
//         <Col>
//           <h2 className="mb-4 text-center">KPI Management</h2>
//         </Col>
//       </Row>

//       {/* Department Selection */}
//       <Row className="mb-4">
//         <Col md={6} className="mx-auto">
//           <Form.Group controlId="department">
//             <Form.Label>Select Department:</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedDepartment}
//               onChange={handleDepartmentChange}
//               className="shadow-sm"
//             >
//               <option value="">-- Select Department --</option>
//               {departments.map((dept) => (
//                 <option key={dept._id} value={dept._id}>
//                   {dept.department}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Display KPIs */}
//       {selectedDepartment && (
//         <Row className="mb-4">
//           <Col>
//             <Card className="shadow-sm">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h4>
//                   KPIs for{" "}
//                   {
//                     departments.find((d) => d._id === selectedDepartment)
//                       ?.department
//                   }
//                 </h4>
//                 <Button variant="success" onClick={() => setShowAddModal(true)}>
//                   <FaPlus /> Add New KPI
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 {kpis.length > 0 ? (
//                   <Table bordered hover responsive>
//                     <thead className="table-dark">
//                       <tr>
//                         <th>Name</th>
//                         <th>Weight (%)</th>
//                         <th className="text-center">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {kpis.map((kpi) => (
//                         <tr key={kpi._id}>
//                           <td>{kpi.name}</td>
//                           <td>{kpi.weight}</td>
//                           <td className="text-center">
//                             <Button
//                               variant="primary"
//                               size="sm"
//                               className="me-2"
//                               onClick={() => startEditingKpi(kpi)}
//                             >
//                               <FaEdit /> Edit
//                             </Button>
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               onClick={() => deleteKpi(kpi._id)}
//                             >
//                               <FaTrashAlt /> Delete
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 ) : (
//                   <p className="text-center">
//                     No KPIs found for this department.
//                   </p>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Add KPI Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New KPI</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="newKpiName" className="mb-3">
//               {/* <Form.Label>KPI Name:</Form.Label> */}
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={newKpi.name}
//                 onChange={handleNewKpiChange}
//                 placeholder="Enter KPI Name"
//               />
//             </Form.Group>
//             <Form.Group controlId="newKpiWeight" className="mb-3">
//               {/* <Form.Label>Weight (%):</Form.Label> */}
//               <Form.Control
//                 type="number"
//                 name="weight"
//                 value={newKpi.weight}
//                 onChange={handleNewKpiChange}
//                 placeholder="Enter Weight"
//                 min="0"
//                 max="100"
//                 step="0.01"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowAddModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button variant="success" onClick={addKpi} disabled={loading}>
//             {loading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />{" "}
//                 Adding...
//               </>
//             ) : (
//               "Add KPI"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Edit KPI Modal */}
//       <Modal show={showEditModal} onHide={cancelEditing}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit KPI</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {editingKpi && (
//             <Form>
//               <Form.Group controlId="editKpiName" className="mb-3">
//                 {/* <Form.Label>KPI Name:</Form.Label> */}
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={editingKpi.name}
//                   onChange={handleEditKpiChange}
//                   placeholder="Enter KPI Name"
//                 />
//               </Form.Group>
//               <Form.Group controlId="editKpiWeight" className="mb-3">
//                 {/* <Form.Label>Weight (%):</Form.Label> */}
//                 <Form.Control
//                   type="number"
//                   name="weight"
//                   value={editingKpi.weight}
//                   onChange={handleEditKpiChange}
//                   placeholder="Enter Weight"
//                   min="0"
//                   max="100"
//                   step="0.01"
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={cancelEditing}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={saveEditedKpi} disabled={loading}>
//             {loading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />{" "}
//                 Saving...
//               </>
//             ) : (
//               "Save Changes"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <ToastContainer position="top-right" autoClose={5000} />
//     </Container>
//     </div>
//     </div>
//   );
// };

// export default KpiManager;

// src/components/KpiManager.js

import React, { useState, useEffect } from "react";
import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Import Swal CSS
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Card,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

const KpiManager = () => {
  // State Variables
  const [designations, setDesignations] = useState([]); // Changed from departments
  const [selectedDesignation, setSelectedDesignation] = useState(""); // Changed from selectedDepartment
  const [kpis, setKpis] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKpi, setNewKpi] = useState({ name: "", weight: 0 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingKpi, setEditingKpi] = useState(null); // { _id, name, weight }
  const [loading, setLoading] = useState(false); // For API call loading states

  // Fetch Designations on Mount
  useEffect(() => {
    const fetchDesignations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("kpi/designations"); // Updated endpoint
        setDesignations(response.data.data); // Array of designation strings
        setLoading(false);
      } catch (error) {
        console.error("Error fetching designations:", error);
        toast.error("Failed to fetch designations.");
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  // Fetch KPIs when a designation is selected
  useEffect(() => {
    const fetchKpis = async () => {
      if (selectedDesignation) {
        setLoading(true);
        try {
          const response = await axios.get(
            `kpi/kpisbyname?designation=${encodeURIComponent(
              selectedDesignation
            )}`
          ); // Updated endpoint
          setKpis(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching KPIs:", error);
          toast.error("Failed to fetch KPIs.");
          setLoading(false);
        }
      } else {
        setKpis([]);
      }
    };

    fetchKpis();
  }, [selectedDesignation]);

  // Handle Designation Selection
  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
    setShowAddModal(false);
    setNewKpi({ name: "", weight: 0 });
    setShowEditModal(false);
    setEditingKpi(null);
  };

  // Handle New KPI Input Change
  const handleNewKpiChange = (e) => {
    const { name, value } = e.target;
    setNewKpi((prev) => ({
      ...prev,
      [name]: name === "weight" ? parseFloat(value) : value,
    }));
  };

  // Handle Edit KPI Input Change
  const handleEditKpiChange = (e) => {
    const { name, value } = e.target;
    setEditingKpi((prev) => ({
      ...prev,
      [name]: name === "weight" ? parseFloat(value) : value,
    }));
  };

  // Add New KPI
  const addKpi = async () => {
    if (!newKpi.name || newKpi.weight === "" || newKpi.weight === null) {
      toast.error("Please fill in all fields for the KPI.");
      return;
    }

    if (newKpi.weight < 0 || newKpi.weight > 100) {
      toast.error("Weight must be between 0 and 100.");
      return;
    }

    const totalWeight =
      kpis.reduce((acc, kpi) => acc + parseFloat(kpi.weight), 0) +
      newKpi.weight;

    if (totalWeight > 100) {
      toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("kpi/kpis", {
        // Updated endpoint
        designation: selectedDesignation, // Send designation as string
        name: newKpi.name,
        weight: newKpi.weight,
      });

      // Assuming the backend returns the created KPI with its _id
      setKpis((prev) => [...prev, response.data.data]);
      toast.success("KPI added successfully.");
      setNewKpi({ name: "", weight: 0 });
      setShowAddModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error adding KPI:", error);
      toast.error(error.response?.data?.message || "Failed to add KPI.");
      setLoading(false);
    }
  };

  // Handle KPI Deletion with SweetAlert2
  const deleteKpi = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this KPI?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(`kpi/kpis/${id}`); // Updated endpoint
          setKpis((prev) => prev.filter((kpi) => kpi._id !== id));
          toast.success("KPI deleted successfully.");
          Swal.fire("Deleted!", "The KPI has been deleted.", "success");
          setLoading(false);
        } catch (error) {
          console.error("Error deleting KPI:", error);
          toast.error("Failed to delete KPI.");
          Swal.fire("Error!", "There was an issue deleting the KPI.", "error");
          setLoading(false);
        }
      }
    });
  };

  // Start Editing KPI and Show Edit Modal
  const startEditingKpi = (kpi) => {
    setEditingKpi({ ...kpi }); // Create a copy to avoid direct state mutation
    setShowEditModal(true);
  };

  // Save Edited KPI
  const saveEditedKpi = async () => {
    if (
      !editingKpi.name ||
      editingKpi.weight === "" ||
      editingKpi.weight === null
    ) {
      toast.error("Please fill in all fields for the KPI.");
      return;
    }

    if (editingKpi.weight < 0 || editingKpi.weight > 100) {
      toast.error("Weight must be between 0 and 100.");
      return;
    }

    const totalWeight =
      kpis.reduce((acc, kpi) => {
        if (kpi._id === editingKpi._id) {
          return acc;
        }
        return acc + parseFloat(kpi.weight);
      }, 0) + editingKpi.weight;

    if (totalWeight > 100) {
      toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`kpi/kpis/${editingKpi._id}`, {
        // Updated endpoint
        name: editingKpi.name,
        weight: editingKpi.weight,
      });

      setKpis((prev) =>
        prev.map((kpi) => (kpi._id === editingKpi._id ? editingKpi : kpi))
      );
      toast.success("KPI updated successfully.");
      setEditingKpi(null);
      setShowEditModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating KPI:", error);
      toast.error(error.response?.data?.message || "Failed to update KPI.");
      setLoading(false);
    }
  };

  // Cancel Editing
  const cancelEditing = () => {
    setEditingKpi(null);
    setShowEditModal(false);
  };

  return (
    <div className="main">
      <div className="ems-content p-5 pt-1">
        <Container className="my-4 hm-set-kpi">
          <Row>
            <Col>
              <h2 className="mb-4 text-center">KPI Management</h2>
            </Col>
          </Row>

          {/* Designation Selection */}
          <Row className="mb-4">
            <Col md={6} className="mx-auto">
              <Form.Group controlId="designation">
                <Form.Label>Select Designation:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDesignation}
                  onChange={handleDesignationChange}
                  className="shadow-sm"
                >
                  <option value="">-- Select Designation --</option>
                  {designations.map((designation, index) => (
                    <option key={index} value={designation}>
                      {designation}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Display KPIs */}
          {selectedDesignation && (
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4>
                      KPIs for <em>{selectedDesignation}</em>
                    </h4>
                    <Button
                      variant="success"
                      onClick={() => setShowAddModal(true)}
                    >
                      <FaPlus /> Add New KPI
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    {kpis.length > 0 ? (
                      <Table bordered hover responsive>
                        <thead className="table-dark">
                          <tr>
                            <th>Name</th>
                            <th>Weight (%)</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kpis.map((kpi) => (
                            <tr key={kpi._id}>
                              <td>{kpi.name}</td>
                              <td>{kpi.weight}</td>
                              <td className="text-center">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  className="me-2"
                                  onClick={() => startEditingKpi(kpi)}
                                >
                                  <FaEdit /> Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => deleteKpi(kpi._id)}
                                >
                                  <FaTrashAlt /> Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p className="text-center">
                        No KPIs found for this designation.
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Add KPI Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New KPI</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="newKpiName" className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={newKpi.name}
                    onChange={handleNewKpiChange}
                    placeholder="Enter KPI Name"
                  />
                </Form.Group>
                <Form.Group controlId="newKpiWeight" className="mb-3">
                  <Form.Control
                    type="number"
                    name="weight"
                    value={newKpi.weight}
                    onChange={handleNewKpiChange}
                    placeholder="Enter Weight (%)"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button variant="success" onClick={addKpi} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Adding...
                  </>
                ) : (
                  "Add KPI"
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit KPI Modal */}
          <Modal show={showEditModal} onHide={cancelEditing}>
            <Modal.Header closeButton>
              <Modal.Title>Edit KPI</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingKpi && (
                <Form>
                  <Form.Group controlId="editKpiName" className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      value={editingKpi.name}
                      onChange={handleEditKpiChange}
                      placeholder="Enter KPI Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="editKpiWeight" className="mb-3">
                    <Form.Control
                      type="number"
                      name="weight"
                      value={editingKpi.weight}
                      onChange={handleEditKpiChange}
                      placeholder="Enter Weight (%)"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={cancelEditing}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={saveEditedKpi}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer position="top-right" autoClose={5000} />
        </Container>
      </div>
    </div>
  );
};

export default KpiManager;
