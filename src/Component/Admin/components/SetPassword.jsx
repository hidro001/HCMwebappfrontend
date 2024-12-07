// src/components/SetPassword.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Using Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

const SetPassword = () => {
  const { token } = useParams(); // Extract the token from URL
  const navigate = useNavigate(); // For redirection
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_Password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[@$!%*?&#]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
      confirm_Password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `https://apiv2.humanmaximizer.com/api/v1/superadmin/set-password/${token}`, // Adjust the URL as needed
          {
            password: values.password,
            confirm_Password: values.confirm_Password,
          }
        );

        if (response.data.success) {
          toast.success("Your password has been reset successfully!");
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error(response.data.message || "Failed to reset password.");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message ===
            "Invalid or expired password reset token."
        ) {
          toast.error(
            "Your password reset link has expired. Please request a new one."
          );
          // Optionally, redirect to a request reset password page
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="set-password-container">
      <ToastContainer />
      <h2>Set Your New Password</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <div className="password-input-container">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.touched.password && formik.errors.password
                  ? "input-error"
                  : ""
              }
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirm_Password">Confirm New Password:</label>
          <div className="password-input-container">
            <input
              id="confirm_Password"
              name="confirm_Password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_Password}
              className={
                formik.touched.confirm_Password &&
                formik.errors.confirm_Password
                  ? "input-error"
                  : ""
              }
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {formik.touched.confirm_Password && formik.errors.confirm_Password ? (
            <div className="error-message">
              {formik.errors.confirm_Password}
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Setting Password..." : "Set Password"}
        </button>
      </form>

      {/* Inline Styles (optional) */}
      <style jsx="true">{`
        .set-password-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
        }

        .password-input-container {
          position: relative;
        }

        input[type="password"],
        input[type="text"] {
          width: 100%;
          padding: 10px 40px 10px 10px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
          transition: border-color 0.3s;
        }

        input[type="password"]:focus,
        input[type="text"]:focus {
          border-color: #5264ae;
          outline: none;
        }

        .input-error {
          border-color: red;
        }

        .error-message {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }

        .toggle-password-btn {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #5264ae;
          cursor: pointer;
          font-size: 14px;
        }

        .toggle-password-btn:focus {
          outline: none;
        }

        button[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: #5264ae;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button[type="submit"]:hover {
          background-color: #4153a3;
        }

        button[type="submit"]:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        @media (max-width: 500px) {
          .set-password-container {
            margin: 20px;
            padding: 20px;
          }

          h2 {
            font-size: 20px;
          }

          button[type="submit"] {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SetPassword;
