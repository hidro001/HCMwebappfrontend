// // src/components/EmployeeListModal.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
//   const [employees, setEmployees] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         setError("Access token not found. Please log in.");
//         return;
//       }
//       try {
//         // Fetch subordinates & managers in parallel
//         const [subsResponse, managersResponse] = await Promise.all([
//           axios.get("https://demoapi.humanmaximizer.com/api/v1/admin/subordinates", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }),
//           axios.get("https://demoapi.humanmaximizer.com/api/v1/admin/both", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }),
//         ]);
//         const subs = subsResponse.data?.data || [];
//         const managers = managersResponse.data?.data || [];
//         setEmployees([...subs, ...managers]);
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching employees. Please try again later.");
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <div style={modalOverlayStyle}>
//       <div style={modalContentStyle}>
//         <h3>Select an Employee</h3>
//         {error && <p style={errorStyle}>{error}</p>}
//         <ul style={employeeListStyle}>
//           {employees.map((employee) => (
//             <li
//               key={employee._id}
//               style={employeeItemStyle}
//               onClick={() => {
//                 // Pass the employee_Id or any other unique identifier as needed.
//                 onSelectEmployee(employee.employee_Id);
//                 onClose();
//               }}
//             >
//               {employee.first_Name} {employee.last_Name} ({employee.employee_Id})
//             </li>
//           ))}
//         </ul>
//         <button onClick={onClose} style={closeButtonStyle}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// /* Inline styles for the modal */
// const modalOverlayStyle = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0,0,0,0.6)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 3000,
// };

// const modalContentStyle = {
//   backgroundColor: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
//   width: "90%",
//   maxWidth: "400px",
//   maxHeight: "80vh",
//   overflowY: "auto",
// };

// const employeeListStyle = {
//   listStyle: "none",
//   padding: 0,
// };

// const employeeItemStyle = {
//   padding: "10px",
//   borderBottom: "1px solid #ddd",
//   cursor: "pointer",
// };

// const closeButtonStyle = {
//   marginTop: "10px",
//   padding: "8px 16px",
//   backgroundColor: "#e53935",
//   color: "#fff",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const errorStyle = {
//   color: "red",
// };

// export default EmployeeListModal;



import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token not found. Please log in.");
        return;
      }
      try {
        // Fetch subordinates & managers in parallel
        const [subsResponse, managersResponse] = await Promise.all([
          axios.get("https://demoapi.humanmaximizer.com/api/v1/admin/subordinates", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get("https://demoapi.humanmaximizer.com/api/v1/admin/both", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[3000]">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg w-11/12 max-w-md max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Select an Employee</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ul className="list-none p-0">
          {employees.map((employee) => (
            <li
              key={employee._id}
              className="py-2 px-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                onSelectEmployee(employee.employee_Id);
                onClose();
              }}
            >
              {employee.first_Name} {employee.last_Name} ({employee.employee_Id})
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeListModal;
