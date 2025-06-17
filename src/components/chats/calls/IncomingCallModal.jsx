import React from "react";
import { useCall } from "../../../contexts/CallContext";

export function IncomingCallModal() {
  const { incomingCall, answerCall, rejectCall } = useCall();
  if (!incomingCall) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-semibold">
          Incoming {incomingCall.callType} call
        </h2>
        <p className="my-4">
          From: <strong>{incomingCall.caller}</strong>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={answerCall}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Answer
          </button>
          <button
            onClick={rejectCall}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
