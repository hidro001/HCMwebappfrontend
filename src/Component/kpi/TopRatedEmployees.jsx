// // src/components/TopRatedEmployees.js

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Spinner,
//   Card,
//   Form,
//   Button,
// } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const TopRatedEmployees = () => {
//   const [topEmployee, setTopEmployee] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     month: "",
//     year: "",
//     department: "",
//     limit: 1, // Set default limit to 1
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const fetchTopRatedEmployee = async () => {
//     const { month, year, department, limit } = filters;

//     // Basic validation
//     if (!month || !year) {
//       toast.error("Please select both month and year.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const params = new URLSearchParams();

//       params.append("month", month);
//       params.append("year", year);
//       if (department.trim() !== "") {
//         params.append("department", department.trim());
//       }
//       params.append("limit", limit);

//       const response = await axios.get(`/kpi/ratings/top-rated?${params.toString()}`);
//       setTopEmployee(response.data.data); // Expecting an array with one employee
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching top rated employee:", error);
//       toast.error("Failed to fetch top rated employee.");
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchTopRatedEmployee();
//   };

//   const handleReset = () => {
//     setFilters({
//       month: "",
//       year: "",
//       department: "",
//       limit: 1,
//     });
//     setTopEmployee(null);
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Body>
//               <h4>Top Rated Employee</h4>
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={3}>
//                     <Form.Group controlId="month">
//                       <Form.Label>Month</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="month"
//                         value={filters.month}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="">Select Month</option>
//                         {Array.from({ length: 12 }, (_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group controlId="year">
//                       <Form.Label>Year</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="year"
//                         value={filters.year}
//                         onChange={handleInputChange}
//                         placeholder="Enter Year"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group controlId="department">
//                       <Form.Label>Department</Form.Label>
//                       <Form.Control
//                         type="text"
//                         name="department"
//                         value={filters.department}
//                         onChange={handleInputChange}
//                         placeholder="Enter Department (Optional)"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group controlId="limit">
//                       <Form.Label>Number of Top Employees</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="limit"
//                         value={filters.limit}
//                         onChange={handleInputChange}
//                         min="1"
//                         max="10"
//                         placeholder="e.g., 1"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col md={3}>
//                     <Button variant="primary" type="submit" block>
//                       {loading ? <Spinner animation="border" size="sm" /> : "Fetch"}
//                     </Button>
//                   </Col>
//                   <Col md={3}>
//                     <Button variant="secondary" onClick={handleReset} block>
//                       Reset
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {topEmployee && topEmployee.length > 0 && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <h5>Top Rated Employee</h5>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Department</th>
//                       <th>Average Rating</th>
//                       <th>Total Ratings</th>
//                       <th>Detail Rating</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topEmployee.map((emp, index) => (
//                       <tr key={emp.employeeId}>
//                         <td>{index + 1}</td>
//                         <td>{emp.employeeId}</td>
//                         <td>{emp.firstName} {emp.lastName}</td>
//                         <td>{emp.designation}</td>
//                         <td>{emp.department}</td>
//                         <td>{emp.averageRating} / 5</td>
//                         <td>{emp.totalRatings}</td>
//                         <td className="text-center">
//                     <Link 
//                         to={`/dashboard/employee/ratings/${emp._id}`}
//                         className="btn btn-info btn-sm"
//                       >
//                         <FaEye /> View
//                       </Link>
//                     </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default TopRatedEmployees;

// src/components/TopRatedEmployees.js

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Spinner,
//   Card,
//   Form,
//   Button,
// } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const TopRatedEmployees = () => {
//   const [topEmployees, setTopEmployees] = useState([]); // Renamed for clarity
//   const [loading, setLoading] = useState(false);
//   const [designations, setDesignations] = useState([]); // To populate designation dropdown
//   const [filters, setFilters] = useState({
//     month: "",
//     year: "",
//     designation: "", 
//     limit: 1, // Set default limit to 1
//   });

//   // Fetch Designations on Component Mount
//   useEffect(() => {
//     const fetchDesignations = async () => {
//       try {
//         const response = await axios.get("kpi/designations"); // Updated endpoint
//         setDesignations(response.data.data); // Assuming data is an array of designation strings
//       } catch (error) {
//         console.error("Error fetching designations:", error);
//         toast.error("Failed to fetch designations.");
//       }
//     };

//     fetchDesignations();
//   }, []);

//   // Auto-fetch Top Employee on Page Load for Current Month
//   useEffect(() => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11
//     const currentYear = currentDate.getFullYear();

//     setFilters((prev) => ({
//       ...prev,
//       month: currentMonth,
//       year: currentYear,
//     }));

//     fetchTopRatedEmployees(currentMonth, currentYear, "", 1); // Fetch top 1 employee without designation filter
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Handle Input Changes for Filters
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Fetch Top Rated Employees Based on Filters
//   const fetchTopRatedEmployees = async (month, year, designation, limit) => {
//     // Basic validation
//     if (!month || !year) {
//       toast.error("Please select both month and year.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const params = new URLSearchParams();

//       params.append("month", month);
//       params.append("year", year);
//       if (designation.trim() !== "") {
//         params.append("designation", designation.trim());
//       }
//       params.append("limit", limit);

//       const response = await axios.get(`kpi/ratings/top-rated?${params.toString()}`);
//       setTopEmployees(response.data.data); // Expecting an array of top employees
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching top rated employees:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch top rated employees."
//       );
//       setLoading(false);
//     }
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { month, year, designation, limit } = filters;
//     fetchTopRatedEmployees(month, year, designation, limit);
//   };

//   // Handle Form Reset
//   const handleReset = () => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1;
//     const currentYear = currentDate.getFullYear();

//     setFilters({
//       month: currentMonth,
//       year: currentYear,
//       designation: "",
//       limit: 1,
//     });
//     setTopEmployees([]);
//     fetchTopRatedEmployees(currentMonth, currentYear, "", 1); // Re-fetch top 1 employee
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Body>
//               <h4>Top Rated Employees</h4>
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   {/* Month Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="month">
//                       <Form.Label>Month</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="month"
//                         value={filters.month}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="">Select Month</option>
//                         {Array.from({ length: 12 }, (_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>

//                   {/* Year Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="year">
//                       <Form.Label>Year</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="year"
//                         value={filters.year}
//                         onChange={handleInputChange}
//                         placeholder="Enter Year"
//                         required
//                         min="1900"
//                         max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
//                       />
//                     </Form.Group>
//                   </Col>

//                   {/* Designation Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="designation">
//                       <Form.Label>Designation</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="designation"
//                         value={filters.designation}
//                         onChange={handleInputChange}
//                         placeholder="Select Designation (Optional)"
//                       >
//                         <option value="">-- All Designations --</option>
//                         {designations.map((designation, index) => (
//                           <option key={index} value={designation}>
//                             {designation}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>

//                   {/* Limit Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="limit">
//                       <Form.Label>Number of Top Employees</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="limit"
//                         value={filters.limit}
//                         onChange={handleInputChange}
//                         min="1"
//                         max="10"
//                         placeholder="e.g., 1"
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mt-3">
//                   <Col md={3}>
//                     <Button variant="primary" type="submit" block disabled={loading}>
//                       {loading ? (
//                         <>
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                           />{" "}
//                           Fetching...
//                         </>
//                       ) : (
//                         "Fetch"
//                       )}
//                     </Button>
//                   </Col>
//                   <Col md={3}>
//                     <Button
//                       variant="secondary"
//                       onClick={handleReset}
//                       block
//                       disabled={loading}
//                     >
//                       Reset
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Display Top Rated Employees */}
//       {topEmployees && topEmployees.length > 0 && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <h5>
//                   Top {topEmployees.length} Rated Employee
//                   {topEmployees.length > 1 ? "s" : ""}
//                 </h5>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Average Rating</th>
//                       <th>Total Ratings</th>
//                       <th>Detail Rating</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topEmployees.map((emp, index) => (
//                       <tr key={emp.employeeId}>
//                         <td>{index + 1}</td>
//                         <td>{emp.employeeId}</td>
//                         <td>
//                           {emp.firstName} {emp.lastName}
//                         </td>
//                         <td>{emp.designation}</td>
//                         <td>{emp.averageRating} / 5</td>
//                         <td>{emp.totalRatings}</td>
//                         <td className="text-center">
//                           <Link
//                             to={`/dashboard/employee/ratings/${emp._id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             <FaEye /> View
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* No Top Employees Found */}
//       {topEmployees && topEmployees.length === 0 && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <p className="text-center">No top-rated employees found for the selected criteria.</p>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default TopRatedEmployees;

// src/components/TopRatedEmployees.js

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Spinner,
//   Card,
//   Form,
//   Button,
// } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import PostTopPerformerModal from './PostTopPerformerModal'; // Import the modal component


// const TopRatedEmployees = () => {
  
//   const [topEmployees, setTopEmployees] = useState([]); // Renamed for clarity
//   const [loading, setLoading] = useState(false);
//   const [designations, setDesignations] = useState([]); // To populate designation dropdown
//   const [filters, setFilters] = useState({
//     month: "",
//     year: "",
//     designation: "", // Replaced 'department' with 'designation'
//     limit: 1, // Set default limit to 1
//   });
//   const [designationFetchError, setDesignationFetchError] = useState(false); // To handle designation fetch errors
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility

//   // Fetch Designations on Component Mount
//   useEffect(() => {
//     const fetchDesignations = async () => {
//       try {
//         const response = await axios.get("/kpi/designations"); // Updated endpoint
//         if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
//           setDesignations(response.data.data); // Assuming data is an array of designation strings
//           setDesignationFetchError(false);
//         } else {
//           setDesignations([]);
//           setDesignationFetchError(true);
//           toast.warn("No designations available to filter top-rated employees.");
//         }
//       } catch (error) {
//         console.error("Error fetching designations:", error);
//         setDesignations([]);
//         setDesignationFetchError(true);
//         toast.error("Failed to fetch designations.");
//       }
//     };

//     fetchDesignations();
//   }, []);

//   // Auto-fetch Top Employee on Page Load for Current Month
//   useEffect(() => {
//     const fetchInitialTopEmployee = async () => {
//       const currentDate = new Date();
//       const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11
//       const currentYear = currentDate.getFullYear();

//       setFilters((prev) => ({
//         ...prev,
//         month: currentMonth,
//         year: currentYear,
//       }));

//       // Only fetch if designations are successfully fetched and not empty
//       if (!designationFetchError) {
//         fetchTopRatedEmployees(currentMonth, currentYear, "", 1); // Fetch top 1 employee without designation filter
//       }
//     };

//     fetchInitialTopEmployee();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [designationFetchError]); // Depend on designationFetchError to ensure designations are fetched first

//   // Handle Input Changes for Filters
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Fetch Top Rated Employees Based on Filters
//   const fetchTopRatedEmployees = async (month, year, designation, limit) => {
//     // Basic validation
//     if (!month || !year) {
//       toast.error("Please select both month and year.");
//       return;
//     }

//     // If designations are required but not available, prevent fetching
//     if (designationFetchError) {
//       toast.warn("Cannot fetch top-rated employees as designations are unavailable.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const params = new URLSearchParams();

//       params.append("month", month);
//       params.append("year", year);
//       if (designation.trim() !== "") {
//         params.append("designation", designation.trim());
//       }
//       params.append("limit", limit);

//       // const response = await axios.get(`top-performance?${params.toString()}`);
//       const response = await axios.get(`kpi/ratings/top-rated?${params.toString()}`);
//       setTopEmployees(response.data.data); // Expecting an array of top employees

//       if (response.data.data.length === 0) {
//         toast.info("No top-rated employees found for the selected criteria.");
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching top rated employees:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch top rated employees."
//       );
//       setLoading(false);
//     }
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { month, year, designation, limit } = filters;
//     fetchTopRatedEmployees(month, year, designation, limit);
//   };

//   // Handle Form Reset
//   const handleReset = () => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.getMonth() + 1;
//     const currentYear = currentDate.getFullYear();

//     setFilters({
//       month: currentMonth,
//       year: currentYear,
//       designation: "",
//       limit: 1,
//     });
//     setTopEmployees([]);
//     // Only fetch if designations are successfully fetched and not empty
//     if (!designationFetchError) {
//       fetchTopRatedEmployees(currentMonth, currentYear, "", 1); // Re-fetch top 1 employee
//     }
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Body>
//               <h4>Top Rated Employees</h4>
//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   {/* Month Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="month">
//                       <Form.Label>Month</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="month"
//                         value={filters.month}
//                         onChange={handleInputChange}
//                         required
//                         disabled={designationFetchError}
//                       >
//                         <option value="">Select Month</option>
//                         {Array.from({ length: 12 }, (_, i) => (
//                           <option key={i + 1} value={i + 1}>
//                             {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>

//                   {/* Year Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="year">
//                       <Form.Label>Year</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="year"
//                         value={filters.year}
//                         onChange={handleInputChange}
//                         placeholder="Enter Year"
//                         required
//                         min="1900"
//                         max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
//                         disabled={designationFetchError}
//                       />
//                     </Form.Group>
//                   </Col>

//                   {/* Designation Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="designation">
//                       <Form.Label>Designation</Form.Label>
//                       <Form.Control
//                         as="select"
//                         name="designation"
//                         value={filters.designation}
//                         onChange={handleInputChange}
//                         placeholder="Select Designation (Optional)"
//                         disabled={designationFetchError}
//                       >
//                         <option value="">-- All Designations --</option>
//                         {designations.map((designation, index) => (
//                           <option key={index} value={designation}>
//                             {designation}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Form.Group>
//                   </Col>

//                   {/* Limit Selection */}
//                   <Col md={3}>
//                     <Form.Group controlId="limit">
//                       <Form.Label>Number of Top Employees</Form.Label>
//                       <Form.Control
//                         type="number"
//                         name="limit"
//                         value={filters.limit}
//                         onChange={handleInputChange}
//                         min="1"
//                         max="10"
//                         placeholder="e.g., 1"
//                         required
//                         disabled={designationFetchError}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row className="mt-3">
//                   <Col md={3}>
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       block
//                       disabled={loading || designationFetchError}
//                     >
//                       {loading ? (
//                         <>
//                           <Spinner
//                             as="span"
//                             animation="border"
//                             size="sm"
//                             role="status"
//                             aria-hidden="true"
//                           />{" "}
//                           Fetching...
//                         </>
//                       ) : (
//                         "Fetch"
//                       )}
//                     </Button>
//                   </Col>
//                   <Col md={3}>
//                     <Button
//                       variant="secondary"
//                       onClick={handleReset}
//                       block
//                       disabled={loading || designationFetchError}
//                     >
//                       Reset
//                     </Button>
//                   </Col>
//                   {/* "Post Performer of the Month" Button - Visible Only to Super Admins */}
//                   {
//                     <Col md={3}>
//                       <Button
//                         variant="success"
//                         onClick={() => setShowModal(true)}
//                         block
//                         disabled={topEmployees.length === 0}
//                       >
//                         Post Performer of the Month
//                       </Button>
//                     </Col>
//                   }
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Post Performer Modal */}
//       {
//         <PostTopPerformerModal
//           show={showModal}
//           handleClose={() => setShowModal(false)}
//           topEmployees={topEmployees}
//         />
//       }

