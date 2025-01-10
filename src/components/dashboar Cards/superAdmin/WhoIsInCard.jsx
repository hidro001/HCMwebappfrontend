// import * as React from "react";

// function WhoIsInCard() {
//   const sections = [
//     {
//       title: "Who is in?",
//       users: [
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290", initials: "AL", type: "red" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" }
//       ]
//     },
//     {
//       title: "Late Arrival",
//       users: [
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { initials: "OL", type: "teal" },
//         { initials: "ZK", type: "orange" }
//       ]
//     },
//     {
//       title: "On Time",
//       users: [
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { initials: "AA", type: "teal" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" },
//         { img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290" }
//       ]
//     }
//   ];

//   return (
//     <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
//       <div className="flex overflow-hidden flex-col grow items-start px-6 pb-6 w-full text-base tracking-tighter bg-white rounded-xl border border-gray-200 border-solid shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] max-md:px-5 max-md:mt-9 max-md:max-w-full">
//         {sections.map((section, index) => (
//           <div key={index} className="flex flex-col w-full">
//             <div className="font-bold leading-10 text-stone-500">
//               {section.title}
//             </div>
//             <div className="flex gap-4 items-center mt-2 max-w-full text-center whitespace-nowrap w-[321px]">
//               {section.users.map((user, userIndex) => (
//                 user.img ? (
//                   <img
//                     key={userIndex}
//                     loading="lazy"
//                     src={user.img}
//                     alt=""
//                     className="object-contain shrink-0 self-stretch my-auto w-10 rounded-full aspect-square"
//                   />
//                 ) : (
//                   <div
//                     key={userIndex}
//                     className={`self-stretch px-2.5 my-auto w-10 h-10 font-semibold leading-10 bg-white rounded-3xl border border-${user.type}-300 border-solid text-stone-500`}
//                   >
//                     {user.initials}
//                   </div>
//                 )
//               ))}
//               <div className="flex flex-col self-stretch my-auto leading-3 text-lime-600 w-[38px]">
//                 <div className="font-semibold">+{index === 0 ? "255" : index === 1 ? "15" : "205"}</div>
//                 <div className="font-medium">More</div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default WhoIsInCard;

// import * as React from "react";

// function WhoIsInCard() {
//   const sections = [
//     {
//       title: "Who is in?",
//       users: [
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
//           initials: "AL",
//           type: "red",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae",
//         },
//       ],
//     },
//     {
//       title: "Late Arrival",
//       users: [
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88",
//         },
//         { initials: "OL", type: "teal" },
//         { initials: "ZK", type: "orange" },
//       ],
//     },
//     {
//       title: "On Time",
//       users: [
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8",
//         },
//         { initials: "AA", type: "teal" },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094",
//         },
//         {
//           img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="
//       flex flex-col w-full md:w-1/2
//       bg-white dark:bg-gray-800
//       text-gray-800 dark:text-gray-100
//       rounded-xl border border-gray-200 dark:border-gray-600
//       shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//       p-5
//     ">
//       {sections.map((section, index) => (
//         <div key={index} className="flex flex-col w-full mt-4 first:mt-0">
//           <div className="font-bold text-stone-500 dark:text-stone-300">
//             {section.title}
//           </div>
//           <div className="flex gap-4 items-center mt-2 flex-wrap">
//             {section.users.map((user, userIndex) => {
//               if (user.img) {
//                 return (
//                   <img
//                     key={userIndex}
//                     loading="lazy"
//                     src={user.img}
//                     alt=""
//                     className="object-contain w-10 h-10 rounded-full"
//                   />
//                 );
//               }
//               // If no img, use initials
//               return (
//                 <div
//                   key={userIndex}
//                   className={`
//                     flex items-center justify-center w-10 h-10 
//                     font-semibold leading-5 text-stone-500 dark:text-stone-300
//                     bg-white dark:bg-gray-900 
//                     rounded-full border border-${user.type}-300 dark:border-${user.type}-600
//                   `}
//                 >
//                   {user.initials}
//                 </div>
//               );
//             })}
//             <div className="flex flex-col text-center text-lime-600 dark:text-lime-400">
//               <div className="font-semibold">
//                 +{index === 0 ? "255" : index === 1 ? "15" : "205"}
//               </div>
//               <div className="font-medium">More</div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WhoIsInCard;

import * as React from "react";

function WhoIsInCard() {
  const sections = [
    {
      title: "Who is in?",
      users: [
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
          initials: "AL",
          type: "red",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae",
        },
      ],
      more: 255,
    },
    {
      title: "Late Arrival",
      users: [
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/be437db4c7e1165117af9825a0bc283bf4dd2b7c4c3c80d03dc7ba49ee8b6d88",
        },
        { initials: "OL", type: "teal" },
        { initials: "ZK", type: "orange" },
      ],
      more: 15,
    },
    {
      title: "On Time",
      users: [
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/623b5596307421c64414cfcb645814950533aa3c06fb08e7c06d258a28bbe3ba",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/84e01eb6bc6b66f6b8b79267b14168a0c17fd6ff48d799bf2754ace62420baf8",
        },
        { initials: "AA", type: "teal" },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/28c4276f30b2dee4acf1179c91f84ed75b6efd5825c0020f720bb449b1208094",
        },
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/67520629da36392b8e888a9c80903a478ffadf6129cef4590f4388b44aad52ae",
        },
      ],
      more: 205,
    },
  ];

  return (
    <div
      className="
        w-full md:w-1/2
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        rounded-xl
        shadow-2xl
        p-4
      "
    >
      {sections.map((section, index) => (
        <div key={index} className="mt-4 first:mt-0">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {section.title}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {section.users.map((user, userIndex) => {
              if (user.img) {
                // User with a photo
                return (
                  <img
                    key={userIndex}
                    loading="lazy"
                    src={user.img}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                );
              }
              // User with initials
              return (
                <div
                  key={userIndex}
                  className={`
                    flex items-center justify-center
                    w-9 h-9
                    rounded-full
                    text-sm font-medium
                    bg-white dark:bg-gray-700
                    text-gray-600 dark:text-gray-100
                    border
                    border-${user.type}-300 dark:border-${user.type}-600
                  `}
                >
                  {user.initials}
                </div>
              );
            })}

            {/* "+X More" */}
            <div className="text-lime-600 dark:text-lime-400 text-sm font-semibold">
              +{section.more} More
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WhoIsInCard;

