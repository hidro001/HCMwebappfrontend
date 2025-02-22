import React from "react";
import { useCall } from "../../../contexts/CallContext";

const CallModal = () => {
  const { incomingCall, answerCall, rejectCall } = useCall();

  if (!incomingCall) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center w-11/12 max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Incoming {incomingCall.callType} call
        </h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Caller: {incomingCall.caller}
        </p>
        <div className="flex justify-around">
          <button
            onClick={answerCall}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-200 focus:outline-none"
          >
            Answer
          </button>
          <button
            onClick={rejectCall}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-200 focus:outline-none"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
