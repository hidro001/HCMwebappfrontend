// // src/components/RatingManager.js
// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import "react-toastify/dist/ReactToastify.css";
// import "sweetalert2/dist/sweetalert2.min.css";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

// const RatingManager = () => {
//   const [subordinates, setSubordinates] = useState([]);
//   const [selectedSubordinate, setSelectedSubordinate] = useState(null);
//   const [kpis, setKpis] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [averageRating, setAverageRating] = useState(0);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Fetch Subordinates on Mount
//     //  const userId = localStorage.getItem("mongo_id");
//   useEffect(() => {
//     const fetchSubordinates = async () => {
   

//       try {
//         // Get the logged-in manager's ID from localStorage or context
//         const managerId = localStorage.getItem("mongo_id"); // Adjust based on your auth implementation

//         if (!managerId) {
//           toast.error("Manager ID not found.");
//           return;
//         }

//         const response = await axios.get(`/kpi/subordinates/${managerId}`);
//         setSubordinates(response.data.data);
//       } catch (error) {
//         console.error("Error fetching subordinates:", error);
//         toast.error("Failed to fetch subordinates.");
//       }
//     };

//     fetchSubordinates();
//   }, []);

//   // Fetch KPIs when a subordinate is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedSubordinate) {
//         try {
//           const response = await axios.get(
//             `/kpi/kpisbyname?department=${selectedSubordinate.department}`
//           );
//           setKpis(response.data.data);
//           // Initialize ratings with default score of 3
//           const initialRatings = {};
//           response.data.data.forEach((kpi) => {
//             initialRatings[kpi._id] = 3;
//           });
//           setRatings(initialRatings);
//         } catch (error) {
//           console.error("Error fetching KPIs:", error);
//           toast.error("Failed to fetch KPIs.");
//         }
//       }
//     };

//     fetchKpis();
//   }, [selectedSubordinate]);

//   // Calculate average rating whenever ratings change
//   useEffect(() => {
//     const scores = Object.values(ratings);
//     if (scores.length > 0) {
//       const total = scores.reduce((acc, curr) => acc + curr, 0);
//       setAverageRating((total / scores.length).toFixed(2));
//     }
//   }, [ratings]);

//   const handleRatingChange = (kpiId, value) => {
//     setRatings({
//       ...ratings,
//       [kpiId]: parseInt(value),
//     });
//   };

//   const handleSubmitRatings = async () => {
//     // Validate that all KPIs are rated
//     if (Object.keys(ratings).length !== kpis.length) {
//       toast.error("Please rate all KPIs.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedRatings = kpis.map((kpi) => ({
//         kpi: kpi._id,
//         score: ratings[kpi._id],
//       }));

//       await axios.post("/kpi/ratings", {
//         ratedTo: selectedSubordinate._id,
//         ratings: formattedRatings,
//         comments: "", // Optional: Collect comments if desired
//       });

//       toast.success("Ratings submitted successfully.");

//       // Reset state
//       setShowRatingModal(false);
//       setSelectedSubordinate(null);
//       setKpis([]);
//       setRatings({});
//       setAverageRating(0);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting ratings:", error);
//       toast.error("Failed to submit ratings.");
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row>
//         <Col>
//           <h2 className="text-center mb-4">Rate Subordinates</h2>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={10} className="mx-auto">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Employee ID</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subordinates.map((sub) => (
//                 <tr key={sub._id}>
//                   <td>
//                     {sub.first_Name} {sub.last_Name}
//                   </td>
//                   <td>{sub.designation}</td>
//                   <td>{sub.employee_Id}</td>
//                   <td>{sub.working_Email_Id}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         setSelectedSubordinate(sub);
//                         setShowRatingModal(true);
//                       }}
//                     >
//                       <FaStar /> Rate
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {subordinates.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No subordinates found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Rating Modal */}
//       <Modal
//         show={showRatingModal}
//         onHide={() => setShowRatingModal(false)}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Rate{" "}
//             {selectedSubordinate &&
//               `${selectedSubordinate.first_Name} ${selectedSubordinate.last_Name}`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {kpis.length > 0 ? (
//             <Form>
//               {kpis.map((kpi) => (
//                 <Form.Group
//                   as={Row}
//                   controlId={`kpi-${kpi._id}`}
//                   key={kpi._id}
//                   className="mb-3"
//                 >
//                   <Form.Label column sm={4}>
//                     {kpi.name}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Select
//                       value={ratings[kpi._id]}
//                       onChange={(e) =>
//                         handleRatingChange(kpi._id, e.target.value)
//                       }
//                     >
//                       <option value={1}>1 - Poor</option>
//                       <option value={2}>2 - Fair</option>
//                       <option value={3}>3 - Good</option>
//                       <option value={4}>4 - Very Good</option>
//                       <option value={5}>5 - Excellent</option>
//                     </Form.Select>
//                   </Col>
//                 </Form.Group>
//               ))}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>
//                   Average Rating:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control type="text" value={averageRating} readOnly />
//                 </Col>
//               </Form.Group>
//             </Form>
//           ) : (
//             <div className="text-center">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowRatingModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="success"
//             onClick={handleSubmitRatings}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                 />{" "}
//                 Submitting...
//               </>
//             ) : (
//               "Submit Ratings"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RatingManager;

