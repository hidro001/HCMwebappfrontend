import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import BaseModal from "../../common/BaseModal";

export default function ViewReferralModal({ referral, onClose }) {
  if (!referral) return null;

  return (
    <BaseModal isOpen={Boolean(referral)} onClose={onClose}>
      <motion.div
        className="bg-white dark:bg-gray-800 dark:text-gray-100
                   rounded-lg shadow-lg w-full max-w-lg p-4 relative "
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Referral Of {referral.referredBy} For {referral.designation}
        </h2>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2 text-sm">
            <div>
              <strong>Job Designation:</strong> {referral.designation}
            </div>
            <div>
              <strong>Department:</strong> {referral.department}
            </div>
            <div>
              <strong>Referred By:</strong> {referral.referredBy}
            </div>
            <div>
              <strong>Candidate Name:</strong> {referral.candidateName}
            </div>
            <div>
              <strong>Candidate Email:</strong> {referral.candidateEmail}
            </div>
            <div>
              <strong>Candidate Phone Number:</strong> {referral.candidatePhone}
            </div>
            <div>
              <strong>Candidate Location:</strong> {referral.candidateLocation}
            </div>
            <div>
              <strong>Status:</strong> {referral.status}
            </div>
            <div>
              <strong>Candidate Resume:</strong>{" "}
              <span className="text-blue-600 cursor-pointer">
                <a
                  href={referral.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>View</button>
                </a>
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
              className="text-green-300"
            >
              <circle cx="8" cy="12" r="3"></circle>
              <circle cx="16" cy="12" r="3"></circle>
              <line x1="10.5" y1="12" x2="13.5" y2="12"></line>
            </svg>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </BaseModal>
  );
}
