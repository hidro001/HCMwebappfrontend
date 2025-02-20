

import React from "react";
import ReactModal from "react-modal";

// Only do this once in your entire app
if (typeof document !== "undefined") {
  ReactModal.setAppElement("#root");
}

export default function BaseModal({ isOpen, onClose, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      // The class below is applied to <body> when the modal is open
      bodyOpenClassName="modal-body-locked" 
      style={{
        overlay: {
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10000,
        },
        content: {
          inset: 0,
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        },
      }}
      contentLabel="Modal"
    >
      {children}
    </ReactModal>
  );
}
