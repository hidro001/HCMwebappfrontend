// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import MuiCard from '@mui/material/Card';
// import Checkbox from '@mui/material/Checkbox';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Link from '@mui/material/Link';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import ForgotPassword from './ForgotPassword';

// // Styled Card component using Material-UI's styled API
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// export default function LoginCard() {
//   const [emailError, setEmailError] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = useState('');
//   const [passwordError, setPasswordError] = useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//   const [open, setOpen] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (event) => {
//     if (emailError || passwordError) {
//       event.preventDefault();
//       return;
//     }
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   const validateInputs = () => {
//     const emailElement = document.getElementById('email');
//     const passwordElement = document.getElementById('password');

//     let isValid = true;

//     if (emailElement) {
//       const email = emailElement.value;
//       if (!email || !/\S+@\S+\.\S+/.test(email)) {
//         setEmailError(true);
//         setEmailErrorMessage('Please enter a valid email address.');
//         isValid = false;
//       } else {
//         setEmailError(false);
//         setEmailErrorMessage('');
//       }
//     } else {
//       console.warn("Email input with id 'email' not found.");
//       setEmailError(true);
//       setEmailErrorMessage('Email input not found.');
//       isValid = false;
//     }

//     if (passwordElement) {
//       const password = passwordElement.value;
//       if (!password || password.length < 6) {
//         setPasswordError(true);
//         setPasswordErrorMessage('Password must be at least 6 characters long.');
//         isValid = false;
//       } else {
//         setPasswordError(false);
//         setPasswordErrorMessage('');
//       }
//     } else {
//       console.warn("Password input with id 'password' not found.");
//       setPasswordError(true);
//       setPasswordErrorMessage('Password input not found.');
//       isValid = false;
//     }

//     return isValid;
//   };

//   return (
//     <Card variant="outlined">
//       <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//       </Box>
//       <Typography
//         component="h1"
//         variant="h4"
//         sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//       >
//         Sign in
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         noValidate
//         sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
//       >
//         <FormControl>
//           <FormLabel htmlFor="email">Email</FormLabel>
//           <TextField
//             error={emailError}
//             helperText={emailErrorMessage}
//             id="email"
//             type="email"
//             name="email"
//             placeholder="your@email.com"
//             autoComplete="email"
//             autoFocus
//             required
//             fullWidth
//             variant="outlined"
//             color={emailError ? 'error' : 'primary'}
//           />
//         </FormControl>
//         <FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <FormLabel htmlFor="password">Password</FormLabel>
//             <Link
//               component="button"
//               type="button"
//               onClick={handleClickOpen}
//               variant="body2"
//               sx={{ alignSelf: 'baseline' }}
//             >
//               Forgot your password?
//             </Link>
//           </Box>
//           <TextField
//             error={passwordError}
//             helperText={passwordErrorMessage}
//             name="password"
//             placeholder="••••••"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             required
//             fullWidth
//             variant="outlined"
//             color={passwordError ? 'error' : 'primary'}
//           />
//         </FormControl>
//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />
//         <ForgotPassword open={open} handleClose={handleClose} />
//         <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
//           Sign in
//         </Button>
//       </Box>
//     </Card>
//   );
// }

// // src/components/LoginCard.js
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import MuiCard from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Link from "@mui/material/Link";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { styled } from "@mui/material/styles";
// import ForgotPassword from "./ForgotPassword";
// import useAuthStore from "../../../store/store";
// import {
//   login as loginService,
//   verifyOtp,
//   resendOtp,
//   fetchCompanyInfo,
// } from "../../../service/service";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// // Initialize toast notifications
// // toast.configure();

// // Styled Card component using Material-UI's styled API
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   width: "100%",
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
//   [theme.breakpoints.up("sm")]: {
//     width: "450px",
//   },
// }));

// const LoginCard = () => {
//   const navigate = useNavigate();
//   const authStore = useAuthStore();

//   // Local component states
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [employeeId, setEmployeeId] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(30);
//   const [companyInfo, setCompanyInfo] = useState([]);

//   const [open, setOpen] = useState(false);

//   // Fetch company info on mount
//   useEffect(() => {
//     const getCompanyInfo = async () => {
//       try {
//         const data = await fetchCompanyInfo();
//         setCompanyInfo(data);
//       } catch (err) {
//         console.error(err);
//         toast.error(err.message || "Failed to fetch company info");
//       }
//     };
//     getCompanyInfo();
//   }, []);

//   // Resend OTP cooldown timer
//   useEffect(() => {
//     let timer;
//     if (resendCooldown > 0) {
//       timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [resendCooldown]);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await loginService(employeeId, password);

//       if (response.requiresOtp) {
//         setStep(2);
//         toast.success("OTP sent! Please check your email.");
//       } else {
//         // Handle successful login
//         handleLoginSuccess(response);
//       }
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOTPVerification = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await verifyOtp(employeeId, otp);
//       // Handle successful OTP verification
//       handleLoginSuccess(response);
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || "OTP verification failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       await resendOtp(employeeId);
//       setResendCooldown(30);
//       toast.success("OTP resent! Please check your email.");
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || "Failed to resend OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoginSuccess = (response) => {
//     const { user, accessToken } = response;
//     const {
//       user_Role,
//       permission_role,
//       first_Name,
//       last_Name,
//       employee_Id,
//       department,
//       working_Email_Id,
//       mobile_No,
//       designation,
//       departmentAlocated,
//       teams,
//       _id,
//     } = user;

//     // Parse departmentAlocated and teams
//     const parseDepartmentAlocated = (deptAlloc) => {
//       let departmentsArray = [];
//       if (Array.isArray(deptAlloc)) {
//         deptAlloc.forEach((element) => {
//           if (typeof element === "string") {
//             try {
//               const parsedElement = JSON.parse(element);
//               if (Array.isArray(parsedElement)) {
//                 departmentsArray = departmentsArray.concat(parsedElement);
//               } else {
//                 departmentsArray = departmentsArray.concat(element.split(","));
//               }
//             } catch (e) {
//               departmentsArray = departmentsArray.concat(element.split(","));
//             }
//           }
//         });
//       } else if (typeof deptAlloc === "string") {
//         try {
//           const parsed = JSON.parse(deptAlloc);
//           if (Array.isArray(parsed)) {
//             departmentsArray = parsed;
//           } else {
//             departmentsArray = deptAlloc.split(",");
//           }
//         } catch (e) {
//           departmentsArray = deptAlloc.split(",");
//         }
//       }
//       return [...new Set(departmentsArray.map((dept) => dept.trim()))];
//     };

//     const parseTeams = (teams) => {
//       if (Array.isArray(teams)) {
//         return teams.map((team) => ({
//           department: team.department,
//           teamName: team.teamName,
//           teamId: team._id,
//         }));
//       }
//       return [];
//     };

//     const departmentsArray = parseDepartmentAlocated(departmentAlocated);
//     const teamsArray = parseTeams(teams);

//     // Update Zustand store
//     authStore.login({
//       accessToken,
//       userRole: user_Role,
//       permissionRole: permission_role,
//       userName: `${first_Name} ${last_Name || ""}`,
//       employeeId: employee_Id,
//       department,
//       workingEmail: working_Email_Id,
//       phoneNumber: mobile_No,
//       designation,
//       departmentAlocated: departmentsArray,
//       teams: teamsArray,
//     });

//     toast.success("Login Successful!");

//     // Navigate based on user role
//     switch (permission_role) {
//       case "employee":
//         navigate("/dashboard");
//         break;
//       case "manager":
//         navigate("/dashboard/manager-dashboard");
//         break;
//       case "super-admin":
//         navigate("/dashboard/super-admin-dashboard");
//         break;
//       default:
//         toast.error("Unknown user role");
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Input validation
//   const validateInputs = () => {
//     let isValid = true;
//     if (!employeeId) {
//       isValid = false;
//       toast.error("Employee ID is required.");
//     }
//     if (!password && step === 1) {
//       isValid = false;
//       toast.error("Password is required.");
//     }
//     if (!otp && step === 2) {
//       isValid = false;
//       toast.error("OTP is required.");
//     }
//     return isValid;
//   };

//   return (
//     <Card variant="outlined">
//       <Typography
//         component="h1"
//         variant="h4"
//         sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//       >
//         Sign in
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={step === 1 ? handleLogin : handleOTPVerification}
//         noValidate
//         sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
//       >
//         {step === 1 && (
//           <>
//             <FormControl>
//               <FormLabel htmlFor="employeeId">Employee ID</FormLabel>
//               <TextField
//                 id="employeeId"
//                 type="text"
//                 name="employeeId"
//                 placeholder="Employee ID"
//                 autoComplete="off"
//                 autoFocus
//                 required
//                 fullWidth
//                 variant="outlined"
//                 value={employeeId}
//                 onChange={(e) => setEmployeeId(e.target.value)}
//                 color={error ? "error" : "primary"}
//               />
//             </FormControl>
//             <FormControl>
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <FormLabel htmlFor="password">Password</FormLabel>
//                 <Link
//                   component="button"
//                   type="button"
//                   onClick={handleClickOpen}
//                   variant="body2"
//                   sx={{ alignSelf: "baseline" }}
//                 >
//                   Forgot your password?
//                 </Link>
//               </Box>
//               <TextField
//                 id="password"
//                 type={passwordVisible ? "text" : "password"}
//                 name="password"
//                 placeholder="••••••"
//                 autoComplete="current-password"
//                 required
//                 fullWidth
//                 variant="outlined"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 color={error ? "error" : "primary"}
//                 InputProps={{
//                   endAdornment: (
//                     <Button onClick={togglePasswordVisibility} variant="text">
//                       {passwordVisible ? "Hide" : "Show"}
//                     </Button>
//                   ),
//                 }}
//               />
//             </FormControl>
//           </>
//         )}

//         {step === 2 && (
//           <FormControl>
//             <FormLabel htmlFor="otp">Enter OTP</FormLabel>
//             <TextField
//               id="otp"
//               type="text"
//               name="otp"
//               placeholder="OTP"
//               required
//               fullWidth
//               variant="outlined"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               color={error ? "error" : "primary"}
//             />
//           </FormControl>
//         )}

//         {error && (
//           <Typography color="error" variant="body2">
//             {error}
//           </Typography>
//         )}

//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Remember me"
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           onClick={validateInputs}
//           disabled={loading}
//         >
//           {loading
//             ? step === 1
//               ? "Logging in..."
//               : "Verifying..."
//             : step === 1
//             ? "Sign in"
//             : "Verify OTP"}
//         </Button>

//         {step === 2 && (
//           <Button
//             type="button"
//             fullWidth
//             variant="text"
//             onClick={handleResendOtp}
//             disabled={resendCooldown > 0 || loading}
//           >
//             {loading ? "Resending OTP..." : `Resend OTP (${resendCooldown}s)`}
//           </Button>
//         )}

//         <ForgotPassword open={open} handleClose={handleClose} />
//       </Box>
//     </Card>
//   );
// };

// export default LoginCard;


// src/components/LoginCard.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import useAuthStore from '../../../store/store';
import {
  login as loginService,
  verifyOtp,
  resendOtp,
  fetchCompanyInfo,
} from '../../../service/service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const LoginCard = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  // Local component states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Login, 2: OTP Verification
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [open, setOpen] = useState(false);

  // Fetch company info on mount
  useEffect(() => {
    const getCompanyInfo = async () => {
      try {
        const data = await fetchCompanyInfo();
        if (data.length > 0) {
          authStore.setCompanyInfo(data[0]); // Assuming data is an array with one company
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Failed to fetch company info');
      }
    };
    getCompanyInfo();
  }, [authStore]);

  // Resend OTP cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginService(employeeId, password);

      if (response.requiresOtp) {
        setStep(2);
        toast.success('OTP sent! Please check your email.');
      } else {
        // Handle successful login
        handleLoginSuccess(response);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await verifyOtp(employeeId, otp);
      // Handle successful OTP verification
      handleLoginSuccess(response);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await resendOtp(employeeId);
      setResendCooldown(30);
      toast.success('OTP resent! Please check your email.');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

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
      _id,
      user_Avatar,
    } = user;

    // Parse departmentAlocated and teams
    const parseDepartmentAlocated = (deptAlloc) => {
      let departmentsArray = [];
      if (Array.isArray(deptAlloc)) {
        deptAlloc.forEach((element) => {
          if (typeof element === 'string') {
            try {
              const parsedElement = JSON.parse(element);
              if (Array.isArray(parsedElement)) {
                departmentsArray = departmentsArray.concat(parsedElement);
              } else {
                departmentsArray = departmentsArray.concat(element.split(','));
              }
            } catch (e) {
              departmentsArray = departmentsArray.concat(element.split(','));
            }
          }
        });
      } else if (typeof deptAlloc === 'string') {
        try {
          const parsed = JSON.parse(deptAlloc);
          if (Array.isArray(parsed)) {
            departmentsArray = parsed;
          } else {
            departmentsArray = deptAlloc.split(',');
          }
        } catch (e) {
          departmentsArray = deptAlloc.split(',');
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
      userName: `${first_Name} ${last_Name || ''}`,
      employeeId: employee_Id,
      department,
      workingEmail: working_Email_Id,
      phoneNumber: mobile_No,
      designation,
      departmentAlocated: departmentsArray,
      teams: teamsArray,
      userAvatar: user_Avatar, // Add user avatar
    });

    toast.success('Login Successful!');

    // Navigate based on user role
    switch (permission_role) {
      case 'employee':
        navigate('/dashboard');
        break;
      case 'manager':
        navigate('/dashboard/manager-dashboard');
        break;
      case 'super-admin':
        navigate('/dashboard/super-admin-dashboard');
        break;
      default:
        toast.error('Unknown user role');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Input validation
  const validateInputs = () => {
    let isValid = true;
    if (!employeeId) {
      isValid = false;
      toast.error('Employee ID is required.');
    }
    if (!password && step === 1) {
      isValid = false;
      toast.error('Password is required.');
    }
    if (!otp && step === 2) {
      isValid = false;
      toast.error('OTP is required.');
    }
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={step === 1 ? handleLogin : handleOTPVerification}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        {step === 1 && (
          <>
            <FormControl>
              <FormLabel htmlFor="employeeId">Employee ID</FormLabel>
              <TextField
                id="employeeId"
                type="text"
                name="employeeId"
                placeholder="Employee ID"
                autoComplete="off"
                autoFocus
                required
                fullWidth
                variant="outlined"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                color={error ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color={error ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <Button onClick={togglePasswordVisibility} variant="text">
                      {passwordVisible ? 'Hide' : 'Show'}
                    </Button>
                  ),
                }}
              />
            </FormControl>
          </>
        )}

        {step === 2 && (
          <FormControl>
            <FormLabel htmlFor="otp">Enter OTP</FormLabel>
            <TextField
              id="otp"
              type="text"
              name="otp"
              placeholder="OTP"
              required
              fullWidth
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              color={error ? 'error' : 'primary'}
            />
          </FormControl>
        )}

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
          disabled={loading}
        >
          {loading
            ? step === 1
              ? 'Logging in...'
              : 'Verifying...'
            : step === 1
            ? 'Sign in'
            : 'Verify OTP'}
        </Button>

        {step === 2 && (
          <Button
            type="button"
            fullWidth
            variant="text"
            onClick={handleResendOtp}
            disabled={resendCooldown > 0 || loading}
          >
            {loading ? 'Resending OTP...' : `Resend OTP (${resendCooldown}s)`}
          </Button>
        )}

        <ForgotPassword open={open} handleClose={handleClose} />
      </Box>
    </Card>
  );
};

export default LoginCard;
