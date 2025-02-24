

// // src/component/AnnouncementCard.jsx
// import { useEffect, useState } from "react";
// import useAnnouncementStore from "../../../store/announcementStore";
// import AnnouncementModal from "./AnnouncementModal"; // import our new modal

// function AnnouncementCard() {
//   // 1) Pull announcements + fetch method from Zustand
//   const { announcements, fetchAnnouncements } = useAnnouncementStore();

//   // 2) Local state for selected announcement & modal open state
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchAnnouncements();
//   }, [fetchAnnouncements]);

//   // Helper to parse date
//   const formatDate = (announcementDate) => {
//     const dateObj = new Date(announcementDate);
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const monthIndex = dateObj.getMonth();
//     const dayNum = dateObj.getDate();
//     return {
//       month: monthNames[monthIndex] || "???",
//       day: String(dayNum),
//     };
//   };

//   // Department fallback
//   const formatDepartment = (ann) => {
//     if (ann.publish_for_all) {
//       return "All Departments";
//     }
//     const deptNames = ann.department.map((d) => d.department);
//     return deptNames.join(", ");
//   };

//   // 3) Handle click on an announcement item
//   const handleAnnouncementClick = (announcement) => {
//     setSelectedAnnouncement(announcement);
//     setShowModal(true);
//   };

//   // 4) Process announcements for quick display
//   const processedAnnouncements = announcements.map((ann) => {
//     const dateInfo = formatDate(ann.announcementDate);
//     return {
//       _id: ann._id, // for the key
//       month: dateInfo.month,
//       day: dateInfo.day,
//       subject: ann.announcementSubject,
//       department: formatDepartment(ann),
//       fullData: ann, // store the entire object so we can pass to the modal
//     };
//   });

//   return (
//     <>
//       {/* The Card with the list */}
//       <div
//         className="
//           flex flex-col
//           w-full max-w-sm
//           rounded-xl
//           bg-white dark:bg-gray-800
//           shadow-2xl
//           p-4
//           text-gray-800 dark:text-gray-100
//           mt-7
//         "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="text-base font-bold text-lime-600 dark:text-lime-400">
//             Latest Announcements
//           </h2>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

//         {/* Announcements List */}
//         {processedAnnouncements.map((item, idx) => {
//           return (
//             <div
//               key={item._id}
//               onClick={() => handleAnnouncementClick(item.fullData)}
//               className={`
//                 flex gap-3 py-4 cursor-pointer
//                 hover:bg-gray-50 dark:hover:bg-gray-700
//                 ${
//                   idx < processedAnnouncements.length - 1
//                     ? "border-b border-gray-200 dark:border-gray-600"
//                     : ""
//                 }
//               `}
//             >
//               {/* Date Box */}
//               <div
//                 className="
//                   flex flex-col items-center justify-center
//                   w-12 h-14
//                   rounded-md
//                   border border-gray-300 dark:border-gray-600
//                   flex-shrink-0
//                 "
//               >
//                 <span className="text-xs text-gray-500 dark:text-gray-400">
//                   {item.month}
//                 </span>
//                 <span className="text-lg font-bold">{item.day}</span>
//               </div>

//               {/* Title + Department */}
//               <div className="flex flex-col justify-center">
//                 <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
//                   {item.subject}
//                 </span>
//                 <span className="text-xs mt-1 text-gray-500 dark:text-gray-300">
//                   {item.department}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* 5) The Modal - only open if showModal = true */}
//       <AnnouncementModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         announcement={selectedAnnouncement}
//       />
//     </>
//   );
// }

// export default AnnouncementCard;


import { useEffect, useState } from "react";
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
  //    then by createdAt if the announcementDate is the same.
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    // Compare announcementDate first
    const dateDiff =
      new Date(b.announcementDate).getTime() - new Date(a.announcementDate).getTime();

    if (dateDiff !== 0) {
      return dateDiff;
    }

    // If announcementDate is the same, compare createdAt
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
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

  return (
    <>
      {/* The Card with the list */}
      <div
        className="
          flex flex-col
          w-full max-w-sm
          rounded-xl
          bg-white dark:bg-gray-800
          shadow-2xl
          p-4
          text-gray-800 dark:text-gray-100
          mt-7
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-lime-600 dark:text-lime-400">
            Latest Announcements
          </h2>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

        {/* Announcements List */}
        {processedAnnouncements.map((item, idx) => {
          return (
            <div
              key={item._id}
              onClick={() => handleAnnouncementClick(item.fullData)}
              className={`
                flex gap-3 py-4 cursor-pointer
                hover:bg-gray-50 dark:hover:bg-gray-700
                ${
                  idx < processedAnnouncements.length - 1
                    ? "border-b border-gray-200 dark:border-gray-600"
                    : ""
                }
              `}
            >
              {/* Date Box */}
              <div
                className="
                  flex flex-col items-center justify-center
                  w-12 h-14
                  rounded-md
                  border border-gray-300 dark:border-gray-600
                  flex-shrink-0
                "
              >
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
          );
        })}
      </div>

      {/* The Modal */}
      <AnnouncementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        announcement={selectedAnnouncement}
      />
    </>
  );
}

export default AnnouncementCard;
