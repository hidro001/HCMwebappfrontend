import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import authService from "../../services/Service";
import { login as loginAction } from "../../actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import logo from "../../assets/HM-Horizontal.png";
import Footer2 from "../Footer2";

// Parse departmentAlocated correctly
const parseDepartmentAlocated = (departmentAlocated) => {
  let departmentsArray = [];

  if (Array.isArray(departmentAlocated)) {
    departmentAlocated.forEach((element) => {
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
  } else if (typeof departmentAlocated === "string") {
    try {
      const parsed = JSON.parse(departmentAlocated);
      if (Array.isArray(parsed)) {
        departmentsArray = parsed;
      } else {
        departmentsArray = departmentAlocated.split(",");
      }
    } catch (e) {
      departmentsArray = departmentAlocated.split(",");
    }
  }

  return [...new Set(departmentsArray.map((dept) => dept.trim()))];
};

// Parse teams correctly
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Track step (1: Login, 2: OTP)
  const [employee_Id, setEmployee_Id] = useState(""); // Store employee ID
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Define loading state
  const [resendCooldown, setResendCooldown] = useState(30); // Cooldown timer for resend OTP
  const [companyInfo, setCompanyInfo] = useState([]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner during login
    try {
      const response = await authService.login(employeeId, password);

      console.log("Login Response:", response); // Debug log
      if (response.success === true) {
        if (response.requiresOtp) {
          // OTP required for this user
          setEmployee_Id(employeeId); // Save employee ID for OTP verification
          setStep(2); // Move to OTP verification step
          toast.success("OTP sent! Please check your email.");
        } else {
          // Login success without OTP
          const { user, accessToken } = response;
          handleLoginSuccess(user, accessToken);
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const fetchCompanyLogo = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo"
      );
      if (response.data.success && response.data.data[0]?.logo) {
        setCompanyInfo(response.data.data);
        // console.log(companyInfo);
      } else {
        setCompanyInfo(null);
      }
    } catch (error) {
      console.error("Error fetching company logo:", error.message);
      toast.error("Failed to load company logo.");
    }
  };

  useEffect(() => {
    fetchCompanyLogo();
  }, []);

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner during OTP verification
    try {
      const response = await authService.verifyOtp(employee_Id, otp);

      console.log("OTP Verification Response:", response); // Debug log

      if (response.success) {
        const { user, accessToken } = response;
        handleLoginSuccess(user, accessToken);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "OTP verification failed.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleResendOtp = async () => {
    setLoading(true); // Show loading spinner during resend OTP
    try {
      await authService.resendOtp(employee_Id); // Call resend OTP API
      setResendCooldown(30); // Restart cooldown
      toast.success("OTP resent! Please check your email.");
    } catch (error) {
      setError("Failed to resend OTP. Please try again later.");
      toast.error("Failed to resend OTP.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const handleLoginSuccess = (user, accessToken) => {
    const {
      user_Role,
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
    } = user;

    const departmentsArray = parseDepartmentAlocated(departmentAlocated);
    const teamsArray = parseTeams(teams);

    dispatch(
      loginAction(
        accessToken,
        user_Role,
        `${first_Name} ${last_Name || ""}`,
        employee_Id,
        _id,
        department,
        working_Email_Id,
        mobile_No,
        designation,
        departmentsArray,
        teamsArray
      )
    );

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userRole", user_Role);
    localStorage.setItem("userName", `${first_Name} ${last_Name || ""}`);
    localStorage.setItem("employeeId", employee_Id);
    localStorage.setItem("department", department);
    localStorage.setItem("workingEmail", working_Email_Id);
    localStorage.setItem("phoneNumber", mobile_No);
    localStorage.setItem("designation", designation);
    localStorage.setItem("designation", designation);
    localStorage.setItem("mongo_id", _id);
    localStorage.setItem(
      "departmentAlocated",
      JSON.stringify(departmentsArray)
    );
    localStorage.setItem("teams", JSON.stringify(teamsArray));

    toast.success("Login Successful!");

    switch (user_Role) {
      case "admin":
        navigate("/dashboard/admin-dashboard");
        break;
      case "employee":
        navigate("/dashboard/employee-dashboard");
        break;
      case "manager":
        navigate("/dashboard/manager-dashboard");
        break;
      case "super-admin":
        navigate("/dashboard/super-admin-dashboard");
        break;
      default:
        throw new Error("Unknown user role");
    }
  };

  return (
    <div className="rzrems-signin-page">
      <div className="rzrems-container-login">
        <section className="rzrems-company-logo">
          <div className="rzrems-logo-container">
            {/* Dynamically fetched company logo with fallback */}
            {Array.isArray(companyInfo) && companyInfo.length > 0 ? (
              companyInfo.map((data, index) => (
                <img
                  key={index}
                  src={
                    data.logo
                      ? data.logo
                      : "https://ems11.s3.amazonaws.com/logo-HM+(1).png"
                  }
                  alt="Logo"
                  className="hm-logo-img"
                  style={{
                    marginBottom: "15px",
                  }}
                />
              ))
            ) : (
              <img
                src="https://ems11.s3.amazonaws.com/logo-HM+(1).png"
                alt="Fallback Logo"
                className="hm-logo-img"
                style={{
                  marginBottom: "15px",
                }}
              />
            )}
            <h6 className="text-center">Product Of Razor Infotech</h6>
          </div>
        </section>
        <section className="rzrems-signin-section">
          <img
            src={logo}
            alt=""
            style={{ width: "22vw", height: "10vh", objectFit: "cover" }}
          />

          <div className="rzrems-signin-card">
            {step === 1 ? (
              <form className="bg-white rounded" onSubmit={handleLogin}>
                <label htmlFor="employeeId">Enter Employee ID</label>
                <input
                  type="text"
                  required
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
                <label htmlFor="inputPassword">Enter Your Password</label>
                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="inputPassword"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="w-100 btn btn-primary mb-3">
                  {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-center">
                  <p>
                    <span>Forgot your password?</span> <nbsp />
                    <nbsp />
                    <span
                      className="rzr-rest-log"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Reset Password
                    </span>
                  </p>
                </div>
              </form>
            ) : (
              <form
                className="p-lg-4 p-3 mt-5 bg-white rounded"
                onSubmit={handleOTPVerification}
              >
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  required
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="w-100 btn btn-primary mb-3">
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            )}
            {step === 2 && (
              <button
                type="button"
                className="btn btn-link"
                onClick={handleResendOtp}
                // disabled={loading}
                disabled={resendCooldown > 0 || loading}
              >
                {/* {loading ? "Resending OTP..." : "Resend OTP"} */}
                {loading
                  ? "Resending OTP..."
                  : `Resend OTP (${resendCooldown}s)`}
              </button>
            )}
          </div>
        </section>
      </div>
      <Footer2 />
    </div>
  );
};

export default Login;
