

// import  { useState } from "react";
// import PropTypes from "prop-types";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import { styled } from "@mui/material/styles";
// import { passwordResetRequest } from "../../../service/service";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LockResetIcon from "@mui/icons-material/LockReset"; // MUI Icon

// // Styled Components

// // Adjusted the dialog background opacity to 0.85 for better visibility
// const GlassDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiPaper-root": {
//     background: "rgba(255, 255, 255, 0.85)", // Increased opacity
//     backdropFilter: "blur(10px)",
//     borderRadius: "16px",
//     boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//     color: theme.palette.text.primary,
//     padding: theme.spacing(2),
//   },
//   // Optional: Adjust the backdrop opacity to make the overlay lighter
//   "& .MuiBackdrop-root": {
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Reduced opacity from default
//   },
// }));

// // Gradient Button for actions
// const GradientButton = styled(Button)({
//   background: "linear-gradient(to right, #6a11cb, #2575fc)",
//   color: "white",
//   fontWeight: "bold",
//   textTransform: "none",
//   "&:hover": {
//     background: "linear-gradient(to right, #2575fc, #6a11cb)",
//   },
// });

// // Styled Input Field to ensure opacity and readability
// const InputField = styled(OutlinedInput)({
//   borderRadius: "8px",
//   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//   backgroundColor: "#fff", // Ensures input field is opaque
// });

// // ForgotPassword Component
// const ForgotPassword = ({ open, handleClose }) => {
//   const [employeeId, setEmployeeId] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle form submission for password reset
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (!employeeId.trim()) {
//       toast.error("Employee ID is required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await passwordResetRequest(employeeId);
//       toast.success("Password reset link sent to your email.");
//       setEmployeeId("");
//       handleClose();
//     } catch (error) {
//       toast.error(
//         error.message || "You can only request a password reset twice per day."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <GlassDialog
//       open={open}
//       onClose={handleClose}
//       BackdropProps={{
//         style: {
//           backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjusted backdrop color
//         },
//       }}
//       PaperProps={{
//         component: "form",
//         onSubmit: handleFormSubmit,
//       }}
//       aria-labelledby="reset-password-title"
//       aria-describedby="reset-password-description"
//     >
//       {/* Dialog Header */}
//       <DialogTitle
//         id="reset-password-title"
//         sx={{
//           textAlign: "center",
//           fontWeight: "bold",
//           fontSize: "1.8rem",
//           color: "#333",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 1,
//         }}
//       >
//         <LockResetIcon /> Forgot Password
//       </DialogTitle>

//       {/* Dialog Content */}
//       <DialogContent
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <DialogContentText sx={{ color: "#555", fontSize: "1rem" }}>
//           Enter your Employee ID, and we'll send you a link to reset your
//           password.
//         </DialogContentText>
//         <InputField
//           autoFocus
//           required
//           placeholder="Employee ID"
//           fullWidth
//           backgroundColor="#555"
//           value={employeeId}
//           onChange={(e) => setEmployeeId(e.target.value)}
//         />
//       </DialogContent>

//       {/* Dialog Actions */}
//       <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
//         <Button
//           onClick={handleClose}
//           variant="text"
//           sx={{ color: "#555", textTransform: "none" }}
//         >
//           Cancel
//         </Button>
//         <GradientButton type="submit" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </GradientButton>
//       </DialogActions>
//     </GlassDialog>
//   );
// };

// // PropTypes for type checking
// ForgotPassword.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
// };

// export default ForgotPassword;


import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
  CircularProgress,    // <-- Import the loading spinner
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LockResetIcon from "@mui/icons-material/LockReset";

// React Hot Toast
import { toast } from "react-hot-toast";

// Example async function that sends reset link
import { passwordResetRequest } from "../../../service/service";

/* ============================= Styled Components ============================= */

// Styled “Glass” dialog that automatically adapts to theme mode
const GlassDialog = styled(Dialog)(({ theme }) => {
  // Decide a translucent background depending on light or dark mode
  const glassBg =
    theme.palette.mode === "dark"
      ? "rgba(50, 50, 50, 0.75)"
      : "rgba(255, 255, 255, 0.75)";

  return {
    "& .MuiPaper-root": {
      background: glassBg,
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };
});

// Gradient button
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #6a11cb, #2575fc)",
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    background: "linear-gradient(to right, #2575fc, #6a11cb)",
  },
}));

// Styled input field that uses theme colors
const InputField = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  // Use the paper color so it adapts to light/dark mode
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& .MuiOutlinedInput-input::placeholder": {
    color: theme.palette.text.disabled,
  },
}));

/* ============================= Main Component ============================= */

const ForgotPassword = ({ open, handleClose }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      toast.error("Employee ID is required.");
      return;
    }

    setLoading(true);
    try {
      await passwordResetRequest(employeeId);
      toast.success("Password reset link sent to your email.");
      setEmployeeId("");
      handleClose();
    } catch (error) {
      toast.error(
        error.message || "You can only request a password reset twice per day."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="reset-password-title"
      aria-describedby="reset-password-description"
      PaperProps={{
        component: "form",
        onSubmit: handleFormSubmit,
      }}
    >
      <DialogTitle
        id="reset-password-title"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <LockResetIcon />
        Forgot Password
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <DialogContentText
          sx={{
            fontSize: "1rem",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Enter your Employee ID, and we'll send you a link to reset your
          password.
        </DialogContentText>

        <InputField
          autoFocus
          required
          placeholder="Employee ID"
          fullWidth
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>

        {/* Show spinner + 'Sending...' when loading */}
        <GradientButton type="submit" disabled={loading}>
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </GradientButton>
      </DialogActions>
    </GlassDialog>
  );
};

ForgotPassword.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ForgotPassword;
