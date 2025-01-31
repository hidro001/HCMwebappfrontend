

function StatCard({ icon, iconBg, value, label, chart }) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-3.5">
        <div className="flex gap-2 items-center self-end p-2.5 text-lg font-semibold text-lime-600 min-h-[44px]">
          <button className="flex gap-2 items-center">
            <span className="self-stretch my-auto">See Detail</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8a2457d76929a46a176d41345e3d825ae0222b9de4ba5a3b6b72b87738bc8f0?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </button>
        </div>
        <div className="flex z-10 flex-col pt-5 mt-0 rounded-lg max-md:mr-2">
          <div className="flex flex-col items-start ml-6 max-w-full w-[114px] max-md:ml-2.5">
            <div className="flex relative flex-col justify-center px-2.5 py-2.5 aspect-[1.044] w-[47px]">
              <img
                loading="lazy"
                src={iconBg}
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
              <img
                loading="lazy"
                src={icon}
                alt=""
                className="object-contain w-full aspect-[0.88]"
              />
            </div>
            <div className="mt-4 text-2xl font-bold text-zinc-800">
              {value}
            </div>
            <div className="self-stretch mt-4 text-sm leading-3 text-zinc-800">
              {label}
            </div>
          </div>
          <img
            loading="lazy"
            src={chart}
            alt={`${label} chart`}
            className="object-contain mt-7 aspect-[4.55] w-[286px]"
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;