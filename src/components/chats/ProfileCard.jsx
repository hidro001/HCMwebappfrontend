import { FaPhone, FaPhoneSlash } from "react-icons/fa";
import p1 from "../../assets/tellyimg.webp";

export default function ProfileCard() {
  return (
    <div
      className="relative w-80 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-3 border overflow-hidden bg-white dark:bg-gray-200 transition-all duration-300"
      style={{
        backgroundImage: `url(${p1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light Background Overlay for Readability */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Hexagonal Profile Image */}
      <div className="relative w-24 h-24 bg-white dark:bg-gray-300 p-1 rounded-lg flex items-center justify-center shadow-lg border-4 border-gray-300 dark:border-gray-500 z-10">
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* User Details */}
      <h2 className="text-lg font-semibold text-black text-center z-10">
        Akhilesh Sharma <span className="text-gray-600">(RI0017)</span>
      </h2>

      {/* Role Badge */}
      <span className="bg-purple-500 text-white text-sm px-4 py-1 rounded-full dark:bg-purple-400 z-10">
        UI / UX Designer
      </span>

      {/* Voice/Video Call Badge */}
      <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full dark:bg-green-400 z-10">
        Voice/Video call
      </span>

      {/* Call Action Buttons */}
      <div className="flex justify-between space-x-6 mt-3 z-10">
        {/* Decline Call Button - Red Telephone Icon */}
        <button className="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600">
          <FaPhoneSlash size={20} />
        </button>

        {/* Accept Call Button - Green Telephone Icon */}
        <button className="bg-green-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600">
          <FaPhone size={20} />
        </button>
      </div>
    </div>
  );
}
