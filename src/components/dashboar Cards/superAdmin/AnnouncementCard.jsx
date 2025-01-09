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

import * as React from "react";

function AnnouncementCard() {
  const announcements = Array(6).fill({
    date: { month: "Jul", day: "18" },
    title: "Write 5 microblog articles on Instagram",
    department: "Office / Marketing",
  });

  return (
    <div className="
      flex flex-col items-center pt-3 pb-7 mt-8 w-full
      bg-white dark:bg-gray-800 
      text-gray-800 dark:text-gray-100
      rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
    ">
      {/* Heading */}
      <div className="flex gap-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-4">
        <div className="grow shrink my-auto text-xl font-bold text-lime-600 dark:text-lime-400">
          Latest Announcements
        </div>
        <button className="flex gap-2 items-center p-2.5 text-sm font-semibold text-sky-500 dark:text-sky-300 whitespace-nowrap">
          <span className="my-auto">Add</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/489460427a9193aba32868dd75d3f76249aec7eb7e440cbf7abc6bf9a1476237"
            alt=""
            className="object-contain w-4 h-4"
          />
        </button>
      </div>

      {/* Divider */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-2.5 h-px border border-solid border-zinc-300 dark:border-zinc-600" />

      {/* Announcements List */}
      {announcements.map((announcement, index) => (
        <React.Fragment key={index}>
          <div className="flex gap-2 mt-7 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl px-4">
            {/* Date Box */}
            <div className="
              flex flex-col px-2 pt-1 pb-4 font-semibold
              whitespace-nowrap rounded border border-solid
              border-sky-950 dark:border-sky-600
              text-black dark:text-gray-100
            ">
              <div className="text-xs text-center">
                {announcement.date.month}
              </div>
              <div className="mt-2 text-lg">
                {announcement.date.day}
              </div>
            </div>

            {/* Title + Department */}
            <div className="flex flex-col grow text-gray-800 dark:text-gray-100">
              <div className="text-base font-semibold">
                {announcement.title}
              </div>
              <div className="mt-3 text-xs">
                {announcement.department}
              </div>
            </div>
          </div>
          {index < announcements.length - 1 && (
            <div className="
              shrink-0 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl
              mx-auto mt-7 h-px border border-solid border-zinc-300 dark:border-zinc-600
            " />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default AnnouncementCard;

