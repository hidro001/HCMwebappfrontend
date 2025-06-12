
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
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

import ForgotPassword from "./ForgotPassword";
import useAuthStore from "../../../store/store";
import {
  login as loginService,
  verifyOtp,
  resendOtp,
  fetchCompanyInfo,
} from "../../../service/service";
import LockIcon from "@mui/icons-material/Lock";

// Styled Components

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
  const { companyInfo, setCompanyInfo, isAuthenticated, permissions } =
    authStore;
  const theme = useTheme();

  // 1️⃣ Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (permissions.includes("dashboard-super")) {
        navigate("/dashboard/super-employee-dashboard", { replace: true });
      } else if (permissions.includes("dashboard-employee")) {
        navigate("/dashboard/employee", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, permissions, navigate]);

  // State
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // Fetch company info once
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchCompanyInfo();
        if (mounted && data.length > 0) {
          const info = data[0];
          if (JSON.stringify(companyInfo) !== JSON.stringify(info)) {
            setCompanyInfo(info);
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to fetch company info");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [companyInfo, setCompanyInfo]);

  // OTP resend cooldown
  useEffect(() => {
    let timer;
    if (step === 2 && resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, resendCooldown]);

  // Helpers
  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);
  const validateInputs = () => {
    let ok = true;
    if (!employeeId) {
      ok = false;
      toast.error("Employee ID is required.");
    }
    if (!password && step === 1) {
      ok = false;
      toast.error("Password is required.");
    }
    if (!otp && step === 2) {
      ok = false;
      toast.error("OTP is required.");
    }
    return ok;
  };

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    setError("");
    try {
      const resp = await loginService(employeeId, password);
      if (resp.requiresOtp) {
        setStep(2);
        setResendCooldown(30);
        toast.success("OTP sent! Check your email.");
      } else {
        handleLoginSuccess(resp);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    setError("");
    try {
      const resp = await verifyOtp(employeeId, otp);
      handleLoginSuccess(resp);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      await resendOtp(employeeId);
      setResendCooldown(30);
      toast.success("OTP resent! Check your email.");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (resp) => {
    const { user, accessToken } = resp;
    // parse arrays if needed...
    authStore.login({
      accessToken,
      _id: user._id,
      userRole: user.user_Role,
      permissionRole: user.permission_role,
      userName: `${user.first_Name} ${user.last_Name || ""}`.trim(),
      employeeId: user.employee_Id,
      department: user.department,
      workingEmail: user.working_Email_Id,
      phoneNumber: user.mobile_No,
      designation: user.designation,
      departmentAlocated: Array.isArray(user.departmentAlocated)
        ? user.departmentAlocated
        : [],
      teams: Array.isArray(user.teams) ? user.teams : [],
      userAvatar: user.user_Avatar,
      permissions: user.permission || [],
      engagement_permission: user.engagement_permission,
    });
    toast.success("Login successful!");
    // navigate is handled by our redirect useEffect
  };

  const handleForgotPasswordOpen = () => setForgotPasswordOpen(true);
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  return (
    <GlassCard>
      {/* Logo */}{" "}
      <Box className="flex justify-center mb-2">

        <img
          src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
          alt="Company Logo"
          className="w-36 h-36 object-contain" // Tailwind classes for width and height
        />
      </Box>
      {/* Heading */}
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: "0.05em",
          color: theme.palette.mode === "dark" ? "#fff" : "#333",
        }}
      >
        Sign In
      </Typography>
      {/* Form */}
      <Box
        component="form"
        onSubmit={step === 1 ? handleLogin : handleOTPVerification}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {step === 1 && (
          <>
            <FormControl>
              <FormLabel>Employee ID</FormLabel>
              <TextField
                placeholder="Enter your ID"
                fullWidth
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                type={passwordVisible ? "text" : "password"}
                placeholder="••••••••"
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility}>
                      {passwordVisible ? "Hide" : "Show"}
                    </Button>
                  ),
                }}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </>
        )}
        {step === 2 && (
          <FormControl>
            <FormLabel>Enter OTP</FormLabel>
            <TextField
              placeholder="Enter OTP"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </FormControl>
        )}

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ textTransform: "none" }}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : step === 1 ? (
            "Sign In"
          ) : (
            "Verify OTP"
          )}
        </Button>

        {step === 2 && (
          <Button
            onClick={handleResendOtp}
            disabled={resendCooldown > 0 || loading}
          >
            Resend OTP ({resendCooldown}s)
          </Button>
        )}

        {step === 1 && (
          <Box textAlign="center" mt={3}>
            <ForgotPasswordLink onClick={handleForgotPasswordOpen}>
              <LockIcon fontSize="small" />
              Forgot your password?
            </ForgotPasswordLink>
          </Box>
        )}
      </Box>
      <ForgotPassword
        open={forgotPasswordOpen}
        handleClose={handleForgotPasswordClose}
      />
    </GlassCard>
  );
};

export default LoginCard;