// // src/components/RatingManager.js
// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import "react-toastify/dist/ReactToastify.css";
// import "sweetalert2/dist/sweetalert2.min.css";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

// const RatingManager = () => {
//   const [subordinates, setSubordinates] = useState([]);
//   const [selectedSubordinate, setSelectedSubordinate] = useState(null);
//   const [kpis, setKpis] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [averageRating, setAverageRating] = useState(0);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingKpis, setLoadingKpis] = useState(false); // New state for fetching KPIs

//   // Fetch Subordinates on Mount
//   useEffect(() => {
//     const fetchSubordinates = async () => {
//       try {
//         // Get the logged-in manager's ID from localStorage or context
//         const managerId = localStorage.getItem("mongo_id"); // Adjust based on your auth implementation

//         if (!managerId) {
//           toast.error("Manager ID not found.");
//           return;
//         }

//         const response = await axios.get(`/kpi/subordinates/${managerId}`);
//         setSubordinates(response.data.data);
//       } catch (error) {
//         console.error("Error fetching subordinates:", error);
//         toast.error("Failed to fetch subordinates.");
//       }
//     };

//     fetchSubordinates();
//   }, []);

//   // Fetch KPIs when a subordinate is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedSubordinate) {
//         setLoadingKpis(true); // Start loading
//         try {
//           const response = await axios.get(
//             `/kpi/kpisbyname?department=${selectedSubordinate.department}`
//           );
//           setKpis(response.data.data);
//           // Initialize ratings with default score of 3
//           const initialRatings = {};
//           response.data.data.forEach((kpi) => {
//             initialRatings[kpi._id] = 3;
//           });
//           setRatings(initialRatings);
//           setLoadingKpis(false); // End loading
//         } catch (error) {
//           console.error("Error fetching KPIs:", error);
//           toast.error("Failed to fetch KPIs.");
//           setLoadingKpis(false); // End loading even on error
//         }
//       } else {
//         setKpis([]);
//         setRatings({});
//         setAverageRating(0);
//       }
//     };

//     fetchKpis();
//   }, [selectedSubordinate]);

//   // Calculate average rating whenever ratings change
//   useEffect(() => {
//     const scores = Object.values(ratings);
//     if (scores.length > 0) {
//       const total = scores.reduce((acc, curr) => acc + curr, 0);
//       setAverageRating((total / scores.length).toFixed(2));
//     } else {
//       setAverageRating(0);
//     }
//   }, [ratings]);

//   const handleRatingChange = (kpiId, value) => {
//     setRatings({
//       ...ratings,
//       [kpiId]: parseInt(value),
//     });
//   };

//   const handleSubmitRatings = async () => {
//     // Validate that all KPIs are rated
//     if (Object.keys(ratings).length !== kpis.length) {
//       toast.error("Please rate all KPIs.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedRatings = kpis.map((kpi) => ({
//         kpi: kpi._id,
//         score: ratings[kpi._id],
//       }));

//       await axios.post("/kpi/ratings", {
//         ratedTo: selectedSubordinate._id,
//         ratings: formattedRatings,
//         comments: "", // Optional: Collect comments if desired
//       });

//       toast.success("Ratings submitted successfully.");

