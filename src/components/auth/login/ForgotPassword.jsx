// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import OutlinedInput from '@mui/material/OutlinedInput';

// // Optional: Styled components using Material-UI's styled API
// // const StyledDialog = styled(Dialog)(({ theme }) => ({
// //   // Add custom styles here if needed
// // }));

// export default function ForgotPassword({ open, handleClose }) {
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     handleClose();
//     // Implement password reset logic here
//     // For example, extract email value and initiate reset process
//     const email = event.target.email.value;
//     console.log('Password reset for:', email);
//     // Add actual reset logic as needed
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       PaperProps={{
//         component: 'form',
//         onSubmit: handleFormSubmit,
//         sx: { backgroundImage: 'none' },
//       }}
//       aria-labelledby="reset-password-title"
//       aria-describedby="reset-password-description"
//     >
//       <DialogTitle id="reset-password-title">Reset password</DialogTitle>
//       <DialogContent
//         sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
//       >
//         <DialogContentText id="reset-password-description">
//           Enter your account&apos;s email address, and we&apos;ll send you a link to
//           reset your password.
//         </DialogContentText>
//         <OutlinedInput
//           autoFocus
//           required
//           margin="dense"
//           id="email"
//           name="email"
//           placeholder="Email address"
//           type="email"
//           fullWidth
//           aria-label="Email address"
//         />
//       </DialogContent>
//       <DialogActions sx={{ pb: 3, px: 3 }}>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button variant="contained" type="submit" color="primary">
//           Continue
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// ForgotPassword.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
// };

// src/components/ForgotPassword.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { passwordResetRequest } from '../../../service/service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = ({ open, handleClose }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await passwordResetRequest(employeeId);
      toast.success('Password reset link sent to your email.');
      setEmployeeId('');
      handleClose();
    } catch (error) {
      toast.error(error.message || 'Failed to send password reset link.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleFormSubmit,
        sx: { backgroundImage: 'none' },
      }}
      aria-labelledby="reset-password-title"
      aria-describedby="reset-password-description"
    >
      <DialogTitle id="reset-password-title">Reset Password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText id="reset-password-description">
          Enter your Employee ID, and we'll send you a link to reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="employeeId"
          name="employeeId"
          placeholder="Employee ID"
          type="text"
          fullWidth
          aria-label="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ForgotPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ForgotPassword;

