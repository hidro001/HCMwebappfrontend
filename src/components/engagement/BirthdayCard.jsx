import React from "react";

const FestivalCard = ({ post, type }) => {
  // Extract name and other details
  const fullName = `${post.first_Name} ${post.last_Name}`;
 
  const expiryDate = post.expire_date || "";
  const userAvatar = post.user_Avatar || "https://ems11.s3.amazonaws.com/logo-HM+(1).png";
  const yearswithus = post.years_with_us || "";
  // Determine the greeting message based on type
  let heading = "";
  let message = "";

  if (type === "birthday") {
    heading = `Happy Birthday, ${fullName}! `;
    message = `Wishing you a wonderful day filled with happiness and a year filled with joy. Enjoy your special day! 🎉`;
  } else if (type === "anniversary") {
    heading = `Happy Work Anniversary, ${fullName}! 🎊`;
    message = `Congratulations on completing ${yearswithus} amazing years with us!`;
  } else {
    heading = "Greetings!";
    message = "Wishing you all the best!";
  }

  return (
    <div className="w-full  border border-[#D1D5DB] rounded-md bg-white px-2 py-3 text-sm text-gray-800 shadow-sm">
      <div className="flex items-center">
       <img
              src={userAvatar}
              alt="User"
              className="h-10 w-10 mx-1 rounded-full object-cover border border-gray-300"
            />
      <div>
      <h2 className="text-base font-semibold mb-1">{heading}</h2>
      <p className="text-gray-700">
        {message}
      </p>
      </div></div>
      <div className="flex justify-between items-center mt-4">
        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-md bg-green-100 text-green-800 border border-green-300">
          📌 Pinned
        </span>
        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded-md bg-green-800 text-white">
          Expiry: {expiryDate}
        </span>
      </div>
      
    </div>
  );
};

export default FestivalCard;
