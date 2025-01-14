

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
//         {/* Use variant="contained" to ensure visibility in both modes */}
//         <Button
//           onClick={onCancel}
//           color="secondary"
//           variant="contained"
//         >
//           {cancelText}
//         </Button>
//         <Button
//           onClick={onConfirm}
//           color="primary"
//           variant="contained"
//           autoFocus
//         >
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


// src/components/ConfirmationDialog.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
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

