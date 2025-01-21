

// // src/components/common/ConfirmationDialog.jsx
// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from '@mui/material';

// const ConfirmationDialog = ({
//   open,
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   confirmText = 'Confirm',
//   cancelText = 'Cancel',
// }) => {
//   return (
//     <Dialog
//       open={open}
//       onClose={onCancel}
//       aria-labelledby="confirmation-dialog-title"
//       aria-describedby="confirmation-dialog-description"
//     >
//       <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="confirmation-dialog-description">
//           {message}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
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
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const theme = useTheme();

  // If you want to switch to "fullScreen" behavior on extra-small devices
  // you can do something like this:
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="sm" // up to "sm" (600px) by default
      // If you want to go fully fullscreen on super-small devices, enable this:
      // fullScreen={fullScreen}
      PaperProps={{
        sx: {
          // Instead of minWidth: 400, use responsive breakpoints:
          width: {
            xs: "90%", // on extra-small screens, occupy 90% of the viewport
            sm: "auto", // once we hit "sm", allow default
          },
          // Provide horizontal margin so it doesn't edge-snug on small screens
          mx: "auto",
          // Optional dark-mode style
          backgroundColor: "rgba(30,30,30,0.9)",
          color: "#fff",
          // Some vertical padding if you like
          py: 2,
        },
      }}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirmation-dialog-description"
          sx={{ color: "inherit" }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} color="secondary" variant="contained">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
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

