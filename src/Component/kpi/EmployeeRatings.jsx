// // src/components/EmployeeRatings.js

// import React, { useState, useEffect } from "react";
// import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Spinner,
//   Card,
//   Accordion,
// } from "react-bootstrap";

// const EmployeeRatings = () => {
//   const { employeeId } = useParams(); // Assuming you're using React Router
//   const [ratings, setRatings] = useState([]);
//   const [overallAverage, setOverallAverage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [employee, setEmployee] = useState(null);

//   useEffect(() => {
//     const fetchEmployeeRatings = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/kpi/ratings/employee/${employeeId}`);
//         setRatings(response.data.data);
//         setOverallAverage(response.data.overallAverage);
//         setEmployee(response.data.data.length > 0 ? response.data.data[0].ratedTo : null);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching employee ratings:", error);
//         toast.error("Failed to fetch employee ratings.");
//         setLoading(false);
//       }
//     };

//     fetchEmployeeRatings();
//   }, [employeeId]);

//   if (loading) {
//     return (
//       <Container className="text-center my-5">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (!employee) {
//     return (
//       <Container className="text-center my-5">
//         <h3>No ratings found for this employee.</h3>
//       </Container>
//     );
//   }

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Body>
//               <h4>
//                 Ratings for {employee.first_Name} {employee.last_Name} (ID: {employee.employee_Id})
//               </h4>
//               <p><strong>Designation:</strong> {employee.designation}</p>
//               <p><strong>Average Rating:</strong> {overallAverage} / 5</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           {ratings.length > 0 ? (
//             <Accordion defaultActiveKey="0">
//               {ratings.map((rating, index) => (
//                 <Accordion.Item eventKey={index.toString()} key={rating._id}>
//                   <Accordion.Header>
//                     <strong>Rated By:</strong> {rating.ratedBy.first_Name} {rating.ratedBy.last_Name} (ID: {rating.ratedBy.employee_Id}) | <strong>Average Rating:</strong> {rating.averageRating} / 5
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <p><strong>Designation:</strong> {rating.ratedBy.designation}</p>
//                     <p><strong>Comments:</strong> {rating.comments || "N/A"}</p>
//                     <p><strong>Submitted On:</strong> {new Date(rating.createdAt).toLocaleString()}</p>
//                     <h5>KPI Scores:</h5>
//                     <Table striped bordered hover responsive>
//                       <thead>
//                         <tr>
//                           <th>KPI Name</th>
//                           <th>Weight (%)</th>
//                           <th>Score</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {rating.ratings.map((kpiRating) => (
//                           <tr key={kpiRating._id}>
//                             <td>{kpiRating.kpi.name}</td>
//                             <td>{kpiRating.kpi.weight}</td>
//                             <td>{kpiRating.score}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </Accordion.Body>
//                 </Accordion.Item>
//               ))}
//             </Accordion>
//           ) : (
//             <p>No ratings available for this employee.</p>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EmployeeRatings;

// src/components/EmployeeRatings.js

import React, { useState, useEffect } from "react";
import axios from "./axiosConfig"; // Ensure this points to the correct Axios instance
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Card,
  Accordion,
} from "react-bootstrap";

const EmployeeRatings = () => {
  const { employeeId } = useParams(); // Assuming you're using React Router
  const [ratings, setRatings] = useState([]);
  const [overallAverage, setOverallAverage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeRatings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/kpi/ratings/employee/${employeeId}`);
        if (response.data.data.length === 0) {
          setEmployee(null); // No ratings found for the employee
        } else {
          setRatings(response.data.data);
          setOverallAverage(response.data.overallAverage || 0);
          setEmployee(response.data.data[0].ratedTo || null);
        }
      } catch (error) {
        console.error("Error fetching employee ratings:", error);

        if (error.response && error.response.status === 404) {
          toast.error("Employee not found or no ratings available.");
        } else {
          toast.error("Failed to fetch employee ratings. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeRatings();
  }, [employeeId]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="text-center my-5">
        <h3>No ratings or employee details found for the provided ID.</h3>
        <p>Please verify the employee ID or contact the administrator.</p>
      </Container>
    );
  }

  return (
<div className="p-5 pt-1">

    <Container className="my-4 hm-rating-emp-single ">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>
                Ratings for {employee.first_Name || "Unknown"} {employee.last_Name || ""} (ID: {employee.employee_Id || "N/A"})
              </h4>
              <p><strong>Designation:</strong> {employee.designation || "N/A"}</p>
              <p><strong>Average Rating:</strong> {overallAverage || "0"} / 5</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {ratings.length > 0 ? (
            // <Accordion defaultActiveKey="0">
            <Accordion >
         
              {ratings.map((rating, index) => (
                <Accordion.Item eventKey={index.toString()} key={rating._id || index}>
                  <Accordion.Header>
                    <strong>Rated By:</strong> {rating.ratedBy?.first_Name || "Unknown"} {rating.ratedBy?.last_Name || ""} (ID: {rating.ratedBy?.employee_Id || "N/A"}) | |<strong>Average Rating:</strong> {rating.averageRating || "0"} / 5
                  </Accordion.Header>
                  <Accordion.Body>
                    <p><strong>Designation:</strong> {rating.ratedBy?.designation || "N/A"}</p>
                    <p><strong>Comments:</strong> {rating.comments || "No comments available"}</p>
                    <p><strong>Submitted On:</strong> {rating.createdAt ? new Date(rating.createdAt).toLocaleString() : "Unknown"}</p>
                    <h5>KPI Scores:</h5>
                    {rating.ratings && rating.ratings.length > 0 ? (
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>KPI Name</th>
                            <th>Weight (%)</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rating.ratings.map((kpiRating) => (
                            <tr key={kpiRating._id || Math.random()}>
                              <td>{kpiRating.kpi?.name || "Unknown KPI"}</td>
                              <td>{kpiRating.kpi?.weight || "N/A"}</td>
                              <td>{kpiRating.score || "N/A"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <p>No KPI ratings available.</p>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <p>No ratings available for this employee.</p>
          )}
        </Col>
      </Row>
    </Container>

    </div>
  );
};

export default EmployeeRatings;

