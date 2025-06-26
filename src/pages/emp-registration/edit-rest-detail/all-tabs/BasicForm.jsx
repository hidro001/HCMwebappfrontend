import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../service/axiosInstance'

export default function BasicForm() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const empid = localStorage.getItem("employeeId");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosInstance.get(`/registration/basic-detail/${empid}`);
        setEmployee(res.data.data);
        setError('');
      } catch (err) {
        setError('Failed to load employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [empid]);

  if (loading) return <div className="text-gray-500 text-center py-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Employee Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField label="Employee ID" value={employee.employee_Id} />
          <FormField label="Name" value={`${employee.first_Name} ${employee.last_Name}`} />
          <FormField label="Email" value={employee.personal_Email_Id} />
          <FormField label="Date of Joining" value={employee.date_of_Joining} />
          <FormField label="Mobile No" value={employee.mobile_No} />
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 border border-gray-200 dark:border-gray-700 focus:outline-none cursor-not-allowed shadow-sm transition"
      />
    </div>
  );
}
