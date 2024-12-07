// // src/components/SubordinateRatings.js

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Button,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const SubordinateRatings = () => {
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedRating, setSelectedRating] = useState(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);

//   // Fetch all ratings for subordinates on mount
//   useEffect(() => {
//     const fetchRatings = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("/kpi/ratings/subordinates");
//         setRatings(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching ratings:", error);
//         toast.error("Failed to fetch ratings.");
//         setLoading(false);
//       }
//     };

//     fetchRatings();
//   }, []);

//   // Handle viewing rating details
//   const handleViewDetails = (rating) => {
//     setSelectedRating(rating);
//     setShowDetailModal(true);
//   };

//   // Close the detail modal
//   const handleCloseModal = () => {
//     setSelectedRating(null);
//     setShowDetailModal(false);
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row>
//         <Col>
//           <h2 className="text-center mb-4">Subordinates' Ratings</h2>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" variant="primary" />
//             </div>
//           ) : ratings.length > 0 ? (
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Employee ID</th>
//                   <th>Employee Name</th>
//                   <th>Designation</th>
//                   <th>Average Rating</th>
//                   <th>Comments</th>
//                   <th>Rated By</th>
//                   <th>Submitted On</th>
//                   <th>For Year/Month</th>
//                   <th>Detail Rating</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {ratings.map((rating) => (
//                   <tr key={rating._id}>
//                     <td>{rating.ratedTo.employee_Id}</td>
//                     <td>
//                       {rating.ratedTo.first_Name} {rating.ratedTo.last_Name}
//                     </td>
//                     <td>{rating.ratedTo.designation}</td>
//                     {/* <td>{rating.ratedTo.}</td> */}
//                     <td>{rating.averageRating}</td>
//                     <td>{rating.comments || "N/A"}</td>
//                     <td>
//                       {rating.ratedBy.first_Name} {rating.ratedBy.last_Name}
//                     </td>
//                     <td>{new Date(rating.createdAt).toLocaleString()}</td>
//                     <td>
//                       {rating.year}/{rating.month}
//                     </td>
//                     <td className="text-center">
//                       <Link
//                         to={`/dashboard/employee/ratings/${rating.ratedTo._id}`}
//                         className="btn btn-info btn-sm"
//                       >
//                         <FaEye /> View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           ) : (
//             <p className="text-center">
//               No ratings found for your subordinates.
//             </p>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SubordinateRatings;

// src/components/SubordinateRatings.js

import React, { useState, useEffect, useContext } from "react";
import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext"; // Assuming you have a UserContext

const SubordinateRatings = () => {
  // const { user } = useContext(UserContext); // Access user data from context
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all ratings for subordinates on mount
  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/kpi/ratings/subordinates");
        setRatings(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        toast.error("Failed to fetch ratings.");
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="p-5 pt-1">
    <Container className="my-4 hm-team-member-reviews">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row>
        <Col>
          <h2 className="text-center mb-4">Team Member Ratings</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : ratings.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Designation</th>
                  <th>Average Rating</th>
                  <th>Comments</th>
                  <th>Rated By</th>
                  <th>Submitted On</th>
                  <th>For Year/Month</th>
                  <th>Detail Rating</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr key={rating._id}>
                    <td>{rating.ratedTo.employee_Id}</td>
                    <td>
                      {rating.ratedTo.first_Name} {rating.ratedTo.last_Name}
                    </td>
                    <td>{rating.ratedTo.designation}</td>
                    <td>{rating.averageRating}</td>
                    <td>{rating.comments || "N/A"}</td>
                    <td>
                      {rating.ratedBy.first_Name} {rating.ratedBy.last_Name}
                    </td>
                    <td>{new Date(rating.createdAt).toLocaleString()}</td>
                    <td>
                      {rating.year}/{rating.month}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/dashboard/employee/ratings/${rating.ratedTo._id}`}
                        className="btn btn-info btn-sm"
                      >
                        <FaEye /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">
              No ratings found for your subordinates.
            </p>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SubordinateRatings;

