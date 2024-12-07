// // src/components/ViewTopPerformers.js

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
//   Modal,
// } from "react-bootstrap";
// import { FaEye, FaFileAlt, FaFilePdf, FaImage } from "react-icons/fa";

// const ViewTopPerformers = () => {
//   const [topPerformers, setTopPerformers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [designations, setDesignations] = useState([]);
//   const [filters, setFilters] = useState({
//     month: "",
//     year: "",
//     designation: "",
//   });
//   const [designationFetchError, setDesignationFetchError] = useState(false);
//   const [showMediaModal, setShowMediaModal] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState([]);

//   // Fetch Designations on Component Mount
//   useEffect(() => {
//     const fetchDesignations = async () => {
//       try {
//         const response = await axios.get("kpi/designations"); // Ensure this endpoint exists
//         if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
//           setDesignations(response.data.data);
//           setDesignationFetchError(false);
//         } else {
//           setDesignations([]);
//           setDesignationFetchError(true);
//           toast.warn("No designations available to filter top performers.");
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

//   // Handle Input Changes for Filters
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Fetch Top Performers Based on Filters
//   const fetchTopPerformers = async (month, year, designation) => {
//     // Basic validation
//     if (!month || !year) {
//       toast.error("Please select both month and year.");
//       return;
//     }

//     // If designations are required but not available, prevent fetching
//     if (designationFetchError) {
//       toast.warn("Cannot fetch top performers as designations are unavailable.");
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

//       const response = await axios.get(`kpi/gettopperformance?${params.toString()}`);
//     //   const response = await axios.get(`kpi/ratings/top-rated?${params.toString()}`);
//       setTopPerformers(response.data.data); // Expecting an array of top performers

//       if (response.data.data.length === 0) {
//         toast.info("No top performers found for the selected criteria.");
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching top performers:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch top performers."
//       );
//       setLoading(false);
//     }
//   };

//   // Handle Form Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { month, year, designation } = filters;
//     fetchTopPerformers(month, year, designation);
//   };

//   // Handle Form Reset
//   const handleReset = () => {
//     setFilters({
//       month: "",
//       year: "",
//       designation: "",
//     });
//     setTopPerformers([]);
//   };

//   // Handle Media Modal
//   const handleOpenMediaModal = (mediaUrls) => {
//     setSelectedMedia(mediaUrls);
//     setShowMediaModal(true);
//   };

//   const handleCloseMediaModal = () => {
//     setSelectedMedia([]);
//     setShowMediaModal(false);
//   };

//   // Utility function to get month names
//   const getMonthName = (monthNumber) => {
//     return new Date(0, monthNumber - 1).toLocaleString("default", { month: "long" });
//   };

//   return (
//     <Container className="my-4">
//       <ToastContainer position="top-right" autoClose={5000} />
//       <Row className="mb-4">
//         <Col>
//           <Card>
//             <Card.Body>
//               <h4>View Top Performers</h4>
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
//                             {getMonthName(i + 1)}
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

//                   {/* Submit and Reset Buttons */}
//                   <Col md={3} className="d-flex align-items-end">
//                     <Button
//                       variant="primary"
//                       type="submit"
//                       className="mr-2"
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
//                 </Row>

//                 <Row className="mt-3">
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
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Display Top Performers */}
//       {topPerformers && topPerformers.length > 0 && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <h5>
//                   Top {topPerformers.length} Performer{topPerformers.length > 1 ? "s" : ""}
//                 </h5>
//                 <Table striped bordered hover responsive>
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Employee ID</th>
//                       <th>Name</th>
//                       <th>Designation</th>
//                       <th>Department</th>
//                       <th>Average Rating</th>
//                       <th>Comments</th>
//                       <th>Media</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {topPerformers.map((perf, index) => (
//                       <tr key={perf._id}>
//                         <td>{index + 1}</td>
//                         <td>{perf.employee.employee_Id}</td>
//                         <td>
//                           {perf.employee.first_Name
//                           } {perf.employee.last_Name}
//                         </td>
//                         <td>{perf.employee.designation}</td>
//                         <td>{perf.employee.department}</td>
//                         <td>{perf.averageRating} / 5</td>
//                         <td>{perf.comment}</td>
//                         <td>
//                           {perf.media && perf.media.length > 0 ? (
//                             <>
//                               <Button
//                                 variant="link"
//                                 onClick={() => handleOpenMediaModal(perf.media)}
//                               >
//                                 <FaEye /> View
//                               </Button>
//                             </>
//                           ) : (
//                             "N/A"
//                           )}
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

