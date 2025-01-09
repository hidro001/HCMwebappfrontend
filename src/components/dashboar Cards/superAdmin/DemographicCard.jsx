// import * as React from "react";

// function DemographicCard() {
//   const genderData = [
//     { label: "Male (68%)", color: "sky-500" },
//     { label: "Female (38%)", color: "sky-400" },
//     { label: "Other (12%)", color: "sky-200" }
//   ];

//   const ageData = [
//     { label: "< 15 years old", color: "pink-500", count: "21K", percentage: "27%" },
//     { label: "20 - 35 years old", color: "sky-500", count: "64K", percentage: "40%" },
//     { label: "40 - 50 years old", color: "emerald-400", count: "18K", percentage: "16%" },
//     { label: "> 50 years old", color: "violet-600", count: "5K", percentage: "8%" }
//   ];

//   return (
//     <div className="flex flex-col pt-4 pb-6 w-full bg-white rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] ">
//       <div className="flex gap-4 self-center max-w-full text-2xl font-bold text-gray-800 ">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//           alt=""
//           className="object-contain shrink-0 aspect-square w-[34px]"
//         />
//         <div className=" my-auto ">Employee Demographic</div>
//       </div>
//       <div className="shrink-0 mt-4 h-px border border-solid border-zinc-300" />
//       <div className="flex flex-col self-end mt-5 mr-6 max-w-full w-[269px] max-md:mr-2.5">
//         <button className="flex flex-col justify-center self-end px-3.5 py-2.5 max-w-full text-sm text-sky-500 bg-violet-50 rounded-md w-[105px]">
//           <div className="gap-3 self-stretch">View Report</div>
//         </button>
     

//         <div className="flex relative flex-col px-7 py-16 mt-6 max-w-full text-lg font-bold text-center text-gray-800 aspect-square w-[168px] max-md:px-5">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//             alt="Demographic pie chart"
//             className="object-cover absolute inset-0 size-full"
//           />
//           438k
//           <br />
//           <span className="text-sm">audience</span>
//         </div>
//       </div>
//       <div className="flex gap-1.5 mx-5 mt-7 text-sm text-black max-md:mx-2.5">
//         {genderData.map((item, index) => (
//           <div key={index} className="flex flex-1 gap-2 px-2.5 py-1 rounded-lg border border-solid border-black border-opacity-10">
//             <div className={`flex shrink-0 my-auto w-3 h-3 bg-${item.color} rounded-3xl`} />
//             <div>{item.label}</div>
//           </div>
//         ))}
//       </div>
//       <div className="shrink-0 mt-3 h-px border border-solid border-zinc-300" />
//       <div className="flex flex-col px-7 mt-5 w-full max-md:px-5">
//         <div className="self-start text-lg font-bold text-gray-800">
//           Employee Age Distribution
//         </div>
//         <div className="flex mt-3.5">
//           {ageData.map((item, index) => (
//             <div
//               key={index}
//               className={`flex shrink-0 h-2.5 bg-${item.color} border border-white border-solid ${index === 0 || index === 3 ? 'rounded-none' : ''} ${
//                 index === 1 ? 'w-[175px]' : index === 2 ? 'w-20' : index === 3 ? 'w-[37px]' : 'w-[51px]'
//               }`}
//             />
//           ))}
//         </div>
//         <div className="flex gap-5 justify-between mt-5">
//           <div className="flex flex-col my-auto text-base text-gray-800">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-3 mt-7 first:mt-0">
//                 <div className={`flex shrink-0 self-start mt-1.5 w-3 h-3 bg-${item.color} rounded-3xl`} />
//                 <div className="grow shrink basis-auto">{item.label}</div>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col font-bold whitespace-nowrap">
//             {ageData.map((item, index) => (
//               <div key={index} className="flex gap-5 justify-between mt-4 first:mt-0">
//                 <div className="my-auto text-base text-right text-gray-800">
//                   {item.count}
//                 </div>
//                 <div className={`px-1.5 w-8 h-8 text-xs text-center text-sky-500 bg-sky-100 rounded-full`}>
//                   {item.percentage}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DemographicCard;

