
import { FaPhone, FaPhoneSlash } from "react-icons/fa";
import { useCall } from "../../../contexts/CallContext";
import p1 from "../../../assets/tellyimg.webp";

const CallModal = () => {
  const { incomingCall, answerCall, rejectCall } = useCall();

  if (!incomingCall) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="relative w-80 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-3 border overflow-hidden bg-white dark:bg-gray-200 transition-all duration-300"
        style={{
          backgroundImage: `url(${p1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-white/50"></div>

        {/* Call Information */}
        <div className="relative z-10 flex flex-col items-center space-y-2">
          <h3 className="text-lg font-semibold text-black text-center">
            Incoming {incomingCall.callType} call
          </h3>

          {/* Caller Avatar */}
          <div className="relative w-24 h-24 bg-white dark:bg-gray-300 p-1 rounded-lg flex items-center justify-center shadow-lg border-4 border-gray-300 dark:border-gray-500">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Caller"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          {/* Caller Details */}
          <p className="text-sm text-gray-700 z-10">
            Caller: {incomingCall.caller}
          </p>

          {/* Call Type Badge */}
          <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full dark:bg-green-400 z-10">
            Voice/Video call
          </span>
        </div>

        {/* Call Action Buttons */}
        <div className="relative flex justify-between space-x-6 mt-3 z-10">
          <button
            onClick={rejectCall}
            className="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600"
          >
            <FaPhoneSlash size={20} />
          </button>
          <button
            onClick={answerCall}
            className="bg-green-400 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600"
          >
            <FaPhone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
