import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast notifications
import logo from "../../assets/HM-Horizontal.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer2 from "../Footer2";
const ForgotPassword = () => {
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
  const navigate = useNavigate();

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://apiv2.humanmaximizer.com/api/v1/auth/password-reset-request", // Use backend endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employee_Id: employeeId }), // Sending employee ID
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset link sent to your email.");
        setEmployeeId(""); // Clear input field
      } else {
        toast.error(data.message); // Show error from backend
      }
    } catch (error) {
      console.error("Error in password reset request:", error);
      toast.error("Failed to send password reset link.");
    } finally {
      setLoading(false);
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
                    width: "300px",
                    height: "250px",
                    objectFit: "cover",
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
                  width: "300px",
                  height: "250px",
                  objectFit: "cover",
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

          <div
            className="forgot-password-page"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // minHeight: "100vh",
              backgroundColor: "#f5f5f5",
              padding: "20px",
            }}
          >
            <div
              className="rzrems-signin-card"
              style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h5
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#0d306d",
                }}
              >
                Forgot password? That's okay! Let's change it 😊
              </h5>
              <form onSubmit={handlePasswordResetRequest}>
                <div className="form-group mb-3">
                  <label htmlFor="employeeId" style={{ fontWeight: "bold" }}>
                    Enter Your Employee ID
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="form-control"
                    placeholder="Employee ID"
                    style={{
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ced4da",
                      marginTop: "5px",
                    }}
                  />
                </div>
                {error && (
                  <div
                    className="alert alert-danger"
                    style={{
                      marginBottom: "15px",
                      padding: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                    }}
                  >
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#0d306d",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? <>Sending...</> : "Send Reset Link"}
                </button>
              </form>
              <div
                className="text-center mt-3"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                <p>
                  Remember your password?
                  <span
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/")}
                    style={{
                      color: "#0d306d",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Login Here
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer2 />
    </div>
  );
};

export default ForgotPassword;
