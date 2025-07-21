const GreetCard = ({ post, type, tagline }) => {
  const fullName = `${post.first_Name} ${post.last_Name}`;
  
  const expiryDate = post.expire_date || "";
  const userAvatar = post.user_Avatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const yearswithus = post.years_with_us || "";
  const dobFormatted = new Date(post.dob).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long'
  });

  const dojFormatted = new Date(post.date_of_Joining).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long'
  });
  
  let heading = "";
  let badgeText = "";
  let eventDate = "";
  let customMessage = "";

if (type === "birthday") {
    heading = `🎂 Upcoming Birthday for ${fullName}`;
    badgeText = "Upcoming Birthday";
    eventDate = dobFormatted;
    customMessage = tagline;
  } else if (type === "anniversary") {
    heading = `🎉 Upcoming Work Anniversary for ${fullName}`;
    badgeText = "Upcoming Anniversary";
    eventDate = dojFormatted;
    customMessage = `${tagline} ${yearswithus ? `(${yearswithus} year${yearswithus > 1 ? 's' : ''})` : ''}`;

  } else {
    heading = "Greetings!";
    badgeText = "Notice";
    eventDate = "";
  }

  return (
     <div className="w-[90%] bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 max-w-md mx-auto border border-gray-200 dark:border-gray-600">
      <div className="flex items-center space-x-4">
        <img
          src={userAvatar}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
              {badgeText}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{heading}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{customMessage}</p>
        </div>
      </div>

      <div className="mt-4 border-t pt-3 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <span>📅</span>
          <span>{eventDate}</span>
        </div>
        <div className="text-xs italic">Shown: {expiryDate}</div>
      </div>
    </div>
  );
};

export default GreetCard;