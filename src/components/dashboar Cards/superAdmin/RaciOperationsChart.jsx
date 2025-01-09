// import * as React from "react";

// function RaciOperationsChart() {
//   return (
//     <div className="flex flex-col items-center px-4 pt-5 pb-12 mt-11 w-full text-xs bg-white rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] text-slate-500 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
//       <div className="flex flex-wrap gap-5 justify-between max-w-full text-lg font-semibold text-lime-600 w-[817px]">
//         <div>RACI Operations</div>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a363397319df9b626de62d760f6f6ecf51aa6fac3a6286b72f26caf16f118b7?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//           alt=""
//           className="object-contain shrink-0 self-start aspect-[5.92] w-[83px]"
//         />
//       </div>
//       <div className="flex shrink-0 self-stretch mt-2.5 h-px rounded-md bg-zinc-200 shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)] max-md:max-w-full" />
//       <div className="flex flex-wrap gap-3 mt-16 max-w-full text-right whitespace-nowrap w-[789px] max-md:mt-10">
//         <div className="flex flex-col max-md:hidden">
//           <div>200</div>
//           <div className="self-start mt-16 max-md:mt-10">150</div>
//           <div className="flex flex-col items-start px-px mt-16 max-md:mt-10">
//             <div className="self-stretch">100</div>
//             <div className="mt-16 max-md:mt-10 max-md:ml-1.5">50</div>
//             <div className="mt-16 ml-3 max-md:mt-10 max-md:ml-2.5">0</div>
//           </div>
//         </div>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/825148de-4ccf-4f6f-a0c6-f92146b7cdf2?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
//           alt="RACI operations chart"
//           className="object-contain grow shrink-0 mt-1.5 aspect-[2.6] basis-0 w-fit max-md:max-w-full"
//         />
//       </div>
//       <div className="flex gap-5 justify-between mt-1.5 max-w-full text-center whitespace-nowrap w-[711px]">
//         {[...Array(15)].map((_, i) => (
//           <div key={i}>{String(i + 1).padStart(2, '0')}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RaciOperationsChart;

import * as React from "react";

function RaciOperationsChart() {
  return (
    <div className="
      flex flex-col items-center px-4 pt-5 pb-12 mt-11 w-full
      text-xs text-slate-500 dark:text-slate-300
      bg-white dark:bg-gray-800
      rounded-2xl shadow-[-1px_7px_32px_2px_rgba(0,0,0,0.25)]
    ">
      <div className="flex flex-wrap gap-5 justify-between w-full max-w-2xl text-lg font-semibold text-lime-600 dark:text-lime-400">
        <div>RACI Operations</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a363397319df9b626de62d760f6f6ecf51aa6fac3a6286b72f26caf16f118b7"
          alt=""
          className="object-contain h-auto w-20"
        />
      </div>

      <div className="w-full max-w-2xl mt-2.5 h-px rounded-md bg-zinc-200 dark:bg-zinc-600" />

      <div className="flex flex-wrap gap-3 mt-16 w-full max-w-2xl text-right whitespace-nowrap justify-center">
        {/* Y-Axis Labels (hidden on small screens) */}
        <div className="flex flex-col hidden md:block">
          <div>200</div>
          <div className="mt-16">150</div>
          <div className="mt-16">100</div>
          <div className="mt-16">50</div>
          <div className="mt-16">0</div>
        </div>
        {/* Chart */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/825148de-4ccf-4f6f-a0c6-f92146b7cdf2"
          alt="RACI operations chart"
          className="object-contain grow h-auto mt-1.5"
        />
      </div>

      {/* X-Axis Labels */}
      <div className="flex gap-5 justify-between mt-1.5 w-full max-w-xl text-center">
        {[...Array(15)].map((_, i) => (
          <div key={i}>{String(i + 1).padStart(2, '0')}</div>
        ))}
      </div>
    </div>
  );
}

export default RaciOperationsChart;
