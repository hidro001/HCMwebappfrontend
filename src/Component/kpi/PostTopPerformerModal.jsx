// // src/components/PostTopPerformerModal.js

// import React, { useState } from 'react';
// import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
// import axios from './axiosConfig'; // Adjust the path as needed
// import { toast } from 'react-toastify';

// const PostTopPerformerModal = ({ show, handleClose, topEmployees }) => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [averageRating, setAverageRating] = useState('');
//   const [comment, setComment] = useState('');
//   const [department, setDepartment] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setMediaFiles([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!employeeId || !averageRating || !department || !month || !year) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('employeeId', employeeId);
//       formData.append('averageRating', averageRating);
//       formData.append('comment', comment);
//       formData.append('department', department);
//       formData.append('month', month);
//       formData.append('year', year);

//       // Append media files
//       mediaFiles.forEach(file => {
//         formData.append('media', file);
//       });

//       const response = await axios.post('kpi/posttopperformance', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success(response.data.message);
//       // Reset form fields
//       setEmployeeId('');
//       setAverageRating('');
//       setComment('');
//       setDepartment('');
//       setMonth('');
//       setYear('');
//       setMediaFiles([]);
//       handleClose();
//     } catch (error) {
//       console.error("Error posting top performer:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to post top performer."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Post Performer of the Month</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="employee">
//             <Form.Label>Select Employee</Form.Label>
//             <Form.Control
//               as="select"
//               value={employeeId}
//               onChange={(e) => setEmployeeId(e.target.value)}
//               required
//             >
//               <option value="">-- Select Employee --</option>
//               {topEmployees.map((emp) => (
//                 <option key={emp._id} value={emp._id}>
//                   {emp.firstName} {emp.lastName} (ID: {emp.employeeId})
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="averageRating">
//             <Form.Label>Average Rating</Form.Label>
//             <Form.Control
//               type="number"
//               step="0.01"
//               min="1"
//               max="5"
//               value={averageRating}
//               onChange={(e) => setAverageRating(e.target.value)}
//               placeholder="Enter Average Rating"
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="comment">
//             <Form.Label>Comments</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter comments (optional)"
//             />
//           </Form.Group>

//           <Form.Group controlId="department">
//             <Form.Label>Department</Form.Label>
//             <Form.Control
//               type="text"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               placeholder="Enter Department"
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="month">
//             <Form.Label>Month</Form.Label>
//             <Form.Control
//               as="select"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               required
//             >
//               <option value="">Select Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="year">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               placeholder="Enter Year"
//               required
//               min="1900"
//               max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
//             />
//           </Form.Group>

//           <Form.Group controlId="media">
//             <Form.Label>Upload Media</Form.Label>
//             <Form.Control
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             />
//             <Form.Text className="text-muted">
//               You can upload multiple files. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX.
//             </Form.Text>
//           </Form.Group>

//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default PostTopPerformerModal;

// src/components/PostTopPerformerModal.js

// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
// import axios from './axiosConfig'; // Adjust the path as needed
// import { toast } from 'react-toastify';

// const PostTopPerformerModal = ({ show, handleClose, topEmployees }) => {
//   const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [averageRating, setAverageRating] = useState('');
//   const [comment, setComment] = useState('');
//   const [department, setDepartment] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [mediaFiles, setMediaFiles] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Update selectedEmployee whenever selectedEmployeeId changes
//   useEffect(() => {
//     const employee = topEmployees.find(emp => emp._id === selectedEmployeeId);
//     if (employee) {
//       setSelectedEmployee(employee);
//       setAverageRating(employee.averageRating);
//       setDepartment(employee.department);
//       // Assuming designation is not meant to be editable here
//     } else {
//       setSelectedEmployee(null);
//       setAverageRating('');
//       setDepartment('');
//     }
//   }, [selectedEmployeeId, topEmployees]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setMediaFiles([...e.target.files]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!selectedEmployeeId || !averageRating || !department || !month || !year) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('employeeId', selectedEmployeeId);
//       formData.append('averageRating', averageRating);
//       formData.append('comment', comment);
//       formData.append('designation', designation); // Include designation
//       formData.append('department', department);
//       formData.append('month', month);
//       formData.append('year', year);

//       // Append media files
//       mediaFiles.forEach(file => {
//         formData.append('media', file);
//       });

//       const response = await axios.post('kpi/posttopperformance', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success(response.data.message);
//       // Reset form fields
//       setSelectedEmployeeId('');
//       setSelectedEmployee(null);
//       setAverageRating('');
//       setComment('');
//       setDepartment('');
//       setMonth('');
//       setYear('');
//       setMediaFiles([]);
//       handleClose();
//     } catch (error) {
//       console.error("Error posting top performer:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to post top performer."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle modal closure and reset form
//   const handleModalClose = () => {
//     setSelectedEmployeeId('');
//     setSelectedEmployee(null);
//     setAverageRating('');
//     setComment('');
//     setDepartment('');
//     setMonth('');
//     setYear('');
//     setMediaFiles([]);
//     handleClose();
//   };

