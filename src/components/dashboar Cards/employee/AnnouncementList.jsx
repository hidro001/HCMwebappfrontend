

function AnnouncementList() {
  const announcements = [
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' },
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' },
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' },
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' },
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' },
    { date: { month: 'Jul', day: '18' }, title: 'Write 5 microblog articles on Instagram', department: 'Office / Marketing' }
  ];

  return (
    <div className="flex flex-col items-center pt-3 pb-7 mt-8 w-full bg-white rounded-lg shadow-lg">
      <div className="flex gap-10 max-w-full w-[362px]">
        <div className="grow shrink my-auto text-xl font-bold text-lime-600 w-[203px]">
          Latest Announcements
        </div>
        <button className="flex gap-2 items-center p-2.5 text-sm font-semibold text-sky-500">
          <span className="self-stretch my-auto">Add</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83277b6f075a44034b6e5f6607f95a81fe9adeaa86234aa558c1185f8cc69b53?placeholderIfAbsent=true&apiKey=20f8535bc9c14cd29ad8328e998bd290"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
          />
        </button>
      </div>
      <div className="shrink-0 self-stretch mt-2.5 h-px border border-solid border-zinc-300" />
      
      {announcements.map((announcement, index) => (
        <React.Fragment key={index}>
          <div className="flex gap-2 mt-7 max-w-full w-[338px]">
            <div className="flex flex-col px-2 pt-1 pb-4 font-semibold whitespace-nowrap rounded border border-solid border-sky-950">
              <div className="self-center text-xs text-center text-black">
                {announcement.date.month}
              </div>
              <div className="self-start mt-2 text-lg text-gray-800">
                {announcement.date.day}
              </div>
            </div>
            <div className="flex flex-col grow shrink-0 my-auto text-gray-800 basis-0 w-fit">
              <div className="text-base font-semibold">{announcement.title}</div>
              <div className="self-start mt-3 text-xs">{announcement.department}</div>
            </div>
          </div>
          {index < announcements.length - 1 && (
            <div className="shrink-0 self-stretch mx-6 mt-7 w-full h-px border border-solid border-zinc-300 max-md:mx-2.5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default AnnouncementList;