import * as React from "react";

function DemographicCard() {
  const genderData = [
    { label: "Male (68%)", color: "sky-500" },
    { label: "Female (38%)", color: "sky-400" },
    { label: "Other (12%)", color: "sky-200" },
  ];

  const ageData = [
    { label: "< 15 years old", color: "pink-500", count: "21K", percentage: "27%" },
    { label: "20 - 35 years old", color: "sky-500", count: "64K", percentage: "40%" },
    { label: "40 - 50 years old", color: "emerald-400", count: "18K", percentage: "16%" },
    { label: "> 50 years old", color: "violet-600", count: "5K", percentage: "8%" },
  ];

  return (
    <div className="
      flex flex-col py-4 w-full 
      bg-white dark:bg-gray-800 
      text-gray-800 dark:text-gray-100 
      rounded-lg shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
    ">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 text-2xl font-bold">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/04e2c0393cad454a54528e4c4e0b761111425899cb401763f96db1c0c89a3249"
          alt=""
          className="object-contain w-8 h-8"
        />
        <div className="my-auto">Employee Demographic</div>
      </div>

      <div className="mt-4 h-px border border-solid border-zinc-300 dark:border-zinc-600 mx-4" />

      {/* View Report + Pie Chart */}
      <div className="flex flex-col items-end mt-5 px-4">
        <button className="
          px-3.5 py-2.5 text-sm 
          text-sky-500 dark:text-sky-300 
          bg-violet-50 dark:bg-violet-900 
          rounded-md
        ">
          View Report
        </button>

        <div className="relative flex flex-col items-center justify-center px-7 py-16 mt-6 text-lg font-bold text-center aspect-square w-full max-w-[168px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c977bb7085cbd00e895bbbfb8eed6182c158a1765240e91e0daa428c1a5e4215"
            alt="Demographic pie chart"
            className="object-cover absolute inset-0 w-full h-full"
          />
          438k
          <br />
          <span className="text-sm">audience</span>
        </div>
      </div>

      {/* Gender Distribution */}
      <div className="flex gap-1.5 mx-5 mt-7 text-sm text-black dark:text-gray-100">
        {genderData.map((item, index) => (
          <div
            key={index}
            className="
              flex flex-1 gap-2 px-2.5 py-1 
              rounded-lg border border-solid border-black border-opacity-10
            "
          >
            <div className={`w-3 h-3 bg-${item.color} rounded-full my-auto`} />
            <div>{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 h-px border border-solid border-zinc-300 dark:border-zinc-600 mx-4" />

      {/* Age Distribution */}
      <div className="px-7 mt-5 w-full text-gray-800 dark:text-gray-100">
        <div className="text-lg font-bold">Employee Age Distribution</div>
        <div className="flex mt-3.5">
          {ageData.map((item, index) => (
            <div
              key={index}
              className={`
                h-2.5 bg-${item.color} border border-white dark:border-gray-900
                ${index === 0 || index === 3 ? "" : ""}
                ${index === 1 ? "w-[175px]" 
                  : index === 2 ? "w-20" 
                  : index === 3 ? "w-[37px]" 
                  : "w-[51px]"}
              `}
            />
          ))}
        </div>

        <div className="flex gap-5 justify-between mt-5">
          <div className="flex flex-col my-auto text-base">
            {ageData.map((item, index) => (
              <div key={index} className="flex gap-3 mt-7 first:mt-0">
                <div className={`w-3 h-3 bg-${item.color} rounded-full mt-1.5`} />
                <div>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-bold text-sm text-slate-800 dark:text-slate-200">
            {ageData.map((item, index) => (
              <div key={index} className="flex gap-5 justify-between mt-4 first:mt-0">
                <div className="my-auto text-base text-right">{item.count}</div>
                <div className="px-1.5 w-8 h-8 text-xs text-sky-500 dark:text-sky-300 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
                  {item.percentage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemographicCard;
