import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, ChevronLeft, Sun, Moon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import BasicForm from './all-tabs/BasicForm';
import QualificationForm from './all-tabs/QualificationForm';
import ExperienceForm from './all-tabs/ExperienceForm';
import PersonalIdentityForm from './all-tabs/PersonalIdentityForm';
import AdditionalInfoForm from './all-tabs/AdditionalInfoForm';
import UploadForm from './all-tabs/upload/UploadForm';
import Review from './all-tabs/Review';
import RemarkAndSubmit from './all-tabs/RemarkAndSubmit';

const tabs = [
  'Basic',
  'Qualification',
  'Experience',
  'Identity & Bank',
  'Personal & Additional',
  'Upload',
  'Review',
  'Remark & Submit',
];

const variants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function AddNewEmployeePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_Name: '',
    last_Name: '',
    employee_Id: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/registration/login');
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/registration/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'x-device-type': 'web',
          },
        });

        if (res.data?.success) {
          setIsVerified(true);
          setUserInfo({
            first_Name: localStorage.getItem('first_Name') || '',
            last_Name: localStorage.getItem('last_Name') || '',
            employee_Id: localStorage.getItem('employeeId') || '',
          });
        } else {
          throw new Error('Invalid token');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate('/registration/login');
        } else {
          console.error('Token verification failed:', err);
        }
      }
    };

    verifyToken();
  }, []);

  const validateCurrentTab = async () => {
    const form = document.querySelector('form');
    if (form) {
      return form.reportValidity?.() ?? true;
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentTab();
    if (isValid && currentTab < tabs.length - 1) {
      setCurrentTab((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentTab > 0) setCurrentTab((prev) => prev - 1);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/registration/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-device-type': 'web',
        },
      });

      localStorage.clear();
      navigate('/registration/login');
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/registration/login');
      } else {
        console.error('Logout failed:', err);
      }
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10 overflow-auto">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-10 space-y-6 transition-all duration-300">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            Welcome,&nbsp;
            <span className="font-semibold">{userInfo.first_Name} {userInfo.last_Name}</span> &nbsp;|&nbsp;
            Employee ID: <span className="font-semibold">{userInfo.employee_Id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-700 text-red-800 dark:text-white rounded-lg hover:bg-red-200 dark:hover:bg-red-600"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentTab(index)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  currentTab === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
              {index < tabs.length - 1 && (
                <span className="self-center text-gray-400 dark:text-gray-500">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-[300px]"
          >
            {currentTab === 0 && <BasicForm />}
            {currentTab === 1 && <QualificationForm />}
            {currentTab === 2 && <ExperienceForm />}
            {currentTab === 3 && <PersonalIdentityForm />}
            {currentTab === 4 && <AdditionalInfoForm />}
            {currentTab === 5 && <UploadForm />}
            {currentTab === 6 && <Review />}
            {currentTab === 7 && <RemarkAndSubmit />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <button
            onClick={handlePrev}
            disabled={currentTab === 0}
            className="flex items-center gap-2 px-5 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={currentTab === tabs.length - 1}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
