// src/components/EmployeeListModal.jsx
import  { useEffect, useState } from "react";

import { fetchBoth, fetchSubordinates } from "../../../service/chatService";

const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
   
      try {
        // Fetch subordinates & managers in parallel
         const [subsResponse, managersResponse] = await Promise.all([
            fetchSubordinates(),
            fetchBoth(),
          ]);
        const subs = subsResponse.data?.data || [];
        const managers = managersResponse.data?.data || [];
        setEmployees([...subs, ...managers]);
      } catch (err) {
        console.error(err);
        setError("Error fetching employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h3>Select an Employee</h3>
        {error && <p style={errorStyle}>{error}</p>}
        <ul style={employeeListStyle}>
          {employees.map((employee) => (
            <li
              key={employee._id}
              style={employeeItemStyle}
              onClick={() => {
                // Pass the employee_Id or any other unique identifier as needed.
                onSelectEmployee(employee.employee_Id);
                onClose();
              }}
            >
              {employee.first_Name} {employee.last_Name} ({employee.employee_Id})
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={closeButtonStyle}>
          Close
        </button>
      </div>
    </div>
  );
};

/* Inline styles for the modal */
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const employeeListStyle = {
  listStyle: "none",
  padding: 0,
};

const employeeItemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};

const closeButtonStyle = {
  marginTop: "10px",
  padding: "8px 16px",
  backgroundColor: "#e53935",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
};

export default EmployeeListModal;