//   return (
//     <Modal show={show} onHide={handleModalClose} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Post Performer of the Month</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           {/* Employee Selection */}
//           <Form.Group controlId="employee">
//             <Form.Label>Select Employee</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedEmployeeId}
//               onChange={(e) => setSelectedEmployeeId(e.target.value)}
//               required
//             >
//               <option value="">-- Select Employee --</option>
//               {topEmployees.map((emp) => (
//                 <option key={emp._id} value={emp._id}>
//                   {emp.firstName} {emp.lastName} (ID: {emp.employeeId})
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           {/* Display Selected Employee Details */}
//           {selectedEmployee && (
//             <>
//               <Form.Group controlId="designation">
//                 <Form.Label>Designation</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={selectedEmployee.designation}
//                   readOnly // Make read-only to prevent editing
//                 />
//               </Form.Group>

//               <Form.Group controlId="department">
//                 <Form.Label>Department</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group controlId="averageRating">
//                 <Form.Label>Average Rating</Form.Label>
//                 <Form.Control
//                   type="number"
//                   step="0.01"
//                   min="1"
//                   max="5"
//                   value={averageRating}
//                   onChange={(e) => setAverageRating(e.target.value)}
//                   placeholder="Enter Average Rating"
//                   required
//                 />
//               </Form.Group>
//             </>
//           )}

//           {/* Comments */}
//           <Form.Group controlId="comment">
//             <Form.Label>Comments</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Enter comments (optional)"
//             />
//           </Form.Group>

//           {/* Month Selection */}
//           <Form.Group controlId="month">
//             <Form.Label>Month</Form.Label>
//             <Form.Control
//               as="select"
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               required
//             >
//               <option value="">Select Month</option>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   {new Date(0, i).toLocaleString('default', { month: 'long' })}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           {/* Year Selection */}
//           <Form.Group controlId="year">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               placeholder="Enter Year"
//               required
//               min="1900"
//               max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
//             />
//           </Form.Group>

//           {/* Media Upload */}
//           <Form.Group controlId="media">
//             <Form.Label>Upload Media</Form.Label>
//             <Form.Control
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//             />
//             <Form.Text className="text-muted">
//               You can upload multiple files. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX.
//             </Form.Text>
//             {/* Display selected files */}
//             {mediaFiles.length > 0 && (
//               <ul>
//                 {mediaFiles.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             )}
//           </Form.Group>

//           {/* Submit Button */}
//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default PostTopPerformerModal;


// src/components/PostTopPerformerModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from './axiosConfig'; // Adjust the path as needed
import { toast } from 'react-toastify';

const PostTopPerformerModal = ({ show, handleClose, topEmployees }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [averageRating, setAverageRating] = useState('');
  const [comment, setComment] = useState('');
  const [department, setDepartment] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update designation when an employee is selected
  useEffect(() => {
    const employee = topEmployees.find(emp => emp._id === selectedEmployeeId);
    if (employee) {
      setDesignation(employee.designation);
      setDepartment(employee.department); // Assuming department is tied to employee
      setAverageRating(employee.averageRating); // Assuming department is tied to employee
    } else {
      setDesignation('');
      setDepartment('');
    }
  }, [selectedEmployeeId, topEmployees]);

  // Handle file selection
  const handleFileChange = (e) => {
    setMediaFiles([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!selectedEmployeeId || !averageRating || !designation || !month || !year) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('employeeId', selectedEmployeeId);
      formData.append('averageRating', averageRating);
      formData.append('comment', comment);
      formData.append('designation', designation); // Include designation
      formData.append('month', month);
      formData.append('year', year);

      // Append media files
      mediaFiles.forEach(file => {
        formData.append('media', file);
      });

      const response = await axios.post('kpi/posttopperformance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message);
      // Reset form fields
      setSelectedEmployeeId('');
      setDesignation('');
      setAverageRating('');
      setComment('');
      setDepartment('');
      setMonth('');
      setYear('');
      setMediaFiles([]);
      handleClose();
    } catch (error) {
      console.error("Error posting top performer:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to post top performer.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle modal closure and reset form
  const handleModalClose = () => {
    setSelectedEmployeeId('');
    setDesignation('');
    setAverageRating('');
    setComment('');
    setDepartment('');
    setMonth('');
    setYear('');
    setMediaFiles([]);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Post Performer of the Month</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Employee Selection */}
          <Form.Group controlId="employee">
            <Form.Label>Select Employee</Form.Label>
            <Form.Control
              as="select"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>
              {topEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName} (ID: {emp.employeeId})
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Display Selected Employee Details */}
          {designation && (
            <>
              <Form.Group controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  value={designation}
                  readOnly // Make read-only to prevent editing
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  value={department}
                  readOnly // Assuming department is tied to employee and not editable
                />
              </Form.Group>

              <Form.Group controlId="averageRating">
                <Form.Label>Average Rating</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="1"
                  max="5"
                  value={averageRating}
                  onChange={(e) => setAverageRating(e.target.value)}
                  placeholder="Enter Average Rating"
                  required
                />
              </Form.Group>
            </>
          )}

          {/* Comments */}
          <Form.Group controlId="comment">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter comments (optional)"
            />
          </Form.Group>

          {/* Month Selection */}
          <Form.Group controlId="month">
            <Form.Label>Month</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Year Selection */}
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year"
              required
              min="1900"
              max={new Date().getFullYear() + 5} // Allow up to 5 years in the future
            />
          </Form.Group>

          {/* Media Upload */}
          <Form.Group controlId="media">
            <Form.Label>Upload Media</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <Form.Text className="text-muted">
              You can upload multiple files. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX.
            </Form.Text>
            {/* Display selected files */}
            {mediaFiles.length > 0 && (
              <ul>
                {mediaFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostTopPerformerModal;