//       // Reset state
//       setShowRatingModal(false);
//       setSelectedSubordinate(null);
//       setKpis([]);
//       setRatings({});
//       setAverageRating(0);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting ratings:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to submit ratings.";
//       toast.error(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row>
//         <Col>
//           <h2 className="text-center mb-4">Rate Subordinates</h2>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={10} className="mx-auto">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Employee ID</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subordinates.map((sub) => (
//                 <tr key={sub._id}>
//                   <td>
//                     {sub.first_Name} {sub.last_Name}
//                   </td>
//                   <td>{sub.designation}</td>
//                   <td>{sub.employee_Id}</td>
//                   <td>{sub.working_Email_Id}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         setSelectedSubordinate(sub);
//                         setShowRatingModal(true);
//                       }}
//                     >
//                       <FaStar /> Rate
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {subordinates.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No subordinates found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Rating Modal */}
//       <Modal
//         show={showRatingModal}
//         onHide={() => setShowRatingModal(false)}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Rate{" "}
//             {selectedSubordinate &&
//               `${selectedSubordinate.first_Name} ${selectedSubordinate.last_Name}`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {loadingKpis ? (
//             <div className="text-center">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : kpis.length > 0 ? (
//             <Form>
//               {/* Average Rating at the Top */}
//               {/* <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>
//                   Average Rating:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     value={averageRating}
//                     readOnly
//                     plaintext
//                   />
//                 </Col>
//               </Form.Group> */}

//               {kpis.map((kpi) => (
//                 <Form.Group
//                   as={Row}
//                   controlId={`kpi-${kpi._id}`}
//                   key={kpi._id}
//                   className="mb-3"
//                 >
//                   <Form.Label column sm={4}>
//                     {kpi.name}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Select
//                       value={ratings[kpi._id]}
//                       onChange={(e) =>
//                         handleRatingChange(kpi._id, e.target.value)
//                       }
//                     >
//                       <option value={1}>1 - Poor</option>
//                       <option value={2}>2 - Fair</option>
//                       <option value={3}>3 - Good</option>
//                       <option value={4}>4 - Very Good</option>
//                       <option value={5}>5 - Excellent</option>
//                     </Form.Select>
//                   </Col>
//                 </Form.Group>
//               ))}
//                  <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>
//                   Average Rating:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     value={averageRating}
//                     readOnly
//                     plaintext
//                   />
//                 </Col>
//               </Form.Group>
//             </Form>
//           ) : (
//             <div className="text-center">
//               <p>No KPIs available for this department.</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowRatingModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           {kpis.length > 0 && (
//             <Button
//               variant="success"
//               onClick={handleSubmitRatings}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />{" "}
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit Ratings"
//               )}
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };


// export default RatingManager;



// // src/components/RatingManager.js
// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import "react-toastify/dist/ReactToastify.css";
// import "sweetalert2/dist/sweetalert2.min.css";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

// const RatingManager = () => {
//   const [subordinates, setSubordinates] = useState([]);
//   const [selectedSubordinate, setSelectedSubordinate] = useState(null);
//   const [kpis, setKpis] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [averageRating, setAverageRating] = useState(0);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingKpis, setLoadingKpis] = useState(false); // New state for fetching KPIs

//   // Fetch Subordinates on Mount
//   useEffect(() => {
//     const fetchSubordinates = async () => {
//       try {
//         // Get the logged-in manager's ID from localStorage or context
//         const managerId = localStorage.getItem("mongo_id"); // Adjust based on your auth implementation

//         if (!managerId) {
//           toast.error("Manager ID not found.");
//           return;
//         }

//         const response = await axios.get(`/kpi/subordinates/${managerId}`);
//         setSubordinates(response.data.data);
//       } catch (error) {
//         console.error("Error fetching subordinates:", error);
//         toast.error("Failed to fetch subordinates.");
//       }
//     };

//     fetchSubordinates();
//   }, []);

//   // Fetch KPIs when a subordinate is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedSubordinate) {
//         setLoadingKpis(true); // Start loading
//         try {
//           const response = await axios.get(
//             `/kpi/kpisbyname?department=${selectedSubordinate.department}`
//           );
//           setKpis(response.data.data);
//           // Initialize ratings with default score of 3
//           const initialRatings = {};
//           response.data.data.forEach((kpi) => {
//             initialRatings[kpi._id] = 3;
//           });
//           setRatings(initialRatings);
//           setLoadingKpis(false); // End loading
//         } catch (error) {
//           console.error("Error fetching KPIs:", error);
//           toast.error("Failed to fetch KPIs.");
//           setLoadingKpis(false); // End loading even on error
//         }
//       } else {
//         setKpis([]);
//         setRatings({});
//         setAverageRating(0);
//       }
//     };

