

// import React from "react";
// import ReactModal from "react-modal";

// // Only do this once per app:
// if (typeof document !== "undefined") {
//   ReactModal.setAppElement("#root");
// }

// export default function BaseModal({ isOpen, onClose, children }) {
//   return (
//     <ReactModal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         overlay: {
//           // The blur/dim effect for everything behind the modal
//           backdropFilter: "blur(5px)",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 9999,
//         },
//         content: {
//           // Let the *child component* control its own styling (Tailwind)
//           // We'll just center the child in the viewport:
//           inset: 0,             // fill the screen
//           background: "none",   // so your child can have its own background
//           border: "none",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 0,
//         },
//       }}
//       // Optional: for screen reader accessibility
//       contentLabel="Modal"
//     >
//       {children}
//     </ReactModal>
//   );
// }


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
          zIndex: 9999,
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
