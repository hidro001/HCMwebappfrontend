import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for show/hide password
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast notifications
import Footer2 from "../Footer2";

const ResetPassword = () => {
  const { resetToken } = useParams(); // Extract reset token from URL
  const navigate = useNavigate(); // Navigate to another route
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://apiv2.humanmaximizer.com/api/v1/auth/reset-password", // Backend endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetToken, // Send reset token from URL
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful. Redirecting to home page...");
        navigate("/"); // Redirect to home page
      } else if (response.status === 400) {
        toast.error(data.message || "Invalid or expired token.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error in resetting password:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="container">
        <h2>Set New Password</h2>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="newPassword">New Password</label>
          <div className="input-group mb-3">
            <input
              type={passwordVisible ? "text" : "password"}
              id="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              placeholder="Enter new password"
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

          <label htmlFor="confirmPassword">Confirm New Password</label>
          <div className="input-group mb-3">
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Confirm new password"
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

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
      <Footer2 />
    </div>
  );
};

export default ResetPassword;