//     fetchKpis();
//   }, [selectedSubordinate]);

//   // Calculate average rating whenever ratings change
//   useEffect(() => {
//     const scores = Object.values(ratings);
//     if (scores.length > 0) {
//       const total = scores.reduce((acc, curr) => acc + curr, 0);
//       setAverageRating((total / scores.length).toFixed(2));
//     } else {
//       setAverageRating(0);
//     }
//   }, [ratings]);

//   const handleRatingChange = (kpiId, value) => {
//     setRatings({
//       ...ratings,
//       [kpiId]: parseInt(value),
//     });
//   };

//   const handleSubmitRatings = async () => {
//     // Validate that all KPIs are rated
//     if (Object.keys(ratings).length !== kpis.length) {
//       toast.error("Please rate all KPIs.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedRatings = kpis.map((kpi) => ({
//         kpi: kpi._id,
//         score: ratings[kpi._id],
//       }));

//       await axios.post("/kpi/ratings", {
//         ratedTo: selectedSubordinate._id,
//         ratings: formattedRatings,
//         comments: "", // Optional: Collect comments if desired
//       });

//       toast.success("Ratings submitted successfully.");

//       // Reset state
//       setShowRatingModal(false);
//       setSelectedSubordinate(null);
//       setKpis([]);
//       setRatings({});
//       setAverageRating(0);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting ratings:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to submit ratings.";
//       toast.error(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row>
//         <Col>
//           <h2 className="text-center mb-4">Rate Subordinates</h2>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={10} className="mx-auto">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Employee ID</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subordinates.map((sub) => (
//                 <tr key={sub._id}>
//                   <td>
//                     {sub.first_Name} {sub.last_Name}
//                   </td>
//                   <td>{sub.designation}</td>
//                   <td>{sub.employee_Id}</td>
//                   <td>{sub.working_Email_Id}</td>
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         setSelectedSubordinate(sub);
//                         setShowRatingModal(true);
//                       }}
//                     >
//                       <FaStar /> Rate
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {subordinates.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No subordinates found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Rating Modal */}
//       <Modal
//         show={showRatingModal}
//         onHide={() => setShowRatingModal(false)}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Rate{" "}
//             {selectedSubordinate &&
//               `${selectedSubordinate.first_Name} ${selectedSubordinate.last_Name}`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {loadingKpis ? (
//             <div className="text-center">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : kpis.length > 0 ? (
//             <Form>
//               {/* Average Rating at the Top */}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>
//                   Average Rating:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     value={averageRating}
//                     readOnly
//                     plaintext
//                   />
//                 </Col>
//               </Form.Group>

//               {kpis.map((kpi) => (
//                 <Form.Group
//                   as={Row}
//                   controlId={`kpi-${kpi._id}`}
//                   key={kpi._id}
//                   className="mb-3"
//                 >
//                   <Form.Label column sm={4}>
//                     {kpi.name}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Select
//                       value={ratings[kpi._id]}
//                       onChange={(e) =>
//                         handleRatingChange(kpi._id, e.target.value)
//                       }
//                     >
//                       <option value={1}>1 - Poor</option>
//                       <option value={2}>2 - Fair</option>
//                       <option value={3}>3 - Good</option>
//                       <option value={4}>4 - Very Good</option>
//                       <option value={5}>5 - Excellent</option>
//                     </Form.Select>
//                   </Col>
//                 </Form.Group>
//               ))}
//             </Form>
//           ) : (
//             <div className="text-center">
//               <p>No KPIs available for this department.</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowRatingModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           {kpis.length > 0 && (
//             <Button
//               variant="success"
//               onClick={handleSubmitRatings}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />{" "}
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit Ratings"
//               )}
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RatingManager;

// // src/components/RatingManager.js
// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Adjust the path as needed
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import "react-toastify/dist/ReactToastify.css";
// import "sweetalert2/dist/sweetalert2.min.css";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Table,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";

