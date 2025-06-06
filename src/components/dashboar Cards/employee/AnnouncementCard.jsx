

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiBell, 
  FiCalendar, 
  FiUsers, 
  FiChevronRight,
  FiClock,
  FiMoreVertical
} from "react-icons/fi";
import useAnnouncementStore from "../../../store/announcementStore";
import AnnouncementModal from "./AnnouncementModal";

function AnnouncementCard() {
  const { announcements, fetchAnnouncementsuser } = useAnnouncementStore();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncementsuser();
  }, [fetchAnnouncementsuser]);

  // Helper to parse date
  const formatDate = (announcementDate) => {
    const dateObj = new Date(announcementDate);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const monthIndex = dateObj.getMonth();
    const dayNum = dateObj.getDate();
    return {
      month: monthNames[monthIndex] || "???",
      day: String(dayNum),
    };
  };

  // Department fallback
  const formatDepartment = (ann) => {
    if (ann.publish_for_all) {
      return "All Departments";
    }
    const deptNames = ann.department.map((d) => d.department);
    return deptNames.join(", ");
  };

  // Get relative time
  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // On click, show details in modal
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  // Sort announcements
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    const dateDiff =
      new Date(b.announcementDate).getTime() -
      new Date(a.announcementDate).getTime();

    if (dateDiff !== 0) {
      return dateDiff;
    } else {
      return (
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    }
  });

  // Process announcements for display
  const processedAnnouncements = sortedAnnouncements.map((ann) => {
    const dateInfo = formatDate(ann.announcementDate);
    return {
      _id: ann._id,
      month: dateInfo.month,
      day: dateInfo.day,
      subject: ann.announcementSubject,
      department: formatDepartment(ann),
      relativeTime: getRelativeTime(ann.announcementDate),
      fullData: ann,
    };
  });

  // Limit to latest 5 announcements
  const limitedAnnouncements = processedAnnouncements.slice(0, 5);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          group relative overflow-hidden
          w-full h-full
          rounded-2xl
          bg-white dark:bg-gray-900/50
          backdrop-blur-sm
          border border-gray-200/60 dark:border-gray-700/60
          shadow-lg dark:shadow-2xl
          hover:shadow-xl dark:hover:shadow-3xl
          transition-all duration-300
        "
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative p-3 sm:p-4 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="flex-shrink-0 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
              >
                <FiBell className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Announcements
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {limitedAnnouncements.length} updates
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <FiMoreVertical className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Announcements List */}
          <div className="flex-1 space-y-1 overflow-hidden">
            <AnimatePresence>
              {limitedAnnouncements.map((item, idx) => (
                <motion.div
                  key={item._id}
                  custom={idx}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => handleAnnouncementClick(item.fullData)}
                  className="
                    group/item relative
                    flex items-center gap-2 sm:gap-3
                    p-2 sm:p-3
                    rounded-lg
                    cursor-pointer
                    hover:bg-gray-50 dark:hover:bg-gray-800/50
                    transition-all duration-200
                    border border-transparent
                    hover:border-gray-200 dark:hover:border-gray-700
                  "
                >
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <div className="
                      flex flex-col items-center justify-center
                      w-8 h-8 sm:w-10 sm:h-10
                      rounded-lg
                      bg-gradient-to-br from-blue-500 to-purple-600
                      text-white
                      shadow-md
                    ">
                      <span className="text-[8px] sm:text-[10px] font-medium opacity-90">
                        {item.month}
                      </span>
                      <span className="text-xs sm:text-sm font-bold leading-none">
                        {item.day}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="
                          text-xs sm:text-sm font-medium 
                          text-gray-900 dark:text-gray-100
                          line-clamp-1 mb-1
                        ">
                          {item.subject}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <FiUsers className="w-2.5 h-2.5" />
                            <span className="truncate max-w-[80px] sm:max-w-[100px]">
                              {item.department}
                            </span>
                          </div>
                          <span>•</span>
                          <span>{item.relativeTime}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 text-gray-400 group-hover/item:text-gray-600 dark:group-hover/item:text-gray-300"
                      >
                        <FiChevronRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {limitedAnnouncements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center py-6"
            >
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                <FiBell className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-center text-xs sm:text-sm">
                No announcements yet
              </p>
            </motion.div>
          )}

          {/* Footer */}
          {limitedAnnouncements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <FiCalendar className="w-3 h-3" />
                <span>Updates</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                View All
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Modal */}
      <AnnouncementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        announcement={selectedAnnouncement}
      />
    </>
  );
}

export default AnnouncementCard;