//       {/* Display Top Rated Employees */}
//       {topEmployees && topEmployees.length > 0 && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <h5>
//                   Top {topEmployees.length} Rated Employee
//                   {topEmployees.length > 1 ? "s" : ""}
//                 </h5>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Average Rating</th>
//                       <th>Total Ratings</th>
//                       <th>Detail Rating</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topEmployees.map((emp, index) => (
//                       <tr key={emp.employeeId}>
//                         <td>{index + 1}</td>
//                         <td>{emp.employeeId}</td>
//                         <td>
//                           {emp.firstName} {emp.lastName}
//                         </td>
//                         <td>{emp.designation}</td>
//                         <td>{emp.averageRating} / 5</td>
//                         <td>{emp.totalRatings}</td>
//                         <td className="text-center">
//                           <Link
//                             to={`/dashboard/employee/ratings/${emp._id}`}
//                             className="btn btn-info btn-sm"
//                           >
//                             <FaEye /> View
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* No Top Employees Found */}
//       {topEmployees && topEmployees.length === 0 && !loading && !designationFetchError && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <p className="text-center">No top-rated employees found for the selected criteria.</p>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}

//       {/* Designations Not Available */}
//       {designationFetchError && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <p className="text-center text-danger">
//                   Unable to fetch designations. Please contact the administrator.
//                 </p>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default TopRatedEmployees;


// src/components/TopRatedEmployees.js

import React, { useState, useEffect } from "react";
import axios from "./axiosConfig"; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostTopPerformerModal from './PostTopPerformerModal'; // Import the modal component

const TopRatedEmployees = () => {
  const [topEmployees, setTopEmployees] = useState([]); // Renamed for clarity
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]); // To populate designation dropdown
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    designation: "", // Replaced 'department' with 'designation'
    limit: 5, // Updated default limit to 5 for practicality
  });
  const [designationFetchError, setDesignationFetchError] = useState(false); // To handle designation fetch errors
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch Designations on Component Mount
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get("/kpi/designations"); // Ensure this endpoint exists and returns an array of designation strings
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setDesignations(response.data.data); // Assuming data is an array of designation strings
          setDesignationFetchError(false);
        } else {
          setDesignations([]);
          setDesignationFetchError(true);
          toast.warn("No designations available to filter top-rated employees.");
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
        setDesignations([]);
        setDesignationFetchError(true);
        toast.error("Failed to fetch designations.");
      }
    };

    fetchDesignations();
  }, []);

  // Auto-fetch Top Employees on Page Load for Current Month and Year
  useEffect(() => {
    const fetchInitialTopEmployees = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() ; // JavaScript months are 0-11
      const currentYear = currentDate.getFullYear();

      setFilters((prev) => ({
        ...prev,
        month: currentMonth,
        year: currentYear,
      }));

      // Only fetch if designations are successfully fetched and not empty
      if (!designationFetchError) {
        fetchTopRatedEmployees(currentMonth, currentYear, "", filters.limit);
      }
    };

    fetchInitialTopEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designationFetchError]); // Depend on designationFetchError to ensure designations are fetched first

  // Handle Input Changes for Filters
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure that month, year, and limit are numbers
    if (name === "month" || name === "year" || name === "limit") {
      setFilters((prev) => ({
        ...prev,
        [name]: value === "" ? "" : parseInt(value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Fetch Top Rated Employees Based on Filters
  const fetchTopRatedEmployees = async (month, year, designation, limit) => {
    // Basic validation
    if (!month || !year) {
      toast.error("Please select both month and year.");
      return;
    }

    // Validate month and year ranges
    if (month < 1 || month > 12) {
      toast.error("Invalid month. Please select a value between 1 and 12.");
      return;
    }

    if (year < 1900 || year > 2100) {
      toast.error("Invalid year. Please enter a valid year.");
      return;
    }

    // If designations are required but not available, prevent fetching
    if (designationFetchError) {
      toast.warn("Cannot fetch top-rated employees as designations are unavailable.");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams();

      params.append("month", month);
      params.append("year", year);
      if (designation.trim() !== "") {
        params.append("designation", designation.trim());
      }
      params.append("limit", limit);

      // Ensure that the endpoint matches your backend controller
      // Based on previous updates, assuming the endpoint is '/kpi/top-rated-employees'
      const response = await axios.get(`/kpi/ratings/top-rated?${params.toString()}`);
      setTopEmployees(response.data.data); // Expecting an array of top employees

      if (response.data.data.length === 0) {
        toast.info("No top-rated employees found for the selected criteria.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching top rated employees:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch top rated employees."
      );
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { month, year, designation, limit } = filters;
    fetchTopRatedEmployees(month, year, designation, limit);
  };

  // Handle Form Reset
  const handleReset = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() ;
    const currentYear = currentDate.getFullYear();

    setFilters({
      month: currentMonth,
      year: currentYear,
      designation: "",
      limit: 5, // Reset to default limit
    });
    


    setTopEmployees([]);

    // Only fetch if designations are successfully fetched and not empty
    if (!designationFetchError) {
      fetchTopRatedEmployees(currentMonth, currentYear, "", 5); // Re-fetch top 5 employees
    }
  };

  return (
    <Container className="my-4 rzr-topperfomer p-5">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Top Rated Employees</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* Month Selection */}
                  <Col md={3}>
                    <Form.Group controlId="month">
                      <Form.Label>Month</Form.Label>
                      <Form.Control
                        as="select"
                        name="month"
                        value={filters.month}
                        onChange={handleInputChange}
                        required
                        disabled={designationFetchError}
                      >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Year Selection */}
                  <Col md={3}>
                    <Form.Group controlId="year">
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="number"
                        name="year"
                        value={filters.year}
                        onChange={handleInputChange}
                        placeholder="Enter Year"
                        required
                        min="1900"
                        max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
                        disabled={designationFetchError}
                      />
                    </Form.Group>
                  </Col>

                  {/* Designation Selection */}
                  <Col md={3}>
                    <Form.Group controlId="designation">
                      <Form.Label>Designation</Form.Label>
                      <Form.Control
                        as="select"
                        name="designation"
                        value={filters.designation}
                        onChange={handleInputChange}
                        placeholder="Select Designation (Optional)"
                        disabled={designationFetchError}
                      >
                        <option value="">-- All Designations --</option>
                        {designations.map((designation, index) => (
                          <option key={index} value={designation}>
                            {designation}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  {/* Limit Selection */}
                  <Col md={3}>
                    <Form.Group controlId="limit">
                      <Form.Label>Number of Top Employees</Form.Label>
                      <Form.Control
                        type="number"
                        name="limit"
                        value={filters.limit}
                        onChange={handleInputChange}
                        min="1"
                        max="10"
                        placeholder="e.g., 5"
                        required
                        disabled={designationFetchError}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={3}>
                    <Button
                      variant="primary"
                      type="submit"
                      block
                      disabled={loading || designationFetchError}
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
                          Fetching...
                        </>
                      ) : (
                        "Fetch"
                      )}
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="secondary"
                      onClick={handleReset}
                      block
                      disabled={loading || designationFetchError}
                    >
                      Reset
                    </Button>
                  </Col>
                  {/* "Post Performer of the Month" Button - Visible Only to Super Admins */}
                  <Col md={3}>
                    {/* 
                      To ensure that only Super Admins can see this button, 
                      you should have a user role stored in your application state (e.g., via Context or Redux).
                      For simplicity, assume there's a prop or context that provides `isSuperAdmin`.
                      Here, it's hardcoded as `true` for demonstration.
                    */}
                    {true && ( // Replace `true` with actual role check, e.g., isSuperAdmin
                      <Button
                        variant="success"
                        onClick={() => setShowModal(true)}
                        block
                        disabled={topEmployees.length === 0}
                      >
                        Post Performer of the Month
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Post Performer Modal */}
      <PostTopPerformerModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        topEmployees={topEmployees}
      />

      {/* Display Top Rated Employees */}
      {topEmployees && topEmployees.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h5>
                  Top {topEmployees.length} Rated Employee
                  {topEmployees.length > 1 ? "s" : ""}
                </h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Average Rating</th>
                      <th>Total Ratings</th>
                      <th>Detail Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topEmployees.map((emp, index) => (
                      <tr key={emp.employeeId}>
                        <td>{index + 1}</td>
                        <td>{emp.employeeId}</td>
                        <td>
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td>{emp.designation}</td>
                        <td>{emp.averageRating} / 5</td>
                        <td>{emp.totalRatings}</td>
                        <td className="text-center">
                          <Link
                            to={`/dashboard/employee/ratings/${emp._id}`} // Ensure this route exists
                            className="btn btn-info btn-sm"
                          >
                            <FaEye /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* No Top Employees Found */}
      {topEmployees && topEmployees.length === 0 && !loading && !designationFetchError && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p className="text-center">No top-rated employees found for the selected criteria.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Designations Not Available */}
      {designationFetchError && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <p className="text-center text-danger">
                  Unable to fetch designations. Please contact the administrator.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default TopRatedEmployees;


