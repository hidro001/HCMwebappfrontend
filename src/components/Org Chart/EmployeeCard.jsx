

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiMail, 
  FiUser, 
  FiMapPin, 
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
    const fetchData = async () => {
      try {
        const data = await getEmployeeByIdApi(id);
        console.log(data);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center p-8 w-full max-w-sm mx-auto
                   bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div variants={loadingVariants} animate="animate">
          <FiLoader className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </motion.div>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mt-4 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading employee data...
        </motion.p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto
                   bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg border border-red-200 dark:border-red-800"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mb-3">
          <FiX className="w-6 h-6 text-red-500 dark:text-red-400" />
        </div>
        <p className="text-red-600 dark:text-red-400 text-sm font-medium text-center">
          {error}
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative w-full max-w-sm mx-auto sm:max-w-md lg:max-w-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ perspective: 1000 }}
      >
        {/* Glassmorphism background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-emerald-400/20 
                        dark:from-blue-600/20 dark:via-purple-600/20 dark:to-emerald-600/20 
                        rounded-3xl blur-xl transform rotate-1" />
        
        {/* Main card */}
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl 
                        rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 
                        p-6 sm:p-8 overflow-hidden">
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full transform -translate-x-12 translate-y-12" />
          
          {/* Close button */}
          <motion.button
            onClick={closeCard}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 dark:bg-gray-700 
                       hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full flex items-center justify-center
                       transition-colors duration-200 group"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400" />
          </motion.button>

          <motion.div variants={contentVariants} initial="hidden" animate="visible">
            {/* Header section */}
            <motion.div className="flex items-start space-x-4 mb-6" variants={itemVariants}>
              <div className="relative">
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-4 ring-blue-500/20 dark:ring-blue-400/20"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={user.data.user_Avatar}
                    alt={`${user.data.first_Name} ${user.data.last_Name}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl" />
                  )}
                </motion.div>
                
                {/* Online status indicator */}
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <motion.div 
                    className="w-full h-full bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              <div className="flex-1 min-w-0">
                <motion.div className="flex items-center space-x-2 mb-1" variants={itemVariants}>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                    {user.data.first_Name} {user.data.last_Name}
                  </h2>
                  <HiOutlineSparkles className="w-5 h-5 text-yellow-500 flex-shrink-0 animate-pulse" />
                </motion.div>
                
                <motion.div className="space-y-1" variants={itemVariants}>
                  <div className="flex items-center space-x-2 text-sm">
                    <FiBriefcase className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium truncate">
                      {user.data.designation}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <FiHome  className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                                   bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                      {user.data.department}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact information */}
            <motion.div className="space-y-3" variants={itemVariants}>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                <motion.div 
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center
                                  group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-200">
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
                </motion.div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              className="flex space-x-3 mt-6"
              variants={itemVariants}
            >
              <motion.button
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                           dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800
                           text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200
                           shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-600/25"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                View Profile
              </motion.button>
              
              <motion.button
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                           text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl font-semibold text-sm
                           transition-all duration-200 border border-gray-200 dark:border-gray-600"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmployeeCard;