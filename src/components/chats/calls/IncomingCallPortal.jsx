// components/chats/calls/IncomingCallPortal.jsx
import React from "react";
import { createPortal } from "react-dom";
import { useCall } from "../../../contexts/CallContext";
import {
  FaPhoneAlt,
  FaPhoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const IncomingCallPortal = () => {
  const { incomingCall, answerCall, rejectCall } = useCall();

  if (!incomingCall) return null;

  const { caller, callType } = incomingCall;
  const isVideo = callType === "video";

  /* --------  modal markup  -------- */
  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-11/12 max-w-sm p-6 shadow-xl">
        <header className="flex items-center gap-3 mb-4">
          {isVideo ? (
            <FaVideo className="text-indigo-600" />
          ) : (
            <FaPhoneAlt className="text-indigo-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Incoming {isVideo ? "Video" : "Voice"} Call
          </h3>
        </header>

        <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">
          Caller:&nbsp;<span className="font-medium">{caller}</span>
        </p>

        <div className="flex justify-around">
          <button
            onClick={answerCall}
            className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white focus:outline-none"
          >
            <FaPhoneAlt /> Answer
          </button>
          <button
            onClick={rejectCall}
            className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white focus:outline-none"
          >
            <FaPhoneSlash /> Reject
          </button>
        </div>
      </div>
    </div>
  );

  /* --------  portal to <body>  -------- */
  return createPortal(modal, document.body);
};

export default IncomingCallPortal;
