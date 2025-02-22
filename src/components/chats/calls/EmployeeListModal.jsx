// src/components/EmployeeListModal.jsx
import React, { useEffect, useState } from "react";
import { fetchBoth, fetchSubordinates } from "../../../service/chatService";

export default function EmployeeListModal({ onClose, onSelectEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg p-4 overflow-y-auto max-h-[80vh]">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          Select an Employee
        </h3>
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {employees.map((employee) => (
            <li
              key={employee._id}
              className="
                p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors
              "
              onClick={() => {
                onSelectEmployee(employee.employee_Id);
                onClose();
              }}
            >
              {employee.first_Name} {employee.last_Name} ({employee.employee_Id})
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="
              bg-red-500 text-white px-4 py-2 rounded
              hover:bg-red-600 transition-colors
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



