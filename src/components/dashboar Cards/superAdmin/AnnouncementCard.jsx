


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAnnouncementStore from "../../../store/announcementStore";
import AnnouncementModal from "./AnnouncementModal";

function AnnouncementCard() {
  const { announcements, fetchAnnouncements } = useAnnouncementStore();

  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

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

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  // 1) Sort announcements from newest to oldest based on announcementDate,
  //    then by updatedAt if the announcementDate is the same.
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    const diff =
      new Date(b.announcementDate).getTime() - new Date(a.announcementDate).getTime();
    return diff !== 0 ? diff : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // 2) Build a processed list to display
  const processedAnnouncements = sortedAnnouncements.map((ann) => {
    const dateInfo = formatDate(ann.announcementDate);
    return {
      _id: ann._id,
      month: dateInfo.month,
      day: dateInfo.day,
      subject: ann.announcementSubject,
      department: formatDepartment(ann),
      fullData: ann,
    };
  });

  // Show the latest 10 announcements
  const latestAnnouncements = processedAnnouncements.slice(0, 5);

  return (
    <>
      {/* Announcement Card */}
      <div className="w-full max-w-sm mx-auto mt-7 rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-4 text-gray-800 dark:text-gray-100">
        {/* Header with View All Button */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-lime-600 dark:text-lime-400">
            Latest Announcements
          </h2>
          <Link
            to="/dashboard/view-announcement"
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            View All &rsaquo;
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

        {/* Announcements List */}
        {latestAnnouncements.map((item, idx) => (
          <div
            key={item._id}
            onClick={() => handleAnnouncementClick(item.fullData)}
            className={`flex gap-3 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
              idx < latestAnnouncements.length - 1 ? "border-b border-gray-200 dark:border-gray-600" : ""
            }`}
          >
            {/* Date Box */}
            <div className="flex flex-col items-center justify-center w-12 h-14 rounded-md border border-gray-300 dark:border-gray-600 flex-shrink-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.month}
              </span>
              <span className="text-lg font-bold">{item.day}</span>
            </div>

            {/* Title + Department */}
            <div className="flex flex-col justify-center">
              <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
                {item.subject}
              </span>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-300">
                {item.department}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        announcement={selectedAnnouncement}
      />
    </>
  );
}

export default AnnouncementCard;
