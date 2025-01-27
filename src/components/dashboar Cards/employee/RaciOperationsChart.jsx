

function RaciOperationsChart() {
  return (
    <div className="flex flex-col items-center px-4 pt-5 pb-12 w-full text-xs bg-white rounded-2xl shadow-lg text-slate-500 max-md:pr-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between max-w-full text-lg font-semibold text-lime-600 w-[817px]">
        <div>RACI Operations</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/16945c375a27c55c4601a21ecb00aa545a36099c63aa8c9dd96e2e4179459284?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt=""
          className="object-contain shrink-0 self-start aspect-[5.92] w-[83px]"
        />
      </div>
      <div className="flex shrink-0 self-stretch mt-2.5 h-px rounded-md bg-zinc-200 shadow-[4px_4px_10px_rgba(0,0,0,0.12)] max-md:max-w-full" />
      <div className="flex flex-wrap gap-3 mt-16 max-w-full text-right whitespace-nowrap w-[789px] max-md:mt-10">
        <div className="flex flex-col max-md:hidden">
          <div>200</div>
          <div className="self-start mt-16 max-md:mt-10">150</div>
          <div className="flex flex-col items-start px-px mt-16 max-md:mt-10">
            <div className="self-stretch">100</div>
            <div className="mt-16 max-md:mt-10 max-md:ml-1.5">50</div>
            <div className="mt-16 ml-3 max-md:mt-10 max-md:ml-2.5">0</div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a69ef600-c5f4-4263-ab7c-0527ed70e67f?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
          alt="RACI operations chart"
          className="object-contain grow shrink-0 mt-1.5 aspect-[2.6] basis-0 w-fit max-md:max-w-full"
        />
      </div>
      <div className="flex gap-5 justify-between mt-1.5 max-w-full text-center whitespace-nowrap w-[711px]">
        {[...Array(15)].map((_, i) => (
          <div key={i}>{String(i + 1).padStart(2, '0')}</div>
        ))}
      </div>
    </div>
  );
}

export default RaciOperationsChart;