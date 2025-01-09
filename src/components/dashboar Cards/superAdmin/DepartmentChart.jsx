// import * as React from "react";

// function DepartmentChart() {
//   return (
//     <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full 
// ">
//       <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
//         <div className="flex flex-col items-center px-2 pt-5 pb-20 w-full bg-white rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] max-md:max-w-full">
//           <div className="flex gap-10 max-w-full text-lg font-semibold text-lime-600 w-[393px]">
//             <div className="flex-auto w-[290px]">Employee Count By Department</div>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5bc67910b4e920e038a3adc4384a1bb238d4c3421020f99bc5b1d675f3c954?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//               alt=""
//               className="object-contain shrink-0 self-start w-10 aspect-[2.86]"
//             />
//           </div>
//           <div className="flex shrink-0 self-stretch mt-2.5 h-px rounded-md bg-zinc-200 shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]" />
//           <div className="flex gap-3.5 mt-14 max-w-full w-[369px] max-md:mt-10">
//             <div className="flex flex-col my-auto text-sm text-right whitespace-nowrap text-neutral-800">
//               <div className="flex flex-col pl-2.5">
//                 <div className="self-end">IT</div>
//                 <div className="self-start mt-10 max-md:mt-10">Sales</div>
//               </div>
//               <div className="mt-10 max-md:mt-10">Finance</div>
//               <div className="self-end mt-10 max-md:mt-10">HR</div>
//             </div>
//             <div className="flex flex-auto">
//               <div className="flex flex-col bg-stone-300">
//                 <div className="flex shrink-0 bg-zinc-800 h-[247px]" />
//               </div>
//               <div className="flex flex-col grow shrink-0 items-start my-auto basis-0 w-fit">
//                 <div className="flex shrink-0 self-stretch bg-blue-600 h-[38px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[92px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[45px]" />
//                 <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[22px]" />
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-5 justify-between mt-1.5 w-72 max-w-full text-sm text-center whitespace-nowrap text-neutral-700">
//             <div>0</div>
//             <div>20</div>
//             <div>40</div>
//             <div>60</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DepartmentChart;

import * as React from "react";

function DepartmentChart() {
  return (
    <div className="flex flex-col w-full md:w-1/2 mt-5 md:mt-0">
      <div className="flex flex-col grow">
        <div className="
          flex flex-col items-center p-5 w-full
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
          rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
        ">
          <div className="flex gap-10 w-full max-w-md text-lg font-semibold text-lime-600 dark:text-lime-400">
            <div className="flex-auto">Employee Count By Department</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5bc67910b4e920e038a3adc4384a1bb238d4c3421020f99bc5b1d675f3c954"
              alt=""
              className="object-contain w-10 h-auto"
            />
          </div>

          <div className="w-full mt-2.5 h-px rounded-md bg-zinc-200 dark:bg-zinc-600" />

          {/* Bar Chart */}
          <div className="flex gap-3.5 mt-14 w-full max-w-sm justify-center">
            {/* Labels */}
            <div className="flex flex-col my-auto text-sm text-right text-neutral-800 dark:text-neutral-300">
              <div>IT</div>
              <div className="mt-10">Sales</div>
              <div className="mt-10">Finance</div>
              <div className="mt-10">HR</div>
            </div>
            {/* Bars */}
            <div className="flex flex-auto">
              <div className="flex flex-col bg-stone-300 dark:bg-stone-700">
                <div className="flex shrink-0 bg-zinc-800 dark:bg-zinc-200 h-[247px]" />
              </div>
              <div className="flex flex-col grow items-start my-auto">
                <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[120px]" />
                <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[92px] mt-6" />
                <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[45px] mt-6" />
                <div className="bg-blue-600 dark:bg-blue-400 h-[38px] w-[22px] mt-6" />
              </div>
            </div>
          </div>

          {/* X-Axis */}
          <div className="flex gap-5 justify-between mt-1.5 w-72 text-sm text-center text-neutral-700 dark:text-neutral-400">
            <div>0</div>
            <div>20</div>
            <div>40</div>
            <div>60</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentChart;
