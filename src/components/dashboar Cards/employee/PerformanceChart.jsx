import * as React from "react";

function PerformanceChart() {
  const teams = [
    { name: "Developer Team", percentage: "65%" },
    { name: "Design Team", percentage: "84%" },
    { name: "Marketing Team", percentage: "28%" },
    { name: "Management Team", percentage: "16%" }
  ];

  return (
    <div className="flex overflow-hidden flex-col pt-2.5 pb-11 pl-5 mx-auto w-full rounded-2xl bg-lime-600 bg-opacity-10 shadow-[0px_4px_17px_rgba(0,0,0,0.25)] max-md:mt-9 max-md:max-w-full">
      <div className="flex gap-10 items-center ml-4 max-w-full text-xl font-bold tracking-wide text-lime-600 min-h-[37px] w-[346px] max-md:ml-2.5">
        <div className="self-stretch my-auto">Performance Statistics</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e998b2223b107a48c672826263f2964d3e415027d8af83e5dd90514d5470d6a6?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto rounded-xl aspect-[1.17] w-[42px]"
        />
      </div>
      <div className="flex flex-col items-start mt-5">
        {teams.map((team, index) => (
          <div key={index} className="flex flex-col justify-between mt-3.5 max-w-full w-[391px]">
            <div className="flex gap-10 justify-between items-start w-full text-xl font-medium tracking-wide text-slate-800">
              <div className="w-[157px]">{team.name}</div>
              <div className="w-[39px]">{team.percentage}</div>
            </div>
            <div className="flex flex-col items-start mt-3 max-w-full w-[330px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0918c4fce15f9f431e86107f8fc8f7db260e70c98fcfb02548e8a9bd79f6f792?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
                alt={`${team.name} performance chart`}
                className="object-contain w-full aspect-[38.46]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceChart;