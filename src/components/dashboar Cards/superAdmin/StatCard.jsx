// import * as React from "react";

// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] rounded-lg">
//       <div className="flex flex-col w-full max-md:mt-3.5">
//         <div className="flex gap-2 items-center self-end p-1.5 text-lg font-semibold text-lime-600 min-h-[44px]">
//           <button className="flex gap-2 items-center">
//             <span className="self-stretch my-auto">See Detail</span>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
//             />
//           </button>
//         </div>
//         <div
//           className="flex  flex-col pt-5 mt-0 rounded-lg max-md:mr-2 "
//         >
//           <div className="flex flex-col items-start ml-6 max-w-full w-[114px] max-md:ml-2.5">
//             <div className="flex relative flex-col justify-center px-2.5 py-2.5 aspect-[1.044] w-[47px]">
//               <img
//                 loading="lazy"
//                 src={icon}
//                 alt=""
//                 className="object-cover absolute inset-0 size-full"
//               />
//             </div>
//             <div className="mt-4 text-2xl font-bold text-zinc-800">{count}</div>
//             <div className="self-stretch mt-4 text-sm leading-3 text-zinc-800">
//               {label}
//             </div>
//           </div>
//           <img
//             loading="lazy"
//             src={chart}
//             alt={`${label} trend chart`}
//             className="object-contain mt-7 aspect-[4.55] "
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StatCard;


// import * as React from "react";

// function StatCard({ icon, count, label, chart }) {
//   return (
//     <div className="
//       flex flex-col w-full md:w-1/3
//       bg-white dark:bg-gray-800
//       text-gray-800 dark:text-gray-100
//       rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
//     ">
//       {/* Top Right Button */}
//       <div className="flex justify-end p-2 text-lime-600 dark:text-lime-400">
//         <button className="flex gap-2 items-center text-sm font-semibold">
//           <span>See Detail</span>
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065"
//             alt=""
//             className="object-contain w-6 h-6"
//           />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col px-4 pb-4">
//         <div className="flex flex-col items-start">
//           {/* Icon */}
//           <div className="relative w-12 h-12">
//             <img
//               loading="lazy"
//               src={icon}
//               alt=""
//               className="object-cover absolute inset-0 w-full h-full"
//             />
//           </div>
//           {/* Count/Label */}
//           <div className="mt-4 text-2xl font-bold">{count}</div>
//           <div className="mt-1 text-sm leading-3">{label}</div>
//         </div>

//         {/* Chart Image */}
//         <img
//           loading="lazy"
//           src={chart}
//           alt={`${label} trend chart`}
//           className="object-contain mt-5 w-full h-auto"
//         />
//       </div>
//     </div>
//   );
// }

// export default StatCard;


import * as React from "react";

function StatCard({ icon, count, label, chart }) {
  return (
    <div
      className="
        flex flex-col 
        w-full sm:w-1/2 md:w-1/3
        p-4 sm:p-5 md:p-6

        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-100
        
        rounded-lg
        shadow-sm sm:shadow-md md:shadow-lg
      "
    >
      {/* Top Right Button */}
      <div className="flex justify-end">
        <button
          className="
            flex items-center gap-2
            text-sm sm:text-base md:text-lg
            font-semibold
            text-lime-600 dark:text-lime-400
          "
        >
          <span>See Detail</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/baea41120183e81adf765959b6f2f010618aff6cf5d0209108aa47f2644fa065"
            alt=""
            className="object-contain w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col pt-2">
        {/* Icon and Text */}
        <div className="flex flex-col items-start">
          {/* Icon */}
          <div className="relative w-12 h-12">
            <img
              loading="lazy"
              src={icon}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Count / Label */}
          <div className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold">
            {count}
          </div>
          <div className="mt-1 text-xs sm:text-sm md:text-base leading-4">
            {label}
          </div>
        </div>

        {/* Chart Image */}
        <img
          loading="lazy"
          src={chart}
          alt={`${label} trend chart`}
          className="mt-5 w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default StatCard;
