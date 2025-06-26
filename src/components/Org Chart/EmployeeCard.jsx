

import React, { useEffect, useState, useCallback } from 'react';
import { 
  FiX, 
  FiMail, 
  FiBriefcase,
  FiLoader,
  FiHome 
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { getEmployeeByIdApi } from '../../service/getAllEmployeesApi';

const EmployeeCard = ({ id, closeCard }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmployeeByIdApi(id);
        
        if (isMounted) {
          setUser(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleClose = useCallback((e) => {
    e.preventDefault();
    closeCard();
  }, [closeCard]);

  // Loading state - simplified
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto
                     bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-spin">
          <FiLoader className="w-6 h-6 text-blue-500 dark:text-blue-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm font-medium">
          Loading employee data...
        </p>
      </div>
    );
  }

  // Error state - simplified
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto
                     bg-red-50 dark:bg-red-900/20 rounded-xl shadow-lg border border-red-200 dark:border-red-800">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mb-3">
          <FiX className="w-5 h-5 text-red-500 dark:text-red-400" />
        </div>
        <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center">
          {error}
        </p>
      </div>
    );
  }

  if (!user?.data) {
    return null;
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main card - simplified styling */}
      <div className="relative bg-white dark:bg-gray-800 
                      rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
                      p-6 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 dark:bg-gray-700 
                     hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full flex items-center justify-center
                     transition-colors duration-200 group"
        >
          <FiX className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400" />
        </button>

        <div className="space-y-4">
          {/* Header section */}
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-blue-500/20 dark:ring-blue-400/20">
                <img
                  src={user.data.user_Avatar}
                  alt={`${user.data.first_Name} ${user.data.last_Name}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" />
                )}
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {user.data.first_Name} {user.data.last_Name}
                </h2>
                <HiOutlineSparkles className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <FiBriefcase className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                    {user.data.designation}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <FiHome className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                                 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                    {user.data.department}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Work Email
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.data.working_Email_Id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;