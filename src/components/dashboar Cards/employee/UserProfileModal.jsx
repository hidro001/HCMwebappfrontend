import React from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiAward, FiTrendingUp } from "react-icons/fi";
import { BsBuilding, BsPerson, BsCalendarDate } from "react-icons/bs";
import { MdWorkOutline, MdOutlineAutoGraph } from "react-icons/md";

const UserProfileModal = ({ isOpen, onClose, user, performanceData }) => {
  const formatRating = (rating) => {
    if (typeof rating === 'number' && !isNaN(rating)) {
      return rating.toFixed(1);
    }
    return 'N/A';
  };

  const formatRatingInteger = (rating) => {
    if (typeof rating === 'number' && !isNaN(rating)) {
      return rating.toFixed(0);
    }
    return 'N/A';
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Employee Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-indigo-100 dark:border-indigo-900">
                {user.user_Avatar ? (
                  <img
                    src={user.user_Avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser className="text-3xl text-white" />
                )}
              </div>
                             {performanceData && performanceData.averageRating && (
                 <div className="absolute -right-2 -bottom-2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center border-3 border-white dark:border-gray-900">
                   <span className="text-sm font-bold">{formatRatingInteger(performanceData.averageRating)}</span>
                 </div>
               )}
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {user.first_Name} {user.last_Name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <BsBuilding className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.department}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MdWorkOutline className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Designation</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.designation}</p>
                  </div>
                </div>

                {user.email && (
                  <div className="flex items-center space-x-3">
                    <FiMail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                  </div>
                )}

                {user.phone && (
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

                     {performanceData && performanceData.averageRating && (
             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6">
               <div className="flex items-center space-x-2 mb-4">
                 <FiAward className="text-2xl text-indigo-600 dark:text-indigo-400" />
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white">Performance Overview</h4>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="text-center">
                   <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                     {formatRating(performanceData.averageRating)}
                   </div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
                 </div>

                 <div className="text-center">
                   <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                     {performanceData.totalRatings || 0}
                   </div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Total Ratings</p>
                 </div>

                 <div className="text-center">
                   <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                     {performanceData.period || "Current"}
                   </div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Period</p>
                 </div>
               </div>
             </div>
           )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FiTrendingUp className="mr-2 text-indigo-600 dark:text-indigo-400" />
                Performance Metrics
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality Score</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData?.qualityScore || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Productivity</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData?.productivity || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Attendance</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {performanceData?.attendance || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <MdOutlineAutoGraph className="mr-2 text-indigo-600 dark:text-indigo-400" />
                Recent Achievements
              </h5>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Top performer for {performanceData?.period || "current period"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Consistent high ratings
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Excellent team collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>

          {user.address && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FiMapPin className="mr-2 text-indigo-600 dark:text-indigo-400" />
                Contact Information
              </h5>
              <p className="text-gray-600 dark:text-gray-400">{user.address}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                window.open(`/employee/${user._id}`, '_blank');
                onClose();
              }}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
