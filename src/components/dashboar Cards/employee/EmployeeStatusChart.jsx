import React from 'react';

function EmployeeStatusChart() {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:mt-9 max-md:max-w-full">
        <div className="flex flex-col px-2 pt-5 pb-24 w-full bg-white rounded-2xl shadow-lg max-md:pb-24 max-md:max-w-full">
          <div className="flex gap-5 justify-between self-center max-w-full text-lg font-semibold text-lime-600 w-[393px]">
            <div>Employees By Status</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/218a4e6d106b79ef8cdcab075faf7fcb4d20dafcb021c88c594f681a9b613350?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
              alt=""
              className="object-contain shrink-0 self-start w-10 aspect-[2.86]"
            />
          </div>
          <div className="flex shrink-0 mt-2.5 h-px rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)]" />
          <div className="flex gap-3.5 mt-14 max-w-full w-[382px] max-md:mt-10 max-md:ml-1">
            <div className="flex flex-col my-auto text-sm text-right whitespace-nowrap text-neutral-800">
              <div>Confirmed</div>
              <div className="mt-12 max-md:mt-10">Probation</div>
              <div className="flex flex-col items-start pl-2.5 mt-14 max-md:mt-10">
                <div>Trainee</div>
                <div className="mt-14 max-md:mt-10">Contract</div>
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="flex flex-col bg-stone-300">
                <div className="flex shrink-0 bg-zinc-800 h-[247px]" />
              </div>
              <div className="flex flex-col grow shrink-0 items-start my-auto basis-0 w-fit">
                <div className="flex shrink-0 self-stretch bg-blue-600 h-[38px]" />
                <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[92px]" />
                <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[45px]" />
                <div className="flex shrink-0 mt-6 bg-blue-600 h-[38px] w-[22px]" />
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between self-center mt-1.5 -mb-5 w-72 max-w-full text-sm text-center whitespace-nowrap text-neutral-700 max-md:mb-2.5">
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

export default EmployeeStatusChart;