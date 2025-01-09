// import * as React from "react";

// function AttendanceCard() {
//   const attendanceData = [
//     { label: "Reported Employers", value: "230" },
//     { label: "On Leave", value: "12" },
//     { label: "Not yet Reported", value: "5" }
//   ];

//   return (
//     <div className="flex overflow-hidden flex-col justify-center self-center px-7 py-6 mt-9 max-w-full bg-white rounded-xl border border-gray-200 border-solid shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] w-full max-md:px-5   
//     ">
//       <div className="flex flex-col w-full">
//         <div className="flex gap-9 items-center w-full">
//           <div className="self-stretch my-auto text-2xl font-extrabold tracking-tighter leading-10 text-lime-600">
//             Attendance Today
//           </div>
//           <div className="flex relative flex-col self-stretch my-auto rounded-none aspect-[1.41] w-[55px]">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/528a542c-af6c-4fa2-96d0-9cdc63e77401?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-cover absolute inset-0 size-full"
//             />
//             <div className="flex relative shrink-0 rounded-xl bg-lime-600 bg-opacity-10 h-[39px]" />
//           </div>
//         </div>
//         <div className="flex flex-col self-center mt-5 max-w-full tracking-tighter text-center whitespace-nowrap text-stone-500 w-[200px]">
//           <div className="flex relative flex-col justify-center px-5 py-12 w-full aspect-[0.994] max-md:px-5">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt="Attendance chart"
//               className="object-cover absolute inset-0 size-full"
//             />
//             <div className="flex relative flex-col justify-center">
//               <div className="text-3xl font-extrabold leading-loose">85%</div>
//               <div className="text-xl font-medium leading-10">Attendance</div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col mt-5 w-full text-xl tracking-tighter leading-10 text-stone-500">
//           {attendanceData.map((item, index) => (
//             <div key={index} className="flex gap-10 justify-between items-center w-full">
//               <div className="self-stretch my-auto font-medium">{item.label}</div>
//               <div className="self-stretch my-auto font-bold text-right w-[35px]">
//                 {item.value}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AttendanceCard;

import * as React from "react";

function AttendanceCard() {
  const attendanceData = [
    { label: "Reported Employers", value: "230" },
    { label: "On Leave", value: "12" },
    { label: "Not yet Reported", value: "5" },
  ];

  return (
    <div className="
      flex flex-col justify-center px-7 py-6 mt-9 w-full max-w-full
      bg-white dark:bg-gray-800
      text-gray-800 dark:text-gray-100
      rounded-xl border border-gray-200 dark:border-gray-600
      shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
    ">
      <div className="w-full">
        {/* Header */}
        <div className="flex gap-9 items-center w-full">
          <div className="text-2xl font-extrabold tracking-tighter leading-10 text-lime-600 dark:text-lime-400">
            Attendance Today
          </div>
          <div className="relative w-[55px] aspect-[1.41]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/528a542c-af6c-4fa2-96d0-9cdc63e77401"
              alt=""
              className="object-cover absolute inset-0 w-full h-full"
            />
            <div className="relative bg-lime-600 dark:bg-lime-500 bg-opacity-10 h-[39px]" />
          </div>
        </div>

        {/* Chart */}
        <div className="flex flex-col items-center mt-5 text-stone-500 dark:text-stone-300">
          <div className="relative flex flex-col items-center justify-center px-5 py-12 w-full max-w-[200px] aspect-square">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bbd34f7c738cf63be661ac0d268660afa245d83c5fbe4933ddc7e9decf2edbf"
              alt="Attendance chart"
              className="object-cover absolute inset-0 w-full h-full"
            />
            <div className="relative flex flex-col justify-center items-center">
              <div className="text-3xl font-extrabold leading-loose">85%</div>
              <div className="text-xl font-medium leading-10">Attendance</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col mt-5 w-full text-xl tracking-tighter leading-10 text-stone-500 dark:text-stone-300">
          {attendanceData.map((item, index) => (
            <div
              key={index}
              className="flex gap-10 justify-between items-center w-full"
            >
              <div className="font-medium">{item.label}</div>
              <div className="font-bold text-right">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttendanceCard;
