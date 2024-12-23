import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@mui/material/styles"; // For theme detection

import ForgotPassword from "./ForgotPassword"; // Ensure correct import path
import useAuthStore from "../../../store/store"; // Zustand store
import {
  login as loginService,
  verifyOtp,
  resendOtp,
  fetchCompanyInfo,
} from "../../../service/service"; // API services
import LockIcon from "@mui/icons-material/Lock"; // MUI Icon

// Styled Components

// GlassCard for the login container
const GlassCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "16px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

// Styled Link with MUI Icon for "Forgot your password?"
const ForgotPasswordLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  color: "#2575fc",
  fontWeight: 500,
  fontSize: "0.95rem",
  transition: "color 0.3s ease",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    color: "#6a11cb",
    textDecoration: "underline",
  },
}));

const LoginCard = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const theme = useTheme(); // Access the current theme

  // State Management
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Fetch company info on mount
  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const getCompanyInfo = async () => {
      console.log("Fetching company info...");
      try {
        const data = await fetchCompanyInfo();
        console.log("Company Info Data:", data);
        if (data.length > 0 && isMounted) {
          setCompanyInfoIfDifferent(data[0]); // Use the new function
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching company info:", err);
          toast.error(err.message || "Failed to fetch company info");
        }
      }
    };
    getCompanyInfo();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, []); // Empty dependency array ensures this runs once

  // Resend OTP cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0 && step === 2) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown, step]);

  // Utility function to prevent redundant state updates
  const setCompanyInfoIfDifferent = (companyData) => {
    const currentCompanyInfo = authStore.companyInfo;
    if (JSON.stringify(currentCompanyInfo) !== JSON.stringify(companyData)) {
      authStore.setCompanyInfo(companyData);
    }
  };

  // Handle Password Visibility Toggle
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Input validation
  const validateInputs = () => {
    let isValid = true;
    if (!employeeId) {
      isValid = false;
      toast.error("Employee ID is required.");
    }
    if (!password && step === 1) {
      isValid = false;
      toast.error("Password is required.");
    }
    if (!otp && step === 2) {
      isValid = false;
      toast.error("OTP is required.");
    }
    return isValid;
  };

  // Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError("");

    try {
      const response = await loginService(employeeId, password);

      if (response.requiresOtp) {
        setStep(2);
        setResendCooldown(30);
        toast.success("OTP sent! Please check your email.");
      } else {
        // Handle successful login
        handleLoginSuccess(response);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification Submission
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError("");

    try {
      const response = await verifyOtp(employeeId, otp);
      // Handle successful OTP verification
      handleLoginSuccess(response);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await resendOtp(employeeId);
      setResendCooldown(30);
      toast.success("OTP resent! Please check your email.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Successful Login or OTP Verification
  const handleLoginSuccess = (response) => {
    const { user, accessToken } = response;
    const {
      user_Role,
      permission_role,
      first_Name,
      last_Name,
      employee_Id,
      department,
      working_Email_Id,
      mobile_No,
      designation,
      departmentAlocated,
      teams,
      user_Avatar,
    } = user;

    // Parse departmentAlocated and teams
    const parseDepartmentAlocated = (deptAlloc) => {
      let departmentsArray = [];
      if (Array.isArray(deptAlloc)) {
        deptAlloc.forEach((element) => {
          if (typeof element === "string") {
            try {
              const parsedElement = JSON.parse(element);
              if (Array.isArray(parsedElement)) {
                departmentsArray = departmentsArray.concat(parsedElement);
              } else {
                departmentsArray = departmentsArray.concat(element.split(","));
              }
            } catch (e) {
              departmentsArray = departmentsArray.concat(element.split(","));
            }
          }
        });
      } else if (typeof deptAlloc === "string") {
        try {
          const parsed = JSON.parse(deptAlloc);
          if (Array.isArray(parsed)) {
            departmentsArray = parsed;
          } else {
            departmentsArray = deptAlloc.split(",");
          }
        } catch (e) {
          departmentsArray = deptAlloc.split(",");
        }
      }
      return [...new Set(departmentsArray.map((dept) => dept.trim()))];
    };

    const parseTeams = (teams) => {
      if (Array.isArray(teams)) {
        return teams.map((team) => ({
          department: team.department,
          teamName: team.teamName,
          teamId: team._id,
        }));
      }
      return [];
    };

    const departmentsArray = parseDepartmentAlocated(departmentAlocated);
    const teamsArray = parseTeams(teams);

    // Update Zustand store
    authStore.login({
      accessToken,
      userRole: user_Role,
      permissionRole: permission_role,
      userName: `${first_Name} ${last_Name || ""}`,
      employeeId: employee_Id,
      department,
      workingEmail: working_Email_Id,
      phoneNumber: mobile_No,
      designation,
      departmentAlocated: departmentsArray,
      teams: teamsArray,
      userAvatar: user_Avatar, // Add user avatar
    });

    toast.success("Login Successful!");

    // Navigate based on user role
    switch (permission_role.toLowerCase()) {
      case "employee":
        navigate("/dashboard");
        break;
      case "manager":
        navigate("/dashboard/manager-dashboard");
        break;
      case "super-admin":
        navigate("/dashboard/super-admin-dashboard");
        break;
      default:
        toast.error("Unknown user role");
    }
  };

  // Handle Forgot Password Modal Open/Close
  const handleForgotPasswordOpen = () => setForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  return (
    <GlassCard>
      {/* Logo */}
      <Box className="hidden lg:flex justify-center mb-2">
        <img
          src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
          alt="Company Logo"
          className="w-36 h-36 object-contain" // Tailwind classes for width and height
        />
      </Box>

      {/* Sign In Heading */}
      {/* <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: "0.05em",
          color: "#333",
        }}
      >
        Sign In
      </Typography> */}
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: "0.05em",
          color: theme.palette.mode === "dark" ? "#fff" : "#333", // Dynamic color
        }}
      >
        Sign In
      </Typography>
      {/* <Typography align="center" sx={{ mb: 2, color: "#555" }}>
        Please enter your credentials
      </Typography> */}

      {/* Login or OTP Verification Form */}
      <Box
        component="form"
        onSubmit={step === 1 ? handleLogin : handleOTPVerification}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {step === 1 && (
          <>
            {/* Employee ID */}
            <FormControl>
              <FormLabel>Employee ID</FormLabel>
              <TextField
                placeholder="Enter your ID"
                variant="outlined"
                fullWidth
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                error={Boolean(error && !employeeId)}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="text"
                      onClick={togglePasswordVisibility}
                      sx={{ textTransform: "none" }}
                      aria-label={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </Button>
                  ),
                }}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(error && !password)}
              />
            </FormControl>
          </>
        )}

        {step === 2 && (
          <>
            {/* OTP Input */}
            <FormControl>
              <FormLabel>Enter OTP</FormLabel>
              <TextField
                placeholder="Enter OTP"
                variant="outlined"
                fullWidth
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={Boolean(error && !otp)}
              />
            </FormControl>
          </>
        )}

        {/* Display Error Message */}
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}

        {/* Remember Me */}
        {/* {step === 1 && (
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
        )} */}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(to right, #2575fc, #6a11cb)",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1, // Space between spinner and text
          }}
          aria-label={
            loading
              ? step === 1
                ? "Logging in"
                : "Verifying OTP"
              : step === 1
              ? "Sign In"
              : "Verify OTP"
          }
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" />
              {step === 1 ? "Logging in..." : "Verifying..."}
            </>
          ) : step === 1 ? (
            "Sign In"
          ) : (
            "Verify OTP"
          )}
        </Button>

        {/* Resend OTP Button */}
        {step === 2 && (
          <Button
            type="button"
            variant="text"
            onClick={handleResendOtp}
            disabled={resendCooldown > 0 || loading}
            sx={{
              textTransform: "none",
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1, // Space between spinner and text
            }}
            aria-label={
              loading ? "Resending OTP" : `Resend OTP (${resendCooldown}s)`
            }
          >
            {loading ? (
              <>
                <CircularProgress size={20} color="inherit" />
                Resending OTP...
              </>
            ) : (
              `Resend OTP (${resendCooldown}s)`
            )}
          </Button>
        )}

        {/* Enhanced Forgot Password Link */}
        {step === 1 && (
          <Box textAlign="center" mt={3}>
            <ForgotPasswordLink onClick={handleForgotPasswordOpen}>
              <LockIcon fontSize="small" />
              Forgot your password?
            </ForgotPasswordLink>
          </Box>
        )}
      </Box>

      {/* Forgot Password Dialog */}
      <ForgotPassword
        open={forgotPasswordOpen}
        handleClose={handleForgotPasswordClose}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </GlassCard>
  );
};

export default LoginCard;