//       {/* No Top Performers Found */}
//       {topPerformers && topPerformers.length === 0 && !loading && !designationFetchError && (
//         <Row>
//           <Col>
//             <Card>
//               <Card.Body>
//                 <p className="text-center">No top performers found for the selected criteria.</p>
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

//       {/* Media Modal */}
//       <Modal show={showMediaModal} onHide={handleCloseMediaModal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Media Attachments</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedMedia && selectedMedia.length > 0 ? (
//             <Row>
//               {selectedMedia.map((mediaUrl, index) => {
//                 const fileExtension = mediaUrl.split('.').pop().toLowerCase();
//                 let icon;

//                 // Determine the icon based on file type
//                 if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
//                   icon = <FaImage size={40} />;
//                 } else if (['pdf'].includes(fileExtension)) {
//                   icon = <FaFilePdf size={40} />;
//                 } else if (['doc', 'docx'].includes(fileExtension)) {
//                   icon = <FaFileAlt size={40} />;
//                 } else {
//                   icon = <FaFileAlt size={40} />;
//                 }

//                 return (
//                   <Col md={4} key={index} className="text-center mb-4">
//                     <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
//                       {icon}
//                       <p className="mt-2">Attachment {index + 1}</p>
//                     </a>
//                   </Col>
//                 );
//               })}
//             </Row>
//           ) : (
//             <p>No media attachments available.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseMediaModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ViewTopPerformers;

// src/components/ViewTopPerformers.js

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
  Modal,
} from "react-bootstrap";
import { FaEye, FaFileAlt, FaFilePdf, FaImage } from "react-icons/fa";

