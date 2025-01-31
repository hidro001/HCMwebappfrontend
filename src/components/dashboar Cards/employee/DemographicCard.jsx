import React from 'react';

function DemographicCard() {
  const ageGroups = [
    { label: '< 15 years old', value: '21K', percentage: '27%', color: 'bg-pink-500' },
    { label: '20 - 35 years old', value: '64K', percentage: '40%', color: 'bg-sky-500' },
    { label: '40 - 50 years old', value: '18K', percentage: '16%', color: 'bg-emerald-400' },
    { label: '> 50 years old', value: '5K', percentage: '8%', color: 'bg-violet-600' }
  ];

  return (
    <div className="flex flex-col pt-4 pb-6 w-full bg-white rounded-lg shadow-[0px_5px_10px_rgba(241,242,250,1)]">
      <div className="flex gap-4 self-center max-w-full text-2xl font-bold text-gray-800 w-[324px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28953dd45830ce60fa70b457000f2736ca67bc250adfb672bebc8aab130df4a1?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt=""
          className="object-contain shrink-0 aspect-square w-[34px]"
        />
        <div className="flex-auto my-auto w-[267px]">Employee Demographic</div>
      </div>
      <div className="shrink-0 mt-4 h-px border border-solid border-zinc-300" />
      <div className="flex flex-col self-end mt-5 mr-6 max-w-full w-[269px] max-md:mr-2.5">
        <button className="flex flex-col justify-center self-end px-3.5 py-2.5 max-w-full text-sm text-sky-500 bg-violet-50 rounded-md w-[105px]">
          View Report
        </button>
        <div className="flex relative flex-col px-7 py-16 mt-6 max-w-full text-lg font-bold text-center text-gray-800 aspect-square w-[168px] max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/99b81da10fb4f52815ff362755bd53581b5437b9c2803fabe3ce61ab4ebd9ff9?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
            alt=""
            className="object-cover absolute inset-0 size-full"
          />
          438k
          <br />
          <span className="text-sm">audience</span>
        </div>
      </div>
      <div className="flex gap-1.5 mx-5 mt-7 text-sm text-black max-md:mx-2.5">
        <div className="flex flex-1 gap-2 px-2.5 py-1 rounded-lg border border-solid border-black border-opacity-10">
          <div className="flex shrink-0 my-auto w-3 h-3 bg-sky-500 rounded-3xl" />
          <div>Male (68%)</div>
        </div>
        <div className="flex flex-1 gap-2 px-2.5 py-1 rounded-lg border border-solid border-black border-opacity-10">
          <div className="flex shrink-0 my-auto w-3 h-3 bg-sky-400 rounded-3xl" />
          <div>Female (38%)</div>
        </div>
        <div className="flex flex-1 gap-2 px-2.5 py-1 rounded-lg border border-solid border-black border-opacity-10">
          <div className="flex shrink-0 my-auto w-3 h-3 bg-sky-200 rounded-3xl" />
          <div>Other (12%)</div>
        </div>
      </div>
      <div className="shrink-0 mt-3 h-px border border-solid border-zinc-300" />
      <div className="flex flex-col px-7 mt-5 w-full max-md:px-5">
        <div className="self-start text-lg font-bold text-gray-800">
          Employee Age Distribution
        </div>
        <div className="flex mt-3.5">
          {ageGroups.map((group, index) => (
            <div
              key={index}
              className={`flex shrink-0 h-2.5 ${group.color} border border-white border-solid`}
              style={{ width: group.percentage }}
            />
          ))}
        </div>
        <div className="flex gap-5 justify-between mt-5">
          <div className="flex flex-col my-auto text-base text-gray-800">
            {ageGroups.map((group, index) => (
              <div key={index} className="flex gap-3 mt-7 first:mt-0">
                <div className={`flex shrink-0 self-start mt-1.5 w-3 h-3 ${group.color} rounded-3xl`} />
                <div>{group.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col font-bold whitespace-nowrap">
            {ageGroups.map((group, index) => (
              <div key={index} className="flex gap-5 justify-between mt-4 first:mt-0">
                <div className="my-auto text-base text-right text-gray-800">
                  {group.value}
                </div>
                <div className="px-1.5 w-8 h-8 text-xs text-center text-sky-500 bg-sky-100 rounded-full">
                  {group.percentage}
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