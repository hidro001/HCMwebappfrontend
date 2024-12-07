// src/components/SubordinateAttendanceView.js








// src/components/SubordinatesList.js

import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import userService from "../../../../services/Service";

// const SubordinatesList = () => {
//   const [subordinates, setSubordinates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Assuming you have the logged-in user's ID in Redux store
//   const userId = useSelector((state) => state.auth.userId);

//   useEffect(() => {
//     const fetchSubordinates = async () => {
//       try {
//         const data = await userService.getSubordinates(userId);
//         if (data.success) {
//           setSubordinates(data.data);
//         } else {
//           throw new Error(data.message || "Failed to fetch subordinates.");
//         }
//       } catch (err) {
//         console.error("Error:", err.message);
//         setError(err.message);
//         toast.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubordinates();
//   }, [userId]);

//   if (loading) {
//     return <Spinner animation="border" />;
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (subordinates.length === 0) {
//     return <p>No subordinates found.</p>;
//   }

//   return (
//     <div className="container mt-5">
//       <ToastContainer />
//       <h2>Your Subordinates</h2>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subordinates.map((sub) => (
//             <tr key={sub._id}>
//               <td>{sub.first_Name} {sub.last_Name}</td>
//               <td>{sub.email}</td>
//               <td>
//                 {/* Link to the subordinate's detail or attendance page */}
//                 <Link to={`/employee/${sub._id}/attendance`}>
//                   <Button variant="info">View Attendance</Button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };


const SubordinatesList = () => {
  const [subordinates, setSubordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve the logged-in user's ID from Redux store
//   const userId = useSelector((state) => state.auth.userId);
 const userId = localStorage.getItem("mongo_id");
 const empId = localStorage.getItem("employeeId");

 console.log(
   "file: SubordinateAttendanceView.jsx:102  SubordinatesList  userId:",
   userId
 );

  useEffect(() => {
    const fetchSubordinates = async () => {
      try {
        // Ensure userId is defined
        if (!userId) {
          throw new Error("User ID is not available.");
        }

        const data = await userService.getSubordinates(userId);
        if (data.success) {
          setSubordinates(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch subordinates.");
        }
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubordinates();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5">
        {error}
      </Alert>
    );
  }

  if (subordinates.length === 0) {
    return (
      <div className="container mt-5">
        <Alert variant="info">You have no subordinates.</Alert>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="ems-content p-5 pt-0">
        <div className="container hm-sub-ordinate-list">
          <ToastContainer />
          <h2>View Team Members</h2>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Name</th>
                <th>Email</th>

                {/* Add other relevant columns if needed */}
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {subordinates.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.employee_Id}</td>
                  <td>{sub.department}</td>
                  <td>
                    {sub.first_Name} {sub.last_Name}
                  </td>
                  <td>{sub.working_Email_Id}</td>
                  <td>
                    {/* Link to the subordinate's attendance page */}
                    <Link
                      to={`/dashboard/employee-attendance/${sub.employee_Id}`}
                    >
                      <Button variant="primary">View Attendance</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default SubordinatesList;
