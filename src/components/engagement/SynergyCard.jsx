
const SynergyCard = () => {
  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md border border-gray-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src="/mnt/data/e86ef7f6-531e-43db-8b52-118a0e7e143e.png"
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900 text-sm">
            Ankit Rajput ( RI0704 )
          </p>
          <p className="text-xs text-gray-500">Ui/Ux Designer March 15 , 10:00 AM</p>
        </div>
      </div>

      {/* Section divider */}
      <div className="mt-4 border-t border-gray-300"></div>

      {/* Category */}
      <div className="flex items-center gap-2 mt-4 text-gray-700 text-xs font-semibold">
        <BsCalendarEvent size={15} />
        <span>General</span>
      </div>

      {/* Title */}
      <h2 className="font-bold text-base mt-3 mb-2">Reel Creativity, Reel Rewards!</h2>

      {/* Content */}
      <p className="text-gray-700 text-xs leading-relaxed mb-4">
        Hey RazorinFotech Team! 🎉 Ready to turn your creativity into cash? Shoot a fun,
        engaging reel that shows off our team spirit or day-to-day magic—and watch the rewards
        roll in: • 10,000 views = ₹3,000 • 15,000 views = ₹5,000 • 25,000 views = ₹10,000
        Whether it's behind-the-scenes laughs, office hacks, or teamwork in action, we want
        to see your best! Ready, set, reel! 🚀{" "}
        <span className="text-blue-600 cursor-pointer font-semibold">See More....</span>
      </p>

      {/* Embedded Image */}
      <div className="mb-3">
        <img
          src="/mnt/data/e86ef7f6-531e-43db-8b52-118a0e7e143e.png"
          alt="Rewards info"
          className="w-36 rounded-md"
        />
      </div>

      {/* Likes and comments */}
      <div className="flex justify-end items-center gap-3 text-gray-600 text-xs">
        <div className="flex items-center gap-1">
          <AiOutlineSmile size={16} />
          <span>12 Likes</span>
        </div>
        <span>:</span>
        <div className="flex items-center gap-1">
          <AiOutlineComment size={16} />
          <span>5 Comments</span>
        </div>
      </div>
    </div>
  );
}

export default SynergyCard