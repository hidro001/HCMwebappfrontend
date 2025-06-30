import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../service/axiosInstance"
import {  toast } from 'react-hot-toast';

export default function AddNewEmployeePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    doj: '',
    employee_Id: ''
  });

  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [addedBy, setAddedBy] = useState('');

  // Get current user info
  useEffect(() => {
   
    const employeeId = localStorage.getItem('employeeId');
    setAddedBy(employeeId);
  }, []);

  // Track dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return Object.values(formData).every((val) => val.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all fields', {
        style: { color: isDarkMode ? '#fff' : '#000' }
      });
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/registration/add-new-employee', {
        ...formData,
        addedBy
      });

      toast.success('Employee added successfully!', {
        style: { color: isDarkMode ? '#fff' : '#000' }
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        doj: '',
        employee_Id: ''
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong', {
        style: { color: isDarkMode ? '#fff' : '#000' }
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-4 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { name: 'firstName', label: 'First Name' },
            { name: 'lastName', label: 'Last Name' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'mobile', label: 'Mobile' },
            { name: 'doj', label: 'Date of Joining', type: 'date' },
            { name: 'employee_Id', label: 'Employee ID' }
          ].map(({ name, label, type = 'text' }) => (
            <div key={name} className={name === 'email' || name === 'employee_Id' ? 'sm:col-span-2' : ''}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

       

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={!validateForm() || loading}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ease-in-out ${
                !validateForm() || loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🔄</span> Saving...
                </span>
              ) : (
                'Save Employee'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