const ViewTopPerformers = () => {
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    designation: "",
  });
  const [designationFetchError, setDesignationFetchError] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  // Fetch Designations on Component Mount
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get("/kpi/designations"); // Ensure this endpoint exists
        if (
          response.data &&
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setDesignations(response.data.data);
          setDesignationFetchError(false);
        } else {
          setDesignations([]);
          setDesignationFetchError(true);
          toast.warn("No designations available to filter top performers.");
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

  // Initial Fetch for Current Month and Year on Component Mount
  useEffect(() => {
    const fetchInitialTopPerformers = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // JavaScript months are 0-11
      const currentYear = currentDate.getFullYear();

      // Update filters with current month and year
      setFilters((prev) => ({
        ...prev,
        month: currentMonth,
        year: currentYear,
      }));

      // Fetch top performers without designation filter
      await fetchTopPerformers(currentMonth, currentYear, "");
    };

    // Only fetch if designations are successfully fetched or if no designation filter is applied
    if (!designationFetchError) {
      fetchInitialTopPerformers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designationFetchError]); // Depend on designationFetchError to ensure designations are fetched first

  // Handle Input Changes for Filters
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch Top Performers Based on Filters
  const fetchTopPerformers = async (month, year, designation) => {
    // Basic validation
    if (!month || !year) {
      toast.error("Please select both month and year.");
      return;
    }

    // If designations are required but not available, prevent fetching
    if (designationFetchError) {
      toast.warn(
        "Cannot fetch top performers as designations are unavailable."
      );
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

      const response = await axios.get(
        `/kpi/gettopperformance?${params.toString()}`
      );
      // const response = await axios.get(`kpi/ratings/top-rated?${params.toString()}`);
      setTopPerformers(response.data.data); // Expecting an array of top performers

      if (response.data.data.length === 0) {
        toast.info("No top performers found for the selected criteria.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching top performers:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch top performers."
      );
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { month, year, designation } = filters;
    fetchTopPerformers(month, year, designation);
  };

  // Handle Form Reset
  const handleReset = () => {
    setFilters({
      month: "",
      year: "",
      designation: "",
    });
    setTopPerformers([]);
  };

  // Handle Media Modal
  const handleOpenMediaModal = (mediaUrls) => {
    setSelectedMedia(mediaUrls);
    setShowMediaModal(true);
  };

  const handleCloseMediaModal = () => {
    setSelectedMedia([]);
    setShowMediaModal(false);
  };

  // Utility function to get month names
  const getMonthName = (monthNumber) => {
    return new Date(0, monthNumber - 1).toLocaleString("default", {
      month: "long",
    });
  };

  return (
    <Container className="my-4 rzr-topperfomer p-5">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>View Top Performers</h4>
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
                            {getMonthName(i + 1)}
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

                  {/* Submit Button */}
                  <Col md={3} className="d-flex align-items-end">
                    <Button
                      variant="primary"
                      type="submit"
                      className="mr-2"
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
                </Row>

                <Row className="mt-3">
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
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Display Top Performers */}
      {topPerformers && topPerformers.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h5>
                  Top {topPerformers.length} Performer
                  {topPerformers.length > 1 ? "s" : ""}
                </h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>

                      <th>Profile</th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Average Rating</th>
                      <th>Comments</th>
                      <th>Month/Year</th>
                      <th>Media</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformers.map((perf, index) => (
                      <tr key={perf._id}>
                        <td>{index + 1}</td>
                        <td>
                          {perf.employee && perf.employee.user_Avatar ? (
                            <img
                              src={perf.employee.user_Avatar}
                              style={{ width: "40px" }}
                              alt={`${perf.employee.first_Name} ${perf.employee.last_Name}`}
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td>
                          {perf.employee ? perf.employee.employee_Id : "N/A"}
                        </td>
                        <td>
                          {perf.employee
                            ? `${perf.employee.first_Name} ${perf.employee.last_Name}`
                            : "N/A"}
                        </td>
                        <td>
                          {perf.employee ? perf.employee.designation : "N/A"}
                        </td>
                        <td>
                          {perf.employee ? perf.employee.department : "N/A"}
                        </td>
                        <td>{perf.averageRating} / 5</td>
                        <td>{perf.comment}</td>
                        <td>
                          {perf.month}/{perf.year}
                        </td>
                        <td>
                          {perf.media && perf.media.length > 0 ? (
                            <Button
                              variant="link"
                              onClick={() => handleOpenMediaModal(perf.media)}
                            >
                              <FaEye /> View
                            </Button>
                          ) : (
                            "N/A"
                          )}
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

      {/* No Top Performers Found */}
      {topPerformers &&
        topPerformers.length === 0 &&
        !loading &&
        !designationFetchError && (
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <p className="text-center">
                    No top performers found for the selected criteria.
                  </p>
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
                  Unable to fetch designations. Please contact the
                  administrator.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Media Modal */}
      <Modal show={showMediaModal} onHide={handleCloseMediaModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Media Attachments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMedia && selectedMedia.length > 0 ? (
            <Row>
              {selectedMedia.map((mediaUrl, index) => {
                const fileExtension = mediaUrl.split(".").pop().toLowerCase();
                let icon;

                // Determine the icon based on file type
                if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
                  icon = <FaImage size={40} />;
                } else if (["pdf"].includes(fileExtension)) {
                  icon = <FaFilePdf size={40} />;
                } else if (["doc", "docx"].includes(fileExtension)) {
                  icon = <FaFileAlt size={40} />;
                } else {
                  icon = <FaFileAlt size={40} />;
                }

                return (
                  <Col md={4} key={index} className="text-center mb-4">
                    <a
                      href={mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {icon}
                      <p className="mt-2">Attachment {index + 1}</p>
                    </a>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <p>No media attachments available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMediaModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewTopPerformers;
