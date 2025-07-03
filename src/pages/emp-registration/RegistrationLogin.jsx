import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

export default function RegistrationLogin() {
  const [employee_Id, setEmployee_Id] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔒 Auto-login if token is valid
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/registration/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-device-type': 'web',
          },
        });

        if (res?.data?.success) {
          navigate('/registration/edit-rest-detail');
        }
      } catch (err) {
        // Invalid or expired token — stay on login
        localStorage.removeItem('accessToken');
      }
    };

    verifyToken();
  }, [navigate]);

  // 🔐 Manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/registration/login`, {
        employee_Id,
        password,
      });

      const { success, message, data } = res.data;

      if (success && data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('employeeId', data.employee_Id);
        localStorage.setItem('first_Name', data.first_Name);
        localStorage.setItem('last_Name', data.last_Name);

        toast.success('Login Successful!');
        navigate('/registration/edit-rest-detail');
      } else {
        toast.error(message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-700">
        <img
          src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
          alt="Company Logo"
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-md"
        />
        <h2 className="text-2xl font-bold mb-6 text-white">Guest Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-300">Employee ID</label>
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={employee_Id}
              onChange={(e) => setEmployee_Id(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