// const RatingManager = () => {
//   const [subordinates, setSubordinates] = useState([]);
//   const [selectedSubordinate, setSelectedSubordinate] = useState(null);
//   const [kpis, setKpis] = useState([]);
//   const [ratings, setRatings] = useState({});
//   const [averageRating, setAverageRating] = useState(0);
//   const [showRatingModal, setShowRatingModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadingKpis, setLoadingKpis] = useState(false);
//   const [comment, setComment] = useState(""); // New state for comments

//   // Fetch Subordinates on Mount
//   useEffect(() => {
//     const fetchSubordinates = async () => {
//       try {
//         const managerId = localStorage.getItem("mongo_id");

//         if (!managerId) {
//           toast.error("Manager ID not found.");
//           return;
//         }

//         const response = await axios.get(`/kpi/subordinates/${managerId}`);
//         setSubordinates(response.data.data);
//       } catch (error) {
//         console.error("Error fetching subordinates:", error);
//         toast.error("Failed to fetch subordinates.");
//       }
//     };

//     fetchSubordinates();
//   }, []);

//   // Fetch KPIs when a subordinate is selected
//   useEffect(() => {
//     const fetchKpis = async () => {
//       if (selectedSubordinate) {
//         setLoadingKpis(true);
//         try {
//           const response = await axios.get(
//             `/kpi/kpisbyname?designation=${selectedSubordinate.designation}`
//           );
//           setKpis(response.data.data);

//           const initialRatings = {};
//           response.data.data.forEach((kpi) => {
//             initialRatings[kpi._id] = 3;
//           });
//           setRatings(initialRatings);
//           setLoadingKpis(false);
//         } catch (error) {
//           console.error("Error fetching KPIs:", error);
//           toast.error("Failed to fetch KPIs.");
//           setLoadingKpis(false);
//         }
//       } else {
//         setKpis([]);
//         setRatings({});
//         setAverageRating(0);
//       }
//     };

//     fetchKpis();
//   }, [selectedSubordinate]);

//   // Calculate average rating whenever ratings change
//   useEffect(() => {
//     const scores = Object.values(ratings);
//     if (scores.length > 0) {
//       const total = scores.reduce((acc, curr) => acc + curr, 0);
//       setAverageRating((total / scores.length).toFixed(2));
//     } else {
//       setAverageRating(0);
//     }
//   }, [ratings]);

//   const handleRatingChange = (kpiId, value) => {
//     setRatings({
//       ...ratings,
//       [kpiId]: parseInt(value),
//     });
//   };

//   const handleSubmitRatings = async () => {
//     if (Object.keys(ratings).length !== kpis.length) {
//       toast.error("Please rate all KPIs.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formattedRatings = kpis.map((kpi) => ({
//         kpi: kpi._id,
//         score: ratings[kpi._id],
//       }));

//       await axios.post("/kpi/ratings", {
//         ratedTo: selectedSubordinate._id,
//         ratings: formattedRatings,
//         comments: comment,
//       });

//       toast.success("Ratings submitted successfully.");

//       setShowRatingModal(false);
//       setSelectedSubordinate(null);
//       setKpis([]);
//       setRatings({});
//       setComment("");
//       setAverageRating(0);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting ratings:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to submit ratings.";
//       toast.error(errorMessage);
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row>
//         <Col>
//           <h2 className="text-center mb-4">Rate Subordinates</h2>
//         </Col>
//       </Row>
//       <Row>
//         <Col md={10} className="mx-auto">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                  <th>Employee ID</th>
//                 <th>Employee Name</th>
//                 <th>Designation</th>
//                 <th>Department</th>
               
            
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subordinates.map((sub) => (
//                 <tr key={sub._id}>
//                       <td>{sub.employee_Id}</td>
//                   <td>
//                     {sub.first_Name} {sub.last_Name}
//                   </td>
//                   <td>{sub.designation}</td>
//                   <td>{sub.department}</td>
              
              
//                   <td>
//                     <Button
//                       variant="primary"
//                       size="sm"
//                       onClick={() => {
//                         setSelectedSubordinate(sub);
//                         setShowRatingModal(true);
//                       }}
//                     >
//                       <FaStar /> Rate
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               {subordinates.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No subordinates found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       <Modal
//         show={showRatingModal}
//         onHide={() => setShowRatingModal(false)}
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Rate{" "}
//             {selectedSubordinate &&
//               `${selectedSubordinate.first_Name} ${selectedSubordinate.last_Name}`}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {loadingKpis ? (
//             <div className="text-center">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : kpis.length > 0 ? (
//             <Form>
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>
//                   Average Rating:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     value={averageRating}
//                     readOnly
//                     plaintext
//                   />
//                 </Col>
//               </Form.Group>

//               {kpis.map((kpi) => (
//                 <Form.Group
//                   as={Row}
//                   controlId={`kpi-${kpi._id}`}
//                   key={kpi._id}
//                   className="mb-3"
//                 >
//                   <Form.Label column sm={4}>
//                     {kpi.name}
//                   </Form.Label>
//                   <Col sm={8}>
//                     <Form.Select
//                       value={ratings[kpi._id]}
//                       onChange={(e) =>
//                         handleRatingChange(kpi._id, e.target.value)
//                       }
//                     >
//                       <option value={1}>1 - Poor</option>
//                       <option value={2}>2 - Fair</option>
//                       <option value={3}>3 - Good</option>
//                       <option value={4}>4 - Very Good</option>
//                       <option value={5}>5 - Excellent</option>
//                     </Form.Select>
//                   </Col>
//                 </Form.Group>
//               ))}

//               <Form.Group as={Row} className="mb-3" controlId="comment">
//                 <Form.Label column sm={4}>
//                   Comment:
//                 </Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     placeholder="Enter your comment here..."
//                   />
//                 </Col>
//               </Form.Group>
//             </Form>
//           ) : (
//             <div className="text-center">
//               <p>No KPIs available for this department.</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowRatingModal(false)}
//             disabled={loading}
//           >
//             Cancel
//           </Button>
//           {kpis.length > 0 && (
//             <Button
//               variant="success"
//               onClick={handleSubmitRatings}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner
//                     as="span"
//                     animation="border"
//                     size="sm"
//                     role="status"
//                     aria-hidden="true"
//                   />{" "}
//                   Submitting...
//                 </>
//               ) : (
//                 "Submit Ratings"
//               )}
//             </Button>
//           )}
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default RatingManager;
// src/components/RatingManager.js

import React, { useState, useEffect } from "react";
import axios from "./axiosConfig"; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const RatingManager = () => {
  const [subordinates, setSubordinates] = useState([]);
  const [selectedSubordinate, setSelectedSubordinate] = useState(null);
  const [kpis, setKpis] = useState([]);
  const [ratings, setRatings] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingKpis, setLoadingKpis] = useState(false);
  const [comment, setComment] = useState(""); // New state for comments
  const [month, setMonth] = useState(""); // New state for month
  const [year, setYear] = useState("");   // New state for year

  // Fetch Subordinates on Mount
  useEffect(() => {
    const fetchSubordinates = async () => {
      try {
        const managerId = localStorage.getItem("mongo_id");

        if (!managerId) {
          toast.error("Manager ID not found.");
          return;
        }

        const response = await axios.get(`/kpi/subordinates/${managerId}`);
        setSubordinates(response.data.data);
      } catch (error) {
        console.error("Error fetching subordinates:", error);
        toast.error("Failed to fetch subordinates.");
      }
    };

    fetchSubordinates();
  }, []);

  // Fetch KPIs when a subordinate is selected
  useEffect(() => {
    const fetchKpis = async () => {
      if (selectedSubordinate) {
        setLoadingKpis(true);
        try {
          const response = await axios.get(
            `/kpi/kpisbyname?designation=${selectedSubordinate.designation}`
          );
          setKpis(response.data.data);

          const initialRatings = {};
          response.data.data.forEach((kpi) => {
            initialRatings[kpi._id] = 3;
          });
          setRatings(initialRatings);
          setLoadingKpis(false);
        } catch (error) {
          console.error("Error fetching KPIs:", error);
          toast.error("Failed to fetch KPIs.");
          setLoadingKpis(false);
        }
      } else {
        setKpis([]);
        setRatings({});
        setAverageRating(0);
      }
    };

    fetchKpis();
  }, [selectedSubordinate]);

  // Calculate average rating whenever ratings change
  useEffect(() => {
    const scores = Object.values(ratings);
    if (scores.length > 0) {
      const total = scores.reduce((acc, curr) => acc + curr, 0);
      setAverageRating((total / scores.length).toFixed(2));
    } else {
      setAverageRating(0);
    }
  }, [ratings]);

  const handleRatingChange = (kpiId, value) => {
    setRatings({
      ...ratings,
      [kpiId]: parseInt(value),
    });
  };

  const handleSubmitRatings = async () => {
    // Validate that month and year are selected
    if (!month || !year) {
      toast.error("Please select both month and year.");
      return;
    }

    if (Object.keys(ratings).length !== kpis.length) {
      toast.error("Please rate all KPIs.");
      return;
    }

    setLoading(true);
    try {
      const formattedRatings = kpis.map((kpi) => ({
        kpi: kpi._id,
        score: ratings[kpi._id],
      }));

      await axios.post("/kpi/ratings", {
        ratedTo: selectedSubordinate._id,
        ratings: formattedRatings,
        comments: comment,
        month, // Include month
        year,  // Include year
      });

      toast.success("Ratings submitted successfully.");

      setShowRatingModal(false);
      setSelectedSubordinate(null);
      setKpis([]);
      setRatings({});
      setComment("");
      setMonth("");
      setYear("");
      setAverageRating(0);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting ratings:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit ratings.";
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setSelectedSubordinate(null);
    setKpis([]);
    setRatings({});
    setComment("");
    setMonth("");
    setYear("");
    setAverageRating(0);
    setShowRatingModal(false);
  };

  // Utility function to get month names
  const getMonthName = (monthNumber) => {
    return new Date(0, monthNumber - 1).toLocaleString("default", { month: "long" });
  };

  return (
    <div className="p-5">
    <Container className="my-4 hm-rate-subemp">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row>
        <Col>
          <h2 className="text-center mb-4">Rate Subordinates</h2>
        </Col>
      </Row>
      <Row>
        <Col md={10} className="mx-auto">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subordinates.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.employee_Id}</td>
                  <td>
                    {sub.first_Name} {sub.last_Name}
                  </td>
                  <td>{sub.designation}</td>
                  <td>{sub.department}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedSubordinate(sub);
                        setShowRatingModal(true);
                      }}
                    >
                      <FaStar /> Rate
                    </Button>
                  </td>
                </tr>
              ))}
              {subordinates.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No subordinates found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal
        show={showRatingModal}
        onHide={handleModalClose}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Rate{" "}
            {selectedSubordinate &&
              `${selectedSubordinate.first_Name} ${selectedSubordinate.last_Name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingKpis ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : kpis.length > 0 ? (
            <Form>
              {/* Month Selection */}
              <Form.Group as={Row} className="mb-3" controlId="month">
                <Form.Label column sm={4}>
                  Month
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="select"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  >
                    <option value="">Select Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {getMonthName(i + 1)}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Form.Group>

              {/* Year Selection */}
              <Form.Group as={Row} className="mb-3" controlId="year">
                <Form.Label column sm={4}>
                  Year
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter Year"
                    required
                    min="1900"
                    max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
                  />
                </Col>
              </Form.Group>

              {/* Average Rating Display */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  Average Rating:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    value={averageRating}
                    readOnly
                    plaintext
                  />
                </Col>
              </Form.Group>

              {/* KPIs and Ratings */}
              {kpis.map((kpi) => (
                <Form.Group
                  as={Row}
                  controlId={`kpi-${kpi._id}`}
                  key={kpi._id}
                  className="mb-3"
                >
                  <Form.Label column sm={4}>
                    {kpi.name}
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select
                      value={ratings[kpi._id]}
                      onChange={(e) =>
                        handleRatingChange(kpi._id, e.target.value)
                      }
                    >
                      <option value={1}>1 - Poor</option>
                      <option value={2}>2 - Fair</option>
                      <option value={3}>3 - Good</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={5}>5 - Excellent</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              ))}

              {/* Comments */}
              <Form.Group as={Row} className="mb-3" controlId="comment">
                <Form.Label column sm={4}>
                  Comment:
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment here..."
                  />
                </Col>
              </Form.Group>
            </Form>
          ) : (
            <div className="text-center">
              <p>No KPIs available for this department.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleModalClose}
            disabled={loading}
          >
            Cancel
          </Button>
          {kpis.length > 0 && (
            <Button
              variant="success"
              onClick={handleSubmitRatings}
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
                  Submitting...
                </>
              ) : (
                "Submit Ratings"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default RatingManager;


