


import React, { useEffect, useState } from "react";
import useAuthStore from "../../../store/store"; 
import axiosInstance from "../../../service/axiosInstance"; 

const EmployeeListModal = ({ onClose, onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      
  

      try {
        // Fetch subordinates & managers in parallel using your custom axiosInstance
        const [subsResponse, managersResponse] = await Promise.all([
          axiosInstance.get("/admin/subordinates"),
          axiosInstance.get("/admin/both"),
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
