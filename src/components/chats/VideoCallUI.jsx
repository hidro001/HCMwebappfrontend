import { FaPhoneSlash, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";

export default function VideoCallUI() {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden">
      {/* Main Video Feed */}
      <div className="relative w-full h-96 bg-gray-900 flex items-center justify-center">
        <img
          src="https://placehold.co/800x450?text=Main+Speaker"
          alt="Main Speaker"
          className="w-full h-full object-cover"
        />
        
        {/* Small Floating Video (Bottom Right) */}
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-gray-800 border-2 border-white rounded-lg overflow-hidden">
          <img
            src="https://placehold.co/100x100?text=User"
            alt="Participant"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call Controls */}
      <div className="flex justify-center space-x-6 bg-black p-4">
        {/* End Call Button */}
        <button className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-red-600">
          <FaPhoneSlash size={20} />
        </button>

        {/* Mute Button */}
        <button className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600">
          <FaMicrophoneSlash size={20} />
        </button>

        {/* Disable Video Button */}
        <button className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600">
          <FaVideoSlash size={20} />
        </button>
      </div>
    </div>
  );
}
