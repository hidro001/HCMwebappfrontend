// import * as React from "react";

// function AnnouncementCard() {
//   const announcements = Array(6).fill({
//     date: { month: "Jul", day: "18" },
//     title: "Write 5 microblog articles on Instagram",
//     department: "Office / Marketing"
//   });

//   return (
//     <div className="flex flex-col items-center pt-3 pb-7 mt-8 w-full bg-white rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]   ">
//       <div className="flex gap-10 max-w-full w-[362px]">
//         <div className="grow shrink my-auto text-xl font-bold text-lime-600 w-[203px]">
//           Latest Announcements
//         </div>
//         <button className="flex gap-2 items-center p-2.5 text-sm font-semibold text-sky-500 whitespace-nowrap">
//           <span className="self-stretch my-auto">Add</span>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/489460427a9193aba32868dd75d3f76249aec7eb7e440cbf7abc6bf9a1476237?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//             alt=""
//             className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
//           />
//         </button>
//       </div>
//       <div className="shrink-0 self-stretch mt-2.5 h-px border border-solid border-zinc-300 " />
      
//       {announcements.map((announcement, index) => (
//         <React.Fragment key={index}>
//           <div className="flex gap-2 mt-7 max-w-full w-[338px]">
//             <div className="flex flex-col px-2 pt-1 pb-4 font-semibold whitespace-nowrap rounded border border-solid border-sky-950">
//               <div className="self-center text-xs text-center text-black">
//                 {announcement.date.month}
//               </div>
//               <div className="self-start mt-2 text-lg text-gray-800">
//                 {announcement.date.day}
//               </div>
//             </div>
//             <div className="flex flex-col grow shrink-0 my-auto text-gray-800 basis-0 w-fit">
//               <div className="text-base font-semibold">{announcement.title}</div>
//               <div className="self-start mt-3 text-xs">{announcement.department}</div>
//             </div>
//           </div>
//           {index < announcements.length - 1 && (
//             <div className="shrink-0 self-stretch mx-6 mt-7  h-px border border-solid border-zinc-300 max-md:mx-2.5   " />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// export default AnnouncementCard;

// import * as React from "react";

// function AnnouncementCard() {
//   const announcements = Array(6).fill({
//     date: { month: "Jul", day: "18" },
//     title: "Write 5 microblog articles on Instagram",
//     department: "Office / Marketing",
//   });

//   return (
//     <div className="
//       flex flex-col items-center pt-3 pb-7 mt-8 w-full
//       bg-white dark:bg-gray-800 
//       text-gray-800 dark:text-gray-100
//       rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       {/* Heading */}
//       <div className="flex gap-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-4">
//         <div className="grow shrink my-auto text-xl font-bold text-lime-600 dark:text-lime-400">
//           Latest Announcements
//         </div>
//         <button className="flex gap-2 items-center p-2.5 text-sm font-semibold text-sky-500 dark:text-sky-300 whitespace-nowrap">
//           <span className="my-auto">Add</span>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/489460427a9193aba32868dd75d3f76249aec7eb7e440cbf7abc6bf9a1476237"
//             alt=""
//             className="object-contain w-4 h-4"
//           />
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-2.5 h-px border border-solid border-zinc-300 dark:border-zinc-600" />

//       {/* Announcements List */}
//       {announcements.map((announcement, index) => (
//         <React.Fragment key={index}>
//           <div className="flex gap-2 mt-7 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-4">
//             {/* Date Box */}
//             <div className="
//               flex flex-col px-2 pt-1 pb-4 font-semibold
//               whitespace-nowrap rounded border border-solid
//               border-sky-950 dark:border-sky-600
//               text-black dark:text-gray-100
//             ">
//               <div className="text-xs text-center">
//                 {announcement.date.month}
//               </div>
//               <div className="mt-2 text-lg">
//                 {announcement.date.day}
//               </div>
//             </div>

//             {/* Title + Department */}
//             <div className="flex flex-col grow text-gray-800 dark:text-gray-100">
//               <div className="text-base font-semibold">
//                 {announcement.title}
//               </div>
//               <div className="mt-3 text-xs">
//                 {announcement.department}
//               </div>
//             </div>
//           </div>
//           {index < announcements.length - 1 && (
//             <div className="
//               shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
//               mx-auto mt-7 h-px border border-solid border-zinc-300 dark:border-zinc-600
//             " />
//           )}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

// export default AnnouncementCard;


// import * as React from "react";

// function AnnouncementCard() {
//   // Sample data
//   const announcements = Array(6).fill({
//     date: { month: "Jul", day: "18" },
//     title: "Write 5 microblog articles on Instagram",
//     department: "Office / Marketing",
//   });

//   return (
//     <div
//       className="
//         flex flex-col
//         w-full max-w-sm
//         rounded-xl
//         bg-white dark:bg-gray-800
//         shadow-2xl
//         p-4
//         text-gray-800 dark:text-gray-100
//         mt-7
//       "
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <h2 className="text-base font-bold text-lime-600 dark:text-lime-400">
//           Latest Announcements
//         </h2>
//         <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-300">
//           <span>Add</span>
//           {/* Simple arrow icon; you can swap or remove as needed */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M13.5 4.5L18 9m0 0l-4.5 4.5M18 9H6"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="h-px bg-gray-200 dark:bg-gray-600 mb-4" />

//       {/* Announcements List */}
//       {announcements.map((announcement, idx) => (
//         <div
//           key={idx}
//           className={`
//             flex gap-3 py-4
//             ${idx < announcements.length - 1 ? "border-b border-gray-200 dark:border-gray-600" : ""}
//           `}
//         >
//           {/* Date Box */}
//           <div
//             className="
//               flex flex-col items-center justify-center
//               w-12 h-14
//               rounded-md
//               border border-gray-300 dark:border-gray-600
//             "
//           >
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               {announcement.date.month}
//             </span>
//             <span className="text-lg font-bold">
//               {announcement.date.day}
//             </span>
//           </div>

//           {/* Title + Department */}
//           <div className="flex flex-col justify-center">
//             <span className="font-medium text-sm text-gray-800 dark:text-gray-100">
//               {announcement.title}
//             </span>
//             <span className="text-xs mt-1 text-gray-500 dark:text-gray-300">
//               {announcement.department}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AnnouncementCard;

// src/components/AnnouncementCard.jsx
import  { useEffect, useState } from "react";
import useAnnouncementStore from "../../../store/announcementStore";
import AnnouncementModal from "./AnnouncementModal"; // import our new modal

function AnnouncementCard() {
  // 1) Pull announcements + fetch method from Zustand
  const { announcements, fetchAnnouncements } = useAnnouncementStore();

  // 2) Local state for selected announcement & modal open state
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Helper to parse date
  const formatDate = (announcementDate) => {
    const dateObj = new Date(announcementDate);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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

  // 3) Handle click on an announcement item
  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  // 4) Process announcements for quick display
  const processedAnnouncements = announcements.map((ann) => {
    const dateInfo = formatDate(ann.announcementDate);
    return {
      _id: ann._id, // for the key
      month: dateInfo.month,
      day: dateInfo.day,
      subject: ann.announcementSubject,
      department: formatDepartment(ann),
      fullData: ann, // store the entire object so we can pass to the modal
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
          <button className="flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-300">
            <span>Add</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L18 9m0 0l-4.5 4.5M18 9H6"
              />
            </svg>
          </button>
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
                <span className="text-lg font-bold">
                  {item.day}
                </span>
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

      {/* 5) The Modal - only open if showModal = true */}
      <AnnouncementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        announcement={selectedAnnouncement}
      />
    </>
  );
}

export default AnnouncementCard;
