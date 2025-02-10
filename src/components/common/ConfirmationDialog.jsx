
// import PropTypes from "prop-types";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// const ConfirmationDialog = ({
//   open,
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
// }) => {
//   const theme = useTheme();

//   // If you want to switch to "fullScreen" behavior on extra-small devices
//   // you can do something like this:
//   const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

//   return (
//     <Dialog
//       open={open}
//       onClose={onCancel}
//       fullWidth
//       maxWidth="sm" // up to "sm" (600px) by default
//       // If you want to go fully fullscreen on super-small devices, enable this:
//       // fullScreen={fullScreen}
//       PaperProps={{
//         sx: {
//           // Instead of minWidth: 400, use responsive breakpoints:
//           zIndex: 10000, // Ensure this is higher than BaseModal's 9999
//           width: {
//             xs: "90%", // on extra-small screens, occupy 90% of the viewport
//             sm: "600px", // once we hit "sm", allow default
//           },
//           // Provide horizontal margin so it doesn't edge-snug on small screens
//           mx: "auto",
//           // Optional dark-mode style

//           backgroundColor: "rgba(30,30,30,0.9)",
//           color: "#fff",
//           // Some vertical padding if you like
//           py: 2,
//         },
//       }}
//       aria-labelledby="confirmation-dialog-title"
//       aria-describedby="confirmation-dialog-description"
//     >
//       <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText
//           id="confirmation-dialog-description"
//           sx={{ color: "inherit" }}
//         >
//           {message}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={onCancel} color="secondary" variant="contained">
//           {cancelText}
//         </Button>
//         <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
//           {confirmText}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// ConfirmationDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired,
//   onConfirm: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
//   confirmText: PropTypes.string,
//   cancelText: PropTypes.string,
// };

// export default ConfirmationDialog;


import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal"; // Adjust import as needed
import { Button } from "@mui/material";

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <BaseModal isOpen={open} onClose={onCancel}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3 text-center">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onCancel}
            variant="outlined"
            color="secondary"
            className="w-1/3"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            className="w-1/3"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmationDialog;
